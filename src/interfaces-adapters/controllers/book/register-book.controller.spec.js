const { Either, AppError } = require("../../../shared/errors/index")
const { Right } = require("../../../shared/errors/Either")
const httpResponse = require("../../../shared/helpers/http.response")
const registerBookController = require("./register-book.controller")
const { ZodError } = require("zod")


describe('Cadastrar livro controller', () => {
    const httpReqDTO = () => {
        return httpRequest = {
            body: {
                name: 'nome_livro',
                quantity: 1,
                author: 'autor_livro:',
                gender: 'genero_livro',
                ISBN: '11122233344'
            }
        }
    }

    const registerBookUseCase = jest.fn()
    it('Deve retornar um httpRequest 200 e null de sucesso ao cadastrar livro', async () => {
        registerBookUseCase.mockResolvedValue(Either.Right(null))
        const httpRequest = httpReqDTO()

        const response = await registerBookController({
            registerBookUseCase,
            httpRequest
        })

        expect(response).toEqual(httpResponse(201, null))
        expect(registerBookUseCase).toHaveBeenCalledWith(httpRequest.body)
        expect(registerBookUseCase).toHaveBeenCalledTimes(1)

    })

    it('Deve retornar um httpResponse 400 e error ao tentar cadastrar um livro', async () => {
        registerBookUseCase.mockResolvedValue(Either.Left({message: 'logica_invalida'}))
        const httpRequest = httpReqDTO()

        const response = await registerBookController({
            registerBookUseCase,
            httpRequest
        })

        expect(response).toEqual(httpResponse(400, 'logica_invalida'))
        expect(registerBookUseCase).toHaveBeenCalledWith(httpRequest.body)
        expect(registerBookUseCase).toHaveBeenCalledTimes(1)

    })

    it('Deve retornar um throw AppError se o usecase e/ou httpRequest n for fornecido', async () => {
        expect(() => registerBookController({})).rejects.toThrow(
            new AppError(AppError.dependecy)
        )
    })

    it('Deve retornar um erro do zodValidator', () => {
        const httpRequest = {
            body: {}
        }

        expect(() => registerBookController({registerBookUseCase, httpRequest})).rejects.toBeInstanceOf(ZodError)
    })
})