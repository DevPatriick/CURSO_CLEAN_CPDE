const registerUserUsecase = require("../../../application/user/register-user.usecase")
const { userRepository } = require("../../../infra/db/typeorm/repositories/User.repository")
const registerUserController = require("../../../interfaces-adapters/controllers/user/register-user.controller")

module.exports = registerUserCompose = (httpRequest) => {
    // const userRepositoryFn = userRepository
    const registerUserUseCaseFn = registerUserUsecase({ userRepository: userRepository() })
    const controller = registerUserController({registerUserUseCase: registerUserUseCaseFn, httpRequest})

    return controller
}