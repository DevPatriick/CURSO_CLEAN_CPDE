module.exports = function registerUserUseCase({ userRepository }) {
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
