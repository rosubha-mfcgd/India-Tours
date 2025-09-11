import { Document, Model, UpdateQuery } from 'mongoose';
import { IRepository } from './IRepository';

export abstract class BaseRepository<T extends Document> implements IRepository<T>
{
    private _model: Model<T>;

  constructor(model: Model<T>) {
    this._model = model;
  }



    async create(item:Partial<T>): Promise<T|null> {
       let user = null;
        try{
       return await this._model.create(item);
       }catch(err)
       {
         console.error(err);
        }
       return null;
    }
    async update(id: string, item: T | any): Promise<boolean> {
       const result = await this._model.updateOne({ _id: id }, item);
    return result.modifiedCount > 0;
    }
   async delete(id: string): Promise<boolean> {
        const result = await this._model.deleteOne({ _id: id });
        return result.deletedCount > 0;
    }
   async find(query: object): Promise<T[]> {
        return this._model.find(query).exec();
    }
   async findOne(query: object): Promise<T | null> {
       return this._model.findOne(query).exec();
    }
   async findAll(): Promise<T[]> {
        return this._model.find({}).exec();
    }
        
}