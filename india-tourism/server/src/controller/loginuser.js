const express = require('express');
const session = require('express-session');
require("../logNginx");
const {User} = require("../../dist/model/user");
const apputil = require('../utils/appUtility');
const EmailService = require('../service/EmailService');
 const subject = process.env.SIGNUP_EMAIL_SUBJECT;
const body = process.env.LOGIN_EMAIL_BODY;

const doLogin = async(req,res) => {

    console.log('req body',req.body);
  
    const { email,mobile } = req.body;

    let access_token = req.body.access_token;

    if(access_token)
    {
        session.access_token = access_token;
    }
      let loginOTP =  apputil.generateOTP();
        console.log('loginOTP is....',loginOTP);
      
        if(email)
        {
            console.log('Sending email OTP to user email...');
            await new EmailService().send(email,subject,body.
              concat(" ").concat(loginOTP));
        }
        if(mobile)
        {
            //Similar token logic to be implemented for mobile
            console.log('Sending login OTP to user mobile...');
        }
}

module.exports = doLogin;