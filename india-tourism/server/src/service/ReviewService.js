const { ReviewsRepository } = require('../../dist/repository/ReviewRepository');

require("../logNginx");

class ReviewService{
    constructor(){
        this.errorMsg = "Message not found";
       
    }
      async getReviews(tourmanagerid,reviewDate)
       {
             const reviewRepo = new ReviewsRepository();
             let reviews = [];
             try{

                const isoReviewDate = new Date(reviewDate);
               reviews = reviewRepo.find({

                    tourOperatorId:Number(tourmanagerid), 
                    reviewDate: {
                        $gt: isoReviewDate
                    },
                    validReview: "Y"
                });
                 if(reviews && reviews.length >0){
                     console.log('tourOperators...',reviews);
                     return reviews;
                  }

             }catch(err){
                    console.log(err.stack);
                    logNginx(err.stack);
             }
             return reviews;
       }

}
module.exports = ReviewService

