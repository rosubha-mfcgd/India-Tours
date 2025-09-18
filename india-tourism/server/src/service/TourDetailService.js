const {CategoryRepository} = require ('../../dist/repository/CategoryRepository');
const { TourRepository } = require('../repository/TourRepository');
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

}

module.exports = TourDetailService