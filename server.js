require('dotenv').config();

const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

app.post('/api/send-email', (req, res) => {
    const { firstName, lastName, email, phone, company, city, message } = req.body;

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
        },
    });

    const mailOptions = {
        from: email,
        to: process.env.EMAIL_USER,
        subject: `Contact form data from ${email + " " + company}`,
        text: firstName + " " + lastName + "\nFirma: " + company + "\nCity: " + city + "\nPhone: " + phone + "\n\n" + message,
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return res.status(500).json({ message: 'There was an error occurred during sending the E-mail.', error: error });
        }
        res.status(200).json({ message: 'E-mail has been sent successfully!', info: info });
    });
});

app.use(cors({
    origin: 'http://localhost:3000'
}));

app.listen(5000, () => {
    console.log('Server is running on http://localhost:5000');
});
