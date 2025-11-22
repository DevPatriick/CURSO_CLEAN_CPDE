const { Router } = require('express')
const { registerBookCompose } = require('../composers/register-book.compose')
const { getBookISBNOrNameCompose } = require('../composers/get-book-ISBN-or-name.compose')

const bookRoutes = Router()

bookRoutes.post("/", async (req, res, next) => {
    try {
        const httpRequest = {
            body: req.body
        }

        const { statusCode, body } = await registerBookCompose(httpRequest)

        return res.status(statusCode).json(body)
    } catch (err) {
        return next(err)
    }
})


bookRoutes.get('/ISBNOrName', async (req, res, next) => {
    try {
        const httpRequest = {
            query: req.query
        }
    
        const {statusCode, body} = await getBookISBNOrNameCompose(httpRequest)
    
        return res.status(statusCode).json(body)
    } catch (err) {
        return next(err)
    }
})

module.exports = {
    bookRoutes
}