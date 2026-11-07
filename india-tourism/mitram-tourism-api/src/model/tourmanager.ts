import { Schema, model } from 'mongoose';
import {ITourManager} from '../repository/AppEntityState';

const tourmanagerSchema = new Schema<ITourManager>({
     tourManagerId:{
       type: String,
      required: true
    },
    tourManagerName:{
       type: String,
      required: true
    },
    contact:{
       type: String,
      required: true
    },
    backupcontact: String,
    desc : String,
    cityCode: {
       type: Number,
      required: true
    },
    websiteURL: String
    });

export const TourManagerModel = model<ITourManager>('TourManagers',tourmanagerSchema);