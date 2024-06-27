import express from 'express';
import { UserController } from './user.controller';

const router = express.Router();

router.post('/create-user', UserController.createUser);
router.put('/reset-password/:userId', UserController.resetUserPassword);
router.put('/update/:id', UserController.updateUser);
router.delete('/delete/:id', UserController.deleteUser);
router.get('/user/:id', UserController.getUserById);
router.get('/users', UserController.getAllUsers);

export const UserRoutes = router;
