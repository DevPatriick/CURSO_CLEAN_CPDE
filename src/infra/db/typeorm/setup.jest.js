const { typeormServer } = require("./setup");

// Verifica se inicializa
beforeAll(async () => {
    await typeormServer.initialize()
})

afterAll(async () => {
    await typeormServer.destroy()
})