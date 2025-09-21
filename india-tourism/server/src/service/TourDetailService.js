const {CategoryRepository} = require ('../../dist/repository/CategoryRepository');
const { TourRepository } = require('../repository/TourRepository');
const { TourManagerRepository } = require('../repository/TourManagerRepository');
require("../logNginx");

class TourDetailService{
   

constructor(){
      this.errorMsg = "Message not found";
    } 

async getCategories()
{
  let categories = [];
  try{
   const categoryRepo = new CategoryRepository();
   
      categories = await categoryRepo.findAll();
      
      if(categories && categories.length >0){
         console.log('categories...',categories);
           
      }
    }
    catch(err){
         console.log(err.stack);
        logNginx(err.stack);
        
      }
  return categories;
  }  

  async getToursByCategoryId(categoryId)
{
  let plannedTours = [];
  try{
   const tourRepository = new TourRepository();
   
      plannedTours = await tourRepository.find({"categoryID":Number(categoryId), "startDate":{$gt: new Date()}});
      
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

}
module.exports = TourDetailService