import { Schema, model } from 'mongoose';
import {IReviews} from '../repository/AppEntityState';

const reviewSchema = new Schema<IReviews>({

     tourOperatorId: {
        type: Number,
      	ref: "User",
      	required: true,
   		 },
    reviews:{
       type: String,
      required: true
    },
    username:{
       type: String,
      required: true
    },
    email: String,
    validReview: String,
    reviewDate: {
          type: Date,
          required: true
        }    
  });

export const ReviewModel = model<IReviews>('Reviews',reviewSchema);