const { nodemailerService } = require("../../../infra/db/email/nodemailer")

module.exports = {
    key: 'sendMail',
    async handle({data}) {
        const { 
            date_borrow,
            date_return,
            book,
            user
        } = data

        await nodemailerService().sendEmail({
            date_borrow,
            date_return,
            name: user.name,
            CPF: user.CPF,
            email: user.email,
            book: book.name
        })
    }
}