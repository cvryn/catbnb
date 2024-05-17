'use strict';

const { User } = require('../models');
const bcrypt = require("bcryptjs");

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;
}

module.exports = {
  async up (queryInterface, Sequelize) {
    await User.bulkCreate([
      {
        email: 'feijai@user.io',
        username: 'Feijai',
        hashedPassword: bcrypt.hashSync('password'),
        firstName: 'Fei',
        lastName: 'Jai'
      },
      {
        email: 'snowie@user.io',
        username: 'Snowie',
        hashedPassword: bcrypt.hashSync('password'),
        firstName: 'Snowie',
        lastName: 'Menace'
      },
      {
        email: 'bear@user.io',
        username: 'Bear',
        hashedPassword: bcrypt.hashSync('password'),
        firstName: 'Bear',
        lastName: 'Uwu'
      },
      {
        email: 'nightmare@user.io',
        username: 'Nightmare',
        hashedPassword: bcrypt.hashSync('password'),
        firstName: 'Nightmare',
        lastName: 'B'
      },
      {
        email: 'mamacat@user.io',
        username: 'Mama',
        hashedPassword: bcrypt.hashSync('password'),
        firstName: 'Mama',
        lastName: 'Cat'
      },
    ], { validate: true });
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'Users';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      username: { [Op.in]: ['Feijai', 'Snowie', 'Bear', 'Nightmare', 'Mama'] }
    }, {});
  }
};
