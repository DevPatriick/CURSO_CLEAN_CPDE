// const registerBookUsecase = require("../../../application/book/register-book.usecase");
const httpResponse = require("../../../shared/helpers/http.response");
const { AppError } = require("../../../shared/errors/index");
const {z} = require('zod')

const zodValidator = z.object({
    name: z.string({
        required_error: 'Nome do livro é obrigatório'
    }),
    quantity: z.number({
        required_error: 'Quantidade do livro é obrigatório'
    }),
    author: z.string({
        required_error: 'Autor é obrigatório'
    }),
    gender: z.string({
        required_error: 'Genero do livro é obrigatório'
    }),
    ISBN: z.string({
        required_error: 'ISBN do livro é obrigatório'
    })
})

module.exports = registerBookController = async ({ registerBookUseCase, httpRequest}) => {
    const checkDepency = !registerBookUseCase || !httpRequest || !httpRequest.body
    if (checkDepency) throw new AppError(AppError.dependecy)

    const { name, quantity, author, gender, ISBN } = zodValidator.parse(httpRequest.body)

    const output = await registerBookUseCase({ name, quantity, author, gender, ISBN })

    return output.fold(
        err => httpResponse(400, err.message),
        () => httpResponse(201, null)
    )
}