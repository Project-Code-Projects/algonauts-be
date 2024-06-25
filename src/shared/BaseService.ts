// src/shared/baseService.ts
import { Document, Model } from 'mongoose';

interface QueryOptions {
  [key: string]: any;
}

class BaseService<T extends Document> {
  private model: Model<T>;

  constructor(model: Model<T>) {
    this.model = model;
  }

  async create(item: T): Promise<T> {
    const newItem = await this.model.create(item);
    return newItem;
  }

  async update(id: string, item: Partial<T>): Promise<T | null> {
    const updatedItem = await this.model
      .findByIdAndUpdate(id, item, { new: true })
      .exec();
    if (!updatedItem) {
      throw new Error(`${this.model.modelName} not found`);
    }
    return updatedItem;
  }

  async delete(id: string): Promise<T | null> {
    const deletedItem = await this.model.findByIdAndDelete(id).exec();
    if (!deletedItem) {
      throw new Error(`${this.model.modelName} not found`);
    }
    return deletedItem;
  }

  async getById(id: string, populateOptions?: string[]): Promise<T | null> {
    let query = this.model.findById(id);
    if (populateOptions) {
      populateOptions.forEach(option => {
        query = query.populate(option);
      });
    }
    const item = await query.exec();
    if (!item) {
      throw new Error(`${this.model.modelName} not found`);
    }
    return item;
  }

  async getAll(
    queryOptions: QueryOptions = {},
    populateOptions?: Array<string | object>,
    sortOptions?: { [key: string]: 1 | -1 }, // Adding sorting functionality
  ): Promise<T[]> {
    let query = this.model.find(queryOptions);
    if (populateOptions) {
      populateOptions.forEach(option => {
        query = query.populate(option);
      });
    }
    if (sortOptions) {
      query = query.sort(sortOptions);
    }
    const items = await query.exec();
    return items;
  }
}

export default BaseService;
