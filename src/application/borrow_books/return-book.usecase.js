const { AppError, Either } = require("../../shared/errors")

module.exports = function returnBookUseCase({ returnBookRepository }) {
    if (!returnBookRepository) throw new AppError(AppError.dependecy)
    return async function({borrow_id, date_return}){
        await returnBookRepository.return({
            borrow_id,
            date_return
        })

        const verifyFine = (date_return) => {
            return 0
        }

        return Either.fine(`${verifyFine(date_return)}`)
    }
}