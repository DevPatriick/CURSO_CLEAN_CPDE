const { Router } = require('express')
const { borrowBookCompose } = require('../composers/borrow-book.compose')
const { borrowBookReturnCompose } = require('../composers/borrow-book-return.compose')
const { borrowPeddingCompose } = require('../composers/borrow-pedding.compose')

const borrowRoutes = Router()

borrowRoutes.post('/', async (req, res, next) => {
    try {
        const httpRequest = {
            body: req.body
        }
        
        console.log('httpRequest', httpRequest)
        const { statusCode, body } = await borrowBookCompose(httpRequest)

        return res.status(statusCode).json(body)
    } catch (err) {
        return next(err)
    }
})

borrowRoutes.put('/return/:id', async (req, res, next) => {
    try {
        const httpRequest = {
            params: req.params,
            body: req.body
        }

        const { statusCode, body } = await borrowBookReturnCompose(httpRequest)

        return res.status(statusCode).json(body)
    } catch (error) {
        return next(error)
    }
})

borrowRoutes.get('/pedding', async (req, res, next) => {
    try {
        const {statusCode, body} = await borrowPeddingCompose();

        return res.status(statusCode).json(body)
    } catch (error) {
        return next(error)
    }
})


module.exports = {
    borrowRoutes
}
