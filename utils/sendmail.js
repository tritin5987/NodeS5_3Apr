const nodemailer = require("nodemailer");
const transporter = nodemailer.createTransport({
    host: "sandbox.smtp.mailtrap.io",
    port: 25,
    secure: false,
    auth: {
        user: "ec4e2da027a852",
        pass: "414065fa0944b1",
    },
});
module.exports = {
    sendmail: async function (to, subject, URL) {
        return await transporter.sendMail({
            from: 'NNPTDU@heheheh.com',
            to: to,
            subject: subject,
            html: `<a href="https://imgflip.com/i/9orzy8"><img src="https://i.imgflip.com/9orzy8.jpg" title="made at imgflip.com"/></a><div><a href="https://imgflip.com/memegenerator"></a></div>`, // html body
        });
    }
}