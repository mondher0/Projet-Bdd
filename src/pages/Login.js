import React from "react";
import logo from "../assets/logo.svg";
import "../css/auth.css";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  return (
    <div className="login">
      <div className="login-card">
        <img src={logo} alt="logo" />
        <h2>Login in to Comfy sloth</h2>
        <form>
          <div className="form-control">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              required
              placeholder="Adresse email"
            />
          </div>
          <div className="form-control">
            <label htmlFor="email">Password</label>
            <input
              type="password"
              id="password"
              required
              placeholder="Mot de passe"
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
            {/* {isLoading ? "Chargement..." : "Se connecter"} */}
            Se connecter
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
