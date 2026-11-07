import { Schema, model } from 'mongoose';
import { ICity } from '../repository/AppEntityState';

const citySchema = new Schema<ICity>({

     _id: {
      type: Number,
      unique: true,
      index: true
    },
    name: {
      type: String,
      required: true
    },
    state: {
      type: Number, // stateId
      ref: "State",
      required: true
    }
    
  });

export const CityModel = model<ICity>('City',citySchema);