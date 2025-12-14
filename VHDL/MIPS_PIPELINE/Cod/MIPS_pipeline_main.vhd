library IEEE;
use IEEE.STD_LOGIC_1164.ALL;
use IEEE.NUMERIC_STD.ALL;
use IEEE.std_logic_unsigned.ALL;

entity MIPS_pipeline_main is
  Port (clk : in std_logic;
        btn : in std_logic_vector(4 downto 0);
        sw : in std_logic_vector(15 downto 0);
        led : out std_logic_vector(15 downto 0);
        an : out std_logic_vector(7 downto 0);
        cat : out std_logic_vector(6 downto 0));
end MIPS_pipeline_main;

architecture Behavioral of MIPS_pipeline_main is

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


component IFetch_pipe is
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

component InstructionDecode_pipe is
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

component ExecuteComponent_pipe is
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
           RegDst : in STD_LOGIC;
           Zero : out STD_LOGIC;
           BranchAddress : out STD_LOGIC_VECTOR (31 downto 0);
           ALURes : out STD_LOGIC_VECTOR (31 downto 0);
           rWA : out std_logic_vector(4 downto 0));
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
signal rt, rd, rWA : std_logic_vector(4 downto 0) := (others => '0');
signal digits : std_logic_vector(31 downto 0) := (others => '0');
signal cnt : std_logic_vector(5 downto 0) := (others => '0');
signal en : std_logic := '0';
signal rst : std_logic := '0';
signal Zero : std_logic := '0';
signal PCSrc : std_logic := '0';
signal RegDst, ExtOp, ALUsrc, Branch, Jump, MemWrite, MemtoReg, RegWrite : std_logic := '0';
signal ALUOp : std_logic_vector(2 downto 0) := (others => '0');

--pipeline register
--IF_ID
signal PCinc_IF_ID, Instruction_IF_ID :  std_logic_vector(31 downto 0) := (others => '0');
--ID_EX
signal PCinc_ID_EX, RD1_ID_EX, RD2_ID_EX, Ext_imm_ID_EX :  std_logic_vector(31 downto 0) := (others => '0');
signal ALUOp_ID_EX :  std_logic_vector(2 downto 0) := (others => '0');
signal func_ID_EX :  std_logic_vector(5 downto 0) := (others => '0');
signal rt_ID_EX, rd_ID_EX, sa_ID_EX :  std_logic_vector(4 downto 0) := (others => '0');
signal MemtoReg_ID_EX, RegWrite_ID_EX, MemWrite_ID_EX, Branch_ID_EX, ALUSrc_ID_EX, RegDst_ID_EX :  std_logic := '0';
--EX_MEM
signal BranchAddress_EX_MEM, ALURes_EX_MEM, RD2_EX_MEM :  std_logic_vector(31 downto 0) := (others => '0');
signal rd_EX_MEM : std_logic_vector(4 downto 0) := (others => '0');
signal zero_EX_MEM,  MemtoReg_EX_MEM, RegWrite_EX_MEM, MemWrite_EX_MEM, Branch_EX_MEM :  std_logic := '0';
--MEM_WB
signal MemData_MEM_WB, ALURes_MEM_WB :  std_logic_vector(31 downto 0) := (others => '0');
signal rd_MEM_WB :  std_logic_vector(4 downto 0) := (others => '0');
signal MemtoReg_MEM_WB, RegWrite_MEM_WB :  std_logic := '0';



begin

Inst_MPG : MPG port map( clk => clk,
                         btn => btn(0),
                         en => en);

Inst_MPG_R : MPG port map( clk => clk,
                           btn => btn(1),
                           en => rst);
                           
Inst_IF : IFetch_pipe port map( clk => clk,
                                rst => rst,
                                en => en,
                                jmp_address => JumpAddress,
                                branch_address => BranchAddress_EX_MEM,
                                Jump => Jump,
                                PCSrc => PCSrc,
                                Instruction => Instruction,
                                PCinc => PCinc);  
                     
