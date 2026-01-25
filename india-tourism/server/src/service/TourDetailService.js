const {CategoryRepository} = require ('../../dist/repository/CategoryRepository');
const { TourRepository } = require('../../dist/repository/TourRepository');
const { TourItineraryRepository } = require('../../dist/repository/TourItineraryRepository');
const { TourOperatorRepository } = require('../../dist/repository/TourOperatorRepository');
const {ProductRepository} = require ('../../dist/repository/ProductRepository');
const {CityRepository} = require ('../../dist/repository/CityRepository');
const {StateRepository} = require ('../../dist/repository/StateRepository');

const {cityCache,stateCache, tourOperatorCache} = require('../utils/cacheMap');
require("../logNginx");

class TourDetailService{
   

static{
   this.getAllCities().then(cities =>{
       for(let city of cities)
      {
        cityCache.set(city._id, city);
      }
      console.log('city list...',cityCache)
  });
  
this.getAllStates().then(states=>{
   for(let state of states)
      {
        stateCache.set(state._id, state);
      }
      console.log('state list...',stateCache)
});

this.getTourManagers().then(tourmanagers=>{
   for(let tourmanager of tourmanagers)
      {
        tourOperatorCache.set(tourmanager._id, tourmanager);
      }
      console.log('tour operators list...',tourOperatorCache)
});
}

constructor(){
      this.errorMsg = "Message not found";
    } 

static async getAllCities()
{
  let cities = [];
  try{
     const cityRepository = new CityRepository();
     cities = await cityRepository.findAll();
     if(cities)
     {
        return cities;
     }
  }catch(err){
    logNginx(err);
  }
  return [];
}

static async getAllStates()
{
  let states = [];
  try{
     const stateRepository = new StateRepository();
     states = await stateRepository.findAll();
     if(states)
     {
        return states;
     }
  }catch(err){
    logNginx(err);
  }
  return [];
}


async getCategories(productID)
{
  let categories = [];
  try{
   const categoryRepo = new CategoryRepository();
   console.log('productID....',productID)
      categories = await categoryRepo.findAllSortedResultsByParams({"productID":Number(productID)},{favorite:-1});
      
      if(categories && categories.length >0){
         console.log('categories...',categories);
           
      }
    }
    catch(err){
        // console.log(err.stack);
        logNginx(err.stack);
        
      }
  return categories;
  } 

  async getProducts()
{
  let products = [];
  try{
   const productRepo = new ProductRepository();
   
      products = await productRepo.findAllSortedResults({favorite:-1});
      
      if(products && products.length >0){
         console.log('products...',products);
           
      }
    }
    catch(err){
       logNginx(err.stack);
       }
  return products;
  } 

  async updateCategoryAsFavorite (categoryId,status) {
    let categories = '';
    let result = '';
    try{
       const categoryRepo = new CategoryRepository();
      console.log('category Id ...',categoryId);
      categories = await categoryRepo.findOne({categoryID:categoryId}); 
      if(categories){
        console.log('categories....',categories);
       result = await categoryRepo.update(categories._id,{favorite:status});
       
       
       if(result)
       {
         // console.log('categories with favorite....',JSON.stringify(result));
          result = await categoryRepo.findOne({categoryID:categoryId}); 
       }      
       
      }
    }catch(err){
      logNginx(err.stack);
    }
    return result;
  }

  async getToursByCategoryId(categoryId)
{
  let plannedTours = [];
  try{
   const tourRepository = new TourRepository();
   
      plannedTours = await tourRepository.aggregatePlannedTours(
        [{"category":Number(categoryId)},
        {"startDate":{$gt: new Date()}}]);
      
      if(plannedTours && plannedTours.length >0){
        // console.log('plannedTours...',plannedTours);
          for(let plannedTour of plannedTours)
      {
        plannedTour["cityName"] = (cityCache.get(plannedTour.city)).name;
        plannedTour["stateName"] = (stateCache.get(plannedTour.state)).name;
      }
           
      }
     
    }
    catch(err){
        logNginx(err.stack);
        }
  return plannedTours;
  }


    async getRecommendedTours()
{
  let plannedTours = [];
  try{
   const tourRepository = new TourRepository();
   
      plannedTours = await tourRepository.aggregatePlannedTours(
        [{"recommend":"Y"},
        {"startDate":{$gt: new Date()}}]);
      
      if(plannedTours && plannedTours.length >0){
        // console.log('plannedTours...',plannedTours);
          for(let plannedTour of plannedTours)
      {
        plannedTour["cityName"] = (cityCache.get(plannedTour.city)).name;
        plannedTour["stateName"] = (stateCache.get(plannedTour.state)).name;
      }
           
      }
     
    }
    catch(err){
        logNginx(err.stack);
        }
  return plannedTours;
  }





  async getTourItenriesForTrip(locationName,categoryId,tourManagerId,
    startDate,endDate)
  {
      let itinerary = '';
      const tourItineraryRepository = new TourItineraryRepository();
      try{
          const isoStartDate = new Date(startDate);
          const isoEndDate = new Date(endDate);
          isoStartDate.setUTCHours(0, 0, 0, 0);
          isoEndDate.setUTCHours(0, 0, 0, 0);
           console.log('Service reached...',isoStartDate,isoEndDate)
              itinerary = await tourItineraryRepository.
              findOne({
                categoryID:Number(categoryId), 
                locationName: locationName,
                tourManagerId:tourManagerId,
               startDate: 
               {
                $eq: isoStartDate
              },
               endDate : 
               {
                $eq: isoEndDate
               }
              });
              
              if(itinerary){
                  console.log('found itinerary...',itinerary);
               }
    }
    catch(err){
         console.log(err.stack);
        logNginx(err.stack);
        
      }
  return itinerary;
  }
  
static async getTourManagers()
{
  let tourOperators = [];
  try{
   const tourOperatorRepository = new TourOperatorRepository();
   
      tourOperators = await tourOperatorRepository.find({});
      
      if(tourOperators && tourOperators.length >0){
         console.log('tourOperators...',tourOperators);
           
      }
    }
    catch(err){
         console.log(err.stack);
        logNginx(err.stack);
        
      }
  return tourOperators;
  } 


  async getCities()
{
  let cities = [];
  try{
   const cityRepository = new CityRepository();
   
      cities = await cityRepository.find({});
      
      if(cities && cities.length >0){
         console.log('cities...',cities);
           
      }
    }
    catch(err){
         console.log(err.stack);
        logNginx(err.stack);
        
      }
  return cities;
  } 

 
  }
module.exports = TourDetailService