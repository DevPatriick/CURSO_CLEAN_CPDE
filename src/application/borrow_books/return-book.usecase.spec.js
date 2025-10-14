const { Either, AppError } = require("../../shared/errors")
const returnBookUseCase = require('./return-book.usecase')

describe('Devolver livro UseCase', () => {
    const returnBookRepository = {
        return: jest.fn()
    }
    test('Deve ser possível devolver um livro sem multa', async () => {
        const returnBookDTO = {
            borrow_id: 123,
            date_return: new Date('2025-10-14')
        }

        const sut = returnBookUseCase({ returnBookRepository })
        const output = await sut(returnBookDTO)

        expect(output).toEqual(Either.fine('0'))
        expect(returnBookRepository.return).toHaveBeenCalledWith(returnBookDTO)
        expect(returnBookRepository.return).toHaveBeenCalledTimes(1)
    })
})