import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createNewSpot } from "../../store/spotsReducer";

import "./CreateNewSpotForm.css";

function CreateSpotForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

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
  const [errors, setErrors] = useState({});
  const [visualErrors, setVisualErrors] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();

    const errors = {};

    // Validations
    if (!address.trim()) errors.address = "Address is required";
    if (!city.trim()) errors.city = "City is required";
    if (!state.trim()) errors.state = "State is required";
    if (!country.trim()) errors.country = "Country is required";
    if (!name.trim()) errors.name = "Name is required";
    if (description.length < 30)
      errors.description = "Description needs a minimum of 30 characters";
    if (price < 1) errors.price = "Price is required";
    if (lat < -90 || lat > 90)
      errors.lat = "Latitude must be between -90 and 90";
    if (lng < -180 || lng > 180)
      errors.lng = "Longitude must be between -180 and 180";

    // Helper to make sure the images are the proper file type
    const checkImageUrl = (url) =>
      url &&
      (url.endsWith(".png") || url.endsWith(".jpg") || url.endsWith(".jpeg"));
    if (!checkImageUrl(previewImage))
      errors.previewImage =
        "Preview image is required and must end in .png, .jpg, or .jpeg";
    if (image1 && !checkImageUrl(image1))
      visualErrors.image1 = "Image URL must end in .png, .jpg, or .jpeg";
    if (image2 && !checkImageUrl(image2))
      visualErrors.image2 = "Image URL must end in .png, .jpg, or .jpeg";
    if (image3 && !checkImageUrl(image3))
      visualErrors.image3 = "Image URL must end in .png, .jpg, or .jpeg";
    if (image4 && !checkImageUrl(image4))
      visualErrors.image4 = "Image URL must end in .png, .jpg, or .jpeg";

    setErrors(errors);
    setVisualErrors(visualErrors);

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
      };

      const response = await dispatch(
        createNewSpot(newSpot, previewImage, [image1, image2, image3, image4])
      );
      if (response && response.id) navigate(`/spots/${response.id}`);
    }
  };

  return (
    <>
      {/* <h1>ʕ*•ﻌ•ʔฅ</h1> */}
      {/* <button
        className="demo-user-modal-button"
        type="submit"
        onClick={() => {
          setAddress("1");
          setCity("1");
          setState("1");
          setCountry("1");
          setName("1");
          setDescription(
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
          );
          setPrice(1);
          setLat(1);
          setLng(1);
          setPreviewImage(
            "https://res.cloudinary.com/dfj8lsesn/image/upload/v1717482655/catbnb/8-ATANKZhXomcJ7Tc_rqhse8.png"
          );
          setImage1(
            "https://res.cloudinary.com/dfj8lsesn/image/upload/v1717481451/catbnb/8-VHGdSOckSozju5k_q3y8ax.png"
          );
          setImage2(
            "https://res.cloudinary.com/dfj8lsesn/image/upload/v1717481395/catbnb/8-PxeIe9RIpGvMIqY_m3gyf8.png"
          );
        }}
      >
        {" "}
        Demo Spots
      </button> */}
      <form onSubmit={handleSubmit} id="create-spot-form-container">
        <div id="spot-form-container">
          <header>
            <h2>Create a new Spot</h2>
            <h3>Where&apos;s your place located?</h3>
            <p>
              Guests will only get your exact address once they booked a
              reservation.
            </p>
          </header>

          {/* // Section 1 */}
          <section id="form-country-street-city-state">
            <label className="country-address-input">
              <div className="create-spot-key-input">
                Country{" "}
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
                Street Address{" "}
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
                  City{" "}
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
                  State{" "}
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
                  Latitude{" "}
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
              <div className="lng-input" style={{ width: "40%" }}>
                <div className="create-spot-key-input">
                  Longitude{" "}
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

          <header>
            <h2>Describe your place to guests</h2>
            <p>
              Mention the best features of your space, any special amentities
              like fast wifi or parking, and what you love about the
              neighborhood.
            </p>
          </header>

          <label id="description-label" className="description-input">
            <textarea
              style={{ width: "100%" }}
              type="text"
              value={description}
              placeholder="Please write at least 30 characters"
              onChange={(e) => setDescription(e.target.value)}
              required
            />
            <div className="errors-object">
              {errors.description && <p>{errors.description}</p>}
            </div>
          </label>

          <hr></hr>

          <header>
            <h2>Create a title for your spot</h2>
            <p>
              Catch guests&apos; attention with a spot title that highlights what
              makes your place special.
            </p>
          </header>

          <label className="name-input">
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
          </label>

          <hr></hr>

          <header>
            <h2>Set a base price for your spot</h2>
            <p>
              Competitive pricing can help your listing stand out and rank
              higher in search results.
            </p>
          </header>

          <label className="price-input">
            <div className="input-field">
              <span>$</span>
              <input
                style={{ width: "100%" }}
                type="number"
                value={price}
                placeholder="Price per night (USD)"
                onChange={(e) => setPrice(e.target.value)}
                required
              />
            </div>
            <div className="errors-object">
              {errors.price && <p>{errors.price}</p>}
            </div>
          </label>

          <hr></hr>

          <header>
            <h2>Liven up your spot with photos</h2>
            <p>Submit a link to at least one photo to publish your spot.</p>
          </header>
          {/* // previewImage */}
          <label className="photos-input">
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
          </label>

          {/* //image1 */}
          <label className="photos-input">
            <input
              style={{ width: "100%" }}
              type="text"
              value={image1}
              placeholder="Image URL"
              onChange={(e) => setImage1(e.target.value)}
            />
            <div className="errors-object">
              {visualErrors.image1 && <p>{visualErrors.image1}</p>}
            </div>
          </label>
          {/* //image2 */}
          <label className="photos-input">
            <input
              style={{ width: "100%" }}
              type="text"
              value={image2}
              placeholder="Image URL"
              onChange={(e) => setImage2(e.target.value)}
            />
            <div className="errors-object">
              {visualErrors.image2 && <p>{visualErrors.image2}</p>}
            </div>
          </label>

          {/* //image3 */}
          <label className="photos-input">
            <input
              style={{ width: "100%" }}
              type="text"
              value={image3}
              placeholder="Image URL"
              onChange={(e) => setImage3(e.target.value)}
            />
            <div className="errors-object">
              {visualErrors.image3 && <p>{visualErrors.image3}</p>}
            </div>
          </label>
          {/* //image4 */}
          <label className="photos-input">
            <input
              style={{ width: "100%" }}
              type="text"
              value={image4}
              placeholder="Image URL"
              onChange={(e) => setImage4(e.target.value)}
            />
            <div className="errors-object">
              {visualErrors.image4 && <p>{visualErrors.image4}</p>}
            </div>
          </label>

          <hr></hr>

          <button type="submit" style={{color:'white', backgroundColor: 'red', width:' 100px', boxShadow: '2px 2px 2px black', margin: '0 auto'}}>Create Spot</button>
        </div>
      </form>
    </>
  );
}

export default CreateSpotForm;
