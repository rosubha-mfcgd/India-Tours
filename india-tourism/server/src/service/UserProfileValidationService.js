require("../logNginx");
require("dotenv").config();

const axios = require('axios');
class UserProfileValidationService{
    constructor(){
        this.errorMsg = "Message not found";
    }
    
  async validatePhoneNumber(mobile)
  {
        
        try{
            let auth_token = await this.getAuthTokenForKycValidation();
            if(auth_token)
            {
                let kyc_validate_uri = process.env.KYC_VALIDATE_PROFILE;
                let x_api_key = process.env.KYC_X_API_KEY;
                console.log("access_token....",auth_token.data.access_token)
                 const headers = {
                 "Authorization": auth_token.data.access_token,
                 "Content-Type":"application/json",
                  "x-api-key":x_api_key,
                 "x-api-version":1.0,
                 "Cache-Control": "no-cache"
            };
            let data = {"@entity":"in.co.sandbox.kyc.digilocker.user.verification.request",
                "mobile":mobile
            }
            console.log('data....',data)
                let userProfileValidResponse = await axios.post(
                kyc_validate_uri,data,{headers}
            );
            if(userProfileValidResponse)
            {
                console.log("userProfileValidResponse...",userProfileValidResponse);
                if(userProfileValidResponse.status === 200 && 
                userProfileValidResponse.statusText === "OK")
                    {
                        if(userProfileValidResponse.data.code === 200)
                        {
                           if(userProfileValidResponse.data.data.user_exists)
                            {
                                console.log('mobile is linked to your aadhar');
                                return true;
                            } else{
                                 console.log('mobile is not linked to your aadhar');
                                return false;
                            }
                        }
                    }else{
                         console.log('mobile is not linked to your aadhar');
                                return false;
                    }
            }else{
                 console.log('mobile is not linked to your aadhar');
                                return false;
            }

            }

        }catch(err){
            logNginx(err);
             console.error('Error while validating mobile:::', err.stack);
              //throw err;
              return false;
        }
         return false;
  }

async validateAadhar(aadhaar_number)
  {
        
        try{
            let auth_token = await this.getAuthTokenForKycValidation();
            if(auth_token)
            {
                let kyc_validate_uri = process.env.KYC_VALIDATE_PROFILE;
                let x_api_key = process.env.KYC_X_API_KEY;
                console.log("access_token....",auth_token.data.access_token)
                 const headers = {
                 "Authorization": auth_token.data.access_token,
                 "Content-Type":"application/json",
                  "x-api-key":x_api_key,
                 "x-api-version":1.0,
                 "Cache-Control": "no-cache"
            };
            let data = {"@entity":"in.co.sandbox.kyc.digilocker.user.verification.request",
                "aadhaar_number":aadhaar_number
            }
                let userProfileValidResponse = await axios.post(
                kyc_validate_uri,data,{headers}
            );
            if(userProfileValidResponse)
            {
                if(userProfileValidResponse.status === 200 && 
                userProfileValidResponse.statusText === "OK")
                    {
                        if(userProfileValidResponse.data.code === 200)
                        {
                           if(userProfileValidResponse.data.data.user_exists)
                            {
                                console.log('aadhaar_number is valid');
                                return true;
                            } else{

                                console.log('aadhaar number is not valid')
                                return false;
                            }
                        }
                    }else
                    {
                         console.log('aadhaar number is not valid');
                                return false;
                    }
            }
            else{
                    console.log('aadhaar number is not valid');
                                return false;
                }

            }

        }catch(err){
            logNginx(err);
             console.error('Error while validating aadhar:::', err.stack);
              return false;
        }
         return false;
  }



//Fetch auth token for KYC validation
 async getAuthTokenForKycValidation()
  {
    let auth_uri = process.env.KYC_AUTH_TOKEN_URI;
    let x_api_key = process.env.KYC_X_API_KEY;
    let x_api_secret = process.env.KYC_API_SECRET;
    try{

        const headers = {
                 "Content-type": "application/json",
                 "x-api-key":x_api_key,
                 "x-api-secret":x_api_secret,
                 "x-api-version":"1.0.0",
                 'Accept': 'application/json'
            };
            console.log("api token....",auth_uri);
            const response = await axios.post(
                auth_uri,{},{headers}
            );
        if(response){
            console.log('access_token....',response.data);
            return response;
        }else{
            return "token not found";
        }
}
catch(err){
    logNginx(err);
    console.error('Error while fetching token:::', err.stack);
    throw err;
}
}
}
module.exports=UserProfileValidationService


