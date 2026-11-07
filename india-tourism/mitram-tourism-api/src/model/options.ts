import { Schema, model } from 'mongoose';
import {IOptions} from '../repository/AppEntityState';

const optionSchema = new Schema<IOptions>({
     categoryID:{
       type: Number,
      required: true
    },
    optionName:{
       type: String,
      required: true,
      trim: true,
    },
    optionDesc:{
       type: String,
      required: true,
      trim: true,
    },
     favorite:{
       type: String,
      
    },
    productID:{
       type: Number,
      required: true
    },
    optionID:{
       type: Number,
      required: true
    }
    });

export const OptionsModel = model<IOptions>('Options',optionSchema);