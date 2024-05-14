const express = require('express');
const bcrypt = require('bcryptjs');

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const { Op } = require('sequelize');

const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { Spot, User, Booking, Review, ReviewImage, SpotImage } = require('../../db/models');

const router = express.Router();


//Get all bookings -- TESTING WORKS
router.get('/', async (req,res) => {
    let booking = await Booking.findAll({
        where: {
            spotId: 1
        }
    })
    res.json(booking)

})



module.exports = router;
