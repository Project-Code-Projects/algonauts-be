import express from 'express';
import { BlockLevelController } from './blockLevel.controller';

const router = express.Router();

router.post('/create', BlockLevelController.createBlockLevel);
router.put('/update/:id', BlockLevelController.updateBlockLevel);
router.delete('/delete/:id', BlockLevelController.deleteBlockLevel);
router.get('/:id', BlockLevelController.getBlockLevelById);
router.get('/', BlockLevelController.getAllBlockLevels);

export const BlockLevelRoutes = router;
