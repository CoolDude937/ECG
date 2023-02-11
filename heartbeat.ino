void setup() {
  pinMode(A0, INPUT);
  Serial.begin(9600);
}

void loop() {
  float pulse;
  int sum = 0;
  for (int i = 0; i < 1000/60; i++)
    sum += analogRead(A0);
  pulse = sum / 20.00;
  Serial.println(pulse);
  delay(100);
}