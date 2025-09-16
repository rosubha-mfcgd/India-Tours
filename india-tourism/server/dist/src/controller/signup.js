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
const express = require("express");
require("../logNginx");
const { User } = require("../../dist/model/user");
const apputil = require('../utils/appUtility');
const EmailService = require('../service/EmailService');
const UserService = require('../service/UserService');
const constants = require("../utils/constants");
const subject = process.env.SIGNUP_EMAIL_SUBJECT;
const body = process.env.SIGNUP_EMAIL_BODY;
const doSignup = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log('req body', req.body);
    const { email, mobile, name } = req.body;
    let isSignUp = null;
    // checks if the email entered is valid or not
    try {
        let signupOTP = apputil.generateOTP();
        console.log('signUpOTP is....', signupOTP);
        yield new EmailService().send(email, subject, body.
            concat(" ").concat(signupOTP));
        yield new UserService().signupUser(email, mobile, name, signupOTP).
            then(result => {
            console.log('result...', result);
            if (result === constants.YES || result === constants.EXISTS) {
                isSignUp = result;
            }
            else {
                isSignUp = constants.NO;
            }
        }).catch(error => {
            console.log(error);
            console.log('Error in user signup... ');
            res.json({ message: "Account signup failed",
                "access_token": req.body.access_token });
            throw error;
        });
    }
    catch (err) {
        logNginx(err.stack);
    }
    return isSignUp;
});
module.exports = { doSignup };
