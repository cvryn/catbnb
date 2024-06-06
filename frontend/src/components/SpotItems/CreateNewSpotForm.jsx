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
  const [lat, setLat] = useState("");
  const [lng, setLng] = useState("");

  const [previewImage, setPreviewImage] = useState("");
  const [image1, setImage1] = useState("");
  const [image2, setImage2] = useState("");
  const [image3, setImage3] = useState("");
  const [image4, setImage4] = useState("");

  const [hasSubmitted, setHasSubmitted] = useState(false);

  const [errors, setErrors] = useState({});
  const[visualErrors, setVisualErrors] = useState ({})

  let spots = useSelector(state => state.spots.allSpots)

  console.log('All the spots,', spots)

const handleSubmit = async (e) => {
    e.preventDefault();

    setIsLoaded(true);
    setHasSubmitted(true);

    let errors = {};
    let visualErrors = {};

    if (!address || address.trim().length === 0) {
        errors.address = "Address is required";
    }

    if (!city || city.trim().length === 0) {
      errors.city = "City is required";
    }

    if (!state || state.trim().length === 0) {
      errors.state = "State is required";
    }

    if (!country || country.trim().length === 0) {
      errors.country = "Country is required";
    }

    if (!name || name.trim().length === 0) {
      errors.name = "Name is required";
    }

    if (!description || description.length < 30) {
      errors.description = "Description needs a minimum of 30 characters";
    }

    if (!price || price < 1) {
      errors.price = "Price is required";
    }

    if (!lat) {
        errors.lat = "Latitude is required";
    } else if (lat < -90 || lat > 90) {
        errors.lat = "Latitude must be between -90 and 90";
    }
    if (!lng) {
        errors.lng = "Longitude is required";
    } else if (lng < -180 || lng > 180) {
        errors.lng = "Longitude must be between -90 and 90";
    }
    const checkImageUrl = (url) => {
      return url && (url.endsWith(".png") || url.endsWith(".jpg") || url.endsWith(".jpeg"));
    };

    if (!previewImage || !checkImageUrl(previewImage)) {
        errors.previewImage = "Preview image is required and must end in .png, .jpg, or .jpeg.";
      }


    if (image1 && !checkImageUrl(image1)) {
     visualErrors.image1 = "Image URL must end in .png, .jpg, or .jpeg";
    }
    if (image2 && !checkImageUrl(image2)) {
       visualErrors.image2 = "Image URL must end in .png, .jpg, or .jpeg";
    }

    if (image3 && !checkImageUrl(image3)) {
       visualErrors.image3 = "Image URL must end in .png, .jpg, or .jpeg";
    }

    if (image4 && !checkImageUrl(image4)) {
       visualErrors.image4 = "Image URL must end in .png, .jpg, or .jpeg";
    }

    setErrors(errors);
    setVisualErrors(visualErrors)


    if (Object.keys(errors).length === 0) {
        const newSpot = {
            address,
            city,
            state,
            country,
            name,
            price,
            description,
            lat,
            lng,
            previewImage,
            images: [image1, image2, image3, image4].filter(img => img),
        };

      console.log("Submitting new spot:", newSpot);

      const response = await dispatch(createNewSpot(newSpot));
    //   await dispatch(getAllSpots(spots))

      console.log("DID WE createNewSpot:", response);

      if (response && response.id) {
        navigate(`/spots/${response.id}`);

      } else {
        console.error("Failed to create new spot:", response);
      }
    }
  };

  return (
    <>
      {/* <h1>ʕ*•ﻌ•ʔฅ</h1> */}
      <form onSubmit={handleSubmit} id='create-spot-form-container'>
        <div id="spot-form-container">
          <header>
            <h2>Create a new Spot</h2>
            <h3>Where&apos;s your place located?</h3>

            <p>
              Guests will only get your exact address once they booked a
              reservation.
            </p>
          </header>

          <section id="form-country-street-city-state">
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
                  placeholder="STATE"
                  onChange={(e) => setState(e.target.value)}
                  required
                />
              </div>
            </label>


            <label className="lat-lng-input">
              <div className="lat-input" style={{ width: "40%" }}>
                <div className="create-spot-key-input">
                  Latitude
                  <div className="errors-object">
                    {errors.lat && <p>{errors.lat}</p>}
                  </div>
                </div>
                <input
                  style={{ width: "95%" }}
                  type="number"
                  value={lat}
                  placeholder="Latitude"
                  onChange={(e) => setLat(e.target.value)}
                  required
                />
                <span>, &nbsp; </span>
              </div>

              <div className="lng-input" style={{ width: "60%" }}>
                <div className="create-spot-key-input">
                 Longitude
                  <div className="errors-object">
                    {errors.lng && <p>{errors.lng}</p>}
                  </div>
                </div>
                <input
                  style={{ width: "100%" }}
                  type="number"
                  value={lng}
                  placeholder="Longitude"
                  onChange={(e) => setLng(e.target.value)}
                  required
                />
              </div>
            </label>


          </section>

          <hr></hr>

          <section id="description-container">
            <h3>Describe your place to guests</h3>
            <label className="description-input">
              <span className="description-suggestion">
                Mention the best features of your spot, any special amenities
                like fast wifi or parking, and what you love about the
                neighborhood.
              </span>
              <textarea
                style={{ width: "100%", height: "150px" }}
                type="text"
                value={description}
                placeholder="Description. Please write at least 30 characters"
                onChange={(e) => setDescription(e.target.value)}
                required
              />
              <div className="errors-object">
                {errors.description && <p>{errors.description}</p>}
              </div>
            </label>
          </section>

          <hr></hr>

          <section id="create-title-container">
            <h3>Create a title for your spot</h3>
            <span className="spot-name-input">
              Catch guests&apos; attention with a spot title that highlights
              what makes your place special.
            </span>
            <input
              style={{ width: "100%" }}
              type="text"
              value={name}
              placeholder="Name of your spot"
              onChange={(e) => setName(e.target.value)}
              required
            />

            <div className="errors-object">
              {errors.name && <p>{errors.name}</p>}
            </div>
          </section>

          <hr></hr>

          <section id="set-price-container">
            <h3>Set a base price for your spot</h3>
            <span>
              Competitive pricing can help your listing stand out and rank
              higher in search results.
            </span>
            <div className="price-input-container">
              <span> $ </span>

              <input
                style={{ width: "100%" }}
                type="text"
                value={price}
                placeholder="Price per night (USD)"
                onChange={(e) => setPrice(e.target.value)}
                required
              />
            </div>
            <div className="errors-object">
              {errors.price && <p>{errors.price}</p>}
            </div>
          </section>

          <hr></hr>

          <section id="publish-image-new-spot-container">
            <h3>Liven up your spot with photos</h3>
            <span>
              Submit a link to at least one photo to publish your spot.
            </span>

            <input
              style={{ width: "100%" }}
              type="text"
              value={previewImage}
              placeholder="Preview Image URL"
              onChange={(e) => setPreviewImage(e.target.value)}
              required
            />
            <div className="errors-object">
            {errors.previewImage && <p>{errors.previewImage}</p>}
            </div>
            {/* //image1  */}
            <input
              style={{ width: "100%" }}
              type="Image URL"
              value={image1}
              placeholder="Image URL"
              onChange={(e) => setImage1(e.target.value)}
            />

            <div className="errors-object">
              {errors.image1 && <p>{errors.image1}</p>}
              {/* {visualErrors.image1 && <p>{visualErrors.image1}</p>} */}

            </div>

            {/* //image2  */}
            <input
              style={{ width: "100%" }}
              type="Image URL"
              value={image2}
              placeholder="Image URL"
              onChange={(e) => setImage2(e.target.value)}
            />

            <div className="errors-object">
              {errors.image2 && <p>{errors.image2}</p>}

              {/* {visualErrors.image2 && <p>{visualErrors.image2}</p>} */}
            </div>

            {/* //image3  */}
            <input
              style={{ width: "100%" }}
              type="Image URL"
              value={image3}
              placeholder="Image URL"
              onChange={(e) => setImage3(e.target.value)}
            />

            <div className="errors-object">
              {errors.image3 && <p>{errors.image3}</p>}

              {/* {visualErrors.image3 && <p>{visualErrors.image3}</p>} */}
            </div>

            {/* //image4  */}
            <input
              style={{ width: "100%" }}
              type="Image URL"
              value={image4}
              placeholder="Image URL"
              onChange={(e) => setImage4(e.target.value)}
            />

            <div className="errors-object">
              {errors.image4 && <p>{errors.image4}</p>}

              {/* {visualErrors.image4 && <p>{visualErrors.image4}</p>} */}
            </div>
          </section>

          <hr></hr>

          <button
          className='create-spot-button'
          type='submit'>
            Create Spot
          </button>
        </div>
      </form>
    </>
  );
}

export default CreateSpotForm;
