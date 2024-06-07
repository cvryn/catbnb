import React from 'react';
import { GoStar } from "react-icons/go";
import { GoStarFill } from "react-icons/go";

import './CreateNewReviewModal.css'

const ReviewModalInput = ({ rating, onChange, disabled }) => {
  const handleClick = (index) => {
    onChange(index + 1);
  };

  const handleMouseEnter = (index) => {
    if (!disabled) {
      onChange(index + 1);
    }
  };

  const handleMouseLeave = () => {
    if (!disabled) {
      onChange(rating);
    }
  };

  const maxStars = 5;
  const starIcons = [];

  for (let i = 0; i < maxStars; i++) {
    starIcons.push(
      <span
        key={i}
        onMouseEnter={() => handleMouseEnter(i)}
        onMouseLeave={handleMouseLeave}
        onClick={() => handleClick(i)}
      >
        {i < rating ? <GoStarFill /> : <GoStar />}
      </span>
    );
  }

  return <div className="star-rating">{starIcons}</div>;
};

export default ReviewModalInput;
