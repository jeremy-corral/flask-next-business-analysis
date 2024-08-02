
# Import necessary modules and classes
from api.plots import plot_data
from flask import Flask, request, jsonify
from api.model import OpenAIBot, chat_with_bot
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
import pymysql
from flask_mysqldb import MySQL
from time import sleep

import os
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()


# Create Flask app
app = Flask(__name__)
CORS(app)

# Choose the model engine
engine = "gpt-4"

# Create the ChatBot instance
chatbot = OpenAIBot(engine)

# Google Cloud SQL credentials
PASSWORD = os.getenv("PASSWORD")
PUBLIC_IP_ADDRESS = os.getenv("PUBLIC_IP_ADDRESS")
DBNAME = os.getenv("DBNAME")
PROJECT_ID = os.getenv("PROJECT_ID")
INSTANCE_NAME = os.getenv("INSTANCE_NAME")

# Using the SQLALchemy format, replace with your details
app.config["SQLALCHEMY_DATABASE_URI"] = f"mysql+pymysql://root:{PASSWORD}@{PUBLIC_IP_ADDRESS}/{DBNAME}"
# Optional, but saves resources
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False  # Optional, but saves resources

db = SQLAlchemy(app)

# User ORM for SQLAlchemy
class Users(db.Model):
    id = db.Column(db.Integer, primary_key=True, nullable=False)
    prompt = db.Column(db.String(255), nullable=False)
    response = db.Column(db.String(10000), nullable=False)

    def __repr__(self):
        return '<Users %r>' % self.id


@app.route('/api/messages', methods=['GET'])
def get_messages():
    try:
        # Query all messages from the Users table
        all_messages = Users.query.all()
        
        # Prepare messages data to send to the client
        messages_data = [{'prompt': message.prompt, 'response': message.response} for message in all_messages]
        
        return jsonify(messages_data), 200
    except Exception as e:
        print(e)
        return jsonify({'error': str(e)}), 500

        
# Define an API route to interact with the bot
@app.route('/api/chatbot', methods=['POST'])
def chatbot_api():
    try:
        # Get the prompt from the request JSON data
        request_data = request.json
        prompt = request_data.get('prompt')

        print('Received prompt:', prompt)

        if prompt is None:
            raise ValueError('Prompt not found in request data')

        # Generate response from the bot
        response = chat_with_bot(prompt)

        
        print('Generated response:', response)
        print("types",type(prompt),type(response))
        print("content",prompt,response)
        

        new_prompt_response = Users(prompt=prompt, response=response)
        db.session.add( new_prompt_response)
        db.session.commit()
   
        return jsonify({'response': response}), 200
    except Exception as e:
        print(e)
        return jsonify({'error': str(e)}), 500

# Define an API route to interact with the bot
@app.route('/api/insights', methods=['POST'])
def insights_api():
    # Get URL from request data
    url = request.form.get('url')

    # Get CSV file from request files
    csvfile = request.files.get('csv')

    print('Received prompt:', url)

    if url is None or csvfile is None:
        raise ValueError('URL or CSV file not found in request data')

    # Save CSV file
    csvfile.save('uploaded.csv')

    # Generate response from the bot
    response = chat_with_bot("Generate a brand value document for that contains brand mission and vision, brand values and KPIs as separate sections for " + url)
    print(response)
    # Plot data and print PDF
    plot_data('uploaded.csv', response)

    return jsonify({'response': response}), 200




     

if __name__ == "__main__":
    app.run(debug=True)




    
