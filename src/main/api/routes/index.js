const { Router } = require('express')
const { userRoutes } = require('./user.routes')
const { bookRoutes } = require('./book.routes')

const routes = Router()

routes.use('/users', userRoutes)
routes.use('/books', bookRoutes)

module.exports = { routes }