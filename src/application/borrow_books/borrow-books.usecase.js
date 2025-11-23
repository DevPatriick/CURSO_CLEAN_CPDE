const { AppError, Either } = require("../../shared/errors")

module.exports = function borrowBooksUseCase({ borrowBooksRepository, emailService }) {
    if(!borrowBooksRepository || !emailService) throw new AppError(AppError.dependecy)
    return async function ({ user_id, book_id, date_borrow, date_return}){
        const checkValues = user_id && book_id && date_borrow && date_return
        if(!checkValues) throw new AppError(AppError.invalidparams)
        if(date_borrow.getTime() > date_return.getTime()) return Either.Left(new AppError("Data de retorno inválida"))
        const userBorrowISBNExist = await borrowBooksRepository.userBorrowISBNExist({ 
            user_id,
            book_id
        })
        if(userBorrowISBNExist) return Either.Left(new AppError("Usuário já possui este livro emprestado"))

        const id = await borrowBooksRepository.borrow({
            user_id,
            book_id,
            date_borrow,
            date_return
        })

        const {user, book} = await borrowBooksRepository.getBorrowById({id})


        await emailService.sendEmail({
            date_borrow,
            date_return,
            name: user.name,
            CPF: user.CPF,
            email: user.email,
            book: book.name
        })

        return Either.Right(null)
    }
}
