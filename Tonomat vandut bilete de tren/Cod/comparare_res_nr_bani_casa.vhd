library IEEE;
use IEEE.STD_LOGIC_1164.ALL;
use IEEE.std_logic_unsigned.ALL;
use IEEE.numeric_std.ALL;

entity comparare_res_nr_bani_casa is
    Port ( rest : in STD_LOGIC_VECTOR (9 downto 0);
           ok_b : in STD_LOGIC; 
           rez : out STD_LOGIC);
end comparare_res_nr_bani_casa;

architecture Behavioral of comparare_res_nr_bani_casa is

component calculare_bani_casa is
    Port ( bani : out STD_LOGIC_VECTOR (10 downto 0));
end component calculare_bani_casa;

signal bani_disp : std_logic_vector(10 downto 0) := (others => '0');
signal rezultat : std_logic;

begin

BANI_CASA : calculare_bani_casa port map(bani => bani_disp);
                                
process(rest, ok_b)

variable bani_c : integer;
variable bani_r : integer;

begin

rezultat <= '0';

if (ok_b = '1') then

bani_c := to_integer(unsigned(bani_disp));
bani_r := to_integer(unsigned(rest));

if bani_r <= bani_c then
   rezultat <= '1';  
else
   rezultat <= '0';  
end if;


end if;
       
end process;

rez <= rezultat;



end Behavioral;
