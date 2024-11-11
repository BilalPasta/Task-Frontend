"use client";

import React, { useState } from "react";
import { signupUser } from "../../../services/api";
import styles from "./AuthForm.module.css";
import Link from "next/link"; // for redirect to login page

export const SignupForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      await signupUser({ email, password });
      alert("Signup successful");
      // Redirect to login page or auto-login (you can replace this with Next.js routing)
    } catch (err) {
      console.log(err);
      setError("Signup failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.signupContainer}>
      <form onSubmit={handleSignup} className={styles.formContainer}>
        <h2 className={styles.heading}>Create an Account</h2>
        <div className={styles.inputGroup}>
          <label htmlFor="email" className={styles.label}>
            Email Address
          </label>
          <input
            id="email"
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className={styles.inputField}
          />
        </div>
        <div className={styles.inputGroup}>
          <label htmlFor="password" className={styles.label}>
            Password
          </label>
          <input
            id="password"
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className={styles.inputField}
          />
        </div>
        {error && <p className={styles.error}>{error}</p>}
        <button
          type="submit"
          disabled={loading}
          className={styles.submitButton}
        >
          {loading ? "Signing up..." : "Sign Up"}
        </button>
        <p className={styles.redirectText}>
          Already have an account?{" "}
          <Link href="/login" className={styles.loginRedirect}>
            Login here
          </Link>
        </p>
      </form>
    </div>
  );
};
