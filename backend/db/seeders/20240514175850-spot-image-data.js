'use strict';

const { SpotImage } = require('../models')

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;
}

/** @type {import('sequelize-cli').Migration} */


module.exports = {
  async up (queryInterface, Sequelize) {

    await SpotImage.bulkCreate(
      [
        {
          spotId: 1,
          url: '/cat-box.jpg',
          preview: true,
        },
        {
          spotId: 2,
          url: '/cat-tree.jpg',
          preview: true,
        },
        
        {
          spotId: 3,
          url: '/cat-house.jpg',
          preview: true,
        },
      ]
    )
  },

  async down (queryInterface, Sequelize) {

    options.tableName = 'SpotImages';
    const Op = Sequelize.Op;

    await queryInterface.bulkDelete(options, null, {});
  }
};
