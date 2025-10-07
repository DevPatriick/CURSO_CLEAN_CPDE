const { Either, AppError } = require("../shared/errors");

module.exports = function getUserByCPFUseCase({ userRepository }){
    if (!userRepository) throw new AppError(AppError.dependecy);
    return async function({CPF}) {
        if(!CPF) throw new AppError(AppError.invalidCPF)
        const dataUser = await userRepository.getUserByCPF(CPF)
        if(!dataUser) return null
        return Either.Right(dataUser)
    }
}