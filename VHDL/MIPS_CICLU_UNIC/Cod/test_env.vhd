library IEEE;
use IEEE.STD_LOGIC_1164.ALL;
use IEEE.NUMERIC_STD.ALL;
use IEEE.std_logic_unsigned.ALL;

entity test_env is
  Port (clk : in std_logic;
        btn : in std_logic_vector(4 downto 0);
        sw : in std_logic_vector(15 downto 0);
        led : out std_logic_vector(15 downto 0);
        an : out std_logic_vector(7 downto 0);
        cat : out std_logic_vector(6 downto 0));
end test_env;

architecture Behavioral of test_env is

component MPG is
    Port ( clk : in STD_LOGIC;
           btn : in STD_LOGIC;
           en : out STD_LOGIC);
end component;

component SSD is
    Port ( clk : in STD_LOGIC;
           digit : in STD_LOGIC_VECTOR (31 downto 0);
           cat : out STD_LOGIC_VECTOR (6 downto 0);
           an : out STD_LOGIC_VECTOR (7 downto 0));
end component;


component IFetch is
    Port ( clk : in STD_LOGIC;
           rst : in std_logic;
           en : in std_logic;
           jmp_address : in std_logic_vector(31 downto 0);
           branch_address : in std_logic_vector(31 downto 0);
           Jump : in std_logic;
           PCSrc : in std_logic;
           Instruction: out std_logic_vector(31 downto 0);
           PCinc : out std_logic_vector(31 downto 0));
end component;

component InstructionDecode is
    Port ( clk : in STD_LOGIC;
           en : in STD_LOGIC;
           RegWrite : in STD_LOGIC;
           Instr : in STD_LOGIC_VECTOR (25 downto 0);
           RegDst : in STD_LOGIC;
           WD : in STD_LOGIC_VECTOR (31 downto 0);
           ExtOp : in STD_LOGIC;
           RD1 : out STD_LOGIC_VECTOR (31 downto 0);
           RD2 : out STD_LOGIC_VECTOR (31 downto 0);
           Ext_Imm : out STD_LOGIC_VECTOR (31 downto 0);
           func : out STD_LOGIC_VECTOR (5 downto 0);
           sa : out STD_LOGIC_VECTOR (4 downto 0));
end component;

component MainControl is
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
end component;

component ExecuteComponent is
    Port ( RD1 : in STD_LOGIC_VECTOR (31 downto 0);
           RD2 : in STD_LOGIC_VECTOR (31 downto 0);
           PCinc : in STD_LOGIC_VECTOR (31 downto 0);
           Ext_imm : in STD_LOGIC_VECTOR (31 downto 0);
           sa : in STD_LOGIC_VECTOR (4 downto 0);
           func : in STD_LOGIC_VECTOR (5 downto 0);
           ALUSrc : in STD_LOGIC;
           ALUOp : in STD_LOGIC_VECTOR (2 downto 0);
           Zero : out STD_LOGIC;
           BranchAddress : out STD_LOGIC_VECTOR (31 downto 0);
           ALURes : out STD_LOGIC_VECTOR (31 downto 0));
end component;

component RAM is 
    port(
        clk : in std_logic;
        MemWrite : in std_logic;
        ALUResIN : in std_logic_vector(31 downto 0);
        RD2 : in std_logic_vector(31 downto 0);
        MemData : out std_logic_vector(31 downto 0);
        ALUResOUT : out std_logic_vector(31 downto 0)
    );
end component;


