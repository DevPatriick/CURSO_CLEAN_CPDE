const returnBookUsecase = require('../../../application/borrow_books/return-book.usecase')
const { borrowRepository } = require('../../../infra/db/typeorm/repositories/Borrows.repository')
const returnBookController = require('../../../interfaces-adapters/controllers/borrow-books/return-book.controller')


const borrowBookReturnCompose = async (httpRequest) => {
    const borrowBookRepositoryFn = borrowRepository()
    const borrowBookReturnUseCaseFn = returnBookUsecase({
        returnBookRepository: borrowBookRepositoryFn,
    })
    const controller = returnBookController({
        returnBookUseCase: borrowBookReturnUseCaseFn,
        httpRequest
    })

    return controller
}

module.exports = {
    borrowBookReturnCompose
}