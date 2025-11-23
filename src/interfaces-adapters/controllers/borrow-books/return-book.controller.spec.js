const { ZodError } = require("zod")
const { Either, AppError } = require("../../../shared/errors")
const httpResponse = require("../../../shared/helpers/http.response")
const returnBookController = require("./return-book.controller")

describe('Retornar livro Controller', () => {
    const returnBookUseCase = jest.fn()

    const borrowReturnBookDTO = () => {
        return httpRequest = {
            body: {
                date_return: "2025-10-13"
            },
            params: {
                id: 1
            }
        }
    }


    const borrowBookDTO = () => {
        return httpRequest = {
            body: {
                date_return: new Date("2025-10-13")
            },
            params: {
                borrow_id: 1
            }
        }
    }

    it('Deve retornar um httpResponse 200 e o valor da multa se ouver', async () => {
        returnBookUseCase.mockResolvedValue(Either.fine('0'))

        const httpRequest = borrowReturnBookDTO()
        const httpReq = borrowBookDTO()

        const response = await returnBookController({
            returnBookUseCase,
            httpRequest
        })

        expect(response).toEqual(httpResponse(200, 'Multa por atraso R$ 0'))
        expect(returnBookUseCase).toHaveBeenCalledWith({
            ...httpReq.body,
            borrow_id: httpRequest.params.id
        })
        expect(returnBookUseCase).toHaveBeenCalledTimes(1)
    })

    it('Deve retornar um AppError se n for passado o useCase e o httpRequest', async () => {
        await expect(() => returnBookController({})).rejects.toThrow(new AppError(AppError.dependecy))
    })

    it('Deve retornar um erro do zodValidator', () => {
        const httpRequest = {
            body: {}
        }

        expect(() => returnBookController({returnBookUseCase, httpRequest})).rejects.toBeInstanceOf(ZodError)
    })
})
