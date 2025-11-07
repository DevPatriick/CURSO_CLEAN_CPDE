const { Like, IsNull } = require('typeorm')
const { typeormServer } = require('../setup')
// const { id } = require('../../../../../jest.config')

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

    const getPeddingBookWithUser = async () => {
        const borrowPedding = await typeormBorrowRepository.find({
            where: {
                date_devolution: IsNull()
            },
            relations: ['user', 'book'],
            select: {
                id: true,
                date_return: true,
                date_borrow: true,
                user: {
                    name: true,
                    CPF: true
                },
                book: {
                    name: true
                }
            }
        })

        return borrowPedding
    }

    const userBorrowISBNExist = async ({user_id, book_id}) => {
        const borrowBook = await typeormBorrowRepository.count({
            where: {
                date_devolution: IsNull(),
                book_id,
                user_id
            }
        })

        return borrowBook === 0 ? false : true
    }

    const getBorrowById = async ({borrow_id}) => {
        const borrow = await typeormBorrowRepository.findOne({
            where: { 
                id: borrow_id
            },
            relations: ['user', 'book'],
            select: {
            id: true,
            date_borrow: true,
            date_return: true,
            user: {
                name: true,
                CPF: true,
                address: true,
                phone: true,
                email: true
            },
            book: {
                name: true,
                quantity: true,
                author: true,
                gender: true,
                ISBN: true,
            }
            }
        })

        return borrow
    }


    return {
        borrow,
        return: returno,
        getPeddingBookWithUser,
        userBorrowISBNExist,
        getBorrowById
    }
}


module.exports = { borrowRepository, typeormBorrowRepository }