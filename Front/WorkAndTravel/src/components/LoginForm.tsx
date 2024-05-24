import React, { useState } from "react";
import { Navigate } from "react-router-dom";
import axios from "axios";
import "./test.css";

function auth(email1: string, password1: string) {
  var body = {
    email: email1,
    password: password1,
  };

  axios.post("http://localhost:4123/auth/authenticate", body)
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

function LoginForm() {

  if (localStorage.getItem('token') != null){
    return <Navigate to='/' replace = {true} />
  }

  // State to hold form data
  const [formData, setFormData] = useState({
    email: "",
    password: "",
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
    auth(formData.email, formData.password);
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
            <label htmlFor="exampleInputPassword1" className="form-label">
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
            <div>New to the site? <a href="http://localhost:5173/Register">Register</a></div>
            <button type="submit" className="btn btn-primary" id="login">
              Log in
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default LoginForm;
