import { Schema, model } from 'mongoose';
import { ICategory } from '../repository/AppEntityState';

const categorySchema = new Schema<ICategory>({

     _id:{
       type: Number,
      required: true
    },
    categoryName:{
       type: String,
      required: true,
      trim: true,
    },
    categoryDesc:{
       type: String,
      required: true,
      trim: true,
    },
    favorite:{
       type: String,
      
    }
  
    });

export const CategoryModel = model<ICategory>('Category',categorySchema);