const { Router } = require('express')
const { registerBookCompose } = require('../composers/register-book.compose')
const { getBookISBNOrNameCompose } = require('../composers/get-book-ISBN-or-name.compose')

const bookRoutes = Router()

bookRoutes.post("/", async (req, res) => {
    const httpRequest = {
        body: req.body
    }

    const {statusCode, body} = await registerBookCompose(httpRequest)

    return res.status(statusCode).json(body)
})

bookRoutes.get('/ISBNOrName', async (req, res) => {
    const httpRequest = {
        query: req.query
    }

    const {statusCode, body} = await getBookISBNOrNameCompose(httpRequest)

    res.status(statusCode).json(body)
})

module.exports = {
    bookRoutes
}