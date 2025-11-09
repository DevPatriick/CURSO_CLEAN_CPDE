const { RepositoryNotTreeError } = require("typeorm");
const { Either, AppError } = require("../../shared/errors")
const httpResponse = require("../../shared/helpers/http.response")
const getUserByCPFController = require("./get-user-by-CPF.controller")
const { ZodError } = require('zod')

describe('Buscar usuario por CPF', () => {
    const getUserByCPFUseCase = jest.fn();
    test('Deve retornar o usuario pelo CPF e o httpREsponse 200', async ()=> {
        const userDTO = {
            id: 'qualquer_id',
            name: 'qualquer_nome',
            CPF: '111.222.333-44',
            address: 'qualquer_endereço',
            phone: 'qualquer_phone',
            email: 'andrade@gmail.com'
        }

        getUserByCPFUseCase.mockResolvedValue(Either.Right(userDTO))

        const httpRequest = {
            params: {
                CPF: '111.222.333-44'
            }
        }

        const response = await getUserByCPFController({getUserByCPFUseCase, httpRequest})

        expect(response).toEqual(httpResponse(201, userDTO))
        expect(getUserByCPFUseCase).toHaveBeenCalledWith(httpRequest.params)
        expect(getUserByCPFUseCase).toHaveBeenCalledTimes(1)
    })

    it('Deve retornar um httpResponse 200 e null se não for encontrado nenhum usario com o CPF', async () => {
        getUserByCPFUseCase.mockResolvedValue(Either.Right(null))

        const httpRequest = {
            params: {
                CPF: '111.222.333-44'
            }
        }
        const response = await getUserByCPFController({
            getUserByCPFUseCase,
            httpRequest
        })

        expect(response).toEqual(httpResponse(201, null))
        expect(getUserByCPFUseCase).toHaveBeenCalledWith(httpRequest.params)
        expect(getUserByCPFUseCase).toHaveBeenCalledTimes(1)
    })

    it('Deve retornar um throw AppError se o getUserByCPFUseCase e o httpRequest n forem fornecidos ', async () => {
        await expect(() => getUserByCPFController({})).rejects.toThrow(
            new AppError(AppError.dependecy)
        )
    })
    
    it('Deve retornar um erro do zod', async () => {
        const httpRequest = {
            params: {}
        }

        expect(() => getUserByCPFController({getUserByCPFUseCase, httpRequest})).rejects.toBeInstanceOf(ZodError)
    })
})