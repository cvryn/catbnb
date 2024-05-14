const express = require('express');
const bcrypt = require('bcryptjs');

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const { Op } = require('sequelize');

const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { Spot, User, Booking, Review, ReviewImage, SpotImage } = require('../../db/models');

const router = express.Router();


// TEST ROUTE
// router.get('/', async (req,res) => {
//     let review = await Review.findAll()
//     res.json(review)

// })

// 



module.exports = router;
