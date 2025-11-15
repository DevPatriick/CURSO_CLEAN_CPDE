const { z } = require("zod")
const { AppError } = require("../../../shared/errors")
const httpResponse = require("../../../shared/helpers/http.response")


const zodValidator = z.object({
    user_id: z.number({
        required_error: 'Id do usuario obrigatório'
    }),
    book_id: z.number({
        required_error: 'Id do livro obrigatório'
    }),
    date_borrow: z.string({
        required_error: 'Data de retorno obrigatória'
    }),
    date_return: z.string({
        required_error: 'Data de retorno obrigatória'
    }),
})


module.exports = borrowBooksController = async ({borrowBooksUseCase, httpRequest}) => {
    const checkDepency = !borrowBooksUseCase || !httpRequest || !httpRequest.body   
    if (checkDepency) throw new AppError(AppError.dependecy)
    const { user_id, book_id, date_borrow, date_return } = zodValidator.parse(httpRequest.body)
    const output = await borrowBooksUseCase({
        user_id, 
        book_id, 
        date_borrow: new Date(date_borrow), 
        date_return: new Date(date_return)
    })

    return output.fold(
        err => httpResponse(400, err.message),
        () => httpResponse(201, null)
    )
}