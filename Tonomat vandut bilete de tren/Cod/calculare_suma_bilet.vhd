library IEEE;
use IEEE.STD_LOGIC_1164.ALL;
use IEEE.std_logic_unsigned.ALL;
use IEEE.numeric_std.ALL;


entity calculare_suma_bilet is
    Port ( dist_km : in STD_LOGIC_VECTOR (9 downto 0);
           cost : out STD_LOGIC_VECTOR (6 downto 0));
end calculare_suma_bilet;

architecture Behavioral of calculare_suma_bilet is


component comparare_distanta is
    Port ( in_dist : in STD_LOGIC_VECTOR (9 downto 0);
           nr_app : out STD_LOGIC_VECTOR (10 downto 0));
end component comparare_distanta;

signal vect : std_logic_vector(10 downto 0) := (others => '0');

begin

DISTANTA : comparare_distanta port map(in_dist => dist_km, nr_app => vect);

process(dist_km, vect)
begin
   -- un bilet per 100 km costa 9 euro
   cost <= (others => '0');

   for i in 0 to 10 loop
        if vect(i) = '1' then
            --dist_value := i;
            cost <= std_logic_vector(to_unsigned((i + 1) * 9, 7));                       
            exit;
        end if;  
   end loop;
   
end process;


end Behavioral;
