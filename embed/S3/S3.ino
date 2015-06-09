//###########################################################################################################
//-------------------Sketch to take a picture using the Arduino Yun and a PIR Motion Sensor------------------
//Date: Thursday, June 09, 2015
//###########################################################################################################

//Required librarie
#include <Process.h>

//Variables:
int pirPin = 2; //PIR Motion Sensor
int ledPin = 13; //LED 
int pirValue = LOW; //We start, assuming no motion detected
String folder = "/mnt/sda1/arduino/";

//#############################################-setup function-##############################################
void setup() {

  //Bridge
  Bridge.begin();
  
  //Sets the data rate in bits per second for serial data transmission
  Serial.begin(9600);
  
  //Declare Pin 2 as an input pin
  pinMode(pirPin, INPUT);
  //Declare Pin 13 as an output pin
  pinMode(ledPin, OUTPUT);  
  
  //Wait for a serial connection
  while (!Serial);

} //End setup function

//#############################################-loop function-###############################################
void loop() {
  
  //Declare the value of pin 2 to a variable
  pirValue = digitalRead(pirPin); //Value = 0 --> no motion, Value = 1 --> motion
  
  //Send PIR sensor value to serial monitor
  Serial.print("PIR value: ");
  Serial.println(pirValue);
  
  //Comparison if motion or no motion detected
  if (pirValue == HIGH) {
    
    //Send motion reaction to serial monitor
    Serial.println("Motion detected!");
    
    //LED on
    digitalWrite(ledPin, HIGH); 
    
    //Invoke motion functions
    makePicture();
    sendToS3();
   
  } else {
    
    //Send motion reaction to serial monitor
    Serial.println("No motion!");
    
    //LED off
    digitalWrite(ledPin, LOW); 
    
  }
  
  //Avoiding multiple pictures
  delay(1000);

}  //End loop function

//###########################################-motion functions-##############################################
void makePicture() {
  
  //Create Process instance
  Process picture;
  picture.begin("fswebcam");
  picture.addParameter(folder + "alarm.jpg");
  picture.addParameter("-r 1280x960");
  picture.run(); //Start fswebcam
  int pictureSuccess = picture.exitValue(); //return value of success
  
  //Comparison if fswebcam took a picture or not
  if (pictureSuccess == 0) {
    Serial.println("Picture successfully made!");
  } else {
    Serial.println("Picture not successfully made!");
  }
  
}

void sendToS3() {

  //Create Process instance 
  Process post;
  post.begin("python");
  post.addParameter(folder + "S3.py");
  post.run(); //Start S3.py
  int responseSuccess = post.exitValue();

  //Comparison if the script sent a file or not
  if (responseSuccess == 0) {
    Serial.println("File to S3 successfully sent!");
  } else {
    Serial.println("File to S3 not successfully sent!");
  }  
  
}
