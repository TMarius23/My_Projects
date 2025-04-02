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
#include "SD.h"
#include <WiFi.h>


unsigned char hexdata[9] = {0xFF, 0x01, 0x86, 0x00, 0x00, 0x00, 0x00, 0x00, 0x79};

///RXD->RX
///TXD->TX

SoftwareSerial  ser_co2(51, 50); // RX, TX

///RXD->TX
///TXD->Rx
///SoftwareSerial my_sds(52, 53); // RX, TX

const float max_volts = 5.0;
const float max_analog_steps = 1023.0;

unsigned long delayTime;



MCUFRIEND_kbv tft;


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
int valueBlockSO2[50], timeBlockSO2[50], locationBlockSO2[50], valuePosSO2, blockPosSO2, SO2;
int valueBlockPRESU[50], timeBlockPRESU[50], locationBlockPRESU[50], valuePosPRESU, blockPosPRESU, PRESU;
float valueBlocksoo2[50], locationBlocksoo2[50];
int timeBlocksoo2[50], valuePossoo2, blockPossoo2;


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
int graphRangeSO2 = 100, markSizeSO2 = 3;
int graphRangePRESU = 6000, markSizePRESU = 3;
float graphRangesoo2 = 200, markSizesoo2 = 3;


// Calculate Values
const int numberOfMarks = 8;
const int originX = 45;
const int originY = 200;
const int sizeX = 270;
const int sizeY = 150;
const int deviation = 30;

int boxSize = (sizeX / numberOfMarks);
int boxSizesoo2 = (sizeX / numberOfMarks);
int mark[] = {(boxSize + deviation), ((boxSize * 2) + deviation), ((boxSize * 3) + deviation), ((boxSize * 4) + deviation), ((boxSize * 5) + deviation), ((boxSize * 6) + deviation), ((boxSize * 7) + deviation), ((boxSize * 8) + deviation)};
int marksoo2[] = {(boxSizesoo2 + deviation), ((boxSizesoo2 * 2) + deviation), ((boxSizesoo2 * 3) + deviation), ((boxSizesoo2 * 4) + deviation), ((boxSizesoo2 * 5) + deviation), ((boxSizesoo2 * 6) + deviation), ((boxSizesoo2 * 7) + deviation), ((boxSizesoo2 * 8) + deviation)};


const int minorSizeY = (originY + 10);
const int minorSizeX = (originX - 10);

int numberSize = (sizeY / 6);
int number[] = {numberSize, (numberSize * 2), (numberSize * 3), (numberSize * 4), (numberSize * 5), (numberSize * 6)};

float numberSizesoo2 = (sizeY / 5);
float numbersoo2[] = {numberSizesoo2, (numberSizesoo2 * 2), (numberSizesoo2 * 3), (numberSizesoo2 * 4), (numberSizesoo2 * 5), (numberSizesoo2 * 6)};


int numberValuetemp = (graphRangetemp / 6);
int numberValueTVOC = (graphRangeTVOC / 6);
int numberValueCO2 = (graphRangeCO2 / 6);
int numberValuePM25 = (graphRangePM25 / 6);
int numberValuePM10 = (graphRangePM10 / 6);
int numberValueHUM = (graphRangeHUM / 6);
int numberValueCO = (graphRangeCO / 6);
int numberValueNH33 = (graphRangeNH33 / 6);
int numberValueNO22 = (graphRangeNO22 / 6);
int numberValueSO2  = (graphRangeSO2 / 6);
int numberValuePRESU = (graphRangePRESU  / 6);
int numberValuesoo2 = (graphRangesoo2  / 5);



int valtemp[] = {graphRangetemp, (numberValuetemp * 5), (numberValuetemp * 4), (numberValuetemp * 3), (numberValuetemp * 2), numberValuetemp};
int valTVOC[] = {graphRangeTVOC, (numberValueTVOC * 5), (numberValueTVOC * 4), (numberValueTVOC * 3), (numberValueTVOC * 2), numberValueTVOC};
int valCO2[] = {graphRangeCO2, (numberValueCO2 * 5), (numberValueCO2 * 4), (numberValueCO2 * 3), (numberValueCO2 * 2), numberValueCO2};
int valPM25[] = {graphRangePM25, (numberValuePM25 * 5), (numberValuePM25 * 4), (numberValuePM25 * 3), (numberValuePM25 * 2), numberValuePM25};
int valPM10[] = {graphRangePM10, (numberValuePM10 * 5), (numberValuePM10 * 4), (numberValuePM10 * 3), (numberValuePM10 * 2), numberValuePM10};
int valHUM[] = {graphRangeHUM, (numberValueHUM * 5), (numberValueHUM * 4), (numberValueHUM * 3), (numberValueHUM * 2), numberValueHUM};
int valCO[] = {graphRangeCO, (numberValueCO * 5), (numberValueCO * 4), (numberValueCO * 3), (numberValueCO * 2), numberValueCO};
int valNH33[] = {graphRangeNH33, (numberValueNH33 * 5), (numberValueNH33 * 4), (numberValueNH33 * 3), (numberValueNH33 * 2), numberValueNH33};
int valNO22[] = {graphRangeNO22, (numberValueNO22 * 5), (numberValueNO22 * 4), (numberValueNO22 * 3), (numberValueNO22 * 2), numberValueNO22};
int valSO2[] = {graphRangeSO2, (numberValueSO2 * 5), (numberValueSO2 * 4), (numberValueSO2 * 3), (numberValueSO2 * 2), numberValueSO2};
int valPRESU[] = {graphRangePRESU, (numberValuePRESU * 5), (numberValuePRESU * 4), (numberValuePRESU * 3), (numberValuePRESU * 2), numberValuePRESU};
int valsoo2[] = {(numberValuesoo2 * 5), (numberValuesoo2 * 4), (numberValuesoo2 * 3), (numberValuesoo2 * 2), numberValuesoo2};




/*
  \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
  /////////////////////////////////\
  ///////Interfata pagini//////////\
  //////////principale/////////////\
  /////////////////////////////////\
  \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
*/




