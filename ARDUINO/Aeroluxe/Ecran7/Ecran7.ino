/*
  \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
  /////////////////////////////////\
  ///////////INITIALIZARI//////////\
  /////////////////////////////////\
  \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
*/



#include <SPI.h>
#include "Adafruit_GFX.h"
#include "MCUFRIEND_kbv.h"
#include <Adafruit_TFTLCD.h>
#include <Adafruit_GFX.h>
#include <TouchScreen.h>
#include <Wire.h>
///#include "Arduino.h"
#include <Adafruit_Sensor.h>
#include <Adafruit_BME280.h>
#define SEALEVELPRESSURE_HPA (1013.25)
Adafruit_BME280 bme;
#include "Adafruit_CCS811.h"
Adafruit_CCS811 ccs;
#include <SoftwareSerial.h>
#include <Fonts/FreeMonoBoldOblique12pt7b.h>
#include <Fonts/FreeSerif9pt7b.h>
#include "Adafruit_ILI9341.h"
// #include "SD.h"
#include "SdFat.h"
// #include <WiFi.h>
#include <Adafruit_HMC5883_U.h>
#include <EEPROM.h>


#define delay_afi_ok 100
#define delay_afi_y 500


//id admin logare aplicatie
#define ID_ADMIN_LOGIN 1362

const long MAGIX_NUMBER_ADDRESS = 0xAA55AA55L;



const uint8_t SD_CS_PIN = 10;
const uint8_t SOFT_MISO_PIN = 12;
const uint8_t SOFT_MOSI_PIN = 11;
const uint8_t SOFT_SCK_PIN  = 13;

// Acum linia asta va fi recunoscuta:
SoftSpiDriver<SOFT_MISO_PIN, SOFT_MOSI_PIN, SOFT_SCK_PIN> softSpi;
#define SD_CONFIG SdSpiConfig(SD_CS_PIN, DEDICATED_SPI, SD_SCK_MHZ(0), &softSpi)

SdFat sd;
SdFile file;

const char* NUME_FISIER_CSV = "DATE.CSV";




unsigned char hexdata[9] = { 0xFF, 0x01, 0x86, 0x00, 0x00, 0x00, 0x00, 0x00, 0x79 };

///RXD->RX
///TXD->TX

SoftwareSerial ser_co2(51, 50);  // RX, TX

///RXD->TX
///TXD->Rx
///SoftwareSerial my_sds(52, 53); // RX, TX

const float max_volts = 5.0;
const float max_analog_steps = 1023.0;

unsigned long delayTime;

int buzzerPin = 48;
const int sensorPin = A13;  // Pinul analogic pentru senzor
const float R_L = 10.0;     // Rezistența de sarcină (kΩ)
float R0 = 18.37;

MCUFRIEND_kbv tft;

// Creare obiect pentru senzor
Adafruit_HMC5883_Unified mag = Adafruit_HMC5883_Unified(12345);


#define BLACK 0x0000
#define NAVY 0x000F
#define DARKGREEN 0x03E0
#define DARKCYAN 0x03EF
#define MAROON 0x7800
#define PURPLE 0x780F
#define OLIVE 0x7BE0
#define LIGHTGREY 0xC618
#define DARKGREY 0x7BEF
#define BLUE 0x001F
#define GREEN 0x07E0
#define CYAN 0x07FF
#define RED 0xF800
#define MAGENTA 0xF81F
#define YELLOW 0xFFE0
#define WHITE 0xFFFF
#define ORANGE 0xFD20
#define GREENYELLOW 0xAFE5
#define PINK 0xF81F


#define LCD_CS A3
#define LCD_CD A2
#define LCD_WR A1
#define LCD_RD A0
#define LCD_RESET A4


#define TS_MINX 204
#define TS_MINY 195
#define TS_MAXX 948
#define TS_MAXY 910

#define YP A2  // must be an analog pin, use "An" notation!
#define XM A3  // must be an analog pin, use "An" notation!
#define YM 8   // can be a digital pin
#define XP 9   // can be a digital pin

TouchScreen tou = TouchScreen(XP, YP, XM, YM, 364);
TSPoint p;



/*
  \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
  ///////////////////////////////\
  //////INITIALIZARI PENTRU//////\
  //////////GRAFICE//////////////\
  ///////////////////////////////\
  \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
*/



// Global variables
int valueBlocktemp[50], timeBlocktemp[50], locationBlocktemp[50], valuePostemp, blockPostemp, temp;
int valueBlockTVOC[50], timeBlockTVOC[50], locationBlockTVOC[50], valuePosTVOC, blockPosTVOC;
int valueBlockCO2[50], timeBlockCO2[50], locationBlockCO2[50], valuePosCO2, blockPosCO2;
int valueBlockPM25[50], timeBlockPM25[50], locationBlockPM25[50], valuePosPM25, blockPosPM25, PM25;
int valueBlockPM10[50], timeBlockPM10[50], locationBlockPM10[50], valuePosPM10, blockPosPM10, PM10;
int valueBlockHUM[50], timeBlockHUM[50], locationBlockHUM[50], valuePosHUM, blockPosHUM, HUM;
int valueBlockCO[50], timeBlockCO[50], locationBlockCO[50], valuePosCO, blockPosCO, COc;
int valueBlockNH33[50], timeBlockNH33[50], locationBlockNH33[50], valuePosNH33, blockPosNH33, NH33;
int valueBlockNO22[50], timeBlockNO22[50], locationBlockNO22[50], valuePosNO22, blockPosNO22, NO22;
int valueBlockPRESU[50], timeBlockPRESU[50], locationBlockPRESU[50], valuePosPRESU, blockPosPRESU, PRESU;

int valueBlockO3[50], timeBlockO3[50], locationBlockO3[50], valuePosO3, blockPosO3, OZON;
int valueBlockMAG[50], timeBlockMAG[50], locationBlockMAG[50], valuePosMAG, blockPosMAG, MAGNET;
int valueBlockDB[50], timeBlockDB[50], locationBlockDB[50], valuePosDB, blockPosDB, DECIBEL;
int valueBlockHIDRO[50], timeBlockHIDRO[50], locationBlockHIDRO[50], valuePosHIDRO, blockPosHIDRO, HIDROGEN;


// Editable Variables

uint16_t graphColor = BLUE;
uint16_t pointColor = BLACK;
uint16_t lineColor = GREEN;


int graphRangetemp = 42, markSizetemp = 3;
int graphRangeTVOC = 250, markSizeTVOC = 3;
int graphRangeCO2 = 10002, markSizeCO2 = 3;
int graphRangePM25 = 10002, markSizePM25 = 3;
int graphRangePM10 = 10002, markSizePM10 = 3;
int graphRangeHUM = 100, markSizeHUM = 3;
int graphRangeCO = 1000, markSizeCO = 3;
int graphRangeNH33 = 5000, markSizeNH33 = 3;
int graphRangeNO22 = 12, markSizeNO22 = 3;
int graphRangePRESU = 6000, markSizePRESU = 3;

///Modificat aici pentru a schimba valorile lan senzori noi pe care ii mai am de introdus
int graphRangeO3 = 200, markSizeO3 = 3;
int graphRangeMAG = 1000, markSizeMAG = 3;
int graphRangeDB = 140, markSizeDB = 3;
int graphRangeHIDRO = 300, markSizeHIDRO = 3;



// Calculate Values
const int numberOfMarks = 8;
const int originX = 45;
const int originY = 200;
const int sizeX = 270;
const int sizeY = 150;
const int deviation = 30;

int boxSize = (sizeX / numberOfMarks);
int mark[] = { (boxSize + deviation), ((boxSize * 2) + deviation), ((boxSize * 3) + deviation), ((boxSize * 4) + deviation), ((boxSize * 5) + deviation), ((boxSize * 6) + deviation), ((boxSize * 7) + deviation), ((boxSize * 8) + deviation) };

const int minorSizeY = (originY + 10);
const int minorSizeX = (originX - 10);

int numberSize = (sizeY / 6);
int number[] = { numberSize, (numberSize * 2), (numberSize * 3), (numberSize * 4), (numberSize * 5), (numberSize * 6) };


////impartire pe axa OY
int numberValuetemp = (graphRangetemp / 6);
int numberValueTVOC = (graphRangeTVOC / 6);
int numberValueCO2 = (graphRangeCO2 / 6);
int numberValuePM25 = (graphRangePM25 / 6);
int numberValuePM10 = (graphRangePM10 / 6);
int numberValueHUM = (graphRangeHUM / 6);
int numberValueCO = (graphRangeCO / 6);
int numberValueNH33 = (graphRangeNH33 / 6);
int numberValueNO22 = (graphRangeNO22 / 6);
int numberValuePRESU = (graphRangePRESU / 6);


int numberValueO3 = (graphRangeO3 / 6);
int numberValueMAG = (graphRangeMAG / 6);
int numberValueDB = (graphRangeDB / 6);
int numberValueHIDRO = (graphRangeHIDRO / 6);




int valtemp[] = { graphRangetemp, (numberValuetemp * 5), (numberValuetemp * 4), (numberValuetemp * 3), (numberValuetemp * 2), numberValuetemp };
int valTVOC[] = { graphRangeTVOC, (numberValueTVOC * 5), (numberValueTVOC * 4), (numberValueTVOC * 3), (numberValueTVOC * 2), numberValueTVOC };
int valCO2[] = { graphRangeCO2, (numberValueCO2 * 5), (numberValueCO2 * 4), (numberValueCO2 * 3), (numberValueCO2 * 2), numberValueCO2 };
int valPM25[] = { graphRangePM25, (numberValuePM25 * 5), (numberValuePM25 * 4), (numberValuePM25 * 3), (numberValuePM25 * 2), numberValuePM25 };
int valPM10[] = { graphRangePM10, (numberValuePM10 * 5), (numberValuePM10 * 4), (numberValuePM10 * 3), (numberValuePM10 * 2), numberValuePM10 };
int valHUM[] = { graphRangeHUM, (numberValueHUM * 5), (numberValueHUM * 4), (numberValueHUM * 3), (numberValueHUM * 2), numberValueHUM };
int valCO[] = { graphRangeCO, (numberValueCO * 5), (numberValueCO * 4), (numberValueCO * 3), (numberValueCO * 2), numberValueCO };
int valNH33[] = { graphRangeNH33, (numberValueNH33 * 5), (numberValueNH33 * 4), (numberValueNH33 * 3), (numberValueNH33 * 2), numberValueNH33 };
int valNO22[] = { graphRangeNO22, (numberValueNO22 * 5), (numberValueNO22 * 4), (numberValueNO22 * 3), (numberValueNO22 * 2), numberValueNO22 };
int valPRESU[] = { graphRangePRESU, (numberValuePRESU * 5), (numberValuePRESU * 4), (numberValuePRESU * 3), (numberValuePRESU * 2), numberValuePRESU };


int valO3[] = { graphRangeO3, (numberValueO3 * 5), (numberValueO3 * 4), (numberValueO3 * 3), (numberValueO3 * 2), numberValueO3 };
int valMAG[] = { graphRangeMAG, (numberValueMAG * 5), (numberValueMAG * 4), (numberValueMAG * 3), (numberValueMAG * 2), numberValueMAG };
int valDB[] = { graphRangeDB, (numberValueDB * 5), (numberValueDB * 4), (numberValueDB * 3), (numberValueDB * 2), numberValueDB };
int valHIDRO[] = { graphRangeHIDRO, (numberValueHIDRO * 5), (numberValueHIDRO * 4), (numberValueHIDRO * 3), (numberValueHIDRO * 2), numberValueHIDRO };

///valorile pentru praf
int pm2 = 0, pm10 = 0;

/*
  \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
  /////////////////////////////////\
  ///////Interfata pagini//////////\
  //////////principale/////////////\
  /////////////////////////////////\
  \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
*/

String denumire_valori_citite[] = {"Temp.", "TVOC", "CO2", "PM 2.5", "PM 10", "Hum", "CO", "NH3", "NO2", "O3", "Fonic", "Magnet.", "H", "Pres."};
int pozitie_afisare = 0;
int pozitie_afisare_limite = 0;
int numar_logare_admin = 0;

struct AdreseEEPROMParametrii{
  long eeprom_valid_flag;
  int val_Temp;
  int val_TVOC;
  int val_CO2;
  int val_PMP2_5;
  int val_PMP10;
  int val_Hum;
  int val_CO;
  int val_NH3;
  int val_NO2;
  int val_O3;
  int val_Fonic;
  int val_Mag;
  int val_H;
  int val_Pres;

  int crit_val_Temp;
  int crit_val_TVOC;
  int crit_val_CO2;
  int crit_val_PMP2_5;
  int crit_val_PMP10;
  int crit_val_Hum;
  int crit_val_CO;
  int crit_val_NH3;
  int crit_val_NO2;
  int crit_val_O3;
  int crit_val_Fonic;
  int crit_val_Mag;
  int crit_val_H;
  int crit_val_Pres;
};

const int EEPROM_ADDRESS_START = 0;
AdreseEEPROMParametrii adreseEEPROMSenzori;


int prelucrare_date_afisat_valori(){
  if(pozitie_afisare == 0){
    return temperature();
  }
  if(pozitie_afisare == 1){
    return 0; //TVO();
  }
  if(pozitie_afisare == 2){
    return CO22();
  }
  if(pozitie_afisare == 3){
    Sds();
    return pm2;
  }
  if(pozitie_afisare == 4){
    Sds();
    return pm10;
  }
  if(pozitie_afisare == 5){
    return humidity();
  }
  if(pozitie_afisare == 6){
    return COo();
  }
  if(pozitie_afisare == 7){
    return NH333();
  }
  if(pozitie_afisare == 8){
    return NO222();
  }
  if(pozitie_afisare == 9){
    return O3();
  }
  if(pozitie_afisare == 10){
    return decibelotmetru();
  }
  if(pozitie_afisare == 11){
    return MAG();
  }
  if(pozitie_afisare == 12){
    return H();
  }
  if(pozitie_afisare == 13){
    return presure();
  }
  return -1;
}

int prelucrare_date_limite_valori(){

  if(pozitie_afisare_limite == 0){
    return adreseEEPROMSenzori.crit_val_Temp;
  }
  if(pozitie_afisare_limite == 1){
    return adreseEEPROMSenzori.crit_val_TVOC; //TVO();
  }
  if(pozitie_afisare_limite == 2){
    return adreseEEPROMSenzori.crit_val_CO2;
  }
  if(pozitie_afisare_limite == 3){
    return adreseEEPROMSenzori.crit_val_PMP2_5;
  }
  if(pozitie_afisare_limite == 4){
    return adreseEEPROMSenzori.crit_val_PMP10;
  }
  if(pozitie_afisare_limite == 5){
    return adreseEEPROMSenzori.crit_val_Hum;
  }
  if(pozitie_afisare_limite == 6){
    return adreseEEPROMSenzori.crit_val_CO;
  }
  if(pozitie_afisare_limite == 7){
    return adreseEEPROMSenzori.crit_val_NH3;
  }
  if(pozitie_afisare_limite == 8){
    return adreseEEPROMSenzori.crit_val_NO2;
  }
  if(pozitie_afisare_limite == 9){
    return adreseEEPROMSenzori.crit_val_O3;
  }
  if(pozitie_afisare_limite == 10){
    return adreseEEPROMSenzori.crit_val_Fonic;
  }
  if(pozitie_afisare_limite == 11){
    return adreseEEPROMSenzori.crit_val_Mag;
  }
  if(pozitie_afisare_limite == 12){
    return adreseEEPROMSenzori.crit_val_H ;
  }
  if(pozitie_afisare_limite == 13){
    return adreseEEPROMSenzori.crit_val_Pres;
  }
  return -1;
}

