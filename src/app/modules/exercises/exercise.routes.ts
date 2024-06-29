import express from 'express';
import { ExerciseController } from './exercise.controller';

const router = express.Router();

// Create
router.post('/create', ExerciseController.createExercise);

// Read
router.get('/', ExerciseController.getAllExercises);
router.get('/:id', ExerciseController.getExerciseById);
router.get(
  '/fetchNextExercise/:exerciseId',
  ExerciseController.fetchNextExercise,
);

// Update
router.put('/update/:id', ExerciseController.updateExercise);

// Delete
router.delete('/delete/:id', ExerciseController.deleteExercise);

export const ExerciseRoutes = router;
