document.getElementById('alertForm').addEventListener('submit', function(event) {
    event.preventDefault();

    // Get the phone numbers and emails from the input fields
    const phoneNumbers = document.getElementById('phoneNumbers').value.split(',');
    const emails = document.getElementById('emails').value.split(',');

    // Simulate sending a request to the server for each recipient
    phoneNumbers.forEach(phoneNumber => {
        sendSmsAlert(phoneNumber.trim());
    });

    emails.forEach(email => {
        sendEmailAlert(email.trim());
    });

    // Display a success message
    document.getElementById('message').innerText = 'Alerts sent successfully to all recipients!';
});

// Function to simulate sending an SMS alert
function sendSmsAlert(phoneNumber) {
    // Simulated static message
    const message = 'Alert: A disaster has occurred in your area. Stay safe!';

    // Example of sending SMS (simulated here with a console log)
    console.log('Sending SMS to', phoneNumber, 'with message:', message);

    // You would replace the console.log with an actual API call to your SMS service provider
    // For example, using Twilio:
    // fetch('/send-sms', {
    //     method: 'POST',
    //     headers: {
    //         'Content-Type': 'application/json'
    //     },
    //     body: JSON.stringify({ phoneNumber: phoneNumber, message: message })
    // });
}

// Function to simulate sending an email alert
function sendEmailAlert(email) {
    // Simulated static message
    const message = 'Alert: A disaster has occurred in your area. Stay safe!';

    // Example of sending email (simulated here with a console log)
    console.log('Sending Email to', email, 'with message:', message);

    // You would replace the console.log with an actual API call to your email service provider
    // For example, using SendGrid:
    // fetch('/send-email', {
    //     method: 'POST',
    //     headers: {
    //         'Content-Type': 'application/json'
    //     },
    //     body: JSON.stringify({ email: email, message: message })
    // });
}
