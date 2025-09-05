const UserService = require('../service/UserService');
require("../logNginx");


const getPoints = async(req,res) =>{
     try{
        let {email,mobile} = req.body;
     let points = await new UserService().getPoints(email,mobile);
          if (points) {
            res.status(200).send({"points":points,"mobile":req.body.mobile,"name":req.body.name,"email":req.body.email});
        }
    }catch(error)
    {

       res.status(400).send({"points":"N/A","mobile":req.body.mobile,"name":req.body.name,"email":req.body.email});
    }
}

module.exports = {getPoints}