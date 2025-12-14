library IEEE;
use IEEE.STD_LOGIC_1164.ALL;
use IEEE.numeric_std.ALL;

entity ram_2_0_bani is
    Port ( address : in STD_LOGIC_VECTOR (2 downto 0);
           data_in : in STD_LOGIC_VECTOR (9 downto 0);
           write : in STD_LOGIC;
           data_out : out STD_LOGIC_VECTOR (9 downto 0));
end ram_2_0_bani;

architecture Behavioral  of ram_2_0_bani is

type ram_array is array(0 to 7) of std_logic_vector(9 downto 0);

signal content : ram_array := (
    --25 bacnote acceptate
    --0000010110 --pt 50
    --0000011001 --pt restu
    "0000011001",-- nr bani 1 euro
    "0000011001",-- nr bani 5 euro
    "0000011001",-- nr bani 10 euro
    "0000011001",-- nr bani 20 euro
    "0000010110",-- nr bani 50 euro
    "0001111011",--SUMA_IN 123
    "0000000000",--REST
    "0000000010" --NR_BILETE_DISPONIBILE -- ex 2
);

begin

process(address, write, data_in)
variable addr_int : integer;

begin
    addr_int := TO_INTEGER(unsigned(address));
    
    if write = '1' then
        content(addr_int) <= data_in;
    end if;
    
    data_out <= content(addr_int);

end process;

end Behavioral;
