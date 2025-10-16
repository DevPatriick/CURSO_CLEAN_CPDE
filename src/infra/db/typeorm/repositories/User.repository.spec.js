const { userRepository, typeormUserRepository } = require('./User.repository')

describe('Usuario Repository', () => {

    beforeEach(async () => {
        await typeormUserRepository.clear()
        // pode ser usado o .delete({parametro}) com o que eu quero deletar
    })


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

    test('Deve retornar um user buscando por CPF', async ()=> {
        await typeormUserRepository.save({
            name: 'Patrick',
            CPF: '12345678912',
            phone: '51992794875',
            email: 'andrade.patrickreis@gmail.com',
            address: 'Rua qualquer'
        })
        const sut = userRepository()
        const getByCPF = await sut.getUserByCPF('12345678912')

        expect(getByCPF.id).toBeDefined()
        expect(getByCPF.name).toBe('Patrick')
    })
})