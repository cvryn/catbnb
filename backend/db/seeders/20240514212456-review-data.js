'use strict';

const { Review } = require('../models');

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {

    await Review.bulkCreate(
      [
        {
          spotId: 1,
          userId: 1,
          review: "Great for a little snooze! :3",
          stars: 3,
        },
        {
          spotId: 1,
          userId: 2,
          review: "Not a bad box.",
          stars: 2,
        },
        {
          spotId: 1,
          userId: 3,
          review: "Had a great time!",
          stars: 3,
        },
        {
          spotId: 2,
          userId: 1,
          review: "I took a lil nappy with my all my fwens! :3",
          stars: 4,
        },
        {
          spotId: 2,
          userId: 2,
          review: "Meow",
          stars: 1,
        },
        {
          spotId: 2,
          userId: 5,
          review: "Lovely place!",
          stars: 3,
        },
        {
          spotId: 3,
          userId: 1,
          review: "I ate too much and slept too much! :3",
          stars: 5,
        },
        {
          spotId: 3,
          userId: 2,
          review: "Meow meow meow!",
          stars: 5,
        },
        {
          spotId: 3,
          userId: 3,
          review: "It was really nice and meow-nificent!",
          stars: 4,
        },
        {
          spotId: 4,
          userId: 4,
          review: "Had a good time here!",
          stars: 4,
        },
        {
          spotId: 4,
          userId: 5,
          review: "Beautiful!!",
          stars: 4,
        },
        {
          spotId: 4,
          userId: 1,
          review: "Huge spot for paw-rties! :3",
          stars: 4,
        },
        {
          spotId: 5,
          userId: 1,
          review: "Had a great time with my besties staying here! :3",
          stars: 5,
        },
        {
          spotId: 5,
          userId: 2,
          review: "Meow!",
          stars: 4,
        },
        {
          spotId: 5,
          userId: 4,
          review: "Not bad",
          stars: 4,
        },
      ]
    )


  },

  async down (queryInterface, Sequelize) {

    options.tableName = 'Reviews';
    const Op = Sequelize.Op;

    await queryInterface.bulkDelete(options, null, {});
  }
};
