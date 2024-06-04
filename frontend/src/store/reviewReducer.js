import { csrfFetch } from "./csrf";

/** Action Type Constants: */
export const LOAD_REVIEWS = "reviews/LOAD_REVIEWS";

/**  Action Creators: */
export const loadReviews = (reviews) => ({
  type: LOAD_REVIEWS,
  reviews,
});

/** Thunk Action Creators: */
export const getReviews = (spotId) => async (dispatch) => {
  const response = await fetch(`/api/spots/${spotId}/reviews`);
  if (response.ok) {
      const reviews = await response.json();
    //   console.log('the revssssssssssssssssssssss', reviews)
      dispatch(loadReviews(reviews));
      return reviews;
  }

};

/** Reducer: */
const initialState = { allSpots: {}, currentSpot: {} };

const reviewsReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_REVIEWS: {
      const newState = { ...state };
      const allReviews = action.reviews.Reviews;
    //   console.log("AAAAAAAAAAAAAAAAAALLLLLLLLL DA REVIEWS", allReviews)
      newState.reviews = allReviews;
      return newState;
    }
    default: {
      return state;
    }
  }
};

export default reviewsReducer;
