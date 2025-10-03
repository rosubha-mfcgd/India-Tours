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

module.exports = {getPoints}