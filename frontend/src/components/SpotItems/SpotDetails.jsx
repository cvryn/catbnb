import { useParams, Link } from "react-router-dom"

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSpotById } from "../../store/spotsReducer";

import './SpotDetails.css'



const SpotDetails = () => {
    const { spotId } = useParams()
    // console.log('This is the spotId', spotId)

    const dispatch = useDispatch();
    const spot = useSelector((state) => state.spots[spotId])
    console.log('THIS IS THE SPOT!', spot)

    useEffect(() => {
        dispatch(getSpotById(spotId))
    }, [dispatch, spotId])

    return (
        <>
        <h1>SPOT DETAILS!</h1>

        </>
    )

}

export default SpotDetails
