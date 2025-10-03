import { TourBookingModel } from '../model/tourBookings';
import { ITourBookings } from './AppEntityState';
import { BaseRepository } from './BaseRepository';

export class BookingRepository extends BaseRepository<ITourBookings>{
    constructor(){
          super(TourBookingModel );
    }

   async findById(id: string):Promise<ITourBookings|null>{
        return TourBookingModel.findById(id).exec();
   }
         
}