library ieee;
use ieee.std_logic_1164.all;
use ieee.numeric_std.all;

-- Entitatea inmultitorului shift-and-add
entity multiplicator_pe_nBiti is
  generic (
        N : integer := 4  -- Numărul de biți pentru operanzi
    );
    port (
        clk     : in  std_logic;                     -- Semnal de ceas
        resetare: in  std_logic;                     -- Semnal de reset
        start   : in  std_logic;                     -- Semnal de start pentru începerea înmulțirii
        a       : in  std_logic_vector(N-1 downto 0);  -- Primul operand
        b       : in  std_logic_vector(N-1 downto 0);  -- Al doilea operand
        rezultat: out std_logic_vector(2*N downto 0);
        gata    : out std_logic                      -- Semnal care indică finalizarea înmulțirii
    );
end entity multiplicator_pe_nBiti;

-- Arhitectura inmultitorului
architecture Behavioral of multiplicator_pe_nBiti is
    type stare_t is (ASTEPTARE, CALCUL, FINALIZARE);  -- Definirea stărilor FSM
    signal stare : stare_t;                           -- Starea curentă a FSM
    signal T : std_logic := '0';                           -- Starea curentă a FSM
    signal sel_transport : integer := 0;           -- Produsul parțial/final cu bit de carry
    signal produs : std_logic_vector(N-1 downto 0) := (others => '0');           -- Produsul parțial/final cu bit de carry
    signal deinmultit : std_logic_vector(N-1 downto 0) := (others => '0');     -- Multiplicandul extin   s la 2*N+1 biți
    signal inmultitor : std_logic_vector(N-1 downto 0) := (others => '0');    -- Multiplicatorul
    signal contor : integer range 0 to N;             -- Contor pentru iterații
begin
    
    
    process(clk, resetare)
    variable suma : unsigned(N downto 0);
    begin
        if resetare = '1' then  -- Resetare asincronă
            stare <= ASTEPTARE;
            produs <= (others => '0');
            deinmultit <= (others => '0');
            inmultitor <= (others => '0');
            contor <= 0;
            T <= '0';
            gata <= '0';
        elsif rising_edge(clk) then  -- La fiecare front crescător al ceasului
            case stare is
                when ASTEPTARE =>
                    if start = '1' then  -- Dacă semnalul de start este activ
                        stare <= CALCUL;
                        produs <= (others => '0');
                        deinmultit <= a;
                        inmultitor <= b;
                        contor <= 0;
                        T <= '0';
                        gata <= '0';
                    end if;
                
                when CALCUL =>
                    if deinmultit(0) = '1' then  -- Dacă bitul curent al multiplicatorului este 1
                        suma := unsigned('0' & produs) + unsigned('0' & inmultitor);
                        produs <= std_logic_vector(suma((N - 1) downto 0));  -- Adunare cu carry
                        T <=  suma(N);
                    else
                        T <= '0';                      
                    end if;
                    
                    deinmultit <= produs(0) & deinmultit((N - 1) downto 1);
                    produs <= T & produs((N - 1) downto 1);
                    T <= '0';
                    
                    contor <= contor + 1;
                    
                    if contor = N-1 then  -- Dacă s-au procesat toți biții
                        stare <= FINALIZARE;
                    end if;
                
                when FINALIZARE =>
                    rezultat <= std_logic_vector(T & produs & deinmultit);  --
                    gata <= '1';
                    stare <= ASTEPTARE;
            end case;
        end if;
    end process;
end architecture Behavioral;