void screen(int ok, int y) {
  switch (ok) {
    case 0:
      {
        break;
      }
    case 1:
      {
        tft.setRotation(1);
        tft.fillScreen(GREENYELLOW);
        tft.setTextColor(BLACK);

        tft.fillRect(35, 20, 250, 80, ORANGE);
        tft.drawRect(35, 20, 250, 80, ORANGE);

        tft.setCursor(60, 30);
        tft.setTextSize(2);
        tft.print("Informatii despre");
        tft.setCursor(110, 50);
        tft.print("parametri");


        tft.fillRect(80, 140, 120, 200, GREEN);
        tft.drawRect(80, 140, 120, 200, GREEN);


        tft.fillRect(200, 140, 150, 200, RED);
        tft.drawRect(200, 140, 150, 200, RED);


        tft.fillRect(280, 20, 40, 80, RED);
        tft.drawRect(280, 20, 40, 80, RED);

        tft.drawFastHLine(280, 60, 30, BLACK);
        tft.drawLine(295, 50, 310, 60, BLACK);
        tft.drawLine(295, 70, 310, 60, BLACK);


        tft.drawFastHLine(0, 140, 360, BLACK);
        tft.drawFastHLine(0, 160, 360, BLACK);
        tft.drawFastHLine(0, 180, 360, BLACK);
        tft.drawFastHLine(0, 200, 360, BLACK);
        tft.drawFastHLine(0, 220, 360, BLACK);
        tft.drawFastHLine(0, 240, 360, BLACK);
        tft.drawFastHLine(0, 260, 360, BLACK);
        tft.drawFastHLine(0, 280, 360, BLACK);
        tft.drawFastHLine(0, 300, 360, BLACK);


        tft.drawFastVLine(80, 140, 720, BLACK);
        tft.drawFastVLine(200, 140, 720, BLACK);
        ///tft.drawFastVLine(255, 140, 720, BLACK);


        tft.setCursor(10, 143);
        tft.print("CO2");
        tft.setCursor(135, 143);
        tft.print("0");
        tft.setCursor(235, 143);
        tft.print(adreseEEPROMSenzori.crit_val_CO2);


        tft.setCursor(10, 163);
        tft.print("TVOC");
        tft.setCursor(135, 163);
        tft.print("0");
        tft.setCursor(238, 163);
        tft.print(adreseEEPROMSenzori.crit_val_TVOC);



        tft.setCursor(10, 183);
        tft.print("Temp");
        tft.setCursor(135, 183);
        tft.print("0");
        tft.setCursor(242, 183);
        tft.print(adreseEEPROMSenzori.crit_val_Temp);



        tft.setCursor(10, 203);
        tft.print("PM2.5 ");
        tft.setCursor(135, 203);
        tft.print("0");
        tft.setCursor(240, 203);
        tft.print(adreseEEPROMSenzori.crit_val_PMP2_5);



        tft.setCursor(10, 223);
        tft.print("PM10 ");
        tft.setCursor(135, 223);
        tft.print("0");
        tft.setCursor(240, 223);
        tft.print(adreseEEPROMSenzori.crit_val_PMP10);

        break;
      }
    case 2:
      {
        tft.setRotation(1);
        tft.fillScreen(GREENYELLOW);

        tft.fillRect(65, 15, 200, 45, ORANGE);
        tft.drawRect(65, 15, 200, 45, ORANGE);

        tft.setCursor(85, 30);
        tft.setTextSize(2);
        tft.setTextColor(WHITE, ORANGE);
        tft.print("BINE AI VENIT!");



        tft.fillRect(40, 180, 240, 55, RED);
        tft.drawRect(40, 180, 240, 55, RED);

        tft.setCursor(70, 200);
        tft.setTextColor(WHITE, RED);
        tft.setTextSize(2);
        tft.print("Meniu principal");
      



        tft.fillRect(10, 80, 130, 80, ORANGE);
        tft.drawRect(10, 80, 130, 80, ORANGE);

        tft.setTextColor(BLACK, ORANGE);
        tft.setCursor(20, 90);
        tft.setTextSize(2);
        tft.print("Informatii");
        tft.setCursor(40, 110);
        tft.print("despre");
        tft.setCursor(35, 130);
        tft.print("senzori");



        tft.fillRect(180, 80, 130, 80, ORANGE);
        tft.drawRect(180, 80, 130, 80, ORANGE);

        tft.setCursor(180, 100);
        tft.setTextSize(2);
        tft.print("Vizualizare");
        tft.setCursor(190, 120);
        tft.print("parametri");

        break;
      }
    case 3:
      {

        tft.fillScreen(GREENYELLOW);
        tft.drawCircle(170, 70, 60, ORANGE);  //drawCircle(int16_t x, int16_t y, int16_t r, uint16_t t)
        tft.fillCircle(170, 70, 60, ORANGE);  //fillCircle(int16_t x, int16_t y, int16_t r, uint16_t t)

        tft.drawCircle(170, 250, 60, ORANGE);  //drawCircle(int16_t x, int16_t y, int16_t r, uint16_t t)
        tft.fillCircle(170, 250, 60, ORANGE);  //fillCircle(int16_t x, int16_t y, int16_t r, uint16_t t)


        tft.drawTriangle(130, 155, 30, 20, 30, 300, ORANGE);
        tft.fillTriangle(130, 155, 30, 20, 30, 300, ORANGE);


        tft.drawLine(100, 280, 100, 310, BLACK);
        tft.drawLine(90, 300, 100, 310, BLACK);
        tft.drawLine(110, 300, 100, 310, BLACK);

        tft.drawLine(100, 10, 100, 40, BLACK);
        tft.drawLine(90, 20, 100, 10, BLACK);
        tft.drawLine(110, 20, 100, 10, BLACK);


        tft.setRotation(1);
        tft.setTextColor(BLACK);
        tft.setCursor(44, 30);
        tft.setTextSize(2);
        tft.print("Temp:");
        tft.setCursor(60, 80);
        tft.setTextSize(2);
        tft.print("*C");
        tft.setRotation(0);


        tft.setRotation(1);
        tft.setTextColor(BLACK);
        tft.setCursor(223, 30);
        tft.setTextSize(2);
        tft.print("TVOC:");
        tft.setCursor(230, 80);
        tft.setTextSize(2);
        tft.print("ppb");
        tft.setRotation(0);


        tft.setRotation(1);
        tft.setTextColor(BLACK);
        tft.setCursor(140, 130);
        tft.setTextSize(2);
        tft.print("CO2:");
        tft.setCursor(140, 180);
        tft.setTextSize(2);
        tft.print("ppm");
        tft.setRotation(0);

        break;
      }
    case 4:
      {
        tft.fillScreen(GREENYELLOW);
        tft.drawCircle(170, 70, 60, ORANGE);  //drawCircle(int16_t x, int16_t y, int16_t r, uint16_t t)
        tft.fillCircle(170, 70, 60, ORANGE);  //fillCircle(int16_t x, int16_t y, int16_t r, uint16_t t)

        tft.drawCircle(170, 250, 60, ORANGE);  //drawCircle(int16_t x, int16_t y, int16_t r, uint16_t t)
        tft.fillCircle(170, 250, 60, ORANGE);  //fillCircle(int16_t x, int16_t y, int16_t r, uint16_t t)


        tft.drawTriangle(130, 155, 30, 20, 30, 300, ORANGE);
        tft.fillTriangle(130, 155, 30, 20, 30, 300, ORANGE);


        tft.drawLine(100, 280, 100, 310, BLACK);
        tft.drawLine(90, 300, 100, 310, BLACK);
        tft.drawLine(110, 300, 100, 310, BLACK);


        tft.drawLine(100, 10, 100, 40, BLACK);
        tft.drawLine(90, 20, 100, 10, BLACK);
        tft.drawLine(110, 20, 100, 10, BLACK);


        tft.setRotation(1);
        tft.setTextColor(BLACK);
        tft.setCursor(36, 30);
        tft.setTextSize(2);
        tft.print("PM 2.5:");
        tft.setCursor(30, 80);
        tft.setTextSize(2);
        tft.print("(ug/m3)");
        tft.setRotation(0);


        tft.setRotation(1);
        tft.setTextColor(BLACK);
        tft.setCursor(223, 30);
        tft.setTextSize(2);
        tft.print("PM 10:");
        tft.setCursor(210, 80);
        tft.setTextSize(2);
        tft.print("(ug/m3)");

        tft.setRotation(0);


        tft.setRotation(1);
        tft.setTextColor(BLACK);
        tft.setCursor(100, 150);
        tft.setTextSize(2);
        tft.print("Umiditate:");
        tft.setCursor(200, 180);
        tft.setTextSize(2);
        tft.print("%");

        tft.setRotation(0);
        tft.setRotation(0);


        break;
      }
    case 5:
      {
        tft.fillScreen(GREENYELLOW);
        tft.drawCircle(170, 70, 60, ORANGE);  //drawCircle(int16_t x, int16_t y, int16_t r, uint16_t t)
        tft.fillCircle(170, 70, 60, ORANGE);  //fillCircle(int16_t x, int16_t y, int16_t r, uint16_t t)

        tft.drawCircle(170, 250, 60, ORANGE);  //drawCircle(int16_t x, int16_t y, int16_t r, uint16_t t)
        tft.fillCircle(170, 250, 60, ORANGE);  //fillCircle(int16_t x, int16_t y, int16_t r, uint16_t t)


        tft.drawTriangle(130, 155, 30, 20, 30, 300, ORANGE);
        tft.fillTriangle(130, 155, 30, 20, 30, 300, ORANGE);


        tft.drawLine(100, 280, 100, 310, BLACK);
        tft.drawLine(90, 300, 100, 310, BLACK);
        tft.drawLine(110, 300, 100, 310, BLACK);


        tft.drawLine(100, 10, 100, 40, BLACK);
        tft.drawLine(90, 20, 100, 10, BLACK);
        tft.drawLine(110, 20, 100, 10, BLACK);


        tft.setRotation(1);
        tft.setTextColor(BLACK);
        tft.setCursor(57, 30);
        tft.setTextSize(2);
        tft.print("CO:");
        tft.setCursor(55, 80);
        tft.setTextSize(2);
        tft.print("ppm");

        tft.setRotation(0);


        tft.setRotation(1);
        tft.setTextColor(BLACK);
        tft.setCursor(233, 30);
        tft.setTextSize(2);
        tft.print("NH3:");
        tft.setCursor(235, 80);
        tft.setTextSize(2);
        tft.print("ppm");


        tft.setRotation(0);


        tft.setRotation(1);
        tft.setTextColor(BLACK);
        tft.setCursor(140, 150);
        tft.setTextSize(2);
        tft.print("NO2:");
        tft.setCursor(200, 180);
        tft.setTextSize(2);
        tft.print("ppm");

        tft.setRotation(0);
        tft.setRotation(0);


        break;
      }
    case 6:
      {
        ////scris nou
        tft.fillScreen(GREENYELLOW);
        tft.drawCircle(170, 70, 60, ORANGE);  //drawCircle(int16_t x, int16_t y, int16_t r, uint16_t t)
        tft.fillCircle(170, 70, 60, ORANGE);  //fillCircle(int16_t x, int16_t y, int16_t r, uint16_t t)

        tft.drawCircle(170, 250, 60, ORANGE);  //drawCircle(int16_t x, int16_t y, int16_t r, uint16_t t)
        tft.fillCircle(170, 250, 60, ORANGE);  //fillCircle(int16_t x, int16_t y, int16_t r, uint16_t t)


        tft.drawTriangle(130, 155, 30, 20, 30, 300, ORANGE);
        tft.fillTriangle(130, 155, 30, 20, 30, 300, ORANGE);


        tft.drawLine(100, 280, 100, 310, BLACK);
        tft.drawLine(90, 300, 100, 310, BLACK);
        tft.drawLine(110, 300, 100, 310, BLACK);


        tft.drawLine(100, 10, 100, 40, BLACK);
        tft.drawLine(90, 20, 100, 10, BLACK);
        tft.drawLine(110, 20, 100, 10, BLACK);


        tft.setRotation(1);
        tft.setTextColor(BLACK);
        tft.setCursor(57, 30);
        tft.setTextSize(2);
        tft.print("O3:");
        tft.setCursor(55, 80);
        tft.setTextSize(2);
        tft.print("ppm");

        tft.setRotation(0);


        tft.setRotation(1);
        tft.setTextColor(BLACK);
        tft.setCursor(220, 30);
        tft.setTextSize(2);
        tft.print("Fonic:");
        tft.setCursor(235, 80);
        tft.setTextSize(2);
        tft.print("db");


        tft.setRotation(0);


        tft.setRotation(1);
        tft.setTextColor(BLACK);
        tft.setCursor(88, 155);
        tft.setTextSize(2);
        tft.print("Magnetometru:");
        tft.setCursor(200, 180);
        tft.setTextSize(2);
        tft.print("uT");

        tft.setRotation(0);
        tft.setRotation(0);


        break;
      }
    case 7:
      {
        tft.fillScreen(GREENYELLOW);

        tft.fillRect(130, 60, 80, 220, ORANGE);
        tft.drawRect(130, 60, 80, 220, ORANGE);

        tft.fillRect(30, 60, 80, 220, ORANGE);
        tft.drawRect(30, 60, 80, 220, ORANGE);



        tft.drawLine(100, 10, 100, 40, BLACK);
        tft.drawLine(90, 20, 100, 10, BLACK);
        tft.drawLine(110, 20, 100, 10, BLACK);


        tft.setRotation(1);
        tft.setTextColor(BLACK);
        tft.setCursor(115, 150);
        tft.setTextSize(2);
        tft.print("Presiune:");
        tft.setCursor(200, 180);
        tft.setTextSize(2);
        tft.print("hPa");


        ////scris nou
        tft.setTextColor(BLACK);
        tft.setCursor(150, 50);
        tft.setTextSize(2);
        tft.print("H:");
        tft.setCursor(200, 80);
        tft.setTextSize(2);
        tft.print("ppm");

        tft.setRotation(0);

        break;
      }
    case 10:{
      tft.setRotation(1);
      tft.fillScreen(GREENYELLOW);
      tft.setTextColor(BLACK);

      tft.fillRect(10, 40, 130, 150, ORANGE);
      tft.drawRect(10, 40, 130, 150, ORANGE);

      tft.setTextColor(BLACK, ORANGE);
      tft.setCursor(50, 90);
      tft.setTextSize(2);
      tft.print("Mod");
      tft.setCursor(40, 110);
      tft.print("Admin");


      tft.fillRect(180, 40, 130, 150, ORANGE);
      tft.drawRect(180, 40, 130, 150, ORANGE);

      tft.setCursor(180, 100);
      tft.setTextSize(2);
      tft.print("Vizualizare");
      tft.setCursor(230, 120);
      tft.print("date");
      break;
    }
    case 11:{
      tft.fillScreen(GREENYELLOW);

  
      tft.drawLine(100, 10, 100, 40, BLACK);
      tft.drawLine(90, 20, 100, 10, BLACK);
      tft.drawLine(110, 20, 100, 10, BLACK);

      // tft.fillScreen(GREENYELLOW);
      tft.setRotation(1);
      tft.setTextColor(BLACK, GREENYELLOW);
      tft.setCursor(50, 50);
      tft.setTextSize(2);
      tft.print("Introduceti Parola");
      tft.setRotation(0);

      ///sageata sus 1
      tft.drawLine(150, 90, 125, 90, BLACK);
      tft.drawLine(150, 90, 140, 80, BLACK);
      tft.drawLine(150, 90, 140, 100, BLACK);

      int deplasament_y = 40;
       ///sageata sus 2
      tft.drawLine(150, 90 + deplasament_y, 125, 90 + deplasament_y, BLACK);
      tft.drawLine(150, 90 + deplasament_y, 140, 80 + deplasament_y, BLACK);
      tft.drawLine(150, 90 + deplasament_y, 140, 100 + deplasament_y, BLACK);

      deplasament_y += 40;
      ///sageata sus 3
      tft.drawLine(150, 90 + deplasament_y, 125, 90 + deplasament_y, BLACK);
      tft.drawLine(150, 90 + deplasament_y, 140, 80 + deplasament_y, BLACK);
      tft.drawLine(150, 90 + deplasament_y, 140, 100 + deplasament_y, BLACK);

      deplasament_y += 40;
      ///sageata sus 4
      tft.drawLine(150, 90 + deplasament_y, 125, 90 + deplasament_y, BLACK);
      tft.drawLine(150, 90 + deplasament_y, 140, 80 + deplasament_y, BLACK);
      tft.drawLine(150, 90 + deplasament_y, 140, 100 + deplasament_y, BLACK);
      

      deplasament_y = 0;
      ///sageata sus 1
      tft.drawLine(70, 90 + deplasament_y, 45, 90 + deplasament_y, BLACK);
      tft.drawLine(45, 90 + deplasament_y, 55, 80 + deplasament_y, BLACK);
      tft.drawLine(45, 90 + deplasament_y, 55, 100 + deplasament_y, BLACK);

      deplasament_y += 40;
      ///sageata sus 2
      tft.drawLine(70, 90 + deplasament_y, 45, 90 + deplasament_y, BLACK);
      tft.drawLine(45, 90 + deplasament_y, 55, 80 + deplasament_y, BLACK);
      tft.drawLine(45, 90 + deplasament_y, 55, 100 + deplasament_y, BLACK);

      deplasament_y += 40;
      ///sageata sus 3
      tft.drawLine(70, 90 + deplasament_y, 45, 90 + deplasament_y, BLACK);
      tft.drawLine(45, 90 + deplasament_y, 55, 80 + deplasament_y, BLACK);
      tft.drawLine(45, 90 + deplasament_y, 55, 100 + deplasament_y, BLACK);

      deplasament_y += 40;
      ///sageata sus 4
      tft.drawLine(70, 90 + deplasament_y, 45, 90 + deplasament_y, BLACK);
      tft.drawLine(45, 90 + deplasament_y, 55, 80 + deplasament_y, BLACK);
      tft.drawLine(45, 90 + deplasament_y, 55, 100 + deplasament_y, BLACK);

      ///Log in
      tft.fillRect(55, 240, 90, 70, ORANGE);
      tft.drawRect(55, 240, 90, 70, BLACK);



      ///Redesenare patrate
      deplasament_y = 0;
      tft.fillRect(85, 77, 28, 28, ORANGE);
      tft.drawRect(85, 77, 28, 28, BLACK);

      deplasament_y += 40;
      tft.fillRect(85, 77 + deplasament_y, 28, 28, ORANGE);
      tft.drawRect(85, 77 + deplasament_y, 28, 28, BLACK);

      deplasament_y += 40;
      tft.fillRect(85, 77 + deplasament_y, 28, 28, ORANGE);
      tft.drawRect(85, 77 + deplasament_y, 28, 28, BLACK);

      deplasament_y += 40;
      tft.fillRect(85, 77 + deplasament_y, 28, 28, ORANGE);
      tft.drawRect(85, 77 + deplasament_y, 28, 28, BLACK);

      ///vizualizare numere din patratele de parola
      deplasament_y = 0;
      tft.setRotation(1);
      tft.setTextColor(BLACK, ORANGE);
      tft.setCursor(85 + deplasament_y, 135);
      tft.setTextSize(2);
      tft.print((numar_logare_admin / 1000) % 10);
      tft.setRotation(0);

      deplasament_y += 40;
      tft.setRotation(1);
      tft.setTextColor(BLACK, ORANGE);
      tft.setCursor(85 + deplasament_y, 135);
      tft.setTextSize(2);
      tft.print((numar_logare_admin / 100) % 10);
      tft.setRotation(0);

      deplasament_y += 40;
      tft.setRotation(1);
      tft.setTextColor(BLACK, ORANGE);
      tft.setCursor(85 + deplasament_y, 135);
      tft.setTextSize(2);
      tft.print((numar_logare_admin / 10) % 10);
      tft.setRotation(0);

      deplasament_y += 40;
      tft.setRotation(1);
      tft.setTextColor(BLACK, ORANGE);
      tft.setCursor(85 + deplasament_y, 135);
      tft.setTextSize(2);
      tft.print(numar_logare_admin % 10);
      tft.setRotation(0);
      

      ///afisare text
      tft.setRotation(1);
      tft.setTextColor(BLACK, ORANGE);
      tft.setCursor(239, 130);
      tft.setTextSize(2);
      tft.print("Log-in");
      tft.setRotation(0);


      break;
    }
    case 12:{
      tft.setRotation(1);
      tft.fillScreen(GREENYELLOW);
      tft.setTextColor(BLACK);

      tft.fillRect(10, 40, 130, 120, ORANGE);
      tft.drawRect(10, 40, 130, 120, ORANGE);

      tft.setTextColor(BLACK, ORANGE);
      tft.setTextSize(2);
      tft.setCursor(9, 60);
      tft.print("Modificarea");
      tft.setCursor(25, 80);
      tft.print("limitelor");
      tft.setCursor(25, 100);
      tft.print("marimilor");
      tft.setCursor(27, 120);
      tft.print("masurate");


      tft.fillRect(180, 40, 130, 120, ORANGE);
      tft.drawRect(180, 40, 130, 120, ORANGE);

      tft.setCursor(185, 80);
      tft.setTextSize(2);
      tft.print("Calibrarea");
      tft.setCursor(185, 100);
      tft.print("senzorilor");
      

      ///Logica butoane resetare.

      tft.fillRect(10, 170, 130, 50, ORANGE);
      tft.drawRect(10, 170, 130, 50, ORANGE);

      tft.setCursor(30, 180);
      tft.setTextSize(2);
      tft.print("Resetare");
      tft.setCursor(38, 200);
      tft.print("limite");


      tft.fillRect(180, 170, 130, 50, ORANGE);
      tft.drawRect(180, 170, 130, 50, ORANGE);

      tft.setCursor(200, 180);
      tft.setTextSize(2);
      tft.print("Resetare");
      tft.setCursor(194, 200);
      tft.print("calibrare");

      tft.setRotation(0);

      ///Sageata back
      tft.drawLine(220, 10, 220, 40, BLACK);
      tft.drawLine(210, 20, 220, 10, BLACK);
      tft.drawLine(230, 20, 220, 10, BLACK);

      break;
    }
    case 13:{
      
      tft.fillScreen(GREENYELLOW);

  
      tft.drawLine(100, 10, 100, 40, BLACK);
      tft.drawLine(90, 20, 100, 10, BLACK);
      tft.drawLine(110, 20, 100, 10, BLACK);

      // tft.fillScreen(GREENYELLOW);
      tft.setRotation(1);
      tft.setTextColor(BLACK, GREENYELLOW);
      tft.setTextSize(2);
      tft.setCursor(30, 30);
      tft.print("Denumirea parametrului");

      tft.setRotation(0);

      ///Selectare parametru
      tft.drawRect(140, 90, 40, 150, BLACK);
     
      tft.drawLine(160, 50, 160, 80, BLACK);
      tft.drawLine(150, 60, 160, 50, BLACK);
      tft.drawLine(170, 60, 160, 50, BLACK);

      tft.drawLine(160, 250, 160, 280, BLACK);
      tft.drawLine(150, 270, 160, 280, BLACK);
      tft.drawLine(170, 270, 160, 280, BLACK);


      //Corectare limita
      tft.drawRect(80, 90, 40, 150, BLACK);
     
      tft.drawLine(100, 50, 100, 80, BLACK);
      tft.drawLine(90, 60, 100, 50, BLACK);
      tft.drawLine(110, 60, 100, 50, BLACK);

      tft.drawLine(100, 250, 100, 280, BLACK);
      tft.drawLine(90, 270, 100, 280, BLACK);
      tft.drawLine(110, 270, 100, 280, BLACK);


      tft.fillRect(10, 100, 50, 130, ORANGE);
      tft.drawRect(10, 100, 50, 130, BLACK);

      ///AFISARE PARAMETRII
      tft.setRotation(1);
      tft.setTextColor(BLACK, GREENYELLOW);
      tft.setTextSize(2);
      tft.setCursor(135, 73);
      tft.print(denumire_valori_citite[pozitie_afisare_limite]);
      tft.setRotation(0);


      ///Afisare valori
      tft.setRotation(1);
      tft.setTextColor(BLACK, GREENYELLOW);
      tft.setTextSize(2);
      tft.setCursor(150, 130);
      int valoare_afisata = prelucrare_date_limite_valori();
      tft.print(String(valoare_afisata));
      tft.setRotation(0);


      ///UPDATE
      tft.setRotation(1);
      tft.setTextColor(BLACK, ORANGE);
      tft.setTextSize(2);
      tft.setCursor(130, 200);
      tft.print("Update");

      tft.setRotation(0);

      break;
    }
    case 14:{

     tft.fillScreen(GREENYELLOW);

  
      tft.drawLine(100, 10, 100, 40, BLACK);
      tft.drawLine(90, 20, 100, 10, BLACK);
      tft.drawLine(110, 20, 100, 10, BLACK);

      // tft.fillScreen(GREENYELLOW);
      tft.setRotation(1);
      tft.setTextColor(BLACK, GREENYELLOW);
      tft.setTextSize(2);
      tft.setCursor(30, 30);
      tft.print("Denumirea parametrului");

      tft.setRotation(0);

      ///Selectare parametru
      tft.drawRect(140, 90, 40, 150, BLACK);
     
      tft.drawLine(160, 50, 160, 80, BLACK);
      tft.drawLine(150, 60, 160, 50, BLACK);
      tft.drawLine(170, 60, 160, 50, BLACK);

      tft.drawLine(160, 250, 160, 280, BLACK);
      tft.drawLine(150, 270, 160, 280, BLACK);
      tft.drawLine(170, 270, 160, 280, BLACK);


      //Corectare limita
      tft.drawRect(80, 90, 40, 150, BLACK);
     
      tft.drawLine(100, 50, 100, 80, BLACK);
      tft.drawLine(90, 60, 100, 50, BLACK);
      tft.drawLine(110, 60, 100, 50, BLACK);

      tft.drawLine(100, 250, 100, 280, BLACK);
      tft.drawLine(90, 270, 100, 280, BLACK);
      tft.drawLine(110, 270, 100, 280, BLACK);


      tft.fillRect(10, 100, 50, 130, ORANGE);
      tft.drawRect(10, 100, 50, 130, BLACK);


      ///creere logica de vizualizare parametrii
      tft.setRotation(1);
      tft.setTextColor(BLACK, GREENYELLOW);
      tft.setTextSize(2);
      tft.setCursor(135, 73);
      tft.print(denumire_valori_citite[pozitie_afisare]);
      tft.setRotation(0);


      ///afisare date
      tft.setRotation(1);
      tft.setTextColor(BLACK, GREENYELLOW);
      tft.setTextSize(2);
      tft.setCursor(150, 130);
      int valoare_afisata = prelucrare_date_afisat_valori();
      tft.print(String(valoare_afisata));
      tft.setRotation(0);



      ///Buton UPDATE
      tft.setRotation(1);
      tft.setTextColor(BLACK, ORANGE);
      tft.setTextSize(2);
      tft.setCursor(130, 200);
      tft.print("Update");

      tft.setRotation(0);

      break;
    }
  }

  tft.setRotation(1);


  /*
    \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
    /////////////////////////////////\
    ///////Interfata grafice/////////\
    /////////////////////////////////\
    \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
  */


  switch (y) {
    case 0:
      {
        break;
      }
    case 1:
      {
        tft.fillScreen(WHITE);
        tft.fillRect(280, 0, 40, 50, RED);
        tft.drawRect(280, 0, 40, 50, RED);

        tft.drawFastHLine(280, 23, 30, BLACK);
        tft.drawLine(295, 11, 310, 23, BLACK);
        tft.drawLine(295, 35, 310, 23, BLACK);


        tft.fillRect(0, 0, 40, 50, RED);
        tft.drawRect(0, 0, 40, 50, RED);

        tft.drawFastHLine(10, 23, 30, BLACK);
        tft.drawLine(25, 11, 10, 23, BLACK);
        tft.drawLine(25, 35, 10, 23, BLACK);


        tft.fillRect(0, 200, 50, 50, RED);
        tft.drawRect(0, 200, 50, 50, RED);



        tft.setCursor(7, 217);
        tft.setTextColor(BLACK);
        tft.setTextSize(1);  // set the size of the text
        tft.println("ACASA");


        String graphName = "TEMPERATURA";


        // draw title
        tft.setCursor(65, 10);   // set the cursor
        tft.setTextColor(BLUE);  // set the colour of the text
        tft.setTextSize(3);      // set the size of the text
        tft.println(graphName);

        // draw outline
        tft.drawLine(originX, originY, (originX + sizeX), originY, graphColor);
        tft.drawLine(originX, originY, originX, (originY - sizeY), graphColor);

        // draw lables
        for (int i = 0; i < numberOfMarks; i++) {
          tft.drawLine(mark[i], originY, mark[i], minorSizeY, graphColor);
        }

        // draw numbers
        for (int i = 0; i < 6; i++) {
          tft.drawLine(originX, (originY - number[i]), minorSizeX, (originY - number[i]), graphColor);
        }

        // draw number values
        for (int i = 0; i < 6; i++) {
          tft.setCursor((minorSizeX - 30), (number[i] + numberSize));
          tft.setTextColor(graphColor);
          tft.setTextSize(1);
          tft.println(valtemp[i]);
        }



        break;
      }
    case 2:
      {

        tft.fillScreen(WHITE);
        tft.fillRect(280, 0, 40, 50, RED);
        tft.drawRect(280, 0, 40, 50, RED);

        tft.drawFastHLine(280, 23, 30, BLACK);
        tft.drawLine(295, 11, 310, 23, BLACK);
        tft.drawLine(295, 35, 310, 23, BLACK);


        tft.fillRect(0, 0, 40, 50, RED);
        tft.drawRect(0, 0, 40, 50, RED);

        tft.drawFastHLine(10, 23, 30, BLACK);
        tft.drawLine(25, 11, 10, 23, BLACK);
        tft.drawLine(25, 35, 10, 23, BLACK);


        tft.fillRect(0, 200, 50, 50, RED);
        tft.drawRect(0, 200, 50, 50, RED);


        tft.setCursor(7, 217);
        tft.setTextColor(BLACK);
        tft.setTextSize(1);  // set the size of the text
        tft.println("ACASA");

        String graphName = "TVOC";

        // draw title
        tft.setCursor(140, 10);  // set the cursor
        tft.setTextColor(BLUE);  // set the colour of the text
        tft.setTextSize(3);      // set the size of the text
        tft.println(graphName);

        // draw outline
        tft.drawLine(originX, originY, (originX + sizeX), originY, graphColor);
        tft.drawLine(originX, originY, originX, (originY - sizeY), graphColor);

        // draw lables
        for (int i = 0; i < numberOfMarks; i++) {
          tft.drawLine(mark[i], originY, mark[i], minorSizeY, graphColor);
        }

        // draw numbers
        for (int i = 0; i < 6; i++) {
          tft.drawLine(originX, (originY - number[i]), minorSizeX, (originY - number[i]), graphColor);
        }

        // draw number values
        for (int i = 0; i < 6; i++) {
          tft.setCursor((minorSizeX - 30), (number[i] + numberSize));
          tft.setTextColor(graphColor);
          tft.setTextSize(1);
          tft.println(valTVOC[i]);
        }
        break;
      }
    case 3:
      {
        tft.fillScreen(WHITE);
        tft.fillRect(280, 0, 40, 50, RED);
        tft.drawRect(280, 0, 40, 50, RED);

        tft.drawFastHLine(280, 23, 30, BLACK);
        tft.drawLine(295, 11, 310, 23, BLACK);
        tft.drawLine(295, 35, 310, 23, BLACK);


        tft.fillRect(0, 0, 40, 50, RED);
        tft.drawRect(0, 0, 40, 50, RED);

        tft.drawFastHLine(10, 23, 30, BLACK);
        tft.drawLine(25, 11, 10, 23, BLACK);
        tft.drawLine(25, 35, 10, 23, BLACK);


        tft.fillRect(0, 200, 50, 50, RED);
        tft.drawRect(0, 200, 50, 50, RED);


        tft.setCursor(7, 217);
        tft.setTextColor(BLACK);
        tft.setTextSize(1);  // set the size of the text
        tft.println("ACASA");


        String graphName = "CO2";


        // draw title
        tft.setCursor(140, 10);  // set the cursor
        tft.setTextColor(BLUE);  // set the colour of the text
        tft.setTextSize(3);      // set the size of the text
        tft.println(graphName);

        // draw outline
        tft.drawLine(originX, originY, (originX + sizeX), originY, graphColor);
        tft.drawLine(originX, originY, originX, (originY - sizeY), graphColor);

        // draw lables
        for (int i = 0; i < numberOfMarks; i++) {
          tft.drawLine(mark[i], originY, mark[i], minorSizeY, graphColor);
        }

        // draw numbers
        for (int i = 0; i < 6; i++) {
          tft.drawLine(originX, (originY - number[i]), minorSizeX, (originY - number[i]), graphColor);
        }

        // draw number values
        for (int i = 0; i < 6; i++) {
          tft.setCursor((minorSizeX - 30), (number[i] + numberSize));
          tft.setTextColor(graphColor);
          tft.setTextSize(1);
          tft.println(valCO2[i]);
        }

        break;
      }
    case 4:
      {
        tft.fillScreen(WHITE);
        tft.fillRect(280, 0, 40, 50, RED);
        tft.drawRect(280, 0, 40, 50, RED);

        tft.drawFastHLine(280, 23, 30, BLACK);
        tft.drawLine(295, 11, 310, 23, BLACK);
        tft.drawLine(295, 35, 310, 23, BLACK);


        tft.fillRect(0, 0, 40, 50, RED);
        tft.drawRect(0, 0, 40, 50, RED);

        tft.drawFastHLine(10, 23, 30, BLACK);
        tft.drawLine(25, 11, 10, 23, BLACK);
        tft.drawLine(25, 35, 10, 23, BLACK);


        tft.fillRect(0, 200, 50, 50, RED);
        tft.drawRect(0, 200, 50, 50, RED);


        tft.setCursor(7, 217);
        tft.setTextColor(BLACK);
        tft.setTextSize(1);  // set the size of the text
        tft.println("ACASA");


        String graphName = "PM2.5";

        // draw title
        tft.setCursor(130, 10);  // set the cursor
        tft.setTextColor(BLUE);  // set the colour of the text
        tft.setTextSize(3);      // set the size of the text
        tft.println(graphName);

        // draw outline
        tft.drawLine(originX, originY, (originX + sizeX), originY, graphColor);
        tft.drawLine(originX, originY, originX, (originY - sizeY), graphColor);

        // draw lables
        for (int i = 0; i < numberOfMarks; i++) {
          tft.drawLine(mark[i], originY, mark[i], minorSizeY, graphColor);
        }

        // draw numbers
        for (int i = 0; i < 6; i++) {
          tft.drawLine(originX, (originY - number[i]), minorSizeX, (originY - number[i]), graphColor);
        }

        // draw number values
        for (int i = 0; i < 6; i++) {
          tft.setCursor((minorSizeX - 30), (number[i] + numberSize));
          tft.setTextColor(graphColor);
          tft.setTextSize(1);
          tft.println(valPM25[i]);
        }
        break;
      }
    case 5:
      {
        tft.fillScreen(WHITE);
        tft.fillRect(280, 0, 40, 50, RED);
        tft.drawRect(280, 0, 40, 50, RED);

        tft.drawFastHLine(280, 23, 30, BLACK);
        tft.drawLine(295, 11, 310, 23, BLACK);
        tft.drawLine(295, 35, 310, 23, BLACK);


        tft.fillRect(0, 0, 40, 50, RED);
        tft.drawRect(0, 0, 40, 50, RED);

        tft.drawFastHLine(10, 23, 30, BLACK);
        tft.drawLine(25, 11, 10, 23, BLACK);
        tft.drawLine(25, 35, 10, 23, BLACK);


        tft.fillRect(0, 200, 50, 50, RED);
        tft.drawRect(0, 200, 50, 50, RED);


        tft.setCursor(7, 217);
        tft.setTextColor(BLACK);
        tft.setTextSize(1);  // set the size of the text
        tft.println("ACASA");



        String graphName = "PM 10";

        // draw title
        tft.setCursor(130, 10);  // set the cursor
        tft.setTextColor(BLUE);  // set the colour of the text
        tft.setTextSize(3);      // set the size of the text
        tft.println(graphName);

        // draw outline
        tft.drawLine(originX, originY, (originX + sizeX), originY, graphColor);
        tft.drawLine(originX, originY, originX, (originY - sizeY), graphColor);

        // draw lables
        for (int i = 0; i < numberOfMarks; i++) {
          tft.drawLine(mark[i], originY, mark[i], minorSizeY, graphColor);
        }

        // draw numbers
        for (int i = 0; i < 6; i++) {
          tft.drawLine(originX, (originY - number[i]), minorSizeX, (originY - number[i]), graphColor);
        }

        // draw number values
        for (int i = 0; i < 6; i++) {
          tft.setCursor((minorSizeX - 30), (number[i] + numberSize));
          tft.setTextColor(graphColor);
          tft.setTextSize(1);
          tft.println(valPM10[i]);
        }
        break;
      }
    case 6:
      {
        tft.fillScreen(WHITE);
        tft.fillRect(280, 0, 40, 50, RED);
        tft.drawRect(280, 0, 40, 50, RED);

        tft.drawFastHLine(280, 23, 30, BLACK);
        tft.drawLine(295, 11, 310, 23, BLACK);
        tft.drawLine(295, 35, 310, 23, BLACK);


        tft.fillRect(0, 0, 40, 50, RED);
        tft.drawRect(0, 0, 40, 50, RED);

        tft.drawFastHLine(10, 23, 30, BLACK);
        tft.drawLine(25, 11, 10, 23, BLACK);
        tft.drawLine(25, 35, 10, 23, BLACK);


        tft.fillRect(0, 200, 50, 50, RED);
        tft.drawRect(0, 200, 50, 50, RED);


        tft.setCursor(7, 217);
        tft.setTextColor(BLACK);
        tft.setTextSize(1);  // set the size of the text
        tft.println("ACASA");



        String graphName = "Umiditate";

        // draw title
        tft.setCursor(90, 10);   // set the cursor
        tft.setTextColor(BLUE);  // set the colour of the text
        tft.setTextSize(3);      // set the size of the text
        tft.println(graphName);

        // draw outline
        tft.drawLine(originX, originY, (originX + sizeX), originY, graphColor);
        tft.drawLine(originX, originY, originX, (originY - sizeY), graphColor);

        // draw lables
        for (int i = 0; i < numberOfMarks; i++) {
          tft.drawLine(mark[i], originY, mark[i], minorSizeY, graphColor);
        }

        // draw numbers
        for (int i = 0; i < 6; i++) {
          tft.drawLine(originX, (originY - number[i]), minorSizeX, (originY - number[i]), graphColor);
        }

        // draw number values
        for (int i = 0; i < 6; i++) {
          tft.setCursor((minorSizeX - 30), (number[i] + numberSize));
          tft.setTextColor(graphColor);
          tft.setTextSize(1);
          tft.println(valHUM[i]);
        }
        break;
      }
    case 7:
      {
        tft.fillScreen(WHITE);
        tft.fillRect(280, 0, 40, 50, RED);
        tft.drawRect(280, 0, 40, 50, RED);

        tft.drawFastHLine(280, 23, 30, BLACK);
        tft.drawLine(295, 11, 310, 23, BLACK);
        tft.drawLine(295, 35, 310, 23, BLACK);


        tft.fillRect(0, 0, 40, 50, RED);
        tft.drawRect(0, 0, 40, 50, RED);

        tft.drawFastHLine(10, 23, 30, BLACK);
        tft.drawLine(25, 11, 10, 23, BLACK);
        tft.drawLine(25, 35, 10, 23, BLACK);


        tft.fillRect(0, 200, 50, 50, RED);
        tft.drawRect(0, 200, 50, 50, RED);


        tft.setCursor(7, 217);
        tft.setTextColor(BLACK);
        tft.setTextSize(1);  // set the size of the text
        tft.println("ACASA");



        String graphName = "CO";

        // draw title
        tft.setCursor(150, 10);  // set the cursor
        tft.setTextColor(BLUE);  // set the colour of the text
        tft.setTextSize(3);      // set the size of the text
        tft.println(graphName);

        // draw outline
        tft.drawLine(originX, originY, (originX + sizeX), originY, graphColor);
        tft.drawLine(originX, originY, originX, (originY - sizeY), graphColor);

        // draw lables
        for (int i = 0; i < numberOfMarks; i++) {
          tft.drawLine(mark[i], originY, mark[i], minorSizeY, graphColor);
        }

        // draw numbers
        for (int i = 0; i < 6; i++) {
          tft.drawLine(originX, (originY - number[i]), minorSizeX, (originY - number[i]), graphColor);
        }

        // draw number values
        for (int i = 0; i < 6; i++) {
          tft.setCursor((minorSizeX - 30), (number[i] + numberSize));
          tft.setTextColor(graphColor);
          tft.setTextSize(1);
          tft.println(valCO[i]);
        }
        break;
      }
    case 8:
      {

        tft.fillScreen(WHITE);
        tft.fillRect(280, 0, 40, 50, RED);
        tft.drawRect(280, 0, 40, 50, RED);

        tft.drawFastHLine(280, 23, 30, BLACK);
        tft.drawLine(295, 11, 310, 23, BLACK);
        tft.drawLine(295, 35, 310, 23, BLACK);


        tft.fillRect(0, 0, 40, 50, RED);
        tft.drawRect(0, 0, 40, 50, RED);

        tft.drawFastHLine(10, 23, 30, BLACK);
        tft.drawLine(25, 11, 10, 23, BLACK);
        tft.drawLine(25, 35, 10, 23, BLACK);


        tft.fillRect(0, 200, 50, 50, RED);
        tft.drawRect(0, 200, 50, 50, RED);


        tft.setCursor(7, 217);
        tft.setTextColor(BLACK);
        tft.setTextSize(1);  // set the size of the text
        tft.println("ACASA");



        String graphName = "NH3";

        // draw title
        tft.setCursor(140, 10);  // set the cursor
        tft.setTextColor(BLUE);  // set the colour of the text
        tft.setTextSize(3);      // set the size of the text
        tft.println(graphName);

        // draw outline
        tft.drawLine(originX, originY, (originX + sizeX), originY, graphColor);
        tft.drawLine(originX, originY, originX, (originY - sizeY), graphColor);

        // draw lables
        for (int i = 0; i < numberOfMarks; i++) {
          tft.drawLine(mark[i], originY, mark[i], minorSizeY, graphColor);
        }

        // draw numbers
        for (int i = 0; i < 6; i++) {
          tft.drawLine(originX, (originY - number[i]), minorSizeX, (originY - number[i]), graphColor);
        }

        // draw number values
        for (int i = 0; i < 6; i++) {
          tft.setCursor((minorSizeX - 30), (number[i] + numberSize));
          tft.setTextColor(graphColor);
          tft.setTextSize(1);
          tft.println(valNH33[i]);
        }
        break;
      }
    case 9:
      {
        tft.fillScreen(WHITE);
        tft.fillRect(280, 0, 40, 50, RED);
        tft.drawRect(280, 0, 40, 50, RED);

        tft.drawFastHLine(280, 23, 30, BLACK);
        tft.drawLine(295, 11, 310, 23, BLACK);
        tft.drawLine(295, 35, 310, 23, BLACK);


        tft.fillRect(0, 0, 40, 50, RED);
        tft.drawRect(0, 0, 40, 50, RED);

        tft.drawFastHLine(10, 23, 30, BLACK);
        tft.drawLine(25, 11, 10, 23, BLACK);
        tft.drawLine(25, 35, 10, 23, BLACK);


        tft.fillRect(0, 200, 50, 50, RED);
        tft.drawRect(0, 200, 50, 50, RED);


        tft.setCursor(7, 217);
        tft.setTextColor(BLACK);
        tft.setTextSize(1);  // set the size of the text
        tft.println("ACASA");



        String graphName = "NO2";

        // draw title
        tft.setCursor(140, 10);  // set the cursor
        tft.setTextColor(BLUE);  // set the colour of the text
        tft.setTextSize(3);      // set the size of the text
        tft.println(graphName);

        // draw outline
        tft.drawLine(originX, originY, (originX + sizeX), originY, graphColor);
        tft.drawLine(originX, originY, originX, (originY - sizeY), graphColor);

        // draw lables
        for (int i = 0; i < numberOfMarks; i++) {
          tft.drawLine(mark[i], originY, mark[i], minorSizeY, graphColor);
        }

        // draw numbers
        for (int i = 0; i < 6; i++) {
          tft.drawLine(originX, (originY - number[i]), minorSizeX, (originY - number[i]), graphColor);
        }

        // draw number values
        for (int i = 0; i < 6; i++) {
          tft.setCursor((minorSizeX - 30), (number[i] + numberSize));
          tft.setTextColor(graphColor);
          tft.setTextSize(1);
          tft.println(valNO22[i]);
        }
        break;
      }
    case 10:
      {
        tft.fillScreen(WHITE);
        tft.fillRect(280, 0, 40, 50, RED);
        tft.drawRect(280, 0, 40, 50, RED);

        tft.drawFastHLine(280, 23, 30, BLACK);
        tft.drawLine(295, 11, 310, 23, BLACK);
        tft.drawLine(295, 35, 310, 23, BLACK);


        tft.fillRect(0, 0, 40, 50, RED);
        tft.drawRect(0, 0, 40, 50, RED);

        tft.drawFastHLine(10, 23, 30, BLACK);
        tft.drawLine(25, 11, 10, 23, BLACK);
        tft.drawLine(25, 35, 10, 23, BLACK);


        tft.fillRect(0, 200, 50, 50, RED);
        tft.drawRect(0, 200, 50, 50, RED);



        tft.setCursor(7, 217);
        tft.setTextColor(BLACK);
        tft.setTextSize(1);  // set the size of the text
        tft.println("ACASA");


        String graphName = "O3";


        // draw title
        tft.setCursor(65, 10);   // set the cursor
        tft.setTextColor(BLUE);  // set the colour of the text
        tft.setTextSize(3);      // set the size of the text
        tft.println(graphName);

        // draw outline
        tft.drawLine(originX, originY, (originX + sizeX), originY, graphColor);
        tft.drawLine(originX, originY, originX, (originY - sizeY), graphColor);

        // draw lables
        for (int i = 0; i < numberOfMarks; i++) {
          tft.drawLine(mark[i], originY, mark[i], minorSizeY, graphColor);
        }

        // draw numbers
        for (int i = 0; i < 6; i++) {
          tft.drawLine(originX, (originY - number[i]), minorSizeX, (originY - number[i]), graphColor);
        }

        // draw number values
        for (int i = 0; i < 6; i++) {
          tft.setCursor((minorSizeX - 30), (number[i] + numberSize));
          tft.setTextColor(graphColor);
          tft.setTextSize(1);
          tft.println(valO3[i]);
        }

        break;
      }
    case 11:
      {
        tft.fillScreen(WHITE);
        tft.fillRect(280, 0, 40, 50, RED);
        tft.drawRect(280, 0, 40, 50, RED);

        tft.drawFastHLine(280, 23, 30, BLACK);
        tft.drawLine(295, 11, 310, 23, BLACK);
        tft.drawLine(295, 35, 310, 23, BLACK);


        tft.fillRect(0, 0, 40, 50, RED);
        tft.drawRect(0, 0, 40, 50, RED);

        tft.drawFastHLine(10, 23, 30, BLACK);
        tft.drawLine(25, 11, 10, 23, BLACK);
        tft.drawLine(25, 35, 10, 23, BLACK);


        tft.fillRect(0, 200, 50, 50, RED);
        tft.drawRect(0, 200, 50, 50, RED);



        tft.setCursor(7, 217);
        tft.setTextColor(BLACK);
        tft.setTextSize(1);  // set the size of the text
        tft.println("ACASA");


        String graphName = "Fonic";


        // draw title
        tft.setCursor(65, 10);   // set the cursor
        tft.setTextColor(BLUE);  // set the colour of the text
        tft.setTextSize(3);      // set the size of the text
        tft.println(graphName);

        // draw outline
        tft.drawLine(originX, originY, (originX + sizeX), originY, graphColor);
        tft.drawLine(originX, originY, originX, (originY - sizeY), graphColor);

        // draw lables
        for (int i = 0; i < numberOfMarks; i++) {
          tft.drawLine(mark[i], originY, mark[i], minorSizeY, graphColor);
        }

        // draw numbers
        for (int i = 0; i < 6; i++) {
          tft.drawLine(originX, (originY - number[i]), minorSizeX, (originY - number[i]), graphColor);
        }

        // draw number values
        for (int i = 0; i < 6; i++) {
          tft.setCursor((minorSizeX - 30), (number[i] + numberSize));
          tft.setTextColor(graphColor);
          tft.setTextSize(1);
          tft.println(valtemp[i]);
        }

        break;
      }
    case 12:
      {
        tft.fillScreen(WHITE);
        tft.fillRect(280, 0, 40, 50, RED);
        tft.drawRect(280, 0, 40, 50, RED);

        tft.drawFastHLine(280, 23, 30, BLACK);
        tft.drawLine(295, 11, 310, 23, BLACK);
        tft.drawLine(295, 35, 310, 23, BLACK);


        tft.fillRect(0, 0, 40, 50, RED);
        tft.drawRect(0, 0, 40, 50, RED);

        tft.drawFastHLine(10, 23, 30, BLACK);
        tft.drawLine(25, 11, 10, 23, BLACK);
        tft.drawLine(25, 35, 10, 23, BLACK);


        tft.fillRect(0, 200, 50, 50, RED);
        tft.drawRect(0, 200, 50, 50, RED);



        tft.setCursor(7, 217);
        tft.setTextColor(BLACK);
        tft.setTextSize(1);  // set the size of the text
        tft.println("ACASA");


        String graphName = "Magnetometru";


        // draw title
        tft.setCursor(65, 10);   // set the cursor
        tft.setTextColor(BLUE);  // set the colour of the text
        tft.setTextSize(3);      // set the size of the text
        tft.println(graphName);

        // draw outline
        tft.drawLine(originX, originY, (originX + sizeX), originY, graphColor);
        tft.drawLine(originX, originY, originX, (originY - sizeY), graphColor);

        // draw lables
        for (int i = 0; i < numberOfMarks; i++) {
          tft.drawLine(mark[i], originY, mark[i], minorSizeY, graphColor);
        }

        // draw numbers
        for (int i = 0; i < 6; i++) {
          tft.drawLine(originX, (originY - number[i]), minorSizeX, (originY - number[i]), graphColor);
        }

        // draw number values
        for (int i = 0; i < 6; i++) {
          tft.setCursor((minorSizeX - 30), (number[i] + numberSize));
          tft.setTextColor(graphColor);
          tft.setTextSize(1);
          tft.println(valMAG[i]);
        }

        break;
      }
    case 13:  ///13
      {
        tft.fillScreen(WHITE);
        tft.fillRect(280, 0, 40, 50, RED);
        tft.drawRect(280, 0, 40, 50, RED);

        tft.drawFastHLine(280, 23, 30, BLACK);
        tft.drawLine(295, 11, 310, 23, BLACK);
        tft.drawLine(295, 35, 310, 23, BLACK);


        tft.fillRect(0, 0, 40, 50, RED);
        tft.drawRect(0, 0, 40, 50, RED);

        tft.drawFastHLine(10, 23, 30, BLACK);
        tft.drawLine(25, 11, 10, 23, BLACK);
        tft.drawLine(25, 35, 10, 23, BLACK);


        tft.fillRect(0, 200, 50, 50, RED);
        tft.drawRect(0, 200, 50, 50, RED);


        tft.setCursor(7, 217);
        tft.setTextColor(BLACK);
        tft.setTextSize(1);  // set the size of the text
        tft.println("ACASA");

        String graphName = "Hidrogen";


        // draw title
        tft.setCursor(65, 10);   // set the cursor
        tft.setTextColor(BLUE);  // set the colour of the text
        tft.setTextSize(3);      // set the size of the text
        tft.println(graphName);

        // draw outline
        tft.drawLine(originX, originY, (originX + sizeX), originY, graphColor);
        tft.drawLine(originX, originY, originX, (originY - sizeY), graphColor);

        // draw lables
        for (int i = 0; i < numberOfMarks; i++) {
          tft.drawLine(mark[i], originY, mark[i], minorSizeY, graphColor);
        }

        // draw numbers
        for (int i = 0; i < 6; i++) {
          tft.drawLine(originX, (originY - number[i]), minorSizeX, (originY - number[i]), graphColor);
        }

        // draw number values
        for (int i = 0; i < 6; i++) {
          tft.setCursor((minorSizeX - 30), (number[i] + numberSize));
          tft.setTextColor(graphColor);
          tft.setTextSize(1);
          tft.println(valHIDRO[i]);
        }

        break;
      }
    case 14:  ///14
      {
        tft.fillScreen(WHITE);
        tft.fillRect(280, 0, 40, 50, RED);
        tft.drawRect(280, 0, 40, 50, RED);

        tft.drawFastHLine(280, 23, 30, BLACK);
        tft.drawLine(295, 11, 310, 23, BLACK);
        tft.drawLine(295, 35, 310, 23, BLACK);


        tft.fillRect(0, 0, 40, 50, RED);
        tft.drawRect(0, 0, 40, 50, RED);

        tft.drawFastHLine(10, 23, 30, BLACK);
        tft.drawLine(25, 11, 10, 23, BLACK);
        tft.drawLine(25, 35, 10, 23, BLACK);


        tft.fillRect(0, 200, 50, 50, RED);
        tft.drawRect(0, 200, 50, 50, RED);


        tft.setCursor(7, 217);
        tft.setTextColor(BLACK);
        tft.setTextSize(1);  // set the size of the text
        tft.println("ACASA");



        String graphName = "Presiune";

        // draw title
        tft.setCursor(100, 10);  // set the cursor
        tft.setTextColor(BLUE);  // set the colour of the text
        tft.setTextSize(3);      // set the size of the text
        tft.println(graphName);

        // draw outline
        tft.drawLine(originX, originY, (originX + sizeX), originY, graphColor);
        tft.drawLine(originX, originY, originX, (originY - sizeY), graphColor);

        // draw lables
        for (int i = 0; i < numberOfMarks; i++) {
          tft.drawLine(mark[i], originY, mark[i], minorSizeY, graphColor);
        }

        // draw numbers
        for (int i = 0; i < 6; i++) {
          tft.drawLine(originX, (originY - number[i]), minorSizeX, (originY - number[i]), graphColor);
        }

        // draw number values
        for (int i = 0; i < 6; i++) {
          tft.setCursor((minorSizeX - 30), (number[i] + numberSize));
          tft.setTextColor(graphColor);
          tft.setTextSize(1);
          tft.println(valPRESU[i]);
        }
        break;
      }
  }
  tft.setRotation(0);
}


