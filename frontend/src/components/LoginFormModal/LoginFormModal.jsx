import { useEffect, useState } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch, useSelector } from "react-redux";
import { useModal } from "../../context/Modal";
import "./LoginForm.css";
import { Navigate } from "react-router-dom";
// import { useNavigate } from "react-router-dom";

function LoginFormModal() {
  const dispatch = useDispatch();
  const [credential, setCredential] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);
  const { closeModal } = useModal();

  const sessionUser = useSelector((state) => state.session.user);

  //useEffect to reset state upon opening modal

  useEffect(() => {
    setCredential("");
    setPassword("");
    setErrors({});
  }, []);

  //useEffect to store errors

  useEffect(() => {
    const errors = {};

    if (credential.length < 4) {
      errors.credential = "";
    }

    if (password.length < 6) {
      errors.password = "";
    }

    setErrors(errors);
  }, [credential, password]);

  // Handle Submit
  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors({});
    return dispatch(sessionActions.login({ credential, password }))
      .then(closeModal)
      .catch(async (res) => {
        const data = await res.json();
        if (data && data.errors) {
          setErrors(data.errors);
        }
      });
  };

  if (sessionUser) return <Navigate to="/" replace={true} />;

  return (
    <>
      <h1>Log In</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Username or Email
          <input
            type="text"
            value={credential}
            onChange={(e) => setCredential(e.target.value)}
            required
          />
        </label>
        <label>
          Password
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        {Object.values(errors).map((key, index) => (
          <p key={index}>{errors[key]}</p>
        ))}
        {/* Shows the error messages */}
        {errors.credential && <p>{errors.credential}</p>}
        {errors.password && <p>{errors.password}</p>}
        <button type="submit" disabled={Object.values(errors).length > 0}>
          Log In
        </button>
        <button
          type="submit"
          onClick={() => {
            setCredential("Mama");
            setPassword("password");
          }}
        >
          {" "}
          Demo User
        </button>
      </form>
    </>
  );
}

export default LoginFormModal;
