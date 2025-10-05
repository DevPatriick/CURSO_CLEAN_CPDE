const AppError = require("../shared/errors/AppError");

module.exports = function registerUserUseCase({ userRepository }) {
    if(!userRepository) throw new AppError(AppError.dependecy)
    return async function ({ name, CPF, phone, address, email }) {
        await userRepository.register({
        name,
        CPF,
        phone,
        address,
        email,
        });
    };
};
