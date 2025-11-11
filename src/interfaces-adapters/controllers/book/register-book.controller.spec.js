const Either = require("../../../shared/errors/Either")
const { Right } = require("../../../shared/errors/Either")
const httpResponse = require("../../../shared/helpers/http.response")
const registerBookController = require("./register-book.controller")


describe('Cadastrar livro controller', () => {
    const registerBookUseCase = jest.fn()
    it('Deve retornar um httpRequest 200 e null de sucesso ao cadastrar livro', async () => {
        registerBookUseCase.mockResolvedValue(Either.Right(null))
        const httpRequest = {
            body: {
                name: 'nome_livro',
                quantity: 1,
                author: 'autor_livro:',
                gender: 'genero_livro',
                ISBN: 11122233344
            }
        }

        const response = await registerBookController({
            registerBookUseCase,
            httpRequest
        })

        expect(response).toEqual(httpResponse(201, null))
        expect(registerBookUseCase).toHaveBeenCalledWith(httpRequest.body)
        expect(registerBookUseCase).toHaveBeenCalledTimes(1)

    })
})