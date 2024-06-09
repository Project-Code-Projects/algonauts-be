import { HelpRequest } from './helpRequest.model';
import { IHelpRequest } from './helpRequest.interface';

class HelpRequestService {
  async create(item: Partial<IHelpRequest>): Promise<IHelpRequest> {
    const newItem = await HelpRequest.create(item);
    return newItem;
  }

  async update(id: string, item: Partial<IHelpRequest>): Promise<IHelpRequest | null> {
    const updatedItem = await HelpRequest.findByIdAndUpdate(id, item, { new: true }).exec();
    if (!updatedItem) {
      throw new Error(`${HelpRequest.modelName} not found`);
    }
    return updatedItem;
  }

  async delete(id: string): Promise<IHelpRequest | null> {
    const deletedItem = await HelpRequest.findByIdAndDelete(id).exec();
    if (!deletedItem) {
      throw new Error(`${HelpRequest.modelName} not found`);
    }
    return deletedItem;
  }

  async getById(id: string): Promise<IHelpRequest | null> {
    const item = await HelpRequest.findById(id).exec();
    if (!item) {
      throw new Error(`${HelpRequest.modelName} not found`);
    }
    return item;
  }

  async getAll(): Promise<IHelpRequest[]> {
    const items = await HelpRequest.find().exec();
    return items;
  }

  async getHelpRequestsByStudent(studentId: string): Promise<IHelpRequest[]> {
    const helpRequests = await HelpRequest.find({ studentId }).populate('studentId').populate('instructorId').exec();
    return helpRequests;
  }

  async getHelpRequestsByInstructor(instructorId: string): Promise<IHelpRequest[]> {
    const helpRequests = await HelpRequest.find({ instructorId }).populate('studentId').populate('instructorId').exec();
    return helpRequests;
  }
}

export const helpRequestService = new HelpRequestService();
