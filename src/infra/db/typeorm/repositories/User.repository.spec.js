const { userRepository } = require('./User.repository')

describe('Usuario Repository', () => {


    test('Deve retornar void ao criar um usuario', async () => {
        const sut = userRepository()
        const userCreate = await sut.register({
            name: 'Patrick',
            CPF: '12345678912',
            phone: '51992794875',
            email: 'andrade.patrickreis@gmail.com',
            address: 'Rua qualquer'
        })

        expect(userCreate).toBeUndefined()
    })
})