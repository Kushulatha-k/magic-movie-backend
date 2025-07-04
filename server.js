const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

// Booking route
app.post('/api/bookings/book', async (req, res) => {
  const { email, movie, showtime, seats } = req.body;

  // Email setup
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: { user: process.env.EMAIL, pass: process.env.PASSWORD }
  });

  const mailOptions = {
    from: process.env.EMAIL,
    to: email,
    subject: 'Your Movie Booking Confirmation',
    text: `Booking confirmed!\n
Movie: ${movie}
Showtime: ${showtime}
Seats: ${seats}
Enjoy your show!`
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) console.log(error);
    else console.log('Email sent: ' + info.response);
  });

  res.json({ message: 'Booking confirmed and email sent!' });
});

app.listen(5000, () => console.log('Server running on port 5000'));
