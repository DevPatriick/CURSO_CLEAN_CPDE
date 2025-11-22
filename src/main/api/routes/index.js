const { Router } = require('express')
const { userRoutes } = require('./user.routes')
const { bookRoutes } = require('./book.routes')
const { borrowRoutes } = require('./borrow.routes')

const routes = Router()

routes.use('/users', userRoutes)
routes.use('/books', bookRoutes)
routes.use('/borrow', borrowRoutes)

module.exports = { routes }