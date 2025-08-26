import React, { useState } from "react";
import LoginComponent from "../../../components/Authentication/Login/Login";
import CredentialsError from "../../../components/Authentication/Login/CredentialsError";
import "../../../css/Login.css";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [showCredentialsError, setShowCredentialsError] = useState(false);
  const [errorType, setErrorType] = useState("credentials"); // 'credentials' or 'unregistered'
  const navigate = useNavigate();
  const { login } = useAuth();

  // Dummy credentials for testing
  const DUMMY_EMAIL = "test@edinova.com";
  const DUMMY_PASSWORD = "password123";

  const REGISTERED_EMAILS = [
    "test@edinova.com",
    "admin@edinova.com",
    "user@edinova.com",
  ];

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    if (emailError) setEmailError("");
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    if (passwordError) setPasswordError("");
  };

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  const handleRememberMeChange = () => {
    setRememberMe(!rememberMe);
  };

  const handleLogin = () => {
    console.log("Login button clicked!");
    setEmailError("");
    setPasswordError("");

    let hasErrors = false;

    if (!email) {
      setEmailError("Email is required.");
      hasErrors = true;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      setEmailError("Wrong email. Please try again.");
      hasErrors = true;
    }

    if (!password) {
      setPasswordError("Password is required.");
      hasErrors = true;
    } else if (password.length < 6) {
      setPasswordError("Password must be at least 6 characters.");
      hasErrors = true;
    }

    if (!hasErrors) {
      if (!REGISTERED_EMAILS.includes(email.toLowerCase())) {
        console.log("Email not registered, showing unregistered error modal");
        setErrorType("unregistered");
        setShowCredentialsError(true);
        return;
      }

      if (email === DUMMY_EMAIL && password === DUMMY_PASSWORD) {
        console.log("Login successful!");
        login({ email }, rememberMe);
        navigate("/units");
      } else {
        console.log("Invalid credentials, showing error modal");
        setErrorType("credentials");
        setShowCredentialsError(true);
      }
    }
  };

  const handleForgotPassword = () => {
    navigate("/forgot");
  };

  const handleCreateAccount = () => {
    console.log("Create account clicked");
    // Add your create account logic here
  };

  const handleCloseCredentialsError = () => {
    setShowCredentialsError(false);
  };

  const handleBackToLogin = () => {
    setShowCredentialsError(false);
    // Clear form if needed
    setEmail("");
    setPassword("");
  };

  const handleSignUp = () => {
    console.log("Sign up clicked");
    // Add your sign up navigation logic here
  };

  return (
    <>
      <LoginComponent
        email={email}
        password={password}
        showPassword={showPassword}
        rememberMe={rememberMe}
        emailError={emailError}
        passwordError={passwordError}
        onEmailChange={handleEmailChange}
        onPasswordChange={handlePasswordChange}
        onTogglePassword={handleTogglePassword}
        onToggleRemember={handleRememberMeChange}
        onSubmit={handleLogin}
        onForgotPassword={handleForgotPassword}
        onCreateAccount={handleCreateAccount}
      />

      {showCredentialsError && (
        <CredentialsError
          onBackToLogin={handleBackToLogin}
          onSignUp={handleSignUp}
          onClose={handleCloseCredentialsError}
          errorType={errorType}
        />
      )}
    </>
  );
};

export default LoginPage;
