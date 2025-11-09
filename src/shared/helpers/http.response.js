

module.exports = httpResponse = (statusCode, body) => {
    return {
        statusCode,
        body
    }
}