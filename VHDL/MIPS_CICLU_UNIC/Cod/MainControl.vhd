library IEEE;
use IEEE.STD_LOGIC_1164.ALL;


entity MainControl is
    Port ( Instruction : in STD_LOGIC_VECTOR (5 downto 0);
           RegDst : out STD_LOGIC;
           ExtOp : out STD_LOGIC;
           ALUSrc : out STD_LOGIC;
           Branch : out STD_LOGIC;
           Jump : out STD_LOGIC;
           ALUOp : out STD_LOGIC_VECTOR(2 downto 0);
           MemWrite : out STD_LOGIC;
           MemtoReg : out STD_LOGIC;
           RegWrite : out STD_LOGIC);
end MainControl;

architecture Behavioral of MainControl is

begin
process(Instruction)
begin

case Instruction is

     when "000000" => RegDst <= '1';
                      ExtOp <= '0'; --X
                      ALUSrc <= '0';
                      Branch <= '0';
                      Jump <= '0';
                      ALUOp<= "000";
                      MemWrite <= '0';
                      MemtoReg <= '0';
                      RegWrite <= '1';--add
                      
--     when "000000" => RegDst <= '1';
--                      ExtOp <= 'X';
--                      ALUSrc <= '0';
--                      Branch <= '1';
--                      Jump <= '0';
--                      ALUOp<= "011";
--                      MemWrite <= '0';
--                      MemtoReg <= '0';
--                      RegWrite <= '1'};--mod   
    
     when "001000" => RegDst <= '0';
                      ExtOp <= '1';
                      ALUSrc <= '1';
                      Branch <= '0'; 
                      Jump <= '0';
                      ALUOp<= "001";
                      MemWrite <= '0';
                      MemtoReg <= '0';
                      RegWrite <= '1';--addi
                      
     when "000100" => RegDst <= '0'; --X
                      ExtOp <= '1';
                      ALUSrc <= '0';
                      Branch <= '1'; 
                      Jump <= '0';
                      ALUOp<= "010";
                      MemWrite <= '0';
                      MemtoReg <= '0'; --X
                      RegWrite <= '0';--beq
                      
                      
     when "000010" => RegDst <= '0'; --X
                      ExtOp <= '0'; --X
                      ALUSrc <= '0'; --X
                      Branch <= '0'; --X 
                      Jump <= '1';
                      ALUOp<= "011"; 
                      MemWrite <= '0'; 
                      MemtoReg <= '0'; --X
                      RegWrite <= '0';--j
                      
     when "100011" => RegDst <= '0'; 
                      ExtOp <= '1'; 
                      ALUSrc <= '1'; 
                      Branch <= '0'; 
                      Jump <= '0'; 
                      ALUOp<= "001"; 
                      MemWrite <= '0'; 
                      MemtoReg <= '1'; 
                      RegWrite <= '1';--lw
                      
     when "101011" => RegDst <= '0'; 
                      ExtOp <= '1'; 
                      ALUSrc <= '1'; 
                      Branch <= '0';
                      Jump <= '0'; 
                      ALUOp<= "001"; 
                      MemWrite <= '1'; 
                      MemtoReg <= 'X'; 
                      RegWrite <= '0';--sw
                       
     when others => RegDst <= '0'; 
                    ExtOp <= '0'; 
                    ALUSrc <= '0'; 
                    Branch <= '0'; 
                    Jump <= '0'; 
                    ALUOp<= "110"; 
                    MemWrite <= '0'; 
                    MemtoReg <= '0'; 
                    RegWrite <= '0';
end case;

end process;


end Behavioral;
