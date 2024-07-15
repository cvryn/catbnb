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
          url: 'https://res.cloudinary.com/dfj8lsesn/image/upload/c_crop,ar_1:1/v1717385330/catbnb/cat-box_q8k1et.jpg',
          preview: true,
        },
        {
          spotId: 1,
          url: 'https://res.cloudinary.com/dfj8lsesn/image/upload/c_crop,ar_1:1/v1717386107/catbnb/r-cat.box_g3hc5i.png',
          preview: true,
        },
        {
          spotId: 1,
          url: 'https://res.cloudinary.com/dfj8lsesn/image/upload/v1717386107/catbnb/r-cat-box2_aerpqz.png',
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
        {
          spotId: 6,
          url: 'https://res.cloudinary.com/dfj8lsesn/image/upload/v1717481500/catbnb/8-48P9ONEPd4ZO7DE_zrqm0c.png',
          preview: true,
        },
        {
          spotId: 7,
          url: 'https://res.cloudinary.com/dfj8lsesn/image/upload/v1717481451/catbnb/8-VHGdSOckSozju5k_q3y8ax.png',
          preview: true,
        },
        {
          spotId: 8,
          url: 'https://res.cloudinary.com/dfj8lsesn/image/upload/v1717481289/catbnb/Cat%27s%20Corner.png',
          preview: true,
        },
        {
          spotId: 9,
          url: 'https://res.cloudinary.com/dfj8lsesn/image/upload/v1717482655/catbnb/8-ATANKZhXomcJ7Tc_rqhse8.png',
          preview: true,
        },
        {
          spotId: 10,
          url: 'https://res.cloudinary.com/dfj8lsesn/image/upload/v1717482636/catbnb/8-gw2n7QwDHxtKg4O_jhqf7r.png',
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
