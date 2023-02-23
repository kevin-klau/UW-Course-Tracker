from flask import Flask, request, jsonify
import subprocess
app = Flask(__name__)

@app.route('/api/csv', methods=['POST'])
    filename = request.form.get('filename')
    result = subprocess.check_output(['python', 'data.py', filename])
    return jsonify(result=result.decode('utf-8'))