import React, { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase"; // Firebase authentication
import { useNavigate } from "react-router-dom"; // Import useNavigate
import "../css/SigninPage.css";

function SigninPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate(); // Initialize navigate function

  const handleSignIn = async (e) => {
    e.preventDefault();
    setError("");

    try {
      await signInWithEmailAndPassword(auth, email, password);
      console.log("User signed in successfully!");
      // Redirect to dashboard or home after successful login
      navigate("/dashboard"); // Use navigate to redirect to the dashboard
    } catch (err) {
      console.error("Error signing in:", err);
      setError("Invalid email or password. Please try again.");
    }
  };

  return (
    <div className="signin-container">
      <div className="signin-form-container">
        <h2>Sign In</h2>
        {error && <p className="error-message">{error}</p>}
        <form onSubmit={handleSignIn} className="signin-form">
          <div className="input-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="input-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <div className="actions">
            <button type="submit" className="signin-button">
              Sign In
            </button>
          </div>

          <div className="signup-link">
            <p>
              Don't have an account?{" "}
              <a href="/signup" className="signup-button">
                Sign Up
              </a>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default SigninPage;
