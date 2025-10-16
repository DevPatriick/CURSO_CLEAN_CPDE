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
    return { register }
}

module.exports = { userRepository, typeormUserRepository}