import { Schema, model } from 'mongoose';
import { ITourDetails } from '../repository/TourEntityState';

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
    triplength:{
         type: String,
      required: true
      },
    package_cost:{
        type: String,
      required: true,
    },
    ticket_cost:{
        type: String,
      required: true,
    },
    max_tourist:{
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
     domesticOrInternational:{
         type: String,
         required: true,
    },
    desc: {
      type : String
    },
     itinerary:{
      type : String
    }
    });

export const ToursModel = model<ITourDetails>('Tourdetails',toursSchema);