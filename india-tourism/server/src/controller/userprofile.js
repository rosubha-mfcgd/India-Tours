const UserService = require('../service/UserService');
require("../logNginx");


const getPoints = async(req,res,retries = 3, delay = 1000) =>{
     try{
        let {email,mobile} = req.body;
     let points = await new UserService().getPoints(email,mobile);
          if (points) {
            res.status(200).send({"points":points,"mobile":req.body.mobile,"name":req.body.name,"email":req.body.email});
        }
    }catch(error)
    {
        if(retries>0)
            {
                 await new Promise(resolve => setTimeout(resolve, delay));
                return getPoints(req,res,retries-1,delay);
            }
       res.status(400).send({"points":"N/A","mobile":req.body.mobile,"name":req.body.name,"email":req.body.email});
    }
}

const findUser = async(req,res,retries = 3, delay = 1000) => {
   let { email,mobile,access_token } = req.body;
 
   try{
    if(access_token)
    {
            let result = await new UserService().findUser(email,mobile);
            if(result)
            {
                console.log('result....',result);
                res.status(200).send({"name":result.name, "mobile":result.mobile, 
                    "emailID":result.emailID});
            }
    }
    }catch(error)
    {
        if(retries>0)
            {
                 await new Promise(resolve => setTimeout(resolve, delay));
                return findUser(req,res,retries-1,delay);
            }
       res.status(400).send({"error":"User not found"});
    }
        
   }


const updateProfile = async(req,res,retries = 3, delay = 1000) =>{

 let { email,mobile,prefs, address, city, zipcode } = req.body;

 try{
    console.log('Here for update profile....')
   
         let result = await new UserService().updateUserDetails(email,mobile,prefs,address,city,zipcode);
         if(result)
         {
             res.status(200).send({"name":result.name, "mobile":result.mobile, "emailID":result.emailID});
         }else{
                res.status(400).send({"error":"Profile could not be updated, try again"});
            }
         
    }
         catch(err){
                if(retries>0)
            {
                 await new Promise(resolve => setTimeout(resolve, delay));
                return updateProfile(req,res,retries-1,delay);
            }
             res.status(400).send({"error":"Profile could not be updated, try again"});
        }
    }
module.exports = {getPoints,findUser,updateProfile}