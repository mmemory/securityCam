# securityCam
Wireless security camera using the Arduino Yun &amp; a USB webcam!

## Table of Contents
  
### Introduction
  
#### About the Project

The project is based on the Arduino Yun, to which we are going to connect a standard USB webcam and a PIR motion detector to create some cool applications.


For the hardware configuration we have used [Marco Schwartz] (https://github.com/marcoschwartz) [tutorial] (https://learn.adafruit.com/wireless-security-camera-arduino-yun) from the [Adafruit Learning System] (https://learn.adafruit.com/) as a guideline.

      
#### Used Hardware
1. [Webcam] (http://www.amazon.com/Logitech-Webcam-Widescreen-Calling-Recording/dp/B004FHO5Y6/ref=sr_1_1?ie=UTF8&qid=1431451633&sr=8-1&keywords=logitech+hd+webcam+c270)
2. [Microcontroller] (http://www.amazon.com/Arduino-A000008-Y%C3%9AN/dp/B00F6YJK3S/ref=sr_1_1?ie=UTF8&qid=1431451736&sr=8-1&keywords=arduino+yun)
3. [Motion Sensor] (http://www.amazon.com/Origem-Quality-Pyroelectric-Infrared-Detector/dp/B00U5QICI6/ref=sr_1_6?ie=UTF8&qid=1431451883&sr=8-6&keywords=pir+motion+sensor)
4. [Memory Card] (http://www.amazon.com/SanDisk-Memory-Frustration-Free-Packaging--SDSDQ-016G-AFFP/dp/B007KFXIDO/ref=sr_1_7?s=pc&ie=UTF8&qid=1431452680&sr=1-7&keywords=micro+sd)
5. [Charger] (http://www.amazon.com/T-Power%C2%AE-Charger-Lenovo-IdeaTab-Replacement/dp/B00E9JJBVC/ref=sr_1_47?s=electronics&ie=UTF8&qid=1431451337&sr=1-47&keywords=Micro+USB+Wall+Charger)
      
#### Team Members and Responsibility
* Dustin Myers      ==>   Front-End/Data-Display
* Leonardo Prates   ==>   Hardware-Design/Back-End
* Philipp Schulte   ==>   Hardware-Design/Back-End
* Guy Brudnicki     ==>   Front-End/Data Control
* Michael Memory    ==>   Front-End/Back-End Coordinator

### 1. Front-End
####1.1 Features
  * Authentication
  
####1.2 Technologies
  * HTML/CSS
  * Material design
  * AngularJS
    * $q
    * $http
    * ui-router

### 2. Back-End
####2.1 Features
  * Authentication

####2.2 Technologies
  * MongoDB
  * Node.js
    * Express
    * Express-Session
    * Cors
    * Mongoose
    * Body-Parser
    * Passport
    * Passport-Local
    * Bcrypt
  
### 3. Hardware-Design
####3.1 Features
  * PIO Motion Sensor
  * Camera

####3.2 Technologies
  * Temboo
  * Dropbox
  * AWS S3

####3.3 Libraries
  * [Bridge] (http://www.arduino.cc/en/Tutorial/Bridge)
  * [Process] (http://www.arduino.cc/en/Tutorial/Process)