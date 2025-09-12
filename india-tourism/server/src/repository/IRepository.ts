import { Document, UpdateQuery } from 'mongoose';

export interface IRead<T> {
  // Finds documents that match the specified query
  find(query: object): Promise<T[]>;
  // Finds a single document by ID
  findOne(query:Object): Promise<T | null>;
  // Finds all documents in the collection
  findAll(): Promise<T[]>;
}

export interface IWrite<T> {
   create(item: Partial<T> | any): Promise<T|null>;
  update(id: string, item: Partial<T> | any): Promise<T|null>;
  delete(id: string): Promise<boolean>;
}

export interface IRepository<T extends Document> extends IWrite<T>, IRead<T> {}