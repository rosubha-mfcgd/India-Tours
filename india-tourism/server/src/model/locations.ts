import { Schema, model } from 'mongoose';
import {ILocation, ITourManager} from '../repository/TourEntityState';

const locationSchema = new Schema<ILocation>({
    locationID:{
       type: Number,
      required: true
    },
    spotName:{
       type: String,
      required: true
     },
    locationDesc: String,
    categoryID:{
       type: Number,
      required: true
    }
    });

export const LocationsModel = model<ILocation>('Locations',locationSchema);