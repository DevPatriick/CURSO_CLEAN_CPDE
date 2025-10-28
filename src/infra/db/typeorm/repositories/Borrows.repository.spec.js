const { typeormBookRepository } = require('./Book.repository');
const { borrowRepository, typeormBorrowRepository } = require('./Borrows.repository');
const { typeormUserRepository } = require('./User.repository');

describe('Emprestimo Repository Typeorm', () => {
    let sut;

    beforeAll(() => {
        sut = borrowRepository()
    })

    test('Deve retornar void ao emprestar um livro', async () => {

        const user = await typeormUserRepository.save({
            name: 'patrick',
            CPF: 123456789,
            address: 'Rua qualquer',
            phone: 519929797,
            email: 'andrade.patrickreis@gmail.com'
        })

        const book = await typeormBookRepository.save({
            name: 'qualquer',
            quantity: 10,
            author: 'paqtirck',
            gender: 'açaõ',
            ISBN: 123456,
        })

        const borrowCreate = await sut.borrow({
            user_id: user.id,
            book_id: book.id,
            date_borrow: '2024-01-26',
            date_return: '2024-01-28'
        })

        expect(borrowCreate).toBeUndefined()
    })
})