library IEEE;
use IEEE.STD_LOGIC_1164.ALL;
use IEEE.std_logic_unsigned.all;

entity numarator_5 is
    Port ( En_count : in STD_LOGIC;
           Rst_count : in STD_LOGIC;
           Ld_count : in STD_LOGIC;
           Num_in : in STD_LOGIC_VECTOR(2 downto 0);
           Num_out : out STD_LOGIC_VECTOR (2 downto 0);
           Fin_cnt : out STD_LOGIC;
           clk : in STD_LOGIC);
end numarator_5;

architecture Behavioral of numarator_5 is

signal num_tmp : std_logic_vector (2 downto 0) := (others => '0');

begin

process(clk, Rst_count, Ld_count, En_count)
begin

    if Rst_count = '1' then
        num_tmp <= "000";
    elsif Ld_count = '1' and Rst_count = '0' then
        num_tmp <= Num_in;
    elsif rising_edge(clk) then 
        if En_count = '1' then
           num_tmp <= num_tmp + '1';
        end if; 
    end if; 
     
    if(num_tmp = "100") then
      Fin_cnt <= '1';
      num_tmp <= "000";
   else
      Fin_cnt <= '0';
   end if;
     
end process;

Num_out <= num_tmp;

end Behavioral;
