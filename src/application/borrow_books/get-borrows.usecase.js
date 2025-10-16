const { Either, AppError } = require("../../shared/errors")

module.exports = function getBorrowPedingUseCase({ borrowRepository }) {
    if(!borrowRepository) throw new AppError(AppError.dependecy)
    return async function () {
        const borrowPedding = await borrowRepository.getBorrowPedding()
        return Either.Right(borrowPedding)
    }
}