import { PreferenceModel } from '../model/preferences';
import { IPreferences } from './AppEntityState';
import { BaseRepository } from './BaseRepository';

export class PreferenceRepository extends BaseRepository<IPreferences>{
    constructor(){
          super(PreferenceModel);
    }

   async findById(id: string):Promise<IPreferences|null>{
        return PreferenceModel.findById(id).exec();

   }
         
}