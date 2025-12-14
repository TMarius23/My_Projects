library IEEE;
use IEEE.STD_LOGIC_1164.ALL;
use IEEE.std_logic_unsigned.ALL;
use IEEE.numeric_std.ALL;

entity alu is
    Port ( a : in STD_LOGIC_VECTOR (3 downto 0);
           b : in STD_LOGIC_VECTOR (3 downto 0);
           op : in STD_LOGIC_VECTOR (2 downto 0);
           result : out STD_LOGIC_VECTOR (3 downto 0));
end alu;

architecture Behavioral of alu is

begin

process(a, b, op)
variable temp : std_logic_vector(3 downto 0) := "0000";

begin

case op is
    when "000" => temp := std_logic_vector(unsigned(a) + unsigned(b));
    when "001" => temp := std_logic_vector(unsigned(a) - unsigned(b));
    when "010" => temp := a and b;
    when "011" => temp := a or b;
    when "100" => temp := a xor b;
    when "101" => temp := std_logic_vector(unsigned(a) srl 1);
    when "110" => temp := std_logic_vector(unsigned(a) sll 1);
    when "111" => temp := not a ;
    when others  => temp := "0000" ;
end case;

result <= temp;

end process;



end Behavioral;
