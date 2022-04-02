const nodemailer =  require('nodemailer');
const jwt = require ('jsonwebtoken');
require('dotenv').config({ path: 'config.env'});


const options = {
    host:process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    secure: false,
     auth: {
         user: process.env.EMAIL_USERNAME,
         pass: process.env.EMAIL_PASSWORD
     }
};

const sendConfirmationEmail = async function sendEmail(
    {email ,otp},
    ){
        
    const transporter = nodemailer.createTransport(options);

    const mailOptions = {
        from: 'noreply@twitter',
        to: email,
        subject: 'Twitter verification email',
        html: `<p> your verification code is ${otp} </p>`
    };
    
    await transporter.sendMail(mailOptions);
    
};
    //1)create  using options
    //2)Define the email it self
    //3) Actually send the email 
    

module.exports = sendConfirmationEmail;