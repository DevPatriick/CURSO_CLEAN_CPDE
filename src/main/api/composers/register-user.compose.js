const registerUserUsecase = require("../../../application/user/register-user.usecase")
const { userRepository } = require("../../../infra/db/typeorm/repositories/User.repository")
const registerUserController = require("../../../interfaces-adapters/controllers/user/register-user.controller")

module.exports = registerUserCompose = async (httpRequest) => {
    const userRepositoryFn = userRepository()
    const registerUserUseCaseFn = registerUserUsecase({userRepositoryFn})
    const controller = registerUserController({registerUserUseCaseFn, httpRequest})

    return controller
}