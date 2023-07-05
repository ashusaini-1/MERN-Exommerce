const  nodeMailer=require('nodemailer');

const sendEmail=async(options)=>{

const transporter=nodeMailer.createTransport({
host:'smtp.ethereal.email',
port:587,
auth: {
    user: 'michele.swift44@ethereal.email',
    pass: 'bhfk24CGyjwk5CYTFb',
  },
})
const mailOptions = {
    from: 'michele.swift44@ethereal.email',
    to: 'coderisapassion123@gmail.com',
    subject: 'Test Email',
    text: 'This is a test email sent from Nodemailer with Ethereal Email',
  };
  await transporter.sendMail(mailOptions);
};


module.exports = sendEmail;