import BaseService from '../../../shared/BaseService';
import { BeginnerLevel } from './beginnerLevel.model';
import { IBeginnerLevel } from './beginnerLevel.interface';

class BeginnerLevelService extends BaseService<IBeginnerLevel> {
  constructor() {
    super(BeginnerLevel);
  }
}

export const beginnerLevelService = new BeginnerLevelService();
