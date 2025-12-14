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

component carryLookaheadAdder is
  Port (cin : in std_logic;
        x : in std_logic_vector(1 downto 0);
        y : in std_logic_vector(1 downto 0);
        sum : out std_logic_vector(1 downto 0);
        cout : out std_logic );
end component;

signal c1, c2_1, c2_2 : std_logic := '0';
signal s1, s2_1, s2_2 : std_logic_vector(1 downto 0) := "00";

signal conc1x : std_logic_vector(1 downto 0) := x(1) & x(0);
signal conc2x : std_logic_vector(1 downto 0) := x(3) & x(2);

signal conc1y : std_logic_vector(1 downto 0) := y(1) & y(0);
signal conc2y : std_logic_vector(1 downto 0) := y(3) & y(2);

begin

s1_1 : carryLookaheadAdder port map (cin, conc1x, conc1y, s1, c1);

s22_1 : carryLookaheadAdder port map ('0', conc2x, conc2y, s2_1, c2_1);
s22_2 : carryLookaheadAdder port map ('1', conc2x, conc2y, s2_2, c2_2);

sum(1 downto 0) <= s1;

process (c1, s2_1, s2_2, c2_1, c2_2)
begin

if c1 = '0' then
    sum(3 downto 2) <= s2_1;
    cout <= c2_1;
elsif c1 = '1' then
    sum(3 downto 2) <= s2_2;
    cout <= c2_2;
end if;

end process;


end Behavioral;
