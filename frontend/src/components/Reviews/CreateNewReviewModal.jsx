import ReviewForm from "./CreateReviewForm";
import { newReview } from "../../store/reviewReducer";


const CreateReviewModal = ({ rating, spotId, disabled, onClose }) => {
  return (
    <ReviewForm spotId={spotId} onSubmit={newReview} onClose={onClose} />
  );
};

export default CreateReviewModal;


// import { useDispatch } from "react-redux";
// // import { useModal } from "../../context/Modal";
// import { useState } from "react";

// import { newReview, getReviews } from "../../store/reviewReducer";

// import { GoStarFill } from "react-icons/go";
// import { GoStar } from "react-icons/go";

// import "./CreateNewReviewModal.css";

// const CreateReviewModal = ({ rating, spotId, disabled, onClose }) => {
//     const dispatch = useDispatch();

//     const [review, setReview] = useState("");
//     const [activeRating, setActiveRating] = useState(rating);
//     const [errors, setErrors] = useState({});

//     const handleSubmit = async (e) => {
//       e.preventDefault();
//       let errors = {};

//       if (!review || review.length < 10) {
//         errors.review = "Review must be 10 characters or more";
//       }
//       if (activeRating < 1 || activeRating > 5) {
//         errors.stars = "Stars rating must be between 1 and 5";
//       }

//       setErrors(errors);

//       if (Object.keys(errors).length === 0) {
//         const reviewData = {
//           review,
//           stars: activeRating,
//         };

//         const response = await dispatch(newReview(spotId, reviewData));
//         if (response && response.id) {
//           // Fetch updated reviews
//           await dispatch(getReviews(spotId));

//           onClose()
//         }
//       }
//     };

//     let maxStars = 5;
//     const starIcons = [];

//     const mouseEnter = (stars) => {
//       if (!disabled) {
//         setActiveRating(stars + 1);
//       }
//     };

//     const mouseLeave = () => {
//       if (!disabled) {
//         setActiveRating(rating);
//       }
//     };

//     const handleClick = (stars) => {
//       setActiveRating(stars);
//     };

//     for (let i = 0; i < maxStars; i++) {
//       starIcons.push(
//         <span
//         key={i}
//         onMouseEnter={() => mouseEnter(i)}
//         onMouseLeave={mouseLeave}
//         onClick={() => handleClick(i + 1)}
//       >
//           {i < activeRating ? <GoStarFill /> : <GoStar />}
//         </span>
//       );
//     }

//     return (
//       <div id="create-review-modal">
//         <h1 style={{ textAlign: "center" }}>How was your stay?</h1>
//         <div className="errors-object">
//           {errors.review && <p>{errors.review}</p>}
//           {errors.stars && <p>{errors.stars}</p>}
//         </div>

//         <form onSubmit={handleSubmit}>
//           <textarea
//             value={review}
//             onChange={(e) => setReview(e.target.value)}
//             placeholder="Leave your review here..."
//           />
//           <div className="star-rating">
//             {starIcons}&nbsp;stars
//           </div>
//           <button type="submit" className="submit-review-button">
//             Submit Your Review
//           </button>
//         </form>
//       </div>
//     );
//   };
