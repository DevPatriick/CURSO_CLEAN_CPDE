const registerBookUsecase = require("../../../application/book/register-book.usecase")
const { bookRepository } = require("../../../infra/db/typeorm/repositories/Book.repository")
const registerBookController = require("../../../interfaces-adapters/controllers/book/register-book.controller")

const registerBookCompose = async (httpRequest) => {
    const registerBookRepositoryCompose = bookRepository()
    const registerBookUseCaseCompose = registerBookUsecase({bookRepository: registerBookRepositoryCompose})
    const controller = registerBookController({registerBookUseCase: registerBookUseCaseCompose, httpRequest})

    return controller
}

module.exports = {
    registerBookCompose
}