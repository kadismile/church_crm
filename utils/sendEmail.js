const nodemailer = require('nodemailer');

const sendEmail = async options => {
  try{
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      service: "Gmail",
      port: 465,
      secure: true, // use SSL
      auth: {
        user: process.env.GMAIL_USERNAME,
        pass: process.env.GMAIL_PASSWORD
      }
    });
  
    const message = {
      from: `${process.env.FROM_NAME} <${process.env.FROM_EMAIL}>`,
      to: options.email,
      subject: options.subject,
      text: options.message,
      //html:""
    };
  
    const info = await transporter.sendMail(message);
  
    console.log('Message sent: %s', info.messageId);
  } catch (e) {
    console.log("error _____", e)
  }
  
};

module.exports = sendEmail;


var client = nodemailer.createTransport({
  service: 'SendGrid',
  auth: {
    user: 'SENDGRID_USERNAME',
    pass: 'SENDGRID_PASSWORD'
  }
});