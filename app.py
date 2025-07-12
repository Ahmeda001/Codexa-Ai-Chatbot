from flask import Flask, render_template, request, jsonify
from bot.bot import get_bot_response
import os
from dotenv import load_dotenv

load_dotenv()  # Load API key from .env if available

app = Flask(__name__)

@app.route("/")
def index():
    return render_template("index.html")

@app.route("/chat", methods=["POST"])
def chat():
    data = request.get_json()
    user_message = data.get("message")

    if not user_message:
        return jsonify({"response": "I didn't receive a message."})

    try:
        bot_reply = get_bot_response(user_message)
        return jsonify({"response": bot_reply})
    except Exception as e:
        print("Error:", e)
        return jsonify({"response": "Oops! Something went wrong."})

if __name__ == "__main__":
    app.run(debug=True)
