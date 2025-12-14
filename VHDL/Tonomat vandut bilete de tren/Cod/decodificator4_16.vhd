library IEEE;
use IEEE.STD_LOGIC_1164.ALL;
use IEEE.std_logic_unsigned.ALL;

entity decodificator4_16 is
    Port ( date_in : in STD_LOGIC_VECTOR (3 downto 0);
           date_out : out STD_LOGIC_VECTOR (15 downto 0));
end decodificator4_16;

architecture Behavioral of decodificator4_16 is

begin

process(date_in)
begin

date_out <= "0000000000000000";
date_out(conv_integer(date_in)) <= '1';

end process;
end Behavioral;
