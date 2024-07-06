/* eslint-disable @typescript-eslint/ban-ts-comment */
import BaseService from '../../../shared/BaseService';
import { Exercise } from './exercise.model';
import { IExercise } from './exercise.interface';
import { Types } from 'mongoose';
import { ExerciseLog } from './exerciseLog.model';

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

  async getExercisesByChapterId(chapterId: string): Promise<IExercise[]> {
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

  // New method: Combine getCompletedExercisesByStudent with getExercisesByChapterId
  async getStudentExercisesByChapterAndStudentId(
    studentId: string,
    chapterId: string,
  ) {
    try {
      // Fetch completed exercises by the student
      const completedExercises = await ExerciseLog.find({
        studentId,
        status: true,
      }).select('exerciseId');

      if (!completedExercises.length) {
        return 1;
      }

      const completedExerciseIds = completedExercises.map(
        exerciseLog => exerciseLog.exerciseId,
      );

      // Find exercises for the given chapterId and completed exerciseIds
      const exercises = await this.exerciseModel
        .find({ chapterId, _id: { $in: completedExerciseIds } })
        .sort({ index: 1 });

      // Identify the highest index
      const highestIndexExercise = exercises[exercises.length - 1];
      const highestIndex = highestIndexExercise
        ? highestIndexExercise.index
        : 0;

      // Retrieve exercises up to and including the highest index + 1
      const result = await this.exerciseModel
        .find({ chapterId, index: { $lte: highestIndex + 1 } })
        .sort({ index: 1 })
        .countDocuments();

      return result;
    } catch (error) {
      console.error('Error fetching student exercises by chapter:', error);
      throw error;
    }
  }
}

export const exerciseService = new ExerciseService();
