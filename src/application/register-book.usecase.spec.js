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
})