
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import * as sessionActions from "../../store/session";
import "./SignupForm.css";

function SignupFormPage({ email, closeModal }) {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const [username, setUsername] = useState("");
  const [inputEmail, setInputEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({
    email: "",
    username: "",
    password: "",
    confirmPassword: "",
  });

  useEffect(() => {
    setInputEmail(email);
  }, [email]);

  if (sessionUser) return <Redirect to="/" />;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({
      email: "",
      username: "",
      password: "",
      confirmPassword: "",
    });
    if (password === confirmPassword) {
      return dispatch(
        sessionActions.signup({ email: inputEmail, username, password })
      ).catch(async (res) => {
        let data;
        try {
          data = await res.clone().json();
        } catch {
          data = await res.text(); // Will hit this case if the server is down
        }
        if (data?.errors) {
          let newErrors = {
            email: "",
            username: "",
            password: "",
            confirmPassword: "",
          };
          data.errors.forEach((error) => {
            if (error.includes("Email")) newErrors.email = error;
            else if (error.includes("Username")) newErrors.username = error;
            else if (error.includes("Password")) newErrors.password = error;
          });
          setErrors(newErrors);
        }
      });
    }else{
      setErrors((prevErrors) => ({
        ...prevErrors,
        confirmPassword: "Passwords do not match",
      }));
    }
  };

  const handleOutsideClick = (e) => {
    if (e.target.classList.contains("modal")) {
      closeModal();
    }
  };
  
  return (
    <div className="modal" onClick={handleOutsideClick}>
      <div className="modal-content SignupFormPage">
        <h1>Sign Up</h1>
        <form onSubmit={handleSubmit}>
          <label>
            Email
            {errors.email && <p id="emailError" className="error-message">{errors.email}</p>}
            <input
              type="text"
              value={inputEmail}
              onChange={(e) => setInputEmail(e.target.value)}
              required
            />
          </label>
          <label>
            Username
            {errors.username && <p id="usernameError" className="error-message">{errors.username}</p>}
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </label>
          <label>
            Password
            {errors.password && <p id="passwordError" className="error-message">{errors.password}</p>}
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </label>
          <label>
            Confirm Password
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
            {errors.confirmPassword && (
              <p id="confirmPasswordError" className="error-message">{errors.confirmPassword}</p>
            )}
          </label>
          <button className="signup-button" type="submit">Sign Up</button>
        </form>
      </div>
    </div>
  );  
}

export default SignupFormPage;
