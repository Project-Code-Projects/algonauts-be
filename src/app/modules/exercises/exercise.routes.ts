import express from 'express';
import { ExerciseController } from './exercise.controller';

const router = express.Router();

router.post('/create', ExerciseController.createExercise);
router.put('/update/:id', ExerciseController.updateExercise);
router.delete('/delete/:id', ExerciseController.deleteExercise);
router.get('/:id', ExerciseController.getExerciseById);
router.get('/', ExerciseController.getAllExercises);

export const ExerciseRoutes = router;
