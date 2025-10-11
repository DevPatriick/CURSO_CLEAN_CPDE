const { AppError } = require("../shared/errors")
const registerBookUseCase = require("./register-book.usecase")

describe('Cadastro de livros', () => {
    const bookRepository = {
        register: jest.fn()
    }

    test('Deve cadastrar um livro', async () => {
        const bookDTO = {
            name: 'Quem mexeu no meu queijo',
            quantity: 1,
            author: 'Spencer Johnson',
            gender: 'Livro de autoajuda',
            ISBN: 123456789
        }

        const sut = registerBookUseCase({ bookRepository })
        const output = await sut(bookDTO)

        expect(output.right).toBeNull()
        expect(bookRepository.register).toHaveBeenLastCalledWith(bookDTO)
        expect(bookRepository.register).toHaveBeenCalledTimes(1)
    })

    test('Deve retorna um throw AppError se o livro não for fornecido', () => {
        expect(()=> registerBookUseCase({}).toThrow(new AppError(AppError.dependecy)))
    })

    test('Deve retorna um throw AppError se os campos obrigatorios não forem passados', async () => {
        const sut = registerBookUseCase({ bookRepository })

        await expect(() => sut({})).rejects.toThrow(new AppError(AppError.invalidparams))
    })
})