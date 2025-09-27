const TourDetailService = require('../service/TourDetailService');
require("../logNginx");


const getCategories = async(req,res) =>{
   
    try{
        let parameters = req.query;
        let productID = parameters.productID;
        
     let categories = await new TourDetailService().getCategories(productID);
     
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

const getProducts = async(req,res) =>{
   
    try{
     let products = await new TourDetailService().getProducts();
     
     if(products)
        {
          console.log('result..',products);
          res.status(200).send(
                products);
     
    }
    }catch(err){
        res.status(400).send(
                {"errormessage":"could not load products"});
    }
}

const updateFavoriteCategory = async(req,res) =>{
    try{
        let {categoryId, status} = req.body;
     let result = await new TourDetailService().updateCategoryAsFavorite(categoryId,status);

     if(result)
     {
        let data = {"categoryId":categoryId,"isUpdated": false};
        console.log('result in controller...',result);
        if(status === result.favorite)
        {
            data = {"categoryId":categoryId,"isUpdated": true};
        }
        
         res.status(201).send(
                data);
     }
    }catch(err){
        res.status(400).send(
                {"errormessage":"could not update categories"});
    }
}

const getToursByCategoryId = async(req,res) =>{
   
    try{
        const parameters = req.query;
       
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

const getTourManagers = async(req,res) =>{
   
    try{
     //   const parameters = req.query;
       
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
module.exports = {getCategories,getToursByCategoryId,updateFavoriteCategory,getProducts}