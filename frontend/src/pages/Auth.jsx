import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const API_BASE_URL = "http://localhost:8000/api/auth"; // Backend URL

const Auth = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isLogin, setIsLogin] = useState(false); // Default: Registration mode
  const navigate = useNavigate();

  // Theme State
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const handleRegister = async () => {
    try {
      const response = await axios.post(`${API_BASE_URL}/register/`, {
        username,
        password,
        email,
      });
      setMessage(response.data.message);
      setIsLogin(true); // Switch to login mode after successful registration
    } catch (error) {
      setMessage("Registration failed");
    }
  };

  const handleLogin = async () => {
    try {
      const response = await axios.post(`${API_BASE_URL}/login/`, {
        username,
        password,
      });

      localStorage.setItem("accessToken", response.data.access);
      localStorage.setItem("refreshToken", response.data.refresh);
      localStorage.setItem("username", username);

      window.dispatchEvent(new Event("storage")); // 🔥 Force Navbar Update

      setMessage("Login successful");
      navigate("/chat"); // Redirect to chat page
    } catch (error) {
      setMessage("Invalid credentials");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-base-200">
      <div className="bg-base-100 shadow-lg rounded-lg p-8 w-96 text-center">
        <h2 className="text-2xl font-semibold mb-4 text-primary">
          {isLogin ? "Login" : "Register"}
        </h2>

        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="input input-bordered w-full mb-2"
        />

        {!isLogin && (
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="input input-bordered w-full mb-2"
          />
        )}

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="input input-bordered w-full mb-4"
        />

        {isLogin ? (
          <button onClick={handleLogin} className="btn btn-accent w-full mb-2">
            Login
          </button>
        ) : (
          <button onClick={handleRegister} className="btn btn-primary w-full mb-2">
            Register
          </button>
        )}

        <button
          onClick={() => setIsLogin(!isLogin)}
          className="btn btn-outline w-full"
        >
          {isLogin ? "New User? Register" : "Already Registered? Login"}
        </button>

        {message && <p className="mt-4 text-error">{message}</p>}
      </div>
    </div>
  );
};

export default Auth;
