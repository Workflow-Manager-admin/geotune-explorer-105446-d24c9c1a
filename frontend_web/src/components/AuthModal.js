import React, { useState } from "react";

/**
 * AuthModal handles authentication flows (login only for demo).
 */
const AuthModal = ({ open, onClose, onAuthSuccess }) => {
  const [mode, setMode] = useState("login");
  const [form, setForm] = useState({ username: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  if (!open) return null;

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }
  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      // TODO: replace with API call
      // For demo purpose, any data logs in
      if (!form.username) throw new Error("Username required");
      onAuthSuccess({ id: "demoUser", username: form.username, avatar: null, displayName: form.username });
    } catch (err) {
      setError(err.message);
    }
    setLoading(false);
  }

  return (
    <div className="MuseMap-AuthModal-Wrapper">
      <div className="MuseMap-AuthModal">
        <button className="MuseMap-Modal-Close" onClick={onClose}>
          ×
        </button>
        <h2>{mode === "login" ? "Sign In" : "Sign Up"}</h2>
        <form className="MuseMap-AuthForm" onSubmit={handleSubmit}>
          <label>
            Username
            <input
              name="username"
              placeholder="Username"
              value={form.username}
              onChange={handleChange}
            />
          </label>
          <label>
            Password
            <input
              name="password"
              type="password"
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
            />
          </label>
          {error && <div className="MuseMap-Error">{error}</div>}
          <button className="MuseMap-AuthSubmit" type="submit" disabled={loading}>
            {loading ? "Signing in..." : mode === "login" ? "Sign In" : "Sign Up"}
          </button>
        </form>
        <div className="MuseMap-Auth-Link">
          {mode === "login"
            ? (
              <span>
                New?{" "}
                <button onClick={() => setMode("signup")} type="button">
                  Create account
                </button>
              </span>
            ) : (
              <span>
                Already a member?{" "}
                <button onClick={() => setMode("login")} type="button">
                  Sign In
                </button>
              </span>
            )
          }
        </div>
      </div>
      <div className="MuseMap-Backdrop" onClick={onClose}/>
    </div>
  );
};
export default AuthModal;
