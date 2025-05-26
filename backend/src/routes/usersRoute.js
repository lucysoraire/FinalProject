const { Router } = require('express')
const { registerUser, loginUser, checkUserExists  } = require('../handlers/usersHandler')

const userRouter = Router()

userRouter.post('/register', registerUser)
userRouter.post('/login', loginUser)
userRouter.get("/exists", checkUserExists);

module.exports = userRouter