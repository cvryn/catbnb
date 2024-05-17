const express = require('express');
const bcrypt = require('bcryptjs');

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const { Op } = require('sequelize');

const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { Spot, User, Booking, Review, ReviewImage, SpotImage } = require('../../db/models');

const router = express.Router();


// ENDPOINTS!

// Delete a Spot Image ---------------------------------------------------------

// router.delete('/:imageId', requireAuth, async (req, res) => {
//     const imageId = req.params.imageId
//     const user = req.user.id
//     // console.log(imageId)

//     // Couldn't find spot
//     const currentImage = await SpotImage.findByPk(imageId);

//     if (!currentImage) {
//         res.status(404).json({
//             message: " Spot Image couldn't be found"
//         })
//     }


//     // Spot must belong to the current user, then delete
//     if (user)
//     res.status(200).json('hello')
// })









module.exports = router;
