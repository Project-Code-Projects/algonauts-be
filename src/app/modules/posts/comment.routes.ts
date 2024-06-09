import express from 'express';
import { CommentController } from './comment.controller';

const router = express.Router();

router.post('/create', CommentController.createComment);
router.put('/update/:id', CommentController.updateComment);
router.delete('/delete/:id', CommentController.deleteComment);
router.get('/post/:postId', CommentController.getCommentsByPost);

export const CommentRoutes = router;
