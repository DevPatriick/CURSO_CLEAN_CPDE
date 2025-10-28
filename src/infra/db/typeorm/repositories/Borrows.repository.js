const { Like } = require('typeorm')
const { typeormServer } = require('../setup')

const typeormBorrowRepository = typeormServer.getRepository('Borrow')

const borrowRepository = () => {
    const borrow = async ({user_id, book_id, date_borrow, date_return}) => {
        await typeormBorrowRepository.save({
            user_id,
            book_id,
            date_borrow,
            date_return,
        })
    }


    return {
        borrow
    }
}


module.exports = { borrowRepository, typeormBorrowRepository }