/*
  \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
  ////////////////////////////////\
  ////////////SETUP///////////////\
  ////////////////////////////////\
  \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
*/

void createHeader() {
  if (file.open(NUME_FISIER_CSV, O_CREAT | O_WRITE | O_AT_END)) {
    file.println("Temperatura;TVOC;CO2;PM2_5;PM10;Umiditate;CO;NH3;NO2;O3;Fonic;Magnetic;Hidrogen;Presiune");
    file.close();
    Serial.println("Antet creat.");
  }
}

//ok = 10 meniu principal
int ok = 10;
int y = 0;

bool prim_run = true;
bool initializare_sd = true;

void setup() {

  if (prim_run){
    prim_run = false;
    delay(2000);
  }
  
  if(initializare_sd){
    initializare_sd = false;
    if (!sd.begin(SD_CONFIG)) {
      Serial.println("EROARE: Initializare ESUATA!");
      Serial.println("Verifica: Cardul e introdus? E formatat FAT32?");
      
      if (sd.card()->errorCode()) {
        Serial.print("Cod eroare intern: 0x");
        Serial.println(sd.card()->errorCode(), HEX);
        Serial.print("Data eroare: 0x");
        Serial.println(sd.card()->errorData(), HEX);
      }
    } 
    if (!sd.exists(NUME_FISIER_CSV)) {
      // Deschidem cu flag-uri de scriere
      if (file.open(NUME_FISIER_CSV, O_WRONLY | O_CREAT)) {
        file.println("Temperatura;TVOC;CO2;PM2_5;PM10;Umiditate;CO;NH3;NO2;O3;Fonic;Magnetic;Hidrogen;Presiune");
        file.close();
        Serial.println("Fisier nou creat si antet scris.");
      } else {
        Serial.println("Eroare la crearea fisierului!");
      }
    } else {
      Serial.println("Fisierul exista deja. Voi adauga date.");
    }
    Serial.println("Card SD configurat cu success!");
  }

  ///incarcam din memorie valorile pentru calibrarea senzorilor
  EEPROM.get(EEPROM_ADDRESS_START, adreseEEPROMSenzori);
  if (adreseEEPROMSenzori.eeprom_valid_flag != MAGIX_NUMBER_ADDRESS){
    Serial.println("Am intrat in initializarea EEPROM!");
    adreseEEPROMSenzori.eeprom_valid_flag = MAGIX_NUMBER_ADDRESS;
    adreseEEPROMSenzori.val_Temp = 0;
    adreseEEPROMSenzori.val_TVOC = 0;
    adreseEEPROMSenzori.val_CO2 = 0;
    adreseEEPROMSenzori.val_PMP2_5 = 0;
    adreseEEPROMSenzori.val_PMP10 = 0;
    adreseEEPROMSenzori.val_Hum = 0;
    adreseEEPROMSenzori.val_CO = 0;
    adreseEEPROMSenzori.val_NH3 = 0;
    adreseEEPROMSenzori.val_NO2 = 0;
    adreseEEPROMSenzori.val_O3 = 0;
    adreseEEPROMSenzori.val_Fonic = 0;
    adreseEEPROMSenzori.val_Mag = 0;
    adreseEEPROMSenzori.val_H = 0;
    adreseEEPROMSenzori.val_Pres = 0;


    adreseEEPROMSenzori.crit_val_Temp = 35;
    adreseEEPROMSenzori.crit_val_TVOC = 300;
    adreseEEPROMSenzori.crit_val_CO2 = 8000;
    adreseEEPROMSenzori.crit_val_PMP2_5 = 220;
    adreseEEPROMSenzori.crit_val_PMP10 = 270;
    adreseEEPROMSenzori.crit_val_Hum = 73;
    adreseEEPROMSenzori.crit_val_CO = 12;
    adreseEEPROMSenzori.crit_val_NH3 = 25;
    adreseEEPROMSenzori.crit_val_NO2 = 200;
    adreseEEPROMSenzori.crit_val_O3 = 100;
    adreseEEPROMSenzori.crit_val_Fonic = 80;
    adreseEEPROMSenzori.crit_val_Mag = 650;
    adreseEEPROMSenzori.crit_val_H = 40;
    adreseEEPROMSenzori.crit_val_Pres = 1600;

    EEPROM.put(EEPROM_ADDRESS_START, adreseEEPROMSenzori);
  }
  
  tft.reset();

  Serial.begin(57600);
  uint16_t ID = tft.readID();
  tft.begin(ID);

  screen(ok, y);


  ser_co2.begin(9600);
  Serial1.begin(9600);


  unsigned status;


  status = bme.begin(0x76);
  if (!status) {
    Serial.print("ERROR_BME");
    while (1)
      ;
  }

  //  if (!ccs.begin(0x5B)) {
  //    Serial.println("ERROR");
  //    while (1);
  //  }

  pinMode(buzzerPin, OUTPUT);
  digitalWrite(buzzerPin, HIGH);

  if (!mag.begin()) {
    Serial.println("Eroare: Nu se poate detecta HMC5883L. Verificați conexiunile!");
    while (1)
      ;
  }
  sensor_t sensor;
  mag.getSensor(&sensor);


  tft.setRotation(1);
}

