# Import libraries
import base64
import time
import datetime
from temboo.Library.Amazon.S3 import PutObject
from temboo.core.session import TembooSession

# Create a session with your Temboo account details
session = TembooSession("philippschulte", "myFirstApp", "7ca916a326c44dc5b32d6012546996fe")

# Instantiate the Choreo
putObjectChoreo = PutObject(session)

# Get an InputSet object for the Choreo
putObjectInputs = putObjectChoreo.new_input_set()

# Encode image
picture = open("/mnt/sda1/arduino/alarm.jpg","r")
picture_b64 = base64.b64encode(picture.read())

# Timestamp
ts = time.time() - 21600
st = datetime.datetime.fromtimestamp(ts).strftime('%Y-%m-%d %I:%M%p')

# Set the Choreo inputs
putObjectInputs.set_CannedACL("public-read")
putObjectInputs.set_BucketName("securitywebcam")
putObjectInputs.set_FileName(st)
putObjectInputs.set_AWSAccessKeyId("ENTER_ACCESS_KEY_ID_HERE")
putObjectInputs.set_AWSSecretKeyId("ENTER_SECRET_KEY_ID_HERE")
putObjectInputs.set_ContentType("image/jpeg")
putObjectInputs.set_FileContents(picture_b64)

# Execute the Choreo
putObjectResults = putObjectChoreo.execute_with_results(putObjectInputs)

# Print the Choreo outputs
print("Response: " + putObjectResults.get_Response())
