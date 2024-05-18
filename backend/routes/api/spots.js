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
    spot.dataValues.avgRating = (totalStars / reviews.length).toFixed(2);
  }
}

// previewImage helper function

async function previewImage(spots) {
  for (let spot of spots) {
    let images = await SpotImage.findAll({
      attributes: ["url"],
      where: {
        spotId: spot.id,
      },
    });

    if (images.length > 0) {
      let url = images[0].url;
      spot.dataValues.previewImage = url;
    } else {
      // If no images found, set a default preview image
      spot.dataValues.previewImage = "default_image_url";
    }
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

  // It's query time ==================================================================
  let { page = 1, size = 20, minLat, maxLat, minLng, maxLng, minPrice, maxPrice } = req.query


  // Create empty errors obj to store errors
  const errors = {};

  // Validate query parameters
  if (isNaN(page) || page < 1) {
    errors.page = "Page must be greater than or equal to 1";
  }
  if (isNaN(size) || size < 1 || size > 20) {
    errors.size = "Size must be greater than or equal to 1 and less than or equal to 20";
  }
  if (minLat !== undefined && isNaN(minLat)) {
    errors.minLat = "Minimum latitude is invalid";
  }
  if (maxLat !== undefined && isNaN(maxLat)) {
    errors.maxLat = "Maximum latitude is invalid";
  }
  if (minLng !== undefined && isNaN(minLng)) {
    errors.minLng = "Minimum longitude is invalid";
  }
  if (maxLng !== undefined && isNaN(maxLng)) {
    errors.maxLng = "Maximum longitude is invalid";
  }
  if (minPrice !== undefined && (isNaN(minPrice) || minPrice < 0)) {
    errors.minPrice = "Minimum price must be greater than or equal to 0";
  }
  if (maxPrice !== undefined && (isNaN(maxPrice) || maxPrice < 0)) {
    errors.maxPrice = "Maximum price must be greater than or equal to 0";
  }

  if (Object.keys(errors).length > 0) {
    return res.status(400).json({
      message: "Bad Request",
      errors,
    });
  }

  page = +page;
  size = +size;

  const pagination = {};
  if (minLat) pagination.lat = { [Op.gte]: +(minLat) };
  if (maxLat) pagination.lat = { ...pagination.lat, [Op.lte]: +(maxLat) };
  if (minLng) pagination.lng = { [Op.gte]: +(minLng) };
  if (maxLng) pagination.lng = { ...pagination.lng, [Op.lte]: +(maxLng) };
  if (minPrice) pagination.price = { [Op.gte]: +(minPrice) };
  if (maxPrice) pagination.price = { ...pagination.price, [Op.lte]: +(maxPrice) };

  // precious code ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  const spots = await Spot.findAll({
    where: pagination,
    limit: size,
    offset: size * (page - 1),
  });

  await avgRatings(spots);
  await previewImage(spots);

  res.status(200).json({ Spots: spots, page, size });
  // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
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

// Get details of a Spot from an id ----------------------------------------------------------
router.get("/:spotId", async (req, res) => {
  // console.log(req.params.spotId)
  let id = req.params.spotId;
  // console.log(id)

  let total = await Spot.findAll();
  let totalLength = total.length;

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
  if (id > totalLength || id <= 0) {
    return res.status(404).json({
      message: "Spot couldn't be found",
    });
  }
  await avgRatings(spots);
  await numReviews(spots);

  res.json(spots);
});

