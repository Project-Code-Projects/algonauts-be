import express from 'express';
import { InstructorLogController } from './instructorLog.controller';

const router = express.Router();

router.post('/create', InstructorLogController.createInstructorLog);
router.put('/update/:id', InstructorLogController.updateInstructorLog);
router.delete('/delete/:id', InstructorLogController.deleteInstructorLog);
router.get('/:id', InstructorLogController.getInstructorLogById);
router.get('/instructor/:instructorId', InstructorLogController.getLogsByInstructor);
router.get('/', InstructorLogController.getAllInstructorLogs);

export const instructorLogRoutes = router;
