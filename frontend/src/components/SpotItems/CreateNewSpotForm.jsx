import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

import {
  getAllSpots,
  getSpotById,
  createNewSpot,
} from "../../store/spotsReducer";

import "./CreateNewSpotForm.css";

function CreateSpotForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [isLoaded, setIsLoaded] = useState(false);

  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [country, setCountry] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");

  const [mainImage, setMainImage] = useState("");
  const [image1, setImage1] = useState("");
  const [image2, setImage2] = useState("");
  const [image3, setImage3] = useState("");
  const [image4, setImage4] = useState("");

  const [errors, setErrors] = useState("");

  useEffect(() => {
    let errors = {};

    if (!address) {
      errors.address = "Address is required";
    }

    if (!city) {
      errors.city = "City is required";
    }

    if (!state) {
      errors.state = "State is required";
    }

    if (!country) {
      errors.country = "Country is required";
    }

    if (!name) {
      errors.name = "Name is required";
    }

    if (!description || description.length < 30) {
      errors.description = "Description needs a minimum of 30 characters";
    }

    if (!price) {
      errors.price = "Price is required";
    }

    setErrors(errors);
  }, [address, city, state, country, name, description, price]);

  const handleSubmit = (e) => {
    e.preventDefault();

    let errors = {};

    if (!address) {
      errors.address = "Address is required";
    }

    if (!city) {
      errors.city = "";
    }

    if (!state) {
      errors.state = "";
    }

    if (!country) {
      errors.country = "Country is required";
    }

    if (!name) {
      errors.name = "";
    }

    if (!description || description.length < 30) {
      errors.description = "";
    }

    if (!price) {
      errors.price = "";
    }

    setErrors(errors);
  };

  return (
    <>
      {/* <h1>ʕ*•ﻌ•ʔฅ</h1> */}
      <form onSubmit={handleSubmit}>
        <div id="spot-form-container">
          <header>
            <h2>Create a new Spot</h2>
            <span style={{fontSize: '20px'}}>Where's your place located?</span>
            <p>
              Guests will only get your exact address once they booked a
              reservation.
            </p>
          </header>

          <section id="form-country-street-city-state" >
            <label className="country-address-input">
              <div className="create-spot-key-input">
                Country
                <div className="errors-object">
                  {errors.country && <p>{errors.country}</p>}
                </div>
              </div>
              <input
                style={{ width: "100%" }}
                type="text"
                value={country}
                placeholder="Country"
                onChange={(e) => setCountry(e.target.value)}
                required
              />
            </label>
            <label className="country-address-input">
              <div className="create-spot-key-input">
                Street Address
                <div className="errors-object">
                  {errors.address && <p>{errors.address}</p>}
                </div>
              </div>
              <input
                style={{ width: "100%" }}
                type="text"
                value={address}
                placeholder="Address"
                onChange={(e) => setAddress(e.target.value)}
                required
              />
            </label>

            <label className="city-state-input">
              <div className="city-input" style={{ width: "60%" }}>
                <div className="create-spot-key-input">
                  City
                  <div className="errors-object">
                    {errors.city && <p>{errors.city}</p>}
                  </div>
                </div>
                <input
                  style={{ width: "95%" }}
                  type="text"
                  value={city}
                  placeholder="City"
                  onChange={(e) => setCity(e.target.value)}
                  required
                />
                <span>, &nbsp; </span>
              </div>

              <div className="state-input" style={{ width: "40%" }}>
                <div className="create-spot-key-input">
                  State
                  <div className="errors-object">
                    {errors.state && <p>{errors.state}</p>}
                  </div>
                </div>
                <input
                  style={{ width: "100%" }}
                  type="text"
                  value={state}
                  placeholder="State"
                  onChange={(e) => setState(e.target.value)}
                  required
                />
              </div>
            </label>
          </section>

  <hr></hr>

          <section id="description-container">
            <span style={{fontSize: '20px'}}>Describe your place to guests</span>

            <label className="description-input" >
                <span className='description-suggestion'>
                Mention the best features of your spot, any special amentities
                like fast wifi or parking, and what you love about the neighborhood.
                </span>
              <textarea
                style={{ width: "100%", height: '150px' }}
                type="text"
                value={description}
                placeholder="Description"
                onChange={(e) => setDescription(e.target.value)}
                required
              />
              <div className="errors-object">
                {errors.description && <p>{errors.description}</p>}
              </div>
            </label>
          </section>
        </div>
      </form>
    </>
  );
}

export default CreateSpotForm;
