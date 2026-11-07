import { Schema, model } from 'mongoose';
import {IState} from '../repository/AppEntityState';

const stateSchema = new Schema<IState>({

     _id: {
      type: Number,
      unique: true,
      index: true
    },
    name: {
      type: String,
      required: true
    }    
  });

export const StateModel = model<IState>('State',stateSchema);