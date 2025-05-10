library IEEE;
use IEEE.STD_LOGIC_1164.ALL;
use IEEE.std_logic_unsigned.ALL;
use IEEE.NUMERIC_STD.ALL;

entity UC is
    Port (
        in_dist_km_bani : in STD_LOGIC_VECTOR (9 downto 0);
        ok_km : in STD_LOGIC;  --btn sus 
        Nr_Bilete : in STD_LOGIC_VECTOR (2 downto 0);
        ok_nr_B : in STD_LOGIC;  --btn jos
        ok_cost_B : in STD_LOGIC;
        ok_bani : in STD_LOGIC;
        continuati : in STD_LOGIC;
        clk : in STD_LOGIC;
         
        AF_in_km_dist : out STD_LOGIC;
        AF_introdu_nr_bilete : out STD_LOGIC;
        AF_nr_bilete_insuficiente : out STD_LOGIC;
        AF_introduceti_bani : out STD_LOGIC;
        AF_inapoiere_bani : out STD_LOGIC;
        AF_Bani_insuf : out STD_LOGIC;
        AF_ok_rest : out STD_LOGIC;
        AF_FINAL_COMPLET : out STD_LOGIC;
        catodes : out STD_LOGIC_VECTOR (0 to 6);
        anodes : out STD_LOGIC_VECTOR (3 downto 0)
    );
end UC;

architecture Behavioral of UC is

component modificare_ram_rest is
    Port (
        rest : in STD_LOGIC_VECTOR (9 downto 0);
        ok : in STD_LOGIC;
        imposibil : out STD_LOGIC
    );
end component modificare_ram_rest;

component afisare_ssd_bani is
    Port ( numar_in1 : in STD_LOGIC_VECTOR (9 downto 0);
           numar_in2 : in STD_LOGIC_VECTOR (9 downto 0);
           clk : in STD_LOGIC;
           ok_sum_b : in STD_LOGIC;
           continuati : in STD_LOGIC;
           catodes : out STD_LOGIC_VECTOR (0 to 6);
           anodes : out STD_LOGIC_VECTOR (3 downto 0));
end component afisare_ssd_bani;

component calculare_rest is
    Port (
        in_bani : in STD_LOGIC_VECTOR (9 downto 0);
        cost_bilet : in STD_LOGIC_VECTOR (9 downto 0);
        ok_bani : in STD_LOGIC;
        rest : out STD_LOGIC_VECTOR (9 downto 0);
        bani_insuf : out STD_LOGIC
    );
end component calculare_rest;

component calculare_suma_nr_bil_in is
    Port (
        dist_km : in STD_LOGIC_VECTOR (9 downto 0);
        nr_bilete : in STD_LOGIC_VECTOR (2 downto 0);
        cost : out STD_LOGIC_VECTOR (9 downto 0)
    );
end component calculare_suma_nr_bil_in;

component comparare_nr_in_nr_disp is
    Port (
        nr_bilete_in : in STD_LOGIC_VECTOR (2 downto 0);
        ok_b : in STD_LOGIC;
        rez : out STD_LOGIC
    );
end component comparare_nr_in_nr_disp;

component comparare_res_nr_bani_casa is
    Port (
        rest : in STD_LOGIC_VECTOR (9 downto 0);
        ok_b : in STD_LOGIC; 
        rez : out STD_LOGIC
    );
end component comparare_res_nr_bani_casa;

component introduceti_suma is
    Port (
        in_bani : in STD_LOGIC_VECTOR (9 downto 0);
        OK_in_bani : in STD_LOGIC;
        out_corect : out STD_LOGIC
    );
end component introduceti_suma;

component modificare_nr_bilete is
    Port (
        nr_bilete_in : in STD_LOGIC_VECTOR (2 downto 0);
        OK_B : in STD_LOGIC;
        out_corect : out STD_LOGIC
    );
end component modificare_nr_bilete;

signal imposibil_s  : std_logic := '0';
signal numar_in_s  : std_logic_vector(9 downto 0) := (others => '0');
signal in_bani_s  : std_logic_vector(9 downto 0) := (others => '0');
signal cost_bilet_s  : std_logic_vector(9 downto 0) := (others => '0');
signal rest1_s  : std_logic_vector(9 downto 0) := (others => '0');
signal bani_insuf_s  : std_logic := '0';
signal dist_km_s  : std_logic_vector(9 downto 0) := (others => '0');
signal cost_s  : std_logic_vector(9 downto 0) := (others => '0');
signal rez_s : std_logic := '0';
signal rez1_s : std_logic := '0';
signal reset  : std_logic := '0';

signal ok_km_s  : std_logic := '0';
signal ok_nr_B_s  : std_logic := '0';
signal ok_cost_B_s  : std_logic := '0';
signal ok_bani_S  : std_logic := '0';

signal out_cor1 : std_logic := '0';                             
signal out_cor2 : std_logic := '0';

