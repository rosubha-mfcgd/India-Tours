const { ReviewRepository } = require('../../dist/repository/ReviewRepository');

require("../logNginx");

class ReviewService{
    constructor(){
        this.errorMsg = "Message not found";
       
    }
      async getReviews(tourmanagerid,reviewDate)
       {
             const reviewRepo = new ReviewRepository();
             let reviews = [];
             try{

                const isoReviewDate = new Date(reviewDate);
               reviews = reviewRepo.find({

                    tourOperatorId:Number(tourmanagerid), 
                    startDate: {
                        $gt: isoReviewDate
                    },
                    validReview: "Y"
                });
                 if(tourOperators && tourOperators.length >0){
                     console.log('tourOperators...',tourOperators);
                  }

             }catch(err){
                    console.log(err.stack);
                    logNginx(err.stack);
             }
             return reviews;
       }

}
module.exports = ReviewService

