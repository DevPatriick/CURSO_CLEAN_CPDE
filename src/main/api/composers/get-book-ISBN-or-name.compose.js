const getBookByNameOrISBNUseCase = require("../../../application/book/get-book-by-ISBN.usecase")
const { bookRepository } = require("../../../infra/db/typeorm/repositories/Book.repository")
const getBookByNameOrISBNController = require("../../../interfaces-adapters/controllers/book/get-book-by-name-or-ISBN.controller")



const getBookISBNOrNameCompose = async (httpRequest) => {
    const getBookISBNOrNameUseCaseFn = getBookByNameOrISBNUseCase({bookRepository: bookRepository()})
    const controller = await getBookByNameOrISBNController({
        getBookByNameOrISBNUseCase: getBookISBNOrNameUseCaseFn,
        httpRequest
    })

    return controller
}

module.exports = {
    getBookISBNOrNameCompose
}