const nodemailer = require('nodemailer');
const path = require('path');

const sendEmail = async ({ to, subject, html, from, attachments }) => {
    const transporter = nodemailer.createTransport({
        host: 'smtp.ethereal.email',
        port: 587,
        auth: {
            user: process.env.USER, // generated ethereal user
            pass: process.env.PASS // generated ethereal password
        }
    })

    await transporter.sendMail({ from, to, subject, html, attachments });
    console.log("Email sent sucessfully");
};

const sendApplyEmail = async (email, jobProfile, file, message) => {

    const baseDir = 'D:/acentria/server/public/uploads/';
    const fileName = `${file.filename}`;
    const filePath = path.join(baseDir, fileName);
    await sendEmail({
        from: process.env.EMAIL_FROM,
        to: email,
        subject: `Applied For ${jobProfile}`,
        html: `<h4>Have a Great Day!</h4> ${message}`,
        attachments: [
            {
                filename: file.originalname,
                path: filePath,
            },
        ],
    });

}

module.exports = sendApplyEmail;