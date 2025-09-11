const {CategoryRepository} = require ('../../dist/repository/CategoryRepository');
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

}

module.exports = TourDetailService