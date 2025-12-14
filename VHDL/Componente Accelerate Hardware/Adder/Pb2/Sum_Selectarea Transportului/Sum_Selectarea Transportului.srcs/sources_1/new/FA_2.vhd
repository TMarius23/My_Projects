library IEEE;
use IEEE.STD_LOGIC_1164.ALL;


entity FA_2 is
  Port (cin : in std_logic;
        x : in std_logic_vector(1 downto 0);
        y : in std_logic_vector(1 downto 0);
        s : out std_logic_vector(1 downto 0);
        c : out std_logic);
end FA_2;

architecture Behavioral of FA_2 is

signal t1 : std_logic := '0';
signal t2 : std_logic := '0';

begin

t1 <= ((x(0) and y(0)) or (( x(0) xor y(0) ) and cin));
c <=  ((x(1) and y(1)) or (( x(1) xor y(1) ) and t1));

s(0) <= x(0) xor y(0) xor cin;
s(1) <= x(1) xor y(1) xor t1;

end Behavioral;
