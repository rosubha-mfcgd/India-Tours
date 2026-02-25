import { ReviewModel } from '../model/reviews';
import { IReviews } from './AppEntityState';
import { BaseRepository } from './BaseRepository';

export class ReviewsRepository extends BaseRepository<IReviews>{
    constructor(){
          super(ReviewModel);
    }

   async findById(id: string):Promise<IReviews|null>{
        return ReviewModel.findById(id).exec();

   }
         
}