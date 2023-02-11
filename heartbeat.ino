
#include "Arduino.h"

//Using built in LED pin for demo
#define ledPin 13

// Pulse meter connected to any Analog pin
#define sensorPin A0

float alpha = 0.75;
int period = 50;
float max = 0.0;

void setup() {

	// Inbuilt LED
	pinMode(ledPin, OUTPUT);

	Serial.begin(9600);
}

void loop() {

	// Arbitrary initial value for the sensor value (0 - 1023)
	// too large and it takes a few seconds to 'lock on' to pulse
	static float oldValue = 500;

	// Time recording for BPM (beats per minute)
	static unsigned long bpmMills = millis();
	static int bpm = 0;

	// Keep track of when we had the the last pulse - ignore
	// further pulses if too soon (probably false reading)
	static unsigned long timeBetweenBeats = millis();
	int minDelayBetweenBeats = 400;

	// This is generic code provided with the board:
	// Read the sensor value (0 - 1023)
	int rawValue = analogRead((unsigned char) sensorPin);

	// Some maths (USA: math) to determine whether we are detected a peak (pulse)
	float value = alpha * oldValue + (1 - alpha) * rawValue;
	float change = value - oldValue;
	oldValue = value;

	// Forum suggested improvement (works very well)
	// Display data on the LED via a blip:
	// Empirically, if we detect a peak as being X% from
	// absolute max, we find the pulse even when amplitude
	// varies on the low side.

	// if we find a new maximum value AND we haven't had a pulse lately
	if ((change >= max) && (millis() > timeBetweenBeats + minDelayBetweenBeats)) {

		// Reset max every time we find a new peak
		max = change;

		// Flash LED and beep the buzzer
		digitalWrite(ledPin, 1);
		tone(3, 2000, 50);

		// Reset the heart beat time values
		timeBetweenBeats = millis();
		bpm++;
	}
	else {
		// No pulse detected, ensure LED is off (may be off already)
		digitalWrite(ledPin, 0);
	}
	// Slowly decay max for when sensor is moved around
	// but decay must be slower than time needed to hit
	// next pulse peak. Originally: 0.98
	max = max * 0.97;

	// Every 10 seconds extrapolate the pulse rate. Improvement would
	// be to average out BPM over last 60 seconds
	if (millis() >= bpmMills+10000) {
		Serial.println(bpm * 6);
		bpm = 0;
		bpmMills = millis();
	}

	// Must delay here to give the value a chance to decay
	delay(period);
}
