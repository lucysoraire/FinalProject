const { Router } = require('express')

const router = Router()

router.use('/', (req, res) => {
    res.send('hola')
}) 

module.exports = router