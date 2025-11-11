const Either = require("../../../shared/errors/Either")
const { Right } = require("../../../shared/errors/Either")
const httpResponse = require("../../../shared/helpers/http.response")
const registerBookController = require("./register-book.controller")


describe('Cadastrar livro controller', () => {
    const httpReqDTO = () => {
        return httpRequest = {
            body: {
                name: 'nome_livro',
                quantity: 1,
                author: 'autor_livro:',
                gender: 'genero_livro',
                ISBN: 11122233344
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
})