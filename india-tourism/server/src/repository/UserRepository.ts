import { FilterQuery, UpdateQuery } from 'mongoose';
import { UserModel } from '../model/user';
import { ICustomer } from './AppEntityState';
import { BaseRepository } from './BaseRepository';
export class UserRepository extends BaseRepository<ICustomer>
{
   constructor(){
    super(UserModel);
   }

   async findById(id: string):Promise<ICustomer|null>{
        return UserModel.findById(id).exec();

   }

 async findPoints(query: FilterQuery<ICustomer>):Promise<ICustomer|null>{
        return UserModel.findOne(query).exec();
   }


}