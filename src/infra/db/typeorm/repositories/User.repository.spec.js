const { userRepository, typeormUserRepository } = require('./User.repository')

describe('Usuario Repository', () => {
    let sut;

    // limpa o que foi feito antes de cada teste para n usar users de outro teste
    beforeEach(async () => {
        await typeormUserRepository.clear()
        // pode ser usado o .delete({parametro}) com o que eu quero deletar
    })

    // antes de qualquer teste inclui o sut
    beforeAll(()=> {
        sut = userRepository()
    })

    // objeto DTO
    const userDTO = {
        name: 'Patrick',
        CPF: '12345678912',
        phone: '51992794875',
        email: 'andrade.patrickreis@gmail.com',
        address: 'Rua qualquer'
    }

    test('Deve retornar void ao criar um usuario', async () => {
        const userCreate = await sut.register(userDTO)

        expect(userCreate).toBeUndefined()
    })

    test('Deve retornar um user buscando por CPF', async ()=> {
        await typeormUserRepository.save(userDTO)
        const getByCPF = await sut.getUserByCPF('12345678912')

        expect(getByCPF.id).toBeDefined()
        expect(getByCPF.name).toBe('Patrick')
    })

    test('deve retornar null se n tiver o usuario', async ()=> {
        const getByCPF = await sut.getUserByCPF('123')

        expect(getByCPF).toBeNull
    })

    test('Existe por CPF, retorna true', async () => {
        await typeormUserRepository.save(userDTO)

        const existByCPF = await sut.existByCPF('12345678912')

        expect(existByCPF).toBe(true)
    })
})