library IEEE;
use IEEE.STD_LOGIC_1164.ALL;

entity introducere_suma is
    Port ( in_bani : in STD_LOGIC_VECTOR (9 downto 0);
           OK_in_bani : in STD_LOGIC);
end introducere_suma;

architecture Behavioral of introducere_suma is

component ram_2_0_bani is
    Port ( address : in STD_LOGIC_VECTOR (2 downto 0);
           data_in : in STD_LOGIC_VECTOR (9 downto 0);
           write : in STD_LOGIC;
           data_out : out STD_LOGIC_VECTOR (9 downto 0));
end component ram_2_0_bani;

signal write : std_logic := '0';
signal date_out_bani : std_logic_vector(9 downto 0) := (others => '0');


begin

SUMA_IN : ram_2_0_bani port map (address => "101",
                                 data_in => in_bani,
                                 write => write,
                                 data_out => date_out_bani);
process(OK_in_bani)
begin
    
if OK_in_bani = '1' then
   write <= '1';
else
   write <= '0';
end if;    

end process;


end Behavioral;
