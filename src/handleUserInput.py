from flask import Flask, request, jsonify
import getCourseDescription 
import json


app = Flask(__name__)

@app.route('/my_function', methods=['POST'])
def my_function():
    # Extract the user input from the HTTP request
    user_input = request.json['body']
    
    # Call your Python function with the user input
    output = getCourseDescription.find_desc(user_input)
    
    # Return the output as a JSON response
    return jsonify({'output': output})

if __name__ == '__main__':
    app.run(debug=True)