from temboo.Library.Utilities.HTTP import Post
from temboo.core.session import TembooSession

# Create a session with your Temboo account details
session = TembooSession("philippschulte", "myFirstApp", "7ca916a326c44dc5b32d6012546996fe")

# Instantiate the Choreo
postChoreo = Post(session)

# Get an InputSet object for the Choreo
postInputs = postChoreo.new_input_set()

# Set the Choreo inputs
postInputs.set_RequestBody("{\n\"message\": \"Test\",\n\"url\": \"some.s3.com\"\n}")
postInputs.set_RequestHeaders("{\n\"Access\": \"test\",\n\"Another\": \"anotherTest\"\n}")
postInputs.set_URL("http://securitycam.com")

# Execute the Choreo
postResults = postChoreo.execute_with_results(postInputs)

# Print the Choreo outputs
print("HTTPLog: " + postResults.get_HTTPLog())
print("Response: " + postResults.get_Response())
print("ResponseStatusCode: " + postResults.get_ResponseStatusCode())