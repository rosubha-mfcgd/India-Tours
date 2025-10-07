const TaskOperationService = require('../service/TaskOperationService');
require("../logNginx");

const getSearchOptions = async(req,res,retries = 3, delay = 1000) =>{
   
    try{
        let parameters = req.query;
        let productID = parameters.productID;
        let categoryID = parameters.categoryID;
        console.log('product ID...',productID)
        console.log('category ID...',categoryID)
     let options = await new TaskOperationService().getAllOptions(productID,categoryID);
     if(options)
        {
          console.log('result..',options);
          res.status(200).send(
                options);
          }
    }catch(err){
              if(retries>0)
            {
                console.log('retry attempted...')
              await new Promise(resolve => setTimeout(resolve, delay));
              return getSearchOptions(req,res,retries-1,delay);
            }
          logNginx(err.stack);
        res.status(400).send(
                {"errormessage":"could not load options for productid "+productID+" and categoryid "+categoryID});
       }
    }
    module.exports={getSearchOptions}