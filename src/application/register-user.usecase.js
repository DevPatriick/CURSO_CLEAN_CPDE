module.export = function registerUserUseCase() {
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
