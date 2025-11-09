const { Either } = require("../../shared/errors")
const httpResponse = require("../../shared/helpers/http.response")
const getUserByCPFController = require("./get-user-by-CPF.controller")

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

})