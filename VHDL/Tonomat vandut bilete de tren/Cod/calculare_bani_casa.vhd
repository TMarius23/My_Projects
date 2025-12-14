library IEEE;
use IEEE.STD_LOGIC_1164.ALL;
use IEEE.std_logic_unsigned.ALL;
use IEEE.numeric_std.ALL;


entity calculare_bani_casa is
    Port ( bani : out STD_LOGIC_VECTOR (10 downto 0));
end calculare_bani_casa;

architecture Behavioral of calculare_bani_casa is

component ram_2_0_bani is
    Port ( address : in STD_LOGIC_VECTOR (2 downto 0);
           data_in : in STD_LOGIC_VECTOR (9 downto 0);
           write : in STD_LOGIC;
           data_out : out STD_LOGIC_VECTOR (9 downto 0));
end component ram_2_0_bani;


signal data_in : std_logic_vector(9 downto 0) := (others => '0');
signal date_out_nr_1 : std_logic_vector(9 downto 0) := (others => '0');
signal date_out_nr_5 : std_logic_vector(9 downto 0) := (others => '0');
signal date_out_nr_10 : std_logic_vector(9 downto 0) := (others => '0');
signal date_out_nr_20 : std_logic_vector(9 downto 0) := (others => '0');
signal date_out_nr_50 : std_logic_vector(9 downto 0) := (others => '0');

begin

M1 : ram_2_0_bani port map (address => "000",
                            data_in => data_in,
                            write => '0',
                            data_out => date_out_nr_1);
M5 : ram_2_0_bani port map (address => "001",
                            data_in => data_in,
                            write => '0',
                            data_out => date_out_nr_5);
M10 : ram_2_0_bani port map (address => "010",
                            data_in => data_in,
                            write => '0',
                            data_out => date_out_nr_10);
M20 : ram_2_0_bani port map (address => "011",
                            data_in => data_in,
                            write => '0',
                            data_out => date_out_nr_20);
M50 : ram_2_0_bani port map (address => "100",
                            data_in => data_in,
                            write => '0',
                            data_out => date_out_nr_50);
                            
process(date_out_nr_1, date_out_nr_5, date_out_nr_10,
        date_out_nr_20, date_out_nr_50)

variable suma : integer;

begin

suma := 0;

suma := TO_INTEGER(unsigned(date_out_nr_1)) * 1 + 
        TO_INTEGER(unsigned(date_out_nr_5)) * 5 + 
        TO_INTEGER(unsigned(date_out_nr_10)) * 10 +
        TO_INTEGER(unsigned(date_out_nr_20)) * 20 +
        TO_INTEGER(unsigned(date_out_nr_50)) * 50;

bani <= std_logic_vector(TO_UNSIGNED(suma,11));

end process;                            


end Behavioral;
