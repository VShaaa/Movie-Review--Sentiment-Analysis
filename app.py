from flask import Flask, request, jsonify, render_template
from sentiment import analyze_sentiment, get_word_lists
from flask_cors import CORS

app = Flask(__name__, template_folder='templates', static_folder='static')
CORS(app)

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/result')
def result():
    return render_template('result.html')

@app.route('/analyze', methods=['POST'])
def analyze():
    data = request.get_json()
    review = data.get('review', '')
    sentiment, explanation = analyze_sentiment(review)
    return jsonify({'sentiment': sentiment, 'explanation': explanation})

@app.route('/wordlists', methods=['GET'])
def wordlists():
    return jsonify(get_word_lists())

if __name__ == '__main__':
    app.run(debug=True)

