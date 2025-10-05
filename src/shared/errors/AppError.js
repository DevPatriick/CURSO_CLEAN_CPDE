
module.exports = class AppError extends Error {
    constructor(message){
        super(message)
        this.message = message
    }

    static dependecy = 'Alguma dependência não foi fornecida'
}