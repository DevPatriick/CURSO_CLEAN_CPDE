const AppError = require('../shared/errors/AppError')
const registerUserUsecase = require('./register-user.usecase')
const registerUserUseCase = require('./register-user.usecase')

describe('Cadastrar usuário UseCase', function(){

    const userRepository = {
        register: jest.fn()
    }

    // Triplo AAA
    // Arrange (Preparação)
    // Act (Ação)
    // Assert (Afirmação)

    test('Deve cadastrar um usuário', async function(){
        // Arrange
        const userDTO = {
            name: 'Patrick Reis Andrade',
            CPF: 5555,
            phone: 51992794875,
            address: 'Rua dos andradas 385',
            email: 'andrade.patrick@gmail.com'
        }

        // Act
        const sutRegisterUserUseCase = registerUserUseCase({ userRepository })

        // Assert
        const output = await sutRegisterUserUseCase(userDTO)

        expect(output).toBeUndefined()

        // Espera que a informação passada para o register seja a mesma que user DTO
        expect(userRepository.register).toHaveBeenCalledWith(userDTO)

        // Garante que a função foi chamada apenas uma vez
        expect(userRepository.register).toHaveBeenCalledTimes(1)
    })

    test('Deve retornar um throw AppError se o userRepository não for fornecido', function (){
        expect(()=> {
            registerUserUsecase({})
        }).toThrow(new AppError(AppError.dependecy))
    })
})