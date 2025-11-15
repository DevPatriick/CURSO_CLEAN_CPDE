const { AppError } = require("../../../shared/errors")
const httpResponse = require("../../../shared/helpers/http.response")
const {z} = require('zod')

const zodValidator = z.object({
    value: z.string({
        required_error: 'Nome ou ISBN obrigatório para buscar livro'
    }),
})

module.exports = getBookByNameOrISBNController = async ({getBookByNameOrISBNUseCase, httpRequest}) => {
    const checkDepency = !getBookByNameOrISBNUseCase || !httpRequest || !httpRequest.query
    if (checkDepency) throw new AppError(AppError.dependecy)
    const { value } = zodValidator.parse(httpRequest.query)
    const output = await getBookByNameOrISBNUseCase({value})

    return output.fold(
        err => httpResponse(400, err.message),
        book => httpResponse(200, book)
    )
}