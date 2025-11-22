const borrowBookUseCase = require('../../../application/borrow_books/borrow-books.usecase')
const {nodemailerService} = require('../../../infra/db/email/nodemailer/index')
const { borrowRepository } = require('../../../infra/db/typeorm/repositories/Borrows.repository')
const borrowBooksController = require('../../../interfaces-adapters/controllers/borrow-books/borrow-books.controller')


const borrowBookCompose = async (httpRequest) => {
    const borrowBookRepositoryFn = borrowRepository()
    const emailServiceFn = nodemailerService()
    const borrowBookUseCaseFn = borrowBookUseCase({
        borrowBooksRepository: borrowBookRepositoryFn,
        emailService: emailServiceFn
    })
    const controller = borrowBooksController({
        borrowBooksUseCase: borrowBookUseCaseFn,
        httpRequest
    })

    return controller
}

module.exports = {
    borrowBookCompose
}