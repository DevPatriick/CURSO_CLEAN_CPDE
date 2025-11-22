const request  = require("supertest")
const { app } = require("../app")
const { typeormBookRepository } = require("../../../infra/db/typeorm/repositories/Book.repository")
const { typeormUserRepository } = require("../../../infra/db/typeorm/repositories/User.repository")
const { typeormBorrowRepository } = require("../../../infra/db/typeorm/repositories/Borrows.repository")


describe('Emprestar livro routes', () => {

    beforeEach(async () => {
        await typeormBorrowRepository.query('DELETE FROM "Borrow"')
        await typeormBookRepository.query('DELETE FROM "Book"')
        await typeormUserRepository.query('DELETE FROM "User"')
    })

    const borrowDTO = {
        user_id: 1, 
        book_id: 1, 
        date_borrow: '2025-11-24', 
        date_return: '2025-11-25'
    }

    const userDTO = {
        name: 'Patrick',
        CPF: '111.222.333-44',
        phone: '51992794875',
        address: 'Rua dos andradas',
        email: 'patrick@gmail.com',
    }

    const bookDTO = {
        name: 'SQL Guia Pratico',
        quantity: 10,
        author: 'Patrick',
        gender: 'Tech',
        ISBN: '12345678910'
    }

    it('Deve ser possivel emprestar um livro', async () => {
        const book = await typeormBookRepository.save(bookDTO)
        const user = await typeormUserRepository.save(userDTO)

        const {statusCode, body} = await request(app).post('/borrow').send({
            book_id: book.id,
            user_id: user.id,
            date_borrow: '2025-11-24', 
            date_return: '2025-11-25'
        })


        expect(statusCode).toBe(201)
        expect(body).toBeNull()
    })

    it('Deve retornar 200 e uma mensagem de multa não aplicada', async () => {
        const book = await typeormBookRepository.save(bookDTO)
        const user = await typeormUserRepository.save(userDTO)
        const borrow = await typeormBorrowRepository.save({
            book_id: book.id,
            user_id: user.id,
            date_borrow: '2025-11-24', 
            date_return: '2025-11-25'
        })

        const {statusCode, body} = await request(app).put(`/borrow/return/${borrow.id}`).send({
            date_return: '2025-11-25'
        })
        
        expect(statusCode).toBe(200)
        expect(body).toBe('Multa por atraso R$ 10')
    })

    it('Deve retornar um erro do zod', async () => {
        const {statusCode, body} = await request(app).put(`/borrow/return/3`).send({})

        expect(statusCode).toBe(400)
        expect(body.erros.fieldErrors).toEqual({
            date_return: 
                ['Data de retorno obrigatória'],
        })
    })
})