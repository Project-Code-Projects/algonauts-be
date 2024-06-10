import express from 'express';
import { ExerciseLogController } from './exerciseLog.controller';

const router = express.Router();

router.post('/create', ExerciseLogController.createExerciseLog);
router.put('/update/:id', ExerciseLogController.updateExerciseLog);
router.delete('/delete/:id', ExerciseLogController.deleteExerciseLog);
router.get('/:id', ExerciseLogController.getExerciseLogById);
router.get('/', ExerciseLogController.getAllExerciseLogs);

export const exerciseLogRoutes = router;
