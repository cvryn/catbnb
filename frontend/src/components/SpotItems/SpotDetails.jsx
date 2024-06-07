import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSpotById } from "../../store/spotsReducer";
import { TiStarFullOutline } from "react-icons/ti";
import { getReviews } from "../../store/reviewReducer";

import OpenModalButton from "../OpenModalButton/OpenModalButton";
import DeleteReviewModal from "../Reviews/DeleteReviewModal";

import noimage from "../../../src/assets/no-image-available.jpg";

import "./SpotDetails.css";

const SpotDetails = () => {
  const dispatch = useDispatch();
  const { spotId } = useParams();
  const [isLoaded, setIsLoaded] = useState(false);

  // Get all spots and current spot from the Redux store
  const spots = useSelector((state) => state.spots.allSpots[spotId]);
  console.log("ALLLLLLLL SPOTS", spots);
  const currentSpot = useSelector((state) => state.spots.currentSpot[0]);
  console.log(
    "%c currrrrrrrrrrrrrrrrrrrrrrrrrrrrr",
    "color: orange",
    currentSpot
  );

  // Get the reviews for the current spot
  const reviews = useSelector((state) => state.reviews.Reviews);
  // console.log("SHOW DEM REVIEWS", reviews);

  const user = useSelector((state) => state.session.user);
  // console.log(`WHOOOOOOOOOOOOOOO DIS`, user);

  useEffect(() => {
    const fetchData = async () => {
      await Promise.all([
        dispatch(getSpotById(spotId)),
        dispatch(getReviews(spotId)),
      ]);
      setIsLoaded(true);
    };

    fetchData();
  }, [dispatch, spotId]);

  const reserveButtonClick = () => {
    alert("Feature Coming Soon...");
  };

  // If data is not loaded yet, show a loading message
  if (!isLoaded || !currentSpot)
    return (
      <div
        style={{
          textAlign: "center",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <h1>Loading right meow...</h1>
        <img
          style={{ width: "1000px" }}
          src="https://res.cloudinary.com/dfj8lsesn/image/upload/v1717520571/catbnb/loading-cat_egosvf.gif"
          alt="Loading Cat"
        />
      </div>
    );

  return (
    <>
      {/* <h1>ʕ*•ﻌ•ʔฅ</h1> */}
      <div id="spot-detail-container">
        <section className="listing-name-container">
          <h1>{currentSpot.name}</h1>
          <span className="location">
            {currentSpot.city}, {currentSpot.state}, {currentSpot.country}
          </span>
        </section>

        <div className="images-container">
          <div className="main-image-left">
            <img
              className="main-image"
              src={
                currentSpot?.SpotImages[0]?.url || noimage
              }
              alt="Main spots"
            />
          </div>
          <div className="images-container-right">
            <img
              className="side-image"
              src={
                currentSpot?.SpotImages[1]?.url ||
                noimage
              }
              alt="spots pic"
            />
            <img
              className="side-image"
              src={
                currentSpot?.SpotImages[2]?.url ||
                noimage
              }
              alt="spots pic"
              style={{ borderTopRightRadius: "10px" }}
            />
            <img
              className="side-image"
              src={
                currentSpot?.SpotImages[3]?.url ||
                noimage
              }
              alt="spots pic"
            />
            <img
              className="side-image"
              src={
                currentSpot?.SpotImages[4]?.url ||
                noimage
              }
              alt="Spot pic"
              style={{ borderBottomRightRadius: "10px" }}
            />
          </div>
        </div>

        <section className="location-info-container-mid">
          <div className="owner-description-container">
            <h2 className="owner-info">
              Hosted by {currentSpot?.Owner?.firstName}{" "}
              {currentSpot?.Owner?.lastName}
            </h2>
            <p className="description" style={{ width: "90%" }}>
              {currentSpot.description}
            </p>
          </div>
          <div className="reserve-container">
            <div className="reserve-top">
              <div className="price-details">
                ${currentSpot.price}{" "}
                <span className="price-span-details">night</span>
              </div>
              <div className="reviews-details">
                <TiStarFullOutline />
                {isNaN(currentSpot.avgRating) ||
                currentSpot.avgRating === undefined
                  ? "New"
                  : currentSpot.avgRating}{" "}
                {isNaN(currentSpot.avgRating) ||
                currentSpot.avgRating === undefined
                  ? ""
                  : "·"}{" "}
                {currentSpot.numReviews === 1
                  ? "1 review"
                  : currentSpot.numReviews > 1
                  ? `${currentSpot.numReviews} reviews`
                  : ""}
              </div>
            </div>
            <div style={{ paddingTop: "20px" }}>
              <button className="reserve-button" onClick={reserveButtonClick}>
                Reserve
              </button>
            </div>
          </div>
        </section>

        <section id="reviews-container">
          <div className="star-and-reviews-container">
            <TiStarFullOutline className="star-reviews-num" />
            {isNaN(currentSpot.avgRating) || currentSpot.avgRating === undefined
              ? "New"
              : currentSpot.avgRating}{" "}
            {isNaN(currentSpot.avgRating) || currentSpot.avgRating === undefined
              ? ""
              : "·"}{" "}
            {currentSpot.numReviews === 1
              ? "1 review"
              : currentSpot.numReviews > 1
              ? `${currentSpot.numReviews} reviews`
              : ""}
          </div>
          <div className="reviews-from-the-cats">
            {reviews &&
              reviews.length > 0 &&
              reviews.map((review, index) => {
                const createdAtDate = new Date(review.createdAt);
                const month = createdAtDate.toLocaleString("default", {
                  month: "long",
                });
                const year = createdAtDate.getFullYear();

                return (
                  <div key={index} className="actual-reviews">
                    <span style={{ fontSize: "18px" }}>
                      {review.User.firstName}
                    </span>
                    <span
                      style={{ fontSize: "14px" }}
                    >{`${month} ${year}`}</span>
                    <span style={{ fontSize: "12px" }}>{review.review}</span>
                    {user && user.id === review.userId && (
                      <div id="delete-review-button">
                        <OpenModalButton
                          buttonText={"Delete"}
                          modalComponent={
                            <DeleteReviewModal
                              reviewId={review.id}
                              spotId={spotId}
                            />
                          }
                        />
                      </div>
                    )}
                  </div>
                );
              })}
          </div>
        </section>
      </div>
    </>
  );
};

export default SpotDetails;
