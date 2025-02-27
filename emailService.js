import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config(); // Load .env file

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,  // ✅ Make sure this is loaded correctly
    pass: process.env.EMAIL_PASS,  // ✅ Make sure this is loaded correctly
  },
});

const sendReferralEmail = async (name, email, refereeEmail) => {
  try {
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: refereeEmail,
      subject: 'You have been referred!',
      text: `Hello! ${name} has referred you. Sign up using their email: ${email}.`,
    });
    console.log('Referral email sent successfully.');
  } catch (error) {
    console.error('Error sending email:', error);
  }
};

export default sendReferralEmail;
