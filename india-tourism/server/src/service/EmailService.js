const nodemailer = require('nodemailer');
const apputil = require('../utils/appUtility')
require("dotenv").config();

class EmailService {
  constructor() {

    let password = process.env.EMAIL_PASSWORD;
     this.transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      auth: {
        user: process.env.EMAIL_USERNAME,
        pass: password,
      },
    });
  }

  async send(to, subject, text) {
    const mailOptions = {
      from: process.env.EMAIL_USERNAME,
      to,
      subject,
      text,
    };
    const result = await this.transporter.sendMail(mailOptions);
    return result;
  }
}

module.exports = EmailService;