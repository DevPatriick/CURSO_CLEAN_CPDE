const { AppError } = require("../../../shared/errors")
const httpResponse = require("../../../shared/helpers/http.response")
const { z } = require('zod')

const zodValidatorParams = z.object({
    id: z.string({
        required_error: 'Id do livro obrigatório'
    })
})

const zodValidatorBody = z.object({
    date_return: z.string({
        required_error: 'Data de retorno obrigatória'
    }),
})

module.exports = returnBookController = async ({returnBookUseCase, httpRequest}) => {
    const checkDepency = !returnBookUseCase || !httpRequest || !httpRequest.body
    if (checkDepency) throw new AppError(AppError.dependecy)

    const { date_return } = zodValidatorBody.parse(httpRequest.body)
    const { id } = zodValidatorParams.parse(httpRequest.params)

    // const borrow_id = Number(id)
    const output = await returnBookUseCase({
        id,
        date_return : new Date(date_return)
    })

    return output.fold(
        err => httpResponse(400, err.message),
        loan => httpResponse(200, loan)
    )
}