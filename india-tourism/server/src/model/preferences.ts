import { Schema, model } from 'mongoose';
import { IPreferences } from '../repository/AppEntityState';

const preferenceSchema = new Schema<IPreferences>({

     code:{
       type: Number,
      required: true
    },
    
    desc:{
       type: String,
      required: true
    },
    
  });

export const PreferenceModel = model<IPreferences>('Preferences',preferenceSchema);