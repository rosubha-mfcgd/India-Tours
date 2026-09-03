require("../logNginx");

const TourDetailService = require('../service/TourDetailService');
const UserService = require('../service/UserService');
const ReviewService = require('../service/ReviewService');

const getRegisteredTourManagers=async(req,res,retries = 3, delay = 1000) =>{
    try{
    let tourManagers = await new UserService().getRegisteredTourOperators();
    if(tourManagers)
    {
        console.log('tourManagers..',tourManagers);
          res.status(200).send(
                tourManagers); 
    }
}catch(err)
{
     if(retries>0)
        {
          await new Promise(resolve => setTimeout(resolve, delay));
          return getRegisteredTourManagers(req,res,retries-1,delay);
        }
    logNginx(err.stack);
     res.status(400).send(
                {"errormessage":"could not find any tour operators"});
}

}

const getCities = async(req,res,retries = 3, delay = 1000) =>{
     try{
    let cities = await new TourDetailService().getCities();
    if(cities)
    {
        console.log('cities..',cities);
          res.status(200).send(
                cities); 
    }
}catch(err)
{
     if(retries>0)
        {
          await new Promise(resolve => setTimeout(resolve, delay));
          return getCities(req,res,retries-1,delay);
        }
    logNginx(err.stack);
     res.status(400).send(
                {"errormessage":"could not find any cities"});
}
}

const getOperatorReviews = async(req,res,retries = 3, delay = 1000) =>{
    let {tourManagerId,reviewDate} = req.body;
    console.log('tourManagerId,reviewDate....',tourManagerId,reviewDate)
  try{
    let operatorReviews = await new ReviewService().getReviews(tourManagerId,reviewDate);
  
    if(operatorReviews)
    {
        console.log('operatorReviews..',operatorReviews);
          res.status(200).send(
                operatorReviews); 
    }
}catch(err)
{
     if(retries>0)
        {
          await new Promise(resolve => setTimeout(resolve, delay));
          return getOperatorReviews(req,res,retries-1,delay);
        }
    logNginx(err.stack);
     res.status(400).send(
                {"errormessage":"could not find any reviews"});
}
}

const uploadIdentityDocs = async(req,res,retries = 3, delay = 1000) =>{
    let {tourManagerId,reviewDate} = req.body;
    console.log('tourManagerId,reviewDate....',tourManagerId,reviewDate)
  try{
    let operatorReviews = await new ReviewService().getReviews(tourManagerId,reviewDate);
  
    if(operatorReviews)
    {
        console.log('operatorReviews..',operatorReviews);
          res.status(200).send(
                operatorReviews); 
    }
}catch(err)
{
     if(retries>0)
        {
          await new Promise(resolve => setTimeout(resolve, delay));
          return getOperatorReviews(req,res,retries-1,delay);
        }
    logNginx(err.stack);
     res.status(400).send(
                {"errormessage":"could not find any reviews"});
}
}


module.exports = {getRegisteredTourManagers,getCities,getOperatorReviews,uploadIdentityDocs}
