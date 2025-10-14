const { AppError } = require('../../shared/errors')
const loan = require('./loan.entity')

describe('Deve realizar o calculo da multa', () => {

    test('calcular multa sem atraso', () => {
        const result = loan.verifyFine('2025-10-14','2025-10-14')

        expect(result).toBe(0)
    })

    test('calcular multa com atraso', () => {
        const result = loan.verifyFine('2025-10-14','2025-10-16')

        expect(result).toBe(20)
    })

    test('Parametro invalidos', () => {
        expect(()=> loan.verifyFine()).toThrow(AppError.dependecy)
    })
})