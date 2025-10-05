function sum({x, y}){
    return x + y
}

function division({x, y}){
    return x / y
}

function applicationOperation({x, y, operation}){
    return operation({x: x, y: y})
}

console.log(applicationOperation({x: 10, y: 5, operation: sum}))
console.log(applicationOperation({x: 10, y: 5, operation: division}))

