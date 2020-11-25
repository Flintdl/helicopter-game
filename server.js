const express = require("express")
const server = express()
const queryParser = require('express-query-int');
const bodyParser = require('body-parser');
const allowCors = require('./cors')
const router = express.Router()
const fs = require('fs')

server.use(bodyParser.urlencoded({ extended: true }));
server.use(bodyParser.json());
server.use(queryParser());
server.use(allowCors);

const readFile = () => {
    const content = fs.readFileSync('./dados.json', 'utf-8')
    return JSON.parse(content)
}

const writeFile = (content) => {
    const updateFile = JSON.stringify(content)
    fs.writeFileSync('./dados.json', updateFile, 'utf-8')
}

router.get('/usuarios', (req, res) => {
    const content = readFile()
    res.send(content)
})

router.get('/usuarios/:usuario', (req, res) => {
    const content = readFile()
    const ret = content.find(user => user.usuario === req.params.usuario)
    res.send(ret)
})

router.post('/usuarios', (req, res, next) => {
    const currentContent = readFile()

    let id = 0
    if (currentContent.length > 0) {
        const lastId = currentContent[currentContent.length - 1].id
        id = lastId + 1
    } else {
        id = 1
    }

    const data = {
        id,
        usuario: req.body.usuario,
        pontuacao: Number(req.body.pontuacao),
        rounds: Number(req.body.rounds)
    }

    currentContent.push(data)
    writeFile(currentContent)
    res.send(data)
})

router.put('/usuarios/:id', (req, res) => {
    const { id } = req.params

    const { usuario, pontuacao, rounds } = req.body

    const currentContent = readFile()
    const selectedItem = currentContent.findIndex((item) => item.id === id)

    const { id: cId, usuario: cUsuario, pontuacao: cPontuacao, rounds: cRounds } = currentContent[selectedItem]

    const newObject = {
        id: cId,
        usuario: usuario ? usuario : cUsuario,
        pontuacao: pontuacao ? pontuacao : cPontuacao,
        rounds: rounds ? rounds : cRounds
    }

    currentContent[selectedItem] = newObject
    writeFile(currentContent)
    res.send(newObject)
})

router.delete('/usuarios/:id', (req, res) => {
    const { id } = req.params
    const currentContent = readFile()
    const selectedItem = currentContent.findIndex((item) => item.id === id)
    currentContent.splice(selectedItem, 1)
    writeFile(currentContent)
    res.send(true)
})

server.use(router)

server.listen(8089, () => {})