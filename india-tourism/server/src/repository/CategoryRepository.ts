import { FilterQuery, UpdateQuery } from 'mongoose';

import { CategoryModel } from '../model/category';
import { ICategory } from './AppEntityState';
import { BaseRepository } from './BaseRepository';

export class CategoryRepository extends BaseRepository<ICategory>{
    constructor(){
          super(CategoryModel);
    }

   async findById(id: string):Promise<ICategory|null>{
        return CategoryModel.findById(id).exec();

   }
         
}