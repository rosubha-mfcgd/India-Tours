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
const EmailService = require('../service/EmailService');
require("../logNginx");
const subject = process.env.BOOKING_CONFIRMATION_EMAIL_SUBJECT;
const additionalInfo = process.env.BOOKING_CONFIRMATION_EMAIL_SUBJECT_ADDL_TEXT1;
const startdateinfo = process.env.BOOKING_CONFIRMATION_EMAIL_SUBJECT_ADDL_TEXT_START_DATE;
const enddateinfo = process.env.BOOKING_CONFIRMATION_EMAIL_SUBJECT_ADDL_END_DATE;
const sendConfirmation = (req_1, res_1, ...args_1) => __awaiter(void 0, [req_1, res_1, ...args_1], void 0, function* (req, res, retries = 5, delay = 1000) {
    const { email, tourmanagername, locationName, bookingid, startDate, endDate } = req.body;
    let body = subject.concat(tourmanagername).concat(".");
    concat(additionalInfo).concat(startdateinfo).
        concat(startDate).
        concat(" ").concat(enddateinfo).concat(endDate);
    try {
        let subject = "Mitram Booking confirmation #" + bookingid + " for " + locationName + " tour";
        yield new EmailService().send(email, subject, body);
        res.status(200).send({ "status": "sent" });
    }
    catch (error) {
        if (retries > 0) {
            yield new Promise(resolve => setTimeout(resolve, delay));
            return sendEmail(req, res, retries - 1, delay);
        }
        console.log(error.stack);
        //logNginx(error.stack);
        res.status(400).send({ "status": "could not send email" });
    }
});
module.exports = { sendConfirmation };