Inst_ID : InstructionDecode_pipe port map (clk => clk,--
                                           en => en,--
                                           RegWrite => RegWrite_MEM_WB, --
                                           Instr => Instruction_IF_ID(25 downto 0),--
                                           RD_M => rd_MEM_WB,--
                                           WD => WD,--
                                           ExtOp => ExtOp,--
                                           RD1 => RD1,--
                                           RD2 => RD2,--
                                           Ext_Imm => Ext_imm,--
                                           func => func,--
                                           sa => sa,
                                           rt => rt,
                                           rd => rd);--
                                     
Inst_MainControl : MainControl port map (Instruction => Instruction_IF_ID(31 downto 26),
                                                         RegDst => RegDst,
                                                         ExtOp => ExtOp,
                                                         ALUSrc => ALUSrc,
                                                         Branch => Branch,
                                                         Jump => Jump,
                                                         ALUOp => ALUOp,
                                                         MemWrite => MemWrite,
                                                         MemtoReg => MemtoReg,
                                                         RegWrite => RegWrite);

Inst_ExecuteComponent : ExecuteComponent_pipe port map ( RD1 => RD1_ID_EX,
                                                         RD2 => RD2_ID_EX,
                                                         PCinc => PCinc_ID_EX,
                                                         Ext_imm => Ext_Imm_ID_EX,
                                                         sa => sa_ID_EX,
                                                         func => func_ID_EX,
                                                         RT => rt_ID_EX,
                                                         RD => rd_ID_EX,
                                                         ALUSrc => ALUSrc_ID_EX,
                                                         ALUOp => ALUOp_ID_EX,
                                                         RegDst => RegDst_ID_EX,
                                                         Zero => Zero,
                                                         BranchAddress => BranchAddress,
                                                         ALURes => ALURes,
                                                         rWA => rWA);

Inst_RAM : RAM port map (clk => clk,
                         MemWrite => MemWrite_EX_MEM,
                         ALUResIN => ALURes_EX_MEM, 
                         RD2 => RD2_EX_MEM,
                         MemData => MemData,
                         ALUResOUT => ALUResOUT);
  
with MemtoReg_Mem_WB select 
     WD <= MemData_MEM_WB when '1',
           ALURes_MEM_WB when '0',
           (others => '0') when others;

PCSrc <= Zero_EX_MEM and Branch_EX_MEM;
JumpAddress <= PCinc_IF_ID(31 downto 28) &  Instruction_IF_ID(25 downto 0) & "00";             
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

process(clk, en)
begin

if rising_edge (clk) then
    if en = '1' then
        --IF_ID
        PCinc_IF_ID <= PCinc;
        Instruction_IF_ID <= Instruction;
        --ID_EX
        PCinc_ID_EX <= PCinc_IF_ID;
        RD1_ID_EX <= RD1;
        RD2_ID_EX <= RD2;
        Ext_imm_ID_EX <= Ext_imm;
        sa_ID_EX <= sa;
        func_ID_EX <= func;
        rt_ID_EX <= rt;        --grija la astea
        rd_ID_EX <= rd;
        MemtoReg_ID_EX <= MemtoReg;
        RegWrite_ID_EX <= RegWrite;
        MemWrite_ID_EX <= MemWrite;
        Branch_ID_EX <= Branch;
        ALUSrc_ID_EX <= ALUSrc;
        ALUOp_ID_EX <= ALUOp;
        RegDst_ID_EX <=RegDst;
        --EX_MEM
        BranchAddress_EX_MEM <= BranchAddress;
        Zero_EX_MEM <= Zero;
        ALURes_EX_MEM <= ALURes;
        RD2_EX_MEM <= RD2_ID_EX;
        rd_EX_MEM <= rWA;
        MemtoReg_EX_MEM <= MemtoReg_ID_EX;
        RegWrite_EX_MEM <= RegWrite_ID_EX;
        MemWrite_EX_MEM <= MemWrite_ID_EX;
        Branch_EX_MEM <= Branch_ID_EX;
        --MEM_WB
        MemData_MEM_WB <= MemData;
        ALURes_MEM_WB <= ALUResOUT;
        rd_MEM_WB <= rd_EX_MEM;
        MemtoReg_MEM_WB <= MemtoReg_EX_MEM;
        RegWrite_MEM_WB <= RegWrite_EX_MEM;
        
    end if;
end if;
end process;


end Behavioral;
