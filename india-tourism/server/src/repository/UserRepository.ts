import { FilterQuery, UpdateQuery } from 'mongoose';
import { UserModel } from '../model/user';
import { IUser } from '../repository/TourEntityState';

export class UserRepository 
{
   constructor(){
    
   }
   async create(userData:Partial<IUser>): Promise<IUser>{
        const user = new UserModel(userData);
        return user.save();
   }

   async findById(id: string):Promise<IUser|null>{
        return UserModel.findById(id).exec();

   }
   async findOne(query: FilterQuery<IUser>):Promise<IUser|null>{
        return UserModel.findOne(query).exec();
   }

   async findAll(query: FilterQuery<IUser>={}):Promise<IUser[]>{
        return UserModel.find(query).exec();
   }

   async update(id: string, updateData: UpdateQuery<IUser>): Promise<IUser | null> {
    return UserModel.findByIdAndUpdate(id, updateData, { new: true }).exec();
  }

  async delete(id: string): Promise<IUser | null> {
    return UserModel.findByIdAndDelete(id).exec();
  }
}