/*
  \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
  ////////////////////////////////\
  //////Lucru pe structura///////\
  ////////////////////////////////\
  \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
*/

///true in sus +1; 
///false in jos -1    
void modificare_valoare_structura_calibrare(bool sens){
  Serial.println(sens);
  Serial.println(pozitie_afisare);
  if (sens == false){
    if (pozitie_afisare == 0){
       Serial.println("Aici");
       Serial.println(adreseEEPROMSenzori.val_Temp);
       adreseEEPROMSenzori.val_Temp = adreseEEPROMSenzori.val_Temp + 1;
       Serial.println(adreseEEPROMSenzori.val_Temp);
    }
    if (pozitie_afisare == 1){
      adreseEEPROMSenzori.val_TVOC += 1;
    }
    if (pozitie_afisare == 2){
      adreseEEPROMSenzori.val_CO2 += 1;
    }
    if (pozitie_afisare == 3){
      adreseEEPROMSenzori.val_PMP2_5 += 1;
    }
    if (pozitie_afisare == 4){
      adreseEEPROMSenzori.val_PMP10 += 1;
    }
    if (pozitie_afisare == 5){
      adreseEEPROMSenzori.val_Hum += 1;
    }
    if (pozitie_afisare == 6){
      adreseEEPROMSenzori.val_CO += 1;
    }
    if (pozitie_afisare == 7){
      adreseEEPROMSenzori.val_NH3 += 1;
    }
    if (pozitie_afisare == 8){
      adreseEEPROMSenzori.val_NO2 += 1;
    }
    if (pozitie_afisare == 9){
      adreseEEPROMSenzori.val_O3 += 1;
    }
    if (pozitie_afisare == 10){
      adreseEEPROMSenzori.val_Fonic += 1;
    }
    if (pozitie_afisare == 11){
      adreseEEPROMSenzori.val_Mag += 1;
    }
    if (pozitie_afisare == 12){
      adreseEEPROMSenzori.val_H += 1;
    }
    if (pozitie_afisare == 13){
      adreseEEPROMSenzori.val_Pres += 1;
    }
    
  }else{
    if (pozitie_afisare == 0){
       adreseEEPROMSenzori.val_Temp -= 1;
    }
    if (pozitie_afisare == 1){
      adreseEEPROMSenzori.val_TVOC -= 1;
    }
    if (pozitie_afisare == 2){
      adreseEEPROMSenzori.val_CO2 -= 1;
    }
    if (pozitie_afisare == 3){
      adreseEEPROMSenzori.val_PMP2_5 -= 1;
    }
    if (pozitie_afisare == 4){
      adreseEEPROMSenzori.val_PMP10 -= 1;
    }
    if (pozitie_afisare == 5){
      adreseEEPROMSenzori.val_Hum -= 1;
    }
    if (pozitie_afisare == 6){
      adreseEEPROMSenzori.val_CO -= 1;
    }
    if (pozitie_afisare == 7){
      adreseEEPROMSenzori.val_NH3 -= 1;
    }
    if (pozitie_afisare == 8){
      adreseEEPROMSenzori.val_NO2 -= 1;
    }
    if (pozitie_afisare == 9){
      adreseEEPROMSenzori.val_O3 -= 1;
    }
    if (pozitie_afisare == 10){
      adreseEEPROMSenzori.val_Fonic -= 1;
    }
    if (pozitie_afisare == 11){
      adreseEEPROMSenzori.val_Mag -= 1;
    }
    if (pozitie_afisare == 12){
      adreseEEPROMSenzori.val_H -= 1;
    }
    if (pozitie_afisare == 13){
      adreseEEPROMSenzori.val_Pres -= 1;
    }

  }
}


void modificare_valoare_critica(bool sens){
  Serial.println(sens);
  Serial.println(pozitie_afisare_limite);
  if (sens == false){
    if (pozitie_afisare_limite == 0){
       Serial.println("Aici");
       Serial.println(adreseEEPROMSenzori.crit_val_Temp);
       adreseEEPROMSenzori.crit_val_Temp = adreseEEPROMSenzori.crit_val_Temp + 1;
       Serial.println(adreseEEPROMSenzori.crit_val_Temp);
    }
    if (pozitie_afisare_limite == 1){
      adreseEEPROMSenzori.crit_val_TVOC += 1;
    }
    if (pozitie_afisare_limite == 2){
      adreseEEPROMSenzori.crit_val_CO2 += 1;
    }
    if (pozitie_afisare_limite == 3){
      adreseEEPROMSenzori.crit_val_PMP2_5 += 1;
    }
    if (pozitie_afisare_limite == 4){
      adreseEEPROMSenzori.crit_val_PMP10 += 1;
    }
    if (pozitie_afisare_limite == 5){
      adreseEEPROMSenzori.crit_val_Hum += 1;
    }
    if (pozitie_afisare_limite == 6){
      adreseEEPROMSenzori.crit_val_CO += 1;
    }
    if (pozitie_afisare_limite == 7){
      adreseEEPROMSenzori.crit_val_NH3 += 1;
    }
    if (pozitie_afisare_limite == 8){
      adreseEEPROMSenzori.crit_val_NO2 += 1;
    }
    if (pozitie_afisare_limite == 9){
      adreseEEPROMSenzori.crit_val_O3 += 1;
    }
    if (pozitie_afisare_limite == 10){
      adreseEEPROMSenzori.crit_val_Fonic += 1;
    }
    if (pozitie_afisare_limite == 11){
      adreseEEPROMSenzori.crit_val_Mag += 1;
    }
    if (pozitie_afisare_limite == 12){
      adreseEEPROMSenzori.crit_val_H += 1;
    }
    if (pozitie_afisare_limite == 13){
      adreseEEPROMSenzori.crit_val_Pres += 1;
    }
  }else{
    if (pozitie_afisare_limite == 0){
       adreseEEPROMSenzori.crit_val_Temp -= 1;
    }
    if (pozitie_afisare_limite == 1){
      adreseEEPROMSenzori.crit_val_TVOC -= 1;
    }
    if (pozitie_afisare_limite == 2){
      adreseEEPROMSenzori.crit_val_CO2 -= 1;
    }
    if (pozitie_afisare_limite == 3){
      adreseEEPROMSenzori.crit_val_PMP2_5 -= 1;
    }
    if (pozitie_afisare_limite == 4){
      adreseEEPROMSenzori.crit_val_PMP10 -= 1;
    }
    if (pozitie_afisare_limite == 5){
      adreseEEPROMSenzori.crit_val_Hum -= 1;
    }
    if (pozitie_afisare_limite == 6){
      adreseEEPROMSenzori.crit_val_CO -= 1;
    }
    if (pozitie_afisare_limite == 7){
      adreseEEPROMSenzori.crit_val_NH3 -= 1;
    }
    if (pozitie_afisare_limite == 8){
      adreseEEPROMSenzori.crit_val_NO2 -= 1;
    }
    if (pozitie_afisare_limite == 9){
      adreseEEPROMSenzori.crit_val_O3 -= 1;
    }
    if (pozitie_afisare_limite == 10){
      adreseEEPROMSenzori.crit_val_Fonic -= 1;
    }
    if (pozitie_afisare_limite == 11){
      adreseEEPROMSenzori.crit_val_Mag -= 1;
    }
    if (pozitie_afisare_limite == 12){
      adreseEEPROMSenzori.crit_val_H -= 1;
    }
    if (pozitie_afisare_limite == 13){
      adreseEEPROMSenzori.crit_val_Pres -= 1;
    }
  }
}


void resetare_calibrare_senzori(){
  adreseEEPROMSenzori.eeprom_valid_flag = MAGIX_NUMBER_ADDRESS;
  adreseEEPROMSenzori.val_Temp = 0;
  adreseEEPROMSenzori.val_TVOC = 0;
  adreseEEPROMSenzori.val_CO2 = 0;
  adreseEEPROMSenzori.val_PMP2_5 = 0;
  adreseEEPROMSenzori.val_PMP10 = 0;
  adreseEEPROMSenzori.val_Hum = 0;
  adreseEEPROMSenzori.val_CO = 0;
  adreseEEPROMSenzori.val_NH3 = 0;
  adreseEEPROMSenzori.val_NO2 = 0;
  adreseEEPROMSenzori.val_O3 = 0;
  adreseEEPROMSenzori.val_Fonic = 0;
  adreseEEPROMSenzori.val_Mag = 0;
  adreseEEPROMSenzori.val_H = 0;
  adreseEEPROMSenzori.val_Pres = 0;

  EEPROM.put(EEPROM_ADDRESS_START, adreseEEPROMSenzori);
}


void resetare_limite_masuratori(){

  adreseEEPROMSenzori.crit_val_Temp = 35;
  adreseEEPROMSenzori.crit_val_TVOC = 300;
  adreseEEPROMSenzori.crit_val_CO2 = 8000;
  adreseEEPROMSenzori.crit_val_PMP2_5 = 220;
  adreseEEPROMSenzori.crit_val_PMP10 = 270;
  adreseEEPROMSenzori.crit_val_Hum = 73;
  adreseEEPROMSenzori.crit_val_CO = 12;
  adreseEEPROMSenzori.crit_val_NH3 = 25;
  adreseEEPROMSenzori.crit_val_NO2 = 200;
  adreseEEPROMSenzori.crit_val_O3 = 100;
  adreseEEPROMSenzori.crit_val_Fonic = 80;
  adreseEEPROMSenzori.crit_val_Mag = 650;
  adreseEEPROMSenzori.crit_val_H = 40;
  adreseEEPROMSenzori.crit_val_Pres = 1600;

  EEPROM.put(EEPROM_ADDRESS_START, adreseEEPROMSenzori);
}


/*
  \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
  ////////////////////////////////\
  ////////TOUCH interfata/////////\
  //////////principala////////////\
  ////////////////////////////////\
  \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
*/

bool legit(int nr){
  if (nr >= 0 && nr <= 9)
    return true;

  return false;
}

