const express = require('express');
const { login, register, isValidToken, logout } = require('../middleware/auth');



const authRouter = express.Router();

authRouter.post('/login',login);
authRouter.post('/register',register);
authRouter.post('/isvalidtoken',isValidToken);
authRouter.post('/logout',logout);

//http://localhost:9000/api/auth/login
//http://localhost:9000/api/auth/register

module.exports = authRouter;