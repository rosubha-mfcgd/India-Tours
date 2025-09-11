import { Schema, model } from 'mongoose';
import { ICategory } from '../repository/TourEntityState';

const categorySchema = new Schema<ICategory>({

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

export const CategoryModel = model<ICategory>('Category',categorySchema);