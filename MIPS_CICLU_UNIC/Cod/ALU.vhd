library IEEE;
use IEEE.STD_LOGIC_1164.ALL;
use IEEE.NUMERIC_STD.ALL;
use IEEE.std_logic_unsigned.ALL;

entity ALU is
    Port ( btn : in STD_LOGIC;
           clk : in STD_LOGIC;
           sw : in STD_LOGIC_VECTOR (7 downto 0);
           digits : out std_logic_vector(31 downto 0);
           led : out std_logic);
end ALU;

architecture Behavioral of ALU is

signal cnt : std_logic_vector(1 downto 0) := (others => '0');
signal enable : std_logic := '0';

signal sw1 : std_logic_vector(31 downto 0) := (others => '0');
signal sw2 : std_logic_vector(31 downto 0) := (others => '0');
signal sw3 : std_logic_vector(31 downto 0) := (others => '0');

signal add : std_logic_vector(31 downto 0) := (others => '0');
signal dif : std_logic_vector(31 downto 0) := (others => '0');

signal sh_l : std_logic_vector(31 downto 0) := (others => '0');
signal sh_r : std_logic_vector(31 downto 0) := (others => '0');


component MPG is
    Port ( clk : in STD_LOGIC;
           btn : in STD_LOGIC;
           en : out STD_LOGIC);
end component;

begin

Inst_MPG : MPG port map(clk => clk,
                        btn => btn,
                        en => enable);

counter : process(clk)
begin

if rising_edge (clk) then
    if enable = '1' then
        cnt <= cnt + 1;
    end if;
end if;

end process;

sw1 <= X"0000000" & sw(3 downto 0);
sw2 <= X"000000" & sw(7 downto 4) & "0000";
sw3 <= X"000000" & sw(7 downto 0);

add <= sw1 + sw2;
dif <= sw1 - sw2;
sh_l <= sw3(31 downto 2) & "00";
sh_r <= "00" & sw3(29 downto 0);

mux4_1 : process(cnt)
begin

case cnt is
    when "00" => digits <= add;
    when "01" => digits <= dif;
    when "10" => digits <= sh_l;
    when others => digits <= sh_r;
end case;

end process;

end Behavioral;
