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
const express = require('express');
const session = require('express-session');
require("../logNginx");
const { User } = require("../../dist/model/user");
const apputil = require('../utils/appUtility');
const EmailService = require('../service/EmailService');
const UserService = require('../service/UserService');
const subject = process.env.SIGNUP_EMAIL_SUBJECT;
const body = process.env.LOGIN_EMAIL_BODY;
const doLogin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log('req body', req.body);
    let { email, mobile, access_token } = req.body;
    let isLoggedin = null;
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
    return isLoggedin;
});
const resendOTP = (req, res) => {
};
module.exports = { doLogin };
