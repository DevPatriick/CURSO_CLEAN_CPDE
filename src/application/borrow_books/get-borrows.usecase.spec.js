const getBorrowPedingUseCase = require('./get-borrows.usecase')
const { AppError } = require('../../shared/errors/index')

describe('Buscar emprestimso', () => {

    const borrowRepository = {
        getBorrowPedding: jest.fn()
    }

    test('Deve buscar todos os emprestimos pendentes', async () => {
        borrowRepository.getBorrowPedding.mockResolvedValue([
            {
                user: {
                    name: 'Qualquer nome',
                    CPF: 11122233344
                },
                book: {
                    name: 'qualquer_nome'
                }
            },
            {
                user: {
                    name: 'Qualquer nome2',
                    CPF: 11122233344
                },
                book: {
                    name: 'qualquer_nome2'
                }
            }
        ])
        const sut = getBorrowPedingUseCase({ borrowRepository })
        const output = await sut()

        expect(output.right).toHaveLength(2)
        expect(output.right[0].user.name).toBe('Qualquer nome')
    })

    test('Deve retornar um throw AppError se o borrowRepository não for fornecido', () => {
        expect(()=> getBorrowPedingUseCase({})).toThrow(new AppError(AppError.dependecy))
    })
})