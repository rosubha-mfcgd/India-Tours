const { PreferenceRepository } = require('../repository/PreferenceRepository');

require("../logNginx");

class PreferenceService{

     constructor(){
        this.errorMsg = "Message not found";
    }

     async getPreferences()
       {
            let preferences = [];
            const preferenceRepo = new PreferenceRepository();
                    try{
                        
                     //   console.log('productID....',productID)
                       // console.log('categoryID....',categoryID)
                            preferences = await preferenceRepo.find({});
                            
                            if(preferences && preferences.length >0){
                                console.log('preferences...',preferences);
                                return preferences;
                            }
                }
                catch(err){
                    
                    logNginx(err.stack);
                    console.log(err.stack);
                  }
                  return [];
        }
}

module.exports = PreferenceService