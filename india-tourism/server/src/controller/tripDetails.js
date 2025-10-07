const TourDetailService = require('../service/TourDetailService');
require("../logNginx");


const getCategories = async(req,res,retries = 3, delay = 1000) =>{
   
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
            if(retries>0)
            {
                 await new Promise(resolve => setTimeout(resolve, delay));
                return getCategories(req,res,retries-1,delay);
            }
        res.status(400).send(
                {"errormessage":"could not load categories"});
    }
}

const getProducts = async(req,res,retries = 3, delay = 1000) =>{
   
    try{
     let products = await new TourDetailService().getProducts();
     
     if(products)
        {
          console.log('result..',products);
          if(products)
          {
          res.status(200).send(
                products);
          }else{
            throw new Error("could not get the product on attempt #:-",retries);
          }
    }
    }catch(err){
         if(retries>0)
        {
          await new Promise(resolve => setTimeout(resolve, delay));
          return getProducts(req,res,retries-1,delay);
        }
        res.status(400).send(
                {"errormessage":"could not load products"});
    }
}

const updateFavoriteCategory = async(req,res,retries = 3, delay = 1000) =>{
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
         if(retries>0)
            {
                 await new Promise(resolve => setTimeout(resolve, delay));
                return updateFavoriteCategory(req,res,retries-1,delay);
            }

        res.status(400).send(
                {"errormessage":"could not update categories"});
    }
}

const getToursByCategoryId = async(req,res,retries = 3, delay = 1000) =>{
   
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
          if(retries>0)
            {
                 await new Promise(resolve => setTimeout(resolve, delay));
                return getToursByCategoryId(req,res,retries-1,delay);
            }
        res.status(400).send(
                {"errormessage":"could not load any planned Tours by any operator"});
    }
}

const getTourManagers = async(req,res,retries = 3, delay = 1000) =>{
   
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
        if(retries>0)
            {
                 await new Promise(resolve => setTimeout(resolve, delay));
                return getTourManagers(req,res,retries-1,delay);
            }
        res.status(400).send(
                {"errormessage":"could not load any planned Tours by any operator"});
    }
}
module.exports = {getCategories,getToursByCategoryId,updateFavoriteCategory,getProducts,getTourManagers}