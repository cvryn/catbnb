import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import * as sessionActions from "../../store/session";
import { useModal } from "../../context/Modal";
import "./SignupForm.css";

function SignupFormModal() {
  const dispatch = useDispatch();
  const { closeModal } = useModal();

  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});

  useEffect(() => {
    setEmail("");
    setUsername("");
    setFirstName("");
    setLastName("");
    setPassword("");
    setConfirmPassword("");
    setErrors({});
  }, []);

  useEffect(() => {
    const errors = {};

    if (!email) errors.email = "";
    if (username.length < 4) errors.username = "";
    if (!firstName) errors.firstName = "";
    if (!lastName) errors.lastName = "";
    if (password.length < 6) errors.password = "";
    if (password !== confirmPassword) errors.confirmPassword = "";

    setErrors(errors);
  }, [email, username, firstName, lastName, password, confirmPassword]);

  const handleSubmit = (e) => {
    e.preventDefault();
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
        if (data && data.errors) {
          setErrors(data.errors);
        }
      });
  };

  return (
    <>
      <h1 style={{ textAlign: "center" }}>Sign Up</h1>
      <form onSubmit={handleSubmit}>
        <div className="credentials-textbox">
          <div className="signup-input-separation">
            <span>
              {" "}
              {Object.values(errors).map((error, index) => (
                <p style={{ color: "red" }} key={index}>
                  {error}
                </p>
              ))}
            </span>

            <label className="credential-input">
              First Name
              <input
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                placeholder={'First Name'}
                required
              />
            </label>
            <label className="credential-input">
              Last Name
              <input
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                placeholder={'Last Name'}
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
                onChange={(e) => setEmail(e.target.value)}
                placeholder={'Email'}
                required
              />
            </label>
            <label className="credential-input">
              Username
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder={'Username'}
                required
              />
            </label>
          </div>
          <div className="signup-input-separation">
            <label className="credential-input">
              Password
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder={'Password'}
                required
              />
            </label>
            <label className="credential-input">
              Confirm Password
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder={'Confirm Password'}
                required
              />
            </label>
          </div>
        </div>

        <button
          className="signup-modal-button"
          type="submit"
          disabled={
            Object.values(errors).length > 0 ||
            !email ||
            !username ||
            !firstName ||
            !lastName ||
            !password ||
            !confirmPassword
          }
        >
          Sign Up
        </button>
      </form>
    </>
  );
}

export default SignupFormModal;
