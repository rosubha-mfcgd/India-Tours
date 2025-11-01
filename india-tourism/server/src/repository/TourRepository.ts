import { ToursModel } from '../model/tours';

import { ITourDetails } from './AppEntityState';
import { BaseRepository } from './BaseRepository';

export class TourRepository extends BaseRepository<ITourDetails>
{
     constructor(){
          super(ToursModel);
     }
   async findById(id: string):Promise<ITourDetails|null>{
        return ToursModel.findById(id).exec();

   }

   async aggregatePlannedTours(query: object):Promise<ITourDetails[]|null>{

    const result = await ToursModel.aggregate( [
          {
            $match: query
          },
           {
            $addFields: {
                customStartDate: 
                {
                    $dateToString: {
                         format: "%d-%B-%Y",
                          date: "$startDate",
                          timezone: "Asia/Kolkata"
                    } 
                },
          customEndDate: 
                {
                   $dateToString: {
                         format: "%d-%B-%Y",
                          date: "$endDate",
                          timezone: "Asia/Kolkata"
                   }
               },
          lengthOfTour:
          {
               $dateDiff: {
             startDate: "$startDate",
           endDate: "$endDate",
           unit: "day",
          timezone: "Asia/Kolkata", // Optional
          }
     }
     },
     },
     ]).exec();

    
    //  const result = await ToursModel.aggregate(pipelines);
        console.log("Aggregation Result:", result);

     return result;
}
 
}

