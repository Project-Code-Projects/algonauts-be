import express from 'express';
import { LikeController } from './like.controller';

const router = express.Router();

router.post('/create', LikeController.createLike);
router.post('/like/:post_id', LikeController.likePost);
router.delete('/delete/:id', LikeController.deleteLike);
router.get('/post/:postId', LikeController.getLikesByPost);

export const likeRoutes = router;
