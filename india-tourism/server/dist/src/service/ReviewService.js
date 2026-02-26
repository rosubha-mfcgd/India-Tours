"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const { ReviewsRepository } = require('../../dist/repository/ReviewRepository');
require("../logNginx");
class ReviewService {
    constructor() {
        this.errorMsg = "Message not found";
    }
    getReviews(tourmanagerid, reviewDate) {
        return __awaiter(this, void 0, void 0, function* () {
            const reviewRepo = new ReviewsRepository();
            let reviews = [];
            try {
                const isoReviewDate = new Date(reviewDate);
                reviews = reviewRepo.find({
                    tourOperatorId: Number(tourmanagerid),
                    reviewDate: {
                        $gt: isoReviewDate
                    },
                    validReview: "Y"
                });
                if (reviews && reviews.length > 0) {
                    console.log('tourOperators...', reviews);
                    return reviews;
                }
            }
            catch (err) {
                console.log(err.stack);
                logNginx(err.stack);
            }
            return reviews;
        });
    }
}
module.exports = ReviewService;
