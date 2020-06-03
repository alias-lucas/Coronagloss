const { Model, DataTypes } = require('sequelize')

class Termo extends Model {
    static init(sequelize) {
        super.init({
            area: DataTypes.STRING,
            categoria_gramatical: DataTypes.STRING,
            data_de_registro: DataTypes.STRING,
            entrada: DataTypes.STRING(500),
            definicao: DataTypes.STRING,
            fonte_da_definicao: DataTypes.STRING,
            contexto_de_uso: DataTypes.STRING,
            fonte_do_contexto_de_uso: DataTypes.STRING,
            genero: DataTypes.STRING,
            nota: DataTypes.STRING,
            redator: DataTypes.STRING,
            remissiva: DataTypes.STRING,
            termo_ingles: DataTypes.STRING,
            termo_italiano: DataTypes.STRING,
            variantes: DataTypes.STRING,
        }, {
            sequelize
        })
    }
}

module.exports = Termo