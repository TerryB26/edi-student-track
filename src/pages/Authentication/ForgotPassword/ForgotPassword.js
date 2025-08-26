import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ForgotPassword from "../../../components/Authentication/ForgotPassword/ForgotPassword";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);
  const navigate = useNavigate();

  const onEmailChange = (e) => {
    setEmail(e.target.value);
    if (emailError) setEmailError("");
  };

  const onSubmit = () => {
    const isValid = /\S+@\S+\.\S+/.test(email);
    if (!isValid) {
      setEmailError("Invalid email. Please try again.");
      return;
    }
    setShowSuccess(true);
  };

  return (
    <ForgotPassword
      email={email}
      emailError={emailError}
      onEmailChange={onEmailChange}
      onSubmit={onSubmit}
      onBackToLogin={() => navigate("/login")}
      onCreateAccount={() => alert("Sign up coming soon")}
      showSuccess={showSuccess}
      onCloseSuccess={() => setShowSuccess(false)}
    />
  );
}
