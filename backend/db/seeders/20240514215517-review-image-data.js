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
        {
          reviewId: 6,
          url: 'image url 6'
        },
        {
          reviewId: 7,
          url: 'image url 7'
        },
        {
          reviewId: 8,
          url: 'image url 8'
        },
        {
          reviewId: 9,
          url: 'image url 9'
        },
        {
          reviewId: 10,
          url: 'image url 10'
        },
        {
          reviewId: 11,
          url: 'image url 11'
        },
        {
          reviewId: 12,
          url: 'image url 12'
        },
        {
          reviewId: 13,
          url: 'image url 13'
        },
        {
          reviewId: 14,
          url: 'image url 14'
        },
        {
          reviewId: 15,
          url: 'image url 15'
        },
        {
          reviewId: 16,
          url: 'image url 16'
        },
        {
          reviewId: 17,
          url: 'image url 17'
        },
        {
          reviewId: 18,
          url: 'image url 18'
        },
        {
          reviewId: 19,
          url: 'image url 19'
        },
        {
          reviewId: 20,
          url: 'image url 20'
        },
        {
          reviewId: 21,
          url: 'image url 21'
        },
        {
          reviewId: 22,
          url: 'image url 22'
        },
        {
          reviewId: 23,
          url: 'image url 23'
        },
        {
          reviewId: 24,
          url: 'image url 24'
        },
        {
          reviewId: 25,
          url: 'image url 25'
        },
        {
          reviewId: 26,
          url: 'image url 26'
        },
        {
          reviewId: 27,
          url: 'image url 27'
        },
        {
          reviewId: 28,
          url: 'image url 28'
        },
        {
          reviewId: 29,
          url: 'image url 29'
        },
        {
          reviewId: 30,
          url: 'image url 30'
        },
        {
          reviewId: 31,
          url: 'image url 31'
        },
        {
          reviewId: 32,
          url: 'image url 32'
        },
        {
          reviewId: 33,
          url: 'image url 33'
        },
        {
          reviewId: 34,
          url: 'image url 34'
        },
        {
          reviewId: 35,
          url: 'image url 35'
        },
        {
          reviewId: 36,
          url: 'image url 36'
        },
        {
          reviewId: 37,
          url: 'image url 37'
        },
        {
          reviewId: 38,
          url: 'image url 38'
        },
        {
          reviewId: 39,
          url: 'image url 39'
        },
        {
          reviewId: 40,
          url: 'image url 40'
        },
        {
          reviewId: 41,
          url: 'image url 41'
        },
        {
          reviewId: 42,
          url: 'image url 42'
        },
        {
          reviewId: 43,
          url: 'image url 43'
        },
        {
          reviewId: 44,
          url: 'image url 44'
        },
        {
          reviewId: 45,
          url: 'image url 45'
        },
        {
          reviewId: 46,
          url: 'image url 46'
        },
        {
          reviewId: 47,
          url: 'image url 47'
        },
        {
          reviewId: 48,
          url: 'image url 48'
        },
        {
          reviewId: 49,
          url: 'image url 49'
        },
        {
          reviewId: 50,
          url: 'image url 50'
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
