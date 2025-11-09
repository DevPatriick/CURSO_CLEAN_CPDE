const { Either } = require("../../shared/errors")
const httpResponse = require("../../shared/helpers/http.response")
const registerUserController = require("./register-user.controller")


describe('Cadastrar usuario controller', () => {
    const registerUserUseCase = jest.fn()

    test('Deve retornar um httpResponse 201 e null se o cadastro for realizado com sucesso', async () => {
        registerUserUseCase.mockResolvedValue(Either.Right(null))
        const httpRequest = {
            body: {
                name: 'Patrick',
                CPF: '11122233344',
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
})