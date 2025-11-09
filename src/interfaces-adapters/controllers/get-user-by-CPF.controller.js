const httpResponse = require("../../shared/helpers/http.response")
const {z} = require('zod')

const zodValidator = z.object({
    CPF: z.string({
        required_error: 'CPf é obrigatório'
    })
    .refine((value) => /^([0-9]{3}\.?[0-9]{3}\.[0-9]{3}\-?[0-9]{2})$/.test(value)),
})

module.exports = registerUserController = async ({
    getUserByCPFUseCase,
    httpRequest
}) => {
    const {CPF} = httpRequest.body
    const output = await zodValidator.parse(getUserByCPFUseCase({ CPF }))

    return output.fold(
        err => httpResponse(400, err.message),
        (user) => httpResponse(201, user)
    )
}