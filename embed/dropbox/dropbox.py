# Import libraries
import base64
import time
import datetime
from temboo.Library.Dropbox.FilesAndMetadata import UploadFile
from temboo.core.session import TembooSession

# Encode image
picture = open("/mnt/sda1/arduino/alarm.jpg","r")
picture_b64 = base64.b64encode(picture.read())

# Timestamp
ts = time.time() - 21600
st = datetime.datetime.fromtimestamp(ts).strftime('%Y-%m-%d %I:%M%p')

# Create a session with your Temboo account details
session = TembooSession("philippschulte", "myFirstApp", "7ca916a326c44dc5b32d6012546996fe")

# Instantiate the Choreo
uploadFileChoreo = UploadFile(session)

# Get an InputSet object for the Choreo
uploadFileInputs = uploadFileChoreo.new_input_set()

# Set the Choreo inputs
uploadFileInputs.set_AppSecret("40djxoj6d4x6typ")
uploadFileInputs.set_AccessToken("ejpytk1m9tieadjc")
uploadFileInputs.set_FileName(st)
uploadFileInputs.set_AccessTokenSecret("bf24cbyndgffwjj")
uploadFileInputs.set_AppKey("38l45ypud1g2ka2")
uploadFileInputs.set_FileContents(picture_b64)
uploadFileInputs.set_Root("sandbox")

# Execute the Choreo
uploadFileResults = uploadFileChoreo.execute_with_results(uploadFileInputs)

# Print the Choreo outputs
print("Response: " + uploadFileResults.get_Response())