
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
        name: {
            type: 'varchar'
        },
        quantity: {
            type: 'int'
        },
        author: {
            type: 'varchar',
            unique: true
        },
        gender: {
            type: 'varchar'
        },
        ISBN: {
            type: 'varchar',
            unique: true
        },
    }
})