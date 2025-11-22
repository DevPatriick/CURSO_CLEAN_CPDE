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
        // ao inves de excluir uma propriedade pode ser usado dentro do toEqual o expect.objectContaining(bookDTO)
        expect(body).toEqual(expected)
    })

    it('Deve retornar um array vazio por que nenhum user foi encontrado', async () => {
        const {statusCode, body} = await request(app).get('/books/ISBNOrName').query({value: '12345678910'})

        expect(statusCode).toBe(200)
        expect(body).toEqual([])
    })

    it('Deve retornar um erro se n for enviado os campos para cadastrar um livro', async () => {
        const {statusCode, body} = await request(app).post('/books').send({})

        expect(statusCode).toBe(400)
        expect(body.message).toBe('Erro na validação')
        expect(body.erros.fieldErrors).toEqual({
            name:
                ['Nome do livro é obrigatório'],
            quantity: 
                ['Quantidade do livro é obrigatório'],
            author:
                ['Autor é obrigatório'],
            gender:
                ['Genero do livro é obrigatório'],
            ISBN:
                ['ISBN do livro é obrigatório']
        })
    })

    it('Deve retornar um erro do zod se n passar valor', async () => {
        const {statusCode, body} = await request(app).get('/books/ISBNOrName')

        expect(statusCode).toBe(400)
        expect(body.message).toBe('Erro na validação')
        expect(body.erros.fieldErrors).toEqual({
            value:
                ['Nome ou ISBN obrigatório para buscar livro'],
        })
    })
})