const fs = require('fs')
var usuario = {
    "id": "18",
    "usuario": "usuario",
    "pontuacao": "pontuacao",
    "rounds": "round"
}

const contentFilePath = './dados.json'

usuario = JSON.stringify(usuario)
fs.writeFileSync(contentFilePath, usuario)




