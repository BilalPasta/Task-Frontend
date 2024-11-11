"use client";

import React, { useState } from "react";
import { loginUser } from "../../../services/api";
import styles from "./AuthForm.module.css";
import Link from "next/link";

import { useRouter } from "next/navigation"; // Import useRouter

export const LoginForm = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      await loginUser({ email, password });
      alert("Login successful");
      router.push("/home"); // Redirect to the home page

      // Store token or handle user state here (e.g., useState or Context API)
    } catch (err) {
      console.log(err);
      setError("Invalid credentials");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.loginContainer}>
      <form onSubmit={handleLogin} className={styles.formContainer}>
        <h2 className={styles.heading}>Login to Your Account</h2>
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
          {loading ? "Logging in..." : "Login"}
        </button>

        <p className={styles.redirectText}>
          Dont have an account{" "}
          <Link href="/signup" className={styles.loginRedirect}>
            Create an account
          </Link>
        </p>
      </form>
    </div>
  );
};
