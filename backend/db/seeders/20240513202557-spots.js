"use strict";

const { Spot } = require("../models");

let options = {};
if (process.env.NODE_ENV === "production") {
  options.schema = process.env.SCHEMA;
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {

    await Spot.bulkCreate(
      [
        {
          ownerId: 1,
          address: "1266 Valencia St",
          city: "San Francisco",
          state: "California",
          country: "United States of America",
          lat: 37.75263939630619,
          lng: -122.42089576219055,
          name: "Cat Box",
          description: "A place to nap",
          price: 9.99,
        },

        {
          ownerId: 2,
          address: "2869 Broadway",
          city: "Oakland",
          state: "California",
          country: "United States of America",
          lat: 37.8175167579453,
          lng: -122.26336669999999,
          name: "Cat Tree",
          description: "Lounge around and bat at things",
          price: 19.99,
        },

        {
          ownerId: 3,
          address: "415 Buena Vista Ave E",
          city: "San Francisco",
          state: "California",
          country: "United States of America",
          lat: 37.76653764454153,
          lng: -122.44107715767119,
          name: "Cat House",
          description: "Plenty of free food and snacks and toys",
          price: 29.99,
        },
      ],
      { validate: true }
    );
  },

  async down (queryInterface, Sequelize) {

    options.tableName = 'Spots';
    const Op = Sequelize.Op;

    await queryInterface.bulkDelete(options, null, {});
  }
};