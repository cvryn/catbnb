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
          price: 4.99,
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
          description: "A place to lounge, to relax, and to bat at things",
          price: 19.99,
        },
        // {
        //   ownerId: 2,
        //   address: "123 Main St",
        //   city: "San Francisco",
        //   state: "California",
        //   country: "United States of America",
        //   lat: 37.7749293,
        //   lng: -122.4194159,
        //   name: "Cat Cottage",
        //   description: "A quaint place to relax and enjoy the city views",
        //   price: 29.99,
        // },

        {
          ownerId: 3,
          address: "415 Buena Vista Ave E",
          city: "San Francisco",
          state: "California",
          country: "United States of America",
          lat: 37.76653764454153,
          lng: -122.44107715767119,
          name: "Cat House",
          description: "We got plenty of free food and snacks and toys",
          price: 29.99,
        },
        // {
        //   ownerId: 3,
        //   address: "456 Oak St",
        //   city: "San Francisco",
        //   state: "California",
        //   country: "United States of America",
        //   lat: 37.7742295,
        //   lng: -122.4194154,
        //   name: "Purr Palace",
        //   description: "A luxurious retreat for pampered pets",
        //   price: 59.99,
        // },
        // {
        //   ownerId: 3,
        //   address: "789 Pine St",
        //   city: "San Francisco",
        //   state: "California",
        //   country: "United States of America",
        //   lat: 37.773149296,
        //   lng: -122.41924155,
        //   name: "Meow Manor",
        //   description: "A stylish space for the discerning feline",
        //   price: 54.99,
        // },
      ],
      { validate: true }
    );
  },

  async down(queryInterface, Sequelize) {
    options.tableName = "Spots";
    const Op = Sequelize.Op;

    await queryInterface.bulkDelete(options, null, {});
  },
};
