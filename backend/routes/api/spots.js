const express = require("express");
const bcrypt = require("bcryptjs");

const { check } = require("express-validator");
const { handleValidationErrors } = require("../../utils/validation");

const { Op } = require("sequelize");

const { setTokenCookie, requireAuth } = require("../../utils/auth");
const {
  Spot,
  User,
  Booking,
  Review,
  ReviewImage,
  SpotImage,
} = require("../../db/models");

const router = express.Router();

//avgRating helper function
async function avgRatings(spots) {
  // spots is an array of objects
  // for loop to iterate through each spot object
  for (let spot of spots) {
    //find all reviews
    let reviews = await Review.findAll({
      // spotId : 1 on first iteration
      where: {
        spotId: spot.id,
      },
    });
    let totalStars = reviews.reduce((sum, reviews) => sum + reviews.stars, 0);
    //   console.log(reviews)
    spot.dataValues.avgRating = totalStars / reviews.length;
  }
}

// previewImage helper function

async function previewImage (spots) {
    for (let spot of spots) {
        // console.log(spots)
        let images = await SpotImage.findAll({
            attributes: ['url'],
            where: {
                spotId: spot.id,
            }
        })
        spot.dataValues.previewImage = images[0].url
    }

}



//Get all Spots
router.get("/", async (req, res, next) => {
  const spots = await Spot.findAll();
  await avgRatings(spots);
  await previewImage(spots)

  res.json({ Spots: spots });
});

// Get All Current Spots
router.get("/current", requireAuth, async (req, res) => {});

module.exports = router;
