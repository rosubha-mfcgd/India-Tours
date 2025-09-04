const express = require("express")
const session = require('express-session');
require("../logNginx");
const UserService = require('../service/UserService');
const constants = require("../utils/constants");
const {OAuth2Client} = require('google-auth-library');

const client = new OAuth2Client();



const signupvalidate =async (req, res,next)  =>
{
    console.log('Here...',req.body);
    
    let {email,mobile,name} = req.body;
    if ((email === undefined || email === "") && (mobile === undefined || mobile === "")){
        throw new Error("Please Provide Email / Mobile Number")
      }
      if(!name)
      {
        throw new Error("Please Provide your name")
      }
      const token = req.header("Authorization").replace("Bearer ", "")
    if(!token){
        throw new Error('No signup token found');
    }
    const ticket = await client.verifyIdToken({
        idToken: req.token,
        audience: process.env.CLIENT_ID,  // Specify the CLIENT_ID of the app that accesses the backend
        // Or, if multiple clients access the backend:
        //[CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3]
    });

    const ticket_resp = ticket.getPayload();
    console.log('ticket...',ticket_resp);
    const userId = ticket_resp('sub');
    if(!userId)
        {
            throw new Error('Token is invalid...'); 
        } 
        next();
}

const validateOTP = async(req,res) =>{
    let {email,mobile,otp} = req.body;
    console.log('req body....',req.body);
    try{
    if ((email === undefined || email === "") || (mobile === undefined || mobile === "")){
        throw new Error("Email / Mobile Number not found")
      }

      if(!otp)
      {
        throw new Error("OTP not found")
      }
    let isValidOTP = await new UserService().validateOTP(email,mobile,otp);
    if(isValidOTP)
      {

      console.log('isValidOTP...',isValidOTP);
      
     if(isValidOTP == constants.YES)
      {
         res.status(200).send({ "message": "OTP is valid", "otpValid":isValidOTP});
      }
     else{
       //  console.log('sending back invalid OTP ...',isValidOTP);
         res.status(400).send({ "message": "OTP is invalid, try again !!", "otpValid":isValidOTP});
      }
      }else{
        res.status(400).send({ "message": "OTP is invalid, try again !!", "otpValid":"N"});
      }
    }catch(e){
      logNginx(e.stack);
      res.status(400).send(e.message);
    }
  }
module.exports = {
    signupvalidate,validateOTP
}