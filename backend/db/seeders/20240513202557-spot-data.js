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
          ownerId: 5,
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
          ownerId: 3,
          address: "2869 Broadway",
          city: "Oakland",
          state: "California",
          country: "United States of America",
          lat: 37.8175167579453,
          lng: -122.12236669999999,
          name: "Cat Tree",
          description: "A place to lounge, to relax, and to bat at things",
          price: 9.99,
        },

        {
          ownerId: 2,
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
        {
          ownerId: 1,
          address: "456 Oak St",
          city: "San Francisco",
          state: "California",
          country: "United States of America",
          lat: 37.7742295,
          lng: -122.3004154,
          name: "Purr Palace",
          description: "A luxurious retreat for pampered pets",
          price: 999.99,
        },
        {
          ownerId: 4,
          address: "789 Pine St",
          city: "San Francisco",
          state: "California",
          country: "United States of America",
          lat: 37.773149296,
          lng: -122.50024155,
          name: "Meow Manor",
          description: "A stylish space for the discerning feline",
          price: 54.99,
        },
        {
          ownerId: 2,
          address: "789 Whisker Way",
          city: "Oakland",
          state: "California",
          country: "United States of America",
          lat: 37.8044,
          lng: -122.2711,
          name: "Paws Play Place",
          description: "A playful haven for feline friends",
          price: 79.99
        },
        {
          ownerId: 3,
          address: "101 Meow St",
          city: "Berkeley",
          state: "California",
          country: "United States of America",
          lat: 37.8716,
          lng: -122.2727,
          name: "Whisker Wonderland",
          description: "A cozy retreat for whiskered companions",
          price: 69.99
        },
        {
          ownerId: 4,
          address: "123 Purr Lane",
          city: "San Mateo",
          state: "California",
          country: "United States of America",
          lat: 37.5629,
          lng: -122.3255,
          name: "Cat's Corner",
          description: "An enchanting hideaway for pampered cats",
          price: 89.99
        },
        {
          ownerId: 5,
          address: "246 Feline Blvd",
          city: "Sausalito",
          state: "California",
          country: "United States of America",
          lat: 37.8591,
          lng: -122.4853,
          name: "Furry Feline Retreat",
          description: "A serene escape for purring pals",
          price: 99.99
        },
        {
          ownerId: 1,
          address: "369 Claw Ct",
          city: "Palo Alto",
          state: "California",
          country: "United States of America",
          lat: 37.4419,
          lng: -122.1430,
          name: "Purrfect Paradise",
          description: "A paradise for playful kitties",
          price: 109.99
        }
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
