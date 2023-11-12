const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
const router = require('./src/routes/index')
const { sequelize } = require('./db')
const {PORT} = process.env || 3001

const app = express()

app.use(express.json())
app.use(cors())
app.use(morgan('dev'))

app.use('/fisiosport', router) 

sequelize.sync({ alter: true }).then(async() => {  
    app.listen(PORT, () => { 
        console.log('server on port 3001');
    })  
})     