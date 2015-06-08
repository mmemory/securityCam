# Import libraries
import base64
import time
import datetime
from temboo.Library.Google.Gmail import SendEmail
from temboo.core.session import TembooSession

# Create a session with your Temboo account details
session = TembooSession("philippschulte", "myFirstApp", "7ca916a326c44dc5b32d6012546996fe")

# Instantiate the Choreo
sendEmailChoreo = SendEmail(session)

# Get an InputSet object for the Choreo
sendEmailInputs = sendEmailChoreo.new_input_set()

# Encode image
picture = open("/mnt/sda1/arduino/alarm.jpg","r")
picture_b64 = base64.b64encode(picture.read())

# Timestamp
ts = time.time() - 21600
st = datetime.datetime.fromtimestamp(ts).strftime('%Y-%m-%d %I:%M%p')

# Set the Choreo inputs
sendEmailInputs.set_Attachment(picture_b64)
sendEmailInputs.set_MessageBody("Someone entered your domain!")
sendEmailInputs.set_AttachmentName(st)
sendEmailInputs.set_Subject("Alarm!")
sendEmailInputs.set_Password("xpjgirijmdlipnsm")
sendEmailInputs.set_Username("phillipp.schulte@gmail.com")
sendEmailInputs.set_FromAddress("phillipp.schulte@gmail.com")
# sendEmailInputs.set_ToAddress("philipp.schulte@ymail.com, hello@odran037.io, michaelmemaria@gmail.com, dallincrane@gmail.com,  dustin314@gmail.com, guybrud@gmail.com")
sendEmailInputs.set_ToAddress("philipp.schulte@ymail.com")

# Execute the Choreo
sendEmailResults = sendEmailChoreo.execute_with_results(sendEmailInputs)

# Print the Choreo outputs
print("Success: " + sendEmailResults.get_Success())