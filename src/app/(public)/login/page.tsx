"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useAuth } from "@/contexts/authContext";
import Banner from "@/components/Banner";
import { BANNER_IMAGE } from "@/lib/data";

const LoginPage: React.FC = () => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [msg, setMsg] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const { login } = useAuth();

  const handleLogin = async (): Promise<void> => {
    setMsg("");
    if (!username?.trim() || !password) {
      setMsg("Please enter both username and password.");
      return;
    }

    setLoading(true);

    // Let the loading UI paint before starting the API call
    await new Promise((r) => setTimeout(r, 0));

    try {
      const success = await login(username.trim(), password);
      if (!success) {
        setMsg("Login failed. Check your username and password, or try again later.");
        setLoading(false); // only dismiss overlay on failure; on success the page unmounts
      }
      // On success: login() already called router.push(); let the component
      // unmount naturally so the overlay stays visible during navigation.
    } catch {
      setLoading(false);
    }
  };

  const isSuccess = msg.includes("successful");

  return (
    <>
      {/* <Banner title="Login" backgroundImage={BANNER_IMAGE} /> */}

      <section className="py-120" style={{ backgroundColor: "var(--theme-bg-light)" }}>
        <div className="container">
          <div className="row align-items-stretch g-4 g-lg-5 justify-content-center">
            <div className="col-lg-6 col-xl-5 d-none d-lg-flex">
              <div
                className="w-100 h-100 d-flex flex-column justify-content-center"
                style={{
                  background:
                    "linear-gradient(155deg, rgba(17,110,99,0.95), rgba(1,39,88,0.94))",
                  borderRadius: "28px",
                  boxShadow: "var(--box-shadow)",
                  padding: "44px 40px",
                  color: "#fff",
                }}
              >
                <span
                  style={{
                    backgroundColor: "rgba(255,255,255,0.2)",
                    border: "1px solid rgba(255,255,255,0.28)",
                    borderRadius: 999,
                    padding: "8px 16px",
                    fontSize: 13,
                    fontWeight: 700,
                    letterSpacing: "0.5px",
                    display: "inline-flex",
                    width: "fit-content",
                    marginBottom: 18,
                  }}
                >
                  STUDENT PORTAL
                </span>
                <h2 style={{ color: "#fff", fontSize: 44, lineHeight: 1.12, marginBottom: 18 }}>
                  Welcome Back to Zenith
                </h2>
                <p style={{ color: "rgba(255,255,255,0.9)", marginBottom: 24 }}>
                  Access attendance, assignments, and school updates from one place with your account.
                </p>
                <ul style={{ display: "grid", gap: 12, marginBottom: 0 }}>
                  <li className="d-flex align-items-center gap-2">
                    <i className="far fa-circle-check" aria-hidden="true" />
                    Secure sign-in for students, teachers, and parents
                  </li>
                  <li className="d-flex align-items-center gap-2">
                    <i className="far fa-circle-check" aria-hidden="true" />
                    Real-time notifications and dashboard access
                  </li>
                  <li className="d-flex align-items-center gap-2">
                    <i className="far fa-circle-check" aria-hidden="true" />
                    Fast, role-based redirection after login
                  </li>
                </ul>
              </div>
            </div>

            <div className="col-md-10 col-lg-6 col-xl-5">
              <div className={`login-form position-relative ${msg && !isSuccess ? "animate-shake" : ""}`}>
                {loading && <div className="login-form-progress" />}

                {loading && (
                  <div
                    className="position-absolute d-flex flex-column align-items-center justify-content-center"
                    style={{
                      inset: 0,
                      backgroundColor: "rgba(255,255,255,0.9)",
                      borderRadius: "inherit",
                      zIndex: 5,
                    }}
                  >
                    <div className="spinner-border" style={{ color: "var(--theme-color)" }} role="status" />
                    <p className="mt-3 fw-semibold mb-0" style={{ color: "var(--color-dark)" }}>
                      Logging you in...
                    </p>
                  </div>
                )}

                <div className="login-header">
                  <h3>Sign In</h3>
                  <p style={{ fontSize: 16, color: "var(--body-text-color)" }}>
                    Continue to your Zenith dashboard
                  </p>
                </div>

                <form
                  onSubmit={(e: React.FormEvent) => {
                    e.preventDefault();
                    handleLogin();
                  }}
                >
                  <div className="form-group">
                    <label htmlFor="username">Username</label>
                    <input
                      id="username"
                      type="text"
                      className="form-control"
                      placeholder="Enter your username"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      disabled={loading}
                      autoComplete="username"
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input
                      id="password"
                      type="password"
                      className="form-control"
                      placeholder="Enter your password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      disabled={loading}
                      autoComplete="current-password"
                      required
                    />
                  </div>

                  {msg && (
                    <p
                      className="mb-3 fw-medium"
                      style={{
                        color: isSuccess ? "#0b9f63" : "#cc2e2e",
                      }}
                    >
                      {msg}
                    </p>
                  )}

                  <button type="submit" className="theme-btn" disabled={loading}>
                    <span className="far fa-sign-in" aria-hidden="true" />
                    {loading ? "Please wait..." : "Login Now"}
                  </button>
                </form>

                <div className="login-footer">
                  <p>
                    Back to home? <Link href="/">Go to Homepage</Link>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default LoginPage;