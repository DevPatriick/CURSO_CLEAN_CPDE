const { AppError, Either } = require("../../shared/errors")

module.exports = function borrowBooks({ borrowBooksRepository }) {
    if(!borrowBooksRepository) throw new AppError(AppError.dependecy)
    return async function ({ user_id, book_id, date_borrow, date_return}){
        const checkValues = user_id && book_id && date_borrow && date_return
        if(!checkValues) throw new AppError(AppError.invalidparams)
        if(date_borrow.getTime() > date_return.getTime()) return Either.Left(Either.dateReturnInvalid)
        const userBorrowISBNExist = await borrowBooksRepository.userBorrowISBNExist({
            user_id,
            book_id
        })
        if(userBorrowISBNExist) return Either.userWithISBNBorrow

        await borrowBooksRepository.borrow({
            user_id,
            book_id,
            date_borrow,
            date_return
        })

        return Either.Right(null)
    }
}
