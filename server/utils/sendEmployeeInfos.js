const emailjs = require("@emailjs/nodejs")

const sendEmployeeInfos = (user) => {

    // set Public Key as global settings
    emailjs.init({
        publicKey: process.env.PUBLIC_KEY,
        privateKey: process.env.PRIVATE_KEY,
    });

    const tempParmas = {
        to_name: user.firstName,
        from_name: "mariam.fahim.2003@gmail.com",
        reply_to: user.email,
        subject: 'Account DriveLux Infos',
        email: user.email,
        password: user.password,
    }

    emailjs.send(process.env.SERVICE_ID, process.env.TEMPLATE_EMPLOYEEINFOS_ID, tempParmas)
        .then((res) => {
            console.log('SUCCESS! Email Sent Succefully');
        })
        .catch((error) => {
            console.error("FAILED Sending Email:", error);
        });
}

module.exports = {sendEmployeeInfos}