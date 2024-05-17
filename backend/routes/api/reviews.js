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
const e = require("express");

const router = express.Router();

// TEST ROUTE
// router.get('/', async (req,res) => {
//     let review = await Review.findAll()
//     res.json(review)

// })

// previewImage Helper Function
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

// Get All Reviews of the Current User ------------------------------------------------------

router.get("/current", requireAuth, async (req, res) => {
  const { id } = req.user; // user id

  let reviews = await Review.findAll({
    where: { userId: id },
    include: [
      {
        model: User,
        attributes: ["id", "firstName", "lastName"],
      },
      {
        model: Spot,
        attributes: {
          exclude: ["description"],
        },
        //   attributes: ['id', 'ownerId','address','city','state','country','lat','lng','name','price','previewImage']
      },
      {
        model: ReviewImage,
        attributes: ["id", "url"],
      },
    ],
  });

  await previewImage(reviews);

  res.json({ Reviews: reviews });
});

// Add an Image to a Review based on the Review's id ----------------------------------------

router.post("/:reviewId/images", requireAuth, async (req, res) => {
  const reviewId = req.params.reviewId; // 1
  const user = req.user.id; // 2

  // find all reviews
  let allReviews = await Review.findAll();
  let numReviews = allReviews.length;

  if (reviewId > numReviews || reviewId <= 0) {
    return res.status(404).json({
      message: "Review couldn't be found",
    });
  }

  // cannot submit more than 10 images to one place, find all reviews on that review that belong to that place
  let allRevImages = await ReviewImage.findAll({
    where: {
      reviewId: reviewId,
    },
  });
  // console.log(allRevImages.length)
  console.log(allRevImages);

  // find reviews by current review
  let currentReview = await Review.findByPk(reviewId);

  if (allRevImages.length >= 10) {
    return res.status(403).json({
      message: "Maximum number of images for this resource was reached",
    });
  }

  if (currentReview.userId === user) {
    const { url } = req.body;

    let newReview = await ReviewImage.create({
      reviewId: reviewId,
      url,
    });

    res.status(200).json({ id: newReview.id, url: newReview.url });
  } else {
    return res.status(404).json({
      message: "This user is unable to add an image to this review",
    });
  }
});
// !  WHAT IF THE IMAGE IS LEFT BLANK???

// Edit a Review ------------------------------------------------------------------

router.put("/:reviewId", requireAuth, async (req, res) => {
  const reviewId = req.params.reviewId;
  const user = req.user.id;

  // find all reviews
  let allReviews = await Review.findAll();
  let numReviews = allReviews.length;
  // if review doesn't exist
  if (reviewId > numReviews || reviewId <= 0) {
    return res.status(404).json({
      message: "Review couldn't be found",
    });
  }

  let currentReview = await Review.findByPk(reviewId);

  const { review, stars } = req.body;

  let err = new Error("Bad Request");
  err.status = 400;
  err.errors = {};

  if (!review || review.trim() === "") {
    err.errors.review = "Review text is required";
  }
  if (!stars || stars > 5 || stars < 1 || stars.toString().trim() === "") {
    err.errors.stars = "Stars must be an integer from 1 to 5";
  }

  if (Object.keys(err.errors).length) throw err;
  // checking if review belongs to current user

  if (currentReview.userId === user) {
    if (review !== undefined) currentReview.review = review;
    if (stars !== undefined) currentReview.star = stars;

    await currentReview.save();

    res.status(200).json(currentReview);
  } else {
    // ? ADDED THIS IF THE USER IS NOT THE USER WHO SUBMITTED IT, UNAUTHORIZED
    return res.status(401).json({
      message: "This user is unable to add an image to this review",
    });
  }
});

// Delete a Review Route ------------------------------------------------------------------

router.delete('/:reviewId', requireAuth, async (req, res) => {
  const reviewId = req.params.reviewId;
  const user = req.user.id

    // find this review
    let currentReview = await Review.findByPk(reviewId);

// check if current review belongs to current user

if (!currentReview) {
  return res.status(404).json({
    message: "Review couldn't be found -- doesn't exist",
  });
}
    if (currentReview.userId === user) {
      currentReview.destroy();
      return res.status(200).json({
        message: "Successfully deleted"
      })

    } else {{
      return res.status(404).json({
        message: "This user is not authorized to delete this review.",
      });
    }
    }

})


module.exports = router;
