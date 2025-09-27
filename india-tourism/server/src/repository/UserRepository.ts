import { FilterQuery, UpdateQuery } from 'mongoose';
import { UserModel } from '../model/user';
import { IUser } from './AppEntityState';
import { BaseRepository } from './BaseRepository';
export class UserRepository extends BaseRepository<IUser>
{
   constructor(){
    super(UserModel);
   }

   async findById(id: string):Promise<IUser|null>{
        return UserModel.findById(id).exec();

   }

 async findPoints(query: FilterQuery<IUser>):Promise<IUser|null>{
        return UserModel.findOne(query).exec();
   }


}