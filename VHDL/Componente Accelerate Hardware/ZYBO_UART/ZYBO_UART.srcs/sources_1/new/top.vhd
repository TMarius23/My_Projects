----------------------------------------------------------------------------------
-- Company: Universitatea Tehnica din Cluj-Napoca
-- Engineer: S.L. Dr. Ing. Mircea Paul Muresan
-- 
-- Create Date: 25.08.2024 22:50:20
-- Design Name: 
-- Module Name: top - Behavioral
-- Project Name: UART Zybo
-- Target Devices: Zybo 7000 si Zybo Z20
-- Tool Versions: Vivado 2024

----------------------------------------------------------------------------------

library IEEE;
use IEEE.STD_LOGIC_1164.ALL;
use IEEE.STD_LOGIC_UNSIGNED.ALL;


entity top is
  Port (clk : in STD_LOGIC;
        led : out std_logic_vector(3 downto 0);
        sw : in std_logic_vector(3 downto 0);
        btn : in std_logic_vector(3 downto 0);
        rx : in STD_LOGIC;
        tx : out STD_LOGIC
        );
end top;

architecture Behavioral of top is

component MPG is
    Port ( en : out STD_LOGIC;
           input : in STD_LOGIC;
           clock : in STD_LOGIC);
end component;

component transmitfsm
    Port ( clk: STD_LOGIC;
           rst : in STD_LOGIC;
           baud_en : in STD_LOGIC;
           tx_en : in STD_LOGIC;
           tx_data : in STD_LOGIC_VECTOR (7 downto 0);
           tx : out STD_LOGIC;
           tx_rdy : out STD_LOGIC);
end component;

component receivefsm
    Port ( clk : in STD_LOGIC;
           rst : in STD_LOGIC;
           baud_en : in STD_LOGIC;
           rx : in STD_LOGIC;
           rx_data : out STD_LOGIC_VECTOR (7 downto 0);
           rx_rdy : out STD_LOGIC);
end component;

-- UART
signal baud_en, baud_en_x16, tx_start, tx_en, tx_rdy, tx_rdy1, rx_rdy, rx_rdy1 : STD_LOGIC;
signal cnt : STD_LOGIC_VECTOR(13 downto 0) := (others => '0');
signal cnt_x16 : STD_LOGIC_VECTOR(9 downto 0) := (others => '0');
signal tx_reg, rx_reg : STD_LOGIC_VECTOR(59 downto 0);
signal tx_digit, rx_digit : STD_LOGIC_VECTOR(5 downto 0);
signal tx_data : STD_LOGIC_VECTOR(7 downto 0);
signal rx_data : STD_LOGIC_VECTOR(7 downto 0) := (others => '0');
signal tx_digit_cnt : STD_LOGIC_VECTOR(3 downto 0);
signal rx_digit_cnt : STD_LOGIC_VECTOR(3 downto 0) := (others => '0');

signal prematur_finish : std_logic;

signal baud_sel : std_logic_vector(1 downto 0);
signal numar_tx : integer;
signal numar_rx : integer;


signal en: STD_LOGIC; 

signal transmitionData : std_logic_vector(59 downto 0);


