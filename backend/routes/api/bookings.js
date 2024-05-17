const express = require("express");
const bcrypt = require("bcryptjs");

const { check } = require("express-validator");
const { handleValidationErrors } = require("../../utils/validation");

const { Op, json } = require("sequelize");

const { setTokenCookie, requireAuth } = require("../../utils/auth");
const {
  Spot,
  User,
  Booking,
  Review,
  ReviewImage,
  SpotImage,
} = require("../../db/models");
const e = require("express");

const router = express.Router();

// previewImages Helper Function

async function previewImage(spots) {
  for (let spot of spots) {
    let images = await SpotImage.findAll({
      where: {
        spotId: spot.id,
      },
    });
    //   console.log(images)

    let url = null;
    if (images.length > 0) {
      url = images[0].dataValues.url;
    }

    spot.Spot.dataValues.previewImage = url;
  }
}

// Get all of the Current User's Bookings -------------------------------------------------

router.get("/current", requireAuth, async (req, res) => {
  const currentUser = req.user.id;

  let currentBookings = await Booking.findAll({
    where: {
      userId: currentUser,
    },
    include: [
      {
        model: Spot,
        attributes: {
          exclude: ["description", "createdAt", "updatedAt"],
        },
      },
    ],
  });

  await previewImage(currentBookings);

  res.status(200).json({ Bookings: currentBookings });

  // * for exact response body order

  // res.status(200).json({
  //     Bookings: currentBookings.map(booking => {
  //         return {
  //             id: booking.id,
  //             spotId: booking.spotId,
  //             Spot: {
  //                 id: booking.Spot.id,
  //                 ownerId: booking.Spot.ownerId,
  //                 address: booking.Spot.address,
  //                 city: booking.Spot.city,
  //                 state: booking.Spot.state,
  //                 country: booking.Spot.country,
  //                 lat: booking.Spot.lat,
  //                 lng: booking.Spot.lng,
  //                 name: booking.Spot.name,
  //                 price: booking.Spot.price,
  //                 previewImage: booking.Spot.dataValues.previewImage
  //             },
  //             userId: booking.userId,
  //             startDate: booking.startDate,
  //             endDate: booking.endDate,
  //             createdAt: booking.createdAt,
  //             updatedAt: booking.updatedAt
  //         };
  //     })
  // });
});

// Edit a Booking

router.put("/:bookingId", requireAuth, async (req, res) => {
  const bookingId = req.params.bookingId;
  const user = req.user.id;
  const { startDate, endDate } = req.body;

  let currentBooking = await Booking.findByPk(bookingId);

  //Check if no bookings
  if (!currentBooking)
    return res.status(404).json({
      message: "Booking couldn't be found -- does not exist",
    });

  // Check if there are overlapping bookings conflicts
  let overlappingBookings = await Booking.findOne({
    where: {
      spotId: currentBooking.spotId,
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
                [Op.eq]: startDate,
              },
            },
            {
              endDate: {
                [Op.eq]: endDate,
              },
            },
          ],
        },
      ],
    },
  });

  if (overlappingBookings) {
    return res.status(403).json({
      message: "Sorry, this spot is already booked for the specified dates",
    });
  }
  // ! Can't edit a booking that's past the end date -- wonky?
  if (currentBooking.endDate < new Date()) {
    return res.status(400).json({
      message: "Past bookings can't be modified",
    });
  }
  // Check if the booking belongs to the current User -- yes
  if (currentBooking.userId === user) {
    if (startDate !== undefined) currentBooking.startDate = startDate;
    if (endDate !== undefined) currentBooking.endDate = endDate;

    await currentBooking.save();

    res.status(200).json(currentBooking);
  } else {
    res.status(401).json({
      message: "You are not authorized to update this booking",
    });
  }
});

// Delete a Booking ----------------------------------------------------------------------
router.delete("/:bookingId", requireAuth, async (req, res) => {
  const bookingId = req.params.bookingId;
  const user = req.user.id;

  let currentBooking = await Booking.findByPk(bookingId);

  // Can't find booking with specified id
  if (!currentBooking) {
    return res.status(404).json({
      message: "Booking couldn't be found",
    });
  }
  // ! Check if the booking's start date is in the past -- not too sure how to test this
  const currentDate = new Date();
  if (currentBooking.startDate < currentDate) {
    return res.status(400).json({
      message: "Bookings that have been started can't be deleted",
    });
  }

  // Booking belongs to current user or spot belongs to current User
  if (currentBooking.userId === user) {
    // Delete the booking and return a success message
    await currentBooking.destroy();
    return res.status(200).json({
      message: "Successfully deleted",
    });
  } else {
    return res.status(403).json({
        message: "You do not have permission to delete this booking"
    })
  }
});

module.exports = router;
