// services/emailService.js
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  auth: {
    user: 'abdabdullah6969@gmail.com' , 
       pass: 'ijpz ecfu lxsc wbbt' 
  },
});

exports.sendOTPEmail = async (email, otp) => {
  try {
    await transporter.sendMail({
      from: `"Secure Login" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: 'Your OTP Code',
      text: `Your OTP code is ${otp}`,
    });
  } catch (error) {
    console.error('Error sending email:', error);
    throw new Error('Failed to send OTP email');
  }
};