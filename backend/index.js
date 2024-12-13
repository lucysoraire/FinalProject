const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
const router = require('./src/routes/index')
const { sequelize } = require('./db')
const { encrypt } = require('./src/utils/passwordEncrypt')
const {PORT} = process.env || 3001
const { User } = require('./db')

const app = express()

app.use(express.json())
app.use(cors())
app.use(morgan('dev'))

app.use('/fisiosport', router) 

sequelize.sync({ force: true }).then(async() => {  
    const admin = await User.findOne({ where: { email: 'admin@gmail.com' } });
        if (!admin) { 
            const passwordEncrypt = await encrypt("admin")
            await User.create({
                email: 'admin@gmail.com',
                password: passwordEncrypt,
                isAdmin: true
            });  
        }
    app.listen(3001, () => { 
        console.log('server on port 3001');
    })  
})     