require("../logNginx");

const UserProfileValidationService = require('../service/UserProfileValidationService');

//This function validates the mobile number against digilocker to confirm if adhar is linked to mobile
const validateMobile = async(req,res,retries = 3, delay = 1000) =>{

    try{
    const {mobile} = req.body;
     console.log('mobile...',mobile)
      let userProfileValidationService =  new UserProfileValidationService();
    let userExists = await userProfileValidationService.validatePhoneNumber(mobile);
    if(userExists)
    {
        res.status(200).send({"userExists":true,"mobile":mobile});
    }else{
       res.status(200).send({"userExists":false,"mobile":mobile}); 
    }
    }catch(err){
         if(retries>0)
        {
          await new Promise(resolve => setTimeout(resolve, delay));
          return validateMobile(req,res,retries-1,delay);
        }
          logNginx(err.stack);
          console.log(err.stack);
         res.status(400).send(
                        {"errormessage":"could not validate mobile"});
    }
}

//This function validates the aadhar card against digilocker
const validateAadhar = async(req,res,retries = 3, delay = 1000) =>{

    try{
        const {aadhaar_number} = req.body;
        console.log('aadhaar_number...',aadhaar_number)
        let userProfileValidationService =  new UserProfileValidationService();
        let userExists = await userProfileValidationService.validateAadhar(aadhaar_number);
        if(userExists)
        {
            res.status(200).send({"userExists":true,"aadhaar_number":aadhaar_number});
        }else{
        res.status(200).send({"userExists":false,"aadhaar_number":aadhaar_number}); 
        }
    }catch(err){
         if(retries>0)
        {
          await new Promise(resolve => setTimeout(resolve, delay));
          return validateAadhar(req,res,retries-1,delay);
        }
          logNginx(err.stack);
         res.status(400).send(
                        {"errormessage":"could not validate aadhar card"});
    }
}

module.exports = {validateMobile,validateAadhar}