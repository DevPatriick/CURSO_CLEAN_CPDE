// const { id } = require('../../../../../jest.config');
const { typeormBookRepository } = require('./Book.repository');
const { borrowRepository, typeormBorrowRepository } = require('./Borrows.repository');
const { typeormUserRepository } = require('./User.repository');

describe('Emprestimo Repository Typeorm', () => {
    let sut;

    beforeAll(() => {
        sut = borrowRepository()
    })

    // beforeEach(async () => {
    //     await typeormBorrowRepository.delete({})
    //     await typeormUserRepository.delete({})
    //     await typeormBookRepository.delete({})
    // })

    const userDTO = {
        name: 'patrick',
        CPF: 123456789,
        address: 'Rua qualquer',
        phone: 519929797,
        email: 'andrade.patrickreis@gmail.com'
    }

    const bookDTO = {
        name: 'qualquer',
        quantity: 10,
        author: 'paqtirck',
        gender: 'açaõ',
        ISBN: 123456,
    }

    test('Deve retornar void ao emprestar um livro', async () => {

        const user = await typeormUserRepository.save(userDTO)
        const book = await typeormBookRepository.save(bookDTO)

        const borrowCreate = await sut.borrow({
            user_id: user.id,
            book_id: book.id,
            date_borrow: '2024-01-26',
            date_return: '2024-01-28'
        })

        expect(borrowCreate).toBeUndefined()
    })

    test('Deve retornar a data de retorno do  livro salva no banco de dados ', async () =>{
        const user = await typeormUserRepository.save(userDTO)
        const book = await typeormBookRepository.save(bookDTO)

        const borrow = await typeormBorrowRepository.save({
            user_id: user.id,
            book_id: book.id,
            date_borrow: '2024-01-26',
            date_return: '2024-01-26'
        })

        const devolver = await sut.return({
            borrow_id: borrow.id,
            date_return: borrow.date_return
        })

        expect(devolver.date_return).toBe(borrow.date_return)
    })

    test('Deve atualizar a data de delução no banco de dados corretamente ', async () =>{
        const user = await typeormUserRepository.save(userDTO)
        const book = await typeormBookRepository.save(bookDTO)

        const borrow = await typeormBorrowRepository.save({
            user_id: user.id,
            book_id: book.id,
            date_borrow: '2024-01-26',
            date_return: '2024-01-26'
        })

        await sut.return({
            borrow_id: borrow.id,
            date_return: borrow.date_return
        })

        const getBorrowByID = await typeormBorrowRepository.findOneBy({id: borrow.id})

        expect(getBorrowByID.date_return).toBe('2024-01-26')
    })

    test('Deve retornar os emprestimos pendentes', async () => {
        const user = await typeormUserRepository.save(userDTO)
        const book = await typeormBookRepository.save(bookDTO)

        await typeormBorrowRepository.save([
            {
                user_id: user.id,
                book_id: book.id,
                date_borrow: '2024-01-27',
                date_return: '2024-01-28',
                date_devolution: '2024-01-28'
            },
            {
                user_id: user.id,
                book_id: book.id,
                date_borrow: '2024-01-26',
                date_return: '2024-01-26'
            },
        ])

        const borrowPedding = await sut.getPeddingBookWithUser()

        expect(borrowPedding).toHaveLength(4)
    })

    test('Deve retornar true se existir um emprestimo pendentes para o usuario e o livro', async () => {
        const user = await typeormUserRepository.save(userDTO)
        const book = await typeormBookRepository.save(bookDTO)

        
        await typeormBorrowRepository.save({
            user_id: user.id,
            book_id: book.id,
            date_borrow: '2024-01-26',
            date_return: '2024-01-26'
        })
        
        const borrowBook = await sut.userBorrowISBNExist(
            {
                user_id: user.id, 
                book_id: book.id
            }
        )

        expect(borrowBook).toBe(true)
    })
})