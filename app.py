from flask import Flask, request, jsonify
from sentiment import analyze_sentiment, get_word_lists
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # Allow requests from frontend

# Sentiment Analysis Route
@app.route('/analyze', methods=['POST'])
def analyze():
    data = request.get_json()
    review = data.get('review', '')
    sentiment, explanation = analyze_sentiment(review)
    return jsonify({'sentiment': sentiment, 'explanation': explanation})

# Word Lists Route (for dropdown in frontend)
@app.route('/wordlists', methods=['GET'])
def wordlists():
    return jsonify(get_word_lists())

if __name__ == '__main__':
    app.run(debug=True)
