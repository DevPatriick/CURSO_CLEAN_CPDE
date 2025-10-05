const registerUserUseCase = require('./register-user.usecase')

describe('Cadastrar usuário UseCase', function(){
    test('Deve cadastrar um usuário', async function(){
        const userDTO = {
            name: 'Patrick Reis Andrade',
            CPF: 5555,
            phone: 51992794875,
            address: 'Rua dos andradas 385',
            email: 'andrade.patrick@gmail.com'
        }

        const sutRegisterUserUseCase = registerUserUseCase()
        const output = await sutRegisterUserUseCase(userDTO)

        expect(output).toBeUndefined()
    })
})