import { useState } from "react";
import DatePicker from "react-datepicker";
import 'react-datepicker/dist/react-datepicker.css';

import './BookingDetails.css'

const BookingDetails = () => {
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);


  return (
    <>
      {/* <h1>ʕ*•ﻌ•ʔฅ</h1> */}
      <div className="booking-title">
        <h2>Select booking dates</h2>
        <span style={{color: 'grey'}}>Add your travel dates for exact pricing</span>
      </div>
      <div className='booking-calendar'>
        <div className='booking-checkin-container'>
        <DatePicker
          selected={startDate}
          onChange={date => setStartDate(date)}
          minDate={new Date()}
          placeholderText="Select a date"
        />
        </div>
        <div className='booking-checkout-container'>
        <DatePicker
          selected={endDate}
          onChange={date => setEndDate(date)}
          minDate={new Date()}
          placeholderText="Select a date"
        />

        </div>
      </div>
    </>
  );
};

export default BookingDetails;
