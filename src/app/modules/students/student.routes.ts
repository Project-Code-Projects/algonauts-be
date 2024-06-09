import express from 'express';
import { StudentController } from './student.controller';

const router = express.Router();

router.post('/create', StudentController.createStudent);
router.put('/update/:id', StudentController.updateStudent);
router.delete('/delete/:id', StudentController.deleteStudent);
router.get('/:id', StudentController.getStudentById);
router.get('/parent/:parentId', StudentController.getStudentsByParent);
router.get('/', StudentController.getAllStudents);

export const StudentRoutes = router;
