

module.exports = registerUserController = async ({registerUserUseCase,httpRequest}) => {
    const {name, CPF, address, phone, email} = httpRequest.body

    const output = await registerUserUseCase({
        name,
        CPF,
        address,
        phone,
        email
    })

    return output.fold(
        err => httpRequest(400, err.message),
        () => httpRequest(201, null)
    )
}