const express = require('express')
const { routes } = require('./routes')
const { ZodError } = require('zod')
const { typeormServer } = require('../../infra/db/typeorm/setup')
const app = express()

// express usa o formato json
app.use(express.json())

// iniciando o typeorm
typeormServer.initialize().then(() => {
    console.log('Initialize typeorm...')
    // express usa as rotas
    app.use(routes)
    
    // erro handler
    app.use((err, req, res, next) => {
        if (err instanceof ZodError) {
            return res.status(400).json({ message: 'Erro na validação', erros: err.flatten() })
        }
    
        if(process.env.NODE_ENV !== 'production') console.log(err)
        return res.status(500).json({ message: '❌ Erro interno do servidor ❌'})
    })
    console.log('✅ Typeorm init ✅')
}).catch((err) => {
    console.log('Erro ao iniciar o typeorm', err)
})

module.exports = {app}
