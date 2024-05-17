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

// ENDPOINTS!

// Delete a Spot Image ---------------------------------------------------------
router.delete("/:imageId", requireAuth, async (req, res) => {
  const imageId = req.params.imageId;
  const user = req.user.id;

  // Find the current image by ID
  const currentImage = await SpotImage.findByPk(imageId);

  // If the image doesn't exist
  if (!currentImage) {
    return res.status(404).json({
      message: "Spot Image couldn't be found",
    });
  }

  // Find the spot associated with the image
  const spot = await Spot.findOne({
    where: {
      id: currentImage.spotId,
    },
  });

  // If the spot doesn't belong to the current user
  if (spot.ownerId !== user) {
    return res.status(403).json({
      message: "This user is not authorized to delete this spot image",
    });
  }

  // If the image is a preview image and belongs to user
  if (currentImage.preview === true) {
    const newImage = await SpotImage.findOne({
      where: {
        spotId: currentImage.spotId,
        preview: false,
      },
    });

    // If no new image exists, delete the current image
    if (!newImage) {
      await currentImage.destroy();
      return res.status(200).json({
        message: "Successfully deleted",
      });
    }
  }

  await currentImage.destroy();

  return res.status(200).json({
    message: "Successfully deleted",
  });
});

module.exports = router;
