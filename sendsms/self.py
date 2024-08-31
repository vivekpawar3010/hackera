from twilio.rest import Client

# Twilio credentials
account_sid = 'AC1e2be9f4d6f40360351b70e695d69392'
auth_token = '13f49e6e8059bb66a541f15cc47d6126'
client = Client(account_sid, auth_token)

# List of phone numbers in E.164 format
phone_numbers = [
    '+919890528006',
    '+919322056160'
]

def send_sms(phone_number):
    try:
        message = client.messages.create(
            body='This is a test message from Twilio!',
            from_='+14436663336',  # Your Twilio phone number
            to=phone_number
        )
        print(f'SMS sent to {phone_number}. Message SID: {message.sid}')
    except Exception as e:
        print(f'Error sending SMS to {phone_number}:', e)

# Send SMS to each phone number in the list
for number in phone_numbers:
    send_sms(number)
