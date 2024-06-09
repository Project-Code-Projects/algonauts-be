import express from 'express';
import { HelpRequestController } from './helpRequest.controller';

const router = express.Router();

router.post('/create', HelpRequestController.createHelpRequest);
router.put('/update/:id', HelpRequestController.updateHelpRequest);
router.delete('/delete/:id', HelpRequestController.deleteHelpRequest);
router.get('/:id', HelpRequestController.getHelpRequestById);
router.get(
  '/student/:studentId',
  HelpRequestController.getHelpRequestsByStudent,
);
router.get(
  '/instructor/:instructorId',
  HelpRequestController.getHelpRequestsByInstructor,
);
router.get('/', HelpRequestController.getAllHelpRequests);

export const HelpRequestRoutes = router;
