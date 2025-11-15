const { AppError, Either } = require("../../shared/errors")
const getBookByNameOrISBNUseCase = require("./get-book-by-ISBN.usecase")

describe('Buscar livros por nome ou ISBN UseCase', () => {

    const bookRepository = {
        getBookByNameOrISBN: jest.fn(),
    }

    test('Deve retornar um livro valido ao buscar por nome ou ISBN existente', async () => {
        const nameISBNDTO = {
            value: 'name_or_ISBN',
        }

        const outputDTO = [
            {
                name: 'Quem mexeu no meu queijo',
                quantity: 1,
                author: 'Spencer Johnson',
                gender: 'Livro de autoajuda',
                ISBN: '123456789'
            }
        ]

        bookRepository.getBookByNameOrISBN.mockResolvedValue(outputDTO)

        const sut = getBookByNameOrISBNUseCase({ bookRepository })
        const output = await sut(nameISBNDTO)

        expect(output.right).toEqual(outputDTO)
        expect(bookRepository.getBookByNameOrISBN).toHaveBeenCalledWith(nameISBNDTO.value)
        expect(bookRepository.getBookByNameOrISBN).toHaveBeenCalledTimes(1)
    })

    test('Deve retornar um array vazio quando não existir um livro com o nome ou ISBN informados', async () => {
        const nameISBNDTO = {
            value: 'name_or_ISBN'
        }

        bookRepository.getBookByNameOrISBN.mockResolvedValue([])

        const sut = getBookByNameOrISBNUseCase({ bookRepository })
        const output = await sut(nameISBNDTO)

        expect(output.right).toEqual([])
        expect(bookRepository.getBookByNameOrISBN).toHaveBeenCalledWith(nameISBNDTO.value)
        expect(bookRepository.getBookByNameOrISBN).toHaveBeenCalledTimes(1)
    })

    test('Deve retornar um throw se não mandar o bookRepository', () => {
        expect(() => getBookByNameOrISBNUseCase({})).toThrow(new AppError(AppError.dependecy))
    })

    test('Deve retornar um erro caso o campo de busca não for enviado', async () => {

        const sut = getBookByNameOrISBNUseCase({ bookRepository })

        await expect(() => sut({})).rejects.toThrow(new AppError(AppError.invalidISBN))
    })
})