import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import OpenModalButton from "../OpenModalButton/OpenModalButton";
import DeleteSpotModal from "./DeleteSpotModal";
import {
  getAllSpots,
  getSpotById,
  getCurrentUserSpots,
} from "../../store/spotsReducer";
import SpotItems from "./SpotItems";

import "./ManageSpot.css";

const ManageSpots = () => {
  const { spotId } = useParams();
  const [isLoaded, setIsLoaded] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const spots = useSelector((state) => state.spots.allSpots);

  const currentUser = useSelector((state) => state.session.user);
  console.log("The current session user is: ", currentUser);

  console.log("Managing my spots", spots);

  useEffect(() => {
    const fetchData = async () => {
      await Promise.all([dispatch(getSpotById(spotId))]);
      dispatch(getAllSpots(spots));
      setIsLoaded(true);
    };

    fetchData();
  }, [dispatch, spotId, spots]);

  const userOwnedSpots = Object.values(spots).filter(
    (spot) => spot.ownerId === currentUser.id
  );

  console.log("Spots owned by this user", userOwnedSpots);

  return (
    <div id="manage-spots-container">
      <section className="manage-spots-header">
        <h1>Manage Your Spots</h1>
        <div>
          <button className="create-a-new-spot-button" type="submit">
            Create a New Spot
          </button>
        </div>
      </section>

      <section className="owned-spots-container">
        {isLoaded &&
          currentUser &&
          userOwnedSpots.map((spot) => (
            <div className="user-owned-spot" key={spot.id}>
              <SpotItems spot={spot} />
              <div className="user-owned-update-delete-buttons">
                <button>Update</button>
                <div className="user-spots-delete-button">
                  <OpenModalButton
                    buttonText={"Delete"}
                    modalComponent={<DeleteSpotModal spotId={spot.id} />}
                  />
                </div>
              </div>
            </div>
          ))}
      </section>
    </div>
  );
};

export default ManageSpots;
