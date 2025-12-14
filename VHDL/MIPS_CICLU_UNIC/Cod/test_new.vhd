library IEEE;
use IEEE.STD_LOGIC_1164.ALL;
use IEEE.NUMERIC_STD.ALL;       
use IEEE.std_logic_unsigned.ALL;

entity test_new is
    Port ( sw : in STD_LOGIC;
           btn : in STD_LOGIC;
           clk : in STD_LOGIC;
           led : out STD_LOGIC_VECTOR (7 downto 0));
end test_new;

architecture Behavioral of test_new is

component MPG is
    Port ( clk : in STD_LOGIC;
           btn : in STD_LOGIC;
           en : out STD_LOGIC);
end component;

signal enable : std_logic := '0';
signal cnt : std_logic_vector(2 downto 0) := "000";

begin   

Inst_MPG : MPG port map (clk => clk,
                         btn => btn,
                         en => enable);
                         
process(clk)

begin
if rising_edge(clk) then
   if enable = '1' then
      if sw = '1' then
         cnt <= cnt + 1;
      else
         cnt <= cnt - 1;
      end if;
   end if;
end if;

end process;     


process(cnt)
begin
case cnt is
    when "000" => led <= "00000001";                  
    when "001" => led <= "00000010";                  
    when "010" => led <= "00000100";                  
    when "011" => led <= "00001000";                  
    when "100" => led <= "00010000";                  
    when "101" => led <= "00100000";                  
    when "110" => led <= "01000000";                  
    when others=> led <= "10000000";                  
end case;
end process;

end Behavioral;
