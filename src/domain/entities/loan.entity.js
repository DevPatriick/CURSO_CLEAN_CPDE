const { AppError } = require("../../shared/errors");


const loan = () => {
    const verifyFine = (date_expect_return, date_return) => {
        if (!date_expect_return || !date_return ) throw new AppError(AppError.dependecy)
        const fineByDay = 10;
        const differenceDays = (new Date(date_return).getTime() - new Date(date_expect_return).getTime()) / (1000 * 60 * 60 * 24)
    
        if (differenceDays <= 0) return 0
    
        return (differenceDays * fineByDay)
    }

    return { verifyFine }
}

module.exports = loan()