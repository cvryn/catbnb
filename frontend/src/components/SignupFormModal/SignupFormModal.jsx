import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import * as sessionActions from "../../store/session";
import "./SignupForm.css";

function SignupFormModal() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});
  const { closeModal } = useModal();

  // UseEffect to catch any blank inputs or those that don't pass validations

  useEffect(() => {
    const errors = {};

    if (!email) {
      errors.email = "";
    }

    if (username.length < 4) {
      errors.username = "";
    }

    if (!firstName) {
      errors.firstName = "";
    }

    if (!lastName) {
      errors.lastName = "";
    }

    if (password.length < 6) {
      errors.password = "";
    }

    if (!confirmPassword) {
      errors.confirmPassword = "";
    }

    if (password !== confirmPassword) {
      errors.confirmPassword = "";
    }

    setErrors(errors);
  }, [email, username, firstName, lastName, password, confirmPassword]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password === confirmPassword) {
      setErrors({});
      return dispatch(
        sessionActions.signup({
          email,
          username,
          firstName,
          lastName,
          password,
        })
      )
        .then(closeModal)
        .catch(async (res) => {
          const data = await res.json();
          if (data?.errors) {
            setErrors(data.errors);
          }
        });
    }
    return setErrors({
      confirmPassword:
        "Confirm Password field must be the same as the Password field",
    });
  };

  return (
    <>
      <h1 style={{ textAlign: "center" }}>Sign Up</h1>
      <form onSubmit={handleSubmit}>
        <div className="credentials-textbox">
          <div className="error-messages">
            {errors.firstName && <p>{errors.firstName}</p>}
            {errors.lastName && <p>{errors.lastName}</p>}

            {errors.email && <p>{errors.email}</p>}
            {errors.username && <p>{errors.username}</p>}

            {errors.password && <p>{errors.password}</p>}
            {errors.confirmPassword && <p>{errors.confirmPassword}</p>}
          </div>

          <div className="signup-input-separation">
            <label className="credential-input">
              First Name
              <input
                type="text"
                value={firstName}
                placeholder="First Name"
                onChange={(e) => setFirstName(e.target.value)}
                required
              />
            </label>
            {/* {errors.firstName && <p>{errors.firstName}</p>} */}
            <label className="credential-input">
              Last Name
              <input
                type="text"
                value={lastName}
                placeholder="Last Name"
                onChange={(e) => setLastName(e.target.value)}
                required
              />
            </label>
          </div>
          <div className="signup-input-separation">
            <label className="credential-input">
              Email
              <input
                type="text"
                value={email}
                placeholder="Email"
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </label>
            {/* {errors.email && <p>{errors.email}</p>} */}
            <label className="credential-input">
              Username
              <input
                type="text"
                value={username}
                placeholder="Username"
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </label>
          </div>
          {/* {errors.lastName && <p>{errors.lastName}</p>} */}
          <div className="signup-input-separation">
            <label className="credential-input">
              Password
              <input
                type="password"
                value={password}
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </label>
            {/* {errors.password && <p>{errors.password}</p>} */}
            <label className="credential-input">
              Confirm Password
              <input
                type="password"
                value={confirmPassword}
                placeholder="Confirm Password"
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </label>
            {/* {errors.confirmPassword && <p>{errors.confirmPassword}</p>} */}
          </div>
        </div>
        {/* {errors.confirmPassword && <p>{errors.confirmPassword}</p>} */}
        <button
          className="signup-modal-button"
          type="submit"
          disabled={Object.values(errors).length > 0}
        >
          Sign Up
        </button>
      </form>
    </>
  );
}

export default SignupFormModal;
