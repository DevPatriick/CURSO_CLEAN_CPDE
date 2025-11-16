const { AppError } = require("../../../shared/errors")
const httpResponse = require("../../../shared/helpers/http.response")


module.exports = getBorrowPeddingController = async ({getBorrowPedingUseCase}) => {
    const checkDepency = !getBorrowPedingUseCase
    if (checkDepency) throw new AppError(AppError.dependecy)

    const output = await getBorrowPedingUseCase()

    return output.fold(
        err => httpResponse(400, err.message),
        borrowPedding => httpResponse(200, borrowPedding)
    )
}