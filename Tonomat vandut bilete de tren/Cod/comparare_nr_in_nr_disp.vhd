library IEEE;
use IEEE.STD_LOGIC_1164.ALL;
use IEEE.std_logic_unsigned.ALL;
use IEEE.numeric_std.ALL;

entity comparare_nr_in_nr_disp is -- comparare nr bilete disponobile
    Port ( nr_bilete_in : in STD_LOGIC_VECTOR (2 downto 0);
           ok_b : in STD_LOGIC;
           rez : out STD_LOGIC);
end comparare_nr_in_nr_disp;

---comparare nr bilete disponibile cu cele care le am salvate deja in memorie
--rez = 0 pt fals, nr_bilete_in > nr_bil_disponibile
--rez = 1 pt adevarat, nr_bilete_in <= nr_bil_disponibile

architecture Behavioral of comparare_nr_in_nr_disp is

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
                                write => '0', 
                                data_out => date_out_bilete);

process(nr_bilete_in, date_out_bilete, ok_b)

variable bil_in : integer;
variable bil_disp : integer;

begin

if ok_b = '1' then

rez <= '0';

bil_in := TO_INTEGER(unsigned(nr_bilete_in));
bil_disp := TO_INTEGER(unsigned(date_out_bilete));

if bil_in > bil_disp then
rez <= '0';
elsif bil_in <= bil_disp then
rez <= '1';
end if;

end if;

end process;

end Behavioral;
