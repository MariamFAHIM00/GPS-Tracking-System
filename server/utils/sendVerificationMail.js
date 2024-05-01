const emailjs = require("@emailjs/nodejs")

const sendVerificationMail = (user) => {

    // set Public Key as global settings
    emailjs.init({
        publicKey: process.env.PUBLIC_KEY,
        privateKey: process.env.PRIVATE_KEY,
    });

    const tempParmas = {
        to_name: user.username,
        from_name: "gpstracksys0@gmail.com",
        reply_to: user.email,
        subject: 'Email Verification',
        message:`${process.env.CLIENT_URL}/api/auth/verifyEmail`,
        emailToken:user.emailToken
    }

    emailjs.send(process.env.SERVICE_ID, process.env.TEMPLATE_ID, tempParmas)
        .then((res) => {
            console.log('SUCCESS! Verification Email Sent Succefully');
        })
        .catch((error) => {
            console.error("FAILED Sending Email:", error);
        });
}

module.exports = {sendVerificationMail}