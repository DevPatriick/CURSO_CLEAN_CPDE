
const { EntitySchema } = require('typeorm')

module.exports = new EntitySchema({
    name: 'User',
    tableName: 'User',
    columns: {
        id: {
            primary: true,
            type: 'int',
            generated: true
        },
        name: {
            type: 'varchar'
        },
        CPF: {
            type: 'varchar',
            unique: true
        },
        address: {
            type: 'varchar'
        },
        phone: {
            type: 'varchar'
        },
        email: {
            type: 'varchar',
            unique: true
        }
    }
})