import { CityModel } from '../model/city';
import { ICity } from './AppEntityState';
import { BaseRepository } from './BaseRepository';

export class CityRepository extends BaseRepository<ICity>{
    constructor(){
          super(CityModel);
    }

   async findById(id: string):Promise<ICity|null>{
        return CityModel.findById(id).exec();

   }
         
}