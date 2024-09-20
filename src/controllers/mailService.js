require('dotenv').config(); 

const nodemailer = require('nodemailer');
// Configuration du transporteur pour Gmail
const transporter = nodemailer.createTransport({
  service: 'gmail', // Utilisation du service Gmail
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_PASS
  }
});

// Fonction pour envoyer un mail
const sendMail = async (mailOptions) => {
  try {
    let info = await transporter.sendMail(mailOptions);
  //  console.log('Message sent: %s', info.messageId);
    return info;
  } catch (error) {
   // console.error('Error sending email: %s', error);
    throw error;
  }
};

module.exports = {
  sendMail
};
