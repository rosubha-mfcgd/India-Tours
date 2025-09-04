import { Schema, model } from 'mongoose';
import { Category } from '../repository/TourEntityState';

const categorySchema = new Schema<Category>({

     categoryID:{
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
  
    });

export const CategoryModel = model<Category>('Category',categorySchema);