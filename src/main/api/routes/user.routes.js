const { Router } = require('express')
const { userRepository } = require('../../../infra/db/typeorm/repositories/User.repository')
const registerUserUsecase = require('../../../application/user/register-user.usecase')
const registerUserController = require('../../../interfaces-adapters/controllers/user/register-user.controller')

const userRoutes = Router()

userRoutes.post("/", async (req, res) => {
    const httpRequest = {
        body: req.body
    }

    const userRepositoryFn = userRepository()
    const registerUserUseCaseFn = registerUserUsecase({userRepositoryFn})
    const {statusCode, body} = registerUserController({registerUserUseCaseFn, httpRequest})

    return res.status(statusCode).json(body)
})

module.exports = { userRoutes }