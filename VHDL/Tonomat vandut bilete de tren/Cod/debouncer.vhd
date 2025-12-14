library IEEE;
    use IEEE.std_logic_1164.all;
    use IEEE.numeric_std.all;

entity debouncer is
    port(btn : in std_logic;
         clk : in std_logic;
         en : out std_logic);
end debouncer;

architecture behavioural of debouncer is

    constant delay : integer := 6500; -- 6.5ms
    signal count : integer := 0;
    signal btn_tmp : std_logic := '0';

    begin

    process(clk)
    begin
        if rising_edge(clk) then
            if (btn /= btn_tmp) then
                btn_tmp <= btn;
                count <= 0;
            elsif (count = delay) then
                en <= btn_tmp;
            else
                count <= count + 1;
            end if;
        end if;
    end process;

end behavioural;