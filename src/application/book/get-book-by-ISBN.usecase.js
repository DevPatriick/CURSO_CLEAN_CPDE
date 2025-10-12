const { AppError, Either } = require("../../shared/errors")

module.exports = function getBookByNameOrISBNUseCase({ bookRepository }){
    if (!bookRepository) throw new AppError(AppError.dependecy)
    return async function({value}) {
        if(!value) throw new AppError(AppError.invalidISBN)
        const dataBook = await bookRepository.getBookByNameOrISBN(value)
        if(!dataBook) return null
        return Either.Right(dataBook)
    }
}