require('express-async-errors')
const request  = require("supertest")
const { app } = require("../app")
const { typeormUserRepository } = require("../../../infra/db/typeorm/repositories/User.repository")


describe('Usuarios routes', () => {

    beforeEach(async function () {
        await typeormUserRepository.query('DELETE FROM "User"')
    })

    const userDTO = {
            name: 'Patrick',
            CPF: '111.222.333-44',
            phone: '51992794875',
            address: 'Rua dos andradas',
            email: 'patrick@gmail.com',
    }

    // TESTES PARA CADASTRAR USUARIO
    it('Deve ser possivel cadastrar um usuario', async () => {
        await typeormUserRepository.query('DELETE FROM "User"')
        const {statusCode, body} = await request(app).post('/users').send(userDTO)

        expect(statusCode).toBe(201)
        expect(body).toBeNull()
    })

    it('Deve retornar um erro se n for enviado alguns campos obrigatórios', async () => {
        const {statusCode, body} = await request(app).post('/users').send({})

        expect(statusCode).toBe(400)
        expect(body.message).toBe('Erro na validação')
        expect(body.erros.fieldErrors).toEqual({
            name: ['Nome Completo é obrigatório'],
            CPF: ['CPf é obrigatório'],
            phone: ['Telefone é obrigatório'],
            address: ['Endereço é obrigatório'],
            email: ['Email: é obrigatório'],
        })
    })

    // BUSCAR USUARIO POR CPF
    it('Deve buscar um usuario por CPF', async () => {

        await typeormUserRepository.save(userDTO)
        const {statusCode, body} = await request(app).get(`/users/cpf/${userDTO.CPF}`).send()

        expect(statusCode).toBe(200)
        expect(body.id).toBeDefined()
        // verifica se o objeto veio, contem!
        expect(body).toEqual(expect.objectContaining(userDTO))
    })

    it('Deve retornar um array vazio por que não encontrou nenhum usuario com o CPF informado', async () => {
        const {statusCode, body} = await request(app).get(`/users/cpf/${userDTO.CPF}`).send()

        expect(statusCode).toBe(200)
        expect(body).toBeNull()
        // verifica se o objeto veio, contem!
        // expect(body).toEqual(expect.objectContaining(userDTO))
    })

    it('Deve verificar se o CPF foi passada certo', async () => {
        const {statusCode, body} = await request(app).get(`/users/cpf/1`).send()

        expect(statusCode).toBe(400)
        expect(body.erros.fieldErrors).toEqual({
            CPF: ['Invalid input']
        })
    })
})