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
        // 1
        {
          ownerId: 5,
          address: "1266 Valencia St",
          city: "San Francisco",
          state: "California",
          country: "United States of America",
          lat: 37.75263939630619,
          lng: -122.42089576219055,
          name: "Cat Box",
          description: "It's a box. It's a nice box. Sometimes when it rains, the humans move it away so be sure to book while you can!",
          price: 4.99,
        },
        // 2
        {
          ownerId: 3,
          address: "2869 Broadway",
          city: "Oakland",
          state: "California",
          country: "United States of America",
          lat: 37.8175167579453,
          lng: -122.12236669999999,
          name: "Cat Tree",
          description: "This kitty tree house paradise boasts comfy napping nooks, scratching posts of all textures, and incredible heights for pouncing on hidden toys.",
          price: 89.99,
        },
        // 3
        {
          ownerId: 2,
          address: "415 Buena Vista Ave E",
          city: "San Francisco",
          state: "California",
          country: "United States of America",
          lat: 37.76653764454153,
          lng: -122.44107715767119,
          name: "Cat House",
          description: "This peaceful haven is the perfect place to relax, recharge, and keep yourself entertained.",
          price: 69.99,
        },
        // 4
        {
          ownerId: 1,
          address: "456 Oak St",
          city: "San Francisco",
          state: "California",
          country: "United States of America",
          lat: 37.7742295,
          lng: -122.3004154,
          name: "Purr Palace",
          description: "It's a five-star feline palace, designed to pamper your inner aristocrat.",
          price: 999.99,
        },
        // 5
        {
          ownerId: 4,
          address: "789 Pine St",
          city: "San Francisco",
          state: "California",
          country: "United States of America",
          lat: 37.773149296,
          lng: -122.50024155,
          name: "Meow Manor",
          description: "The air even tingles with the scent of catnip, making your whiskers twitch with excitement. This place is a hunter's dream come true!",
          price: 54.99,
        },
         // 6
        {
          ownerId: 2,
          address: "789 Whisker Way",
          city: "Oakland",
          state: "California",
          country: "United States of America",
          lat: 37.8044,
          lng: -122.2711,
          name: "Paws Play Place",
          description: "A playful haven for feline friends. Tunnels and tubes perfect for stalking unsuspecting toys or simply enjoying a good zoomie.",
          price: 79.99
        },
        // 7

        {
          ownerId: 3,
          address: "101 Meow St",
          city: "Berkeley",
          state: "California",
          country: "United States of America",
          lat: 37.8716,
          lng: -122.2727,
          name: "Whisker Wonderland",
          description: "A cozy retreat for whiskered companions with designated feeding area to keep your energy levels up.",
          price: 69.99
        },
        // 8
        {
          ownerId: 4,
          address: "123 Purr Lane",
          city: "San Mateo",
          state: "California",
          country: "United States of America",
          lat: 37.5629,
          lng: -122.3255,
          name: "Cat's Corner",
          description: "This place offers endless opportunities to unleash your inner hunter and keep boredom at bay.",
          price: 89.99
        },
        // 9
        {
          ownerId: 5,
          address: "246 Feline Blvd",
          city: "Sausalito",
          state: "California",
          country: "United States of America",
          lat: 37.8591,
          lng: -122.4853,
          name: "Furry Feline Retreat",
          description: "This haven offer supervised playtime with other feline companions, fostering purrfect friendships.",
          price: 99.99
        },

        // 10
        {
          ownerId: 1,
          address: "369 Claw Ct",
          city: "Palo Alto",
          state: "California",
          country: "United States of America",
          lat: 37.4419,
          lng: -122.1430,
          name: "Purrfect Paradise",
          description: "This isn't merely a hangout, it's a purrformance venue fit for a feline maestro, designed to unleash your inner virtuoso.",
          price: 299.99
        },
