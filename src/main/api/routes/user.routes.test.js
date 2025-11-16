const request  = require("supertest")
const { app } = require("../app")
const { typeormUserRepository } = require("../../../infra/db/typeorm/repositories/User.repository")


describe('Usuarios routes', ()=> {

    // beforeEach(async function () {
    //     await typeormUserRepository.query('DELETE FROM user')
    // })
    it('Deve ser possivel cadastrar um usuario', async () => {
        const {statusCode, body} = await request(app).post('/users').send({
            name: 'Patrick',
            CPF: '111.222.333-44',
            phone: '51992794875',
            address: 'Rua dos andradas',
            email: 'patrick@gmail.com',
        })

        expect(statusCode).toBe(201)
        expect(body).toBeNull()
    })
})