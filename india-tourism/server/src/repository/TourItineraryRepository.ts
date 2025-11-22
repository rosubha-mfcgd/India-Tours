
import { ItineraryModel } from '../model/touritinerary';
import { ITouritinerary } from './AppEntityState';
import { BaseRepository } from './BaseRepository';

export class TourItineraryRepository extends BaseRepository<ITouritinerary>{
    constructor(){
          super(ItineraryModel);
    }

   async findById(id: string):Promise<ITouritinerary|null>{
        return ItineraryModel.findById(id).exec();
   }
         
}