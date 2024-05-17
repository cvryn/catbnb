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

// Delete an Image for a Review
router.delete("/:imageId", requireAuth, async (req, res) => {
  const imageId = req.params.imageId;
  const user = req.user.id;

  // Find the current image by ID
  const currentReviewImage = await ReviewImage.findByPk(imageId);

  // If the image doesn't exist
  if (!currentReviewImage) {
    return res.status(404).json({
      message: "Review Image couldn't be found",
    });
  }

  // Find the review the image belongs to
  const review = await Review.findOne({
    where: {
      id: currentReviewImage.reviewId,
    },
  });

//   console.log(review.userId)
  // If the review does belong to the current user
  if (review.userId === user) {
    await currentReviewImage.destroy();
    return res.status(200).json({
      message: "Successfully deleted",
    });
  } else {
    return res.status(403).json({
      message: "This user is not authorized to delete this review image",
    });
  }
});

module.exports = router;