// Create a Spot ------------------------------------------------------------------------------------------
router.post("/", requireAuth, async (req, res) => {
  const { address, city, state, country, lat, lng, name, description, price } =
    req.body;

  let ownerId = +req.user.id;

  // ERROR RESPONSE BODY FOR CREATING SPOT
  let err = new Error("Bad Request");
  err.status = 400;
  err.errors = {};

  if (!address || address.trim() === "") {
    err.errors.address = "Street address is required";
  }
  if (!city || city.trim() === "") {
    err.errors.city = "City is required";
  }
  if (!state || state.trim() === "") {
    err.errors.state = "State is required";
  }
  if (!country || country.trim() === "") {
    err.errors.country = "Country is required";
  }
  if (!lat || lat < -90 || lat > 90 || lat.toString().trim() === "") {
    err.errors.lat = "Latitude must be within -90 and 90";
  }
  if (!lng || lng < -180 || lng > 180 || lng.toString().trim() === "") {
    err.errors.lng = "Longitude must be within -180 and 180";
  }
  if (!name || name.length > 50 || name.trim() === "") {
    err.errors.name = "Name must be less than 50 characters";
  }
  if (!description || description.trim() === "") {
    err.errors.description = "Description is required";
  }
  if (!price || price < 0 || price.toString().includes(" ")) {
    err.errors.price = "Price per day must be a positive number";
  }
  if (Object.keys(err.errors).length) throw err;

  // REQUEST CREATE SPOT
  let newSpot = await Spot.create({
    ownerId: +ownerId,
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

// Add an Image to a Spot based on the Spot's id ------------------------------------------------------------------------

router.post("/:spotId/images", requireAuth, async (req, res) => {
  let spotId = req.params.spotId; // that is being entered into the url
  let currentOwnerId = req.user.id; // currently logged in user - 3

  let currentSpot = await Spot.findByPk(spotId);

  let allSpots = await Spot
    .findAll
    // {
    //   where: {
    //     ownerId: currentOwnerId
    //   }
    // }
    ();
  let length = allSpots.length; // find how many spots are total

  if (spotId > length || spotId <= 0) {
    return res.status(404).json({
      message: "Spot couldn't be found",
    });
  }
  let owner = currentSpot.ownerId;

  if (currentOwnerId === owner) {
    const { url, preview } = req.body;
    let newImg = await SpotImage.create({
      spotId: +spotId,
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

// Edit a Spot --------------------------------------------------------------------------------------------------------
router.put("/:spotId", requireAuth, async (req, res) => {
  const spotId = req.params.spotId; // current spot id
  const currentOwnerId = req.user.id; // current user id
  const updateSpot = await Spot.findByPk(spotId);

  const { address, city, state, country, lat, lng, name, description, price } =
    req.body;

  let err = new Error("Bad Request");
  err.status = 400;
  err.errors = {};

  if (!address || address.trim() === "") {
    err.errors.address = "Street address is required";
  }
  if (!city || city.trim() === "") {
    err.errors.city = "City is required";
  }
  if (!state || state.trim() === "") {
    err.errors.state = "State is required";
  }
  if (!country || country.trim() === "") {
    err.errors.country = "Country is required";
  }
  if (!lat || lat < -90 || lat > 90 || lat.toString().trim() === "") {
    err.errors.lat = "Latitude must be within -90 and 90";
  }
  if (!lng || lng < -180 || lng > 180 || lng.toString().trim() === "") {
    err.errors.lng = "Longitude must be within -180 and 180";
  }
  if (!name || name.length > 50 || name.trim() === "") {
    err.errors.name = "Name must be less than 50 characters";
  }
  if (!description || description.trim() === "") {
    err.errors.description = "Description is required";
  }
  if (!price || price < 0 || price.toString().includes(" ")) {
    err.errors.price = "Price per day must be a positive number";
  }
  if (Object.keys(err.errors).length) throw err;

  let allSpots = await Spot.findAll();
  let length = allSpots.length;

  // if spot doesn't exist
  if (spotId > length || spotId <= 0) {
    return res.status(404).json({
      message: "Spot couldn't be found",
    });
  }

  let owner = updateSpot.ownerId;
  // spot belongs to the owner
  // already checked if the attributes exist above, so can remove that part
  if (currentOwnerId === owner) {
    if (address !== undefined) updateSpot.address = address;
    if (city !== undefined) updateSpot.city = city;
    if (state !== undefined) updateSpot.state = state;
    if (country !== undefined) updateSpot.country = country;
    if (lat !== undefined) updateSpot.lat = lat;
    if (lng !== undefined) updateSpot.lng = lng;
    if (name !== undefined) updateSpot.name = name;
    if (description !== undefined) updateSpot.description = description;
    if (price !== undefined) updateSpot.price = price;

    await updateSpot.save();

    res.json(updateSpot);
  } else {
    return res.status(404).json({
      message: "Spot couldn't be found -- not the owner",
    });
  }
});

// Delete a Spot -------------------------------------------------------------------------------------------------------
router.delete("/:spotId", requireAuth, async (req, res) => {
  let spotId = parseInt(req.params.spotId);
  let currentOwnerId = req.user.id;

  let currentSpot = await Spot.findByPk(spotId);

  if (!currentSpot) {
    return res.status(404).json({
      message: "Spot couldn't be found -- doesn't exist",
    });
  }

  let owner = currentSpot.ownerId;

  if (currentOwnerId === owner) {
    currentSpot.destroy();
    res.json({
      message: "Successfully deleted",
    });
  } else {
    return res.status(404).json({
      message: "Wrong User",
    });
  }
});

// Get All Reviews by a Spot's Id -------------------------------------------------------------------

router.get("/:spotId/reviews", async (req, res) => {
  let spotId = req.params.spotId;

  let spotReviews = await Review.findAll({
    where: {
      spotId: spotId,
    },
    include: [
      {
        model: User,
        attributes: ["id", "firstName", "lastName"],
      },
      {
        model: ReviewImage,
        attributes: ["id", "url"],
      },
    ],
  });

  let total = await Spot.findAll();
  let totalLength = total.length;

  if (spotId > totalLength || spotId <= 0) {
    return res.status(404).json({
      message: "Spot couldn't be found",
    });
  }

  res.status(200).json({ Reviews: spotReviews });
});

// Create a Review for a Spot based on SpotId -------------------

router.post("/:spotId/reviews", requireAuth, async (req, res) => {
  const { spotId } = req.params;
  const userId = req.user.id;
  const { review, stars } = req.body;

    // Check if spot exists
    const spot = await Spot.findByPk(spotId);
    if (!spot) {
      return res.status(404).json({
        message: "Spot couldn't be found",
      });
    }

    // Validate review and stars
    const errors = {};
    if (!review || review.trim() === "") {
      errors.review = "Review text is required";
    }
    if (!stars || stars > 5 || stars < 1 || stars.toString().trim() === "") {
      errors.stars = "Stars must be an integer from 1 to 5";
    }

    if (Object.keys(errors).length > 0) {
      return res.status(400).json({
        message: "Bad Request",
        errors,
      });
    }

    // Check if user already left a review for this spot
    const leftReview = await Review.findOne({
      where: {
        spotId: spotId,
        userId: userId,
      },
    });

    if (leftReview) {
      return res.status(403).json({
        message: "You have already left a review for this place",
      });
    }

    // Create new review
    const newReview = await Review.create({
      userId,
      spotId,
      review,
      stars,
    });

    res.status(201).json(newReview);
  });

// Get all Bookings for a Spot based on the Spot's id ---------------------

router.get("/:spotId/bookings", requireAuth, async (req, res) => {
  const spotId = req.params.spotId; // 2
  let user = req.user.id; // 2

  // find info on current Spot
  let currentSpot = await Spot.findByPk(spotId);

  if (!currentSpot) {
    return res.status(404).json({
      message: "Spot couldn't be found",
    });
  }

  let owner = currentSpot.ownerId;
  // console.log(owner) // 2

  // You are NOT the owner
  if (owner !== user) {
    let notMyBookings = await Booking.findAll({
      where: {
        spotId: spotId,
      },
    });

    res.status(200).json({
      Bookings: notMyBookings.map((booking) => ({
        spotId: booking.spotId,
        startDate: booking.startDate,
        endDate: booking.endDate,
      })),
    });

    // You ARE THE OWNER
  } else {
    let myBookings = await Booking.findAll({
      where: {
        spotId: spotId,
      },
      include: [
        {
          model: User,
          attributes: ["id", "firstName", "lastName"],
        },
      ],
    });
    // res.status(200).json({ Bookings: notMyBookings });

    // * In the same order as API docs

    res.status(200).json({
      Bookings: myBookings.map((booking) => ({
        User: {
          id: booking.User.id,
          firstName: booking.User.firstName,
          lastName: booking.User.lastName,
        },
        id: booking.id,
        spotId: booking.spotId,
        userId: booking.userId,
        startDate: booking.startDate,
        endDate: booking.endDate,
        createdAt: booking.createdAt,
        updatedAt: booking.updatedAt,
      })),
    });
  }
});

// Create a Booking from a Spot based on the Spot's id ----------------------------

router.post("/:spotId/bookings", requireAuth, async (req, res) => {
  let spotId = req.params.spotId; // 2 -- yes to owned?
  let user = req.user.id; // logged in user -- 2

  // find info on current Spot
  let currentSpot = await Spot.findByPk(spotId);

  //if spot doesn't exist
  if (!currentSpot) {
    return res.status(404).json({
      message: "Spot couldn't be found",
    });
  }

  let owner = currentSpot.ownerId;
  // console.log(owner) // 2

  const { startDate, endDate } = req.body;

  //throw error is any input is left blank or whitespace
  let err = new Error("Bad Request");
  err.status = 400;
  err.errors = {};

  if (!startDate || startDate.trim() === "") {
    err.errors.startDate = "startDate is required";
  } else {
    let currentDate = new Date();
    let startDateDate = new Date(startDate);

    // if (startDateDate < currentDate) {
    //   err.errors.startDate = "startDate cannot be in the past";
    // }
  }
  if (!endDate || endDate.trim() === "") {
    err.errors.endDate = "endDate is required";
  } else {
    let startDateDate = new Date(startDate);
    let endDateDate = new Date(endDate);

    if (endDateDate <= startDateDate) {
      err.errors.endDate = "endDate cannot be on or before startDate";
    }
  }

  if (Object.keys(err.errors).length) throw err;

  // Check for overlapping bookings
  let overlappingBookings = await Booking.findOne({
    where: {
      spotId: spotId,
      [Op.or]: [
        {
          startDate: {
            [Op.between]: [startDate, endDate],
          },
        },
        {
          endDate: {
            [Op.between]: [startDate, endDate],
          },
        },
        {
          [Op.and]: [
            {
              startDate: {
                [Op.lte]: startDate,
              },
            },
            {
              endDate: {
                [Op.gte]: endDate,
              },
            },
          ],
        },
      ],
    },
  });

  if (overlappingBookings) {
    let errors = {
      startDate: "Start date conflicts with an existing booking",
      endDate: "End date conflicts with an existing booking",
    };
    return res.status(403).json({
      message: "Sorry, this spot is already booked for the specified dates",
      errors: errors,
    });
  }

  // You are NOT the owner of this spot
  if (owner !== user) {
    let notMySpot = await Booking.create({
      spotId: spotId,
      userId: user,
      startDate,
      endDate,
    });
    res.status(200).json(notMySpot);
    // You ARE THE OWNER of this spot
  } else {
    res.status(403).json({
      message:
        "You are not authorized to make a booking because you own this place",

    });
  }
});

module.exports = router;
