import { FilterQuery, UpdateQuery } from 'mongoose';
import { ToursModel } from '../model/tours';
import { ITourDetails } from '../repository/TourEntityState';

export class TourRepository
{
async create(toursData:Partial<ITourDetails>): Promise<ITourDetails>{
        const tour = new ToursModel(toursData);
        return tour.save();
   }

   async findById(id: string):Promise<ITourDetails|null>{
        return ToursModel.findById(id).exec();

   }
   async findOne(query: FilterQuery<ITourDetails>):Promise<ITourDetails|null>{
        return ToursModel.findOne(query).exec();
   }

   async findAll(query: FilterQuery<ITourDetails>={}):Promise<ITourDetails[]>{
        return ToursModel.find(query).exec();
   }

   async update(id: string, updateData: UpdateQuery<ITourDetails>): Promise<ITourDetails | null> {
    return ToursModel.findByIdAndUpdate(id, updateData, { new: true }).exec();
  }

  async delete(id: string): Promise<ITourDetails | null> {
    return ToursModel.findByIdAndDelete(id).exec();
  }
}

