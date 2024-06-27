import express from 'express';
import { StudentController } from './student.controller';

const router = express.Router();

// Create
router.post('/create', StudentController.createStudent);

// Read
router.get('/', StudentController.getAllStudents);
router.get('/studentProgress/:studentId', StudentController.getStudentProgress);
router.get('/:id', StudentController.getStudentById);
router.get('/user/:userId', StudentController.getStudentByUserID);
router.get('/parent/:parentId', StudentController.getStudentsByParent);

// Update
router.put('/update/:id', StudentController.updateStudent);

// Delete
router.delete('/delete/:id', StudentController.deleteStudent);

export const StudentRoutes = router;
