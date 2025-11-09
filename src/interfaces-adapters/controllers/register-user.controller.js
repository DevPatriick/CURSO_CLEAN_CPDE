const { AppError } = require("../../shared/errors");
const httpResponse = require("../../shared/helpers/http.response")

const {z} = require('zod')
const zodValidator = z.object({
    name: z.string({
        required_error: 'Nome Completo é obrigatório'
    }),
    CPF: z.string({
        required_error: 'CPf é obrigatório'
    })
    .refine((value) => /^([0-9]{3}\.?[0-9]{3}\.[0-9]{3}\-?[0-9]{2})$/.test(value)),
    address: z.string({
        required_error: 'Endereço é obrigatório'
    }),
    phone: z.string({
        required_error: 'Telefone é obrigatório'
    }),
    email: z.string({
        required_error: 'Email: é obrigatório'
    }).email({
        message: 'Email deve ser válido'
    })
})

module.exports = registerUserController = async ({registerUserUseCase,httpRequest}) => {
    const checkDepency = !registerUserUseCase || !httpRequest || !httpRequest.body;
    if(checkDepency) throw new AppError(AppError.dependecy)
    const {name, CPF, address, phone, email} = zodValidator.parse(httpRequest.body)


    const output = await registerUserUseCase({
        name,
        CPF,
        address,
        phone,
        email
    })

    return output.fold(
        err => httpResponse(400, err.message),
        () => httpResponse(201, null)
    )
}