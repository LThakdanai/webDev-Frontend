import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Login.css";
import { AuthContext } from "../AuthContext"; // ← เพิ่ม

function Login() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isChecked, setIsChecked] = useState(false);

  const { setUser, setUserId } = useContext(AuthContext); // ← ดึง context

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!username || !password) {
      alert("Please enter username and password.");
      return;
    }

    try {
      const response = await fetch("http://localhost:5431/api/users");
      if (!response.ok) throw new Error("Failed to fetch users.");

      const result = await response.json();
      const users = result.data;

      // Find user with matching credentials
      const user = users.find(
        (u) => u.name === username && u.password === password
      );

      if (!user) {
        alert("Invalid username or password.");
        return;
      }

      // Store in localStorage
      localStorage.setItem("token", "mock-token");
      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("userId", user.id);

      console.log("Logged in user ID:", user.id);

      // Set AuthContext values
      setUser({ name: user.name });
      setUserId(user.id);

      // Navigate
      navigate("/dashboard");
    } catch (error) {
      console.error("Login error:", error.message);
      alert("An error occurred. Please try again.");
    }
  };

  return (
    <main className="relative min-h-screen w-screen flex justify-center items-center bg-gradient-to-br from-indigo-900 to-slate-800 overflow-hidden p-8">
      <nav className="absolute top-10 right-20 w-full px-12 py-6 flex justify-end bg-transparent z-10">
        <div className="flex gap-6">
          <button className="nav-button">Home</button>
          <button className="nav-button">About</button>
          <button className="nav-button">Services</button>
          <button className="nav-button">Contact</button>
          <button className="nav-button">Login</button>
        </div>
      </nav>

      <div className="w-full max-w-[1280px] mx-auto relative">
        <form onSubmit={handleSubmit} className="login-form">
          <h1 className="login-title">Login</h1>

          <input
            type="text"
            placeholder="USERNAME"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="login-input"
            aria-label="Username"
          />

          <input
            type="password"
            placeholder="PASSWORD"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="login-input"
            aria-label="Password"
          />

          <div className="login-options">
            <label className="remember-label">
              <input
                type="checkbox"
                checked={isChecked}
                onChange={() => setIsChecked(!isChecked)}
              />
              <span>Remember me</span>
            </label>
            <button type="button" className="forgot-button">
              Forget Password ?
            </button>
          </div>

          <button type="submit" className="submit-button">
            Login
          </button>
        </form>
      </div>
    </main>
  );
}

export default Login;
