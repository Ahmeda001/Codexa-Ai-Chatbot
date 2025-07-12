import os
from openai import OpenAI
from dotenv import load_dotenv

# Load environment variables from .env
load_dotenv()

# Retrieve the OpenRouter API key securely

# api_key = "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"

api_key = os.getenv("OPENROUTER_API_KEY")
# Ensure the API key is present
if not api_key:
    raise ValueError("Missing OpenRouter API key in .env!")

# Initialize the OpenAI client with OpenRouter
client = OpenAI(
    base_url="https://openrouter.ai/api/v1",
    api_key=api_key
)

def get_bot_response(user_input):
    try:
        completion = client.chat.completions.create(
            model="deepseek/deepseek-chat-v3-0324",
            messages=[
                {"role": "system", "content": "You are a helpful and concise assistant. Always respond briefly and clearly in 3–5 sentences max."},

                # {"role": "system", "content": "You are a helpful assistant."},
                {"role": "user", "content": user_input}
            ],
            extra_headers={
                "HTTP-Referer": "http://localhost:5000",  # Optional for analytics
                "X-Title": "MyChatbotApp"
            }
        )

        return completion.choices[0].message.content.strip()

    except Exception as e:
        print("OpenRouter API error:", e)
        return "Sorry, something went wrong with the AI model."
