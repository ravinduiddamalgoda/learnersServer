const express = require('express');
const userRouter = express.Router();
const userController = require('../controller/User.ctrl');

userRouter.post('/login', userController.loginUser);
userRouter.post('/registerUser', userController.registerUser);

module.exports = userRouter;
