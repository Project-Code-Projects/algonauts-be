import { Instructor } from './instructor.model';
import { IInstructor } from './instructor.interface';

class InstructorService {
  async create(item: Partial<IInstructor>): Promise<IInstructor> {
    const newItem = await Instructor.create(item);
    return newItem;
  }

  async update(
    id: string,
    item: Partial<IInstructor>,
  ): Promise<IInstructor | null> {
    const updatedItem = await Instructor.findByIdAndUpdate(id, item, {
      new: true,
    }).exec();
    if (!updatedItem) {
      throw new Error(`${Instructor.modelName} not found`);
    }
    return updatedItem;
  }

  async delete(id: string): Promise<IInstructor | null> {
    const deletedItem = await Instructor.findByIdAndDelete(id).exec();
    if (!deletedItem) {
      throw new Error(`${Instructor.modelName} not found`);
    }
    return deletedItem;
  }

  async getById(id: string): Promise<IInstructor | null> {
    const item = await Instructor.findById(id).exec();
    if (!item) {
      throw new Error(`${Instructor.modelName} not found`);
    }
    return item;
  }

  async getAll(): Promise<IInstructor[]> {
    const items = await Instructor.find().exec();
    return items;
  }

  async getInstructorsByUser(userId: string): Promise<IInstructor[]> {
    const instructors = await Instructor.find({ userId })
      .populate('userId')
      .exec();
    return instructors;
  }
}

export const instructorService = new InstructorService();
