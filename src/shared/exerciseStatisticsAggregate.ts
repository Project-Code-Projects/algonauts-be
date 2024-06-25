/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { ExerciseLog } from '../app/modules/exercises/exerciseLog.model';

export async function getExerciseStatisticsAggregate(
  matchStage: any,
  isStudent: boolean = false,
) {
  const classStatsGroupStage = {
    $group: {
      _id: '$exerciseId',
      classAverageCompletionTime: { $avg: '$completionTime' },
      totalAttempts: { $sum: 1 },
      successfulAttempts: {
        $sum: { $cond: [{ $eq: ['$status', true] }, 1, 0] },
      },
    },
  };

  const studentStatsGroupStage = {
    $group: {
      _id: '$exerciseId',
      studentAverageCompletionTime: { $avg: '$completionTime' },
      studentTotalAttempts: { $sum: 1 },
      studentSuccessfulAttempts: {
        $sum: { $cond: [{ $eq: ['$status', true] }, 1, 0] },
      },
    },
  };

  const facetStage = {
    $facet: {
      classStats: [classStatsGroupStage],
      studentStats: [matchStage, studentStatsGroupStage],
    },
  };

  const projectMergedStatsStage = {
    $project: {
      stats: {
        $map: {
          input: '$classStats',
          as: 'classItem',
          in: {
            $mergeObjects: [
              '$$classItem',
              {
                $arrayElemAt: [
                  {
                    $filter: {
                      input: '$studentStats',
                      as: 'studentItem',
                      cond: { $eq: ['$$studentItem._id', '$$classItem._id'] },
                    },
                  },
                  0,
                ],
              },
            ],
          },
        },
      },
    },
  };

  const unwindStatsStage = { $unwind: '$stats' };

  const projectFinalStatsStage = {
    $project: {
      _id: '$stats._id',
      classAverageCompletionTime: '$stats.classAverageCompletionTime',
      totalAttempts: '$stats.totalAttempts',
      successfulAttempts: '$stats.successfulAttempts',
      successRate: {
        $multiply: [
          { $divide: ['$stats.successfulAttempts', '$stats.totalAttempts'] },
          100,
        ],
      },
      studentAverageCompletionTime: '$stats.studentAverageCompletionTime',
      studentTotalAttempts: '$stats.studentTotalAttempts',
      studentSuccessfulAttempts: '$stats.studentSuccessfulAttempts',
      studentSuccessRate: {
        $multiply: [
          {
            $divide: [
              '$stats.studentSuccessfulAttempts',
              '$stats.studentTotalAttempts',
            ],
          },
          100,
        ],
      },
    },
  };

  const lookupExerciseDetailsStage = {
    $lookup: {
      from: 'exercises',
      localField: '_id',
      foreignField: '_id',
      as: 'exerciseDetails',
    },
  };

  const unwindExerciseDetailsStage = { $unwind: '$exerciseDetails' };

  const projectExerciseDetailsStage = {
    $project: {
      _id: 1,
      classAverageCompletionTime: 1,
      totalAttempts: 1,
      successfulAttempts: 1,
      successRate: 1,
      studentAverageCompletionTime: 1,
      studentTotalAttempts: 1,
      studentSuccessfulAttempts: 1,
      studentSuccessRate: 1,
      exerciseName: '$exerciseDetails.name',
      exerciseType: '$exerciseDetails.type',
    },
  };

  const pipeline = [
    facetStage,
    projectMergedStatsStage,
    unwindStatsStage,
    projectFinalStatsStage,
    lookupExerciseDetailsStage,
    unwindExerciseDetailsStage,
    projectExerciseDetailsStage,
  ];

  return ExerciseLog.aggregate(pipeline);
}
