const Termo = require('../models/Termo')
const jwt = require('jsonwebtoken')
// const packageName = require('packageName');

module.exports = {
    async listar(req, res) {
        const termos = await Termo.findAll(
            {
                order: [
                    // Will escape title and validate DESC against a list of valid direction parameters
                    ['entrada', 'ASC'],]
            }
        )

        return res.json(termos)
    },

    async buscar(req, res) {
        const { entrada } = req.params
        const termo = await Termo.findAll({
            where: {
                entrada: entrada
            }
        })

        if (termo == '') {
            return res.status(400).json({ error: 'O termo não existe!' })
        }

        return res.json(termo)
    },

    async armazenar(req, res) {

        const termo_existe = await Termo.findAll({
            where: {
                entrada: req.body.entrada
            }
        })

        if (termo_existe != '') {
            return res.status(400).json({ error: 'O termo já existe!' })
        }

        const {
            area,
            entrada,
            termo_ingles,
            termo_italiano,
            termo_espanhol, 
            termo_frances,
            termo_alemao,
            categoria_gramatical,
            definicao,
            fonte_da_definicao,
            contexto_de_uso,
            fonte_do_contexto_de_uso,
            genero,
            nota,
            nota2,
            redator,
            remissiva,
            variantes,
            data_de_registro
        } = req.body

        const novo_termo = await Termo.create({
            area,
            entrada,
            termo_ingles,
            termo_italiano,
            termo_espanhol, 
            termo_frances,
            termo_alemao,
            categoria_gramatical,
            definicao,
            fonte_da_definicao,
            contexto_de_uso,
            fonte_do_contexto_de_uso,
            genero,
            nota,
            nota2,
            redator,
            remissiva,
            variantes,
            data_de_registro
        })

        return res.json(novo_termo)
    },

    async atualizar(req, res) {
        const { id } = req.params
        // verificando se o termo já existe
        // const termo_existe = await Termo.findAll({
        //     where: {
        //         id: id
        //     }
        // })

        // if (termo_existe != '') {
        //     return res.status(400).json({ error: 'O termo já existe!' })
        // }

        Termo.update(req.body,
            {
                where: { id: id }
            })
            .then(termo => {
                return res.json({ termo })
            })
            .catch(error => {
                console.log(error)
                res.status(404).send(error)
            })
    },

    async deletar(req, res) {
        const { id } = req.params

        Termo.destroy({
            where: {
                id: id //this will be your id that you want to delete
            }
        }).then(function (rowDeleted) { // rowDeleted will return number of rows deleted
            if (rowDeleted === 1) {
                return res.status(204).send()
            }
        }, function (err) {
            return res.status(400).json(err)
        })

    }
}