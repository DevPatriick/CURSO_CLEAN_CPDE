const getUserByCPFUseCase = require('./get-user-by-CPF.usecase')
const { Either, AppError } = require("../shared/errors");


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

    test('Teste caso não seja encontrado nenhum CPF', async () => {
        userRepository.getUserByCPF.mockResolvedValue(null)
        const CPFDTO = {
            CPF: 11122233344
        }

        const sut = getUserByCPFUseCase({ userRepository })
        const output = await sut(CPFDTO)

        expect(output).toBeNull()
        expect(userRepository.getUserByCPF).toHaveBeenCalledWith(CPFDTO.CPF)
        expect(userRepository.getUserByCPF).toHaveBeenCalledTimes(1)
    })

    test('Deve retornar um throw AppError se o userRepository não for fornecido', function (){
        expect(()=> {
            getUserByCPFUseCase({})
        }).toThrow(new AppError(AppError.dependecy))
    })

    test('Deve retornar um throw caso o CPF não seja passado', async () => {
        const sut = getUserByCPFUseCase({ userRepository })

        // await expect(()=> sut({})).rejects.toThrow(new AppError(AppError.invalidCPF))
        await expect(() => sut({})).rejects.toThrow(new AppError(AppError.invalidCPF))
        // expect(userRepository.getUserByCPF).toHaveBeenCalledWith({})
        // expect(userRepository.getUserByCPF).toHaveBeenCalledTimes(1)
    })
})