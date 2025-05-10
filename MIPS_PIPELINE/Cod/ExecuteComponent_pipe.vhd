library IEEE;
use IEEE.STD_LOGIC_1164.ALL;
use IEEE.NUMERIC_STD.ALL;
use IEEE.std_logic_unsigned.ALL;


entity ExecuteComponent_pipe is
    Port ( RD1 : in STD_LOGIC_VECTOR (31 downto 0);
           RD2 : in STD_LOGIC_VECTOR (31 downto 0);
           PCinc : in STD_LOGIC_VECTOR (31 downto 0);
           Ext_imm : in STD_LOGIC_VECTOR (31 downto 0);
           sa : in STD_LOGIC_VECTOR(4 downto 0);
           func : in STD_LOGIC_VECTOR (5 downto 0);
           RT : in STD_LOGIC_VECTOR (4 downto 0);
           RD : in STD_LOGIC_VECTOR (4 downto 0);
           ALUSrc : in STD_LOGIC;
           ALUOp : in STD_LOGIC_VECTOR (2 downto 0);
           RegDst : in STD_LOGIC; --IN/OUT
           Zero : out STD_LOGIC;
           BranchAddress : out STD_LOGIC_VECTOR (31 downto 0);
           ALURes : out STD_LOGIC_VECTOR (31 downto 0);
           rWA : out std_logic_vector(4 downto 0));
end ExecuteComponent_pipe;

architecture Behavioral of ExecuteComponent_pipe is

signal ALUIn2 : std_logic_vector(31 downto 0) := (others => '0');
signal ALUCtrl : std_logic_vector(2 downto 0) := (others => '0');

begin

with ALUSrc select 
     ALUIn2 <= RD2 when '0',
               Ext_imm when '1',
               (others => 'X') when others;

process(ALUOp, func)

begin

case ALUOp is
     when "000" => 
           case func is
                when "100000" => ALUCtrl <= "000"; --add
                when "110110" => ALUCtrl <= "111"; --mod
                when others => null;
           end case;
     when "001" => ALUCtrl <= "000"; --addi,lw,sw
     when "010" => ALUCtrl <= "001"; --beq
     when others => null;
end case;

end process;

rWA <= RT WHEN RegDst = '0' else RD;

process(ALUCtrl, RD1, ALUIn2, sa)

begin 

case ALUCtrl is
     when "000" => ALURes <= RD1 + ALUIn2; --add/addi,lw,sw
             
     when "001" => ALURes <= X"00000000"; --beq
                   if RD1 = ALUIn2 then
                      Zero <= '1';
                   else 
                      Zero <= '0';
                   end if;
    when "111" =>  ALURes <= std_logic_vector(to_unsigned(to_integer(unsigned(RD1)) mod to_integer(unsigned(ALUIn2)), ALURes'length));
    when others => null;
end case;

end process;

BranchAddress <= std_logic_vector(
                    unsigned(PCinc) + 
                    (unsigned(Ext_Imm(29 downto 0)) & "00")
                );

end Behavioral;
