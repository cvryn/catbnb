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
const review = require("../../db/models/review");
const spot = require("../../db/models/spot");

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
    spot.dataValues.avgRating = (totalStars / reviews.length).toFixed(2);
  }
}

// previewImage helper function

async function previewImage(spots) {
  for (let spot of spots) {
    // console.log(spots)
    let images = await SpotImage.findAll({
      attributes: ["url"],
      where: {
        spotId: spot.id,
      },
    });
    spot.dataValues.previewImage = images[0].url;
  }
}

// numReviews Helper function
async function numReviews(spots) {
  for (let spot of spots) {
    let review = await Review.findAll({
      where: {
        spotId: spot.id,
      },
    });
    spot.dataValues.numReviews = review.length;
  }
}

//Get all Spots
router.get("/", async (req, res, next) => {
  const spots = await Spot.findAll();
  await avgRatings(spots);
  await previewImage(spots);

  res.json({ Spots: spots });
});

// Get All Spots owned by the Current User
router.get("/current", requireAuth, async (req, res) => {
  // console.log(req.user)
  const { id } = req.user;
  // let id = req.user.id;
  let ownedSpots = await Spot.findAll({
    where: {
      ownerId: id,
    },
  });
  await avgRatings(ownedSpots);
  await previewImage(ownedSpots);

  res.json({ Spots: ownedSpots });
});

// Get details of a Spot from an id
router.get("/:spotId", async (req, res) => {
  // console.log(req.params.spotId)
  let id = req.params.spotId
  // console.log(id)

  let total = await Spot.findAll();
  let totalLength = total.length
  // console.log(totalLength)

  let spots = await Spot.findAll({
    where: {
      id: id,
    },
    include: [
      {
      model: SpotImage,
      attributes: ['id', 'url', 'preview'],
     },
      {
        model: User, as: "Owner",
       }
      ],
  });

  // let numId = +id
  // console.log(id > totalLength)
  // console.log((typeof numId))
  if (id > totalLength) {
    res.status(404);
    return res.json({
      "message": "Spot couldn't be found"
    })
  }
  await avgRatings(spots);
  await numReviews(spots);

  res.json(spots);

});


// Create a Spot

// Add an Image to a Spot based on the Spot's id

// Edit a Spot

// Delete a Spot

module.exports = router;
