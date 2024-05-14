'use strict';

const { ReviewImage } = require('../models');

let options = {};
if (process.env.NODE_ENV === "production") {
  options.schema = process.env.SCHEMA;
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {

    await ReviewImage.bulkCreate(
      [
        {
          reviewId: 1,
          url: 'image url 1'
        },
        {
          reviewId: 2,
          url: 'image url 2'
        },
        {
          reviewId: 3,
          url: 'image url 3'
        },
        {
          reviewId: 4,
          url: 'image url 4'
        },
        {
          reviewId: 5,
          url: 'image url 5'
        },
      ]
    )


  },

  async down (queryInterface, Sequelize) {

    options.tableName = 'ReviewImages';
    const Op = Sequelize.Op;

    await queryInterface.bulkDelete(options, {}, {});
  }
};
