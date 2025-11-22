const { borrowRepository } = require("../../../infra/db/typeorm/repositories/Borrows.repository")
const getBorrowPedingUseCase = require("../../../application/borrow_books/get-borrows.usecase")
const getBorrowPeddingController = require("../../../interfaces-adapters/controllers/borrow-books/get-borrow-pedding.controller")


const borrowPeddingCompose = () => {
    const borrowBookRepositoryFn = borrowRepository()
    const getBorrowPedingUseCaseFn = getBorrowPedingUseCase({
        borrowRepository: borrowBookRepositoryFn
    })
    const controller =  getBorrowPeddingController({
        getBorrowPedingUseCase: getBorrowPedingUseCaseFn
    })

    return controller
}

module.exports = {
    borrowPeddingCompose
}