library IEEE;
use IEEE.STD_LOGIC_1164.ALL;
use IEEE.NUMERIC_STD.ALL;
use IEEE.std_logic_unsigned.ALL;


entity SSD is
    Port ( clk : in STD_LOGIC;
           digit : in STD_LOGIC_VECTOR (31 downto 0);
           cat : out STD_LOGIC_VECTOR (6 downto 0);
           an : out STD_LOGIC_VECTOR (7 downto 0));
end SSD;

architecture Behavioral of SSD is

signal cnt : std_logic_vector(18 downto 0) := (others => '0');
signal sel : std_logic_vector(2 downto 0) := (others => '0');
signal cat_sel : std_logic_vector(3 downto 0) := (others => '0');
signal an_sel : std_logic_vector(7 downto 0) := (others => '0');

begin

counter : process(clk)
begin
if rising_edge (clk) then
    cnt <= cnt + 1;
end if;
end process;

sel <= cnt(18 downto 16);

mux_cat : process(clk)
begin

if rising_edge (clk) then
    case sel is 
        when "000" => cat_sel <= digit(3 downto 0);
        when "001" => cat_sel <= digit(7 downto 4);
        when "010" => cat_sel <= digit(11 downto 8);    
        when "011" => cat_sel <= digit(15 downto 12);       
        when "100" => cat_sel <= digit(19 downto 16);  
        when "101" => cat_sel <= digit(23 downto 20);      
        when "110" => cat_sel <= digit(27 downto 24);
        when others=> cat_sel <= digit(31 downto 28);   
    end case;  
end if;     
end process;

mux_an : process(clk)
begin

if rising_edge (clk) then
    case sel is 
        when "000" => an <= "11111110";
        when "001" => an <= "11111101";
        when "010" => an <= "11111011";    
        when "011" => an <= "11110111";       
        when "100" => an <= "11101111";  
        when "101" => an <= "11011111";      
        when "110" => an <= "10111111";
        when others=> an <= "01111111";
    end case;
end if;     
end process;



process(cat_sel)
begin
case cat_sel is
    when "0000" => cat <= "1000000"; -- 0
    when "0001" => cat <= "1111001"; -- 1
    when "0010" => cat <= "0100100"; -- 2
    when "0011" => cat <= "0110000"; -- 3
    when "0100" => cat <= "0011001"; -- 4
    when "0101" => cat <= "0010010"; -- 5
    when "0110" => cat <= "0000010"; -- 6
    when "0111" => cat <= "1111000"; -- 7
    when "1000" => cat <= "0000000"; -- 8
    when "1001" => cat <= "0010000"; -- 9
    when "1010" => cat <= "0001000"; -- A
    when "1011" => cat <= "0000011"; -- B
    when "1100" => cat <= "1000110"; -- C
    when "1101" => cat <= "0100001"; -- D
    when "1110" => cat <= "0000110"; -- E
    when others => cat <= "0001110"; -- F
end case;
end process;

end Behavioral;
