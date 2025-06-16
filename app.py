from flask import Flask, render_template, jsonify
import random

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/dados')
def dados():
    temperatura = round(random.uniform(70, 110), 2)
    pressao = round(random.uniform(1.0, 5.0), 2)
    return jsonify({"temperatura": temperatura, "pressao": pressao})

if __name__ == '__main__':
    app.run(debug=True)
