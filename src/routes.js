const express = require('express')
const TermoController = require('./controllers/TermoController')
const UsuarioController = require('./controllers/UsuarioController')
const ErrorController = require('./controllers/ErrorController')
const routes = express.Router()
var verifyJWT = require('../helpers/tokenVerify')

// autenticação
routes.post('/admin/autenticar_usuario', UsuarioController.autenticar)

// listagem
routes.get('/admin/termos', verifyJWT, TermoController.listar)
routes.get('/usuarios', verifyJWT, UsuarioController.listar)

//busca
routes.get('/admin/termos/:entrada', verifyJWT, TermoController.buscar)

// armazenamento
routes.post('/admin/novo_termo', verifyJWT, TermoController.armazenar)
routes.post('/novo_usuario', verifyJWT, UsuarioController.armazenar)

// atualização
routes.put('/admin/termos/atualizar/:id', verifyJWT, TermoController.atualizar)

//remoção
routes.delete('/admin/termos/deletar/:id', verifyJWT, TermoController.deletar)

// rota de erro
routes.use(ErrorController.naoEncontrado)

module.exports = routes