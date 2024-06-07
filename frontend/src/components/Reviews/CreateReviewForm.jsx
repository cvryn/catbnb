import  { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { newReview, getReviews } from '../../store/reviewReducer';
import ReviewModalInput from './CreateReviewInput';

const ReviewForm = ({ spotId, onClose }) => {
  const dispatch = useDispatch();
  const [review, setReview] = useState('');
  const [rating, setRating] = useState(0);
  const [errors, setErrors] = useState({});

const currentSpot = useSelector((state)=> state.spots.currentSpot[0])
// console.log('What is the current spot?', currentSpot)

  const handleSubmit = async (e) => {
    e.preventDefault();
    let newErrors = {};


    if (!review || review.length < 10 || review.trim() === "") {
      newErrors.review = 'Review must be 10 characters or more';
    }
    if (rating < 1 || rating > 5) {
      newErrors.stars = 'Stars rating must be between 1 and 5';
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      const reviewData = {
        review,
        stars: rating,
      };
      // console.log('What is this review data looking like', reviewData)
      // console.log('Review looking like? ', review)
      // console.log(typeof review)
      // console.log("All of the stars", rating)
      // console.log(typeof rating)

      const response = await dispatch(newReview(spotId, reviewData));
      // console.log('Did we get here? new review response', response)
      if (response && response.id) {
        await dispatch(getReviews(spotId));
        onClose();
      }
    }
  };

  return (
    <div id="create-review-modal">
      <h1 style={{ textAlign: 'center' }}>How was your stay at
        <div>{currentSpot.name}?
        </div></h1>
      <div className="errors-object">
        {errors.review && <p>{errors.review}</p>}
        {errors.stars && <p>{errors.stars}</p>}
      </div>

      <form onSubmit={handleSubmit}>
        <textarea
          value={review}
          onChange={(e) => setReview(e.target.value)}
          placeholder="Leave your review here..."
        />
        <ReviewModalInput rating={rating} onChange={setRating} disabled={Object.keys(errors).length > 0 } />
        <button type="submit" className="submit-review-button">
          Submit Your Review
        </button>
      </form>
    </div>
  );
};

export default ReviewForm;