signal Instruction, PCinc, WD, RD1, RD2, Ext_imm, Ext_func, Ext_sa, sum : std_logic_vector(31 downto 0) := (others => '0');
signal ALURes, ALUResOUT, MemData, BranchAddress, JumpAddress : std_logic_vector(31 downto 0) := (others => '0');
signal func : std_logic_vector(5 downto 0) := (others => '0');
signal sa : std_logic_vector(4 downto 0) := (others => '0');
signal digits : std_logic_vector(31 downto 0) := (others => '0');
signal cnt : std_logic_vector(5 downto 0) := (others => '0');
signal en : std_logic := '0';
signal rst : std_logic := '0';
signal Zero : std_logic := '0';
signal PCSrc : std_logic := '0';
signal RegDst, ExtOp, ALUsrc, Branch, Jump, MemWrite, MemtoReg, RegWrite : std_logic := '0';
signal ALUOp : std_logic_vector(2 downto 0) := (others => '0');


begin

Inst_MPG : MPG port map( clk => clk,
                         btn => btn(0),
                         en => en);

Inst_MPG_R : MPG port map( clk => clk,
                           btn => btn(1),
                           en => rst);
                           
Inst_IF : IFetch port map( clk => clk,
                          rst => rst,
                          en => en,
                          jmp_address => JumpAddress,
                          branch_address => BranchAddress,
                          Jump => Jump,
                          PCSrc => PCSrc,
                          Instruction => Instruction,
                          PCinc => PCinc);  
                     
Inst_ID : InstructionDecode port map (clk => clk,
                                      en => en,
                                      RegWrite => RegWrite,
                                      Instr => Instruction(25 downto 0),
                                      RegDst => RegDst,
                                      WD => WD,
                                      ExtOp => ExtOp,
                                      RD1 => RD1,
                                      RD2 => RD2,
                                      Ext_Imm => Ext_imm,
                                      func => func,
                                      sa => sa);
                                     
Inst_MainControl : MainControl port map (Instruction => Instruction(31 downto 26),
                                                         RegDst => RegDst,
                                                         ExtOp => ExtOp,
                                                         ALUSrc => ALUSrc,
                                                         Branch => Branch,
                                                         Jump => Jump,
                                                         ALUOp => ALUOp,
                                                         MemWrite => MemWrite,
                                                         MemtoReg => MemtoReg,
                                                         RegWrite => RegWrite);

Inst_ExecuteComponent : ExecuteComponent port map ( RD1 => RD1,
                                                    RD2 => RD2,
                                                    PCinc => PCinc,
                                                    Ext_imm => Ext_Imm,
                                                    sa => sa,
                                                    func => func,
                                                    ALUSrc => ALUSrc,
                                                    ALUOp => ALUOp,
                                                    Zero => Zero,
                                                    BranchAddress => BranchAddress,
                                                    ALURes => ALURes);

Inst_RAM : RAM port map (clk => clk,
                         MemWrite => MemWrite,
                         ALUResIN => ALURes, 
                         RD2 => RD2,
                         MemData => MemData,
                         ALUResOUT => ALUResOUT);
  
with MemtoReg select 
     WD <= MemData when '1',
           ALUResOUT when '0',
           (others => '0') when others;

PCSrc <= Zero and Branch;
JumpAddress <= PCinc(31 downto 28) &  Instruction(25 downto 0) & "00";             
--BranchAddress <= (PCinc + (Ext_Imm(29 downto 0) & "00"));

       
with sw(8 downto 5) select 
     digits <=  Instruction when "0000",
                PCinc when "0001",
                RD1 when "0010",
                RD2 when "0011",
                ALURes when "0100",
                Ext_Imm when "0101",
                MEMData when "0110",
                BranchAddress when "0111",
                WD when "1000",
                X"000000" & "000" & Instruction(25 downto 21) when "1001",
                X"000000" & "000" & Instruction(20 downto 16) when "1010",
                X"000000" & "000" & Instruction(15 downto 11) when "1011",
                (others => 'X') when others;
                  
                                                 
Inst_SSD : SSD port map( clk => clk,
                         digit => digits,
                         cat => cat,
                         an => an);
                         
led(11 downto 0) <= Zero & ALUOp & RegDst & ExtOp & ALUSrc & Branch & Jump & MemWrite & MemtoReg & RegWrite;

end Behavioral;
