const request  = require("supertest")
const { app } = require("../app")


describe('Emprestar livro routes', () => {
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
        await request(app).post('/books').send(bookDTO)
        await request(app).post('/users').send(userDTO)

        const {statusCode, body} = await request(app).post('/borrow').send(borrowDTO)


        expect(statusCode).toBe(200)
        expect(body).toBeNull()
    })
})