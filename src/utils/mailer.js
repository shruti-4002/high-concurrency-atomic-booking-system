// src/utils/mailer.js

const nodemailer = require("nodemailer");

/**
 * Configure SMTP Transporter
 * Using STARTTLS (Port 587) for secure communication
 */
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  secure: false, // false for port 587
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});


/**
 * Pre-flight check to ensure SMTP credentials and network connectivity 
 * are valid before the server starts accepting requests.
 */

transporter.verify((error,success)=>{     
if(error){
  console.log("SMTP Connection Error",error);
}else{
  console.log("Email Server is Ready to take message");
}
})


/**
 * Sends a welcome email to newly registered users
 * @param {string} email - Recipient's email address
 * @param {string} name - User's name
 */


const sendWelcomeEmail = async (email, name) => {
  try {
    await transporter.sendMail({
      from: '"Shruti App" <i.m.shruti@outlook.com>', // verified Brevo sender
      to: email,
      subject: "Welcome to Shruti App!",
     
      html: `<h3>Hello ${name}</h3><p>You are successfully registered!</p>`
    });
    console.log("Welcome email sent to:", email);

  } catch (err) {

    // We log the error but don't throw it to prevent breaking the main auth flow
    
    console.error("Error sending welcome email:", err);
  }
};
