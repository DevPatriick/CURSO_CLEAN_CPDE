module.exports = function registerUserUseCase({ userRepository }) {
    if(!userRepository) throw new Error('userRepository não fornecido')
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
