require("../logNginx");
require("dotenv").config();
class UploadDocumentService{
    constructor(){
        this.errorMsg = "Message not found";
       
    }
      async uploadAdharDocs(fullNamw,file,yearofbirth)
       {
           let docUploadURL = process.env.IDENTITY_DOC_UPLOAD_URL;
           let bearerToken = process.env.IDENTITY_DOC_UPLOAD_API_TOKEN;
             try{
                

             }catch(err){
                    console.log(err.stack);
                    logNginx(err.stack);
             }
             return reviews;
       }

}
module.exports = UploadDocumentService

