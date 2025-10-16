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
    return { register, getUserByCPF }
}

module.exports = { userRepository, typeormUserRepository}