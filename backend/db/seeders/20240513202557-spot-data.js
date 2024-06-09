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
          description: "It's a box. It's a cool place to nap. It's a nice box. It's a cool box. Sometimes it has a flap to protect you from the sunshine, sometimes it doesn't. Sometimes when it rains, the humans move it away so be sure to book while you can!",
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
          description: "Unleash your feline's inner explorer at the Cat Tree! This kitty paradise boasts comfy napping nooks, scratching posts of all textures, window perches for birdwatching, and a network of tunnels for pouncing on hidden toys.",
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
          description: "Perches by the window offer the ultimate napping spot. You can sprawl out, soak up the warmth, and watch the fascinating world of birds flit by outside. This peaceful haven is the perfect place to relax, recharge, and keep yourself entertained for hours on end.",
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
          description: "Plush velvet cushions adorn window perches, offering the perfect vantage point to survey your sprawling domain. Crystal chandeliers cast a soft glow. Delicate feather toys dangle from the rafters, begging for a regal swat with your paw. It's a five-star feline palace, designed to pamper your inner aristocrat.",
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
          description: "A stylish space for the discerning feline. Everywhere you turn, feathery prey dangles and fuzzy mice tempt your pounce. The air even tingles with the scent of catnip, making your whiskers twitch with excitement. This place is a hunter's dream come true!",
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
          description: "A playful haven for feline friends. Tunnels and tubes become your secret passageways, perfect for stalking unsuspecting toys or simply enjoying a good zoomie. Cubbyholes offer cozy hideaways for a quick nap after a thrilling chase.",
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
          description: "A cozy retreat for whiskered companions. Feeling a bit peckish after all that playtime? Some havens might even have a designated feeding area to keep your energy levels up. Just remember to check for availability before getting your hopes up for a mid-play snack. ",
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
          description: "The floor is practically a wonderland of crinkly delights. Balls filled with irresistible crinkle paper become your personal soccer trophies. This place understands your love for the sound of crinkle, offering endless opportunities to unleash your inner hunter and keep boredom at bay.",
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
          description: "Looking for some social butterflies?  Some havens offer supervised playtime with other feline companions, fostering purrfect friendships. Just check for availability before bringing your social side to the party.",
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
          description: "Imagine yourself basking in the gilded glory of a feline opera house. Plush velvet drapes frame arched windows, gleaming brass sconces cast a warm, theatrical light. This isn't merely a hangout, it's a purrformance venue fit for a feline maestro, designed to unleash your inner virtuoso.",
          price: 299.99
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
