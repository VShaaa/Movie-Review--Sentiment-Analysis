positive_words = ["great", "amazing", "good", "wonderful", "excellent", "best", "enjoyable","stunning","magnificient","entertaining"]
negative_words = ["bad", "terrible", "poor", "boring", "worst", "awful", "disappointing","unsatisfied","unrealistic","mediocre"]

def analyze_sentiment(text):
    text = text.lower().split()
    pos_count = sum(1 for word in text if word in positive_words)
    neg_count = sum(1 for word in text if word in negative_words)

    if pos_count > neg_count:
        sentiment = "Positive"
        explanation = "The review contains many positive words."
    elif neg_count > pos_count:
        sentiment = "Negative"
        explanation = "The review contains many negative words."
    else:
        sentiment = "Neutral"
        explanation = "The review contains a balance of positive and negative words."

    return sentiment, explanation
def get_word_lists():
    return {
        "positive": positive_words,
        "negative": negative_words
    }
