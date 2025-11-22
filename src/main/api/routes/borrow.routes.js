const { Router } = require('express')
const { borrowBookCompose } = require('../composers/borrow-book.compose')

const borrowRoutes = Router()

borrowRoutes.post('/', async (req, res, next) => {
    try {
        const httpRequest = {
            body: req.body
        }

        const { statusCode, body } = await borrowBookCompose(httpRequest)

        return res.status(statusCode).json(body)
    } catch (err) {
        return next(err)
    }
})


module.exports = {
    borrowRoutes
}
