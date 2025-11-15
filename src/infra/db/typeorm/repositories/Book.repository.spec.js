const { bookRepository, typeormBookRepository } = require('./Book.repository')

describe('Livros Repository', () => {

    let sut;

    beforeEach(async () => {
        await typeormBookRepository.clear()
    })

    beforeAll(() => {
        sut = bookRepository()
    })

    const bookDTO = {
        name: 'Quem mexeu no meu queijo',
        quantity: 2,
        author: 'Patrick',
        gender: 'Auto ajuda',
        ISBN: '123456789'
    }

    test('Deve retornar void ao criar um livro', async () => {
        const bookCreate = await sut.register(bookDTO)

        expect(bookCreate).toBeUndefined()
    })

    // test('Deve retornar um livro a partir do ISBN', async () =>{
    //     await typeormBookRepository.save(bookDTO)
    //     const getByISBN = await sut.getBookByISBN(123456789)

    //     expect(getByISBN.id).toBeDefined()
    //     expect(getByISBN.name).toBe('Quem mexeu no meu queijo')
    // })

    // test('Deve retornar um null a partir do ISBN, n achoou o livro', async () =>{
    //     const getByISBN = await sut.getBookByISBN(123456789)

    //     expect(getByISBN).toBeNull
    // })

    test('Deve retorn o livro pelo nome', async () => {
        await typeormBookRepository.save(bookDTO)
        const getByName = await sut.getBookByNameOrISBN('Quem mexeu no meu queijo')

        expect(getByName).toHaveLength(1)
        expect(getByName[0].name).toBe('Quem mexeu no meu queijo')
    })

    test('Deve retorn o livro pelo ISBN', async () => {
        await typeormBookRepository.save(bookDTO)
        const getByName = await sut.getBookByNameOrISBN('123456789')

        expect(getByName).toHaveLength(1)
        expect(getByName[0].ISBN).toBe('123456789')
    })

    // test('Deve retorn null livro pelo nome', async () => {
    //     const getByName = await sut.getBookByName('Quem mexeu no meu queijo')

    //     expect(getByName).toBeNull()
    // })


    test('Deve retornar true ao buscar o livro por ISBN', async () => {
        await typeormBookRepository.save(bookDTO)

        const existBookByISBN = await sut.existBookByISBN('123456789')

        expect(existBookByISBN).toBe(true)
    })

    test('Deve retornar true ao buscar o livro por ISBN', async () => {
        const existBookByISBN = await sut.existBookByISBN('123456789')

        expect(existBookByISBN).toBe(false)
    })
})