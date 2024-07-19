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
          review: "Meow meow meow meow meow meow.",
          stars: 2,
        },
        {
          spotId: 1,
          userId: 3,
          review: "Had an ok time.",
          stars: 2,
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
          spotId: 4,
          userId: 2,
          review: "Meow meow meow!",
          stars: 5,
        },
        {
          spotId: 10,
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
          spotId: 7,
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
          spotId: 6,
          userId: 4,
          review: "Not bad",
          stars: 4,
        },
        {
          spotId: 6,
          userId: 1,
          review: "Purrrfect spot for a catnap! :3",
          stars: 4
        },
        {
          spotId: 8,
          userId: 2,
          review: "Meow!",
          stars: 3
        },
        {
          spotId: 5,
          userId: 3,
          review: "Such a cozy hideout!",
          stars: 5
        },
        {
          spotId: 7,
          userId: 4,
          review: "Not bad, but could use more toys.",
          stars: 3
        },
        {
          spotId: 8,
          userId: 5,
          review: "Absolutely purrfect place for exploring!",
          stars: 5
        },
        {
          spotId: 8,
          userId: 1,
          review: "Great spot for a catventure! :3",
          stars: 4
        },
        {
          spotId: 10,
          userId: 4,
          review: "Had a pawsome time exploring this spot!",
          stars: 5
        },
        {
          spotId: 10,
          userId: 5,
          review: "Not bad, could use more sunbeams.",
          stars: 3
        },
        {
          spotId: 11,
          userId: 5,
          review: "Nice place for a catnap.",
          stars: 3
        },
        {
          spotId: 11,
          userId: 2,
          review: "Meow meow",
          stars: 3
        },
        {
          spotId: 11,
          userId: 1,
          review: "Loved the a-meow-nities! :3",
          stars: 4
        },
        {
          spotId: 12,
          userId: 2,
          review: "Meow meow",
          stars: 2
        },
        {
          spotId: 12,
          userId: 4,
          review: "Not bad",
          stars: 2
        },
        {
          spotId: 12,
          userId: 3,
          review: "Great spots for climbing and napping",
          stars: 4
        },
        {
          spotId: 13,
          userId: 2,
          review: "Meow meow meow meow meow meow",
          stars: 4
        },
        {
          spotId: 13,
          userId: 5,
          review: "Not bad!",
          stars: 4
        },
        {
          spotId: 14,
          userId: 5,
          review: "Very nice views",
          stars: 3
        },
        {
          spotId: 14,
          userId: 3,
          review: "Had great naps here",
          stars: 3
        },
        {
          spotId: 14,
          userId: 4,
          review: "I'd like to come back",
          stars: 4
        },
        {
          spotId: 15,
          userId: 5,
          review: "Had fun playing with all the included toys",
          stars: 3
        },
        {
          spotId: 15,
          userId: 1,
          review: "Amazing view from the top! :3",
          stars: 4
        },
        {
          spotId: 16,
          userId: 1,
          review: "I mostly took naps while here :3",
          stars: 4
        },
        {
          spotId: 16,
          userId: 2,
          review: "Meow meow meow!",
          stars: 3
        },
        {
          spotId: 16,
          userId: 4,
          review: "Had a good time",
          stars: 3
        },
        {
          spotId: 17,
          userId: 2,
          review: "Meow meow meow meow meow meow meow meow meow",
          stars: 4
        },
        {
          spotId: 17,
          userId: 5,
          review: "Very lovely",
          stars: 3
        },

        {
          spotId: 18,
          userId: 1,
          review: "Spent the weekend with my furr-riends here and had a blast! :3",
          stars: 4
        },
        {
          spotId: 18,
          userId: 2,
          review: "Meow meow",
          stars: 5
        },
        {
          spotId: 18,
          userId: 3,
          review: "Nice",
          stars: 3
        },
        {
          spotId: 19,
          userId: 5,
          review: "I had a lovely stay",
          stars: 4
        },
        {
          spotId: 19,
          userId: 4,
          review: "Not bad",
          stars: 2
        },

        {
          spotId: 20,
          userId: 2,
          review: "Meow meow meow meow meow",
          stars: 5
        },
        {
          spotId: 20,
          userId: 3,
          review: "Beautiful location",
          stars: 5
        },
        {
          spotId: 20,
          userId: 4,
          review: "Had a great time",
          stars: 3
        },
        {
          spotId: 20,
          userId: 5,
          review: "Beautiful views",
          stars: 4
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
