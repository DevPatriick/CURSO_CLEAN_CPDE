const { AppError, Either } = require("../../shared/errors")

module.exports = function returnBookUseCase({ returnBookRepository }) {
    if (!returnBookRepository) throw new AppError(AppError.dependecy)
    return async function({borrow_id, date_return}){
        const date_expect_return = await returnBookRepository.return({
            borrow_id,
            date_return
        })

        const verifyFine = (date_expect_return, date_return) => {
            const fineByDay = 10;
            const differenceDays = (date_return.getTime() - date_expect_return.getTime()) / (1000 * 60 * 60 * 24)

            if (differenceDays <= 0) return 0

            return (differenceDays * fineByDay)
        }

        return Either.fine(`${verifyFine(date_expect_return.date_return, date_return)}`)
    }
}