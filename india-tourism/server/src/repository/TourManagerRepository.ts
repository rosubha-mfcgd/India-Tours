import { TourManagerModel } from '../model/tourmanager';

import { ITourManager } from '../repository/TourEntityState';
import { BaseRepository } from './BaseRepository';

export class TourManagerRepository extends BaseRepository<ITourManager>
{
     constructor(){
          super(TourManagerModel);
     }
   async findById(id: string):Promise<ITourManager|null>{
        return TourManagerModel.findById(id).exec();

   }
 
}