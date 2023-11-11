const { User } = require('../../db')
const { encrypt, verify } = require('../utils/passwordEncrypt')

const createUser = async (user) => {
    const userFound = await User.findOne({ where: { email: user.email } })

    if (userFound) return { message: 'Email en uso' }
    const passwordHash = await encrypt(user.password)

    const newUser = await User.create({
        email: user.email,
        password: passwordHash
    })
    return newUser
}

const searchUser = async (email, password) => {
    const user = await User.findOne({
        where: {
            email
        }
    })
    if (!user) return { message: "usuario no registrado" };
    const passwordCompare = await verify(password, user.password)
    if (!passwordCompare) return {  authenticated: passwordCompare, isAdmin: false };
    return {
        authenticated: passwordCompare,
        isAdmin: user.isAdmin,
        userId: user.id
    }
}

module.exports = {
    createUser,
    searchUser,

}