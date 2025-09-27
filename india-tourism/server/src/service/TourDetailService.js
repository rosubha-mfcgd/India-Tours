const {CategoryRepository} = require ('../../dist/repository/CategoryRepository');
const { TourRepository } = require('../repository/TourRepository');
const { TourManagerRepository } = require('../repository/TourManagerRepository');
const {ProductRepository} = require ('../../dist/repository/ProductRepository');
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