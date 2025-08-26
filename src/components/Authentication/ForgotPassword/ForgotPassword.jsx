import React from "react";
import "../../../css/ForgotPassword.css";

const ForgotPassword = ({
  email,
  emailError,
  onEmailChange,
  onSubmit,
  onBackToLogin,
  onCreateAccount,
  showSuccess,
  onCloseSuccess,
}) => {
  return (
    <div className="forgot-page" role="main">
      <div className="forgot-left">
        <img className="fp-logo" src="/images/Logo.png" alt="Edinova" />

        <div className="fp-card" role="form" aria-labelledby="fp-title">
          <div className="fp-header">
            <h1
              id="fp-title"
              className={`fp-title ${emailError ? "error" : ""}`}
            >
              {emailError
                ? "Uh-oh! Lost your password?"
                : "Forgot your password?"}
            </h1>
            <p className="fp-subtitle">
              Type your email below, and we’ll send you a link to create a new
              one.
            </p>
          </div>

          <label htmlFor="fp-email" className="fp-label">
            Email Address
          </label>
          <div className={`fp-input ${emailError ? "has-error" : ""}`}>
            <input
              id="fp-email"
              type="email"
              value={email}
              onChange={onEmailChange}
              placeholder="Enter your email address here"
              aria-invalid={!!emailError}
              aria-describedby={emailError ? "fp-email-error" : undefined}
            />
          </div>
          {emailError && (
            <div className="fp-error" id="fp-email-error">
              <i className="bi bi-exclamation-circle" aria-hidden="true"></i>
              <span>Invalid email. Please try again.</span>
            </div>
          )}

          <button className="fp-btn" onClick={onSubmit} type="button">
            Send reset link
          </button>

          <div className="fp-actions fp-actions--stacked">
            <button
              className="fp-link back"
              onClick={onBackToLogin}
              type="button"
            >
              <span className="fp-icon-bubble" aria-hidden="true">
                <i className="bi bi-arrow-left"></i>
              </span>
              <span>Back to log in</span>
            </button>
            <div className="fp-signup">
              <span>New around here? </span>
              <button
                className="fp-link"
                onClick={onCreateAccount}
                type="button"
              >
                Create an account
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Success modal */}
      {showSuccess && (
        <div
          className="fp-modal-overlay"
          role="dialog"
          aria-modal="true"
          aria-labelledby="fp-success-title"
        >
          <div className="fp-modal">
            <button
              className="fp-modal-close"
              aria-label="Close"
              onClick={onCloseSuccess}
            >
              <i className="bi bi-x-lg" />
            </button>
            <div className="fp-modal-body">
              <div className="fp-success-icon" aria-hidden="true">
                <i className="bi bi-check2-circle" />
              </div>
              <h3 id="fp-success-title" className="fp-modal-title">
                You’ve got mail!
              </h3>
              <p className="fp-modal-text">
                We’ve sent you a reset link to your email address. Check your
                inbox or spam folder for a password reset link email.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ForgotPassword;
