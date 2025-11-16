const getUserByCPFUsecase = require("../../../application/user/get-user-by-CPF.usecase")
const { userRepository } = require("../../../infra/db/typeorm/repositories/User.repository")
const getUserByCPFController = require("../../../interfaces-adapters/controllers/user/get-user-by-CPF.controller")



module.exports = getUserByCPF = async (httpRequest) => {
    const getUserByCPFUseCaseFn = getUserByCPFUsecase({ userRepository: userRepository()})
    const controller = getUserByCPFController({ getUserByCPFUsecase: getUserByCPFUseCaseFn, httpRequest })

    return controller
}