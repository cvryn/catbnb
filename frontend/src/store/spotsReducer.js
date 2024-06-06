import { csrfFetch } from "./csrf";

/** Action Type Constants: */
export const LOAD_SPOTS = "spots/LOAD_SPOTS";
export const GET_SPOT = "spots/GET_SPOT";
export const CREATE_SPOT = "spots/CREATE_SPOT";

export const CREATE_SPOT_IMAGE = "spots/CREATE_SPOT_IMAGE";

export const GET_OWNER_SPOT = "spots/GET_OWNER_SPOT";

export const REMOVE_SPOT = "spots/REMOVE_SPOT";

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

// Create a new spot
export const createSpot = (spot) => ({
  type: CREATE_SPOT,
  spot,
});

//Create a spot image
export const createSpotImage = (image) => ({
  type: CREATE_SPOT_IMAGE,
  image,
});

// Get Spots by Owner
export const getOwnerSpot = (spots) => ({
  type: GET_OWNER_SPOT,
  spots,
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
      // console.log("this is the daataaa", data);
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
  const response = await fetch(`/api/spots/${spotId}`);
  if (response.ok) {
    const spot = await response.json();
    dispatch(getSpot(spot));
  } else {
    const error = await response.json();
    console.log(error);
  }
};

// POST create new spot /api/spots/new

export const createNewSpot = (spot) => async (dispatch) => {
  const response = await csrfFetch("/api/spots", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(spot),
  });

  if (response.ok) {
    let newSpot = await response.json();

    dispatch(createSpot(newSpot));

    return newSpot;
  } else {
    const errors = await response.json();
    throw new Error(errors);
  }
};

// GET spot by owner /api/spots/current

export const getCurrentUserSpots = () => async (dispatch) => {
  const response = await csrfFetch("/api/spots/current");

  if (response.ok) {
    const data = await response.json();
    const spots = data.Spots;
    dispatch(getOwnerSpot(spots));
  }
};

// DELETE delete spot by id /api/spots/:spotId

export const deleteSpot = (spotId) => async (dispatch) => {
  try {
    const response = await csrfFetch(`/api/spots/${spotId}`, {
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
    case CREATE_SPOT: {
      const newSpot = action.spot;
      return {
        ...state,
        allSpots: {
          ...state.allSpots,
          [newSpot.id]: newSpot,
        },
      };
    }
    case GET_OWNER_SPOT: {
      const ownerSpots = {};
      action.spots.forEach((spot) => {
        ownerSpots[spot.id] = spot;
      });
      return {
        ...state,
        allSpots: {
          ...state.allSpots,
          ...ownerSpots,
        },
        currentSpot: {...ownerSpots},
      };
    }
    case REMOVE_SPOT: {
      const newState = { ...state };
      delete newState.allSpots[action.spotId];
      return newState;
    }

    default:
      return state;
  }
};

export default spotsReducer;
