const httpResponse = require("../../../shared/helpers/http.response")
const getBorrowPeddingController = require("./get-borrow-pedding.controller")
const getBorrowPedding = require("../../../tests/fixtures/get-borrow-pedding")
const { Either, AppError } = require("../../../shared/errors")


describe('Buscar emprestimos pendentes', () => {
    const getBorrowPedingUseCase = jest.fn()
    it('Deve retornar todos os emprestimos pendentes httpResquest 200', async () => {
        getBorrowPedingUseCase.mockResolvedValue(Either.Right(getBorrowPedding))

        const response = await getBorrowPeddingController({getBorrowPedingUseCase})

        expect(response).toEqual(httpResponse(200, getBorrowPedding))
    })

    it('Deve retornar um erro se o useCase n for fornecido', async() => {
        await expect(()=> getBorrowPeddingController({})).rejects.toThrow(new AppError(AppError.dependecy))
    })
})