import { Link } from "react-router-dom";
import { RiStarFill } from "react-icons/ri";

import { Tooltip } from "react-tooltip";

import "./SpotItems.css";

const SpotItems = ({ spot }) => {
  console.log(spot);

  return (
    <>
      <div
        data-tooltip-id="my-tooltip"
        data-tooltip-content={spot.name}
        data-tooltip-place="bottom"
      >
        <div id="spots-container">
          <Link to={`/spots/${spot.id}`} style={{ textDecoration: "none" }}>
            {/* <div className="spot-container"> */}
            <div className="spot-image-container">
              <img className="image" src={spot.previewImage} />
            </div>

            <div className="spot-text-container">
              <div className="spot-text">
                {/* <a href="#" class='spot-titles'>{spot.name}</a> */}
                {/* <div class="spot-titles">{spot.name}</div> */}
                <div className="location-text">
                  {spot.city}, {spot.state}
                </div>
                <div className="price">
                  ${spot.price} <span className="price-span">night</span>
                </div>
              </div>
              <div className="rating">
                <RiStarFill /> {spot.avgRating}
              </div>
              {/* </div> */}
            </div>
          </Link>
        </div>
      </div>
      <Tooltip id="my-tooltip" />
    </>
  );
};

export default SpotItems;
