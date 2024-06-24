/* eslint-disable @typescript-eslint/no-explicit-any */
import { ExerciseLog } from '../app/modules/exercises/exerciseLog.model';

export async function getExerciseStatisticsAggregate(
  matchStage: any,
  isStudent: boolean = false,
) {
  const basePipeline = [
    matchStage,
    {
      $group: {
        _id: '$exerciseId',
        averageCompletionTime: { $avg: '$completionTime' },
        totalAttempts: { $sum: 1 },
        successfulAttempts: {
          $sum: {
            $cond: [{ $eq: ['$status', true] }, 1, 0],
          },
        },
        completionTimes: { $push: '$completionTime' },
      },
    },
    {
      $project: {
        _id: 1,
        averageCompletionTime: 1,
        totalAttempts: 1,
        successfulAttempts: 1,
        successRate: {
          $multiply: [
            { $divide: ['$successfulAttempts', '$totalAttempts'] },
            100,
          ],
        },
        completionTimes: 1,
      },
    },
    {
      $lookup: {
        from: 'exercises',
        localField: '_id',
        foreignField: '_id',
        as: 'exerciseDetails',
      },
    },
    {
      $unwind: '$exerciseDetails',
    },
    {
      $project: {
        _id: 1,
        averageCompletionTime: 1,
        totalAttempts: 1,
        successfulAttempts: 1,
        successRate: 1,
        exerciseName: '$exerciseDetails.name',
        exerciseType: '$exerciseDetails.type',
        completionTimes: 1,
      },
    },
  ];

  const studentPipeline = [
    {
      $project: {
        _id: 1,
        studentAverageCompletionTime: '$averageCompletionTime',
        averageCompletionTime: {
          $avg: {
            $cond: [
              { $eq: [{ $size: '$completionTimes' }, 1] },
              '$averageCompletionTime',
              {
                $filter: {
                  input: '$completionTimes',
                  as: 'time',
                  cond: { $ne: ['$$time', '$averageCompletionTime'] },
                },
              },
            ],
          },
        },
        totalAttempts: 1,
        successfulAttempts: 1,
        successRate: 1,
        exerciseName: 1,
        exerciseType: 1,
      },
    },
  ];

  const nonStudentPipeline = [
    {
      $project: {
        _id: 1,
        averageCompletionTime: 1,
        totalAttempts: 1,
        successfulAttempts: 1,
        successRate: 1,
        exerciseName: 1,
        exerciseType: 1,
      },
    },
  ];

  const pipeline = isStudent
    ? basePipeline.concat(studentPipeline)
    : basePipeline.concat(nonStudentPipeline);

  return ExerciseLog.aggregate(pipeline);
}
