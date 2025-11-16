
const typeorm = require('typeorm')
let typeormServer;
const user = require('./entities/User.entity')
const book = require('./entities/Book.entity')
const borrow = require('./entities/Borrow.entity');
const { preprocess } = require('zod');

if (process.env.NODE_ENV === 'test') {
    typeormServer = new typeorm.DataSource({
        type: 'sqlite',
        database: 'db.sqlite',
        synchronize: true,
        dropSchema: true,
        entities: [user, book, borrow]
    })
} else if (process.env.NODE_ENV === 'integration'){
    typeormServer = new typeorm.DataSource({
        type: 'postgres',
        host: 'localhost',
        database: 'library_test',
        synchronize: true,
        port: 5432,
        username: 'postgres',
        password: 'postgres',
        entities: [user, book, borrow]
    })
}


module.exports = {
    typeormServer
}