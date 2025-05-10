library IEEE;
use IEEE.STD_LOGIC_1164.ALL;
use IEEE.STD_LOGIC_ARITH.ALL;
use IEEE.STD_LOGIC_UNSIGNED.ALL;

entity button_to_switch2 is
    Port (
        clk : in std_logic;  -- Clock signal
        rst : in std_logic;  -- Reset signal
        btn : in std_logic;  -- Button input
        sw  : out std_logic  -- Switch output
    );
end button_to_switch2;

architecture Behavioral of button_to_switch2 is
    signal btn_prev : std_logic := '0';
    signal sw_state : std_logic := '0';
begin
    process(clk, rst)
    begin
        if rst = '1' then
            sw_state <= '0';
            btn_prev <= '0';
        elsif rising_edge(clk) then
            if btn = '1' and btn_prev = '0' then
                sw_state <= not sw_state;  -- Toggle switch state
            end if;
            btn_prev <= btn;
        end if;
    end process;
    
    sw <= sw_state;
end Behavioral;
