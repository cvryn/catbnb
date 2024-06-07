import { csrfFetch } from "./csrf";

/** Action Type Constants: */
export const LOAD_REVIEWS = "reviews/LOAD_REVIEWS";
export const REMOVE_REVIEW = "reviews/REMOVE_REVIEW";

/** Action Creators: */
export const loadReviews = (reviews) => ({
  type: LOAD_REVIEWS,
  reviews,
});

export const removeReview = (reviewId) => ({
  type: REMOVE_REVIEW,
  reviewId,
});

/** Thunk Action Creators: */

// GET review by spot id /api/spots/spotId
export const getReviews = (spotId) => async (dispatch) => {
  const response = await fetch(`/api/spots/${spotId}/reviews`);
  if (response.ok) {
    const reviews = await response.json();
    dispatch(loadReviews(reviews));
    return reviews;
  }
};

// DELETE review by spotid /api/spots/reviewid
export const deleteReview = (reviewId) => async (dispatch) => {
  const response = await csrfFetch(`/api/reviews/${reviewId}`, {
    method: "DELETE",
  });
  if (response.ok) {
    dispatch(removeReview(reviewId));
    return response;
  }
};

/** Reducer: */
const initialState = {};

const reviewsReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_REVIEWS: {
      return {
        ...state,
        ...action.reviews,
      };
    }
    case REMOVE_REVIEW: {
      const newState = { ...state };
      delete newState[action.reviewId];
      return newState;

    }
    default: {
      return state;
    }
  }
};

export default reviewsReducer;
