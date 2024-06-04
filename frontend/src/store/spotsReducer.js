import { csrfFetch } from "./csrf";

/** Action Type Constants: */
export const LOAD_SPOTS = "spots/LOAD_SPOTS";
export const REMOVE_SPOT = "spots/REMOVE_SPOT";
export const GET_SPOT = "spots/GET_SPOT";

/**  Action Creators: */

// Load all the spots
export const loadSpots = (spots) => ({
  type: LOAD_SPOTS,
  spots,
});

// Get single spot by id
export const getSpot = (spot) => ({
  type: GET_SPOT,
  spot,
});

// Delete spot by id
export const removeSpot = (spotId) => ({
  type: REMOVE_SPOT,
  spotId,
});

/** Thunk Action Creators: */

// GET all spots /api/spots
export const getAllSpots = () => async (dispatch) => {
  try {
    const response = await fetch("/api/spots");
    if (response.ok) {
      const data = await response.json();
      console.log("this is the daataaa", data);
      let spots = data.Spots;
      // console.log('THIS IS SPOTS!', spots)
      if (Array.isArray(spots)) {
        dispatch(loadSpots(spots));
        return spots;
      } else {
        console.log("Error: spots is not an array", spots);
      }
    } else {
      const error = await response.json();
      console.log(error);
    }
  } catch (err) {
    console.log(err);
    return err;
  }
};

// GET spot by id /api/spot/:spotId
export const getSpotById = (spotId) => async (dispatch) => {
  const res = await fetch(`/api/spots/${spotId}`);
  const spot = await res.json();
  dispatch(getSpot(spot));
};

// DELETE delete spot by id /api/spots/:spotId

export const deleteSpot = (spotId) => async (dispatch) => {
  try {
    const response = await fetch(`/api/spots/${spotId}`, {
      method: "DELETE",
    });
    if (response.ok) {
      dispatch(removeSpot(spotId));
    } else {
      const error = await response.json();
      console.log(error);
    }
  } catch (err) {
    console.log(err);
    return err;
  }
};

/** Reducer: */
const initialState = { allSpots: {}, currentSpot: {} };

const spotsReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_SPOTS: {
      const newState = { ...state, allSpots: {} };
      action.spots.forEach((spot) => {
        newState.allSpots[spot.id] = spot;
      });
      return newState;
    }
    case GET_SPOT: {
      return { ...state, currentSpot: action.spot };
    }
    case REMOVE_SPOT: {
      const newState = { ...state };
      delete newState.allSpots[action.spotId];
      return newState;
    }
    
    // case LOAD_SPOTS: {
    //   const spotsState = { ...state };
    //   action.spots.forEach((spot) => {
    //     spotsState[spot.id] = spot;
    //   });
    //   return spotsState;
    // }
    // case GET_SPOT: {
    //   {
    //     const newSpotState = { ...state };
    //     const spot = action.spot;
    //     newSpotState[spot.id] = spot;
    //     return newSpotState;
    //   }
    // }
    // case REMOVE_SPOT: {
    //   const newState = { ...state };
    //   delete newState[action.spotId];
    //   return newState;
    // }
    default:
      return state;
  }
};

export default spotsReducer;
