from flask import Flask, request, jsonify
import getCourseDescription 
import json
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
import os

file_path = os.path.abspath(os.getcwd())+"\database.db"

app = Flask(__name__)

cors = CORS(app)


@app.route('/my_function', methods=['OPTIONS'])
def my_function():
    # Extract the user input from the HTTP request
    user_input = request.json['body']
    
    # Call your Python function with the user input
    output = getCourseDescription.find_desc(user_input)
    
    # Return the output as a JSON response
    return jsonify({'output': output})

if __name__ == '__main__':
    app.run(debug=True)