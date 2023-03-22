from flask import Flask, request, jsonify
import getCourseDescription 
import json


app = Flask(__name__)

@app.route('/api/myfunction', methods=['POST'])
def process_input():
    # Extract the user input from the HTTP request
    user_input = request.get_json()

    # Call your Python function with the user input
    output = getCourseDescription.find_desc(user_input)
    
    # Return the output as a JSON response
    return jsonify(output)
