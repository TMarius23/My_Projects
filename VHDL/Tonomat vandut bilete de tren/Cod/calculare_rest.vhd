library IEEE;
use IEEE.STD_LOGIC_1164.ALL;
use IEEE.NUMERIC_STD.ALL;

entity calculare_rest is
    Port ( 
        in_bani : in STD_LOGIC_VECTOR (9 downto 0);
        cost_bilet : in STD_LOGIC_VECTOR (9 downto 0);
        ok_bani : in STD_LOGIC;
        rest : out STD_LOGIC_VECTOR (9 downto 0);
        bani_insuf : out STD_LOGIC
    );
end calculare_rest;

architecture Behavioral of calculare_rest is

begin
    process(in_bani, cost_bilet, ok_bani)
    begin
        if ok_bani = '1' then
            if unsigned(in_bani) < unsigned(cost_bilet) then
                rest <= (others => '0');
                bani_insuf <= '1';
            else
                rest <= std_logic_vector(unsigned(in_bani) - unsigned(cost_bilet));
                bani_insuf <= '0';
            end if;
        else
            rest <= (others => '0');
            bani_insuf <= '0';
        end if;
    end process;

end Behavioral;
