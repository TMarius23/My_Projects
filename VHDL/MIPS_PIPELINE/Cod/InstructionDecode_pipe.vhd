library IEEE;
use IEEE.STD_LOGIC_1164.ALL;
use IEEE.NUMERIC_STD.ALL;
use IEEE.std_logic_unsigned.ALL;

entity InstructionDecode_pipe is
    Port ( clk : in STD_LOGIC;
           en : in STD_LOGIC;
           RegWrite : in STD_LOGIC;
           Instr : in STD_LOGIC_VECTOR (25 downto 0);
           RD_M : in STD_LOGIC_VECTOR (4 downto 0);
           WD : in STD_LOGIC_VECTOR (31 downto 0);
           ExtOp : in STD_LOGIC;
           RD1 : out STD_LOGIC_VECTOR (31 downto 0);
           RD2 : out STD_LOGIC_VECTOR (31 downto 0);
           Ext_Imm : out STD_LOGIC_VECTOR (31 downto 0);
           func : out STD_LOGIC_VECTOR (5 downto 0);
           sa : out STD_LOGIC_VECTOR (4 downto 0);
           rt : out STD_LOGIC_VECTOR (4 downto 0); 
           rd : out STD_LOGIC_VECTOR (4 downto 0));
end InstructionDecode_pipe;

architecture Behavioral of InstructionDecode_pipe is

signal WA : std_logic_vector(4 downto 0) := (others => '0'); 
type reg_array is array(0 to 31) of std_logic_vector(31 downto 0); 
signal reg_file : reg_array:= (others => X"00000000");

begin


process(RegWrite, WD, Instr, en, clk, RD_M)
begin
if falling_edge (clk) then
    if RegWrite = '1' and en = '1' then 
        reg_file(conv_integer(RD_M)) <= WD;
     end if; 
end if; 

end process;

 RD1 <= reg_file(conv_integer(Instr(25 downto 21))); 
 RD2 <= reg_file(conv_integer(Instr(20 downto 16))); 
 
 sa <= Instr(10 downto 6);
 func <= Instr(5 downto 0);
 
 rt <=  Instr(20 downto 16);
 rd <=  Instr(15 downto 11);
    
 Ext_Imm(15 downto 0) <= Instr(15 downto 0);  
 Ext_Imm(31 downto 16) <= (others => Instr(15)) when ExtOp = '1' else (others => '0'); 
 
    
end Behavioral;
