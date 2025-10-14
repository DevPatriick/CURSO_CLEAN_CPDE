

const loan = () => {
    const verifyFine = (date_expect_return, date_return) => {
        const fineByDay = 10;
        const differenceDays = (date_return.getTime() - date_expect_return.getTime()) / (1000 * 60 * 60 * 24)
    
        if (differenceDays <= 0) return 0
    
        return (differenceDays * fineByDay)
    }

    return { verifyFine }
}

module.exports = loan()