int touchscreen_ecran() {
  p = tou.getPoint();  //Get touch point

  switch (ok) {
    case 0:
      {
        break;
      }
    case 1:
      {
        if (p.z > tou.pressureThreshhold) {
          if (p.x > 100 && p.x < 220 && p.y > 570 && p.y < 840) {
            ok++;
            setup();
          }
        }

        break;
      }
    case 2:
      {
        if (p.z > tou.pressureThreshhold) {
          if (p.x > 590 && p.x < 910 && p.y > 380 && p.y < 640) {
            ok--;
            setup();
          }
          if (p.x > 160 && p.x < 480 && p.y > 380 && p.y < 640) {
            ok++;
            setup();
          }
          if (p.x > 230 && p.x < 850 && p.y > 130 && p.y < 280) {
            ok = 10;
            setup();
          }
        }

        break;
      }
    case 3:
      {
        if (p.z > tou.pressureThreshhold) {
          if (p.x > 150 && p.x < 220 && p.y > 400 && p.y < 500) {
            ok++;
            setup();
          }

          if (p.x > 840 && p.x < 920 && p.y > 410 && p.y < 520) {
            ok--;
            setup();
          }
        }

        if (p.z > tou.pressureThreshhold) {
          if (p.x > 600 && p.x < 900 && p.y > 550 && p.y < 890) {
            ok = 0;
            y = 1;
            setup();
          }
        }
        if (p.z > tou.pressureThreshhold) {
          if (p.x > 145 && p.x < 460 && p.y > 550 && p.y < 890) {
            ok = 0;
            y = 2;
            setup();
          }
        }
        if (p.z > tou.pressureThreshhold) {
          if (p.x > 400 && p.x < 700 && p.y > 210 && p.y < 410) {
            ok = 0;
            y = 3;
            setup();
          }
        }

        break;
      }
    case 4:
      {
        ///TSPoint p = tou.getPoint();  //Get touch point
        if (p.z > tou.pressureThreshhold) {
          if (p.x > 150 && p.x < 220 && p.y > 400 && p.y < 500) {
            ok++;
            setup();
          }
          if (p.x > 840 && p.x < 920 && p.y > 410 && p.y < 520) {
            ok--;
            setup();
          }
        }

        if (p.z > tou.pressureThreshhold) {
          if (p.x > 600 && p.x < 900 && p.y > 550 && p.y < 890) {
            ok = 0;
            y = 4;
            setup();
          }
        }

        if (p.z > tou.pressureThreshhold) {
          if (p.x > 145 && p.x < 460 && p.y > 550 && p.y < 890) {
            ok = 0;
            y = 5;
            setup();
          }
        }

        if (p.z > tou.pressureThreshhold) {
          if (p.x > 400 && p.x < 700 && p.y > 210 && p.y < 410) {
            ok = 0;
            y = 6;
            setup();
          }
        }
        break;
      }
    case 5:
      {
        ///TSPoint p = tou.getPoint();  //Get touch point
        if (p.z > tou.pressureThreshhold) {
          if (p.x > 150 && p.x < 220 && p.y > 400 && p.y < 500) {
            ok++;
            setup();
          }
          if (p.x > 840 && p.x < 920 && p.y > 410 && p.y < 520) {
            ok--;
            setup();
          }
        }
        if (p.z > tou.pressureThreshhold) {
          if (p.x > 600 && p.x < 900 && p.y > 550 && p.y < 890) {
            ok = 0;
            y = 7;
            setup();
          }
        }
        if (p.z > tou.pressureThreshhold) {
          if (p.x > 145 && p.x < 460 && p.y > 550 && p.y < 890) {
            ok = 0;
            y = 8;
            setup();
          }
        }
        if (p.z > tou.pressureThreshhold) {
          if (p.x > 400 && p.x < 700 && p.y > 210 && p.y < 410) {
            ok = 0;
            y = 9;
            setup();
          }
        }
        break;
      }
    case 6:
      {

        if (p.z > tou.pressureThreshhold) {
          if (p.x > 150 && p.x < 220 && p.y > 400 && p.y < 500) {
            ok++;
            setup();
          }

          if (p.x > 840 && p.x < 920 && p.y > 410 && p.y < 520) {
            ok--;
            setup();
          }
        }

        if (p.z > tou.pressureThreshhold) {
          if (p.x > 600 && p.x < 900 && p.y > 550 && p.y < 890) {
            ok = 0;
            y = 10;
            setup();
          }
        }
        if (p.z > tou.pressureThreshhold) {
          if (p.x > 145 && p.x < 460 && p.y > 550 && p.y < 890) {
            ok = 0;
            y = 11;
            setup();
          }
        }
        if (p.z > tou.pressureThreshhold) {
          if (p.x > 400 && p.x < 700 && p.y > 210 && p.y < 410) {
            ok = 0;
            y = 12;
            setup();
          }
        }

        break;
      }
    case 7:
      {
        ///TSPoint p = tou.getPoint();  //Get touch point
        if (p.z > tou.pressureThreshhold) {
          if (p.x > 840 && p.x < 920 && p.y > 410 && p.y < 520) {
            ok--;
            setup();
          }


          if (p.z > tou.pressureThreshhold) {
            if (p.x > 230 && p.x < 780 && p.y > 560 && p.y < 820) {
              ok = 0;
              y = 13;  ///13
              setup();
            }
          }
          if (p.z > tou.pressureThreshhold) {
            if (p.x > 230 && p.x < 780 && p.y > 230 && p.y < 480) {
              ok = 0;
              y = 14;  ///14
              setup();
            }
          }
        }
        break;
      }
    case 10: {
        ///x = 930 y 770
        ///x = 595 y = 270

        if (p.z > tou.pressureThreshhold) {
          if (p.x > 590 && p.x < 930 && p.y > 270 && p.y < 770) {
            ok = 11;
            setup();
          }
          if (p.x > 160 && p.x < 500 && p.y > 260 && p.y < 750) {
            ok = 2;
            setup();
          }
        }

        break;
      }
    case 11:{
          ///Aicea urmeaza sa fie pusa logica de login cu numerele si variabilele
          ///introduse si daca corespund sa se mearga la urmatoarea pagina, altfel refrsh
          
          if (p.x > 840 && p.x < 920 && p.y > 410 && p.y < 520) {
            ok = 10;
            setup();
          }


          ///buton comutare numere numar_logare_admin
          ///crescator
          if (p.x > 700 && p.x < 750 && p.y > 515 && p.y < 600) {
            int nr_test = (numar_logare_admin / 1000) % 10 + 1;
            if (legit(nr_test) == true){
              numar_logare_admin = numar_logare_admin + 1000;
              setup();
            }
          }

          if (p.x > 590 && p.x < 645 && p.y > 515 && p.y < 600) {
            int nr_test = (numar_logare_admin / 100) % 10 + 1;
            if (legit(nr_test) == true){
              numar_logare_admin = numar_logare_admin + 100;
              setup();
            }
          }

          if (p.x > 480 && p.x < 540 && p.y > 515 && p.y < 600) {
            int nr_test = (numar_logare_admin / 10) % 10 + 1;
            if (legit(nr_test) == true){
              numar_logare_admin = numar_logare_admin + 10;
              setup();
            }
          }

          if (p.x > 380 && p.x < 430 && p.y > 515 && p.y < 600) {
            int nr_test = numar_logare_admin % 10 + 1;
            if (legit(nr_test) == true){
              numar_logare_admin = numar_logare_admin + 1;
              setup();
            }
          }

          ///descrescator
          if (p.x > 690 && p.x < 750 && p.y > 240 && p.y < 335) {
            int nr_test = (numar_logare_admin / 1000) % 10 - 1;
            if (legit(nr_test) == true){
              numar_logare_admin = numar_logare_admin - 1000;
              setup();
            }
          }

          if (p.x > 590 && p.x < 645 && p.y > 240 && p.y < 335) {
            int nr_test = (numar_logare_admin / 100) % 10 - 1;
            if (legit(nr_test)){
              numar_logare_admin = numar_logare_admin - 100;
              setup();
            }
          }

          if (p.x > 480 && p.x < 540 && p.y > 240 && p.y < 335) {
            int nr_test = (numar_logare_admin / 10) % 10 - 1;
            if (legit(nr_test)){
              numar_logare_admin = numar_logare_admin - 10;
              setup();
            }
          }

          if (p.x > 380 && p.x < 430 && p.y > 240 && p.y < 335) {
            int nr_test = numar_logare_admin % 10 - 1;
            if (legit(nr_test)){
              numar_logare_admin = numar_logare_admin - 1;
              setup();
            }
          }


          ///buton login
          if (p.x > 155 && p.x < 325 && p.y > 280 && p.y < 560){
            if (numar_logare_admin == ID_ADMIN_LOGIN){
              ok = 12;
              setup();
            }else{
              setup();
            }
          }


          break;
      }
    case 12:{
       if (p.z > tou.pressureThreshhold) {
          if (p.x > 595 && p.x < 910 && p.y > 380 && p.y < 750) {
            ok = 13;
            setup();
          }
          if (p.x > 160 && p.x < 480 && p.y > 380 && p.y < 750) {
            ok = 14;
            setup();
          }
          if (p.x > 850 && p.x < 950 && p.y > 800 && p.y < 900) {
            ok = 10;
            setup();
          }

          ///Resetare senzori calibrati
          if (p.x > 150 && p.x < 500 && p.y > 180 && p.y < 330) {
            resetare_calibrare_senzori();
            setup();
          }

          ///Resetare limite standard
          if (p.x > 600 && p.x < 900 && p.y > 180 && p.y < 330) {
            resetare_limite_masuratori();
            setup();
          }
        }
        break;
    }
    case 13:{

      if (p.x > 840 && p.x < 920 && p.y > 410 && p.y < 520) {
          ok = 12;
          setup();
      }

      if (p.x > 750 && p.x < 820 && p.y > 600 && p.y < 700) {
        if (pozitie_afisare_limite > 0 && pozitie_afisare_limite <= 13){
          pozitie_afisare_limite--;
          setup();
        }
      }
      
      if (p.x > 220 && p.x < 310 && p.y > 600 && p.y < 700) {
        if (pozitie_afisare_limite >= 0 && pozitie_afisare_limite < 13){
          pozitie_afisare_limite++;
          setup();
        }
      }

      //Butoane calibrat senzor +1 -1
      if (p.x > 750 && p.x < 820 && p.y > 380 && p.y < 450) {
          modificare_valoare_critica(true);
          EEPROM.put(EEPROM_ADDRESS_START, adreseEEPROMSenzori);
          setup();
      }
      
      if (p.x > 220 && p.x < 310 && p.y > 370 && p.y < 480) {
          modificare_valoare_critica(false);
          EEPROM.put(EEPROM_ADDRESS_START, adreseEEPROMSenzori);
          setup();
      }

      //UPDATE
      if (p.x > 350 && p.x < 690 && p.y > 160 && p.y < 300) {
        EEPROM.put(EEPROM_ADDRESS_START, adreseEEPROMSenzori);
        setup();
      }

      break;
    }

    case 14:{

      if (p.x > 840 && p.x < 920 && p.y > 410 && p.y < 520) {
          ok = 12;
          setup();
      }

      if (p.x > 750 && p.x < 820 && p.y > 600 && p.y < 700) {
        if (pozitie_afisare > 0 && pozitie_afisare <= 13){
          pozitie_afisare--;
          setup();
        }
      }
      
      if (p.x > 220 && p.x < 310 && p.y > 600 && p.y < 700) {
        if (pozitie_afisare >= 0 && pozitie_afisare < 13){
          pozitie_afisare++;
          setup();
        }
      }

      //Butoane calibrat senzor +1 -1
      if (p.x > 750 && p.x < 820 && p.y > 380 && p.y < 450) {
          modificare_valoare_structura_calibrare(true);
          EEPROM.put(EEPROM_ADDRESS_START, adreseEEPROMSenzori);
          setup();
      }
      
      if (p.x > 220 && p.x < 310 && p.y > 370 && p.y < 480) {
          modificare_valoare_structura_calibrare(false);
          EEPROM.put(EEPROM_ADDRESS_START, adreseEEPROMSenzori);
          setup();
      }

      //UPDATE
      if (p.x > 350 && p.x < 690 && p.y > 160 && p.y < 300) {
        EEPROM.put(EEPROM_ADDRESS_START, adreseEEPROMSenzori);
        setup();
      }


      break;
    }
  }




  /*
    \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
    /////////////////////////////\
    //////Touchscreen mutare/////\
    ////////intre grafice////////\
    /////////////////////////////\
    \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
  */




  switch (y) {
    case 0:
      {
        break;
      }
    case 1:
      {
        ///stg
        if (p.z > tou.pressureThreshhold) {
          if (p.x > 840 && p.x < 950 && p.y > 750 && p.y < 900) {
            if (y == 1)
              y = 11;
            else
              y--;
            setup();
          }
        }
        ///dr
        if (p.z > tou.pressureThreshhold) {
          if (p.x > 100 && p.x < 220 && p.y > 750 && p.y < 900) {
            if (y == 11)
              y = 1;
            else
              y++;
            setup();
          }
        }
        ///home
        if (p.z > tou.pressureThreshhold) {
          if (p.x > 820 && p.x < 950 && p.y > 130 && p.y < 260) {
            y = 0;
            ok = 3;
            setup();
          }
        }

        break;
      }
    case 2:
      {
        ///stg
        if (p.z > tou.pressureThreshhold) {
          if (p.x > 840 && p.x < 950 && p.y > 750 && p.y < 900) {
            if (y == 1)
              y = 11;
            else
              y--;
            setup();
          }
        }
        ///dr
        if (p.z > tou.pressureThreshhold) {
          if (p.x > 100 && p.x < 220 && p.y > 750 && p.y < 900) {
            if (y == 11)
              y = 1;
            else
              y++;
            setup();
          }
        }
        ///home
        if (p.z > tou.pressureThreshhold) {
          if (p.x > 820 && p.x < 950 && p.y > 130 && p.y < 260) {
            y = 0;
            ok = 3;
            setup();
          }
        }

        break;
      }
    case 3:
      {
        ///stg
        if (p.z > tou.pressureThreshhold) {
          if (p.x > 840 && p.x < 950 && p.y > 750 && p.y < 900) {
            if (y == 1)
              y = 11;
            else
              y--;
            setup();
          }
        }
        ///dr
        if (p.z > tou.pressureThreshhold) {
          if (p.x > 100 && p.x < 220 && p.y > 750 && p.y < 900) {
            if (y == 11)
              y = 1;
            else
              y++;
            setup();
          }
        }
        ///home
        if (p.z > tou.pressureThreshhold) {
          if (p.x > 820 && p.x < 950 && p.y > 130 && p.y < 260) {
            y = 0;
            ok = 3;
            setup();
          }
        }

        break;
      }
    case 4:
      {
        ///stg
        if (p.z > tou.pressureThreshhold) {
          if (p.x > 840 && p.x < 950 && p.y > 750 && p.y < 900) {
            if (y == 1)
              y = 11;
            else
              y--;
            setup();
          }
        }
        ///dr
        if (p.z > tou.pressureThreshhold) {
          if (p.x > 100 && p.x < 220 && p.y > 750 && p.y < 900) {
            if (y == 11)
              y = 1;
            else
              y++;
            setup();
          }
        }
        ///home
        if (p.z > tou.pressureThreshhold) {
          if (p.x > 820 && p.x < 950 && p.y > 130 && p.y < 260) {
            y = 0;
            ok = 4;
            setup();
          }
        }

        break;
      }
    case 5:
      {
        ///stg
        if (p.z > tou.pressureThreshhold) {
          if (p.x > 840 && p.x < 950 && p.y > 750 && p.y < 900) {
            if (y == 1)
              y = 11;
            else
              y--;
            setup();
          }
        }
        ///dr
        if (p.z > tou.pressureThreshhold) {
          if (p.x > 100 && p.x < 220 && p.y > 750 && p.y < 900) {
            if (y == 11)
              y = 1;
            else
              y++;
            setup();
          }
        }
        ///home
        if (p.z > tou.pressureThreshhold) {
          if (p.x > 820 && p.x < 950 && p.y > 130 && p.y < 260) {
            y = 0;
            ok = 4;
            setup();
          }
        }

        break;
      }
    case 6:
      {
        ///stg
        if (p.z > tou.pressureThreshhold) {
          if (p.x > 840 && p.x < 950 && p.y > 750 && p.y < 900) {
            if (y == 1)
              y = 11;
            else
              y--;
            setup();
          }
        }
        ///dr
        if (p.z > tou.pressureThreshhold) {
          if (p.x > 100 && p.x < 220 && p.y > 750 && p.y < 900) {
            if (y == 11)
              y = 1;
            else
              y++;
            setup();
          }
        }
        ///home
        if (p.z > tou.pressureThreshhold) {
          if (p.x > 820 && p.x < 950 && p.y > 130 && p.y < 260) {
            y = 0;
            ok = 4;
            setup();
          }
        }

        break;
      }
    case 7:
      {
        ///stg
        if (p.z > tou.pressureThreshhold) {
          if (p.x > 840 && p.x < 950 && p.y > 750 && p.y < 900) {
            if (y == 1)
              y = 11;
            else
              y--;
            setup();
          }
        }
        ///dr
        if (p.z > tou.pressureThreshhold) {
          if (p.x > 100 && p.x < 220 && p.y > 750 && p.y < 900) {
            if (y == 11)
              y = 1;
            else
              y++;
            setup();
          }
        }
        ///home
        if (p.z > tou.pressureThreshhold) {
          if (p.x > 820 && p.x < 950 && p.y > 130 && p.y < 260) {
            y = 0;
            ok = 5;
            setup();
          }
        }

        break;
      }
    case 8:
      {
        ///stg
        if (p.z > tou.pressureThreshhold) {
          if (p.x > 840 && p.x < 950 && p.y > 750 && p.y < 900) {
            if (y == 1)
              y = 11;
            else
              y--;
            setup();
          }
        }
        ///dr
        if (p.z > tou.pressureThreshhold) {
          if (p.x > 100 && p.x < 220 && p.y > 750 && p.y < 900) {
            if (y == 11)
              y = 1;
            else
              y++;
            setup();
          }
        }
        ///home
        if (p.z > tou.pressureThreshhold) {
          if (p.x > 820 && p.x < 950 && p.y > 130 && p.y < 260) {
            y = 0;
            ok = 5;
            setup();
          }
        }

        break;
      }
    case 9:
      {
        ///stg
        if (p.z > tou.pressureThreshhold) {
          if (p.x > 840 && p.x < 950 && p.y > 750 && p.y < 900) {
            if (y == 1)
              y = 11;
            else
              y--;
            setup();
          }
        }
        ///dr
        if (p.z > tou.pressureThreshhold) {
          if (p.x > 100 && p.x < 220 && p.y > 750 && p.y < 900) {
            if (y == 11)
              y = 1;
            else
              y++;
            setup();
          }
        }
        ///home
        if (p.z > tou.pressureThreshhold) {
          if (p.x > 820 && p.x < 950 && p.y > 130 && p.y < 260) {
            y = 0;
            ok = 5;
            setup();
          }
        }
        break;
      }

    ////aici pun codul reprezentativ elementelor de pe pagina 6
    case 10:
      {
        ///stg
        if (p.z > tou.pressureThreshhold) {
          if (p.x > 840 && p.x < 950 && p.y > 750 && p.y < 900) {
            if (y == 1)
              y = 14;
            else
              y--;
            setup();
          }
        }
        ///dr
        if (p.z > tou.pressureThreshhold) {
          if (p.x > 100 && p.x < 220 && p.y > 750 && p.y < 900) {
            if (y == 14)
              y = 1;
            else
              y++;
            setup();
          }
        }
        ///home
        if (p.z > tou.pressureThreshhold) {
          if (p.x > 820 && p.x < 950 && p.y > 130 && p.y < 260) {
            y = 0;
            ok = 6;
            setup();
          }
        }
        break;
      }
    case 11:
      {
        ///stg
        if (p.z > tou.pressureThreshhold) {
          if (p.x > 840 && p.x < 950 && p.y > 750 && p.y < 900) {
            if (y == 1)
              y = 14;
            else
              y--;
            setup();
          }
        }
        ///dr
        if (p.z > tou.pressureThreshhold) {
          if (p.x > 100 && p.x < 220 && p.y > 750 && p.y < 900) {
            if (y == 14)
              y = 1;
            else
              y++;
            setup();
          }
        }
        ///home
        if (p.z > tou.pressureThreshhold) {
          if (p.x > 820 && p.x < 950 && p.y > 130 && p.y < 260) {
            y = 0;
            ok = 6;
            setup();
          }
        }
        break;
      }
    case 12:
      {
        ///stg
        if (p.z > tou.pressureThreshhold) {
          if (p.x > 840 && p.x < 950 && p.y > 750 && p.y < 900) {
            if (y == 1)
              y = 14;
            else
              y--;
            setup();
          }
        }
        ///dr
        if (p.z > tou.pressureThreshhold) {
          if (p.x > 100 && p.x < 220 && p.y > 750 && p.y < 900) {
            if (y == 14)
              y = 1;
            else
              y++;
            setup();
          }
        }
        ///home
        if (p.z > tou.pressureThreshhold) {
          if (p.x > 820 && p.x < 950 && p.y > 130 && p.y < 260) {
            y = 0;
            ok = 6;
            setup();
          }
        }
        break;
      }
    case 13:
      {
        ///stg
        if (p.z > tou.pressureThreshhold) {
          if (p.x > 840 && p.x < 950 && p.y > 750 && p.y < 900) {
            if (y == 1)
              y = 14;
            else
              y--;
            setup();
          }
        }
        ///dr
        if (p.z > tou.pressureThreshhold) {
          if (p.x > 100 && p.x < 220 && p.y > 750 && p.y < 900) {
            if (y == 14)
              y = 1;
            else
              y++;
            setup();
          }
        }
        ///home
        if (p.z > tou.pressureThreshhold) {
          if (p.x > 820 && p.x < 950 && p.y > 130 && p.y < 260) {
            y = 0;
            ok = 7;
            setup();
          }
        }
        break;
      }
    case 14:
      {
        ///stg
        if (p.z > tou.pressureThreshhold) {
          if (p.x > 840 && p.x < 950 && p.y > 750 && p.y < 900) {
            if (y == 1)
              y = 14;
            else
              y--;
            setup();
          }
        }
        ///dr
        if (p.z > tou.pressureThreshhold) {
          if (p.x > 100 && p.x < 220 && p.y > 750 && p.y < 900) {
            if (y == 14)
              y = 1;
            else
              y++;
            setup();
          }
        }
        ///home
        if (p.z > tou.pressureThreshhold) {
          if (p.x > 820 && p.x < 950 && p.y > 130 && p.y < 260) {
            y = 0;
            ok = 7;
            setup();
          }
        }
        break;
      }
  }
}




/*
  \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
  ////////////////////////////////\
  ///CITIRE DATE DE PE SENZORI////\
  ////////////////////////////////\
  \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
*/

///////////
///////////
//Daca nu merge si se da refresh la ecran. Una din valori returneaza ceva invalid => trebuie schimbat senzorul, sau verificat. De data asta e TVOC ul si il pun pe 0 unde afisez functia

int TVO() {
  if (ccs.available())
    if (!ccs.readData()) {
      return ccs.getTVOC() + adreseEEPROMSenzori.val_TVOC;
    } else {
      Serial.println("ERROR_TVOC!");
      return 0;
      //      while (1);
    }
}

int temperature() {

  return ((bme.readTemperature() - 2) + adreseEEPROMSenzori.val_Temp);
}

int presure() {

  return ((bme.readPressure() / 100.0F) + adreseEEPROMSenzori.val_Pres);
}

int humidity() {

  return ((bme.readHumidity()) + adreseEEPROMSenzori.val_Hum);
}

int CO22() {
  ser_co2.listen();

  ser_co2.write(hexdata, 9);

  ///if(ser_co2.isListening())
  for (int i = 0; i < 9; i++) {
    if (ser_co2.available() > 0) {
      long hi, lo, CO2 = 0;
      int ch = ser_co2.read();

      if (i == 2) {
        hi = ch;  //High concentration
      }
      if (i == 3) {
        lo = ch;  //Low concentration
      }
      if (i == 8) {
        CO2 = hi * 256 + lo;  //CO2 concentration
        ///Serial.println(CO2);
        return (CO2 + adreseEEPROMSenzori.val_CO2);
      }
    }
  }
}

void Sds() {

  Serial1.write(hexdata, 9);
  for (int i = 0; i <= 9; i++) {
    if (Serial1.available() > 0) {
      long hi1, lo1, PM2;
      long hi2, lo2, PM10;
      int che = Serial1.read();

      if (i == 3) {
        hi1 = che;  //High concentration
      }
      if (i == 2) {
        lo1 = che;  //Low concentration
      }

      if (i == 5) {
        hi2 = che;  //High concentration
      }
      if (i == 4) {
        lo2 = che;  //Low concentration
      }

      if (i == 8) {
        pm2 = ((hi1 * 256 + lo1) / 10 + adreseEEPROMSenzori.val_PMP2_5);
        pm10 = ((hi2 * 256 + lo2) / 10 + adreseEEPROMSenzori.val_PMP10);
      }
    }
  }
}

int COo() {

  return ((max_analog_steps * max_volts / analogRead(A8)) + adreseEEPROMSenzori.val_CO);
}

int NH333() {

  return ((max_analog_steps * max_volts / analogRead(A9)) + adreseEEPROMSenzori.val_NH3);
}

int NO222() {

  return (((max_analog_steps * max_volts / analogRead(A10)) / 10) + adreseEEPROMSenzori.val_NO2);
}

int decibelotmetru() {
  int soundValue = analogRead(A15);
  // Serial.print("Valoare sunet: ");
  soundValue = map(soundValue, 0, 1023, 0, 140);
  if (soundValue > 140)
    soundValue = 140;
  return (soundValue + adreseEEPROMSenzori.val_Fonic);
}

int H() {
  return ((analogRead(A14) / 10 ) + adreseEEPROMSenzori.val_H);
}

int O3() {
  float sensorValue = analogRead(sensorPin);
  float voltage = sensorValue * (5.0 / 1023.0);
  float Rs = calculateRs(voltage);
  float ratio = Rs / R0;
  int ppm = (int)calculatePPM(ratio);

  return (ppm / 1000 + adreseEEPROMSenzori.val_O3);
}

// Funcție pentru calcularea R_s
float calculateRs(float voltage) {
  return ((5.0 - voltage) * R_L) / voltage;
}

// Funcție pentru calcularea ppm pe baza relației logaritmice
float calculatePPM(float ratio) {
  // Parametrii m și b pentru curba de calibrare a ozonului (din datasheet)
  float m = -0.38;  // Panta
  float b = 1.5;    // Interceptul
  return pow(10, (log10(ratio) - b) / m);
}

int MAG() {
  sensors_event_t event;
  mag.getEvent(&event);

  // Valorile câmpului magnetic pe axe
  float Bx = event.magnetic.x;
  float By = event.magnetic.y;
  float Bz = event.magnetic.z;

  // Calcul magnitudine câmp magnetic total
  int B_total = (int)sqrt(Bx * Bx + By * By + Bz * Bz);

  return (B_total + adreseEEPROMSenzori.val_Mag);
}

/*
  \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
  /////////////////////////////\
  //////Afisare parametri//////\
  //////////grafic/////////////\
  /////////////////////////////\
  \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
*/


int e2 = 0;
void graphTVOC(int TVOC_VAL) {
  float e = 0;
  e = TVOC_VAL;  //TVO();

  float TVOC = 0;
  if (e >= 0) {
    if (e <= 250)
      TVOC = e;
    else
      TVOC = 250;
    Serial.println(e);
  }



  timeBlockTVOC[valuePosTVOC] = e2;
  e2 = e2 + 1;

  valueBlockTVOC[valuePosTVOC] = TVOC;


  ///Serial.println(timeBlockTVOC[valuePosTVOC]);


  if (blockPosTVOC < 8) {
    // print the time
    tft.setCursor((mark[valuePosTVOC] - 5), (originY + 16));
    tft.setTextColor(graphColor, WHITE);
    tft.setTextSize(1);
    tft.println(timeBlockTVOC[valuePosTVOC]);

    // map the value
    locationBlockTVOC[valuePosTVOC] = map(TVOC, 0, graphRangeTVOC, originY, (originY - sizeY));

    // draw point
    tft.fillRect((mark[valuePosTVOC] - 1), (locationBlockTVOC[valuePosTVOC] - 1), markSizeTVOC, markSizeTVOC, pointColor);

    // try connecting to previous point
    if (valuePosTVOC != 0) {
      tft.drawLine(mark[valuePosTVOC], locationBlockTVOC[valuePosTVOC], mark[(valuePosTVOC - 1)], locationBlockTVOC[(valuePosTVOC - 1)], lineColor);
    }

    blockPosTVOC++;
  } else {
    // clear the graph's canvas
    tft.fillRect((originX + 2), (originY - sizeY), sizeX, sizeY, WHITE);

    // map the value - current point
    locationBlockTVOC[valuePosTVOC] = map(TVOC, 0, graphRangeTVOC, originY, (originY - sizeY));

    // draw point - current point
    tft.fillRect((mark[7]), (locationBlockTVOC[valuePosTVOC] - 1), markSizeTVOC, markSizeTVOC, pointColor);

    // draw all points
    for (int i = 0; i < 8; i++) {
      tft.fillRect((mark[(blockPosTVOC - (i + 1))] - 1), (locationBlockTVOC[(valuePosTVOC - i)] - 1), markSizeTVOC, markSizeTVOC, pointColor);
    }

    // draw all the lines
    for (int i = 0; i < 7; i++) {
      tft.drawLine(mark[blockPosTVOC - (i + 1)], locationBlockTVOC[valuePosTVOC - i], mark[blockPosTVOC - (i + 2)], locationBlockTVOC[valuePosTVOC - (i + 1)], lineColor);
    }

    // change time lables
    for (int i = 0; i <= 7; i++) {
      tft.setCursor((mark[(7 - i)] - 5), (originY + 16));
      tft.setTextColor(graphColor, WHITE);
      tft.setTextSize(1);
      tft.println(timeBlockTVOC[valuePosTVOC - i]);
    }
  }

  valuePosTVOC++;

  if (valuePosTVOC == 49 || blockPosTVOC == 49) {
    for (int i = 0; i <= 50; i++) {
      locationBlockTVOC[i] = 0;
      valueBlockTVOC[i] = 0;
    }
    valuePosTVOC = 0;
    blockPosTVOC = 0;
  }
  if (e2 > 1000)
    e2 = 0;


  delay(delay_afi_y);
}



