import { Schema, model } from 'mongoose';
import { ITourDetails } from '../repository/AppEntityState';

const toursSchema = new Schema<ITourDetails>({
    locationName:{
       type: String,
      required: true,
      trim: true,
    },
    categoryID:{
       type: Number,
      required: true
    },
    tourManagerId:{
       type: String,
      required: true,
      trim: true,
    },
    tripLength:{
         type: String,
      required: true
      },
    packageCost:{
        type: String,
      required: true,
    },
    currency:{
        type: String,
        required: true,
    },
    ticketCost:{
        type: String,
      required: true,
    },
    maxTourist:{
         type: String,
         required: true,
    },
    seatsLeft:{
         type: String,
         required: true,
    },
    startDate:{
         type: Date,
         required: true,
    },
    endDate:{
         type: Date,
         required: true,
    },
    tourType:{
         type: String,
         required: true,
    },
    description: {
      type : String
    },
     itinerary:{
      type : String
    }
    });

export const ToursModel = model<ITourDetails>('Tourdetails',toursSchema);