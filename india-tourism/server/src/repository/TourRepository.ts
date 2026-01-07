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

   async aggregatePlannedTours(query: object[]):Promise<ITourDetails[]|null>{

    const result = await ToursModel.aggregate( [
          {
            $match: {
                $and: query
          }
           
          },
          {
    // STEP 1: Convert the strings to real Date objects first
    $addFields: {
      startDate: { $toDate: "$startDate" },
      endDate: { $toDate: "$endDate" }
    }
  },
         {
            $addFields: {
                customStartDate: 
                {
                    $dateToString: {
                         format: "%Y-%m-%d",
                          date: "$startDate",
                          timezone: "Asia/Kolkata"
                    } 
                },
          customEndDate: 
                {
                   $dateToString: {
                         format: "%Y-%m-%d",
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
     },
     },
     },
     ]).exec();

    
    //  const result = await ToursModel.aggregate(pipelines);
        console.log("Aggregation Result:", result);

     return result;
}
 
}

