library IEEE;
use IEEE.STD_LOGIC_1164.ALL;



entity top is
 Port (cin : in std_logic;
       x : in std_logic_vector(3 downto 0);
       y : in std_logic_vector(3 downto 0);
       sum : out std_logic_vector(3 downto 0);
       cout : out std_logic );
end top;

architecture Behavioral of top is

component FA_2 is
  Port (cin : in std_logic;
        x : in std_logic_vector(1 downto 0);
        y : in std_logic_vector(1 downto 0);
        s : out std_logic_vector(1 downto 0);
        c : out std_logic);
end component;

signal c2, c41, c42 : std_logic := '0';
signal s12, s341, s342 : std_logic_vector(1 downto 0) := "00";

begin

f1_1 : FA_2 port map(cin ,x(1 downto 0), y(1 downto 0), s12, c2);
f1_2 : FA_2 port map('0' ,x(3 downto 2), y(3 downto 2), s341, c41);
f2_2 : FA_2 port map('1' ,x(3 downto 2), y(3 downto 2), s342, c42);

sum(1 downto 0) <= s12;

process (c2, s341, s342)
begin

if c2 = '0' then
    sum(3 downto 2) <= s341;
    cout <= c41;
elsif c2 = '1' then
    sum(3 downto 2) <= s342;
    cout <= c42;
end if;

end process;


end Behavioral;
