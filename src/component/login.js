import React, { useState, useEffect } from "react";
import "../login.css";
import NavBar from "../component/navBar";
import { useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import axios from "axios";
import config from "../config"; // Adjust the path as necessary

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userName, setUserName] = useState("");
  const [error, setError] = useState("");
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  console.log(users, "lalalalla");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const response = await axios.get(
        `${config.apiBaseUrl}user/login`,
        {
          params: { userName, password },
        }
      );
      const data = response.data;

      if (data.userId > 0) {
        localStorage.setItem("user", JSON.stringify(data));
        navigate("/");
      } else {
        setError("User doesn't exist");
      }
    } catch (error) {
      if (error.response && error.response.status === 404) {
        setError("User doesn't exist");
      } else {
        setError("Something went wrong");
      }
    }
  };

  return (
    <div className="App">
      <NavBar userName={userName} />
      <div className="login-container">
        <form className="login-form" onSubmit={handleSubmit}>
          <h2 className="fw-bold">Login</h2>
          <div className="form-group">
            <input
              type="text"
              placeholder="username"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <div className="password-input-container">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                placeholder="password"
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <span
                className="password-toggle-icon"
                onClick={togglePasswordVisibility}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>
          </div>
          {error && <p className="error">{error}</p>}
          <button type="submit">Login</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
