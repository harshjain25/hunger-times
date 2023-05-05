import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export const Login = () => {
  let history = useNavigate();

  const [cred, setCred] = useState({ email: "", password: "" });

  const onChange = (e) => {
    setCred({ ...cred, [e.target.name]: e.target.value });
  };
  const onSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch(`http://localhost:5000/api/auth/loginuser`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: cred.email, password: cred.password }),
    });
    const json = await response.json();
    if (json.success) {
      localStorage.setItem("name", json.name);
      history("/");
    } else {
      alert("invalid credentials");
    }
  };
  return (
    <>
      {localStorage.getItem("name") ? (
        <div className="container">
          <h2 className="my-3">Already Loggedin</h2>
        </div>
      ) : (
        <div className="container">
          <h2 className="my-3">Login</h2>
          <form onSubmit={onSubmit}>
            <div className="mb-3 form-group">
              <label htmlFor="email" className="form-label">
                Email address
              </label>
              <input
                type="email"
                className="form-control"
                name="email"
                id="email"
                aria-describedby="emailHelp"
                placeholder="email"
                onChange={onChange}
              />
              <div id="emailHelp" className="form-text">
                We'll never share your email with anyone else.
              </div>
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <input
                type="password"
                className="form-control"
                name="password"
                id="password"
                onChange={onChange}
              />
            </div>
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </form>
        </div>
      )}
    </>
  );
};
