import { FilterQuery, UpdateQuery } from 'mongoose';
import { ToursModel } from '../model/tours';

import { ITourDetails } from '../repository/TourEntityState';
import { BaseRepository } from './BaseRepository';

export class TourRepository extends BaseRepository<ITourDetails>
{
     constructor(){
          super(ToursModel);
     }
   async findById(id: string):Promise<ITourDetails|null>{
        return ToursModel.findById(id).exec();

   }
 
}

