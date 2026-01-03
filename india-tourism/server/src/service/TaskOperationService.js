const { SearchOptionsRepository } = require('../../dist/repository/SearchOptionsRepository');

require("../logNginx");

class TaskOperationService{

    constructor(){
        this.errorMsg = "Message not found";
    }

       async getAllOptions(productID, categoryID)
       {
        let options = [];
        try{
            const searchOptionsRepo = new SearchOptionsRepository();
            console.log('productID....',productID)
            console.log('categoryID....',categoryID)
                options = await searchOptionsRepo.findAllSortedResultsByParams({
                    "productID":Number(productID),
                    "categoryID":Number(categoryID)},
                    {favorite:-1});
                
                if(options && options.length >0){
                    console.log('options...',options);
                    
                }
    }
    catch(err){
        // console.log(err.stack);
        logNginx(err.stack);
        
      }
  return options;
       }

}

module.exports = TaskOperationService