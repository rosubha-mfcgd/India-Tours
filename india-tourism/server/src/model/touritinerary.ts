import { Schema, model } from 'mongoose';
import { ITouritinerary } from '../repository/AppEntityState';

const touritinerarySchema = new Schema<ITouritinerary>({

    locationName: {
			type: String,
			required: true
		},
    categoryID:{
       type: Number,
      required: true
    },
		tourManagerId: {
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
      itinerary: {
			type: [],
			required: true
		}
  
    });

export const ItineraryModel = model<ITouritinerary>('Touritinerary',touritinerarySchema);