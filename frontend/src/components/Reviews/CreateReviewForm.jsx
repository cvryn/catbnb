import  { useState } from 'react';
import { useDispatch } from 'react-redux';
import { newReview, getReviews } from '../../store/reviewReducer';
import ReviewModalInput from './CreateReviewInput';

const ReviewForm = ({ spotId, onSubmit, onClose }) => {
  const dispatch = useDispatch();
  const [review, setReview] = useState('');
  const [rating, setRating] = useState(0);
  const [errors, setErrors] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();
    let newErrors = {};

    if (!review || review.length < 10) {
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

      const response = await dispatch(newReview(spotId, reviewData));
      if (response && response.id) {
        await dispatch(getReviews(spotId));
        onClose();
      }
    }
  };

  return (
    <div id="create-review-modal">
      <h1 style={{ textAlign: 'center' }}>How was your stay?</h1>
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
        <ReviewModalInput rating={rating} onChange={setRating} disabled={false} />
        <button type="submit" className="submit-review-button">
          Submit Your Review
        </button>
      </form>
    </div>
  );
};

export default ReviewForm;
