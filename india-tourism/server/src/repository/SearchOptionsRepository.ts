import { FilterQuery, UpdateQuery } from 'mongoose';

import { OptionsModel } from '../model/options';
import { IOptions } from './AppEntityState';
import { BaseRepository } from './BaseRepository';

export class SearchOptionsRepository extends BaseRepository<IOptions>{
    constructor(){
          super(OptionsModel);
    }

   async findById(id: string):Promise<IOptions|null>{
        return OptionsModel.findById(id).exec();

   }
         
}