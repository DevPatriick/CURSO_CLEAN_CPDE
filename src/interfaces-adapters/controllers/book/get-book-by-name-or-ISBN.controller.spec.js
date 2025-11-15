const { Either } = require("../../../shared/errors")
const httpResponse = require("../../../shared/helpers/http.response")
const getBookByNameOrISBNController = require("./get-book-by-name-or-ISBN.controller")


describe('Buscar livro por nome ou ISBN Controller', () => {
    const bookDTO = {
        name: 'Quem mexeu no meu queijo',
        quantity: 1,
        author: 'Spencer Johnson',
        gender: 'Livro de autoajuda',
        ISBN: '123456789'
    }

    const httpRequestDTO = () => {
        return httpRequest = {
            query: {
                value: 'Quem mexeu no meu queijo'
            }
        }
    }

    const getBookByNameOrISBNUseCase = jest.fn()

    it('Deve retornar httpResponse 201 e o livro ao buscar livro pelo nome ou pelo ISBN', async () => {
        getBookByNameOrISBNUseCase.mockResolvedValue(Either.Right(bookDTO))
        const httpRequest = httpRequestDTO()

        const response = await getBookByNameOrISBNController({
            getBookByNameOrISBNUseCase,
            httpRequest
        })

        expect(response).toEqual(httpResponse(201, bookDTO))
        expect(getBookByNameOrISBNUseCase).toHaveBeenCalledWith(httpRequest.query)
        expect(getBookByNameOrISBNUseCase).toHaveBeenCalledTimes(1)
    })
})