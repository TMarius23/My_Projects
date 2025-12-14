library IEEE;
use IEEE.STD_LOGIC_1164.ALL;
use IEEE.std_logic_unsigned.ALL;
use IEEE.numeric_std.ALL;

entity SSD is
    Port ( input_data : in STD_LOGIC_VECTOR (15 downto 0);
           clk : in STD_LOGIC;
           catodes : out STD_LOGIC_VECTOR (0 to 6);
           anodes : out STD_LOGIC_VECTOR (3 downto 0));
end SSD;

architecture Behavioral of SSD is

type ssd_digits is array(0 to 9) of std_logic_vector(0 to 6);

constant digits : ssd_digits := (
    "0000001",
    "1001111",
    "0010010",
    "0000110",
    "1001100",
    "0100100",
    "0100000",
    "0001111",
    "0000000",
    "0000100"   
);

signal count : std_logic_vector(15 downto 0) := X"0000";
signal curent_digits : std_logic_vector(0 to 6) := "0000000";

begin

process(clk)
begin   
    if (rising_edge(clk)) then
        count <= count + 1;
    end if;
end process;

process(count(15 downto 14))
begin
    if(count(15 downto 14) = "00") then 
         anodes <= "1110"; 
         catodes <= digits(TO_INTEGER(unsigned(input_data(3 downto 0))));
    end if;
    if(count(15 downto 14) = "01") then 
         anodes <= "1101"; 
         catodes <= digits(TO_INTEGER(unsigned(input_data(7 downto 4))));
     end if;
      if(count(15 downto 14) = "10") then 
         anodes <= "1011"; 
         catodes <= digits(TO_INTEGER(unsigned(input_data(11 downto 8))));
    end if;
    
    if(count(15 downto 14) = "11") then 
       anodes <= "0111"; 
       catodes <= digits(TO_INTEGER(unsigned(input_data(15 downto 12))));
    end if;
    
end process;

end Behavioral;
