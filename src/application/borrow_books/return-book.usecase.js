const loanEntity = require("../../domain/entities/loan.entity")
const { AppError, Either } = require("../../shared/errors")

module.exports = function returnBookUseCase({ returnBookRepository }) {
    if (!returnBookRepository) throw new AppError(AppError.dependecy)
    return async function({borrow_id, date_return}){
        const validParams = borrow_id && date_return
        if (!validParams) throw new AppError(AppError.invalidparams)
        const date_expect_return = await returnBookRepository.return({
            borrow_id,
            date_return
        })

        const fine = loanEntity.verifyFine(date_expect_return.date_return, date_return)

        return Either.fine(`${fine}`)
    }
}