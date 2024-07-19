"use strict";

const { Booking } = require("../models");

let options = {};
if (process.env.NODE_ENV === "production") {
  options.schema = process.env.SCHEMA;
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await Booking.bulkCreate(
      [
        {
          spotId: 1,
          userId: 1,
          startDate: "2024-08-02",
          endDate: "2024-08-04",
        },
        {
          spotId: 1,
          userId: 3,
          startDate: "2023-12-20",
          endDate: "2023-12-22",
        },
        {
          spotId: 2,
          userId: 2,
          startDate: "2024-10-18",
          endDate: "2024-10-20",
        },
        {
          spotId: 2,
          userId: 4,
          startDate: "2023-12-20",
          endDate: "2023-12-22",
        },
        {
          spotId: 3,
          userId: 3,
          startDate: "2024-12-20",
          endDate: "2024-12-22",
        },
        {
          spotId: 4,
          userId: 3,
          startDate: "2000-12-20",
          endDate: "2000-12-22",
        },
        {
          spotId: 5,
          userId: 2,
          startDate: "2023-12-20",
          endDate: "2023-12-22",
        },
        {
          spotId: 3,
          userId: 2,
          startDate: "2024-09-15",
          endDate: "2024-09-17",
        },
        {
          spotId: 4,
          userId: 1,
          startDate: "2024-11-05",
          endDate: "2024-11-07",
        },
        {
          spotId: 5,
          userId: 3,
          startDate: "2024-07-10",
          endDate: "2024-07-12",
        },
        {
          spotId: 6,
          userId: 4,
          startDate: "2025-01-25",
          endDate: "2025-01-27",
        },
        {
          spotId: 7,
          userId: 1,
          startDate: "2025-03-14",
          endDate: "2025-03-16",
        },
        {
          spotId: 8,
          userId: 2,
          startDate: "2024-06-08",
          endDate: "2024-06-10",
        },
        {
          spotId: 9,
          userId: 3,
          startDate: "2024-08-20",
          endDate: "2024-08-22",
        },
        {
          spotId: 10,
          userId: 4,
          startDate: "2024-09-20",
          endDate: "2024-09-22",
        },
        {
          spotId: 7,
          userId: 1,
          startDate: "2024-10-20",
          endDate: "2024-10-22",
        },
        {
          spotId: 10,
          userId: 2,
          startDate: "2024-11-20",
          endDate: "2024-11-22",
        },
        // Bookings for spotId 11
        {
          spotId: 11,
          userId: 1,
          startDate: "2024-08-01",
          endDate: "2024-08-05",
        },
        {
          spotId: 11,
          userId: 2,
          startDate: "2024-08-06",
          endDate: "2024-08-10",
        },
        {
          spotId: 11,
          userId: 3,
          startDate: "2024-08-11",
          endDate: "2024-08-15",
        },
        {
          spotId: 11,
          userId: 5,
          startDate: "2024-08-21",
          endDate: "2024-08-25",
        },

        // Bookings for spotId 12
        {
          spotId: 12,
          userId: 1,
          startDate: "2024-08-26",
          endDate: "2024-08-30",
        },
        {
          spotId: 12,
          userId: 2,
          startDate: "2024-09-01",
          endDate: "2024-09-05",
        },
        {
          spotId: 12,
          userId: 3,
          startDate: "2024-09-06",
          endDate: "2024-09-10",
        },
        {
          spotId: 12,
          userId: 4,
          startDate: "2024-09-11",
          endDate: "2024-09-15",
        },

        // Bookings for spotId 13
        {
          spotId: 13,
          userId: 2,
          startDate: "2024-09-26",
          endDate: "2024-09-30",
        },
        {
          spotId: 13,
          userId: 3,
          startDate: "2024-10-01",
          endDate: "2024-10-05",
        },
        {
          spotId: 13,
          userId: 4,
          startDate: "2024-10-06",
          endDate: "2024-10-10",
        },
        {
          spotId: 13,
          userId: 5,
          startDate: "2024-10-11",
          endDate: "2024-10-15",
        },

        // Bookings for spotId 14
        {
          spotId: 14,
          userId: 1,
          startDate: "2024-10-16",
          endDate: "2024-10-20",
        },
        {
          spotId: 14,
          userId: 3,
          startDate: "2024-10-26",
          endDate: "2024-10-30",
        },
        {
          spotId: 14,
          userId: 4,
          startDate: "2024-11-01",
          endDate: "2024-11-05",
        },
        {
          spotId: 14,
          userId: 5,
          startDate: "2024-11-06",
          endDate: "2024-11-10",
        },

        // Bookings for spotId 15
        {
          spotId: 15,
          userId: 1,
          startDate: "2024-11-11",
          endDate: "2024-11-15",
        },
        {
          spotId: 15,
          userId: 2,
          startDate: "2024-11-16",
          endDate: "2024-11-20",
        },
        {
          spotId: 15,
          userId: 4,
          startDate: "2024-11-26",
          endDate: "2024-11-30",
        },
        {
          spotId: 15,
          userId: 5,
          startDate: "2024-12-01",
          endDate: "2024-12-05",
        },

        // Bookings for spotId 16
        {
          spotId: 16,
          userId: 1,
          startDate: "2024-12-06",
          endDate: "2024-12-10",
        },
        {
          spotId: 16,
          userId: 2,
          startDate: "2024-12-11",
          endDate: "2024-12-15",
        },
        {
          spotId: 16,
          userId: 4,
          startDate: "2024-12-21",
          endDate: "2024-12-25",
        },
        {
          spotId: 16,
          userId: 5,
          startDate: "2024-12-26",
          endDate: "2024-12-30",
        },

        // Bookings for spotId 17
        {
          spotId: 17,
          userId: 1,
          startDate: "2025-01-01",
          endDate: "2025-01-05",
        },
        {
          spotId: 17,
          userId: 2,
          startDate: "2025-01-06",
          endDate: "2025-01-10",
        },
        {
          spotId: 17,
          userId: 3,
          startDate: "2025-01-11",
          endDate: "2025-01-15",
        },

        {
          spotId: 17,
          userId: 5,
          startDate: "2025-01-21",
          endDate: "2025-01-25",
        },

        // Bookings for spotId 18
        {
          spotId: 18,
          userId: 1,
          startDate: "2025-01-26",
          endDate: "2025-01-30",
        },
        {
          spotId: 18,
          userId: 2,
          startDate: "2025-02-01",
          endDate: "2025-02-05",
        },
        {
          spotId: 18,
          userId: 3,
          startDate: "2025-02-06",
          endDate: "2025-02-10",
        },
        {
          spotId: 18,
          userId: 4,
          startDate: "2025-02-11",
          endDate: "2025-02-15",
        },

        // Bookings for spotId 19
        {
          spotId: 19,
          userId: 1,
          startDate: "2025-02-21",
          endDate: "2025-02-25",
        },

        {
          spotId: 19,
          userId: 3,
          startDate: "2025-03-03",
          endDate: "2025-03-07",
        },
        {
          spotId: 19,
          userId: 4,
          startDate: "2025-03-08",
          endDate: "2025-03-12",
        },
        {
          spotId: 19,
          userId: 5,
          startDate: "2025-03-13",
          endDate: "2025-03-17",
        },

        // Bookings for spotId 20
       
        {
          spotId: 20,
          userId: 2,
          startDate: "2025-03-23",
          endDate: "2025-03-27",
        },
        {
          spotId: 20,
          userId: 3,
          startDate: "2025-03-28",
          endDate: "2025-04-01",
        },
      ],
      { validate: true }
    );
  },

  async down(queryInterface, Sequelize) {
    options.tableName = "Bookings";
    const Op = Sequelize.Op;

    await queryInterface.bulkDelete(options, {}, {});
  },
};
