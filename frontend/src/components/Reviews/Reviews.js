import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getReviews } from "../../store/reviewReducer";
import { useParams } from "react-router-dom";

const Reviews = () => {
  const dispatch = useDispatch();
  const { spotId } = useParams();

  const reviews = useSelector((state) => state.reviews.reviews[spotId]);
  console.log("Da Reviewwwwwws", reviews);

  useEffect (()=> {
    dispatch(getReviews(spotId))
  })
};


export default Reviews;
