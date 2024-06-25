import express from 'express';
import { InstructorController } from './instructor.controller';

const router = express.Router();

router.post('/create', InstructorController.createInstructor);
router.put('/update/:id', InstructorController.updateInstructor);
router.delete('/delete/:id', InstructorController.deleteInstructor);
router.get('/exercise-statistics', InstructorController.getExerciseStatistics);
router.get(
  '/exercise-statistics/:studentId',
  InstructorController.getExerciseStatisticsByStudentId,
);
router.get(
  '/student-code-snippet/:studentId',
  InstructorController.getStudentCodeSnippets,
);
router.get('/user/:userId', InstructorController.getInstructorsByUser);
router.get('/:id', InstructorController.getInstructorById);
router.get('/', InstructorController.getAllInstructors);

export const InstructorRoutes = router;
