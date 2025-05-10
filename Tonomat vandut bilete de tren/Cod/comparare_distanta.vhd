library IEEE;
use IEEE.STD_LOGIC_1164.ALL;
use IEEE.std_logic_unsigned.ALL;
--use IEEE.numeric_std.ALL;

entity comparare_distanta is
    Port ( in_dist : in STD_LOGIC_VECTOR (9 downto 0);
           nr_app : out STD_LOGIC_VECTOR (10 downto 0));
end comparare_distanta;

architecture Behavioral of comparare_distanta is
begin

process(in_dist)
    variable dist_value : integer;
begin
    dist_value := conv_integer(in_dist);
    
    nr_app <= (others => '0');
    
    for i in 0 to 10 loop
        if dist_value < (i + 1) * 100 then
            if dist_value >= i * 100 then
                nr_app(i) <= '1';
            end if;
        end if;
    end loop;

end process;



end Behavioral;
