const { Either } = require("../shared/errors");

module.exports = function getUserByCPFUseCase({ userRepository }){
    return async function({CPF}) {
        const dataUser = await userRepository.getUserByCPF(CPF)
        return Either.Right(dataUser)
    }
}