const borrowBooksUsecase = require("./borrow-books.usecase")
const { AppError, Either } = require("../../shared/errors/index")


describe('Emprestar livro UseCase', ()=> {
    const borrowBooksRepository = {
        borrow: jest.fn(),
        userBorrowISBNExist: jest.fn()
    }

    test('Deve pode emprestar um livro', async () => {
        borrowBooksRepository.userBorrowISBNExist.mockResolvedValue(false)
        const borrowDTO = {
            user_id: 123,
            book_id: 123,
            date_borrow: new Date("2025-10-13"),
            date_return: new Date("2025-10-20")
        }

        const sut = borrowBooksUsecase({ borrowBooksRepository })
        const output = await sut(borrowDTO)

        expect(output.right).toBeNull()
        expect(borrowBooksRepository.borrow).toHaveBeenCalledWith(borrowDTO)
        expect(borrowBooksRepository.borrow).toHaveBeenCalledTimes(1)
    })

    test('Data de retorno não pode ser maior que a data de retirada', async () => {
        borrowBooksRepository.userBorrowISBNExist.mockResolvedValue(false)
        const borrowDTO = {
            user_id: 123,
            book_id: 123,
            date_borrow: new Date("2025-10-30"),
            date_return: new Date("2025-10-20")
        }

        const sut = borrowBooksUsecase({ borrowBooksRepository })
        const output = await sut(borrowDTO)

        expect(output.left).toBe(Either.dateReturnInvalid)
    })
})