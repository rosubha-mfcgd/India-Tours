import { Schema, model } from 'mongoose';
import { ICity } from '../repository/AppEntityState';

const citySchema = new Schema<ICity>({

     cityCode:{
       type: Number,
      required: true
    },
    
    cityDesc:{
       type: String,
      required: true
    },
    
  });

export const CityModel = model<ICity>('City',citySchema);