import BaseService from '../../../shared/BaseService';
import { Parent } from './parent.model';
import { IParent } from './parent.interface';

class ParentService extends BaseService<IParent> {
  constructor() {
    super(Parent);
  }

  async getParentsByUser(userId: string): Promise<IParent[]> {
    const parents = await this.model.find({ userId }).populate('userId').exec();
    return parents;
  }
}

export const parentService = new ParentService();
