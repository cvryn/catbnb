import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSpotById } from "../../store/spotsReducer";
import { TiStarFullOutline } from "react-icons/ti";
import "./SpotDetails.css";

const SpotDetails = () => {
  const dispatch = useDispatch();
    const { spotId } = useParams();
    const [isLoaded, setIsLoaded] = useState(false);

    const spot = useSelector((state) => state.spots[spotId]);
    console.log("THIS IS THE SPOT!", spot);



    useEffect(() => {
        dispatch(getSpotById(spotId)).then(() => setIsLoaded(true));
    }, [dispatch, spotId]);

    const reserveButtonClick = () => {
        alert('Feature Coming Soon...');
    };

    if (!isLoaded || !spot) return <div>Loading...meow</div>;

    return (
        <>
            <h1>ʕ*•ﻌ•ʔฅ</h1>
            <div id="spot-detail-container">
                <section className="listing-name-container">
                    <h1>{spot.name}</h1>
                    <span className="location">
                        {spot.city}, {spot.state}, {spot.country}
                    </span>
                </section>
                <div className="images-container">
                    <div className="main-image-left">
                        <img className="main-image" src={spot.previewImage} alt="Main Spot" />
                    </div>
                    <div className="images-container-right">
                        <img className="side-image" src={spot.previewImage} alt="Spot" />
                        <img className="side-image" src={spot.previewImage} alt="Spot" />
                        <img className="side-image" src={spot.previewImage} alt="Spot" />
                        <img className="side-image" src={spot.previewImage} alt="Spot" />
                    </div>
                </div>
                <section className="location-info-container-mid">
                    <div className="owner-description-container">
                        <h2 className="owner-info">
                            Hosted by {spot?.Owner?.firstName} {spot?.Owner?.lastName}
                        </h2>
                        <p className="description">{spot.description}</p>
                    </div>
                    <div className="reserve-container">
                        <div className="reserve-top">
                            <div className="price-details">${spot.price} <span className="price-span-details">night</span></div>
                            <div className="reviews-details">
                                <TiStarFullOutline /> {spot.avgRating} · {spot?.numReviews} # reviews
                            </div>
                        </div>
                        <button className='reserve-button' onClick={reserveButtonClick}>Reserve</button>
                    </div>
                </section>
            </div>
        </>
    );
};

export default SpotDetails;
