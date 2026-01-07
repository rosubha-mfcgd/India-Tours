const {CategoryRepository} = require ('../../dist/repository/CategoryRepository');
const { TourRepository } = require('../../dist/repository/TourRepository');
const { TourItineraryRepository } = require('../../dist/repository/TourItineraryRepository');
const { TourManagerRepository } = require('../../dist/repository/TourManagerRepository');
const {ProductRepository} = require ('../../dist/repository/ProductRepository');
const {CityRepository} = require ('../../dist/repository/CityRepository');
const { BookingRepository } = require('../../dist/repository/BookingRepository');
require("../logNginx");

class TourDetailService{
   

constructor(){
      this.errorMsg = "Message not found";
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
        [{"category._id":Number(categoryId)},
        {"startDate":{$gt: new Date().toLocaleDateString('en-CA')}}]);
      
      if(plannedTours && plannedTours.length >0){
         console.log('plannedTours...',plannedTours);
           
      }
    }
    catch(err){
         console.log(err.stack);
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
         // let isoStartDate = new Date(startDate);
         // let isoEndDate = new Date(endDate);
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
  
async getTourManagers()
{
  let tourOperators = [];
  try{
   const tourMgrRepository = new TourManagerRepository();
   
      tourOperators = await tourMgrRepository.find({});
      
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