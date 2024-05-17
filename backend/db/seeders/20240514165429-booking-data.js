'use strict';

const { Booking } = require("../models");

let options = {};
if (process.env.NODE_ENV === "production") {
  options.schema = process.env.SCHEMA;
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {

    await Booking.bulkCreate(
      [
        {
          spotId: 1,
          userId: 1,
          startDate: '2024-08-02',
          endDate: '2024-08-04',
        },
        {
          spotId: 1,
          userId: 3,
          startDate: '2023-12-20',
          endDate: '2023-12-22',
        },
        {
          spotId: 2,
          userId: 2,
          startDate: '2024-10-18',
          endDate: '2024-10-20',
        },
        {
          spotId: 2,
          userId: 4,
          startDate: '2023-12-20',
          endDate: '2023-12-22',
        },
        {
          spotId: 3,
          userId: 3,
          startDate: '2024-12-20',
          endDate: '2024-12-22',
        },
        {
          spotId: 4,
          userId: 3,
          startDate: '2000-12-20',
          endDate: '2000-12-22',
        },
        {
          spotId: 5,
          userId: 2,
          startDate: '2023-12-20',
          endDate: '2023-12-22',
        },

      ],
      { validate: true }
    );
  },

  async down (queryInterface, Sequelize) {

    options.tableName = 'Bookings';
    const Op = Sequelize.Op;

    await queryInterface.bulkDelete(options, {}, {});
  }
};
