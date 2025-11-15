const { Either, AppError } = require("../../../shared/errors")
const httpResponse = require("../../../shared/helpers/http.response")
const borrowBooksController = require("./borrow-books.controller")
const { ZodError } = require('zod')


describe('Controller borrow books', () => {

    

    const httpRequestDTO = () => {
        return httpRequest = {
            body: {
                user_id: 123,
                book_id: 123,
                date_borrow: "2025-10-13",
                date_return: "2025-10-20"
            }
        }
    }

    const responseUseCaseDTO = () => {
        return httpRequest = {
            body: {
                user_id: 123,
                book_id: 123,
                date_borrow: expect.any(Date),
                date_return: expect.any(Date)
            }
        }
    }


    const httpRequesDatetDTO = () => {
        return httpRequest = {
            body: {
                user_id: 123,
                book_id: 123,
                date_borrow: "2025-10-20",
                date_return: "2025-10-13"
            }
        }
    }

    const responseUseCaseDateDTO = () => {
        return httpRequest = {
            body: {
                user_id: 123,
                book_id: 123,
                date_borrow: new Date("2025-10-20"),
                date_return: new Date("2025-10-13")
            }
        }
    }



    const borrowBooksUseCase = jest.fn()

    it('Deve retornar um httpResponse 201 e null quando for criado o emprestimo', async () => {
        borrowBooksUseCase.mockResolvedValue(Either.Right(null))
        const httpRequest = httpRequestDTO()

        const response = await borrowBooksController({
            borrowBooksUseCase,
            httpRequest
        })

        const httpReqReturnUseCase = responseUseCaseDTO()

        expect(response).toEqual(httpResponse(201, null))
        expect(borrowBooksUseCase).toHaveBeenCalledWith(httpReqReturnUseCase.body)
        expect(borrowBooksUseCase).toHaveBeenCalledTimes(1)
    })

    it('Deve retornar um Rigth.Left se já tiver um emprestimo com aquele livro', async () => {
        borrowBooksUseCase.mockResolvedValue(Either.Left({ message: 'usuario_com_livro_emprestado'}))
        const httpRequest = httpRequestDTO()

        const response = await borrowBooksController({
            borrowBooksUseCase,
            httpRequest
        })

        const httpReqReturnUseCase = responseUseCaseDTO()

        expect(response).toEqual(httpResponse(400, 'usuario_com_livro_emprestado'))
        expect(borrowBooksUseCase).toHaveBeenCalledWith(httpReqReturnUseCase.body)
        expect(borrowBooksUseCase).toHaveBeenCalledTimes(1)
    })

    it('Deve retornar um erro se o emprestar livro useCase não forem fornecidos', () => {
        expect(() => borrowBooksController({})).rejects.toThrow(
            new AppError(AppError.dependecy)
        )
    })

    it('Deve retornar um erro do zodValidator', () => {
        const httpRequest = {
            body: {}
        }

        expect(() => borrowBooksController({borrowBooksUseCase, httpRequest})).rejects.toBeInstanceOf(ZodError)
    })

    it('Deve retornar um erro ao emprestar por que a data de retorno é menor que a data de retirada', async () => {
        borrowBooksUseCase.mockResolvedValue(Either.Left({ message: 'invalid_date'}))
        const httpRequest = httpRequesDatetDTO()

        const response = await borrowBooksController({
            borrowBooksUseCase,
            httpRequest
        })

        const httpRequestDateDTO = responseUseCaseDateDTO()

        expect(response).toEqual(httpResponse(400, 'invalid_date'))
        expect(borrowBooksUseCase).toHaveBeenCalledWith(httpRequestDateDTO.body)
        expect(borrowBooksUseCase).toHaveBeenCalledTimes(1)
    })
})