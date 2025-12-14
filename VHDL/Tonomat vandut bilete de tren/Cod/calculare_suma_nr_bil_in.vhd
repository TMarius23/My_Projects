library IEEE;
use IEEE.STD_LOGIC_1164.ALL;
use IEEE.std_logic_unsigned.ALL;
use IEEE.numeric_std.ALL;

entity calculare_suma_nr_bil_in is
    Port ( dist_km : in STD_LOGIC_VECTOR (9 downto 0);
           nr_bilete : in STD_LOGIC_VECTOR (2 downto 0);
           cost : out STD_LOGIC_VECTOR (9 downto 0));
end calculare_suma_nr_bil_in;

architecture Behavioral of calculare_suma_nr_bil_in is

component calculare_suma_bilet is
    Port ( dist_km : in STD_LOGIC_VECTOR (9 downto 0);
           cost : out STD_LOGIC_VECTOR (6 downto 0));
end component calculare_suma_bilet;

signal vect : std_logic_vector(6 downto 0) := (others => '0');
signal cost_aux:STD_LOGIC_VECTOR (9 downto 0) := (others => '0') ;
begin

COST1 : calculare_suma_bilet port map (dist_km => dist_km, cost => vect);

process(dist_km, nr_bilete, vect)

variable nr_bil : integer;
variable nr_bani : integer;

begin

nr_bil := to_integer(unsigned(nr_bilete));
nr_bani := to_integer(unsigned(vect));

cost_aux <= std_logic_vector(TO_UNSIGNED(nr_bil * nr_bani, 10));

end process;

cost <=cost_aux when nr_bilete > 0 else "0000000000";


end Behavioral;
