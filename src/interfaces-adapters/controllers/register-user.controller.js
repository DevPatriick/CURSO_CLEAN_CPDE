const { AppError } = require("../../shared/errors");
const httpResponse = require("../../shared/helpers/http.response")

module.exports = registerUserController = async ({registerUserUseCase,httpRequest}) => {
    const checkDepency = !registerUserUseCase || !httpRequest || !httpRequest.body;
    if(checkDepency) throw new AppError(AppError.dependecy)
    const {name, CPF, address, phone, email} = httpRequest.body


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