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
          url: 'https://res.cloudinary.com/dfj8lsesn/image/upload/v1717385330/catbnb/cat-box_q8k1et.jpg',
          preview: true,
        },
        {
          spotId: 2,
          url: 'https://res.cloudinary.com/dfj8lsesn/image/upload/v1717386381/catbnb/cat-tree2_k3ho9t.png',
          preview: true,
        },

        {
          spotId: 3,
          url: 'https://res.cloudinary.com/dfj8lsesn/image/upload/v1717385287/catbnb/cat-house_s0kuyk.png',
          preview: true,
        },
        {
          spotId: 4,
          url: 'https://res.cloudinary.com/dfj8lsesn/image/upload/v1717386565/catbnb/cat-palace_cugto5.png',
          preview: true,
        },
        {
          spotId: 5,
          url: 'https://res.cloudinary.com/dfj8lsesn/image/upload/v1717385426/catbnb/cat-manor_ur2y73.png',
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
