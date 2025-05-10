library IEEE;
use IEEE.STD_LOGIC_1164.ALL;
use IEEE.std_logic_unsigned.ALL;
use IEEE.numeric_std.ALL;

entity modificare_nr_bilete is
    Port ( nr_bilete_in : in STD_LOGIC_VECTOR (2 downto 0);
           OK_B : in STD_LOGIC;
           out_corect : out STD_LOGIC);
end modificare_nr_bilete;

--dupa ce dam OK_B = 1;
--ca sa putem merge mai departe noi trebuie sa punem switch ul inapoi pe 0 ca altfel
--nu o sa mearga
--!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
--!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
--!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

architecture Behavioral of modificare_nr_bilete is

component ram_2_0_bani is
    Port ( address : in STD_LOGIC_VECTOR (2 downto 0);
           data_in : in STD_LOGIC_VECTOR (9 downto 0);
           write : in STD_LOGIC;
           data_out : out STD_LOGIC_VECTOR (9 downto 0));
end component ram_2_0_bani;

signal date_in_bilete : std_logic_vector(9 downto 0) := (others => '0');
signal write : std_logic := '0';
signal date_out_bilete : std_logic_vector(9 downto 0) := (others => '0');

begin

NR_BIL : ram_2_0_bani port map (address => "111", 
                                data_in => date_in_bilete,
                                write => write, 
                                data_out => date_out_bilete);

process(nr_bilete_in, OK_B, date_out_bilete)
begin

if OK_B = '1' and nr_bilete_in > 0 then
    write <= '1';
    out_corect <= '1';
    date_in_bilete <= std_logic_vector(unsigned(date_out_bilete) - unsigned(nr_bilete_in));                           
else
    write <= '0';
    out_corect <= '0';
end if;

end process;

end Behavioral;
