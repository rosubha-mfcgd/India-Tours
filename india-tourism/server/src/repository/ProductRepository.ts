import { ProductModel } from '../model/product';
import { IProduct } from './AppEntityState';
import { BaseRepository } from './BaseRepository';

export class ProductRepository extends BaseRepository<IProduct>{
    constructor(){
          super(ProductModel);
    }

   async findById(id: string):Promise<IProduct|null>{
        return ProductModel.findById(id).exec();

   }
         
}