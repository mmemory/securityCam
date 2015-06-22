//#########################################################################################################################
//--------------------Sketch for wireless security system using the Arduino Yun and a PIR Motion Sensor--------------------
//#########################################################################################################################

//##################################################-Required libraries-###################################################
#include <Bridge.h>     //The Bridge library simplifies communication between the ATmega32U4 and the AR9331
#include <Process.h>    //Bridge library's Process class to run Linux processes on the AR9331
#include <HttpClient.h> //Library to make it easier to interact with web servers from Arduino
#include <DHT.h>        //Library for the DHT series of low cost temperature/humidity sensors

//######################################################-Variables-########################################################
int pirPin = 2;                                                      //Pin for the PIR motion sensor
int ledPin = 13;                                                     //Pin for the LED as a picture trigger
int pirValue = LOW;                                                  //We start, assuming no motion detected
String folderPath = "/mnt/sda1/arduino/";                            //Folder path to micro sd card
String httpDestination = "http://trinkiter.com:3015/api/image-data"; //API url for the POST request
String httpBody;                                                     //Data for the POST request message body
String timestamp;                                                    //Current Time
String filename;                                                     //Filename of picture
String hardware = "192.168.0.6";                                     //Hardware ID
String url;                                                          //Picture URL
String lightIntensity;                                               //Light intensity at the location of the hardware 
String temperatureInCelsius, temperatureInFahrenheit;                //Temperature at the location of the hardware
String humidity;                                                     //Humidity at the location of the hardware
boolean transmissionToS3 = false;                                    //We start, assuming transmission to S3 failed

//#######################################################-Defines-#########################################################
#define lightPin A0   //Pin for the photo-resistor
#define DHTPIN 2      //Pin for the DHT11 sensor
#define DHTTYPE DHT11 //Type of DHT sensor

//####################################################-Setup function-#####################################################
void setup() {

  //Initialize DHT sensor for normal 16mhz Arduino
  DHT dht(DHTPIN, DHTTYPE);  
  
  //Initialize libraries
  Bridge.begin();
  dht.begin();
  
  //Sets the data rate in bits per second for serial data transmission
  Serial.begin(9600);
  
  //Pin declaration
  pinMode(pirPin, INPUT);  //Declare Pin 2 as an input pin
  pinMode(ledPin, OUTPUT); //Declare Pin 13 as an output pin 
  
  //Wait for a serial connection
  while (!Serial);

}

//####################################################-Loop function-######################################################
void loop() {
  
  //Write the value of the PIR sensor to a variable
  pirValue = digitalRead(pirPin); //Value = 0 --> no motion, Value = 1 --> motion
  
  //Comparison if motion detected
  if (pirValue == HIGH) {
    
    //Print PIR sensor reaction
    Serial.println("Motion detected!");
    
    //Turn LED on
    digitalWrite(ledPin, HIGH); 
    
    //Invoke custom functions
    timestamp = getTimestamp();                        //Function to get the current date and time
    filename = createPictureName(timestamp);           //Function to create a unique filname for the picture
    takePicture(folderPath, filename);                 //Function to take a picture and to save it on the micro sd card
    transmissionToS3 = sendToS3(folderPath, filename); //Function to send the picture to S3 and to determine the transmisson success
    
    //Comparison if the picture was successfully sent to S3
    if (!transmissionToS3) {
      
      //Invoke custom functions
      url = createURL(filename);
      lightIntensity = String(getLightIntensity());           //Function to get the current light intensity
      temperatureInCelsius = String(getTemperature(false));   //Function to get the current temperature in Celsius
      temperatureInFahrenheit = String(getTemperature(true)); //Function to get the current temperature in Fahrenheit
      humidity = String(getHumidity());                       //Function to get the current humidity
                                       
      //Print return values of custom functions    
      Serial.println("Timestamp: " + timestamp);
      Serial.println("Filename: " + filename);
      Serial.println("URL: " + url);
      Serial.println("Light intensity: " + lightIntensity);
      Serial.println("Temperature in Celsius: " + temperatureInCelsius);
      Serial.println("Temperature in Fahrenheit: " + temperatureInFahrenheit);
      Serial.println("Humidity: " + humidity);
                                  
      //Build the message body for the http POST request
      httpBody = "name=" + filename +
                 "&timestamp=" + timestamp + 
                 "&camera=" + hardware + 
                 "&url=" + url +
                 "$lightIntensity=" + lightIntensity +
                 "&temperatureInCelsius=" + temperatureInCelsius +
                 "&temperatureInFahrenheit=" + temperatureInFahrenheit +
                 "&humidity=" + humidity;
      
      //Print message body
      Serial.println("HTTP POST BODY: " + httpBody);
      
      //Invoke custom function
      postRequest(httpDestination, httpBody); //Function for http POST request 
      deletePicture(folderPath, timestamp);   //Function to delete picture on micro sd card
      
    }
   
  } else {
    
    //Print PIR sensor reaction
    Serial.println("No motion detected!");

    //LED off
    digitalWrite(ledPin, LOW);
    
  }
  
  //Avoiding multiple pictures
  delay(1000);

}

