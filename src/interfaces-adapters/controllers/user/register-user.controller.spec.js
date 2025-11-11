const { Either, AppError } = require("../../../shared/errors/index")
const httpResponse = require("../../../shared/helpers/http.response")
const registerUserController = require("./register-user.controller")
const { ZodError } = require('zod')


describe('Cadastrar usuario controller', () => {
    const registerUserUseCase = jest.fn()

    test('Deve retornar um httpResponse 201 e null se o cadastro for realizado com sucesso', async () => {
        registerUserUseCase.mockResolvedValue(Either.Right(null))
        const httpRequest = {
            body: {
                name: 'Patrick',
                CPF: '111.222.333-44',
                address: 'Rua dos andradas',
                phone: '51992794875',
                email: 'andrade.patrickreis@gmail.com'
            }
        }

        const response = await registerUserController({
            registerUserUseCase,
            httpRequest
        })

        expect(response).toEqual(httpResponse(201, null))
        expect(registerUserUseCase).toHaveBeenCalledWith(httpRequest.body)
        expect(registerUserUseCase).toHaveBeenCalledTimes(1)
    })

    test('Deve retornar um throw AppError se o registerUserUseCase e httpRequest não for fornecido', async () => {
        expect(() => registerUserController({})).rejects.toThrow(
            new AppError(AppError.dependecy)
        )
    })

    test('Deve retornar um httpResponse 400 e erro.message se o cadastro de user n for realizado com sucesso por logica do useCase ', async () => {
        registerUserUseCase.mockResolvedValue(Either.Left({message: 'logica_invalida'}))
        const httpRequest = {
            body: {
                name: 'Patrick',
                CPF: '111.222.333-44',
                address: 'Rua dos andradas',
                phone: '51992794875',
                email: 'andrade.patrickreis@gmail.com'
            }
        }

        const response = await registerUserController({
            registerUserUseCase,
            httpRequest
        })

        expect(response).toEqual(httpResponse(400, 'logica_invalida'))
        expect(registerUserUseCase).toHaveBeenCalledWith(httpRequest.body)
        expect(registerUserUseCase).toHaveBeenCalledTimes(1)
    })

    test('Deve retornar um erro do zodValidator', () => {
        const httpRequest = {
            body: {}
        }

        expect(() => registerUserController({registerUserUseCase, httpRequest})).rejects.toBeInstanceOf(ZodError)
    })
})