// 11
        {
          ownerId: 4,
          address: "123 Purr Lane",
          city: "San Mateo",
          state: "California",
          country: "United States of America",
          lat: 37.5629,
          lng: -122.3255,
          name: "Cat's Corner",
          description: "This place offers endless opportunities to unleash your inner hunter and keep boredom at bay. With plenty of spaces to hide, climb, and explore, your feline friend will always be entertained.",
          price: 89.99
        },
        // 12
        {
          ownerId: 5,
          address: "246 Feline Blvd",
          city: "Sausalito",
          state: "California",
          country: "United States of America",
          lat: 37.8591,
          lng: -122.4853,
          name: "Furry Feline Retreat",
          description: "This haven offers supervised playtime with other feline companions, fostering purrfect friendships. It also includes comfortable napping areas and delicious treats for a delightful experience.",
          price: 99.99
        },
        // 13
        {
          ownerId: 1,
          address: "369 Claw Ct",
          city: "Palo Alto",
          state: "California",
          country: "United States of America",
          lat: 37.4419,
          lng: -122.1430,
          name: "Purrfect Place",
          description: "This isn't merely a hangout, it's a purrformance venue fit for a feline maestro, designed to unleash your inner virtuoso. Enjoy a variety of interactive toys and luxurious lounging spots.",
          price: 299.99
        },
        // 14
        {
          ownerId: 2,
          address: "789 Meow Ave",
          city: "Berkeley",
          state: "California",
          country: "United States of America",
          lat: 37.8716,
          lng: -122.2727,
          name: "Kitty Haven",
          description: "A serene place for relaxation and fun activities for your feline friend. With cozy napping corners, engaging toys, and a peaceful ambiance, this haven is perfect for a cat's day out.",
          price: 79.99
        },
        // 15
        {
          ownerId: 3,
          address: "456 Whiskers St",
          city: "San Francisco",
          state: "California",
          country: "United States of America",
          lat: 37.7749,
          lng: -122.4194,
          name: "Whisker's Getaway",
          description: "An exciting play area with climbing structures and plenty of toys. Your cat can enjoy endless hours of entertainment, socialize with other cats, and indulge in the best treats available.",
          price: 109.99
        },
        // 16
        {
          ownerId: 3,
          address: "321 Paws Rd",
          city: "Oakland",
          state: "California",
          country: "United States of America",
          lat: 37.8044,
          lng: -122.2711,
          name: "Pawsome Place",
          description: "A cozy spot with comfortable beds and delicious treats. This place is ideal for a restful stay, with plenty of play areas and a tranquil environment that will make any cat feel at home.",
          price: 129.99
        },
        // 17
        {
          ownerId: 4,
          address: "654 Catnip Cir",
          city: "Mountain View",
          state: "California",
          country: "United States of America",
          lat: 37.3861,
          lng: -122.0838,
          name: "Catnip Castle",
          description: "A luxurious stay with endless supplies of catnip and fun. Featuring regal lounging areas, interactive play zones, and a plethora of catnip toys, this castle is a dream come true for any cat.",
          price: 139.99
        },
        // 18
        {
          ownerId: 5,
          address: "987 Furball Dr",
          city: "Santa Clara",
          state: "California",
          country: "United States of America",
          lat: 37.3541,
          lng: -121.9552,
          name: "Furball Funhouse",
          description: "A place where your furry friend can have a ball of a time. With multiple playrooms, an array of toys, and comfortable resting spots, this funhouse ensures your cat has the best experience.",
          price: 119.99
        },
        // 19
        {
          ownerId: 2,
          address: "159 Whisker Ln",
          city: "Sunnyvale",
          state: "California",
          country: "United States of America",
          lat: 37.3688,
          lng: -122.0363,
          name: "Whisker Oasis",
          description: "A peaceful retreat with plenty of space to roam and explore. This oasis offers tranquil gardens, cozy napping spots, and engaging activities, making it the perfect getaway for any cat.",
          price: 89.99
        },
        // 20
        {
          ownerId: 1,
          address: "753 Claw Crescent",
          city: "Redwood City",
          state: "California",
          country: "United States of America",
          lat: 37.4852,
          lng: -122.2364,
          name: "Claw Crescent Hideaway",
          description: "A hidden gem with plenty of entertainment for your feline friend. Featuring secret nooks, interactive play zones, and luxurious resting areas, this hideaway is perfect for adventurous cats.",
          price: 149.99
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
