import pandas as pd
from twilio.rest import Client
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart

# Twilio credentials
account_sid = 'AC1e2be9f4d6f40360351b70e695d69392'
auth_token = '13f49e6e8059bb66a541f15cc47d6126'
client = Client(account_sid, auth_token)

# Email credentials
smtp_server = 'smtp.gmail.com'
smtp_port = 587
smtp_user = 'vivekpawar932564@gmail.com'
smtp_password = 'your_app_password_here'  # Use App Password if 2-Step Verification is enabled

def send_notification(phone_number, email_address, message):
    # Send SMS
    try:
        client.messages.create(
            body=message,
            from_='+14436663336',  # Your Twilio phone number
            to=phone_number
        )
        print(f'SMS sent to {phone_number}!')
    except Exception as e:
        print(f'Error sending SMS to {phone_number}:', e)

    # Send Email
    msg = MIMEMultipart()
    msg['From'] = smtp_user
    msg['To'] = email_address
    msg['Subject'] = 'Notification'
    msg.attach(MIMEText(message, 'plain'))

    try:
        with smtplib.SMTP(smtp_server, smtp_port) as server:
            server.starttls()
            server.login(smtp_user, smtp_password)
            server.send_message(msg)
        print(f'Email sent to {email_address}!')
    except Exception as e:
        print(f'Error sending email to {email_address}:', e)

def process_csv(file_path):
    df = pd.read_csv(file_path)
    for _, row in df.iterrows():
        phone_number = row['phoneNumber']
        email_address = row['emailAddress']
        message = 'This is a notification message.'
        send_notification(phone_number, email_address, message)

# Example usage

process_csv('G:\\Real time alert system\\sendsms\\contacts.csv')
