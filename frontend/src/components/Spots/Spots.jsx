import { Link } from "react-router-dom";
import SpotItems from '../SpotItems/SpotItems';

import { useDispatch, useSelector } from "react-redux";
import { deleteSpot, getAllSpots } from "../../store/spotsReducer";
import { useEffect, useState } from "react";

import "./Spots.css";

const Spots = () => {
  let spots = useSelector((state) => Object.values(state.spots));
  let dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllSpots());
  }, [dispatch]);

  // const handleDelete = (spotId) => {
  //   const remove = dispatch(deleteSpot(spotId));
  //   if (remove) {
  //     console.log("Successfully removed spot");
  //   } else {
  //     console.log("Failed to remove spot");
  //   }
  // };

  return (
    <section>
      <ul>
        <div className="spots-container">
          {spots.map((spot) => {
            return <SpotItems spot={spot} key={spot.id} />
})}
        </div>
      </ul>
    </section>
  );
};

export default Spots;
