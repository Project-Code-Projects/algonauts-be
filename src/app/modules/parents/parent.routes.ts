import express from 'express';
import { ParentController } from './parent.controller';

const router = express.Router();

router.post('/create', ParentController.createParent);
router.put('/update/:id', ParentController.updateParent);
router.delete('/delete/:id', ParentController.deleteParent);
router.get('/:id', ParentController.getParentById);
router.get('/user/:userId', ParentController.getParentsByUser);
router.get('/', ParentController.getAllParents);

export const ParentRoutes = router;
