"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const nodemailer = require('nodemailer');
const apputil = require('../utils/appUtility');
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
    send(to, subject, text) {
        return __awaiter(this, void 0, void 0, function* () {
            const mailOptions = {
                from: process.env.EMAIL_USERNAME,
                to,
                subject,
                text,
            };
            const result = yield this.transporter.sendMail(mailOptions);
            return result;
        });
    }
}
module.exports = EmailService;
