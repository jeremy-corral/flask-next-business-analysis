import openai
import os
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()


openai.api_key = OPENAI_API_KEY

class OpenAIBot:
    def __init__(self, engine):
        self.conversation = [{"role": "system", "content": "You are an expert brand strategist and give users the best advice on how to boost engagement and increase customer outreach."}]
        self.engine = engine

    def add_message(self, role, content):
        self.conversation.append({"role": role, "content": content})

    def generate_response(self, prompt):
        self.add_message("user", prompt)
        try:
            response = openai.ChatCompletion.create(
                model=self.engine,
                messages=self.conversation,
                max_tokens=255
            )
            assistant_response = response['choices'][0]['message']['content'].strip()
            self.add_message("assistant", assistant_response)
            return assistant_response
        except Exception as e:
            print('Error Generating Response:', e)

# Choose the model engine
engine = "gpt-4"

# Create the ChatBot instance
chatbot = OpenAIBot(engine)

# Define a function to interact with the bot
def chat_with_bot(prompt):
    response = chatbot.generate_response(prompt)
    return response

