const { Router } = require('express')
const { sendMessageHandler } = require('../handlers/contactHandler')

const contactRouter = Router()

contactRouter.post('/', sendMessageHandler)

module.exports = contactRouter