//#########################################################################################################################
//----------------------------------------------------Custom functions-----------------------------------------------------
//#########################################################################################################################

//###############################################-Take picture function-###################################################
void takePicture(String path, String filename) {
  
  Process picture;                                                         //Create Process instance 
  picture.runShellCommand("fswebcam " + path + filename + " -r 1280x720"); //Run ShellCommand
  while(picture.running());
  
  //Write the return value of the process instance to a variable
  int pictureSuccess = picture.exitValue(); //Value = 0 --> took a picture, Value = 1 --> did not take a picture
  
  //Comparison if fswebcam took a picture or not
  if (pictureSuccess == 0) {
    Serial.println("Picture successfully made!");
  } else {
    Serial.println("Picture not successfully made!");
  }
  
} 

//########################################-Send picture to Amazon S3 function-#############################################
boolean sendToS3(String path, String filename) {

  Process post;                                                        //Create Process instance 
  post.runShellCommand("python " + path + "S3.py " + path + filename); //Run ShellCommand
  while(post.running());
  
  //Write the return value of the process instance into a variable
  int responseSuccess = post.exitValue(); //Value = 0 --> send the picture, Value = 1 --> did not send the picture

  //Comparison if the Python script sent the picture to S3 or not
  if (responseSuccess == 0) {
    Serial.println("File to S3 successfully sent!");
  } else {
    Serial.println("File to S3 not successfully sent!");
  }  
  
  //Return value
  return responseSuccess; 
  
} //End of sendToS3 function

//###############################################-POST request function-###################################################
void postRequest(String httpDestination, String httpBody) {
  
  HttpClient client;                      //Create a basic HTTP client that connects to the internet
  client.noCheckSSL();                    //Turn of checking of SSL certificate validity
  client.post(httpDestination, httpBody); //Start POST request
  
  //As long as there are bytes from the server in the client buffer, read the bytes...
  while (client.available()) {
    char response = client.read(); //save them to a variable
    Serial.print(response);        //and print them
  }
  
  //Start with a new line in the serial monitor
  Serial.println();
  
  //Waits for the transmission of outgoing serial data to complete
  Serial.flush();
  
} 

//##############################################-Delete picture function-##################################################
void deletePicture(String path, String filename) {
  
  Process eliminate;                                           //Create Process instance 
  eliminate.runShellCommand("rm " + path + filename + ".jpg"); //Run ShellCommand
  
}

//###########################################-Create picture name function-################################################
String createPictureName(String timestamp) {

  //Variable to store the return value
  String filename; 
  
  //Concatenation of filename
  filename = timestamp + ".jpg";

  //Return value
  return filename;  
  
}

//###############################################-Create URL function-#####################################################
String createURL(String filename) {

  //Variable to store the return value
  String url; 
  
  //Concatenation of filename
  url = "https://s3.amazonaws.com/securitywebcam//mnt/sda1/arduino/" + filename;

  //Return value
  return url;  
  
}

//##############################################-Get timestamp function-###################################################
String getTimestamp() {
  
  //Variable to store the return value
  String timestamp; 
 
  Process date;                     //Create Process instance that will be used to get the date 
  date.runShellCommand("date +%s"); //Linux command line to get time

  //If there is a result from the date process, parse the data
  while(date.available() > 0) {
    char c = date.read();
    timestamp += c;
  }
  
  //Kill all whitespaces
  timestamp.trim();

  //Return value
  return timestamp;
  
} 

//###############################################-Get humidity function-###################################################
float getHumidity() {

  // Initialize DHT sensor for normal 16mhz Arduino
  DHT dht(DHTPIN, DHTTYPE);
  
  //Read humidity
  float humidity = dht.readHumidity();
  
  //Check if reading the humidity has failed
  if (isnan(humidity)) {
    Serial.println("Failed to read from DHT sensor!");
    return 0;
  } else {
    return humidity;  
  }
  
} 

//#############################################-Get temperature function-##################################################
float getTemperature(boolean unity) {
  
  // Initialize DHT sensor for normal 16mhz Arduino
  DHT dht(DHTPIN, DHTTYPE);  
  
  //Read temperature
  float temperatureInCelsius = dht.readTemperature();        //as Celsius
  float temperatureInFahrenheit = dht.readTemperature(true); //as Fahrenheit

  //Check if any reads failed
  if (isnan(temperatureInCelsius) || isnan(temperatureInFahrenheit)) {
    Serial.println("Failed to read from DHT sensor!");
    return 0;
  } else {
    if (unity) {
      return temperatureInFahrenheit; 
    } else {
      return temperatureInCelsius; 
    }
  }

} 

//###########################################-Get light intensity function-################################################
int getLightIntensity() {   
  
  //Pin declaration
  pinMode(lightPin, INPUT); //Declare Pin A0 as an input pin
  
  //Read the input on analog pin 0
  int lightIntensity = analogRead(lightPin);
  
  //Return value
  return lightIntensity;
  
} 
