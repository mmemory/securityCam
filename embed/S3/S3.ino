//#########################################################################################################################
//--------------------Sketch for wireless security system using the Arduino Yun and a PIR Motion Sensor--------------------
//#########################################################################################################################

//##################################################-Required libraries-###################################################
#include <Bridge.h>
#include <Process.h>
#include <HttpClient.h>

//######################################################-Variables-########################################################
int pirPin = 2;                                                              //PIR Motion Sensor
int ledPin = 13;                                                             //LED as picture trigger
int pirValue = LOW;                                                          //We start, assuming no motion detected
String folder = "/mnt/sda1/arduino/";                                        //Folder path to micro sd card
String httpDestination = "http://trinkiter.com:3015/api/image-data";         //API url for the POST request
String httpBody;                                                             //Data for the POST request message body
String url = "https://s3.amazonaws.com/securitywebcam/2015-06-12+03%3A46PM"; //Amazon S3 url for httpBody concatenation 
String hardware = "192.168.0.6";                                             //Hardware ID for httpBody concatenation 
String timestamp;                                                            //Picture name for httpBody concatenation 
boolean transmissionToS3 = false;                                            //We start, assuming transmission to S3 failed

//####################################################-Setup function-#####################################################
void setup() {

  //Start bridge library
  Bridge.begin();
  
  //Sets the data rate in bits per second for serial data transmission
  Serial.begin(9600);
  
  //Pin declaration
  pinMode(pirPin, INPUT);  //Declare Pin 2 as an input pin
  pinMode(ledPin, OUTPUT); //Declare Pin 13 as an output pin 
  
  //Wait for a serial connection
  while (!Serial);

} //End setup function

//####################################################-Loop function-######################################################
void loop() {
  
  //Write the value of the PIR sensor to a variable
  pirValue = digitalRead(pirPin); //Value = 0 --> no motion, Value = 1 --> motion
  
  //Print PIR sensor value 
  Serial.print("PIR value: ");
  Serial.println(pirValue);
  
  //Comparison if motion detected
  if (pirValue == HIGH) {
    
    //Print PIR sensor reaction
    Serial.println("Motion detected!");
    
    //Turn LED on
    digitalWrite(ledPin, HIGH); 
    
    //Invoke custom functions
    takePicture();                    //Function to take a picture and to save it on the micro sd card
    transmissionToS3 = sendToS3();    //Function to send the picture to S3 and to determine the transmisson success
    
    //Print transmisson success
    Serial.println(transmissionToS3); 
    
    //Comparison if the picture was successfully sent to S3
    if (!transmissionToS3) {
      
      //Invoke custom functions
      timestamp = getTimestamp(); //Function to get the current date and time
                                  //Function to get the current humidity
                                  //Function to get the current temperature
                                  //Function to get the current light intensity
                                  
      //Concatenation of the message body for the http POST request
      httpBody = "{\"name\":\"" + timestamp + "\",\"camera\":\"" + hardware + "\",\"url\":\"" + url + "\"}";
      
      //Print message body
      Serial.println(httpBody);
      
      //Invoke custom function
      postRequest(httpDestination, httpBody); //Function for http POST request 
      
    }
   
  } else {
    
    //Print PIR sensor reaction
    Serial.println("No motion!");

    //LED off
    digitalWrite(ledPin, LOW);
    
  }
  
  //Avoiding multiple pictures
  delay(1000);

}  //End loop function

//#########################################################################################################################
//----------------------------------------------------Custom functions-----------------------------------------------------
//#########################################################################################################################

//###############################################-Take picture function-###################################################
void takePicture() {
  
  Process picture;                            //Create Process instance
  picture.begin("fswebcam");                  //Use the fswebcam program on Arduino Yun to take a picture
  picture.addParameter(folder + "alarm.jpg"); //Set destination on micro sd card
  picture.addParameter("-r 1280x960");        //Set picture resulution 
  picture.run();                              //Start fswebcam
  
  //Write the return value of the process instance to a variable
  int pictureSuccess = picture.exitValue(); //Value = 0 --> took a picture, Value = 1 --> did not take a picture
  
  //Comparison if fswebcam took a picture or not
  if (pictureSuccess == 0) {
    Serial.println("Picture successfully made!");
  } else {
    Serial.println("Picture not successfully made!");
  }
  
} //End of takePicture function

//########################################-Send picture to Amazon S3 function-#############################################
boolean sendToS3() {

  Process post;                        //Create Process instance 
  post.begin("python");                //Use a Python script to send the picture on S3
  post.addParameter(folder + "S3.py"); //Path to Python script on micro sd card
  post.run();                          //Start S3.py
  
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

//###############################################-POST request function -##################################################
void postRequest(String httpDestination, String httpBody) {
  
  HttpClient client;                      //Create a basic HTTP client that connects to the internet
  client.noCheckSSL();                    //Turn of checking of SSL certificate validity
  client.post(httpDestination, httpBody); //Start POST request
  
  //As long as there are bytes from the server in the client buffer, read the bytes...
  while (client.available()) {
    char response = client.read(); //save them to a variable
    Serial.println("Response: " + response); //and print them
  }
  
  //Waits for the transmission of outgoing serial data to complete
  Serial.flush();
  
} //End of postRequest function

//##############################################-Get timestamp function -##################################################
String getTimestamp() {
  
  //Variable for
  String timestamp; 
 
  Process date;             //Create Process instance that will be used to get the date 
  date.begin("date");       //Linux command line to get time
  date.addParameter("+%D"); //Adding parameter D for the complete date mm/dd/yy
  date.addParameter("+%T"); //Adding parameter T for the time hh:mm:ss
  date.run();               //Run the command
  
  //If there is a result from the date process, parse the data
  while(date.available() > 0) {
    char c = date.read();
    if (c != '\n') {
      timestamp += c;
    } 
  }

  //Return value
  return timestamp;
  
} //End of getTimestamp function

//###############################################-Get humidity function -##################################################

//#############################################-Get temperature function -#################################################

//###########################################-Get light intensity function -###############################################
