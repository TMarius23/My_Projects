library IEEE;
use IEEE.STD_LOGIC_1164.ALL;
use IEEE.numeric_std.ALL;
use IEEE.std_logic_unsigned.ALL;

entity modificare_ram_rest is
    Port ( rest : in STD_LOGIC_VECTOR (9 downto 0);
           ok : in STD_LOGIC;
           imposibil : out STD_LOGIC);
end modificare_ram_rest;

architecture Behavioral of modificare_ram_rest is

component ram_2_0_bani is
    Port ( address : in STD_LOGIC_VECTOR (2 downto 0);
           data_in : in STD_LOGIC_VECTOR (9 downto 0);
           write : in STD_LOGIC;
           data_out : out STD_LOGIC_VECTOR (9 downto 0));
end component ram_2_0_bani;

signal date_1 : std_logic_vector(9 downto 0) := (others => '0');
signal date_5 : std_logic_vector(9 downto 0) := (others => '0');
signal date_10 : std_logic_vector(9 downto 0) := (others => '0');
signal date_20 : std_logic_vector(9 downto 0) := (others => '0');
signal date_50 : std_logic_vector(9 downto 0) := (others => '0');
signal write : std_logic := '0';

signal date_out_1 : std_logic_vector(9 downto 0) := (others => '0');
signal date_out_5 : std_logic_vector(9 downto 0) := (others => '0');
signal date_out_10 : std_logic_vector(9 downto 0) := (others => '0');
signal date_out_20 : std_logic_vector(9 downto 0) := (others => '0');
signal date_out_50 : std_logic_vector(9 downto 0) := (others => '0');

begin

RAM1 : ram_2_0_bani port map (address => "000", 
                              data_in => date_1,
                              write => ok,
                              data_out => date_out_1);

RAM5 : ram_2_0_bani port map (address => "001", 
                              data_in => date_5,
                              write => ok,
                              data_out => date_out_5);

RAM10 : ram_2_0_bani port map (address => "010", 
                              data_in => date_10,
                              write => ok,
                              data_out => date_out_10);

RAM20 : ram_2_0_bani port map (address => "011", 
                              data_in => date_20,
                              write => ok,
                              data_out => date_out_20);

RAM50 : ram_2_0_bani port map (address => "100", 
                              data_in => date_50,
                              write => ok,
                              data_out => date_out_50);


process(rest, ok)

variable unu : integer;
variable cinci : integer;
variable zece : integer;
variable d_zece : integer;
variable c_zece : integer;
variable rest_v : integer;
variable imposibil_var : integer;

begin

if ok = '0' then

unu := TO_INTEGER(unsigned(date_out_1));
cinci := TO_INTEGER(unsigned(date_out_5));
zece := TO_INTEGER(unsigned(date_out_10));
d_zece := TO_INTEGER(unsigned(date_out_20));
c_zece := TO_INTEGER(unsigned(date_out_50));
rest_v := TO_INTEGER(unsigned(rest));


for i in 0 to 100 loop
    if rest_v >= 50 and c_zece >= 1 then
       rest_v := rest_v - 50;
       c_zece := c_zece - 1;
    else
        exit;
    end if;
end loop; 

for i in 0 to 100 loop
    if rest_v >= 20 and d_zece >= 1 then
       rest_v := rest_v - 20;
       d_zece := d_zece - 1;
    else
        exit;
    end if;
end loop; 

for i in 0 to 10 loop
    if rest_v >= 10 and zece >= 1 then
       rest_v := rest_v - 10;
       zece := zece - 1;
    else
        exit;
    end if;
end loop; 

for i in 0 to 10 loop
    if rest_v >= 5 and cinci >= 1 then
       rest_v := rest_v - 5;
       cinci := cinci - 1;
   else
        exit;
    end if;
end loop; 

for i in 0 to 10 loop
    if rest_v >= 1 and unu >= 1 then
       rest_v := rest_v - 1;
       unu := unu - 1;
   else
        exit;
    end if;
end loop; 

if rest_v = 0 then
    imposibil_var := 0;
else
    imposibil_var := 1;
end if;
   
if imposibil_var = 0 then
imposibil <= '0';
date_1 <= std_logic_vector(to_unsigned(unu, 10));
date_5 <= std_logic_vector(to_unsigned(cinci, 10));
date_10 <= std_logic_vector(to_unsigned(zece, 10));
date_20 <= std_logic_vector(to_unsigned(d_zece, 10));
date_50 <= std_logic_vector(to_unsigned(c_zece, 10));
else
imposibil <= '1';
end if;

end if;--la inceput langa begin

end process;


end Behavioral;
