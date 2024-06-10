import express from 'express';
import { SectionController } from './section.controller';

const router = express.Router();

router.post('/create', SectionController.createSection);
router.put('/update/:id', SectionController.updateSection);
router.delete('/delete/:id', SectionController.deleteSection);
router.get('/:id', SectionController.getSectionById);
router.get('/', SectionController.getAllSections);

export const SectionRoutes = router;
