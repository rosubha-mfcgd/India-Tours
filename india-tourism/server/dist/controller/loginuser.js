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
const session = require('express-session');
require("../logNginx");
const apputil = require('../utils/appUtility');
const EmailService = require('../service/EmailService');
const UserService = require('../service/UserService');
const subject = process.env.SIGNUP_EMAIL_SUBJECT;
const body = process.env.LOGIN_EMAIL_BODY;
const doLogin = (req_1, res_1, ...args_1) => __awaiter(void 0, [req_1, res_1, ...args_1], void 0, function* (req, res, retries = 3, delay = 1000) {
    console.log('req body', req.body);
    let { email, mobile, access_token } = req.body;
    let isLoggedin = null;
    try {
        if (access_token) {
            session.access_token = access_token;
        }
        let loginOTP = apputil.generateOTP();
        console.log('loginOTP is....', loginOTP);
        if (email) {
            console.log('Sending email OTP to user email...');
            yield new EmailService().send(email, subject, body.
                concat(" ").concat(loginOTP));
        }
        if (mobile) {
            //Similar token logic to be implemented for mobile
            console.log('Sending login OTP to user mobile...');
        }
        yield new UserService().loginUser(email, mobile, loginOTP).then(result => {
            console.log('result is....', result);
            isLoggedin = result;
        }).catch(error => {
            console.log('Error in user login ');
            res.json({ message: "User login failed",
                "access_token": req.body.access_token });
            throw error;
        });
    }
    catch (err) {
        if (retries > 0) {
            yield new Promise(resolve => setTimeout(resolve, delay));
            return doLogin(req, res, retries - 1, delay);
        }
        logNginx(err.stack);
    }
    return isLoggedin;
});
const resendOTP = (req_1, res_1, ...args_1) => __awaiter(void 0, [req_1, res_1, ...args_1], void 0, function* (req, res, retries = 3, delay = 1000) {
    let { email, mobile, access_token } = req.body;
    try {
        if (access_token) {
            session.access_token = access_token;
        }
        let loginOTP = apputil.generateOTP();
        let result = yield new UserService().updateLoginOTP(email, mobile, loginOTP);
        if (result === 'Y') {
            if (email) {
                console.log('Sending OTP to user email...');
                yield new EmailService().send(email, subject, body.
                    concat(" ").concat(loginOTP));
            }
            if (mobile) {
                //Similar token logic to be implemented for mobile
                console.log('Sending login OTP to user mobile...');
            }
            res.status(200).send({ "otp": loginOTP, "email": email, "mobile": mobile });
        }
        else {
            res.status(500).send({ "email": email, "mobile": mobile, "error": "could not update otp" });
        }
    }
    catch (err) {
        if (retries > 0) {
            yield new Promise(resolve => setTimeout(resolve, delay));
            return resendOTP(req, res, retries - 1, delay);
        }
        logNginx(err.stack);
    }
});
module.exports = { doLogin, resendOTP };
