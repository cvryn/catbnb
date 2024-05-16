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

//Get all Spots -----------------------------------------------------------------------------
router.get("/", async (req, res, next) => {
  const spots = await Spot.findAll();
  await avgRatings(spots);
  await previewImage(spots);

  res.json({ Spots: spots });
});

// Get All Spots owned by the Current User --------------------------------------------------
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

// Get details of a Spot from an id --------------------------------------------------------
router.get("/:spotId", async (req, res) => {
  // console.log(req.params.spotId)
  let id = req.params.spotId;
  // console.log(id)

  let total = await Spot.findAll();
  let totalLength = total.length;
  // console.log(totalLength)

  let spots = await Spot.findAll({
    where: {
      id: id,
    },
    include: [
      {
        model: SpotImage,
        attributes: ["id", "url", "preview"],
      },
      {
        model: User,
        as: "Owner",
        attributes: ["id", "firstName", "lastName"],
      },
    ],
  });

  // let numId = +id
  // console.log(id > totalLength)
  // console.log((typeof numId))
  if (id > totalLength) {
    return res.status(404).json({
      message: "Spot couldn't be found",
    });
  }
  await avgRatings(spots);
  await numReviews(spots);

  res.json(spots);
});

// Create a Spot ----------------------------------------------------------------------------
router.post("/", requireAuth, async (req, res) => {
  const {
    ownerId,
    address,
    city,
    state,
    country,
    lat,
    lng,
    name,
    description,
    price,
  } = req.body;

  // ERROR RESPONSE BODY FOR CREATING SPOT
  let err = new Error("Bad Request");
  err.status = 400;
  err.errors = {};

  if (!address) {
    err.errors.address = "Street address is required";
  }
  if (!city) {
    err.errors.city = "City is required";
  }
  if (!state) {
    err.errors.state = "State is required";
  }
  if (!country) {
    err.errors.country = "Country is required";
  }
  if (!lat || lat < -90 || lat > 90) {
    err.errors.lat = "Latitude must be within -90 and 90";
  }
  if (!lng || lng < -180 || lng > 180) {
    err.errors.lng = "Longitude must be within -180 and 180";
  }
  if (!name || name.length > 50) {
    err.errors.name = "Name must be less than 50 characters";
  }
  if (!description) {
    err.errors.description = "Description is required";
  }
  if (!price || price < 0) {
    err.errors.price = "Price per day must be a positive number";
  }
  if (Object.keys(err.errors).length) throw err;

  // REQUEST CREATE SPOT
  let newSpot = await Spot.create({
    ownerId,
    address,
    city,
    state,
    country,
    lat,
    lng,
    name,
    description,
    price,
  });

  // await Spot.save()
  return res.status(201).json(newSpot);
});

// Add an Image to a Spot based on the Spot's id

router.post("/:spotId/images", requireAuth, async (req, res) => {
  let spotId = req.params.spotId; // that is being entered into the url
  let currentOwnerId = req.user.id; // currently logged in user - 3

  let currentSpot = await Spot.findByPk(spotId);

  let allSpots = await Spot.findAll(
    // {
    //   where: {
    //     ownerId: currentOwnerId
    //   }
    // }
  ); // find all spots
  let length = allSpots.length; // find how many spots are total
  console.log(length)

  if (spotId > length) {
    return res.status(404).json({
      message: "Spot couldn't be found",
    });
  }
    let owner = currentSpot.ownerId;

    if (currentOwnerId === owner) {
      const { url, preview } = req.body;
      let newImg = await SpotImage.create({
        where: { spotId: spotId },
        url,
        preview,
      });
      res.json(newImg);
    } else {
      return res.status(404).json({
        message: "Wrong User",
      });
    }
});

// Edit a Spot

// Delete a Spot

module.exports = router;
