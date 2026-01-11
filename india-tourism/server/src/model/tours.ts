import { Schema, model,Number } from 'mongoose';
import { ITourDetails } from '../repository/AppEntityState';

const toursSchema = new Schema<ITourDetails>({
  _id:{
      type: Schema.Types.ObjectId,
        required: true,
        trim: true,
     },
    image: {
          fileId: Schema.Types.ObjectId,
         filename: String
        },
        tourOperator:{
             _id: String,
             firstName: String,
             lastName: String,
        },
        tripLength:{
             type: String,
          required: true
          },
          startDate : {
             type: Date,
             required: true
          },
           endDate : {
              type: Date,
              required: true
          },
        city:{
            _id: String,
             name: String,
        },
         state:{
          _id: String,
          name: String,
        },
        category:{
          _id: String,
          name: String,
        },
       createdAt:{
             type: Date,
             required: true
          },
          updatedAt:{
             type: Date,
             required: true
          },
    
        days:{
            type: String,
          required: true,
        },
        night:{
            type: String,
          required: true,
        },
        cityName:{
            type: String,
          required: true,
        },
        stateName:{
            type: String,
          required: true,
        },
        tourOperatorName:{
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
        currency:{
            type: String,
            required: true,
        },
         tourType:{
             type: String,
             required: true,
        },
        ticketCost:{
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

export const ToursModel = model<ITourDetails>('Tours',toursSchema);