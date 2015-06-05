//###########################################################################################################
//-------------------Sketch to take a picture using the Arduino Yun and a PIR Motion Sensor------------------
//Date: Thursday, June 04, 2015
//###########################################################################################################

//Required librarie
#include <Process.h>

//Variables:
int pirPin = 7; //PIR Motion Sensor
String folder = "/mnt/sda1/arduino/";

//#############################################-setup function-##############################################
void setup() {
  
  //Bridge
  Bridge.begin();

  //Sets the data rate in bits per second for serial data transmission
  Serial.begin(9600);
  
  //Declare Pin 7 as an input pin
  pinMode(pirPin, INPUT); 
  
} //End setup function

//#############################################-loop function-###############################################
void loop() {
  
  //Declare the value of pin 7 to a variable
  int pirValue = digitalRead(pirPin); //Value = 1 --> no motion, Value = 0 --> motion
  
  //Comparison if motion or no motion detected
  if (pirValue == LOW) {
    
    //Send motion reaction to serial monitor
    Serial.println("Alarm!");
    
    //Invoke motion functions
    makePicture();
    sendEmail();
    
    //Avoiding multiple pictures
    delay(5000);
    
  }

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

void sendEmail() {

  //Create Process instance 
  Process email;
  email.begin("python");
  email.addParameter(folder + "gmail.py");
  email.run(); //Start gmail.py
  int emailSuccess = email.exitValue();

  //Comparison if it sent a email or not
  if (emailSuccess == 0) {
    Serial.println("Email successfully sent!");
  } else {
    Serial.println("Email not successfully sent!");
  }  
  
}
