import React, { useState } from "react";
import { Navigate } from "react-router-dom";
import axios from "axios";
import "./RegisterForm.css";

function auth(email1: string, password1: string) {
  var body = {
    email: email1,
    password: password1,
  };

  axios.post("http://localhost:4123/auth/register", body)
  .then(function (response) {
    const { token, userId, username } = response.data; // Extract token and userId from response.data
    document.cookie = `jwtToken=${token}; path=/; secure; samesite=strict; HttpOnly`;
    localStorage.setItem('token', JSON.stringify(token));
    localStorage.setItem('userId', userId); // Store userId in localStorage
    localStorage.setItem('username', username);

    window.location.reload(); // Example: reload the window
  })
  .catch(function (error) {
    console.log(error);
  });
}

const RegisterForm = () => {

  if (localStorage.getItem('token') != null){
    return <Navigate to='/' replace = {true} />
  }

  // State to hold form data
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    passwordRepeat: ""
  });

  // Function to handle input changes
  const handleInputChange = (e: { target: { name: any; value: any } }) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Function to handle form submission
  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();

    if (formData.password === formData.passwordRepeat){
      auth(formData.email, formData.password);
    }
    else{
      console.log("Passwords not matching");
    }
    
  };

  return (
    <div className="grid-center" id="form-beauty">
      <div className="form-box">
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">
              Email address
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className="form-control"
              id="form-input"
              aria-describedby="emailHelp"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="InputPassword" className="form-label">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              className="form-control"
              id="form-input"
            />
          </div>
          <div className="mb-3">
              <label htmlFor="exampleInputUsername" className="form-label">
                Username
              </label>
              <input
                type="username"
                name="username"
                value={formData.email}
                onChange={handleInputChange}
                className="form-control"
                id="form-input"
                aria-describedby="usernameHelp"
              />
            </div>
          <div className="mb-3">
            <label htmlFor="InputPasswordRepeat" className="form-label">
              Repeat password
            </label>
            <input
              type="password"
              name="passwordRepeat"
              value={formData.passwordRepeat}
              onChange={handleInputChange}
              className="form-control"
              id="form-input"
            />
            <div>Already registered? <a href="http://localhost:5173/Login">Log in</a></div>
            <button type="submit" className="btn btn-primary" id="login">
              Register
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterForm;
