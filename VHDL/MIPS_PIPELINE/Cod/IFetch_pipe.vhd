library IEEE;
use IEEE.STD_LOGIC_1164.ALL;
use IEEE.NUMERIC_STD.ALL;
use IEEE.std_logic_unsigned.ALL;


entity IFetch_pipe is
    Port ( clk : in STD_LOGIC;
           rst : in std_logic;
           en : in std_logic;
           jmp_address : in std_logic_vector(31 downto 0);
           branch_address : in std_logic_vector(31 downto 0);
           Jump : in std_logic;
           PCSrc : in std_logic;
           Instruction: out std_logic_vector(31 downto 0);
           PCinc : out std_logic_vector(31 downto 0));
end IFetch_pipe;

architecture Behavioral of IFetch_pipe is

signal pc : std_logic_vector(31 downto 0) := (others => '0');
signal semnal_mux_1 : std_logic_vector(31 downto 0) := (others => '0');
signal pc_aux : std_logic_vector(31 downto 0) := (others => '0');
signal pc_next : std_logic_vector(31 downto 0) := (others => '0');

type ROM_TYPE is array(0 to 63) of std_logic_vector(31 downto 0);
signal rom : ROM_TYPE := ( 
                          B"000000_00000_00000_00001_00000_100000", --X00000820    --add $1, $0, $0      --0
                          B"001000_00000_00100_0000000000001010", --X2004000A      --addi $4, $0, 10     --1
                          B"000000_00000_00000_00010_00000_100000", --X00001020    --add $2, $0, $0      --2
                          B"000000_00000_00000_00101_00000_100000", --X00002820    --add $5, $0, $0      --3
                          B"001000_00000_00110_0000000000000011", --X20060003      --addi $6, $0, 3      --4
                          B"001000_00000_00111_0000000000000001", --X20070001      --addi $7, $0, 1      --5
                          B"000100_00001_00100_0000000000010000", --X10240010     --beq $1, $4, 16      --6
                          X"00000000",--NoOp
                          X"00000000",--NoOp
                          X"00000000",--NoOp
                          B"001000_00000_01000_0000000000000000", --X20080000      --addi $8, $0, 0      --7
                          B"100011_00010_00011_0000000000000000", --8C430000      --lw $3, v_addr($2)    --8
                          X"00000000",--NoOp
                          X"00000000",--NoOp
                          B"000000_00011_00110_01000_00000_110110", --X00664036    --mod $8, $3, $6      --9
                          X"00000000",--NoOp
                          B"001000_00001_00001_0000000000000001", --X20210001      --addi $1, $1, 1      --12
                          B"000100_01000_00111_0000000000000100", --X11070001      --beq $8, $7, 4     --10
                          X"00000000",--NoOp
                          X"00000000",--NoOp
                          X"00000000",--NoOp
                          B"000000_00101_00011_00101_00000_100000", --X00A32820    --add $5, $5, $3      --11
                          B"000010_00000000000000000000000110", --X08000006/18        --j 6    /24           --13
                          B"001000_00010_00010_0000000000000001", --X20420001      --addi $2, $2, 1      --14
                          B"101011_01011_00101_0000000000000000", --XAD4B0000      --sw $5, sum_addr($11) --15
                          X"00000000",--NoOp
                          X"00000000",--NoOp
                          B"100011_01011_00001_0000000000000000", --X8D610000      --lw $1, sum_addr($11) --16

                          others => X"00000000" --NoOp(ADD $0, $0, $0)
                         );

begin


semnal_mux_1 <= pc_aux when PCSrc ='0' else branch_address;
pc_next <= semnal_mux_1 when Jump = '0' else jmp_address;

PCCOUNTER : process(clk, rst, en)
begin
if rst = '1' then 
    pc <= X"00000000";
elsif rising_edge (clk) then
   if en = '1' then
       pc <= pc_next;
   end if;
end if;
end process;


Instruction <= rom(conv_integer(pc(6 downto 2)));
pc_aux <= (pc + 4);
PCinc<=pc_aux;


end Behavioral;
