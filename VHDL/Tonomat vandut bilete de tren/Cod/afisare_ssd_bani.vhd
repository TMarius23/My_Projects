library IEEE;
use IEEE.STD_LOGIC_1164.ALL;

---suma introdusa

--entity afisare_ssd_bani is
--    Port ( numar_in : in STD_LOGIC_VECTOR (9 downto 0);
--           clk : in STD_LOGIC;
--           catodes : out STD_LOGIC_VECTOR (0 to 6);
--           anodes : out STD_LOGIC_VECTOR (3 downto 0));
--end afisare_ssd_bani;

entity afisare_ssd_bani is
    Port ( numar_in1 : in STD_LOGIC_VECTOR (9 downto 0);
           numar_in2 : in STD_LOGIC_VECTOR (9 downto 0);
           clk : in STD_LOGIC;
           ok_sum_b : in STD_LOGIC;
           continuati : in STD_LOGIC;
           catodes : out STD_LOGIC_VECTOR (0 to 6);
           anodes : out STD_LOGIC_VECTOR (3 downto 0));
end afisare_ssd_bani;

architecture Behavioral of afisare_ssd_bani is

component despartire_numere_in4 is
    Port ( numar_in : in STD_LOGIC_VECTOR (9 downto 0);
           numar_out : out STD_LOGIC_VECTOR (15 downto 0));
end component despartire_numere_in4;

component SSD is
   Port ( input_data : in STD_LOGIC_VECTOR (15 downto 0);
           clk : in STD_LOGIC;
           catodes : out STD_LOGIC_VECTOR (0 to 6);
           anodes : out STD_LOGIC_VECTOR (3 downto 0));
end component SSD;

signal numar_desp : std_logic_vector(15 downto 0) := (others => '0');
signal numar_in : STD_LOGIC_VECTOR (9 downto 0) := (others => '0');


begin

DESP_NR : despartire_numere_in4 port map (numar_in => numar_in,
                                          numar_out => numar_desp);

AFISARE : SSD port map (input_data => numar_desp, 
                        clk => clk,
                        catodes => catodes, 
                        anodes => anodes);

process(ok_sum_b, continuati, numar_in1, numar_in2)
begin

numar_in <= "0000000000";
if (ok_sum_b = '1' and continuati = '0') then
    numar_in <= numar_in1;
elsif (ok_sum_b = '1' and continuati = '1') then
    numar_in <= numar_in2;
end if;

end process;

end Behavioral;
