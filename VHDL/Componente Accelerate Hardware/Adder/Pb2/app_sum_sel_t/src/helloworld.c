// Include bibliotecă standard pentru funcții de intrare/ieșire 
#include <stdio.h>  
// Include platforma specifică pentru inițializare și curățare 
#include "platform.h" 
// Include bibliotecă pentru manipularea perifericelor GPIO 
#include <xgpio.h> 
// Include definiții pentru parametrii hardware ai sistemului 
#include "xparameters.h" 
// Include funcții de întârziere (ex. usleep) 
#include "sleep.h" 


int main() 
{ 
// Declara variabile GPIO pentru butoane, intrerupatoare și LED-uri 
   XGpio inputButon, inputSwitch, outputLed; 
// Declara variabile GPIO pentru componentele carry-lookahead adder 
   XGpio inputClaX, inputClaY, inputCin, outputSum, outputCout; 
// Declara variabile pentru stocarea datelor de la butoane și  
//switch-uri 
   int button_data = 0; 
   int switch_data = 0; 
// Declara variabile pentru operanzii X, Y și carry-in, și  
//inițializează carry-in la 0 
   int operandX,operandY,operandCin; 
   operandCin = 0; 
// Declara variabile pentru stocarea sumei și carry-out 
   int sumaObtinuta, coutObtinut; 
// Inițializează perifericele (butoane, intrerupatoare și LED-uri) 
   XGpio_Initialize(&inputButon, XPAR_AXI_GPIO_0_BASEADDR);  
   XGpio_Initialize(&inputSwitch, XPAR_AXI_GPIO_1_BASEADDR); 
   XGpio_Initialize(&outputLed, XPAR_AXI_GPIO_2_BASEADDR);   
// Inițializează perifericele GPIO pentru carry-lookahead adder 
   XGpio_Initialize(&inputClaX, XPAR_AXI_GPIO_X_BASEADDR); 
   XGpio_Initialize(&inputClaY, XPAR_AXI_GPIO_Y_BASEADDR); 
   XGpio_Initialize(&inputCin, XPAR_AXI_GPIO_CIN_BASEADDR); 
   XGpio_Initialize(&outputSum, XPAR_AXI_GPIO_SUM_BASEADDR); 
   XGpio_Initialize(&outputCout, XPAR_AXI_GPIO_4_BASEADDR); 
// Setează direcția datelor pentru perifericele GPIO (intrare sau  
//ieșire) 
   XGpio_SetDataDirection(&inputButon, 1, 0xF);//intrare  
   XGpio_SetDataDirection(&inputSwitch, 1, 0xF);//intrare         
   XGpio_SetDataDirection(&outputLed, 1, 0x0);//iesire       
// Setează direcția datelor pentru CLA 
   XGpio_SetDataDirection(&inputClaX, 1, 0x0); //ieșire spre CLA        
   XGpio_SetDataDirection(&inputClaY, 1, 0x0); //ieșire spre CLA        
   XGpio_SetDataDirection(&inputCin, 1, 0); //ieșire spre CLA         
   XGpio_SetDataDirection(&outputSum, 1, 0xF); //intrare din CLA        
   XGpio_SetDataDirection(&outputCout, 1, 1);//intrare din CLA 
   init_platform();// Inițializează platforma hardware 
 
// Afișează un mesaj de start pe consolă 
print("Incepem procesarea in Labul 4 \n"); 
 
    while(1){ 
// Citește valorile de la switch-uri de la unicul canal 1 
      switch_data = XGpio_DiscreteRead(&inputSwitch, 1);     
// Citește valorile de la butoane 
      button_data = XGpio_DiscreteRead(&inputButon, 1);  
// Verifică ce buton este apăsat și efectuează acțiuni corespunzătoare 
      if(button_data == 0b00000){} // nu e apasat nici un buton 
// Dacă butonul 1 este apăsat, salvează valoarea din switch-uri ca  
//operand X 
      else if(button_data == 0b00001){ 
          operandX = switch_data; 
          printf("Operandul X este %d \n",operandX); 
      } 
// Dacă butonul 2 este apăsat, salvează valoarea din switch-uri ca operand Y 
      else if(button_data == 0b00010){ 
        operandY = switch_data; 
        printf("Operandul Y este %d \n",operandY); 
      } 
      else if(button_data == 0b00100){ 
// Dacă butonul 3 este apăsat, scrie valorile operanzilor și carry-in  
//către CLA 
          XGpio_DiscreteWrite(&inputClaX, 1, operandX); 
          XGpio_DiscreteWrite(&inputClaY, 1, operandY); 
          XGpio_DiscreteWrite(&inputCin, 1, operandCin); 
// Citește suma și carry-out de la CLA         
        sumaObtinuta = XGpio_DiscreteRead(&outputSum, 1); 
        coutObtinut = XGpio_DiscreteRead(&outputCout, 1); 
// Afișează suma pe LED-uri 
        XGpio_DiscreteWrite(&outputLed, 1, sumaObtinuta);    
// Afișează suma și carry-out în consolă 
        printf("Suma Obtinuta este %d \n",sumaObtinuta); 
        printf("Carry-ul Obtinut este %d \n",coutObtinut); 
      } 
      else 
// Afișează un mesaj dacă un buton invalid este apăsat 
          print("Apasati pe butoanele 1, 2 sau 3 \n"); 
 // Introduce o întârziere de 200 ms 
      usleep(200000);           //delay 
  
   } 
// Curăță și resetează platforma hardware 
    cleanup_platform(); 
    return 0; 
}