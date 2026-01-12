import { TourOperatorModel } from '../model/operator';
import { ITourOperator } from './AppEntityState';
import { BaseRepository } from './BaseRepository';

export class TourOperatorRepository extends BaseRepository<ITourOperator>{
    constructor()
    {
          super(TourOperatorModel);
    }

   async findById(id: string):Promise<ITourOperator|null>{
        return TourOperatorModel.findById(id).exec();

   }
}