component button_to_switch1 is
    Port (
        clk : in std_logic;  -- Clock signal
        rst : in std_logic;  -- Reset signal
        btn : in std_logic;  -- Button input
        sw  : out std_logic  -- Switch output
    );
end component button_to_switch1;

component button_to_switch2 is
    Port (
        clk : in std_logic;  -- Clock signal
        rst : in std_logic;  -- Reset signal
        btn : in std_logic;  -- Button input
        sw  : out std_logic  -- Switch output
    );
end component button_to_switch2;

begin

COMP_NR_B_DISP : comparare_nr_in_nr_disp port map(
    nr_bilete_in => Nr_Bilete,
    ok_b => ok_nr_B,
    rez => rez_s
);

CALC_SUMA_BIL : calculare_suma_nr_bil_in port map(
    dist_km => dist_km_s,
    nr_bilete => Nr_Bilete,
    cost => cost_s
);

CALC_REST : calculare_rest port map(
    in_bani => in_bani_s,
    cost_bilet => cost_bilet_s,
    ok_bani => ok_bani,
    rest => rest1_s,
    bani_insuf => bani_insuf_s
);

AFISARE_SSD_SUMA_CURENTA : afisare_ssd_bani port map(
    numar_in1 => cost_s,
    numar_in2 => in_bani_s,
    clk => clk,
    ok_sum_b => ok_nr_B_s,
    continuati => ok_bani,
    catodes => catodes,
    anodes => anodes
);  
 
COMPARARE_REST : comparare_res_nr_bani_casa port map(
    rest => rest1_s, 
    ok_b => ok_bani,
    rez => rez1_s
);

IN_SUM : introduceti_suma port map(
    in_bani => in_bani_s,
    OK_in_bani => ok_bani,
    out_corect => out_cor2
);                        

MODIF_NR_BIL : modificare_nr_bilete port map(
    nr_bilete_in => Nr_Bilete,
    OK_B => ok_nr_B,
    out_corect => out_cor1
);
                                                                                           
MODIF_RAM_RST : modificare_ram_rest port map(
    rest => rest1_s,
    ok => ok_bani,
    imposibil => imposibil_s
);

SGN_BTN_OK_KM_S : button_to_switch1 port map(
    clk => clk,
    rst => '0',
    btn => ok_km,
    sw => ok_km_s
);

SGN_BTN_OK_NR_B_S : button_to_switch2 port map(
    clk => clk,
    rst => '0',
    btn => ok_nr_B,
    sw => ok_nr_B_s
);

process(reset, ok_km_s, Nr_Bilete, ok_nr_B_s, ok_cost_B, 
        ok_bani, continuati, rez_s, cost_s, rez1_s, imposibil_s, bani_insuf_s, cost_bilet_s)
begin
    -- Ini?ializãri
    AF_in_km_dist <= '0';
    AF_introdu_nr_bilete <= '0';
    AF_nr_bilete_insuficiente <= '0';
    AF_introduceti_bani <= '0';
    AF_inapoiere_bani <= '0';
    AF_Bani_insuf <= '0';
    AF_ok_rest <= '0';
    AF_FINAL_COMPLET <= '0';           

    -- Capture distances and money input
    if (in_dist_km_bani /= "0000000000" and ok_km_s = '0') then
        dist_km_s <= in_dist_km_bani;
    end if; 

    if (in_dist_km_bani /= "0000000000" and ok_bani = '1') then
        in_bani_s <= in_dist_km_bani;
    end if;
    
    if (reset = '0') then
        if (ok_km_s = '1') then
            AF_in_km_dist <= '0';
            AF_introdu_nr_bilete <= '1';

            if (Nr_Bilete > 0 and ok_nr_B_s = '1') then
                AF_introdu_nr_bilete <= '0';

                if (rez_s = '1') then
                    AF_nr_bilete_insuficiente <= '0';

                    if (cost_s > 0) then
                        numar_in_s <= cost_s;
                        cost_bilet_s <= cost_s;

                        if (ok_cost_B = '1') then
                            AF_Bani_insuf <= '0';
                            AF_inapoiere_bani <= '0';
                            AF_introduceti_bani <= '1';

                            if (ok_bani = '1') then
                                AF_introduceti_bani <= '0';  

                                if (continuati = '1') then
                                
                                   if (bani_insuf_s = '1' or rez1_s = '0' or imposibil_s = '1') then
                                        AF_Bani_insuf <= '1';
                                        AF_inapoiere_bani <= '1';
                                    else                   
                                        AF_FINAL_COMPLET <= '1';
                                    end if;               
                                                    
                                end if;            
                            end if;  
                        end if;
                    end if;
                else 
                    AF_nr_bilete_insuficiente <= '1'; 
                end if;
            end if;
        else
            AF_in_km_dist <= '1';
        end if;
    end if;

end process;


end Behavioral;
