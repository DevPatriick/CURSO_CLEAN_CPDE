const { Either, AppError } = require('../../shared/errors')
const registerUserUsecase = require('./register-user.usecase')
const registerUserUseCase = require('./register-user.usecase')

describe('Cadastrar usuário UseCase', function(){

    const userRepository = {
        register: jest.fn(),
        getUserByCPF: jest.fn(),
        getUserByEmail: jest.fn()
    }

    // Triplo AAA
    // Arrange (Preparação)
    // Act (Ação)
    // Assert (Afirmação)

    test('Deve cadastrar um usuário', async function(){
        // Arrange
        const userDTO = {
            name: 'Patrick Reis Andrade',
            CPF: 55555555555,
            phone: 51992794875,
            address: 'Rua dos andradas 385',
            email: 'andrade.patrick@gmail.com'
        }

        // Act
        const sutRegisterUserUseCase = registerUserUseCase({ userRepository })

        // Assert
        const output = await sutRegisterUserUseCase(userDTO)

        expect(output.right).toBeNull()

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

    test('Deve retornar um throw AppErro que os params não forem fornecidos', async function(){
        const sut = registerUserUseCase({ userRepository })
        await expect(() => sut({})).rejects.toThrow(new AppError(AppError.invalidparams))
    })

    test('Deve retornar throw do AppError CPF invalido', async () => {
        const userDTO = {
            name: 'Patrick Reis Andrade',
            CPF: 5555,
            phone: 51992794875,
            address: 'Rua dos andradas 385',
            email: 'andrade.patrick@gmail.com'
        }

        const sut = registerUserUseCase({ userRepository    })
        await expect(() => sut(userDTO)).rejects.toThrow(new AppError(AppError.invalidCPF))
    })

    test('Deve retornar um throw AppErro email INVALIDO', async function(){
        const userDTO = {
            name: 'Patrick Reis Andrade',
            CPF: 55555555555,
            phone: 51992794875,
            address: 'Rua dos andradas 385',
            email: '@gmail.com'
        }

        const sut = registerUserUseCase({ userRepository })
        await expect(() => sut(userDTO)).rejects.toThrow(new AppError(AppError.invalidEmail))
    })

    test('Deve retornar um throw AppErro CPF já cadastrado', async function(){
        userRepository.getUserByCPF.mockResolvedValue(true)
        userRepository.getUserByEmail.mockResolvedValue(false)
        const userDTO = {
            name: 'Patrick Reis Andrade',
            CPF: 55555555555,
            phone: 51992794875,
            address: 'Rua dos andradas 385',
            email: 'patrick@gmail.com'
        }

        const sut = registerUserUseCase({ userRepository })
        const output = await sut(userDTO)
        expect(output.right).toBeNull()
        expect(output.left).toEqual(Either.userExist('CPF'))
        // Verifica se já existe
        expect(userRepository.getUserByCPF).toHaveBeenLastCalledWith(userDTO.CPF)
        // Se foi apenas uma vez
        expect(userRepository.getUserByCPF).toHaveBeenCalledTimes(1)

        // toHaveBeenLastCalledWith é um matcher do Jest usado para testar funções mock (ou spies) e verificar com quais argumentos a função foi chamada na última vez.
    })

    test('Deve retornar um throw AppErro email já cadastrado', async function(){
        userRepository.getUserByCPF.mockResolvedValue(false)
        userRepository.getUserByEmail.mockResolvedValue(true)
        const userDTO = {
            name: 'Patrick Reis Andrade',
            CPF: 55555555555,
            phone: 51992794875,
            address: 'Rua dos andradas 385',
            email: 'patrick@gmail.com'
        }

        const sut = registerUserUseCase({ userRepository })
        const output = await sut(userDTO)
        expect(output.right).toBeNull()
        // Verifica se é igual
        expect(output.left).toEqual(Either.userExist('E-mail'))
        expect(userRepository.getUserByEmail).toHaveBeenLastCalledWith(userDTO.email)
        expect(userRepository.getUserByEmail).toHaveBeenCalledTimes(1)
    })

})