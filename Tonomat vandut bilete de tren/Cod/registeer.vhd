library IEEE;
use IEEE.STD_LOGIC_1164.ALL;

entity registeer is
    Port ( shift : in STD_LOGIC;
           btn : in STD_LOGIC;
           clk : in STD_LOGIC;
           Ld : in STD_LOGIC;
           Rst : in STD_LOGIC;
           rep : in STD_LOGIC;
           date_in : in STD_LOGIC_VECTOR (8 downto 0);
           date_out : out STD_LOGIC_VECTOR (8 downto 0));
end registeer;

architecture Behavioral of registeer is

signal reg: STD_LOGIC_VECTOR (8 downto 0);
signal btn_debouncer: STD_LOGIC;


component debouncer is
    Port ( btn : in STD_LOGIC;
           clk : in STD_LOGIC;
           en : out STD_LOGIC);
end component debouncer;


begin

i1 : debouncer port map(btn, clk, btn_debouncer);


-- fi atnet la registru ;a proces si gandestete la>>>>>>>>>>>>>>>>>>>.
--reg(3 downto 1); pt ca ai un numar mai mare salvat aicea 

process(clk)
begin
    if(Rst = '1') then
        reg <= "000000000";
    elsif Ld = '1' and Rst = '0' then
        reg <= date_in;
    elsif rising_edge(clk) and btn_debouncer = '1' then 
        if shift = '0' then
            reg <= rep & reg(3 downto 1);
        else
            reg <= rep & reg(2 downto 0);
        end if;
   end if;

end process;

end Behavioral;
