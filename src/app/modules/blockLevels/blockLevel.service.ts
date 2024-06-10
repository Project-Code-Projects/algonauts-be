import BaseService from '../../../shared/BaseService';
import { BlockLevel } from './blockLevel.model';
import { IBlockLevel } from './blockLevel.interface';

class BlockLevelService extends BaseService<IBlockLevel> {
  constructor() {
    super(BlockLevel);
  }
}

export const blockLevelService = new BlockLevelService();
