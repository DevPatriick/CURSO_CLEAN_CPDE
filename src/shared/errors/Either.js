
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
}