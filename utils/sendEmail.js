const nodemailer = require('nodemailer');
const kue = require('kue');
const queue = kue.createQueue();


const sendEmail = async () => {
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
    
    queue.process('forgotEmailPasswordJob',  function(job, done){
      const emailData = job.data;
      const message = {
        from: `${process.env.FROM_NAME} <${process.env.FROM_EMAIL}>`,
        to: emailData.email,
        subject: emailData.subject,
        text: emailData.message,
        //html:""
      };
      transporter.sendMail(message);
      done()
    });
    
  } catch (e) {
    console.log("error _____", e)
  }
  
};

module.exports = sendEmail;