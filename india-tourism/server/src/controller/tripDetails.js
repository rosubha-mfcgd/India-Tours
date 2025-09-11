const TourDetailService = require('../service/TourDetailService');
require("../logNginx");


const getCategories = async(req,res) =>{
   
    try{
     let categories = await new TourDetailService().getCategories();
     
     if(categories)
        {
          console.log('result..',categories);
          res.status(200).send(
                categories);
     
    }
    }catch(err){
        res.status(400).send(
                {"errormessage":"could not load categories"});
    }
}
module.exports = {getCategories}