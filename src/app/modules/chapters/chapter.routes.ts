import express from 'express';
import { ChapterController } from './chapter.controller';

const router = express.Router();

router.post('/create', ChapterController.createChapter);
router.put('/update/:id', ChapterController.updateChapter);
router.delete('/delete/:id', ChapterController.deleteChapter);
router.get('/:id', ChapterController.getChapterById);
router.get('/', ChapterController.getAllChapters);

export const ChapterRoutes = router;
