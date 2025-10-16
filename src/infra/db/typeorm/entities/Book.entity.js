
const { EntitySchema } = require('typeorm')

module.exports = new EntitySchema({
    name: 'Book',
    tableName: 'Book',
    columns: {
        id: {
            primary: true,
            type: 'int',
            generated: true
        },
        quantity: {
            type: 'int'
        },
        author: {
            type: 'varchar',
            unique: true
        },
        gender: {
            type: 'char'
        },
        ISBN: {
            type: 'int',
            unique: true
        },
    }
})