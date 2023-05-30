import React, { useState } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch } from "react-redux";
import SignupFormPage from "../SignupFormPage";
import "./LoginForm.css";

function LoginForm() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);
  const [showPasswordPrompt, setShowPasswordPrompt] = useState(false);
  const [showSignupModal, setShowSignupModal] = useState(false);
  
  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors([]);

    dispatch(sessionActions.checkEmail(email))
      .then((emailExists) => {
        if (emailExists) {
          setShowPasswordPrompt(true);
          setShowSignupModal(false);
        } else {
          setShowPasswordPrompt(false);
          setShowSignupModal(true);
        }
      })
      .catch((error) => {
        setErrors([error.message]);
      });
  };

  const handleDemoLogin = () => {
    dispatch(
      sessionActions.login({ email: "Demo-User@io.com", password:"123456" })
    )
      .catch((error) => {
        setErrors([error.message]);
      });
  };

  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    setErrors([]);

    dispatch(
      sessionActions.login({ email, password })
    )
      .catch((error) => {
        setErrors([error.message]);
      });
  };

  const closeSignupModal = () => {
    setShowSignupModal(false);
  };

  return (
    <div>
      {!showPasswordPrompt && !showSignupModal ? (
        <form onSubmit={handleSubmit}>
          <ul>
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
            <button type="submit" className="submit-button">Continue</button>
            <button type="button" onClick={handleDemoLogin} className="demo-button">Demo Login</button>
            </label>
          </div>
        </form>
      ) : null}
      {showPasswordPrompt && (
        <form onSubmit={handlePasswordSubmit}>
          <label>
            Password
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </label>
          <button type="submit">Login</button>
        </form>
      )}
      {showSignupModal && (
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