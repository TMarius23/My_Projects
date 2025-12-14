library IEEE;
use IEEE.std_logic_1164.ALL;
use IEEE.std_logic_unsigned.ALL;
use IEEE.numeric_std.ALL;

entity RAM is 
    port(
        clk : in std_logic;
        MemWrite : in std_logic;
        ALUResIN : in std_logic_vector(31 downto 0);
        RD2 : in std_logic_vector(31 downto 0);
        MemData : out std_logic_vector(31 downto 0);
        ALUResOUT : out std_logic_vector(31 downto 0)
    );
end RAM;


architecture Behavioral of RAM is 

type ram_type is array(0 to 63) of std_logic_vector(31 downto 0);
signal ram_m : ram_type := (
             X"00000003", --3
             X"0000000D", --13
             X"00000011", --17  
             X"00000015", --21
             X"00000005", --5
             X"00000013", --19
             X"00000021", --33
             X"0000003A", --58
             X"00000004", --4
             others => X"00000000");

begin

ALUResOUT <= ALUResIN;

process(clk)
begin

if rising_edge (clk) then
    if MemWrite = '1' then
       ram_m(conv_integer (ALUResIN)) <= RD2;
       MemData <= RD2;
    else
       MemData <= ram_m(conv_integer (ALUResIN));
    end if;
end if;

end process;



end Behavioral;