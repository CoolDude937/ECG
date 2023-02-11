
#include "Arduino.h"

//Using built in LED pin for demo
#define ledPin 13

// Pulse meter connected to any Analog pin
#define sensorPin A0

int arr_bpm[10];

float alpha = 0.75;
int period = 50;
float max = 0.0;

void setup() {

  // Inbuilt LED
  pinMode(ledPin, OUTPUT);

  for (int j = 0; j < 10; j++) {
    arr_bpm[j] = 0;
  }

  Serial.begin(9600);
}

void loop() {

  // to find value between current and old
  static float oldValue = 500;

  //trying to average the bpm each iteration
  int averager = 1;
  int index;

  // Time recording for BPM (beats per minute)
  static unsigned long bpmMills = millis();
  static int bpm = 0;
  static float avg_bpm = 0;

  // to minimize bad input
  static unsigned long timeBetweenBeats = millis();
  int minDelayBetweenBeats = 400;

  // Read the sensor value (0 - 1023)
  int rawValue = analogRead((unsigned char)sensorPin);

  // Some maths (USA: math) to determine whether we are detected a peak (pulse)
  float value = alpha * oldValue + (1 - alpha) * rawValue;
  float change = value - oldValue;
  oldValue = value;

  // if we find a new maximum value AND we haven't had a pulse lately
  if ((change >= max) && (millis() > timeBetweenBeats + minDelayBetweenBeats)) {

    // Reset max every time we find a new peak
    max = change;

    // Flash LED
    digitalWrite(ledPin, 1);
    tone(3, 2000, 50);

    // Reset the heart beat time values
    timeBetweenBeats = millis();
    bpm++;
  } else {
    // No pulse detected, ensure LED is off (may be off already)
    digitalWrite(ledPin, 0);
  }
  // Slowly decay max for when sensor is moved around
  // but decay must be slower than time needed to hit
  // next pulse peak. Originally: 0.98
  max = max * 0.97;


  if (index == 10)
    index = 0;
  if (averager >= 10)
    averager = 10;
  arr_bpm[index] = bpm;
  for (int i = 0; i < 10; i++)
  {
    avg_bpm += arr_bpm[i];
  }
  avg_bpm = avg_bpm / averager;
  averager++;
  index++;
  // Every 10 seconds extrapolate the pulse rate.
  if (millis() >= bpmMills + 10000) {
    Serial.println(avg_bpm * 6);
		bpm = 0;
		bpmMills = millis();
  }
  avg_bpm = 0;

  // Must delay here to give the value a chance to decay
  delay(period);
}
