const express = require('express');
const userRouter = express.Router();
const userController = require('../controller/User.ctrl');

userRouter.post('/login', userController.loginUser);
userRouter.post('/registerUser', userController.registerUser);
userRouter.get('/profile/:id', userController.getUserProfile);
userRouter.put('/profile/:id', userController.updateUserProfile);
userRouter.delete('/profile/:id', userController.deleteUser); 
userRouter.get('/', userController.getUsers);  

module.exports = userRouter;
