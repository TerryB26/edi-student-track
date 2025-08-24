import React, { useState } from 'react';
import LoginComponent from '../../../components/Authentication/Login/Login';
import CredentialsError from '../../../components/Authentication/Login/CredentialsError';
import '../../../css/Login.css';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [showCredentialsError, setShowCredentialsError] = useState(false);
  const [errorType, setErrorType] = useState('credentials'); // 'credentials' or 'unregistered'

  // Dummy credentials for testing
  const DUMMY_EMAIL = 'test@edinova.com';
  const DUMMY_PASSWORD = 'password123';
  
  // Simulate registered emails (you can expand this list)
  const REGISTERED_EMAILS = ['test@edinova.com', 'admin@edinova.com', 'user@edinova.com'];

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    if (emailError) setEmailError(''); // Clear error when user starts typing
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    if (passwordError) setPasswordError(''); // Clear error when user starts typing
  };

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  const handleRememberMeChange = () => {
    setRememberMe(!rememberMe);
  };

  const handleLogin = () => {
    console.log('Login button clicked!'); // Debug log
    // Clear previous errors
    setEmailError('');
    setPasswordError('');

    // Validation
    let hasErrors = false;

    if (!email) {
      setEmailError('Email is required.');
      hasErrors = true;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      setEmailError('Wrong email. Please try again.');
      hasErrors = true;
    }

    if (!password) {
      setPasswordError('Password is required.');
      hasErrors = true;
    } else if (password.length < 6) {
      setPasswordError('Password must be at least 6 characters.');
      hasErrors = true;
    }

    if (!hasErrors) {
      // First check if email is registered
      if (!REGISTERED_EMAILS.includes(email.toLowerCase())) {
        console.log('Email not registered, showing unregistered error modal');
        setErrorType('unregistered');
        setShowCredentialsError(true);
        return;
      }
      
      // Then check against dummy credentials
      if (email === DUMMY_EMAIL && password === DUMMY_PASSWORD) {
        console.log('Login successful!');
        // Redirect to dashboard or home page
        alert('Login successful! Welcome to Edinova!');
      } else {
        // Show credentials error modal
        console.log('Invalid credentials, showing error modal');
        setErrorType('credentials');
        setShowCredentialsError(true);
      }
    }
  };

  const handleForgotPassword = () => {
    console.log('Forgot password clicked');
    // Add your forgot password logic here
  };

  const handleCreateAccount = () => {
    console.log('Create account clicked');
    // Add your create account logic here
  };

  const handleCloseCredentialsError = () => {
    setShowCredentialsError(false);
  };

  const handleBackToLogin = () => {
    setShowCredentialsError(false);
    // Clear form if needed
    setEmail('');
    setPassword('');
  };

  const handleSignUp = () => {
    console.log('Sign up clicked');
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
