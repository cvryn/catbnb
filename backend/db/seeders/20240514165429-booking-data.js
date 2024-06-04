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
        {
          spotId: 3,
          userId: 2,
          startDate: '2024-09-15',
          endDate: '2024-09-17',
        },
        {
          spotId: 4,
          userId: 1,
          startDate: '2024-11-05',
          endDate: '2024-11-07',
        },
        {
          spotId: 5,
          userId: 3,
          startDate: '2024-07-10',
          endDate: '2024-07-12',
        },
        {
          spotId: 6,
          userId: 4,
          startDate: '2025-01-25',
          endDate: '2025-01-27',
        },
        {
          spotId: 7,
          userId: 1,
          startDate: '2025-03-14',
          endDate: '2025-03-16',
        },
        {
          spotId: 8,
          userId: 2,
          startDate: '2024-06-08',
          endDate: '2024-06-10',
        },
        {
          spotId: 9,
          userId: 3,
          startDate: '2024-08-20',
          endDate: '2024-08-22',
        },
        {
          spotId: 10,
          userId: 4,
          startDate: '2024-09-20',
          endDate: '2024-09-22',
        },
        {
          spotId: 7,
          userId: 1,
          startDate: '2024-10-20',
          endDate: '2024-10-22',
        },
        {
          spotId: 10,
          userId: 2,
          startDate: '2024-11-20',
          endDate: '2024-11-22',
        }
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
