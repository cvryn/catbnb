const express = require('express');
const bcrypt = require('bcryptjs');

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const { Op } = require('sequelize');

const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { Spot, User,  Booking, Review, ReviewImage, SpotImage } = require('../../db/models');

const router = express.Router();


//Get all Spots
router.get("/spots", async (req, res, next) => {
    const spots = await Spot.findAll()

    res.json(spots)
} );



// Get All Current Spots
router.get('/spots/current', requireAuth, async (req, res) => {


})



module.exports = router;
