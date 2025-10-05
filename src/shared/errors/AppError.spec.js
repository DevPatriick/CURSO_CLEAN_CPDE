const AppError = require("./AppError")

describe('AppError', function(){
    test('AppError é uma instância de Error', function(){
        const appError = new AppError('erro')
        expect(appError).toBeInstanceOf(Error)
    })
})