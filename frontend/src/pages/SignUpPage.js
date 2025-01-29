import React, { useState } from "react";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../firebase"; // Import the initialized auth
import "../css/SignUpPage.css";
function SignUpPage() {
  const [name, setName] = useState(""); // User's full name
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState(""); // User's role (Buyer or Seller)
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSignUp = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    try {
      // Create the user with email and password
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      // Set the display name for the newly created user
      await updateProfile(user, { displayName: name });
      console.log("User created with display name:", user.displayName);

      // You can also store the role (buyer or seller) in the user's profile or in the database
      console.log("User role:", role);

      setSuccess("Account created successfully! Please sign in.");
    } catch (err) {
      console.error("Error signing up:", err);
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
            name="name"
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
            placeholder="Create a password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <div className="input-group">
          <label htmlFor="role">Role</label>
          <select
            id="role"
            name="role"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            required
          >
            <option value="">Select your role</option>
            <option value="buyer">Buyer</option>
            <option value="seller">Seller</option>
          </select>
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
