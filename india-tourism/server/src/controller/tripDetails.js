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

const getToursByCategoryId = async(req,res) =>{
   
    try{
        const parameters = req.query;
        // Example: If URL is /path?name=John&age=30
        const categoryId = parameters.categoryId; 
         console.log('category id is....',categoryId)
     let plannedTours = await new TourDetailService().getToursByCategoryId(categoryId);
     
     if(plannedTours)
        {
          console.log('result..',plannedTours);
          res.status(200).send(
                plannedTours);
     
    }
    }catch(err){
        res.status(400).send(
                {"errormessage":"could not load any planned Tours by any operator"});
    }
}
module.exports = {getCategories,getToursByCategoryId}