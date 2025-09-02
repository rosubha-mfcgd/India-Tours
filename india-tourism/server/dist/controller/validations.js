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
const session = require('express-session');
require("../logNginx");
const UserService = require('../service/UserService');
const constants = require("../utils/constants");
const { OAuth2Client } = require('google-auth-library');
const client = new OAuth2Client();
const signupvalidate = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    console.log('Here...', req.body);
    let { email, mobile, name } = req.body;
    if ((email === undefined || email === "") && (mobile === undefined || mobile === "")) {
        throw new Error("Please Provide Email / Mobile Number");
    }
    if (!name) {
        throw new Error("Please Provide your name");
    }
    const token = req.header("Authorization").replace("Bearer ", "");
    if (!token) {
        throw new Error('No signup token found');
    }
    const ticket = yield client.verifyIdToken({
        idToken: req.token,
        audience: process.env.CLIENT_ID, // Specify the CLIENT_ID of the app that accesses the backend
        // Or, if multiple clients access the backend:
        //[CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3]
    });
    const ticket_resp = ticket.getPayload();
    console.log('ticket...', ticket_resp);
    const userId = ticket_resp('sub');
    if (!userId) {
        throw new Error('Token is invalid...');
    }
    next();
});
const validateOTP = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let { email, mobile, otp } = req.body;
    console.log('req body....', req.body);
    if ((email === undefined || email === "") || (mobile === undefined || mobile === "")) {
        throw new Error("Email / Mobile Number not found");
    }
    if (!otp) {
        throw new Error("OTP not found");
    }
    let isValidOTP = yield new UserService().validateOTP(email, mobile, otp);
    if (isValidOTP) {
        console.log('isValidOTP...', isValidOTP);
        if (isValidOTP === constants.YES) {
            res.status(200).send({ message: "OTP is valid", "otpValid": isValidOTP });
        }
        else {
            res.status(400).send({ message: "OTP is invalid", "otpValid": isValidOTP });
        }
    }
});
module.exports = {
    signupvalidate, validateOTP
};
