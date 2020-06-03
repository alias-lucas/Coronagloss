const Usuario = require('../models/Usuario')
var jwt = require('jsonwebtoken')

module.exports = {
    async listar(req, res) {
        const usuarios = await Usuario.findAll()

        return res.json(usuarios)
    },

    async armazenar(req, res) {
        const { nome, senha } = req.body

        const usuario_existe = await Usuario.findAll({
            where: {
                nome: nome, senha: senha
            }
        })

        if (usuario_existe != '') {
            return res.status(400).json({ error: 'Usuário já existe!' })
        }

        const novoUsuario = await Usuario.create({ nome, senha })

        return res.json(novoUsuario)
    },

    async autenticar(req, res, next) {
        const { nome, senha } = req.body

        const usuario = await Usuario.findAll({
            where: {
                nome: nome, senha: senha
            }
        })

        if (usuario == '') {
            return res.status(500).json({ error: "Usuário ou senha inválidos!" })
        }
        const id = usuario.id

        var token = jwt.sign({ id }, process.env.SECRET, {
            expiresIn: 1200000 // expires in 2h
        });
        res.status(200).send({ auth: true, token: token })
        // return res.json(usuario)
    },
    async deletar(req, res) {
        const { id } = req.params
        const usuario = await Usuario.destroy({
            where: { id }
        })
            .then(() => {
                res.send('Usuário deletado com sucesso')
            })
            .catch(error => {
                console.log(error)
                res.status(404).send(error)
            })
        return res.json(usuario)
    },
    async atualizar(res, req) {

        Usuario.update(req.body,
            {
                where: { id: req.params.id }
            })

            .then(users => {
                return res.json(users)
            })

            .catch(error => {
                console.log(error)
                res.status(404).send(error)
            })
    }
}