int e1 = 0;
void graphtemp(int TMP_VAL) {
  if (TMP_VAL <= 42)
    temp = TMP_VAL;
  else
    temp = 42;


  Serial.println(temp);
  timeBlocktemp[valuePostemp] = e1;
  e1 = e1 + 1;

  valueBlocktemp[valuePostemp] = temp;


  if (blockPostemp < 8) {
    // print the time
    tft.setCursor((mark[valuePostemp] - 5), (originY + 16));
    tft.setTextColor(graphColor, WHITE);
    tft.setTextSize(1);
    tft.println(timeBlocktemp[valuePostemp]);

    // map the value
    locationBlocktemp[valuePostemp] = map(temp, 0, graphRangetemp, originY, (originY - sizeY));

    // draw point
    tft.fillRect((mark[valuePostemp] - 1), (locationBlocktemp[valuePostemp] - 1), markSizetemp, markSizetemp, pointColor);

    // try connecting to previous point
    if (valuePostemp != 0) {
      tft.drawLine(mark[valuePostemp], locationBlocktemp[valuePostemp], mark[(valuePostemp - 1)], locationBlocktemp[(valuePostemp - 1)], lineColor);
    }

    blockPostemp++;
  } else {
    // clear the graph's canvas
    tft.fillRect((originX + 2), (originY - sizeY), sizeX, sizeY, WHITE);

    // map the value - current point
    locationBlocktemp[valuePostemp] = map(temp, 0, graphRangetemp, originY, (originY - sizeY));

    // draw point - current point
    tft.fillRect((mark[7]), (locationBlocktemp[valuePostemp] - 1), markSizetemp, markSizetemp, pointColor);

    // draw all points
    for (int i = 0; i < 8; i++) {
      tft.fillRect((mark[(blockPostemp - (i + 1))] - 1), (locationBlocktemp[(valuePostemp - i)] - 1), markSizetemp, markSizetemp, pointColor);
    }

    // draw all the lines
    for (int i = 0; i < 7; i++) {
      tft.drawLine(mark[blockPostemp - (i + 1)], locationBlocktemp[valuePostemp - i], mark[blockPostemp - (i + 2)], locationBlocktemp[valuePostemp - (i + 1)], lineColor);
    }

    // change time lables
    for (int i = 0; i <= 7; i++) {
      tft.setCursor((mark[(7 - i)] - 5), (originY + 16));
      tft.setTextColor(graphColor, WHITE);
      tft.setTextSize(1);
      tft.println(timeBlocktemp[valuePostemp - i]);
    }
  }

  valuePostemp++;

  if (valuePostemp == 49 || blockPostemp == 49) {
    for (int i = 0; i <= 50; i++) {
      locationBlocktemp[i] = 0;
      valueBlocktemp[i] = 0;
    }
    valuePostemp = 0;
    blockPostemp = 0;
  }
  if (e1 > 1000)
    e1 = 0;


  delay(delay_afi_y);
}



int e = 0;
void graphHUM(int HUM_VAL) {
  if (HUM_VAL <= 100)
    HUM = HUM_VAL;
  else
    HUM = 100;


  Serial.println(HUM);
  timeBlockHUM[valuePosHUM] = e;
  e = e + 1;

  valueBlockHUM[valuePosHUM] = HUM;



  if (blockPosHUM < 8) {
    // print the time
    tft.setCursor((mark[valuePosHUM] - 5), (originY + 16));
    tft.setTextColor(graphColor, WHITE);
    tft.setTextSize(1);
    tft.println(timeBlockHUM[valuePosHUM]);

    // map the value
    locationBlockHUM[valuePosHUM] = map(HUM, 0, graphRangeHUM, originY, (originY - sizeY));

    // draw point
    tft.fillRect((mark[valuePosHUM] - 1), (locationBlockHUM[valuePosHUM] - 1), markSizeHUM, markSizeHUM, pointColor);

    // try connecting to previous point
    if (valuePosHUM != 0) {
      tft.drawLine(mark[valuePosHUM], locationBlockHUM[valuePosHUM], mark[(valuePosHUM - 1)], locationBlockHUM[(valuePosHUM - 1)], lineColor);
    }

    blockPosHUM++;
  } else {
    // clear the graph's canvas
    tft.fillRect((originX + 2), (originY - sizeY), sizeX, sizeY, WHITE);

    // map the value - current point
    locationBlockHUM[valuePosHUM] = map(HUM, 0, graphRangeHUM, originY, (originY - sizeY));

    // draw point - current point
    tft.fillRect((mark[7]), (locationBlockHUM[valuePosHUM] - 1), markSizeHUM, markSizeHUM, pointColor);

    // draw all points
    for (int i = 0; i < 8; i++) {
      tft.fillRect((mark[(blockPosHUM - (i + 1))] - 1), (locationBlockHUM[(valuePosHUM - i)] - 1), markSizeHUM, markSizeHUM, pointColor);
    }

    // draw all the lines
    for (int i = 0; i < 7; i++) {
      tft.drawLine(mark[blockPosHUM - (i + 1)], locationBlockHUM[valuePosHUM - i], mark[blockPosHUM - (i + 2)], locationBlockHUM[valuePosHUM - (i + 1)], lineColor);
    }

    // change time lables
    for (int i = 0; i <= 7; i++) {
      tft.setCursor((mark[(7 - i)] - 5), (originY + 16));
      tft.setTextColor(graphColor, WHITE);
      tft.setTextSize(1);
      tft.println(timeBlockHUM[valuePosHUM - i]);
    }
  }

  valuePosHUM++;

  if (valuePosHUM == 49 || blockPosHUM == 49) {
    for (int i = 0; i <= 50; i++) {
      locationBlockHUM[i] = 0;
      valueBlockHUM[i] = 0;
    }
    valuePosHUM = 0;
    blockPosHUM = 0;
  }
  if (e > 1000)
    e = 0;

  delay(delay_afi_y);
}


int e3 = 0;
void graphPRESU(int PRES_VAL) {
  if (PRES_VAL <= 6000)
    PRESU = PRES_VAL;
  else
    PRESU = 6000;


  Serial.println(PRESU);
  timeBlockPRESU[valuePosPRESU] = e3;
  e3 = e3 + 1;

  valueBlockPRESU[valuePosPRESU] = PRESU;



  if (blockPosPRESU < 8) {
    // print the time
    tft.setCursor((mark[valuePosPRESU] - 5), (originY + 16));
    tft.setTextColor(graphColor, WHITE);
    tft.setTextSize(1);
    tft.println(timeBlockPRESU[valuePosPRESU]);

    // map the value
    locationBlockPRESU[valuePosPRESU] = map(PRESU, 0, graphRangePRESU, originY, (originY - sizeY));

    // draw point
    tft.fillRect((mark[valuePosPRESU] - 1), (locationBlockPRESU[valuePosPRESU] - 1), markSizePRESU, markSizePRESU, pointColor);

    // try connecting to previous point
    if (valuePosPRESU != 0) {
      tft.drawLine(mark[valuePosPRESU], locationBlockPRESU[valuePosPRESU], mark[(valuePosPRESU - 1)], locationBlockPRESU[(valuePosPRESU - 1)], lineColor);
    }

    blockPosPRESU++;
  } else {
    // clear the graph's canvas
    tft.fillRect((originX + 2), (originY - sizeY), sizeX, sizeY, WHITE);

    // map the value - current point
    locationBlockPRESU[valuePosPRESU] = map(PRESU, 0, graphRangePRESU, originY, (originY - sizeY));

    // draw point - current point
    tft.fillRect((mark[7]), (locationBlockPRESU[valuePosPRESU] - 1), markSizePRESU, markSizePRESU, pointColor);

    // draw all points
    for (int i = 0; i < 8; i++) {
      tft.fillRect((mark[(blockPosPRESU - (i + 1))] - 1), (locationBlockPRESU[(valuePosPRESU - i)] - 1), markSizePRESU, markSizePRESU, pointColor);
    }

    // draw all the lines
    for (int i = 0; i < 7; i++) {
      tft.drawLine(mark[blockPosPRESU - (i + 1)], locationBlockPRESU[valuePosPRESU - i], mark[blockPosPRESU - (i + 2)], locationBlockPRESU[valuePosPRESU - (i + 1)], lineColor);
    }

    // change time lables
    for (int i = 0; i <= 7; i++) {
      tft.setCursor((mark[(7 - i)] - 5), (originY + 16));
      tft.setTextColor(graphColor, WHITE);
      tft.setTextSize(1);
      tft.println(timeBlockPRESU[valuePosPRESU - i]);
    }
  }

  valuePosPRESU++;

  if (valuePosPRESU == 49 || blockPosPRESU == 49) {
    for (int i = 0; i <= 50; i++) {
      locationBlockPRESU[i] = 0;
      valueBlockPRESU[i] = 0;
    }
    valuePosPRESU = 0;
    blockPosPRESU = 0;
  }
  if (e3 > 1000)
    e3 = 0;


  delay(delay_afi_y);
}



int e6 = 0;
void graphCO2(int CO2_VAL) {
  int CO2 = 0;
  if (CO2_VAL < 10000)
    CO2 = CO2_VAL;
  else
    CO2 = 9990;


  Serial.println(CO2);

  timeBlockCO2[valuePosCO2] = e6;
  e6 = e6 + 1;

  valueBlockCO2[valuePosCO2] = CO2;


  if (blockPosCO2 < 8) {
    // print the time
    tft.setCursor((mark[valuePosCO2] - 5), (originY + 16));
    tft.setTextColor(graphColor, WHITE);
    tft.setTextSize(1);
    tft.println(timeBlockCO2[valuePosCO2]);

    // map the value
    locationBlockCO2[valuePosCO2] = map(CO2, 0, graphRangeCO2, originY, (originY - sizeY));

    // draw point
    tft.fillRect((mark[valuePosCO2] - 1), (locationBlockCO2[valuePosCO2] - 1), markSizeCO2, markSizeCO2, pointColor);

    // try connecting to previous point
    if (valuePosCO2 != 0) {
      tft.drawLine(mark[valuePosCO2], locationBlockCO2[valuePosCO2], mark[(valuePosCO2 - 1)], locationBlockCO2[(valuePosCO2 - 1)], lineColor);
    }

    blockPosCO2++;
  } else {
    // clear the graph's canvas
    tft.fillRect((originX + 2), (originY - sizeY), sizeX, sizeY, WHITE);

    // map the value - current point
    locationBlockCO2[valuePosCO2] = map(CO2, 0, graphRangeCO2, originY, (originY - sizeY));

    // draw point - current point
    tft.fillRect((mark[7]), (locationBlockCO2[valuePosCO2] - 1), markSizeCO2, markSizeCO2, pointColor);

    // draw all points
    for (int i = 0; i < 8; i++) {
      tft.fillRect((mark[(blockPosCO2 - (i + 1))] - 1), (locationBlockCO2[(valuePosCO2 - i)] - 1), markSizeCO2, markSizeCO2, pointColor);
    }

    // draw all the lines
    for (int i = 0; i < 7; i++) {
      tft.drawLine(mark[blockPosCO2 - (i + 1)], locationBlockCO2[valuePosCO2 - i], mark[blockPosCO2 - (i + 2)], locationBlockCO2[valuePosCO2 - (i + 1)], lineColor);
    }

    // change time lables
    for (int i = 0; i <= 7; i++) {
      tft.setCursor((mark[(7 - i)] - 5), (originY + 16));
      tft.setTextColor(graphColor, WHITE);
      tft.setTextSize(1);
      tft.println(timeBlockCO2[valuePosCO2 - i]);
    }
  }

  valuePosCO2++;


  if (valuePosCO2 == 49 || blockPosCO2 == 49) {
    for (int i = 0; i <= 50; i++) {
      locationBlockCO2[i] = 0;
      valueBlockCO2[i] = 0;
    }
    valuePosCO2 = 0;
    blockPosCO2 = 0;
  }
  if (e6 > 1000)
    e6 = 0;


  delay(delay_afi_y);
}


int e7 = 0;
void graphNO2(int NO_VAL) {

  if (NO_VAL <= 10)
    NO22 = NO_VAL;
  else
    NO22 = 10;


  Serial.println(NO22);
  timeBlockNO22[valuePosNO22] = e7;
  e7 = e7 + 1;

  valueBlockNO22[valuePosNO22] = NO22;


  if (blockPosNO22 < 8) {
    // print the time
    tft.setCursor((mark[valuePosNO22] - 5), (originY + 16));
    tft.setTextColor(graphColor, WHITE);
    tft.setTextSize(1);
    tft.println(timeBlockNO22[valuePosNO22]);

    // map the value
    locationBlockNO22[valuePosNO22] = map(NO22, 0, graphRangeNO22, originY, (originY - sizeY));

    // draw point
    tft.fillRect((mark[valuePosNO22] - 1), (locationBlockNO22[valuePosNO22] - 1), markSizeNO22, markSizeNO22, pointColor);

    // try connecting to previous point
    if (valuePosNO22 != 0) {
      tft.drawLine(mark[valuePosNO22], locationBlockNO22[valuePosNO22], mark[(valuePosNO22 - 1)], locationBlockNO22[(valuePosNO22 - 1)], lineColor);
    }

    blockPosNO22++;
  } else {
    // clear the graph's canvas
    tft.fillRect((originX + 2), (originY - sizeY), sizeX, sizeY, WHITE);

    // map the value - current point
    locationBlockNO22[valuePosNO22] = map(NO22, 0, graphRangeNO22, originY, (originY - sizeY));

    // draw point - current point
    tft.fillRect((mark[7]), (locationBlockNO22[valuePosNO22] - 1), markSizeNO22, markSizeNO22, pointColor);

    // draw all points
    for (int i = 0; i < 8; i++) {
      tft.fillRect((mark[(blockPosNO22 - (i + 1))] - 1), (locationBlockNO22[(valuePosNO22 - i)] - 1), markSizeNO22, markSizeNO22, pointColor);
    }

    // draw all the lines
    for (int i = 0; i < 7; i++) {
      tft.drawLine(mark[blockPosNO22 - (i + 1)], locationBlockNO22[valuePosNO22 - i], mark[blockPosNO22 - (i + 2)], locationBlockNO22[valuePosNO22 - (i + 1)], lineColor);
    }

    // change time lables
    for (int i = 0; i <= 7; i++) {
      tft.setCursor((mark[(7 - i)] - 5), (originY + 16));
      tft.setTextColor(graphColor, WHITE);
      tft.setTextSize(1);
      tft.println(timeBlockNO22[valuePosNO22 - i]);
    }
  }

  valuePosNO22++;


  if (valuePosNO22 == 49 || blockPosNO22 == 49) {
    for (int i = 0; i <= 50; i++) {
      locationBlockNO22[i] = 0;
      valueBlockNO22[i] = 0;
    }
    valuePosNO22 = 0;
    blockPosNO22 = 0;
  }
  if (e7 > 1000)
    e7 = 0;

  delay(delay_afi_y);
}


int e8 = 0;
void graphNH3(int NH3_VAL) {

  if (NH3_VAL <= 5000)
    NH33 = NH3_VAL;
  else
    NH33 = 5000;


  Serial.println(NH33);
  timeBlockNH33[valuePosNH33] = e8;
  e8 = e8 + 1;

  valueBlockNH33[valuePosNH33] = NH33;


  if (blockPosNH33 < 8) {
    // print the time
    tft.setCursor((mark[valuePosNH33] - 5), (originY + 16));
    tft.setTextColor(graphColor, WHITE);
    tft.setTextSize(1);
    tft.println(timeBlockNH33[valuePosNH33]);

    // map the value
    locationBlockNH33[valuePosNH33] = map(NH33, 0, graphRangeNH33, originY, (originY - sizeY));

    // draw point
    tft.fillRect((mark[valuePosNH33] - 1), (locationBlockNH33[valuePosNH33] - 1), markSizeNH33, markSizeNH33, pointColor);

    // try connecting to previous point
    if (valuePosNH33 != 0) {
      tft.drawLine(mark[valuePosNH33], locationBlockNH33[valuePosNH33], mark[(valuePosNH33 - 1)], locationBlockNH33[(valuePosNH33 - 1)], lineColor);
    }

    blockPosNH33++;
  } else {
    // clear the graph's canvas
    tft.fillRect((originX + 2), (originY - sizeY), sizeX, sizeY, WHITE);

    // map the value - current point
    locationBlockNH33[valuePosNH33] = map(NH33, 0, graphRangeNH33, originY, (originY - sizeY));

    // draw point - current point
    tft.fillRect((mark[7]), (locationBlockNH33[valuePosNH33] - 1), markSizeNH33, markSizeNH33, pointColor);

    // draw all points
    for (int i = 0; i < 8; i++) {
      tft.fillRect((mark[(blockPosNH33 - (i + 1))] - 1), (locationBlockNH33[(valuePosNH33 - i)] - 1), markSizeNH33, markSizeNH33, pointColor);
    }

    // draw all the lines
    for (int i = 0; i < 7; i++) {
      tft.drawLine(mark[blockPosNH33 - (i + 1)], locationBlockNH33[valuePosNH33 - i], mark[blockPosNH33 - (i + 2)], locationBlockNH33[valuePosNH33 - (i + 1)], lineColor);
    }

    // change time lables
    for (int i = 0; i <= 7; i++) {
      tft.setCursor((mark[(7 - i)] - 5), (originY + 16));
      tft.setTextColor(graphColor, WHITE);
      tft.setTextSize(1);
      tft.println(timeBlockNH33[valuePosNH33 - i]);
    }
  }

  valuePosNH33++;

  if (valuePosNH33 == 49 || blockPosNH33 == 49) {
    for (int i = 0; i <= 50; i++) {
      locationBlockNH33[i] = 0;
      valueBlockNH33[i] = 0;
    }
    valuePosNH33 = 0;
    blockPosNH33 = 0;
  }
  if (e8 > 1000)
    e8 = 0;

  delay(delay_afi_y);
}


int e9 = 0;
void graphCO(int CO_VAL) {
  if (CO_VAL <= 1000)
    COc = CO_VAL;
  else
    COc = 1000;

  Serial.println(COc);
  timeBlockCO[valuePosCO] = e9;
  e9 = e9 + 1;

  valueBlockCO[valuePosCO] = COc;


  if (blockPosCO < 8) {
    // print the time
    tft.setCursor((mark[valuePosCO] - 5), (originY + 16));
    tft.setTextColor(graphColor, WHITE);
    tft.setTextSize(1);
    tft.println(timeBlockCO[valuePosCO]);

    // map the value
    locationBlockCO[valuePosCO] = map(COc, 0, graphRangeCO, originY, (originY - sizeY));

    // draw point
    tft.fillRect((mark[valuePosCO] - 1), (locationBlockCO[valuePosCO] - 1), markSizeCO, markSizeCO, pointColor);

    // try connecting to previous point
    if (valuePosCO != 0) {
      tft.drawLine(mark[valuePosCO], locationBlockCO[valuePosCO], mark[(valuePosCO - 1)], locationBlockCO[(valuePosCO - 1)], lineColor);
    }

    blockPosCO++;
  } else {
    // clear the graph's canvas
    tft.fillRect((originX + 2), (originY - sizeY), sizeX, sizeY, WHITE);

    // map the value - current point
    locationBlockCO[valuePosCO] = map(COc, 0, graphRangeCO, originY, (originY - sizeY));

    // draw point - current point
    tft.fillRect((mark[7]), (locationBlockCO[valuePosCO] - 1), markSizeCO, markSizeCO, pointColor);

    // draw all points
    for (int i = 0; i < 8; i++) {
      tft.fillRect((mark[(blockPosCO - (i + 1))] - 1), (locationBlockCO[(valuePosCO - i)] - 1), markSizeCO, markSizeCO, pointColor);
    }

    // draw all the lines
    for (int i = 0; i < 7; i++) {
      tft.drawLine(mark[blockPosCO - (i + 1)], locationBlockCO[valuePosCO - i], mark[blockPosCO - (i + 2)], locationBlockCO[valuePosCO - (i + 1)], lineColor);
    }

    // change time lables
    for (int i = 0; i <= 7; i++) {
      tft.setCursor((mark[(7 - i)] - 5), (originY + 16));
      tft.setTextColor(graphColor, WHITE);
      tft.setTextSize(1);
      tft.println(timeBlockCO[valuePosCO - i]);
    }
  }

  valuePosCO++;


  if (valuePosCO == 49 || blockPosCO == 49) {
    for (int i = 0; i <= 50; i++) {
      locationBlockCO[i] = 0;
      valueBlockCO[i] = 0;
    }
    valuePosCO = 0;
    blockPosCO = 0;
  }
  if (e9 > 1000)
    e9 = 0;


  delay(delay_afi_y);
}


int e10 = 0;
void graphPM25() {

  Sds();

  if (pm2 <= 10002)
    PM25 = pm2;
  else
    PM25 = 10002;

  Serial.println(PM25);
  timeBlockPM25[valuePosPM25] = e10;
  e10 = e10 + 1;

  valueBlockPM25[valuePosPM25] = PM25;


  if (blockPosPM25 < 8) {
    // print the time
    tft.setCursor((mark[valuePosPM25] - 5), (originY + 16));
    tft.setTextColor(graphColor, WHITE);
    tft.setTextSize(1);
    tft.println(timeBlockPM25[valuePosPM25]);

    // map the value
    locationBlockPM25[valuePosPM25] = map(PM25, 0, graphRangePM25, originY, (originY - sizeY));

    // draw point
    tft.fillRect((mark[valuePosPM25] - 1), (locationBlockPM25[valuePosPM25] - 1), markSizePM25, markSizePM25, pointColor);

    // try connecting to previous point
    if (valuePosPM25 != 0) {
      tft.drawLine(mark[valuePosPM25], locationBlockPM25[valuePosPM25], mark[(valuePosPM25 - 1)], locationBlockPM25[(valuePosPM25 - 1)], lineColor);
    }

    blockPosPM25++;
  } else {
    // clear the graph's canvas
    tft.fillRect((originX + 2), (originY - sizeY), sizeX, sizeY, WHITE);

    // map the value - current point
    locationBlockPM25[valuePosPM25] = map(PM25, 0, graphRangePM25, originY, (originY - sizeY));

    // draw point - current point
    tft.fillRect((mark[7]), (locationBlockPM25[valuePosPM25] - 1), markSizePM25, markSizePM25, pointColor);

    // draw all points
    for (int i = 0; i < 8; i++) {
      tft.fillRect((mark[(blockPosPM25 - (i + 1))] - 1), (locationBlockPM25[(valuePosPM25 - i)] - 1), markSizePM25, markSizePM25, pointColor);
    }

    // draw all the lines
    for (int i = 0; i < 7; i++) {
      tft.drawLine(mark[blockPosPM25 - (i + 1)], locationBlockPM25[valuePosPM25 - i], mark[blockPosPM25 - (i + 2)], locationBlockPM25[valuePosPM25 - (i + 1)], lineColor);
    }

    // change time lables
    for (int i = 0; i <= 7; i++) {
      tft.setCursor((mark[(7 - i)] - 5), (originY + 16));
      tft.setTextColor(graphColor, WHITE);
      tft.setTextSize(1);
      tft.println(timeBlockPM25[valuePosPM25 - i]);
    }
  }

  valuePosPM25++;

  if (valuePosPM25 == 49 || blockPosPM25 == 49) {
    for (int i = 0; i <= 50; i++) {
      locationBlockPM25[i] = 0;
      valueBlockPM25[i] = 0;
    }
    valuePosPM25 = 0;
    blockPosPM25 = 0;
  }
  if (e10 > 1000)
    e10 = 0;

  delay(delay_afi_y);
}


