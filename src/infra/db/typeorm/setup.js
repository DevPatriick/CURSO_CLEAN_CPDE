
const typeorm = require('typeorm')
const user = require('./entities/User.entity')
const book = require('./entities/Book.entity')
const borrow = require('./entities/Borrow.entity')

const typeormServer = new typeorm.DataSource({
    type: 'sqlite',
    database: 'db.sqlite',
    synchronize: true,
    dropSchema: true,
    entities: [user, book, borrow]
})

module.exports = {
    typeormServer
}