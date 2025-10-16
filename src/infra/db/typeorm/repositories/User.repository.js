const { typeormServer } = require('../setup')

const typeormUserRepository = typeormServer.getRepository('User')


const userRepository = () => {
    const register = async ({name, CPF, phone, address, email}) => {
        await typeormUserRepository.save({
            name,
            CPF,
            phone,
            address,
            email
        })
    }

    const getUserByCPF = async (CPF) => {
        return await typeormUserRepository.findOne({
            where: {
                CPF
            }
        })
    }

    const existByCPF = async (CPF) => {
        const user = await typeormUserRepository.count({
            where: {
                CPF
            }
        })

        return user === 0 ? false : true
    }

    const existByEmail = async (email) => {
        const user = await typeormUserRepository.count({
            where: {
                email
            }
        })

        return user === 0 ? false : true
    }

    return { register, getUserByCPF, existByCPF, existByEmail }
}

module.exports = { userRepository, typeormUserRepository} 