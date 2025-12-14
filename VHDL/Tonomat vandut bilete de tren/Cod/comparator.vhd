library IEEE;
use IEEE.STD_LOGIC_1164.ALL;
use IEEE.std_logic_unsigned.ALL;
use IEEE.numeric_std.ALL;

entity comparator is
    Port ( a : in std_logic_vector(9 downto 0);
           b : in std_logic_vector(9 downto 0);
           lt : out STD_LOGIC;
           equal : out STD_LOGIC;
           greater_then : out STD_LOGIC);
end comparator;

architecture Behavioral of comparator is
begin

process(a, b)
begin

lt <= '0';
equal <= '0';
greater_then <= '0';

if a > b then
    greater_then <= '1';
elsif a = b then
    equal <= '1';
elsif a < b then
    lt <= '1';
end if;

end process;

end Behavioral;
