const AppError = require("../shared/errors/AppError");

module.exports = function registerUserUseCase({ userRepository }) {
    if(!userRepository) throw new AppError(AppError.dependecy)
    return async function ({ name, CPF, phone, address, email }) {
        const emailRegex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/i
        const params = CPF && phone && address
        if(!params) throw new AppError(AppError.invalidparams)
        if(!emailRegex.test(email)) throw new AppError(AppError.invalidEmail)
        await userRepository.register({
            name,
            CPF,
            phone,
            address,
            email,
        });
    };
};
