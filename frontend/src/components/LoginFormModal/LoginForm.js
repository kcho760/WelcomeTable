import React, { useEffect, useState } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch, useSelector } from "react-redux";
import SignupFormPage from "../SignupFormPage";
import "./LoginForm.css";

function LoginForm() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);
  const [showPasswordPrompt, setShowPasswordPrompt] = useState(false);
  const [showSignupModal, setShowSignupModal] = useState(false);
  const [passwordError, setPasswordError] = useState("");
  const user = useSelector((state) => state.session.user);
  useEffect(() => {
    if (user) {
      setShowPasswordPrompt(false);
      setShowSignupModal(false);
    }
  }, [user]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors([]);

    dispatch(sessionActions.checkEmail(email))
      .then((emailExists) => {
        if (emailExists) {
          setShowPasswordPrompt(true);
          setShowSignupModal(false);
        } else {
          const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          if (!emailRegex.test(email)) {
            throw new Error("Invalid email format");
          }
          setShowPasswordPrompt(false);
          setShowSignupModal(true);
        }
      })
      .catch((error) => {
        setErrors([error.message]);
      });
  };

  const handleDemoLogin = () => {
    dispatch(sessionActions.login({ email: "demo@user.io", password: "password" }))
      .then(() => {
        setShowSignupModal(false);
        setShowPasswordPrompt(false);
      })
      .catch((error) => {
        setErrors([error.message]);
      });
  };

  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    setErrors([]);
    setPasswordError(""); // Reset password error

    dispatch(sessionActions.login({ email, password }))
      .catch((error) => {
        setErrors([error.message]);
        setPasswordError("Incorrect password"); // Set password error message
      });
  };

  const closeSignupModal = () => {
    setShowSignupModal(false);
    setShowPasswordPrompt(false);
  };

  if (user) {
    return null; // User is logged in, don't render the LoginForm component
  }

  return (
    <div className="login-form">
      <form onSubmit={handleSubmit}>
        <ul className="email-check-error">
          {errors.map((error, index) => (
            <li key={index}>{error}</li>
          ))}
        </ul>
        <div className="input-container">
          <label>
            <span>Email</span>
            <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <button type="submit" className="submit-button">
              Continue
            </button>
            <button
              type="button"
              onClick={handleDemoLogin}
              className="demo-button"
            >
              Demo Login
            </button>
          </label>
        </div>
      </form>
      {showPasswordPrompt && !user && (
        <form onSubmit={handlePasswordSubmit}>
          {passwordError && <p className="password-error">{passwordError}</p>}
          <div className="input-container">
            <label>
              <span>Password</span>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button type="submit">Login</button>
            </label>
          </div>
        </form>
      )}
      {showSignupModal && !user && (
        <div className="modal">
          <div className="modal-content">
            <SignupFormPage email={email} closeModal={closeSignupModal} />
          </div>
        </div>
      )}
    </div>
  );
}

export default LoginForm;
