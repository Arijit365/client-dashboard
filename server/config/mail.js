
import dotenv from 'dotenv';
import nodemailer from 'nodemailer';
dotenv.config();

export const transporter = nodemailer.createTransport({
    host:process.env.SMTP_EMAIL_HOST,
    port:587,
    secure:false,
    auth:{
    user:process.env.SMTP_USERNAME,
    pass:process.env.SMTP_PASSWORD
    }
})

//  verify the connection 
transporter.verify(function(error,success){
    if(error){
        console.log(error);
    }
    else{
        console.log("server is ready to take messages");
    }
})

