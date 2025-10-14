
describre('Devolver livro UseCase', () => {
    const borrowRepository = {
        return: jest.fn()
    }
    test('Deve ser possível devolver um livro sem multa', async () => {
        const returnBookDTO = {
            borrow_id: 123,
            date_return: new Date('2025-10-14')
        }

        const sut = returnBookUseCase({ borrowBooksUsecase })
        const output = await sut(returnBookDTO)

        expect(output.right).toBe('Multa por atraso: R$0')
        expect(borrowRepository.return).toHaveBeenCalledWith(returnBookDTO)
        expect(borrowRepository.return).toHaveBeenCalledTimes(1)
    })
})