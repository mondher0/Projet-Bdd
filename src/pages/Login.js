import React, { useState } from "react";
import logo from "../assets/logo.svg";
import "../css/auth.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { baseUrl } from "../utils/constants";

const Login = () => {
  const navigate = useNavigate();
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
        email,
        password,
      };
      const response = await axios.post(`${baseUrl}auth/login`, data);
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
        <h2>Login in to Comfy sloth</h2>
        <form onSubmit={handleSubmit}>
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
              onClick={() => navigate("/register")}
              className="hover"
            >
              You don't have an account? Sign up
            </label>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
