library IEEE;
use IEEE.STD_LOGIC_1164.ALL;
use IEEE.std_logic_unsigned.ALL;
use IEEE.numeric_std.ALL;

--desparte un numar ex 509 in 5  0  9  si le uneste in vectorul 
--numar_out pt a le putea afisa mai apoi pe SSD

entity despartire_numere_in4 is
    Port ( numar_in : in STD_LOGIC_VECTOR (9 downto 0);
           numar_out : out STD_LOGIC_VECTOR (15 downto 0));
end despartire_numere_in4;

architecture Behavioral of despartire_numere_in4 is

begin

process(numar_in)

variable numar : integer;
variable result1 : integer;
variable result2 : integer;
variable result3 : integer;
variable result4 : integer;

begin

numar := TO_INTEGER(unsigned(numar_in));

result1 := numar mod 10;
numar := numar / 10;

result2 := numar mod 10;
numar := numar / 10;

result3 := numar mod 10;
numar := numar / 10;

result4 := numar mod 10;
numar := numar / 10;


numar_out <= std_logic_vector(TO_UNSIGNED(result4, 4)) &
             std_logic_vector(TO_UNSIGNED(result3, 4)) &
             std_logic_vector(TO_UNSIGNED(result2, 4)) &
             std_logic_vector(TO_UNSIGNED(result1, 4));
 
end process;

end Behavioral;