int e11 = 0;
void graphPM10() {
  Sds();
  if (pm10 <= 10002)
    PM10 = pm10;
  else
    PM10 = 10000;


  Serial.println(PM10);
  timeBlockPM10[valuePosPM10] = e11;
  e11 = e11 + 1;

  valueBlockPM10[valuePosPM10] = PM10;


  if (blockPosPM10 < 8) {
    // print the time
    tft.setCursor((mark[valuePosPM10] - 5), (originY + 16));
    tft.setTextColor(graphColor, WHITE);
    tft.setTextSize(1);
    tft.println(timeBlockPM10[valuePosPM10]);

    // map the value
    locationBlockPM10[valuePosPM10] = map(PM10, 0, graphRangePM10, originY, (originY - sizeY));

    // draw point
    tft.fillRect((mark[valuePosPM10] - 1), (locationBlockPM10[valuePosPM10] - 1), markSizePM10, markSizePM10, pointColor);

    // try connecting to previous point
    if (valuePosPM10 != 0) {
      tft.drawLine(mark[valuePosPM10], locationBlockPM10[valuePosPM10], mark[(valuePosPM10 - 1)], locationBlockPM10[(valuePosPM10 - 1)], lineColor);
    }

    blockPosPM10++;
  } else {

    // clear the graph's canvas
    tft.fillRect((originX + 2), (originY - sizeY), sizeX, sizeY, WHITE);

    // map the value - current point
    locationBlockPM10[valuePosPM10] = map(PM10, 0, graphRangePM10, originY, (originY - sizeY));

    // draw point - current point
    tft.fillRect((mark[7]), (locationBlockPM10[valuePosPM10] - 1), markSizePM10, markSizePM10, pointColor);

    // draw all points
    for (int i = 0; i < 8; i++) {
      tft.fillRect((mark[(blockPosPM10 - (i + 1))] - 1), (locationBlockPM10[(valuePosPM10 - i)] - 1), markSizePM10, markSizePM10, pointColor);
    }

    // draw all the lines
    for (int i = 0; i < 7; i++) {
      tft.drawLine(mark[blockPosPM10 - (i + 1)], locationBlockPM10[valuePosPM10 - i], mark[blockPosPM10 - (i + 2)], locationBlockPM10[valuePosPM10 - (i + 1)], lineColor);
    }

    // change time lables
    for (int i = 0; i <= 7; i++) {
      tft.setCursor((mark[(7 - i)] - 5), (originY + 16));
      tft.setTextColor(graphColor, WHITE);
      tft.setTextSize(1);
      tft.println(timeBlockPM10[valuePosPM10 - i]);
    }
  }

  valuePosPM10++;



  if (valuePosPM10 == 49 || blockPosPM10 == 49) {
    for (int i = 0; i <= 50; i++) {
      locationBlockPM10[i] = 0;
      valueBlockPM10[i] = 0;
    }
    valuePosPM10 = 0;
    blockPosPM10 = 0;
  }
  if (e11 > 1000)
    e11 = 0;


  delay(delay_afi_y);
}

int e12 = 0;  // Variabilă globală pentru gestionarea timpului
void graphMAG(int MAG_VAL) {
  // Limităm valoarea magnetismului la 1000
  MAGNET = (MAG_VAL <= 1000) ? MAG_VAL : 1000;

  Serial.println(MAGNET);  // Afișăm valoarea pe monitorul serial
  timeBlockMAG[valuePosMAG] = e12;
  e12++;

  valueBlockMAG[valuePosMAG] = MAGNET;

  if (blockPosMAG < 8) {
    // Afișăm timpul pentru punctul curent
    tft.setCursor((mark[valuePosMAG] - 5), (originY + 16));
    tft.setTextColor(graphColor, WHITE);
    tft.setTextSize(1);
    tft.println(timeBlockMAG[valuePosMAG]);

    // Mapăm valoarea magnetismului în coordonate grafice
    locationBlockMAG[valuePosMAG] = map(MAGNET, 0, graphRangeMAG, originY, (originY - sizeY));

    // Desenăm punctul curent pe grafic
    tft.fillRect((mark[valuePosMAG] - 1), (locationBlockMAG[valuePosMAG] - 1), markSizeMAG, markSizeMAG, pointColor);

    // Conectăm punctul curent cu cel anterior, dacă există
    if (valuePosMAG != 0) {
      tft.drawLine(mark[valuePosMAG], locationBlockMAG[valuePosMAG], mark[valuePosMAG - 1], locationBlockMAG[valuePosMAG - 1], lineColor);
    }

    blockPosMAG++;
  } else {
    // Curățăm canvasul graficului
    tft.fillRect((originX + 2), (originY - sizeY), sizeX, sizeY, WHITE);

    // Mapăm valoarea punctului curent
    locationBlockMAG[valuePosMAG] = map(MAGNET, 0, graphRangeMAG, originY, (originY - sizeY));

    // Desenăm punctul curent
    tft.fillRect((mark[7]), (locationBlockMAG[valuePosMAG] - 1), markSizeMAG, markSizeMAG, pointColor);

    // Desenăm toate punctele
    for (int i = 0; i < 8; i++) {
      tft.fillRect((mark[blockPosMAG - (i + 1)] - 1), (locationBlockMAG[valuePosMAG - i] - 1), markSizeMAG, markSizeMAG, pointColor);
    }

    // Desenăm toate liniile
    for (int i = 0; i < 7; i++) {
      tft.drawLine(mark[blockPosMAG - (i + 1)], locationBlockMAG[valuePosMAG - i], mark[blockPosMAG - (i + 2)], locationBlockMAG[valuePosMAG - (i + 1)], lineColor);
    }

    // Actualizăm etichetele de timp
    for (int i = 0; i <= 7; i++) {
      tft.setCursor((mark[7 - i] - 5), (originY + 16));
      tft.setTextColor(graphColor, WHITE);
      tft.setTextSize(1);
      tft.println(timeBlockMAG[valuePosMAG - i]);
    }
  }

  valuePosMAG++;

  if (valuePosMAG == 49 || blockPosMAG == 49) {
    for (int i = 0; i <= 50; i++) {
      locationBlockMAG[i] = 0;
      valueBlockMAG[i] = 0;
    }
    valuePosMAG = 0;
    blockPosMAG = 0;
  }

  if (e12 > 1000)
    e12 = 0;

  delay(delay_afi_y);
}


int e13 = 0;  // Variabilă globală pentru gestionarea timpului
void graphDB(int DB_VAL) {
  // Limităm valoarea decibelilor la 140
  DECIBEL = (DB_VAL <= 140) ? DB_VAL : 140;

  Serial.println(DECIBEL);  // Afișăm valoarea pe monitorul serial
  timeBlockDB[valuePosDB] = e13;
  e13++;

  valueBlockDB[valuePosDB] = DECIBEL;

  if (blockPosDB < 8) {
    // Afișăm timpul pentru punctul curent
    tft.setCursor((mark[valuePosDB] - 5), (originY + 16));
    tft.setTextColor(graphColor, WHITE);
    tft.setTextSize(1);
    tft.println(timeBlockDB[valuePosDB]);

    // Mapăm valoarea decibelilor în coordonate grafice
    locationBlockDB[valuePosDB] = map(DECIBEL, 0, graphRangeDB, originY, (originY - sizeY));

    // Desenăm punctul curent pe grafic
    tft.fillRect((mark[valuePosDB] - 1), (locationBlockDB[valuePosDB] - 1), markSizeDB, markSizeDB, pointColor);

    // Conectăm punctul curent cu cel anterior, dacă există
    if (valuePosDB != 0) {
      tft.drawLine(mark[valuePosDB], locationBlockDB[valuePosDB], mark[valuePosDB - 1], locationBlockDB[valuePosDB - 1], lineColor);
    }

    blockPosDB++;
  } else {
    // Curățăm canvasul graficului
    tft.fillRect((originX + 2), (originY - sizeY), sizeX, sizeY, WHITE);

    // Mapăm valoarea punctului curent
    locationBlockDB[valuePosDB] = map(DECIBEL, 0, graphRangeDB, originY, (originY - sizeY));

    // Desenăm punctul curent
    tft.fillRect((mark[7]), (locationBlockDB[valuePosDB] - 1), markSizeDB, markSizeDB, pointColor);

    // Desenăm toate punctele
    for (int i = 0; i < 8; i++) {
      tft.fillRect((mark[blockPosDB - (i + 1)] - 1), (locationBlockDB[valuePosDB - i] - 1), markSizeDB, markSizeDB, pointColor);
    }

    // Desenăm toate liniile
    for (int i = 0; i < 7; i++) {
      tft.drawLine(mark[blockPosDB - (i + 1)], locationBlockDB[valuePosDB - i], mark[blockPosDB - (i + 2)], locationBlockDB[valuePosDB - (i + 1)], lineColor);
    }

    // Actualizăm etichetele de timp
    for (int i = 0; i <= 7; i++) {
      tft.setCursor((mark[7 - i] - 5), (originY + 16));
      tft.setTextColor(graphColor, WHITE);
      tft.setTextSize(1);
      tft.println(timeBlockDB[valuePosDB - i]);
    }
  }

  valuePosDB++;

  if (valuePosDB == 49 || blockPosDB == 49) {
    for (int i = 0; i <= 50; i++) {
      locationBlockDB[i] = 0;
      valueBlockDB[i] = 0;
    }
    valuePosDB = 0;
    blockPosDB = 0;
  }

  if (e13 > 1000)
    e13 = 0;

  delay(delay_afi_y);
}


int e14 = 0;  // Variabilă globală pentru gestionarea timpului
void graphHIDRO(int HIDRO_VAL) {
  if (HIDRO_VAL <= 300)
    HIDROGEN = HIDRO_VAL;  // Valoarea hidrogenului este limitată la 300
  else
    HIDROGEN = 300;

  Serial.println(HIDROGEN);  // Afișează valoarea pe monitorul serial

  // Adăugăm valorile în bufferul pentru timp și valori
  timeBlockHIDRO[valuePosHIDRO] = e14;
  e14 = e14 + 1;

  valueBlockHIDRO[valuePosHIDRO] = HIDROGEN;

  if (blockPosHIDRO < 8) {
    // Afișăm timpul pentru fiecare punct
    tft.setCursor((mark[valuePosHIDRO] - 5), (originY + 16));
    tft.setTextColor(graphColor, WHITE);
    tft.setTextSize(1);
    tft.println(timeBlockHIDRO[valuePosHIDRO]);

    // Mapăm valoarea punctului curent în coordonate de pe ecran
    locationBlockHIDRO[valuePosHIDRO] = map(HIDROGEN, 0, graphRangeHIDRO, originY, (originY - sizeY));

    // Desenăm punctul curent
    tft.fillRect((mark[valuePosHIDRO] - 1), (locationBlockHIDRO[valuePosHIDRO] - 1), markSizeHIDRO, markSizeHIDRO, pointColor);

    // Conectăm punctul curent cu cel anterior (dacă există)
    if (valuePosHIDRO != 0) {
      tft.drawLine(mark[valuePosHIDRO], locationBlockHIDRO[valuePosHIDRO], mark[(valuePosHIDRO - 1)], locationBlockHIDRO[(valuePosHIDRO - 1)], lineColor);
    }

    blockPosHIDRO++;
  } else {
    // Curățăm graficul
    tft.fillRect((originX + 2), (originY - sizeY), sizeX, sizeY, WHITE);

    // Mapăm valoarea punctului curent
    locationBlockHIDRO[valuePosHIDRO] = map(HIDROGEN, 0, graphRangeHIDRO, originY, (originY - sizeY));

    // Desenăm punctul curent
    tft.fillRect((mark[7]), (locationBlockHIDRO[valuePosHIDRO] - 1), markSizeHIDRO, markSizeHIDRO, pointColor);

    // Desenăm toate punctele existente
    for (int i = 0; i < 8; i++) {
      tft.fillRect((mark[(blockPosHIDRO - (i + 1))] - 1), (locationBlockHIDRO[(valuePosHIDRO - i)] - 1), markSizeHIDRO, markSizeHIDRO, pointColor);
    }

    // Conectăm toate punctele existente cu linii
    for (int i = 0; i < 7; i++) {
      tft.drawLine(mark[blockPosHIDRO - (i + 1)], locationBlockHIDRO[valuePosHIDRO - i], mark[blockPosHIDRO - (i + 2)], locationBlockHIDRO[valuePosHIDRO - (i + 1)], lineColor);
    }

    // Actualizăm etichetele de timp
    for (int i = 0; i <= 7; i++) {
      tft.setCursor((mark[(7 - i)] - 5), (originY + 16));
      tft.setTextColor(graphColor, WHITE);
      tft.setTextSize(1);
      tft.println(timeBlockHIDRO[valuePosHIDRO - i]);
    }
  }

  valuePosHIDRO++;

  // Resetăm bufferul când ajungem la 50 de puncte
  if (valuePosHIDRO == 49 || blockPosHIDRO == 49) {
    for (int i = 0; i <= 50; i++) {
      locationBlockHIDRO[i] = 0;
      valueBlockHIDRO[i] = 0;
    }
    valuePosHIDRO = 0;
    blockPosHIDRO = 0;
  }

  // Resetăm contorul de timp dacă depășește 1000
  if (e14 > 1000)
    e14 = 0;

  delay(delay_afi_y);  // Întârziere pentru a ajusta viteza graficului
}


int e15 = 0;  // Variabilă globală pentru gestionarea timpului
void graphO3(int O3_VAL) {
  if (O3_VAL <= 200)
    OZON = O3_VAL;  // Valoare limitată la 1000
  else
    OZON = 200;

  Serial.println(OZON);  // Afișează valoarea pe monitorul serial

  // Adăugăm valorile în bufferul pentru timp și valori
  timeBlockO3[valuePosO3] = e15;
  e15 = e15 + 1;

  valueBlockO3[valuePosO3] = OZON;

  if (blockPosO3 < 8) {
    // Afișăm timpul pentru fiecare punct
    tft.setCursor((mark[valuePosO3] - 5), (originY + 16));
    tft.setTextColor(graphColor, WHITE);
    tft.setTextSize(1);
    tft.println(timeBlockO3[valuePosO3]);

    // Mapăm valoarea punctului curent în coordonate de pe ecran
    locationBlockO3[valuePosO3] = map(OZON, 0, graphRangeO3, originY, (originY - sizeY));

    // Desenăm punctul curent
    tft.fillRect((mark[valuePosO3] - 1), (locationBlockO3[valuePosO3] - 1), markSizeO3, markSizeO3, pointColor);

    // Conectăm punctul curent cu cel anterior (dacă există)
    if (valuePosO3 != 0) {
      tft.drawLine(mark[valuePosO3], locationBlockO3[valuePosO3], mark[(valuePosO3 - 1)], locationBlockO3[(valuePosO3 - 1)], lineColor);
    }

    blockPosO3++;
  } else {
    // Curățăm graficul
    tft.fillRect((originX + 2), (originY - sizeY), sizeX, sizeY, WHITE);

    // Mapăm valoarea punctului curent
    locationBlockO3[valuePosO3] = map(OZON, 0, graphRangeO3, originY, (originY - sizeY));

    // Desenăm punctul curent
    tft.fillRect((mark[7]), (locationBlockO3[valuePosO3] - 1), markSizeO3, markSizeO3, pointColor);

    // Desenăm toate punctele existente
    for (int i = 0; i < 8; i++) {
      tft.fillRect((mark[(blockPosO3 - (i + 1))] - 1), (locationBlockO3[(valuePosO3 - i)] - 1), markSizeO3, markSizeO3, pointColor);
    }

    // Conectăm toate punctele existente cu linii
    for (int i = 0; i < 7; i++) {
      tft.drawLine(mark[blockPosO3 - (i + 1)], locationBlockO3[valuePosO3 - i], mark[blockPosO3 - (i + 2)], locationBlockO3[valuePosO3 - (i + 1)], lineColor);
    }

    // Actualizăm etichetele de timp
    for (int i = 0; i <= 7; i++) {
      tft.setCursor((mark[(7 - i)] - 5), (originY + 16));
      tft.setTextColor(graphColor, WHITE);
      tft.setTextSize(1);
      tft.println(timeBlockO3[valuePosO3 - i]);
    }
  }

  valuePosO3++;

  // Resetăm bufferul când ajungem la 50 de puncte
  if (valuePosO3 == 49 || blockPosO3 == 49) {
    for (int i = 0; i <= 50; i++) {
      locationBlockO3[i] = 0;
      valueBlockO3[i] = 0;
    }
    valuePosO3 = 0;
    blockPosO3 = 0;
  }

  // Resetăm contorul de timp dacă depășește 1000
  if (e15 > 1000)
    e15 = 0;

  delay(delay_afi_y);  // Întârziere pentru a ajusta viteza graficului
}


/*
  \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
  ////////////////////////////////\
  ////////AFISARE URGENTE/////////\
  ////////////////////////////////\
  \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
*/


void urgenta_mesaj(int TMP_VAL, String mesaj) {

  tft.setRotation(1);
  tft.fillScreen(RED);
  tft.setTextColor(BLACK);

  tft.setCursor(60, 100);
  tft.setTextColor(BLACK, RED);

  tft.setTextSize(2);
  tft.print(mesaj);

  tft.setCursor(160, 170);
  tft.print(TMP_VAL);
}


int contorizare = 0;
int timp_trecut = 0;
int verificare_praf_filtru = 0;
bool dezactivare_buzzer = false;


void apel_urgenta(int TMP_VAL, int TVOC_VAL, int CO2_VAL, int HUM_VAL, int CO_VAL, int NH3_VAL, int NO2_VAL, int SOUND_VAL, int H_VAL, int PRES_VAL) {

  contorizare++;
  if (!(contorizare >= 100 && timp_trecut < 1000)) {
    timp_trecut = 0;
    return;
  }
  int timp_alarma = 0;

  if (TMP_VAL > adreseEEPROMSenzori.crit_val_Temp) {
    while (TMP_VAL > adreseEEPROMSenzori.crit_val_Temp) {
      TMP_VAL = temperature();
      digitalWrite(buzzerPin, LOW);
      urgenta_mesaj(TMP_VAL, "Temperatura ridicata");
      timp_alarma++;
      if(timp_alarma >= 10000){
        prim_run = true;
        break;
      }
    }
    digitalWrite(buzzerPin, HIGH);
    setup();
  }

  if (TVOC_VAL > adreseEEPROMSenzori.crit_val_TVOC) {
    while (TVOC_VAL > adreseEEPROMSenzori.crit_val_TVOC) {
      TVOC_VAL = 0;  //TVO();
      digitalWrite(buzzerPin, LOW);
      urgenta_mesaj(TVOC_VAL, "TVOC ridicata");
      timp_alarma++;
      if(timp_alarma >= 10000){
        prim_run = true;
        break;
      }
    }
    digitalWrite(buzzerPin, HIGH);
    setup();
  }

  if (CO2_VAL > adreseEEPROMSenzori.crit_val_CO2) {
    while (CO2_VAL > adreseEEPROMSenzori.crit_val_CO2) {
      CO2_VAL = CO22();
      digitalWrite(buzzerPin, LOW);
      urgenta_mesaj(CO2_VAL, "CO2 ridicata");
      timp_alarma++;
      if(timp_alarma >= 10000){
        prim_run = true;
        break;
      }
    }
    digitalWrite(buzzerPin, HIGH);
    setup();
  }


  if (pm2 > adreseEEPROMSenzori.crit_val_PMP2_5 || pm10 > adreseEEPROMSenzori.crit_val_PMP10) {
    verificare_praf_filtru++;
    if (verificare_praf_filtru > 1000){
      while (pm2 > adreseEEPROMSenzori.crit_val_PMP2_5 || pm10 > adreseEEPROMSenzori.crit_val_PMP10) {
        Sds();
        digitalWrite(buzzerPin, LOW);
        int avg = (pm2 + pm10) / 2;
        urgenta_mesaj(avg, "Praf ridicata");
        timp_alarma++;
        if(timp_alarma >= 1000){
          prim_run = true;
          break;
        }
      }
      digitalWrite(buzzerPin, HIGH);
      setup();
      dezactivare_buzzer = true;
    }else if (dezactivare_buzzer == true){
        dezactivare_buzzer = false;
        verificare_praf_filtru = 0;
    } 
  }

  // Serial.print("Valoare critica hum: ");
  // Serial.println(adreseEEPROMSenzori.crit_val_Hum);
  if (HUM_VAL > adreseEEPROMSenzori.crit_val_Hum) {
    while (HUM_VAL > adreseEEPROMSenzori.crit_val_Hum) {
      HUM_VAL = humidity();
      digitalWrite(buzzerPin, LOW);
      urgenta_mesaj(HUM_VAL, "Umiditate ridicata");
      timp_alarma++;
      if(timp_alarma >= 10000){
        prim_run = true;
        break;
      }
    }
    digitalWrite(buzzerPin, HIGH);
    setup();
  }

  if (CO_VAL > adreseEEPROMSenzori.crit_val_CO) {
    while (CO_VAL > adreseEEPROMSenzori.crit_val_CO) {
      CO_VAL = COo();
      digitalWrite(buzzerPin, LOW);
      urgenta_mesaj(CO_VAL, "CO ridicata");
      timp_alarma++;
      if(timp_alarma >= 10000){
        prim_run = true;
        break;
      }
    }
    digitalWrite(buzzerPin, HIGH);
    setup();
  }

  if (NH3_VAL > adreseEEPROMSenzori.crit_val_NH3) {
    while (NH3_VAL > adreseEEPROMSenzori.crit_val_NH3) {
      NH3_VAL = NH333();
      digitalWrite(buzzerPin, LOW);
      urgenta_mesaj(NH3_VAL, "Amoniac ridicata");
      timp_alarma++;
      if(timp_alarma >= 10000){
        prim_run = true;
        break;
      }
    }
    digitalWrite(buzzerPin, HIGH);
    setup();
  }

  if (NO2_VAL > adreseEEPROMSenzori.crit_val_NO2) {
    while (NO2_VAL > adreseEEPROMSenzori.crit_val_NO2) {
      NO2_VAL = NO222();
      digitalWrite(buzzerPin, LOW);
      urgenta_mesaj(NO2_VAL, "NO2 ridicata");
      timp_alarma++;
      if(timp_alarma >= 10000){
        prim_run = true;
        break;
      }
    }
    digitalWrite(buzzerPin, HIGH);
    setup();
  }

  if (PRES_VAL > adreseEEPROMSenzori.crit_val_Pres) {
    while (PRES_VAL > adreseEEPROMSenzori.crit_val_Pres) {
      PRES_VAL = presure();
      digitalWrite(buzzerPin, LOW);
      urgenta_mesaj(CO2_VAL, "Presiune ridicata");
      timp_alarma++;
      if(timp_alarma >= 10000){
        prim_run = true;
        break;
      }
    }
    digitalWrite(buzzerPin, HIGH);
    setup();
  }

  if (SOUND_VAL > adreseEEPROMSenzori.crit_val_Fonic) {
    while (SOUND_VAL > adreseEEPROMSenzori.crit_val_Fonic) {
      SOUND_VAL = decibelotmetru();
      digitalWrite(buzzerPin, LOW);
      urgenta_mesaj(SOUND_VAL, "Zgomot ridicata");
      timp_alarma++;
      if(timp_alarma >= 10000){
        prim_run = true;
        break;
      }
    }
    digitalWrite(buzzerPin, HIGH);
    setup();
  }

  ///50 sau 500 depinde de cum imi reglez senzorul
  if (H_VAL > adreseEEPROMSenzori.crit_val_H) {
    while (H_VAL > adreseEEPROMSenzori.crit_val_H) {
      H_VAL = H();
      digitalWrite(buzzerPin, LOW);
      urgenta_mesaj(H_VAL, "H ridicata");
      timp_alarma++;
      if(timp_alarma >= 10000){
        prim_run = true;
        break;
      }
    }
    digitalWrite(buzzerPin, HIGH);
    setup();
  }
}

