import express from 'express';
import { ParentMeetingController } from './parentMeeting.controller';

const router = express.Router();

router.post('/create', ParentMeetingController.createParentMeeting);
router.put('/update/:id', ParentMeetingController.updateParentMeeting);
router.delete('/delete/:id', ParentMeetingController.deleteParentMeeting);
router.get('/:id', ParentMeetingController.getParentMeetingById);
router.get('/parent/:parentId', ParentMeetingController.getMeetingsByParent);
router.get('/instructor/:instructorId', ParentMeetingController.getMeetingsByInstructor);
router.get('/', ParentMeetingController.getAllParentMeetings);

export const ParentMeetingRoutes = router;
