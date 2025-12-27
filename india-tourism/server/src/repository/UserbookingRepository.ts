import { UserBookingModel } from '../model/userBookings';
import { IUserBookings } from './AppEntityState';
import { BaseRepository } from './BaseRepository';

export class UserbookingRepository extends BaseRepository<IUserBookings>{
    constructor(){
          super(UserBookingModel);
    }

   async findById(id: string):Promise<IUserBookings|null>{
        return UserBookingModel.findById(id).exec();
   }
         
}