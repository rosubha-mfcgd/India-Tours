import { Schema, model } from 'mongoose';
import {IReviews} from '../repository/AppEntityState';

const reviewSchema = new Schema<IReviews>({

     tourOperatorId: {
        type: Number,
      	ref: "User",
      	required: true,
        default: 0,
         set: v => (Number.isNaN(v) ? 0 : v) // Prevents NaN from breaking the cast
   		 },
    reviews:{
       type: String,
      required: true
    },
    rating:{
       type: Number,
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