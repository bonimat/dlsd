require('dotenv').config();
const nodemailer = require('nodemailer');

async function mailer(subject, messagehtml, toadress) {
    // create reusable transporter object using the default SMTP transport
    const transporter = nodemailer.createTransport({
        host: 'smtp.office365.com',
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
            user: process.env.SERVICEMAIL,
            pass: process.env.SERVICEMAILPSW,
        },
    });

    // send mail with defined transport object
    const info = await transporter.sendMail({
        from: process.env.SERVICEMAIL, // sender address
        to: toadress, // list of receivers
        subject: subject, // Subject line
        text: messagehtml, // plain text body
        html: messagehtml, // html body
    });

    return info;
}

module.exports = { mailer };
