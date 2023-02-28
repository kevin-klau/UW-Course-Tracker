from flask import Flask, request, jsonify
from getCourseDescription import find_desc
import json


app = Flask(__name__)

@app.route('/process_input', methods=['POST'])
def process_input():
    # Extract the user input from the HTTP request
    user_input = request.json['user_input']
    
    # Call your Python function with the user input
    output = find_desc(user_input)
    
    # Return the output as a JSON response
    return jsonify({'output': output})