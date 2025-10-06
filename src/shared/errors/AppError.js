
module.exports = class AppError extends Error {
    constructor(message){
        super(message)
        this.message = message
    }

    static dependecy = 'Alguma dependência não foi fornecida'
    static invalidparams = 'Preencha todos os campos'
    static invalidCPF = 'CPF Inválido'
    static invalidEmail = 'E-mail inválido'
    static userExistByCPF = 'Usuário já existem com este CPF'
    static userExistByEmail = 'Usuário já existem com este e-mail'
}