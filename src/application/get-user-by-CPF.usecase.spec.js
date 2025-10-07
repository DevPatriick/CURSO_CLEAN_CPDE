const getUserByCPFUseCase = require('./get-user-by-CPF.usecase')


describe('Buscar usuário por CPF', ()=> {

    const userRepository = {
        getUserByCPF: jest.fn(),
    }

    test('Deve retornar um usuário caso o CPF esteja cadastrado', async () => {
        const CPFDTO = {
            CPF: 11122233344
        }
        
        const outputDTO = {
            id: 1,
            name: 'Patrick Reis Andrade',
            CPF: 11122233344,
            phone: 51992794875,
            email: 'andrade.patrickreis@gmail.com'
        }
        
        userRepository.getUserByCPF.mockResolvedValue(outputDTO)

        const sut = getUserByCPFUseCase({ userRepository })
        const output = await sut(CPFDTO)

        expect(output.right).toEqual(outputDTO)
        expect(userRepository.getUserByCPF).toHaveBeenCalledWith(CPFDTO.CPF)
        expect(userRepository.getUserByCPF).toHaveBeenCalledTimes(1)
    })
})