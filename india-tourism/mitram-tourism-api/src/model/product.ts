import { Schema, model } from 'mongoose';
import { IProduct } from '../repository/AppEntityState';

const productSchema = new Schema<IProduct>({

     productID:{
       type: Number,
      required: true
    },
    productName:{
       type: String,
      required: true,
      trim: true,
    },
    productDesc:{
       type: String,
      required: true,
      trim: true,
    },
    image:{
      type: String,
      required: true,
      trim: true,
    },
     favorite:{
       type: String,
      
    }
  
    });

export const ProductModel = model<IProduct>('Product',productSchema);