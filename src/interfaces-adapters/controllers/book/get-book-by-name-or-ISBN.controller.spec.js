const { Either, AppError } = require("../../../shared/errors")
const httpResponse = require("../../../shared/helpers/http.response")
const getBookByNameOrISBNController = require("./get-book-by-name-or-ISBN.controller")
const { ZodError } = require('zod')


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

    // beforeAll(() => {})

    const getBookByNameOrISBNUseCase = jest.fn()

    it('Deve retornar httpResponse 201 e o livro ao buscar livro pelo nome ou pelo ISBN', async () => {
        getBookByNameOrISBNUseCase.mockResolvedValue(Either.Right(bookDTO))
        const httpRequest = httpRequestDTO()

        const response = await getBookByNameOrISBNController({
            getBookByNameOrISBNUseCase,
            httpRequest
        })

        expect(response).toEqual(httpResponse(200, bookDTO))
        expect(getBookByNameOrISBNUseCase).toHaveBeenCalledWith(httpRequest.query)
        expect(getBookByNameOrISBNUseCase).toHaveBeenCalledTimes(1)
    })

    it('Deve retornar um array vazio caso não seja encontrado nenhum livro pelo nome ou ISBN e um httpResponse 200', async () => {
        getBookByNameOrISBNUseCase.mockResolvedValue(Either.Right([]))
        // const httpRequest = httpRequestDTO()

        const response = await getBookByNameOrISBNController({
            getBookByNameOrISBNUseCase,
            httpRequest
        })

        expect(response).toEqual(httpResponse(200, []))
        expect(getBookByNameOrISBNUseCase).toHaveBeenCalledWith(httpRequest.query)
        expect(getBookByNameOrISBNUseCase).toHaveBeenCalledTimes(1)
    })

    it('Deve retorn um throw AppError se o getBookByNameOrISBNUseCase e o httpRequest não forem passados', async ()=> {
        await expect(()=> getBookByNameOrISBNController({})).rejects.toThrow(new AppError(AppError.dependecy))
    })

    it('Deve retornar um erro do zod', () => {
        const httpRequest = {
            query: {}
        }

        expect(() => getBookByNameOrISBNController({getBookByNameOrISBNUseCase, httpRequest})).rejects.toBeInstanceOf(ZodError)
    })
})