void screen(int ok, int y)
{
  switch (ok)
  {
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
        tft.print("X");
        tft.setCursor(235, 143);
        tft.print("1200");




        tft.setCursor(10, 163);
        tft.print("TVOC");
        tft.setCursor(135, 163);
        tft.print("X");
        tft.setCursor(238, 163);
        tft.print("100");



        tft.setCursor(10, 183);
        tft.print("Temp");
        tft.setCursor(135, 183);
        tft.print("X");
        tft.setCursor(242, 183);
        tft.print("40");



        tft.setCursor(10, 203);
        tft.print("PM2.5 ");
        tft.setCursor(135, 203);
        tft.print("X");
        tft.setCursor(235, 203);
        tft.print("6000");



        tft.setCursor(10, 223);
        tft.print("PM10 ");
        tft.setCursor(135, 223);
        tft.print("X");
        tft.setCursor(235, 223);
        tft.print("6000");


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

        tft.setCursor(74, 190);
        tft.setTextColor(WHITE, RED);
        tft.setTextSize(2);
        tft.print("Site-ul nostru:");
        tft.setCursor(60, 210);
        tft.print("www.infonature.ro");



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
        tft.drawCircle(170, 70, 60, ORANGE); //drawCircle(int16_t x, int16_t y, int16_t r, uint16_t t)
        tft.fillCircle(170, 70, 60, ORANGE); //fillCircle(int16_t x, int16_t y, int16_t r, uint16_t t)

        tft.drawCircle(170, 250, 60, ORANGE); //drawCircle(int16_t x, int16_t y, int16_t r, uint16_t t)
        tft.fillCircle(170, 250, 60, ORANGE); //fillCircle(int16_t x, int16_t y, int16_t r, uint16_t t)


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
        tft.drawCircle(170, 70, 60, ORANGE); //drawCircle(int16_t x, int16_t y, int16_t r, uint16_t t)
        tft.fillCircle(170, 70, 60, ORANGE); //fillCircle(int16_t x, int16_t y, int16_t r, uint16_t t)

        tft.drawCircle(170, 250, 60, ORANGE); //drawCircle(int16_t x, int16_t y, int16_t r, uint16_t t)
        tft.fillCircle(170, 250, 60, ORANGE); //fillCircle(int16_t x, int16_t y, int16_t r, uint16_t t)


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
        tft.drawCircle(170, 70, 60, ORANGE); //drawCircle(int16_t x, int16_t y, int16_t r, uint16_t t)
        tft.fillCircle(170, 70, 60, ORANGE); //fillCircle(int16_t x, int16_t y, int16_t r, uint16_t t)

        tft.drawCircle(170, 250, 60, ORANGE); //drawCircle(int16_t x, int16_t y, int16_t r, uint16_t t)
        tft.fillCircle(170, 250, 60, ORANGE); //fillCircle(int16_t x, int16_t y, int16_t r, uint16_t t)


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

        tft.setTextColor(BLACK);
        tft.setCursor(150, 50);
        tft.setTextSize(2);
        tft.print("SO2:");
        tft.setCursor(200, 80);
        tft.setTextSize(2);
        tft.print("ppm");

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




  switch (y)
  {
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
        tft.setTextSize(1); // set the size of the text
        tft.println("ACASA");


        String graphName = "TEMPERATURA";


        // draw title
        tft.setCursor(65, 10); // set the cursor
        tft.setTextColor(BLUE); // set the colour of the text
        tft.setTextSize(3); // set the size of the text
        tft.println(graphName);

        // draw outline
        tft.drawLine(originX, originY, (originX + sizeX), originY, graphColor);
        tft.drawLine(originX, originY, originX, (originY - sizeY), graphColor);

        // draw lables
        for (int i = 0; i < numberOfMarks; i++)
        {
          tft.drawLine(mark[i], originY, mark[i], minorSizeY, graphColor);
        }

        // draw numbers
        for (int i = 0; i < 6; i++)
        {
          tft.drawLine(originX, (originY - number[i]), minorSizeX, (originY - number[i]), graphColor);
        }

        // draw number values
        for (int i = 0; i < 6; i++)
        {
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
        tft.setTextSize(1); // set the size of the text
        tft.println("ACASA");

        String graphName = "TVOC";

        // draw title
        tft.setCursor(140, 10); // set the cursor
        tft.setTextColor(BLUE); // set the colour of the text
        tft.setTextSize(3); // set the size of the text
        tft.println(graphName);

        // draw outline
        tft.drawLine(originX, originY, (originX + sizeX), originY, graphColor);
        tft.drawLine(originX, originY, originX, (originY - sizeY), graphColor);

        // draw lables
        for (int i = 0; i < numberOfMarks; i++)
        {
          tft.drawLine(mark[i], originY, mark[i], minorSizeY, graphColor);
        }

        // draw numbers
        for (int i = 0; i < 6; i++)
        {
          tft.drawLine(originX, (originY - number[i]), minorSizeX, (originY - number[i]), graphColor);
        }

        // draw number values
        for (int i = 0; i < 6; i++)
        {
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
        tft.setTextSize(1); // set the size of the text
        tft.println("ACASA");


        String graphName = "CO2";


        // draw title
        tft.setCursor(140, 10); // set the cursor
        tft.setTextColor(BLUE); // set the colour of the text
        tft.setTextSize(3); // set the size of the text
        tft.println(graphName);

        // draw outline
        tft.drawLine(originX, originY, (originX + sizeX), originY, graphColor);
        tft.drawLine(originX, originY, originX, (originY - sizeY), graphColor);

        // draw lables
        for (int i = 0; i < numberOfMarks; i++)
        {
          tft.drawLine(mark[i], originY, mark[i], minorSizeY, graphColor);
        }

        // draw numbers
        for (int i = 0; i < 6; i++)
        {
          tft.drawLine(originX, (originY - number[i]), minorSizeX, (originY - number[i]), graphColor);
        }

        // draw number values
        for (int i = 0; i < 6; i++)
        {
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
        tft.setTextSize(1); // set the size of the text
        tft.println("ACASA");


        String graphName = "PM2.5";

        // draw title
        tft.setCursor(130, 10); // set the cursor
        tft.setTextColor(BLUE); // set the colour of the text
        tft.setTextSize(3); // set the size of the text
        tft.println(graphName);

        // draw outline
        tft.drawLine(originX, originY, (originX + sizeX), originY, graphColor);
        tft.drawLine(originX, originY, originX, (originY - sizeY), graphColor);

        // draw lables
        for (int i = 0; i < numberOfMarks; i++)
        {
          tft.drawLine(mark[i], originY, mark[i], minorSizeY, graphColor);
        }

        // draw numbers
        for (int i = 0; i < 6; i++)
        {
          tft.drawLine(originX, (originY - number[i]), minorSizeX, (originY - number[i]), graphColor);
        }

        // draw number values
        for (int i = 0; i < 6; i++)
        {
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
        tft.setTextSize(1); // set the size of the text
        tft.println("ACASA");



        String graphName = "PM 10";

        // draw title
        tft.setCursor(130, 10); // set the cursor
        tft.setTextColor(BLUE); // set the colour of the text
        tft.setTextSize(3); // set the size of the text
        tft.println(graphName);

        // draw outline
        tft.drawLine(originX, originY, (originX + sizeX), originY, graphColor);
        tft.drawLine(originX, originY, originX, (originY - sizeY), graphColor);

        // draw lables
        for (int i = 0; i < numberOfMarks; i++)
        {
          tft.drawLine(mark[i], originY, mark[i], minorSizeY, graphColor);
        }

        // draw numbers
        for (int i = 0; i < 6; i++)
        {
          tft.drawLine(originX, (originY - number[i]), minorSizeX, (originY - number[i]), graphColor);
        }

        // draw number values
        for (int i = 0; i < 6; i++)
        {
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
        tft.setTextSize(1); // set the size of the text
        tft.println("ACASA");



        String graphName = "Umiditate";

        // draw title
        tft.setCursor(90, 10); // set the cursor
        tft.setTextColor(BLUE); // set the colour of the text
        tft.setTextSize(3); // set the size of the text
        tft.println(graphName);

        // draw outline
        tft.drawLine(originX, originY, (originX + sizeX), originY, graphColor);
        tft.drawLine(originX, originY, originX, (originY - sizeY), graphColor);

        // draw lables
        for (int i = 0; i < numberOfMarks; i++)
        {
          tft.drawLine(mark[i], originY, mark[i], minorSizeY, graphColor);
        }

        // draw numbers
        for (int i = 0; i < 6; i++)
        {
          tft.drawLine(originX, (originY - number[i]), minorSizeX, (originY - number[i]), graphColor);
        }

        // draw number values
        for (int i = 0; i < 6; i++)
        {
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
        tft.setTextSize(1); // set the size of the text
        tft.println("ACASA");



        String graphName = "CO";

        // draw title
        tft.setCursor(150, 10); // set the cursor
        tft.setTextColor(BLUE); // set the colour of the text
        tft.setTextSize(3); // set the size of the text
        tft.println(graphName);

        // draw outline
        tft.drawLine(originX, originY, (originX + sizeX), originY, graphColor);
        tft.drawLine(originX, originY, originX, (originY - sizeY), graphColor);

        // draw lables
        for (int i = 0; i < numberOfMarks; i++)
        {
          tft.drawLine(mark[i], originY, mark[i], minorSizeY, graphColor);
        }

        // draw numbers
        for (int i = 0; i < 6; i++)
        {
          tft.drawLine(originX, (originY - number[i]), minorSizeX, (originY - number[i]), graphColor);
        }

        // draw number values
        for (int i = 0; i < 6; i++)
        {
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
        tft.setTextSize(1); // set the size of the text
        tft.println("ACASA");



        String graphName = "NH3";

        // draw title
        tft.setCursor(140, 10); // set the cursor
        tft.setTextColor(BLUE); // set the colour of the text
        tft.setTextSize(3); // set the size of the text
        tft.println(graphName);

        // draw outline
        tft.drawLine(originX, originY, (originX + sizeX), originY, graphColor);
        tft.drawLine(originX, originY, originX, (originY - sizeY), graphColor);

        // draw lables
        for (int i = 0; i < numberOfMarks; i++)
        {
          tft.drawLine(mark[i], originY, mark[i], minorSizeY, graphColor);
        }

        // draw numbers
        for (int i = 0; i < 6; i++)
        {
          tft.drawLine(originX, (originY - number[i]), minorSizeX, (originY - number[i]), graphColor);
        }

        // draw number values
        for (int i = 0; i < 6; i++)
        {
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
        tft.setTextSize(1); // set the size of the text
        tft.println("ACASA");



        String graphName = "NO2";

        // draw title
        tft.setCursor(140, 10); // set the cursor
        tft.setTextColor(BLUE); // set the colour of the text
        tft.setTextSize(3); // set the size of the text
        tft.println(graphName);

        // draw outline
        tft.drawLine(originX, originY, (originX + sizeX), originY, graphColor);
        tft.drawLine(originX, originY, originX, (originY - sizeY), graphColor);

        // draw lables
        for (int i = 0; i < numberOfMarks; i++)
        {
          tft.drawLine(mark[i], originY, mark[i], minorSizeY, graphColor);
        }

        // draw numbers
        for (int i = 0; i < 6; i++)
        {
          tft.drawLine(originX, (originY - number[i]), minorSizeX, (originY - number[i]), graphColor);
        }

        // draw number values
        for (int i = 0; i < 6; i++)
        {
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
        tft.setTextSize(1); // set the size of the text
        tft.println("ACASA");

        String graphName = "SO2 -> X100";


        // draw title
        tft.setCursor(65, 10); // set the cursor
        tft.setTextColor(BLUE); // set the colour of the text
        tft.setTextSize(3); // set the size of the text
        tft.println(graphName);

        // draw outline
        tft.drawLine(originX, originY, (originX + sizeX), originY, graphColor);
        tft.drawLine(originX, originY, originX, (originY - sizeY), graphColor);

        // draw lables
        for (int i = 0; i < numberOfMarks; i++)
        {
          tft.drawLine(marksoo2[i], originY, marksoo2[i], minorSizeY, graphColor);
        }

        // draw numbers
        for (int i = 0; i < 6; i++)
        {
          tft.drawLine(originX, (originY - numbersoo2[i]), minorSizeX, (originY - numbersoo2[i]), graphColor);
        }

        // draw number values
        for (int i = 0; i < 5; i++)
        {
          tft.setCursor((minorSizeX - 30), (numbersoo2[i] + numberSizesoo2));
          tft.setTextColor(graphColor);
          tft.setTextSize(1);
          tft.println(valsoo2[i]);
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
        tft.setTextSize(1); // set the size of the text
        tft.println("ACASA");



        String graphName = "Presiune";

        // draw title
        tft.setCursor(100, 10); // set the cursor
        tft.setTextColor(BLUE); // set the colour of the text
        tft.setTextSize(3); // set the size of the text
        tft.println(graphName);

        // draw outline
        tft.drawLine(originX, originY, (originX + sizeX), originY, graphColor);
        tft.drawLine(originX, originY, originX, (originY - sizeY), graphColor);

        // draw lables
        for (int i = 0; i < numberOfMarks; i++)
        {
          tft.drawLine(mark[i], originY, mark[i], minorSizeY, graphColor);
        }

        // draw numbers
        for (int i = 0; i < 6; i++)
        {
          tft.drawLine(originX, (originY - number[i]), minorSizeX, (originY - number[i]), graphColor);
        }

        // draw number values
        for (int i = 0; i < 6; i++)
        {
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




int ok = 2;
int y = 0;

void setup()
{

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
    Serial.print("ERROR");
    while (1);
  }

  if (!ccs.begin(0x5A)) {
    Serial.println("ERROR");
    while (1);
  }

  tft.setRotation(1);
}




/*
  \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
  ////////////////////////////////\
  ////////TOUCH interfata/////////\
  //////////principala////////////\
  ////////////////////////////////\
  \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
*/




int afi2()
{
  p = tou.getPoint();//Get touch point

  switch (ok)
  {
    case 0:
      {
        break;
      }
    case 1:
      {
        if (p.z > tou.pressureThreshhold) {
          if (p.x > 100   && p.x < 220 && p.y > 570  && p.y < 840 )
          {
            ok++;
            setup();
          }
        }

        break;
      }
    case 2:
      {
        if (p.z > tou.pressureThreshhold) {
          if (p.x > 590   && p.x < 910 && p.y > 380   && p.y < 640 )
          {
            ok--;
            setup();
          }
          if (p.x > 160    && p.x < 480 && p.y > 380  && p.y < 640 )
          {
            ok++;
            setup();
          }
        }

        break;
      }
    case 3:
      {
        if (p.z > tou.pressureThreshhold) {
          if (p.x > 150   && p.x < 220 && p.y > 400 && p.y < 500 )
          {
            ok++;
            setup();
          }

          if (p.x > 840  && p.x < 920 && p.y > 410 && p.y < 520 )
          {
            ok--;
            setup();
          }
        }

        if (p.z > tou.pressureThreshhold) {
          if (p.x > 600   && p.x < 900 && p.y > 550  && p.y < 890 )
          {
            ok = 0;
            y = 1;
            setup();
          }
        }
        if (p.z > tou.pressureThreshhold) {
          if (p.x > 145   && p.x < 460 && p.y > 550  && p.y < 890 )
          {
            ok = 0;
            y = 2;
            setup();
          }
        }
        if (p.z > tou.pressureThreshhold) {
          if (p.x > 400   && p.x < 700 && p.y > 210  && p.y < 410 )
          {
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
          if (p.x > 150   && p.x < 220 && p.y > 400 && p.y < 500 )
          {
            ok++;
            setup();
          }
          if (p.x > 840  && p.x < 920 && p.y > 410 && p.y < 520 )
          {
            ok--;
            setup();

          }
        }

        if (p.z > tou.pressureThreshhold) {
          if (p.x > 600   && p.x < 900 && p.y > 550  && p.y < 890 )
          {
            ok = 0;
            y = 4;
            setup();
          }
        }

        if (p.z > tou.pressureThreshhold) {
          if (p.x > 145   && p.x < 460 && p.y > 550  && p.y < 890 )
          {
            ok = 0;
            y = 5;
            setup();
          }
        }

        if (p.z > tou.pressureThreshhold) {
          if (p.x > 400   && p.x < 700 && p.y > 210  && p.y < 410 )
          {
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
          if (p.x > 150   && p.x < 220 && p.y > 400 && p.y < 500 )
          {
            ok++;
            setup();

          }
          if (p.x > 840  && p.x < 920 && p.y > 410 && p.y < 520 )
          {
            ok--;
            setup();
          }
        }
        if (p.z > tou.pressureThreshhold) {
          if (p.x > 600   && p.x < 900 && p.y > 550  && p.y < 890 )
          {
            ok = 0;
            y = 7;
            setup();
          }
        }
        if (p.z > tou.pressureThreshhold) {
          if (p.x > 145   && p.x < 460 && p.y > 550  && p.y < 890 )
          {
            ok = 0;
            y = 8;
            setup();
          }
        }
        if (p.z > tou.pressureThreshhold) {
          if (p.x > 400   && p.x < 700 && p.y > 210  && p.y < 410 )
          {
            ok = 0;
            y = 9;
            setup();
          }
        }
        break;
      }
    case 6:
      {
        ///TSPoint p = tou.getPoint();  //Get touch point
        if (p.z > tou.pressureThreshhold) {
          if (p.x > 840  && p.x < 920 && p.y > 410 && p.y < 520 )
          {
            ok--;
            setup();
          }


          if (p.z > tou.pressureThreshhold) {
            if (p.x > 230   && p.x < 780 && p.y > 560  && p.y < 820 )
            {
              ok = 0;
              y = 10;
              setup();
            }
          }
          if (p.z > tou.pressureThreshhold) {
            if (p.x > 230   && p.x < 780 && p.y > 230  && p.y < 480 )
            {
              ok = 0;
              y = 11;
              setup();
            }
          }

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




  switch (y)
  {
    case 0:
      {
        break;
      }
    case 1:
      {
        ///stg
        if (p.z > tou.pressureThreshhold) {
          if (p.x > 840   && p.x < 950 && p.y > 750  && p.y < 900 )
          {
            if (y == 1)
              y = 11;
            else
              y--;
            setup();
          }
        }
        ///dr
        if (p.z > tou.pressureThreshhold) {
          if (p.x > 100   && p.x < 220 && p.y > 750  && p.y < 900 )
          {
            if (y == 11)
              y = 1;
            else
              y++;
            setup();
          }
        }
        ///home
        if (p.z > tou.pressureThreshhold) {
          if (p.x > 820   && p.x < 950 && p.y > 130  && p.y < 260 )
          {
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
          if (p.x > 840   && p.x < 950 && p.y > 750  && p.y < 900 )
          {
            if (y == 1)
              y = 11;
            else
              y--;
            setup();
          }
        }
        ///dr
        if (p.z > tou.pressureThreshhold) {
          if (p.x > 100   && p.x < 220 && p.y > 750  && p.y < 900 )
          {
            if (y == 11)
              y = 1;
            else
              y++;
            setup();
          }
        }
        ///home
        if (p.z > tou.pressureThreshhold) {
          if (p.x > 820   && p.x < 950 && p.y > 130  && p.y < 260 )
          {
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
          if (p.x > 840   && p.x < 950 && p.y > 750  && p.y < 900 )
          {
            if (y == 1)
              y = 11;
            else
              y--;
            setup();
          }
        }
        ///dr
        if (p.z > tou.pressureThreshhold) {
          if (p.x > 100   && p.x < 220 && p.y > 750  && p.y < 900 )
          {
            if (y == 11)
              y = 1;
            else
              y++;
            setup();
          }
        }
        ///home
        if (p.z > tou.pressureThreshhold) {
          if (p.x > 820   && p.x < 950 && p.y > 130  && p.y < 260 )
          {
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
          if (p.x > 840   && p.x < 950 && p.y > 750  && p.y < 900 )
          {
            if (y == 1)
              y = 11;
            else
              y--;
            setup();
          }
        }
        ///dr
        if (p.z > tou.pressureThreshhold) {
          if (p.x > 100   && p.x < 220 && p.y > 750  && p.y < 900 )
          {
            if (y == 11)
              y = 1;
            else
              y++;
            setup();
          }
        }
        ///home
        if (p.z > tou.pressureThreshhold) {
          if (p.x > 820   && p.x < 950 && p.y > 130  && p.y < 260 )
          {
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
          if (p.x > 840   && p.x < 950 && p.y > 750  && p.y < 900 )
          {
            if (y == 1)
              y = 11;
            else
              y--;
            setup();
          }
        }
        ///dr
        if (p.z > tou.pressureThreshhold) {
          if (p.x > 100   && p.x < 220 && p.y > 750  && p.y < 900 )
          {
            if (y == 11)
              y = 1;
            else
              y++;
            setup();
          }
        }
        ///home
        if (p.z > tou.pressureThreshhold) {
          if (p.x > 820   && p.x < 950 && p.y > 130  && p.y < 260 )
          {
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
          if (p.x > 840   && p.x < 950 && p.y > 750  && p.y < 900 )
          {
            if (y == 1)
              y = 11;
            else
              y--;
            setup();
          }
        }
        ///dr
        if (p.z > tou.pressureThreshhold) {
          if (p.x > 100   && p.x < 220 && p.y > 750  && p.y < 900 )
          {
            if (y == 11)
              y = 1;
            else
              y++;
            setup();
          }
        }
        ///home
        if (p.z > tou.pressureThreshhold) {
          if (p.x > 820   && p.x < 950 && p.y > 130  && p.y < 260 )
          {
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
          if (p.x > 840   && p.x < 950 && p.y > 750  && p.y < 900 )
          {
            if (y == 1)
              y = 11;
            else
              y--;
            setup();
          }
        }
        ///dr
        if (p.z > tou.pressureThreshhold) {
          if (p.x > 100   && p.x < 220 && p.y > 750  && p.y < 900 )
          {
            if (y == 11)
              y = 1;
            else
              y++;
            setup();
          }
        }
        ///home
        if (p.z > tou.pressureThreshhold) {
          if (p.x > 820   && p.x < 950 && p.y > 130  && p.y < 260 )
          {
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
          if (p.x > 840   && p.x < 950 && p.y > 750  && p.y < 900 )
          {
            if (y == 1)
              y = 11;
            else
              y--;
            setup();
          }
        }
        ///dr
        if (p.z > tou.pressureThreshhold) {
          if (p.x > 100   && p.x < 220 && p.y > 750  && p.y < 900 )
          {
            if (y == 11)
              y = 1;
            else
              y++;
            setup();
          }
        }
        ///home
        if (p.z > tou.pressureThreshhold) {
          if (p.x > 820   && p.x < 950 && p.y > 130  && p.y < 260 )
          {
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
          if (p.x > 840   && p.x < 950 && p.y > 750  && p.y < 900 )
          {
            if (y == 1)
              y = 11;
            else
              y--;
            setup();
          }
        }
        ///dr
        if (p.z > tou.pressureThreshhold) {
          if (p.x > 100   && p.x < 220 && p.y > 750  && p.y < 900 )
          {
            if (y == 11)
              y = 1;
            else
              y++;
            setup();
          }
        }
        ///home
        if (p.z > tou.pressureThreshhold) {
          if (p.x > 820   && p.x < 950 && p.y > 130  && p.y < 260 )
          {
            y = 0;
            ok = 5;
            setup();
          }
        }
        break;
      }
    case 10:
      {
        ///stg
        if (p.z > tou.pressureThreshhold) {
          if (p.x > 840   && p.x < 950 && p.y > 750  && p.y < 900 )
          {
            if (y == 1)
              y = 11;
            else
              y--;
            setup();
          }
        }
        ///dr
        if (p.z > tou.pressureThreshhold) {
          if (p.x > 100   && p.x < 220 && p.y > 750  && p.y < 900 )
          {
            if (y == 11)
              y = 1;
            else
              y++;
            setup();
          }
        }
        ///home
        if (p.z > tou.pressureThreshhold) {
          if (p.x > 820   && p.x < 950 && p.y > 130  && p.y < 260 )
          {
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
          if (p.x > 840   && p.x < 950 && p.y > 750  && p.y < 900 )
          {
            if (y == 1)
              y = 11;
            else
              y--;
            setup();
          }
        }
        ///dr
        if (p.z > tou.pressureThreshhold) {
          if (p.x > 100   && p.x < 220 && p.y > 750  && p.y < 900 )
          {
            if (y == 11)
              y = 1;
            else
              y++;
            setup();
          }
        }
        ///home
        if (p.z > tou.pressureThreshhold) {
          if (p.x > 820   && p.x < 950 && p.y > 130  && p.y < 260 )
          {
            y = 0;
            ok = 6;
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




int TVO()
{
  if (ccs.available())
    if (!ccs.readData())
    {
      return ccs.getTVOC();
    }
    else {
      Serial.println("ERROR!");
      while (1);
    }
}

int temperature()
{

  return (bme.readTemperature() - 6);

}

int presure()
{

  return (bme.readPressure() / 100.0F);
}


int humidity()
{

  return (bme.readHumidity());

}



int CO22()
{
  ser_co2.listen();

  ser_co2.write(hexdata, 9);

  ///if(ser_co2.isListening())
  for (int i = 0; i < 9; i++)
  {
    if (ser_co2.available() > 0)
    {
      long  hi, lo, CO2 = 0;
      int ch = ser_co2.read();

      if (i == 2) {
        hi = ch;    //High concentration
      }
      if (i == 3) {
        lo = ch;    //Low concentration
      }
      if (i == 8)
      {
        CO2 = hi * 256 + lo; //CO2 concentration
        ///Serial.println(CO2);
        return CO2;

      }
    }
  }
}

int pm2 = 0, pm10 = 0;
void Sds()
{

  Serial1.write(hexdata, 9);
  for (int i = 0; i <= 9; i++)
  {
    if (Serial1.available() > 0)
    {
      long hi1, lo1, PM2 ;
      long hi2, lo2, PM10 ;
      int che = Serial1.read();

      if (i == 3) {
        hi1 = che;    //High concentration
      }
      if (i == 2) {
        lo1 = che;    //Low concentration
      }

      if (i == 5) {
        hi2 = che;    //High concentration
      }
      if (i == 4) {
        lo2 = che;    //Low concentration
      }

      if (i == 8) {
        pm2 = (hi1 * 256 + lo1) / 10;
        pm10 = (hi2 * 256 + lo2) / 10;

      }
    }
  }
}



int COo()
{

  return (max_analog_steps * max_volts / analogRead(A8) );

}

int NH333()
{

  return (max_analog_steps * max_volts / analogRead(A9) );

}

int NO222()
{

  return (max_analog_steps * max_volts / analogRead(A10) );

}


float so2()
{

  ///TIA 100 kv/A
  ///////200mV
  ///A11 Vgas
  //A12 Vref

  ///Voffset=0
  ///Vgas0=Vref+Voffset
  float Voffset = 0, Vgas = 0, Vref = 0, Vgas0 = 0;
  double M = 0, Cx = 0;

  Vgas = analogRead(A11);
  ///Serial.print(Vgas);
  ///Serial.print("   ");

  Vref = analogRead(A12);
  ///Serial.print(Vref);
  ///Serial.print("   ");


  Vgas0 = Vref + Voffset;
  M = 0.26;///*10^-4
  ///Serial.println(M);

  Cx = ((Vgas - Vgas0) / M);
  if (Cx < 0)
    Cx = -Cx;
  return (Cx / 10000);
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
void graphTVOC()
{
  float e = 0;
  e = ccs.getTVOC();

  float TVOC = 0;
  if (e >= 0)
  {
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


  if (blockPosTVOC < 8)
  {
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
    if (valuePosTVOC != 0)
    {
      tft.drawLine(mark[valuePosTVOC], locationBlockTVOC[valuePosTVOC], mark[(valuePosTVOC - 1)], locationBlockTVOC[(valuePosTVOC - 1)], lineColor);
    }

    blockPosTVOC++;
  }
  else
  {
    // clear the graph's canvas
    tft.fillRect((originX + 2), (originY - sizeY), sizeX, sizeY, WHITE);

    // map the value - current point
    locationBlockTVOC[valuePosTVOC] = map(TVOC, 0, graphRangeTVOC, originY, (originY - sizeY));

    // draw point - current point
    tft.fillRect((mark[7]), (locationBlockTVOC[valuePosTVOC] - 1), markSizeTVOC, markSizeTVOC, pointColor);

    // draw all points
    for (int i = 0; i < 8; i++)
    {
      tft.fillRect((mark[(blockPosTVOC - (i + 1))] - 1), (locationBlockTVOC[(valuePosTVOC - i)] - 1), markSizeTVOC, markSizeTVOC, pointColor);
    }

    // draw all the lines
    for (int i = 0; i < 7; i++)
    {
      tft.drawLine(mark[blockPosTVOC - (i + 1)], locationBlockTVOC[valuePosTVOC - i], mark[blockPosTVOC - (i + 2)], locationBlockTVOC[valuePosTVOC - (i + 1)], lineColor);
    }

    // change time lables
    for (int i = 0; i <= 7; i++)
    {
      tft.setCursor((mark[(7 - i)] - 5), (originY + 16));
      tft.setTextColor(graphColor, WHITE);
      tft.setTextSize(1);
      tft.println(timeBlockTVOC[valuePosTVOC - i]);
    }
  }

  valuePosTVOC++;

  if (valuePosTVOC == 49 || blockPosTVOC == 49)
  {
    for (int i = 0; i <= 50; i++)
    {
      locationBlockTVOC[i] = 0;
      valueBlockTVOC[i] = 0;
    }
    valuePosTVOC = 0;
    blockPosTVOC = 0;
  }
  if (e2 > 1000)
    e2 = 0;


  delay(1000);
}



int e1 = 0;
void graphtemp()
{
  if ( temperature() <= 42)
    temp =  temperature();
  else
    temp = 42;


  Serial.println(temp);
  timeBlocktemp[valuePostemp] = e1;
  e1 = e1 + 1;

  valueBlocktemp[valuePostemp] = temp;


  if (blockPostemp < 8)
  {
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
    if (valuePostemp != 0)
    {
      tft.drawLine(mark[valuePostemp], locationBlocktemp[valuePostemp], mark[(valuePostemp - 1)], locationBlocktemp[(valuePostemp - 1)], lineColor);
    }

    blockPostemp++;
  }
  else
  {
    // clear the graph's canvas
    tft.fillRect((originX + 2), (originY - sizeY), sizeX, sizeY, WHITE);

    // map the value - current point
    locationBlocktemp[valuePostemp] = map(temp, 0, graphRangetemp, originY, (originY - sizeY));

    // draw point - current point
    tft.fillRect((mark[7]), (locationBlocktemp[valuePostemp] - 1), markSizetemp, markSizetemp, pointColor);

    // draw all points
    for (int i = 0; i < 8; i++)
    {
      tft.fillRect((mark[(blockPostemp - (i + 1))] - 1), (locationBlocktemp[(valuePostemp - i)] - 1), markSizetemp, markSizetemp, pointColor);
    }

    // draw all the lines
    for (int i = 0; i < 7; i++)
    {
      tft.drawLine(mark[blockPostemp - (i + 1)], locationBlocktemp[valuePostemp - i], mark[blockPostemp - (i + 2)], locationBlocktemp[valuePostemp - (i + 1)], lineColor);
    }

    // change time lables
    for (int i = 0; i <= 7; i++)
    {
      tft.setCursor((mark[(7 - i)] - 5), (originY + 16));
      tft.setTextColor(graphColor, WHITE);
      tft.setTextSize(1);
      tft.println(timeBlocktemp[valuePostemp - i]);
    }
  }

  valuePostemp++;

  if (valuePostemp == 49 || blockPostemp == 49)
  {
    for (int i = 0; i <= 50; i++)
    {
      locationBlocktemp[i] = 0;
      valueBlocktemp[i] = 0;
    }
    valuePostemp = 0;
    blockPostemp = 0;
  }
  if (e1 > 1000)
    e1 = 0;


  delay(1000);
}



int e = 0;
void graphHUM()
{
  if ( humidity() <= 100)
    HUM =   humidity();
  else
    HUM = 100;


  Serial.println(HUM);
  timeBlockHUM[valuePosHUM] = e;
  e = e + 1;

  valueBlockHUM[valuePosHUM] = HUM;



  if (blockPosHUM < 8)
  {
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
    if (valuePosHUM != 0)
    {
      tft.drawLine(mark[valuePosHUM], locationBlockHUM[valuePosHUM], mark[(valuePosHUM - 1)], locationBlockHUM[(valuePosHUM - 1)], lineColor);
    }

    blockPosHUM++;
  }
  else
  {
    // clear the graph's canvas
    tft.fillRect((originX + 2), (originY - sizeY), sizeX, sizeY, WHITE);

    // map the value - current point
    locationBlockHUM[valuePosHUM] = map(HUM, 0, graphRangeHUM, originY, (originY - sizeY));

    // draw point - current point
    tft.fillRect((mark[7]), (locationBlockHUM[valuePosHUM] - 1), markSizeHUM, markSizeHUM, pointColor);

    // draw all points
    for (int i = 0; i < 8; i++)
    {
      tft.fillRect((mark[(blockPosHUM - (i + 1))] - 1), (locationBlockHUM[(valuePosHUM - i)] - 1), markSizeHUM, markSizeHUM, pointColor);
    }

    // draw all the lines
    for (int i = 0; i < 7; i++)
    {
      tft.drawLine(mark[blockPosHUM - (i + 1)], locationBlockHUM[valuePosHUM - i], mark[blockPosHUM - (i + 2)], locationBlockHUM[valuePosHUM - (i + 1)], lineColor);
    }

    // change time lables
    for (int i = 0; i <= 7; i++)
    {
      tft.setCursor((mark[(7 - i)] - 5), (originY + 16));
      tft.setTextColor(graphColor, WHITE);
      tft.setTextSize(1);
      tft.println(timeBlockHUM[valuePosHUM - i]);
    }
  }

  valuePosHUM++;

  if (valuePosHUM == 49 || blockPosHUM == 49)
  {
    for (int i = 0; i <= 50; i++)
    {
      locationBlockHUM[i] = 0;
      valueBlockHUM[i] = 0;
    }
    valuePosHUM = 0;
    blockPosHUM = 0;
  }
  if (e > 1000)
    e = 0;

  delay(1000);

}


int e3 = 0;
void graphPRESU()
{
  if (presure() <= 6000)
    PRESU = presure();
  else
    PRESU = 6000;


  Serial.println(PRESU);
  timeBlockPRESU[valuePosPRESU] = e3;
  e3 = e3 + 1;

  valueBlockPRESU[valuePosPRESU] = PRESU;



  if (blockPosPRESU < 8)
  {
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
    if (valuePosPRESU != 0)
    {
      tft.drawLine(mark[valuePosPRESU], locationBlockPRESU[valuePosPRESU], mark[(valuePosPRESU - 1)], locationBlockPRESU[(valuePosPRESU - 1)], lineColor);
    }

    blockPosPRESU++;
  }
  else
  {
    // clear the graph's canvas
    tft.fillRect((originX + 2), (originY - sizeY), sizeX, sizeY, WHITE);

    // map the value - current point
    locationBlockPRESU[valuePosPRESU] = map(PRESU, 0, graphRangePRESU, originY, (originY - sizeY));

    // draw point - current point
    tft.fillRect((mark[7]), (locationBlockPRESU[valuePosPRESU] - 1), markSizePRESU, markSizePRESU, pointColor);

    // draw all points
    for (int i = 0; i < 8; i++)
    {
      tft.fillRect((mark[(blockPosPRESU - (i + 1))] - 1), (locationBlockPRESU[(valuePosPRESU - i)] - 1), markSizePRESU, markSizePRESU, pointColor);
    }

    // draw all the lines
    for (int i = 0; i < 7; i++)
    {
      tft.drawLine(mark[blockPosPRESU - (i + 1)], locationBlockPRESU[valuePosPRESU - i], mark[blockPosPRESU - (i + 2)], locationBlockPRESU[valuePosPRESU - (i + 1)], lineColor);
    }

    // change time lables
    for (int i = 0; i <= 7; i++)
    {
      tft.setCursor((mark[(7 - i)] - 5), (originY + 16));
      tft.setTextColor(graphColor, WHITE);
      tft.setTextSize(1);
      tft.println(timeBlockPRESU[valuePosPRESU - i]);
    }
  }

  valuePosPRESU++;

  if (valuePosPRESU == 49 || blockPosPRESU == 49)
  {
    for (int i = 0; i <= 50; i++)
    {
      locationBlockPRESU[i] = 0;
      valueBlockPRESU[i] = 0;
    }
    valuePosPRESU = 0;
    blockPosPRESU = 0;
  }
  if (e3 > 1000)
    e3 = 0;


  delay(1000);
}



int e6 = 0;
void graphCO2()
{
  int CO2 = 0;
  int f = CO22();
  if (f < 10000)
    CO2 = f;
  else
    CO2 = 9990;


  Serial.println(CO2);

  timeBlockCO2[valuePosCO2] = e6;
  e6 = e6 + 1;

  valueBlockCO2[valuePosCO2] = CO2;


  if (blockPosCO2 < 8)
  {
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
    if (valuePosCO2 != 0)
    {
      tft.drawLine(mark[valuePosCO2], locationBlockCO2[valuePosCO2], mark[(valuePosCO2 - 1)], locationBlockCO2[(valuePosCO2 - 1)], lineColor);
    }

    blockPosCO2++;
  }
  else
  {
    // clear the graph's canvas
    tft.fillRect((originX + 2), (originY - sizeY), sizeX, sizeY, WHITE);

    // map the value - current point
    locationBlockCO2[valuePosCO2] = map(CO2, 0, graphRangeCO2, originY, (originY - sizeY));

    // draw point - current point
    tft.fillRect((mark[7]), (locationBlockCO2[valuePosCO2] - 1), markSizeCO2, markSizeCO2, pointColor);

    // draw all points
    for (int i = 0; i < 8; i++)
    {
      tft.fillRect((mark[(blockPosCO2 - (i + 1))] - 1), (locationBlockCO2[(valuePosCO2 - i)] - 1), markSizeCO2, markSizeCO2, pointColor);
    }

    // draw all the lines
    for (int i = 0; i < 7; i++)
    {
      tft.drawLine(mark[blockPosCO2 - (i + 1)], locationBlockCO2[valuePosCO2 - i], mark[blockPosCO2 - (i + 2)], locationBlockCO2[valuePosCO2 - (i + 1)], lineColor);
    }

    // change time lables
    for (int i = 0; i <= 7; i++)
    {
      tft.setCursor((mark[(7 - i)] - 5), (originY + 16));
      tft.setTextColor(graphColor, WHITE);
      tft.setTextSize(1);
      tft.println(timeBlockCO2[valuePosCO2 - i]);
    }
  }

  valuePosCO2++;


  if (valuePosCO2 == 49 || blockPosCO2 == 49)
  {
    for (int i = 0; i <= 50; i++)
    {
      locationBlockCO2[i] = 0;
      valueBlockCO2[i] = 0;
    }
    valuePosCO2 = 0;
    blockPosCO2 = 0;
  }
  if (e6 > 1000)
    e6 = 0;


  delay(1000);
}


int e7 = 0;
void graphNO2()
{

  if ( NO222() / 10 <= 10)
    NO22 =  NO222() / 10;
  else
    NO22 = 10;


  Serial.println(NO22);
  timeBlockNO22[valuePosNO22] = e7;
  e7 = e7 + 1;

  valueBlockNO22[valuePosNO22] = NO22;


  if (blockPosNO22 < 8)
  {
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
    if (valuePosNO22 != 0)
    {
      tft.drawLine(mark[valuePosNO22], locationBlockNO22[valuePosNO22], mark[(valuePosNO22 - 1)], locationBlockNO22[(valuePosNO22 - 1)], lineColor);
    }

    blockPosNO22++;
  }
  else
  {
    // clear the graph's canvas
    tft.fillRect((originX + 2), (originY - sizeY), sizeX, sizeY, WHITE);

    // map the value - current point
    locationBlockNO22[valuePosNO22] = map(NO22, 0, graphRangeNO22, originY, (originY - sizeY));

    // draw point - current point
    tft.fillRect((mark[7]), (locationBlockNO22[valuePosNO22] - 1), markSizeNO22, markSizeNO22, pointColor);

    // draw all points
    for (int i = 0; i < 8; i++)
    {
      tft.fillRect((mark[(blockPosNO22 - (i + 1))] - 1), (locationBlockNO22[(valuePosNO22 - i)] - 1), markSizeNO22, markSizeNO22, pointColor);
    }

    // draw all the lines
    for (int i = 0; i < 7; i++)
    {
      tft.drawLine(mark[blockPosNO22 - (i + 1)], locationBlockNO22[valuePosNO22 - i], mark[blockPosNO22 - (i + 2)], locationBlockNO22[valuePosNO22 - (i + 1)], lineColor);
    }

    // change time lables
    for (int i = 0; i <= 7; i++)
    {
      tft.setCursor((mark[(7 - i)] - 5), (originY + 16));
      tft.setTextColor(graphColor, WHITE);
      tft.setTextSize(1);
      tft.println(timeBlockNO22[valuePosNO22 - i]);
    }
  }

  valuePosNO22++;


  if (valuePosNO22 == 49 || blockPosNO22 == 49)
  {
    for (int i = 0; i <= 50; i++)
    {
      locationBlockNO22[i] = 0;
      valueBlockNO22[i] = 0;
    }
    valuePosNO22 = 0;
    blockPosNO22 = 0;
  }
  if (e7 > 1000)
    e7 = 0;

  delay(1000);
}


int e8 = 0;
void graphNH3()
{

  if (NH333() <= 5000)
    NH33 =   NH333();
  else
    NH33 = 5000;


  Serial.println(NH33);
  timeBlockNH33[valuePosNH33] = e8;
  e8 = e8 + 1;

  valueBlockNH33[valuePosNH33] = NH33;


  if (blockPosNH33 < 8)
  {
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
    if (valuePosNH33 != 0)
    {
      tft.drawLine(mark[valuePosNH33], locationBlockNH33[valuePosNH33], mark[(valuePosNH33 - 1)], locationBlockNH33[(valuePosNH33 - 1)], lineColor);
    }

    blockPosNH33++;
  }
  else
  {
    // clear the graph's canvas
    tft.fillRect((originX + 2), (originY - sizeY), sizeX, sizeY, WHITE);

    // map the value - current point
    locationBlockNH33[valuePosNH33] = map(NH33, 0, graphRangeNH33, originY, (originY - sizeY));

    // draw point - current point
    tft.fillRect((mark[7]), (locationBlockNH33[valuePosNH33] - 1), markSizeNH33, markSizeNH33, pointColor);

    // draw all points
    for (int i = 0; i < 8; i++)
    {
      tft.fillRect((mark[(blockPosNH33 - (i + 1))] - 1), (locationBlockNH33[(valuePosNH33 - i)] - 1), markSizeNH33, markSizeNH33, pointColor);
    }

    // draw all the lines
    for (int i = 0; i < 7; i++)
    {
      tft.drawLine(mark[blockPosNH33 - (i + 1)], locationBlockNH33[valuePosNH33 - i], mark[blockPosNH33 - (i + 2)], locationBlockNH33[valuePosNH33 - (i + 1)], lineColor);
    }

    // change time lables
    for (int i = 0; i <= 7; i++)
    {
      tft.setCursor((mark[(7 - i)] - 5), (originY + 16));
      tft.setTextColor(graphColor, WHITE);
      tft.setTextSize(1);
      tft.println(timeBlockNH33[valuePosNH33 - i]);
    }
  }

  valuePosNH33++;

  if (valuePosNH33 == 49 || blockPosNH33 == 49)
  {
    for (int i = 0; i <= 50; i++)
    {
      locationBlockNH33[i] = 0;
      valueBlockNH33[i] = 0;
    }
    valuePosNH33 = 0;
    blockPosNH33 = 0;
  }
  if (e8 > 1000)
    e8 = 0;

  delay(1000);
}


int e9 = 0;
void graphCO()
{
  if ( COo() <= 1000)
    COc =  COo();
  else
    COc = 1000;

  Serial.println(COc);
  timeBlockCO[valuePosCO] = e9;
  e9 = e9 + 1;

  valueBlockCO[valuePosCO] = COc;


  if (blockPosCO < 8)
  {
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
    if (valuePosCO != 0)
    {
      tft.drawLine(mark[valuePosCO], locationBlockCO[valuePosCO], mark[(valuePosCO - 1)], locationBlockCO[(valuePosCO - 1)], lineColor);
    }

    blockPosCO++;
  }
  else
  {
    // clear the graph's canvas
    tft.fillRect((originX + 2), (originY - sizeY), sizeX, sizeY, WHITE);

    // map the value - current point
    locationBlockCO[valuePosCO] = map(COc, 0, graphRangeCO, originY, (originY - sizeY));

    // draw point - current point
    tft.fillRect((mark[7]), (locationBlockCO[valuePosCO] - 1), markSizeCO, markSizeCO, pointColor);

    // draw all points
    for (int i = 0; i < 8; i++)
    {
      tft.fillRect((mark[(blockPosCO - (i + 1))] - 1), (locationBlockCO[(valuePosCO - i)] - 1), markSizeCO, markSizeCO, pointColor);
    }

    // draw all the lines
    for (int i = 0; i < 7; i++)
    {
      tft.drawLine(mark[blockPosCO - (i + 1)], locationBlockCO[valuePosCO - i], mark[blockPosCO - (i + 2)], locationBlockCO[valuePosCO - (i + 1)], lineColor);
    }

    // change time lables
    for (int i = 0; i <= 7; i++)
    {
      tft.setCursor((mark[(7 - i)] - 5), (originY + 16));
      tft.setTextColor(graphColor, WHITE);
      tft.setTextSize(1);
      tft.println(timeBlockCO[valuePosCO - i]);
    }
  }

  valuePosCO++;


  if (valuePosCO == 49 || blockPosCO == 49)
  {
    for (int i = 0; i <= 50; i++)
    {
      locationBlockCO[i] = 0;
      valueBlockCO[i] = 0;
    }
    valuePosCO = 0;
    blockPosCO = 0;
  }
  if (e9 > 1000)
    e9 = 0;


  delay(1000);
}



int e10 = 0;
void graphPM25()
{

  Sds();

  if ( pm2 <= 10002)
    PM25 = pm2;
  else
    PM25 = 10002;

  Serial.println(PM25);
  timeBlockPM25[valuePosPM25] = e10;
  e10 = e10 + 1;

  valueBlockPM25[valuePosPM25] = PM25;


  if (blockPosPM25 < 8)
  {
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
    if (valuePosPM25 != 0)
    {
      tft.drawLine(mark[valuePosPM25], locationBlockPM25[valuePosPM25], mark[(valuePosPM25 - 1)], locationBlockPM25[(valuePosPM25 - 1)], lineColor);
    }

    blockPosPM25++;
  }
  else
  {
    // clear the graph's canvas
    tft.fillRect((originX + 2), (originY - sizeY), sizeX, sizeY, WHITE);

    // map the value - current point
    locationBlockPM25[valuePosPM25] = map(PM25, 0, graphRangePM25, originY, (originY - sizeY));

    // draw point - current point
    tft.fillRect((mark[7]), (locationBlockPM25[valuePosPM25] - 1), markSizePM25, markSizePM25, pointColor);

    // draw all points
    for (int i = 0; i < 8; i++)
    {
      tft.fillRect((mark[(blockPosPM25 - (i + 1))] - 1), (locationBlockPM25[(valuePosPM25 - i)] - 1), markSizePM25, markSizePM25, pointColor);
    }

    // draw all the lines
    for (int i = 0; i < 7; i++)
    {
      tft.drawLine(mark[blockPosPM25 - (i + 1)], locationBlockPM25[valuePosPM25 - i], mark[blockPosPM25 - (i + 2)], locationBlockPM25[valuePosPM25 - (i + 1)], lineColor);
    }

    // change time lables
    for (int i = 0; i <= 7; i++)
    {
      tft.setCursor((mark[(7 - i)] - 5), (originY + 16));
      tft.setTextColor(graphColor, WHITE);
      tft.setTextSize(1);
      tft.println(timeBlockPM25[valuePosPM25 - i]);
    }
  }

  valuePosPM25++;

  if (valuePosPM25 == 49 || blockPosPM25 == 49)
  {
    for (int i = 0; i <= 50; i++)
    {
      locationBlockPM25[i] = 0;
      valueBlockPM25[i] = 0;
    }
    valuePosPM25 = 0;
    blockPosPM25 = 0;
  }
  if (e10 > 1000)
    e10 = 0;

  delay(1000);
}



int e11 = 0;
void graphPM10()
{
  Sds();
  if ( pm10 <= 10002)
    PM10 = pm10;
  else
    PM10 = 10000;


  Serial.println(PM10);
  timeBlockPM10[valuePosPM10] = e11;
  e11 = e11 + 1;

  valueBlockPM10[valuePosPM10] = PM10;


  if (blockPosPM10 < 8)
  {
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
    if (valuePosPM10 != 0)
    {
      tft.drawLine(mark[valuePosPM10], locationBlockPM10[valuePosPM10], mark[(valuePosPM10 - 1)], locationBlockPM10[(valuePosPM10 - 1)], lineColor);
    }

    blockPosPM10++;
  }
  else
  {

    // clear the graph's canvas
    tft.fillRect((originX + 2), (originY - sizeY), sizeX, sizeY, WHITE);

    // map the value - current point
    locationBlockPM10[valuePosPM10] = map(PM10, 0, graphRangePM10, originY, (originY - sizeY));

    // draw point - current point
    tft.fillRect((mark[7]), (locationBlockPM10[valuePosPM10] - 1), markSizePM10, markSizePM10, pointColor);

    // draw all points
    for (int i = 0; i < 8; i++)
    {
      tft.fillRect((mark[(blockPosPM10 - (i + 1))] - 1), (locationBlockPM10[(valuePosPM10 - i)] - 1), markSizePM10, markSizePM10, pointColor);
    }

    // draw all the lines
    for (int i = 0; i < 7; i++)
    {
      tft.drawLine(mark[blockPosPM10 - (i + 1)], locationBlockPM10[valuePosPM10 - i], mark[blockPosPM10 - (i + 2)], locationBlockPM10[valuePosPM10 - (i + 1)], lineColor);
    }

    // change time lables
    for (int i = 0; i <= 7; i++)
    {
      tft.setCursor((mark[(7 - i)] - 5), (originY + 16));
      tft.setTextColor(graphColor, WHITE);
      tft.setTextSize(1);
      tft.println(timeBlockPM10[valuePosPM10 - i]);
    }
  }

  valuePosPM10++;



  if (valuePosPM10 == 49 || blockPosPM10 == 49)
  {
    for (int i = 0; i <= 50; i++)
    {
      locationBlockPM10[i] = 0;
      valueBlockPM10[i] = 0;
    }
    valuePosPM10 = 0;
    blockPosPM10 = 0;
  }
  if (e11 > 1000)
    e11 = 0;


  delay(1000);
}

int e12 = 0;
void graphsoo2()
{

  float soo2 = so2() * 100;
  Serial.println(soo2);

  timeBlocksoo2[valuePossoo2] = e12;
  e12++;

  if (soo2 >= 0)
  {
    if (soo2 <= 200)
      valueBlocksoo2[valuePossoo2] = soo2;
    else
      valueBlocksoo2[valuePossoo2] = 198;
  }
  else
    valueBlocksoo2[valuePossoo2] = 0;

  if (blockPossoo2 < 8)
  {
    // print the time
    tft.setCursor((marksoo2[valuePossoo2] - 5), (originY + 16));
    tft.setTextColor(graphColor, WHITE);
    tft.setTextSize(1);
    tft.println(timeBlocksoo2[valuePossoo2]);

    // map the value
    locationBlocksoo2[valuePossoo2] = map(soo2, 0, graphRangesoo2, originY, (originY - sizeY));

    // draw point
    tft.fillRect((marksoo2[valuePossoo2] - 1), (locationBlocksoo2[valuePossoo2] - 1), markSizesoo2, markSizesoo2, pointColor);

    // try connecting to previous point
    if (valuePossoo2 != 0)
    {
      tft.drawLine(marksoo2[valuePossoo2], locationBlocksoo2[valuePossoo2], marksoo2[(valuePossoo2 - 1)], locationBlocksoo2[(valuePossoo2 - 1)], lineColor);
    }

    blockPossoo2++;
  }
  else
  {
    // clear the graph's canvas
    tft.fillRect((originX + 2), (originY - sizeY), sizeX, sizeY, WHITE);

    // map the value - current point
    locationBlocksoo2[valuePossoo2] = map(soo2, 0, graphRangesoo2, originY, (originY - sizeY));

    // draw point - current point
    tft.fillRect((marksoo2[7]), (locationBlocksoo2[valuePossoo2] - 1), markSizesoo2, markSizesoo2, pointColor);

    // draw all points
    for (int i = 0; i < 8; i++)
    {
      tft.fillRect((marksoo2[(blockPossoo2 - (i + 1))] - 1), (locationBlocksoo2[(valuePossoo2 - i)] - 1), markSizesoo2, markSizesoo2, pointColor);
    }

    // draw all the lines
    for (int i = 0; i < 7; i++)
    {
      tft.drawLine(marksoo2[blockPossoo2 - (i + 1)], locationBlocksoo2[valuePossoo2 - i], marksoo2[blockPossoo2 - (i + 2)], locationBlocksoo2[valuePossoo2 - (i + 1)], lineColor);
    }

    // change time lables
    for (int i = 0; i <= 7; i++)
    {
      tft.setCursor((marksoo2[(7 - i)] - 5), (originY + 16));
      tft.setTextColor(graphColor, WHITE);
      tft.setTextSize(1);
      tft.println(timeBlocksoo2[valuePossoo2 - i]);
    }
  }

  valuePossoo2++;



  if (valuePossoo2 == 49 || blockPossoo2 == 49)
  {
    for (int i = 0; i <= 50; i++)
    {
      locationBlocksoo2[i] = 0;
      valueBlocksoo2[i] = 0;
    }
    valuePossoo2 = 0;
    blockPosPM10 = 0;
  }
  if (e12 > 1000)
    e12 = 0;


  delay(1000);
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

int pres = 0;

void param()
{
  if (ok > 2)
  {
    q++;
    if (q % 10000 == 0)
    {
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

  int tmp = temperature();
  int e = TVO();
  int r = CO22();
  Sds();
  int hu = humidity();
  int afisare_CO = COo();
  int afisare_NH3 = NH333();
  int no = NO222() / 10;
  int presi = presure();


  ///////////////////////////////
  ///////////////////////////////
  ///////////////////////////////
  ///////////////////////////////

  switch (ok)
  {
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

        if (tmpee >= 10 && tmp < 10)
        {
          tft.setCursor(50, 60);
          tft.setTextColor(ORANGE, ORANGE);
          tft.print("000000");
          tft.setCursor(48, 60);
          tft.print("000000");
          tft.setCursor(52, 60);
          tft.print("000000");
        } else if (tmpee >= 0 && tmp < 0)
        {
          tft.setCursor(50, 60);
          tft.setTextColor(ORANGE, ORANGE);
          tft.print("000000");
          tft.setCursor(48, 60);
          tft.print("000000");
          tft.setCursor(52, 60);
          tft.print("000000");
        } else if (tmpee <= -10 && tmp > -10)
        {
          tft.setCursor(50, 60);
          tft.setTextColor(ORANGE, ORANGE);
          tft.print("000000");
          tft.setCursor(48, 60);
          tft.print("000000");
          tft.setCursor(52, 60);
          tft.print("000000");
        }
        tft.print(tmp);
        tmpee = tmp;

        tft.setCursor(240, 60);
        tft.setTextColor(BLACK, ORANGE);
        //int e = TVO();
        tft.setCursor(240, 60);
        if (e >= 0)
        {
          if (pe >= 100  && e < 100)
          {
            tft.setCursor(220, 60);
            tft.setTextColor(ORANGE, ORANGE);
            tft.print("000000");
            tft.setCursor(222, 60);
            tft.print("000000");
            tft.setCursor(240, 60);
            tft.print("000000");
          } else if (pe >= 10 && e < 10)
          {
            tft.setCursor(220, 60);
            tft.setTextColor(ORANGE, ORANGE);
            tft.print("000000");
            tft.setCursor(222, 60);
            tft.print("000000");
            tft.setCursor(240, 60);
            tft.print("000000");
          } else if (pe >= 1000 && e < 1000)
          {
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
          tft.print(e);

          Serial.println(e);
          pe = e;
        }



        //int r = CO22();
        if (r > 0)
        {
          if (coo22 >= 1000 && coo22 < 10000 && r < 1000 )
          {
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
          else if (coo22 >= 10000 && r < 10000)
          {
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

          tft.print(r);
          coo22 = r;
        }
        delay(180);
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
        if (pm255 >= 10000 && pm2 < 10000)
        {
          tft.setCursor(50, 60);
          tft.setTextColor(ORANGE, ORANGE);
          tft.print("000000");
          tft.setCursor(48, 60);
          tft.print("000000");
          tft.setCursor(52, 60);
          tft.print("000000");
        } else if (pm255 >= 1000 && pm2 < 1000)
        {
          tft.setCursor(50, 60);
          tft.setTextColor(ORANGE, ORANGE);
          tft.print("000000");
          tft.setCursor(48, 60);
          tft.print("000000");
          tft.setCursor(52, 60);
          tft.print("000000");
        } else if (pm255 >= 100 && pm2 < 100)
        {
          tft.setCursor(50, 60);
          tft.setTextColor(ORANGE, ORANGE);
          tft.print("000000");
          tft.setCursor(48, 60);
          tft.print("000000");
          tft.setCursor(52, 60);
          tft.print("000000");
        } else if (pm255 >= 10 && pm2 < 10)
        {
          tft.setCursor(50, 60);
          tft.setTextColor(ORANGE, ORANGE);
          tft.print("000000");
          tft.setCursor(48, 60);
          tft.print("000000");
          tft.setCursor(52, 60);
          tft.print("000000");
        }
        //*/
        tft.setCursor(50, 60);
        tft.setTextColor(BLACK, ORANGE);
        tft.print(pm2);
        pm255 = pm2;


        ///*
        if (pm100 >= 10000 && pm10 < 10000)
        {
          tft.setCursor(230, 60);
          tft.setTextColor(ORANGE, ORANGE);
          tft.print("000000");
          tft.setCursor(229, 60);
          tft.print("000000");
          tft.setCursor(231, 60);
          tft.print("000000");
        } else if (pm100 >= 1000 && pm10 < 1000)
        {
          tft.setCursor(230, 60);
          tft.setTextColor(ORANGE, ORANGE);
          tft.print("000000");
          tft.setCursor(229, 60);
          tft.print("000000");
          tft.setCursor(231, 60);
          tft.print("000000");
        } else if (pm100 >= 100 && pm10 < 100)
        {
          tft.setCursor(230, 60);
          tft.setTextColor(ORANGE, ORANGE);
          tft.print("000000");
          tft.setCursor(229, 60);
          tft.print("000000");
          tft.setCursor(231, 60);
          tft.print("000000");
        } else if (pm100 >= 10 && pm10 < 10)
        {
          tft.setCursor(230, 60);
          tft.setTextColor(ORANGE, ORANGE);
          tft.print("000000");
          tft.setCursor(229, 60);
          tft.print("000000");
          tft.setCursor(231, 60);
          tft.print("000000");
        }
        //*/

        tft.setCursor(230, 60);
        tft.setTextColor(BLACK, ORANGE);
        tft.print(pm10);
        pm100 = pm10;



        //int hu = humidity();

        if (huu >= 100 && hu < 100)
        {
          tft.setCursor(140, 60);
          tft.setTextColor(ORANGE, ORANGE);
          tft.print("000000");
          tft.setCursor(138, 60);
          tft.print("000000");
          tft.setCursor(142, 60);
          tft.print("000000");
        } else if (huu >= 10 && hu < 10)
        {
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
        tft.print(hu);
        huu = hu;

        delay(180);
        break;
      }
    case 5:
      {

        tft.setTextSize(2);

        tft.setCursor(65, 60);
        tft.setTextColor(BLACK, ORANGE);
        //int afisare_CO = COo();
        tft.print(afisare_CO);

        tft.setCursor(245, 60);
        tft.setTextColor(BLACK, ORANGE);
        //int afisare_NH3 = NH333();
        tft.print(afisare_NH3);

        tft.setCursor(140, 180);
        tft.setTextColor(BLACK, ORANGE);
        //int no = NO222() / 10;
        tft.print(no);

        delay(180);
        break;
      }
    case 6:
      {

        /*
                tft.setTextSize(2);

                tft.setCursor(140, 80);
                tft.setTextColor(BLACK, ORANGE);
                tft.print(so2());
        */

        //int presi = presure();
        if (pres >= 1000 && presi < 1000)
        {
          tft.setCursor(140, 180);
          tft.setTextColor(ORANGE, ORANGE);
          tft.print("000000");
          tft.setCursor(138, 180);
          tft.print("000000");
          tft.setCursor(142, 180);
          tft.print("000000");
        }

        tft.setCursor(140, 180);
        tft.setTextColor(BLACK, ORANGE);
        tft.print(presi);

        delay(180);
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



  switch (y)
  {
    case 0:
      {
        break;
      }
    case 1:
      {
        graphtemp();
        break;
      }
    case 2:
      {
        graphTVOC();
        break;
      }
    case 3:
      {
        graphCO2();
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
        graphHUM();
        break;
      }
    case 7:
      {
        graphCO();
        break;
      }
    case 8:
      {
        graphNH3();
        break;
      }
    case 9:
      {
        graphNO2();
        break;
      }
    case 10:
      {
        ///graphsoo2();
        break;
      }
    case 11:
      {
        graphPRESU();
        break;
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

void esp_transfere()
{

  int tvoc = TVO();
  int temp = temperature();
  int pressure = presure();
  ///int alt = app_alt();
  int hum = humidity();
  int co2 = CO22();
  int co = COo();
  int nh3 = NH333();
  int no2 = NO222();


  Serial3.print(tvoc);
  Serial3.print(',');
  Serial3.print(temp);
  Serial3.print(',');
  Serial3.print(pressure);
  Serial3.print(',');
  /// Serial3.print(alt);
  /// Serial3.print(',');
  Serial3.print(hum);
  Serial3.print(',');
  Serial3.print(co2);
  Serial3.print(',');
  Serial3.print(co);
  Serial3.print(',');
  Serial3.print(nh3);
  Serial3.print(',');
  Serial3.print(no2);
  Serial3.print(',');
  int pm25, pm11;
  Sds();
  Serial3.print(pm25);
  Serial3.print(',');
  Serial3.print(pm11);
  Serial3.print(',');
  Serial3.print('\x0D');

}


void point()
{
  TSPoint p = tou.getPoint();  //Get touch point

  if (p.z > tou.pressureThreshhold) {

    Serial.print("X = "); Serial.print(p.x);
    Serial.print("\tY = "); Serial.print(p.y);
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

void pat()
{
  if (ok > 2 && ok < 6)
  {
    //90 60
    tft.fillRect(30, 55, 80, 25, ORANGE);
    tft.drawRect(30, 55, 80, 25, ORANGE);

    tft.fillRect(210, 55, 80, 25, ORANGE);
    tft.drawRect(210, 55, 80, 25, ORANGE);

    if (ok == 3)
    {
      tft.fillRect(105, 155, 100, 25, ORANGE);
      tft.drawRect(105, 155, 100, 25, ORANGE);
    }
    else  if (ok == 4)
    {
      tft.fillRect(105, 175, 90, 25, ORANGE);
      tft.drawRect(105, 175, 90, 25, ORANGE);
    }
    else if (ok == 5)
    {
      tft.fillRect(105, 175, 80, 25, ORANGE);
      tft.drawRect(105, 175, 80, 25, ORANGE);
    }

  }
  else
  {
    if (ok == 6)
    {
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

void loop()
{

  param();
  afi2();
  pat();
  //esp_transfere();

  ///point();


  pinMode(XM, OUTPUT);
  digitalWrite(XM, LOW);
  pinMode(YP, OUTPUT);
  digitalWrite(YP, HIGH);
  digitalWrite(YM, LOW);
  pinMode(XP, OUTPUT);
  digitalWrite(XP, HIGH);

}
