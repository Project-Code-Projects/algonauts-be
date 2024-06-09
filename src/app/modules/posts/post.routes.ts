import express from 'express';
import { PostController } from './post.controller';

const router = express.Router();

router.post('/create', PostController.createPost);
router.put('/update/:id', PostController.updatePost);
router.delete('/delete/:id', PostController.deletePost);
router.get('/post/:id', PostController.getPostById);
router.get('/posts', PostController.getAllPosts);
router.get('/posts/author/:authorId', PostController.getPostsByAuthor);


export const PostRoutes =  router;
