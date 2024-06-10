import express from 'express';
import { EditorLevelController } from './editorLevel.controller';

const router = express.Router();

router.post('/create', EditorLevelController.createEditorLevel);
router.put('/update/:id', EditorLevelController.updateEditorLevel);
router.delete('/delete/:id', EditorLevelController.deleteEditorLevel);
router.get('/:id', EditorLevelController.getEditorLevelById);
router.get('/', EditorLevelController.getAllEditorLevels);

export const EditorLevelRoutes = router;
