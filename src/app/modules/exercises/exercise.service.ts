/* eslint-disable @typescript-eslint/ban-ts-comment */
import BaseService from '../../../shared/BaseService';
import { Exercise } from './exercise.model';
import { IExercise } from './exercise.interface';
import { Types } from 'mongoose';

class ExerciseService extends BaseService<IExercise> {
  constructor() {
    super(Exercise);
  }

  // Protected getter to access the private `model` property
  protected get exerciseModel() {
    // @ts-ignore
    return this.model;
  }

  async getByChapterId(chapterId: string): Promise<IExercise[]> {
    return this.exerciseModel.find({ chapterId }).sort({ index: 1 });
  }

  async create(exerciseData: Partial<IExercise>): Promise<IExercise> {
    const { chapterId } = exerciseData;

    if (!chapterId) {
      throw new Error('ChapterId is required');
    }

    const lastExercise = await this.exerciseModel
      // @ts-ignore
      .findOne({ chapterId: new Types.ObjectId(chapterId) })
      .sort({ index: -1 });

    const newIndex = lastExercise ? lastExercise.index + 1 : 1;

    const newExercise = new this.exerciseModel({
      ...exerciseData,
      index: newIndex,
    });

    return newExercise.save();
  }

  async fetchNextExercise(exerciseId: string) {
    // Fetch the current exercise by ID
    const currentExercise = await this.exerciseModel.findById(exerciseId);
    if (!currentExercise) {
      throw new Error('Exercise not found');
    }

    const { chapterId, index } = currentExercise;

    // Find the next exercise in the same chapter
    const nextExercise = await this.exerciseModel
      .findOne({
        chapterId,
        index: { $gt: index },
      })
      .sort({ index: 1 });

    return nextExercise;
  }
}

export const exerciseService = new ExerciseService();
