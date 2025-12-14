library IEEE;
use IEEE.STD_LOGIC_1164.ALL;
use IEEE.NUMERIC_STD.ALL;
use IEEE.std_logic_unsigned.ALL;

entity MPG is
    Port ( clk : in STD_LOGIC;
           btn : in STD_LOGIC;
           en : out STD_LOGIC);
end MPG;

architecture Behavioral of MPG is

signal cnt : std_logic_vector(15 downto 0) := (others => '0');
signal d1 : std_logic := '0';
signal q1 : std_logic := '0';
signal q2 : std_logic := '0';
signal q3 : std_logic := '0';

begin

en <= q2 and (not q3);

process(clk)
begin

if rising_edge(clk) then
    cnt <= cnt + 1;
end if;
end process;

process(clk)
begin

if rising_edge(clk) then
   if cnt = "1111111111111111" then
      q1 <= btn;
   end if;
end if;
end process;

process(clk)
begin
if rising_edge(clk) then
    q2 <= q1;
end if;
end process;

process(clk)
begin

if rising_edge(clk) then
    q3 <= q2;
end if;
end process;

end Behavioral;
