
const { EntitySchema, JoinColumn } = require('typeorm')

module.exports = new EntitySchema({
    name: 'Borrow',
    tableName: 'Borrow',
    columns: {
        id: {
            primary: true,
            type: 'int',
            generated: true
        },
        user_id: {
            type: 'int'
        },
        book_id: {
            type: 'int',
        },
        date_return: {
            type: 'date'
        },
        date_borrow: {
            type: 'date'
        },
        date_exit: {
            type: 'date',
        }
    },
    relations: {
        // um usuario pode ser muito emprestimos, many to one, muitos para um
        user: {
            target: 'User',
            type: 'many-to-one',
            // referencia da tabela borrow
            joinColumn: {
                name: 'user_id',
                referencedColumnName: 'id'
            }
        },
        // um livro pode ter varios emprestimos
        book: {
            target: 'Book',
            type: 'many-to-one',
            joinColumn: {
                name: 'book_id',
                referencedColumnName: 'id'
            }
        }
    }
})