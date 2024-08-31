from flask import Flask, render_template, request, redirect, flash
from twilio.rest import Client

app = Flask(__name__)
app.secret_key = 'c163574682069f55767534e9b335fdf0'

# Twilio credentials
account_sid = 'AC1e2be9f4d6f40360351b70e695d69392'
auth_token = '13f49e6e8059bb66a541f15cc47d6126'
twilio_number = '+14436663336'
client = Client(account_sid, auth_token)

@app.route('/', methods=['GET', 'POST'])
def index():
    if request.method == 'POST':
        to_number = request.form['number']
        message_body = request.form['message']

        try:
            message = client.messages.create(
                body=message_body,
                from_=twilio_number,
                to=to_number
            )
            flash('Message sent successfully!', 'success')
        except Exception as e:
            flash(f'Failed to send message: {str(e)}', 'danger')

        return redirect('/')

    return render_template('home.html')

if __name__ == '__main__':
    app.run(debug=True)
