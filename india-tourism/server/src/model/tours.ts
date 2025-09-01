import { Schema, model } from 'mongoose';
import { ITourDetails } from '../repository/TourEntityState';

const toursSchema = new Schema<ITourDetails>({
    locationID:{
       type: Number,
      required: true,
      trim: true,
    },
    categoryID:{
       type: Number,
      required: true
    },
    operatorID:{
       type: Number,
      required: true,
      trim: true,
    },
    triplength:{
         type: String,
      required: true
      },
    package_cost:{
        type: Number,
      required: true,
    },
    ticket_cost:{
        type: Number,
      required: true,
    },
    max_tourist:{
         type: Number,
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
     domesticOrInternational:{
         type: String,
         required: true,
    },
    tourManagerId:{
         type: Number,
         required: true,
    }
    });

export const ToursModel = model<ITourDetails>('Tours',toursSchema);