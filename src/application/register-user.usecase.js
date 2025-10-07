const { Either } = require("../shared/errors");
const AppError = require("../shared/errors/AppError");
const { Left } = require("../shared/errors/Either");

module.exports = function registerUserUseCase({ userRepository }) {
  if (!userRepository) throw new AppError(AppError.dependecy);
  return async function ({ name, CPF, phone, address, email }) {
    const cpfRegex = /^(\d{3}\.?\d{3}\.?\d{3}-?\d{2})$/;
    const emailRegex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/i;
    const params = name && CPF && phone && address && email;

    if (!params) throw new AppError(AppError.invalidparams);
    if (!cpfRegex.test(CPF)) throw new AppError(AppError.invalidCPF);
    if (!emailRegex.test(email)) throw new AppError(AppError.invalidEmail);

    const userExistsByCPF = await userRepository.getUserByCPF(CPF)
    if(userExistsByCPF) return Either.Left(Either.userExist('CPF'))

    const userExistsByEmail = await userRepository.getUserByEmail(email)
    if(userExistsByEmail) return Either.Left(Either.userExist('E-mail'))

    await userRepository.register({
      name,
      CPF,
      phone,
      address,
      email,
    });
    return Either.Right(null)
  };
};
