import { StateModel } from '../model/states';
import { IState } from './AppEntityState';
import { BaseRepository } from './BaseRepository';

export class StateRepository extends BaseRepository<IState>{
    constructor()
    {
          super(StateModel);
    }

   async findById(id: string):Promise<IState|null>{
        return StateModel.findById(id).exec();

   }
         
}