/*
  \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
  ////////////////////////////////\
  //////////Salvare DATE//////////\
  ////////////////////////////////\
  \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
*/

int scriere_date_sd = 0;

void scrieLinieCSV(int TMP_VAL, int TVOC_VAL, int CO2_VAL, int HUM_VAL, int CO_VAL, int NH3_VAL, int NO2_VAL, int O3_VAL, int SOUND_VAL, int Mag_VAL, int H_VAL, int PRES_VAL){

  if(scriere_date_sd <= 5000){
    scriere_date_sd++;
    return;
  }
  scriere_date_sd = 0;

  if (file.open(NUME_FISIER_CSV, O_RDWR | O_CREAT | O_AT_END)) {
    
    file.print(TMP_VAL); file.print(";");
    file.print(TVOC_VAL); file.print(";");
    file.print(CO2_VAL); file.print(";");
    file.print(pm2); file.print(";");
    file.print(pm10); file.print(";");
    file.print(HUM_VAL); file.print(";");
    file.print(CO_VAL); file.print(";");
    file.print(NH3_VAL); file.print(";");
    file.print(NO2_VAL); file.print(";");
    file.print(O3_VAL); file.print(";");
    file.print(SOUND_VAL); file.print(";");
    file.print(Mag_VAL); file.print(";");
    file.print(H_VAL); file.print(";");
    file.println(PRES_VAL);

    file.close();
    // Serial.println("Date salvate.");
  } else {
    Serial.println("Eroare la deschiderea fisierului!");
  }
}


/*
  \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
  ////////////////////////////////\
  //////////AFISARE DATE//////////\
  ////////////////////////////////\
  \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
*/


int q = 0;
int coo22 = 0, pe = 0, tmpee = 0;
int pm255 = 0, pm100 = 0, huu = 0;
int pres_ant = 0, H_VAL_ANT = 0, SOUND_VAL_ANT = 0, O3_VAL_ANT = 0, MAG_VAL_ANT = 0;

void afisare_parametrii(int enable_esp_transfer) {
  if (ok > 2) {
    q++;
    if (q > 10000) {
      q = 0;
      setup();
    }
  }


  ///////////////////////////////
  ///////////////////////////////
  ////////Citire date ///////////
  /////////permanent/////////////
  ///////////////////////////////
  ///////////////////////////////

  int TMP_VAL = temperature();
  int TVOC_VAL = 0; // TVO();
  int CO2_VAL = CO22();
  Sds();
  int HUM_VAL = humidity();
  int CO_VAL = COo();
  int NH3_VAL = NH333();
  int NO2_VAL = NO222();
  int PRES_VAL = presure();
  int SOUND_VAL = decibelotmetru();
  int H_VAL = H();
  int O3_VAL = O3();    ///apel functie
  int MAG_VAL = MAG();  ///apel functie

  ///dezactivat pentru urgente
  apel_urgenta(TMP_VAL, TVOC_VAL, CO2_VAL, HUM_VAL, CO_VAL, NH3_VAL, NO2_VAL, SOUND_VAL, H_VAL, PRES_VAL);
  
  ///scriere pe card SD
  scrieLinieCSV(TMP_VAL, TVOC_VAL, CO2_VAL, HUM_VAL, CO_VAL, NH3_VAL, NO2_VAL, O3_VAL, SOUND_VAL, MAG_VAL, H_VAL, PRES_VAL);

  ///////////////////////////////
  ///////////////////////////////
  ///////////////////////////////
  ///////////////////////////////

  switch (ok) {
    case 0:
      {
        break;
      }
    case 3:
      {
        tft.setTextSize(2);

        tft.setCursor(50, 60);
        tft.setTextColor(BLACK, ORANGE);
        //int tmp = temperature();

        if (tmpee >= 10 && TMP_VAL < 10) {
          tft.setCursor(50, 60);
          tft.setTextColor(ORANGE, ORANGE);
          tft.print("000000");
          tft.setCursor(48, 60);
          tft.print("000000");
          tft.setCursor(52, 60);
          tft.print("000000");
        } else if (tmpee >= 0 && TMP_VAL < 0) {
          tft.setCursor(50, 60);
          tft.setTextColor(ORANGE, ORANGE);
          tft.print("000000");
          tft.setCursor(48, 60);
          tft.print("000000");
          tft.setCursor(52, 60);
          tft.print("000000");
        } else if (tmpee <= -10 && TMP_VAL > -10) {
          tft.setCursor(50, 60);
          tft.setTextColor(ORANGE, ORANGE);
          tft.print("000000");
          tft.setCursor(48, 60);
          tft.print("000000");
          tft.setCursor(52, 60);
          tft.print("000000");
        }
        tft.print(TMP_VAL);
        tmpee = TMP_VAL;

        tft.setCursor(240, 60);
        tft.setTextColor(BLACK, ORANGE);
        //int e = 0;//TVO();
        tft.setCursor(240, 60);
        if (e >= 0) {
          if (pe >= 100 && TVOC_VAL < 100) {
            tft.setCursor(220, 60);
            tft.setTextColor(ORANGE, ORANGE);
            tft.print("000000");
            tft.setCursor(222, 60);
            tft.print("000000");
            tft.setCursor(240, 60);
            tft.print("000000");
          } else if (pe >= 10 && TVOC_VAL < 10) {
            tft.setCursor(220, 60);
            tft.setTextColor(ORANGE, ORANGE);
            tft.print("000000");
            tft.setCursor(222, 60);
            tft.print("000000");
            tft.setCursor(240, 60);
            tft.print("000000");
          } else if (pe >= 1000 && TVOC_VAL < 1000) {
            tft.setCursor(220, 60);
            tft.setTextColor(ORANGE, ORANGE);
            tft.print("000000");
            tft.setCursor(222, 60);
            tft.print("000000");
            tft.setCursor(240, 60);
            tft.print("000000");
          }

          tft.setCursor(240, 60);
          tft.setTextColor(BLACK, ORANGE);
          tft.print(TVOC_VAL);

          Serial.println(TVOC_VAL);
          pe = TVOC_VAL;
        }



        //int r = CO22();
        if (CO2_VAL > 0) {
          if (coo22 >= 1000 && coo22 < 10000 && CO2_VAL < 1000) {
            tft.setCursor(120, 160);
            tft.setTextColor(ORANGE, ORANGE);
            tft.print("000000");
            tft.setCursor(122, 160);
            tft.print("000000");
            tft.setCursor(125, 160);
            tft.print("000000");
            tft.setCursor(127, 160);
            tft.print("000000");
          } else if (coo22 >= 10000 && CO2_VAL < 10000) {
            tft.setCursor(120, 160);
            tft.setTextColor(ORANGE, ORANGE);
            tft.print("000000");
            tft.setCursor(122, 160);
            tft.print("000000");
            tft.setCursor(125, 160);
            tft.print("000000");
            tft.setCursor(127, 160);
            tft.print("000000");
          }

          tft.setCursor(120, 160);
          tft.setTextColor(BLACK, ORANGE);

          tft.print(CO2_VAL);
          coo22 = CO2_VAL;
        }
        delay(delay_afi_ok);
        break;
      }
    ///////////
    ///////////
    ///////////
    case 4:
      {

        //Sds();
        Serial.print(pm2);
        Serial.print("  ");
        Serial.println(pm10);

        tft.setTextSize(2);

        ///*
        if (pm255 >= 10000 && pm2 < 10000) {
          tft.setCursor(50, 60);
          tft.setTextColor(ORANGE, ORANGE);
          tft.print("0000000");
          tft.setCursor(48, 60);
          tft.print("0000000");
          tft.setCursor(52, 60);
          tft.print("0000000");
        } else if (pm255 >= 1000 && pm2 < 1000) {
          tft.setCursor(50, 60);
          tft.setTextColor(ORANGE, ORANGE);
          tft.print("0000000");
          tft.setCursor(48, 60);
          tft.print("0000000");
          tft.setCursor(52, 60);
          tft.print("0000000");
        } else if (pm255 >= 100 && pm2 < 100) {
          tft.setCursor(50, 60);
          tft.setTextColor(ORANGE, ORANGE);
          tft.print("0000000");
          tft.setCursor(48, 60);
          tft.print("0000000");
          tft.setCursor(52, 60);
          tft.print("0000000");
        } else if (pm255 >= 10 && pm2 < 10) {
          tft.setCursor(50, 60);
          tft.setTextColor(ORANGE, ORANGE);
          tft.print("0000000");
          tft.setCursor(48, 60);
          tft.print("0000000");
          tft.setCursor(52, 60);
          tft.print("0000000");
        }
        //*/
        tft.setCursor(50, 60);
        tft.setTextColor(BLACK, ORANGE);
        tft.print(pm2);
        pm255 = pm2;


        ///*
        if (pm100 >= 10000 && pm10 < 10000) {
          tft.setCursor(230, 60);
          tft.setTextColor(ORANGE, ORANGE);
          tft.print("0000000");
          tft.setCursor(229, 60);
          tft.print("0000000");
          tft.setCursor(231, 60);
          tft.print("0000000");
        } else if (pm100 >= 1000 && pm10 < 1000) {
          tft.setCursor(230, 60);
          tft.setTextColor(ORANGE, ORANGE);
          tft.print("0000000");
          tft.setCursor(229, 60);
          tft.print("0000000");
          tft.setCursor(231, 60);
          tft.print("0000000");
        } else if (pm100 >= 100 && pm10 < 100) {
          tft.setCursor(230, 60);
          tft.setTextColor(ORANGE, ORANGE);
          tft.print("0000000");
          tft.setCursor(229, 60);
          tft.print("0000000");
          tft.setCursor(231, 60);
          tft.print("0000000");
        } else if (pm100 >= 10 && pm10 < 10) {
          tft.setCursor(230, 60);
          tft.setTextColor(ORANGE, ORANGE);
          tft.print("0000000");
          tft.setCursor(229, 60);
          tft.print("0000000");
          tft.setCursor(231, 60);
          tft.print("0000000");
        }
        //*/

        tft.setCursor(230, 60);
        tft.setTextColor(BLACK, ORANGE);
        tft.print(pm10);
        pm100 = pm10;



        //int hu = humidity();

        if (huu >= 100 && HUM_VAL < 100) {
          tft.setCursor(140, 60);
          tft.setTextColor(ORANGE, ORANGE);
          tft.print("000000");
          tft.setCursor(138, 60);
          tft.print("000000");
          tft.setCursor(142, 60);
          tft.print("000000");
        } else if (huu >= 10 && HUM_VAL < 10) {
          tft.setCursor(140, 60);
          tft.setTextColor(ORANGE, ORANGE);
          tft.print("000000");
          tft.setCursor(138, 60);
          tft.print("000000");
          tft.setCursor(142, 60);
          tft.print("000000");
        }
        tft.setCursor(140, 180);
        tft.setTextColor(BLACK, ORANGE);
        tft.print(HUM_VAL);
        huu = HUM_VAL;

        delay(delay_afi_ok);
        break;
      }
    case 5:
      {
        tft.setTextSize(2);

        tft.setCursor(65, 60);
        tft.setTextColor(BLACK, ORANGE);
        tft.print(CO_VAL);

        tft.setCursor(245, 60);
        tft.setTextColor(BLACK, ORANGE);
        tft.print(NH3_VAL);

        tft.setCursor(140, 180);
        tft.setTextColor(BLACK, ORANGE);
        tft.print(NO2_VAL);

        delay(delay_afi_ok);
        break;
      }
    case 6:
      {
        tft.setTextSize(2);

        if (O3_VAL_ANT >= 100 && O3_VAL < 100) {
          tft.setCursor(50, 60);
          tft.setTextColor(ORANGE, ORANGE);
          tft.print("0000000");
          tft.setCursor(48, 60);
          tft.print("0000000");
          tft.setCursor(52, 60);
          tft.print("0000000");
        } else if (O3_VAL_ANT >= 10 && O3_VAL < 10) {
          tft.setCursor(50, 60);
          tft.setTextColor(ORANGE, ORANGE);
          tft.print("0000000");
          tft.setCursor(48, 60);
          tft.print("0000000");
          tft.setCursor(52, 60);
          tft.print("0000000");
        }

        tft.setCursor(65, 60);
        tft.setTextColor(BLACK, ORANGE);
        O3_VAL_ANT = O3_VAL;
        tft.print(O3_VAL);


        if (SOUND_VAL_ANT >= 100 && SOUND_VAL < 100) {
          tft.setCursor(145, 60);
          tft.setTextColor(ORANGE, ORANGE);
          tft.print("000000");
          tft.setCursor(143, 60);
          tft.print("000000");
          tft.setCursor(147, 60);
          tft.print("000000");
        } else if (SOUND_VAL_ANT >= 10 && SOUND_VAL < 10) {
          tft.setCursor(145, 60);
          tft.setTextColor(ORANGE, ORANGE);
          tft.print("000000");
          tft.setCursor(143, 60);
          tft.print("000000");
          tft.setCursor(147, 60);
          tft.print("000000");
        }

        tft.setCursor(245, 60);
        tft.setTextColor(BLACK, ORANGE);
        if (SOUND_VAL > 140) {
          SOUND_VAL = 140;
        } else {
          SOUND_VAL_ANT = SOUND_VAL;
        }
        tft.print(SOUND_VAL);



        if (MAG_VAL_ANT >= 1000 && MAG_VAL < 1000) {
          tft.setCursor(120, 160);
          tft.setTextColor(ORANGE, ORANGE);
          tft.print("000000");
          tft.setCursor(122, 160);
          tft.print("000000");
          tft.setCursor(125, 160);
          tft.print("000000");
          tft.setCursor(127, 160);
          tft.print("000000");
        } else if (MAG_VAL_ANT >= 100 && MAG_VAL < 100) {
          tft.setCursor(140, 60);
          tft.setTextColor(ORANGE, ORANGE);
          tft.print("000000");
          tft.setCursor(138, 60);
          tft.print("000000");
          tft.setCursor(142, 60);
          tft.print("000000");
        } else if (MAG_VAL_ANT >= 10 && MAG_VAL < 10) {
          tft.setCursor(140, 60);
          tft.setTextColor(ORANGE, ORANGE);
          tft.print("000000");
          tft.setCursor(138, 60);
          tft.print("000000");
          tft.setCursor(142, 60);
          tft.print("000000");
        }
        tft.setCursor(140, 180);
        tft.setTextColor(BLACK, ORANGE);
        MAG_VAL_ANT = MAG_VAL;
        tft.print(MAG_VAL);

        delay(delay_afi_ok);
        break;
      }
    case 7:
      {


        if (H_VAL_ANT >= 1000 && H_VAL < 1000) {
          tft.setCursor(230, 60);
          tft.setTextColor(ORANGE, ORANGE);
          tft.print("0000000");
          tft.setCursor(229, 60);
          tft.print("0000000");
          tft.setCursor(231, 60);
          tft.print("0000000");
        } else if (H_VAL_ANT >= 100 && H_VAL < 100) {
          tft.setCursor(230, 60);
          tft.setTextColor(ORANGE, ORANGE);
          tft.print("0000000");
          tft.setCursor(229, 60);
          tft.print("0000000");
          tft.setCursor(231, 60);
          tft.print("0000000");
        } else if (H_VAL_ANT >= 10 && H_VAL < 10) {
          tft.setCursor(230, 60);
          tft.setTextColor(ORANGE, ORANGE);
          tft.print("0000000");
          tft.setCursor(229, 60);
          tft.print("0000000");
          tft.setCursor(231, 60);
          tft.print("0000000");
        }

        tft.setCursor(150, 80);
        tft.setTextColor(BLACK, ORANGE);
        H_VAL_ANT = H_VAL;
        tft.print(H_VAL);


        //int presi = presure();
        if (pres_ant >= 1000 && PRES_VAL < 1000) {
          tft.setCursor(140, 180);
          tft.setTextColor(ORANGE, ORANGE);
          tft.print("000000");
          tft.setCursor(138, 180);
          tft.print("000000");
          tft.setCursor(142, 180);
          tft.print("000000");
        } else {
          pres_ant = PRES_VAL;
          tft.setCursor(140, 180);
          tft.setTextColor(BLACK, ORANGE);
          tft.print(PRES_VAL);
        }

        delay(delay_afi_ok);
        break;
      }
  }



  /*
    \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
    /////////////////////////////////////\
    ////////////VAL. GRAFICE////////////\
    ///////////////////////////////////\
    \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
  */


  switch (y) {
    case 0:
      {
        break;
      }
    case 1:
      {
        graphtemp(TMP_VAL);
        break;
      }
    case 2:
      {
        graphTVOC(TVOC_VAL);
        break;
      }
    case 3:
      {
        graphCO2(CO2_VAL);
        break;
      }
    case 4:
      {
        graphPM25();
        break;
      }
    case 5:
      {
        graphPM10();
        break;
      }
    case 6:
      {
        graphHUM(HUM_VAL);
        break;
      }
    case 7:
      {
        graphCO(CO_VAL);
        break;
      }
    case 8:
      {
        graphNH3(NH3_VAL);
        break;
      }
    case 9:
      {
        graphNO2(NO2_VAL);
        break;
      }
    case 10:
      {
        graphO3(O3_VAL);
        break;
      }
    case 11:
      {
        graphDB(SOUND_VAL);
        break;
      }
    case 12:
      {
        graphMAG(MAG_VAL);
        break;
      }
    case 13:
      {
        graphHIDRO(H_VAL);
        break;
      }
    case 14:
      {
        graphPRESU(PRES_VAL);
        break;
      }
  }
  /*
    \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
    /////////////////////////////////////\
    ////////////Transfer date////////////\
    /////////////////ESP/////////////////\
    \\\\\\\\\\\\\\///\\\\\\\\\\\\\\\\\\\\\
  */

  if (enable_esp_transfer) {

    Serial3.print(TVOC_VAL);
    Serial3.print(',');
    Serial3.print(TMP_VAL);
    Serial3.print(',');
    Serial3.print(PRES_VAL);
    Serial3.print(',');
    Serial3.print(HUM_VAL);
    Serial3.print(',');
    Serial3.print(CO2_VAL);
    Serial3.print(',');
    Serial3.print(CO_VAL);
    Serial3.print(',');
    Serial3.print(NH3_VAL);
    Serial3.print(',');
    Serial3.print(NO2_VAL);
    Serial3.print(',');
    Serial3.print(pm2);
    Serial3.print(',');
    Serial3.print(pm10);
    Serial3.print(',');
    Serial3.print(SOUND_VAL);
    Serial3.print(',');
    Serial3.print(H_VAL);
    Serial3.print(',');
    Serial3.print(O3_VAL);
    Serial3.print(',');
    Serial3.print(MAG_VAL);
    Serial3.print(',');
    Serial3.print('\x0D');
  }
}


/*
  \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
  /////////////////////////////////////\
  ///////////////LOOP/////////////////\
  ///////////////////////////////////\
  \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
*/
void point() {
  TSPoint p = tou.getPoint();  //Get touch point

  if (p.z > tou.pressureThreshhold) {

    Serial.print("X = ");
    Serial.print(p.x);
    Serial.print("\tY = ");
    Serial.print(p.y);
    Serial.print("\n");

    p.x = map(p.x, TS_MAXX, TS_MINX, 0, 320);
    p.y = map(p.y, TS_MAXY, TS_MINY, 0, 240);
  }
}


/*
  \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
  /////////////////////////////////////\
  ///////////////patrate/////////////////\
  ///////////////////////////////////\
  \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
*/

void pat() {
  if (ok > 2 && ok < 7) {
    //90 60
    tft.fillRect(30, 55, 80, 25, ORANGE);
    tft.drawRect(30, 55, 80, 25, ORANGE);

    tft.fillRect(210, 55, 80, 25, ORANGE);
    tft.drawRect(210, 55, 80, 25, ORANGE);

    if (ok == 3) {
      tft.fillRect(105, 155, 100, 25, ORANGE);
      tft.drawRect(105, 155, 100, 25, ORANGE);
    } else if (ok == 4) {
      tft.fillRect(105, 175, 90, 25, ORANGE);
      tft.drawRect(105, 175, 90, 25, ORANGE);
    } else if (ok == 5) {
      tft.fillRect(105, 175, 80, 25, ORANGE);
      tft.drawRect(105, 175, 80, 25, ORANGE);
    } else if (ok == 6) {
      tft.fillRect(105, 175, 80, 25, ORANGE);
      tft.drawRect(105, 175, 80, 25, ORANGE);
    }
  } else {
    if (ok == 7) {
      tft.fillRect(125, 75, 70, 25, ORANGE);
      tft.drawRect(125, 75, 70, 25, ORANGE);

      tft.fillRect(115, 175, 80, 25, ORANGE);
      tft.drawRect(115, 175, 80, 25, ORANGE);
    }
  }
}

/*
  \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
  /////////////////////////////////////\
  ///////////////LOOP/////////////////\
  ///////////////////////////////////\
  \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
*/

void loop() {
  timp_trecut++;
  int enable_esp_transfer = 0;
  afisare_parametrii(enable_esp_transfer);
  touchscreen_ecran();


  pat();
  //esp_transfere();

  point();


  pinMode(XM, OUTPUT);
  digitalWrite(XM, LOW);
  pinMode(YP, OUTPUT);
  digitalWrite(YP, HIGH);
  digitalWrite(YM, LOW);
  pinMode(XP, OUTPUT);
  digitalWrite(XP, HIGH);
}