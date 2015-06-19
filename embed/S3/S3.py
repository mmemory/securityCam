##################################################################################################
#--------------------------------Script to upload files to Amazon S3------------------------------
##################################################################################################

# Import libraries
import base64
import sys
from temboo.Library.Amazon.S3 import PutObject
from temboo.core.session import TembooSession



# Create a session with your Temboo account details
session = TembooSession("philippschulte", "myFirstApp", "7ca916a326c44dc5b32d6012546996fe")

# Instantiate the Choreo
putObjectChoreo = PutObject(session)

# Get an InputSet object for the Choreo
putObjectInputs = putObjectChoreo.new_input_set()

# Encode image
with open(str(sys.argv[1]), "rb") as image_file:
    encoded_string = base64.b64encode(image_file.read())

# Set the Choreo inputs
putObjectInputs.set_CannedACL("public-read")
putObjectInputs.set_BucketName("securitywebcam")
putObjectInputs.set_FileName(str(sys.argv[1]))
putObjectInputs.set_AWSAccessKeyId("AKIAJHEU4VRRVCQT5OYQ")
putObjectInputs.set_AWSSecretKeyId("VlftEHTcOw7cVb5slWgqFmw+Yk09leh0/cpvmI6R")
putObjectInputs.set_ContentType("image/jpg")
putObjectInputs.set_FileContents(encoded_string)

# Execute the Choreo
putObjectResults = putObjectChoreo.execute_with_results(putObjectInputs)

# Print the Choreo outputs
print("Response: " + putObjectResults.get_Response())