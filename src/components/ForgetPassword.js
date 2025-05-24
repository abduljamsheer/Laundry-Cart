import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function ForgotPassword() {
  const [showForm, setShowForm] = useState(true);
  const [email, setEmail] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const navigate=useNavigate()
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email) return alert("Please enter your email");
    setOtpSent(true);
  };

  return (
    <div style={{ maxWidth: 300, margin: "20px auto", fontFamily: "Arial" }}>
      {!showForm ? (
        <p
          style={{ color: "blue", cursor: "pointer", textDecoration: "underline" }}
          onClick={() => {
            setShowForm(true);
            setOtpSent(false);
            setEmail("");
          }}
        >
          Forgot Password?
        </p>
      ) : (
        <form onSubmit={handleSubmit} style={{ border: "1px solid #ccc", padding: 15, borderRadius: 4 }}>
          <label htmlFor="email" style={{ display: "block", marginBottom: 8 }}>
            Enter your email ID:
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={{ width: "100%", padding: 8, marginBottom: 10, boxSizing: "border-box" }}
          />
          <button type="submit" style={{ padding: "8px 12px", cursor: "pointer" }}>
            Generate OTP
          </button>

          {otpSent && (
            <p style={{ marginTop: 15, color: "green" }}>
              OTP sent to <b>{email}</b>. Please check your email.
            </p>
          )}

          <p
            style={{ marginTop: 15, color: "red", cursor: "pointer" }}
            onClick={() =>{ 
              navigate('/')
              setShowForm(false)}}
          >
            Cancel
          </p>
        </form>
      )}
    </div>
  );
}

export default ForgotPassword;
