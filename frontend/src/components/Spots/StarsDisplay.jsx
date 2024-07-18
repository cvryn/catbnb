import { PiFishFill } from "react-icons/pi";
import { PiFish } from "react-icons/pi";


const StarDisplay = ({ numStars }) => {
    const renderStars = (numStars) => {
      const stars = [];
      const maxStars = 5;

      // Determine how many filled and empty icons
      const numFilledStars = Math.min(numStars, maxStars); // Limit numStars to maxStars
      const numEmptyStars = maxStars - numFilledStars;

      // Filled stars
      for (let i = 0; i < numFilledStars; i++) {
        stars.push(<PiFishFill />);
      }

      // Empty stars
      for (let i = 0; i < numEmptyStars; i++) {
        stars.push(<PiFish key={`empty-${i}`}  />);
      }

      return stars;
    };

    return (
      <div className="star-display">
        {renderStars(numStars)}
      </div>
    );
  };

  export default StarDisplay;
