import React, { useState } from "react";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../firebase";
import axios from "axios"; // Make sure axios is imported
import "../css/SignUpPage.css";

function SignUpPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSignUp = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      // Firebase Authentication for user creation
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      // Update Firebase profile with the user's name
      await updateProfile(user, { displayName: name });

      // Send UID, name, and email to backend for PostgreSQL storage
      await axios.post("http://127.0.0.1:5000/signup", {
        uid: user.uid, // Firebase UID
        name: name,
        email: email,
      });

      setSuccess("Account created successfully!");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="signup-container">
      <h2>Sign Up</h2>
      {error && <p className="error-message">{error}</p>}
      {success && <p className="success-message">{success}</p>}
      <form onSubmit={handleSignUp} className="signup-form">
        <div className="input-group">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            placeholder="Enter your full name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        <div className="input-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
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
            placeholder="Create a password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <div className="actions">
          <button type="submit" className="signup-button">
            Sign Up
          </button>
        </div>

        <div className="signin-link">
          <p>
            Already have an account?{" "}
            <a href="/signin" className="signin-button">
              Sign In
            </a>
          </p>
        </div>
      </form>
    </div>
  );
}

export default SignUpPage;
