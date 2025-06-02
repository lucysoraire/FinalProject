const { Router } = require('express');

const {
  registerUser,
  loginUser,
  checkUserExists,
} = require('../handlers/usersHandler');
const { forgotPassword, resetPassword } = require('../controllers/authController');

const userRouter = Router();

userRouter.post('/register', registerUser);
userRouter.post('/login', loginUser);
userRouter.get('/exists', checkUserExists);

userRouter.post('/forgot-password', forgotPassword);
userRouter.post('/reset-password/:token', resetPassword);

module.exports = userRouter;
