import express from 'express';
import { BeginnerLevelController } from './beginnerLevel.controller';

const router = express.Router();

router.post('/create', BeginnerLevelController.createBeginnerLevel);
router.put('/update/:id', BeginnerLevelController.updateBeginnerLevel);
router.delete('/delete/:id', BeginnerLevelController.deleteBeginnerLevel);
router.get('/:id', BeginnerLevelController.getBeginnerLevelById);
router.get(
  '/level/:level_id',
  BeginnerLevelController.getBeginnerLevelByLevelId,
);
router.get('/', BeginnerLevelController.getAllBeginnerLevels);

export const BeginnerLevelRoutes = router;
