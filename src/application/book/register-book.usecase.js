const { AppError, Either } = require("../../shared/errors")

module.exports = function registerBookUseCase({ bookRepository }){
    if(!bookRepository) throw new AppError(AppError.dependecy)
    return async function ({name, quantity, author, gender, ISBN}) {
        const params = name && quantity && author && gender && ISBN
        if(!params) throw new AppError(AppError.invalidparams)

        const ISBNExiste = await bookRepository.getISBN(ISBN)
        if(ISBNExiste) return Either.Left(Either.ISNBExist('ISBN'))

        await bookRepository.register({
            name,
            quantity,
            author,
            gender,
            ISBN,
        });
        return Either.Right(null)
    }
}