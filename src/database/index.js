const Sequelize = require('sequelize');
const dbConfig = require('../config/database');

const Usuario = require('../models/Usuario')
const Termo = require('../models/Termo')

const connection = new Sequelize(dbConfig);

Usuario.init(connection)
Termo.init(connection)

module.exports = connection;