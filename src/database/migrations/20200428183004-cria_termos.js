'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('termos', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      area: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      categoria_gramatical: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      contexto_de_uso: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      data_de_registro: {
        type: Sequelize.DATE,
        allowNull: false
      },
      definicao: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      entrada: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      fonte_da_definicao: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      fonte_do_contexto_de_uso: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      genero: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      nota: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      nota2: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      redator: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      remissiva: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      termo_ingles: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      termo_italiano: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      termo_espanhol: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      termo_frances: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      termo_alemao: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      variantes: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false
      },
      updated_at: {
        type: Sequelize.STRING,
        allowNull: false
      }
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('termos');
  }
};

