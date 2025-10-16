const { Like } = require('typeorm')
const { typeormServer } = require('../setup')

const typeormBookRepository = typeormServer.getRepository('Book')

const bookRepository = () => {
    const register = async ({name, quantity, author, gender, ISBN}) => {
        await typeormBookRepository.save({
            name,
            quantity,
            author,
            gender,
            ISBN
        })
    }

    // const getBookByISBN = async (ISBN) => {
    //     return await typeormBookRepository.findOne({
    //         where: {
    //             ISBN
    //         }
    //     })
    // }

    // const getBookByName = async (name) => {
    //     return await typeormBookRepository.findOne({
    //         where: {
    //             name
    //         }
    //     })
    // }

    const getBookByNameOrISBN = async (value) => {
        const book = await typeormBookRepository.find({
            where: [
                {
                    name: Like(`%${value}%`),
                },
                {
                    ISBN: value
                }
            ]
        })

        return book
    }

    const existBookByISBN = async (ISBN) => {
        const book = await typeormBookRepository.count({
            where: {
                ISBN
            }
        })

        return book === 0 ? false : true
    }

    return {
        register,
        existBookByISBN,
        // getBookByISBN,
        // getBookByName,
        getBookByNameOrISBN
    }
}

module.exports = { bookRepository, typeormBookRepository }