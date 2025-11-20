const request  = require("supertest")
const { typeormBookRepository } = require("../../../infra/db/typeorm/repositories/Book.repository")
const { app } = require("../app")


describe('Livros routes', () => {

    beforeEach(async () => {
        await typeormBookRepository.query('DELETE FROM "Book"')
    })

    const bookDTO = {
            name: 'SQL Guia Pratico',
            quantity: 10,
            author: 'Patrick',
            gender: 'Tech',
            ISBN: '12345678910'
    }

    it('Deve cadastrar um livro no banco de dados', async () => {
        const {statusCode, body} = await request(app).post('/books').send(bookDTO)

        expect(statusCode).toBe(201)
        expect(body).toBeNull
    })

    it('Deve retornar um livro se eu buscar por ISBN ou Nome do livro', async () => {
        await request(app).post('/books').send(bookDTO)
        const {statusCode, body} = await request(app).get('/books/ISBNOrName').query({value: 'SQL Guia Pratico'})

        const expected = [{ ...bookDTO }]
        delete body[0].id

        expect(statusCode).toBe(200)
        expect(body).toEqual(expected)
    })

    it('Deve retornar um livro buscando pela nome', async () => {
        await request(app).post('/books').send(bookDTO)
        const {statusCode, body} = await request(app).get('/books/ISBNOrName').query({value: '12345678910'})

        const expected = [{ ...bookDTO }]
        delete body[0].id

        expect(statusCode).toBe(200)
        expect(body).toEqual(expected)
    })

    it('Deve retornar um array vazio por que nenhum user foi encontrado', async () => {
        const {statusCode, body} = await request(app).get('/books/ISBNOrName').query({value: '12345678910'})

        expect(statusCode).toBe(200)
        expect(body).toEqual([])
    })

    // it('Deve retornar um erro se n for enviado o nome ou o ISBN', async () => {
    //     const {statusCode, body} = await request(app).get('/books/ISBNOrName').query({ value: ''})

    //     expect(statusCode).toBe(400)
    //     expect(body.message).toBe('Erro na validação')
    //     expect(body.erros.fieldErrors).toEqual({
    //         value: ['Nome ou ISBN obrigatório para buscar livro'],
    //     })
    // })
})