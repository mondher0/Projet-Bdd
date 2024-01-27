import React, { useState } from "react";
import logo from "../assets/logo.svg";
import "../css/auth.css";
import { useNavigate } from "react-router-dom";
import { baseUrl } from "../utils/constants";
import axios from "axios";

const Register = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // handle submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      setError(false);
      const data = {
        name,
        email,
        password,
      };
      const response = await axios.post(`${baseUrl}auth/register`, data);
      console.log(response);
      localStorage.setItem("token", response.data.access_token);
      window.location.href = "/";
    } catch (error) {
      setIsLoading(false);
      setError(true);
      console.log(error);
    }
  };
  return (
    <div className="login">
      {error && alert("Somthing went wrong")}
      <div className="login-card">
        <img src={logo} alt="logo" />
        <h2>Sign up to Comfy sloth</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-control">
            <label htmlFor="email">Name</label>
            <input
              type="text"
              id="name"
              required
              placeholder="Name"
              onChange={(e) => {
                setError(false);
                setName(e.target.value);
              }}
            />
          </div>
          <div className="form-control">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              required
              placeholder="Adresse email"
              onChange={(e) => {
                setError(false);
                setEmail(e.target.value);
              }}
            />
          </div>
          <div className="form-control">
            <label htmlFor="email">Password</label>
            <input
              type="password"
              id="password"
              required
              placeholder="Mot de passe"
              onChange={(e) => {
                setError(false);
                setPassword(e.target.value);
              }}
            />
          </div>
          {/* {error && (
            <p
              style={{
                color: "red",
                fontWeight: "bold",
              }}
            >
              {error}
            </p>
          )} */}
          <button className="login-btn hover" type="submit">
            {isLoading ? "Chargement..." : "Se connecter"}
          </button>
          <div
            className="labels"
            style={{
              marginTop: "10px",
            }}
          >
            <label
              htmlFor="password"
              onClick={() => navigate("/login")}
              className="hover"
            >
              You already have an account? Sign in
            </label>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
