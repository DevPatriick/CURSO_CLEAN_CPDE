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

    const returno = async ({borrow_id, date_return}) => {
        await typeormBorrowRepository.update(borrow_id, {
            date_return
        })

        const record  = await typeormBorrowRepository.findOneBy({
            id: borrow_id
        })

        return {date_return: record.date_return}
    }


    return {
        borrow,
        return: returno 
    }
}


module.exports = { borrowRepository, typeormBorrowRepository }