begin
    baud_sel <= sw(3 downto 2);
    
    process(baud_sel)
    
    begin
        case baud_sel is
            when "00" =>  -- 4800
                numar_tx <= 26041;
                numar_rx <= 1627;
            when "01" =>  -- 57600
                numar_tx <= 2169;
                numar_rx <= 135;
            when "10" =>  -- 115200
                numar_tx <= 1084;
                numar_rx <= 67;
            when "11" =>  -- 128000
                numar_tx <= 976;
                numar_rx <= 60;
            when others =>
                numar_tx <= 1084; -- default 115200
                numar_rx <= 67;
        end case;
    end process;

     monopulse1: MPG port map(en, btn(0), clk);
    -- *************** UART Tx ***************
    -- Send on UART  
    
    -- generate baud_en for 125Mhz clock
    process(clk)
    begin
        if rising_edge(clk) then
            if cnt = numar_tx then --TO DO de calculat valoarea lui #Numar 
                baud_en <= '1';
                cnt <= (others => '0');
            else
                baud_en <= '0';
                cnt <= cnt + 1;
            end if;
        end if;
    end process;
    
    -- generate tx_start - 1clk period signal marking the UART trasmit 
    -- at the beggining of current instruction; 
    -- initiates the serial tx procedure
    process(clk)
    begin
        if rising_edge(clk) then
            tx_start <= en;  
        end if;
    end process;

    -- load of tx_data
    process(clk)
    begin
        if rising_edge(clk) then
            if tx_start = '1' then
                tx_reg <= transmitionData;
            end if;
        end if;
    end process;
    
    -- generate tx_en
    process(clk)
    begin
        if rising_edge(clk) then
            if tx_start = '1' then
                tx_en <= '1';
                prematur_finish <= '0';
            elsif (baud_en = '1' and tx_digit_cnt = 10) or (prematur_finish = '1') then
                tx_en <= '0';
            end if;
        end if;
    end process;

    -- generate tx_digit_cnt
    process(clk)
    begin
        if rising_edge(clk) then
            tx_rdy1 <= tx_rdy; -- 1 clk delay 
            if tx_start = '1' then 
                tx_digit_cnt <= (others => '0');
            elsif tx_rdy = '1' and tx_rdy1 = '0' then
                tx_digit_cnt <= tx_digit_cnt + 1;
            end if;
        end if;
    end process;
    
    -- digit selection
    with tx_digit_cnt select
       tx_digit <=
                tx_reg(59 downto 54) when "0000",
                tx_reg(53 downto 48) when "0001",
       
                tx_reg(47 downto 42) when "0010",
                tx_reg(41 downto 36) when "0011",
                tx_reg(35 downto 30)  when "0100",
                tx_reg(29 downto 24)   when "0101",
                
                tx_reg(23 downto 18) when "0110",
                tx_reg(17 downto 12) when "0111",
                tx_reg(11 downto 6)  when "1000",
                tx_reg(5 downto 0)   when "1001",
                (others => 'X') when others;
    
    -- digit conversion to ASCII
    with tx_digit select
        tx_data <= x"30" when "000000", -- '0'
                   x"31" when "000001", -- '1'
                   x"32" when "000010", -- '2'
                   x"33" when "000011", -- '3'
                   x"34" when "000100", -- '4'
                   x"35" when "000101", -- '5'
                   --TO DO De definit restul secventei
                   x"36" when "000110", -- '6'
                   x"37" when "000111", -- '7'
                   x"38" when "001000", -- '8'
                   x"39" when "001001", -- '9'
                   
                   x"41" when "001010", -- 'A'
                   x"42" when "001011", -- 'B'
                   x"43" when "001100", -- 'C'
                   --TO DO De definit restul secventei
                   x"44" when "001101", -- 'D'
                   x"45" when "001110", -- 'E'
                   x"46" when "001111", -- 'F'
                   x"47" when "010000", -- 'G'
                   x"48" when "010001", -- 'H'
                   x"49" when "010010", -- 'I'
                   x"4A" when "010011", -- 'J'
                   x"4B" when "010100", -- 'K'
                   x"4C" when "010101", -- 'L'
                   x"4D" when "010110", -- 'M'
                   x"4E" when "010111", -- 'N'
                   x"4F" when "011000", -- 'O'
                   x"50" when "011001", -- 'P'
                   x"51" when "011010", -- 'Q'
                   x"52" when "011011", -- 'R'
                   x"53" when "011100", -- 'S'
                   x"54" when "011101", -- 'T'
                   x"55" when "011110", -- 'U'
                   x"56" when "011111", -- 'V'
                   x"57" when "100000", -- 'W'
                   x"58" when "100001", -- 'X'
                   x"59" when "100010", -- 'Y'           
                   x"5A" when "100011", -- 'Z'
                   (others => 'X') when others;
    
    prematur_finish <= '1' when tx_data = x"20";
   
    
    -- UART transmit
    inst_TFSM: transmitfsm port map(clk, '0', baud_en, tx_en, tx_data, tx, tx_rdy);

    -- *************** UART Rx ***************
 
    -- generate baud_en x 16 for 125Mhz clock
    process(clk)
    begin
        if rising_edge(clk) then
            if cnt_x16 = numar_rx then --TO DO de calculat valoarea lui #Numar 2
                baud_en_x16 <= '1';
                cnt_x16 <= (others => '0');
            else
                baud_en_x16 <= '0';
                cnt_x16 <= cnt_x16 + 1;
            end if;
        end if;
    end process;
    
    -- UART receive
    inst_RFSM: receivefsm port map(clk, '0', baud_en_x16, rx, rx_data, rx_rdy);

    -- digit conversion from ASCII
    with rx_data select
       rx_digit <=
              "000000" when x"30", -- '0'
              "000001" when x"31", -- '1'
              "000010" when x"32", -- '2'
              "000011" when x"33", -- '3'
              "000100" when x"34", -- '4'
              "000101" when x"35", -- '5'
              "000110" when x"36", -- '6'
              "000111" when x"37", -- '7'
              "001000" when x"38", -- '8'
              "001001" when x"39", -- '9'
        
              "001010" when x"41", -- 'A'
              "001011" when x"42", -- 'B'
              "001100" when x"43", -- 'C'
              "001101" when x"44", -- 'D'
              "001110" when x"45", -- 'E'
              "001111" when x"46", -- 'F'
              "010000" when x"47", -- 'G'
              "010001" when x"48", -- 'H'
              "010010" when x"49", -- 'I'
              "010011" when x"4A", -- 'J'
              "010100" when x"4B", -- 'K'
              "010101" when x"4C", -- 'L'
              "010110" when x"4D", -- 'M'
              "010111" when x"4E", -- 'N'
              "011000" when x"4F", -- 'O'
              "011001" when x"50", -- 'P'
              "011010" when x"51", -- 'Q'
              "011011" when x"52", -- 'R'
              "011100" when x"53", -- 'S'
              "011101" when x"54", -- 'T'
              "011110" when x"55", -- 'U'
              "011111" when x"56", -- 'V'
              "100000" when x"57", -- 'W'
              "100001" when x"58", -- 'X'
              "100010" when x"59", -- 'Y'
              "100011" when x"5A", -- 'Z'

              (others => 'X') when others;
                  
    -- generate rx_digit_cnt & rx_reg
    process(clk)
    begin
        if rising_edge(clk) then
            rx_rdy1 <= rx_rdy; -- 1 clk delay 
            if rx_rdy = '1' and rx_rdy1 = '0' then
               case rx_digit_cnt is
                    when "0000" => rx_reg(59 downto 54) <= rx_digit; -- 6 biți
                    when "0001" => rx_reg(53 downto 48) <= rx_digit; -- 6 biți
                  
                    when "0010" => rx_reg(47 downto 42) <= rx_digit; -- 6 biți
                    when "0011" => rx_reg(41 downto 36) <= rx_digit; -- 6 biți
                    when "0100" => rx_reg(35 downto 30)  <= rx_digit; -- 6 biți
                    when "0101" => rx_reg(29 downto 24)   <= rx_digit; -- 6 biți
               
               
                    when "0110" => rx_reg(23 downto 18) <= rx_digit; -- 6 biți
                    when "0111" => rx_reg(17 downto 12) <= rx_digit; -- 6 biți
                    when "1000" => rx_reg(11 downto 6)  <= rx_digit; -- 6 biți
                    when "1001" => rx_reg(5 downto 0)   <= rx_digit; -- 6 biți
                    when others => rx_reg(5 downto 0) <= (others => 'X');
                end case;
                rx_digit_cnt <= rx_digit_cnt + 1;
            end if;
        end if;
    end process;

transmitionData <= B"000000_000000_000000_000000_000000_000000_010110_010110_011001_000001" when sw(1) = '1' else rx_reg;

end Behavioral;