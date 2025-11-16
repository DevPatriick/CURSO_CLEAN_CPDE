const { Router } = require('express')
const registerUserCompose = require('../composers/register-user.compose')
const getUserByCPFCompose = require('../composers/get-user-by-CPF.compose')

const userRoutes = Router()

userRoutes.post("/", async (req, res) => {
    const httpRequest = {
        body: req.body
    }

    const {statusCode, body} = await registerUserCompose(httpRequest)

    return res.status(statusCode).json(body)
})

userRoutes.get("cpf/:cpf", async (req, res) => {
    const httpRequest = {
        body: req.body
    }

    const {statusCode, body} = await getUserByCPFCompose(httpRequest)

    return res.status(statusCode).json(body)
})

module.exports = { userRoutes }