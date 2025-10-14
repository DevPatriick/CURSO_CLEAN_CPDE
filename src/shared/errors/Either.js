
module.exports = class Either {
    constructor(left, right){
        this.left = left
        this.right = right
    }

    static Left(left){
        return new Either(left, null)
    }

    static Right(right){
        return new Either(null,right)
    }

    static userExist(value){
        return { message: `${value} já cadastro` }
    }

    static ISNBExist(value){
        return { message: `${value} já cadastrado`}
    }

    static dateReturnInvalid(){
        return { message: `Data de retorno menos que a data de saída`}
    }

    static userWithISBNBorrow(){
        return { message: `Usuário está com o livro neste momento`}
    }

    static fine(value) {
        return `Multa por atraso R$ ${value}`
    }
}