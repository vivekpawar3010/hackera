const fs = require("fs");
const csv = require("csv-parser");
const twilio = require("twilio");
const nodemailer = require("nodemailer");

// Twilio credentials
const accountSid = "AC1e2be9f4d6f40360351b70e695d69392";
const authToken = "13f49e6e8059bb66a541f15cc47d6126";
const client = twilio(accountSid, authToken);

// Email credentials
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "vivekpawar932564@gmail.com",
    pass: "vivekpawar932564@",
  },
});

async function sendNotification(phoneNumber, emailAddress, message) {
  // Send SMS
  try {
    await client.messages.create({
      body: message,
      from: "9322027844",
      to: phoneNumber,
    });
    console.log(`SMS sent to ${phoneNumber}!`);
  } catch (error) {
    console.error(`Error sending SMS to ${phoneNumber}:`, error);
  }

  // Send Email
  const mailOptions = {
    from: "vivekpawar932564@gmail.com",
    to: emailAddress,
    subject: "Notification",
    text: message,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(`Email sent to ${emailAddress}!`);
  } catch (error) {
    console.error(`Error sending email to ${emailAddress}:`, error);
  }
}

function processCSV(filePath) {
  fs.createReadStream(filePath)
    .pipe(csv())
    .on("data", async (row) => {
      const { phoneNumber, emailAddress } = row;
      const message = "This is a notification message.";
      await sendNotification(phoneNumber, emailAddress, message);
    })
    .on("end", () => {
      console.log("CSV file successfully processed.");
    });
}

// Example usage
processCSV("contacts.csv");
