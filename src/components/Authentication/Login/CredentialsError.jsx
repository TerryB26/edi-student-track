import React, { useEffect } from 'react';
import '../../../css/CredentialsError.css';

const CredentialsError = ({ 
  onBackToLogin,
  onSignUp,
  onClose,
  errorType = 'credentials' // 'credentials' or 'unregistered'
}) => {
  // Handle escape key to close modal
  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [onClose]);

  // Prevent body scroll when modal is open
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  // Handle backdrop click
  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  // Content based on error type
  const getContent = () => {
    if (errorType === 'unregistered') {
      return {
        icon: 'bi bi-exclamation',
        iconClass: 'warning',
        title: "Hmm, that email isn't registered with Edinova yet",
        message: "Looks like you don't have an account yet! Want to sign up instead?",
        buttonText: "Create an account",
        buttonAction: onSignUp
      };
    }
    
    // Default: credentials error
    return {
      icon: 'bi bi-x',
      iconClass: '',
      title: "Password or Email Incorrect",
      message: "Hmm, something's not quite right with the email or password you entered. Let's give it another shot!",
      buttonText: "Back to log in",
      buttonAction: onBackToLogin
    };
  };

  const content = getContent();

  return (
    <div className="credentials-error-overlay" onClick={handleBackdropClick}>
      <div className="credentials-error-modal">
        {/* Close Button */}
        <button 
          className="credentials-error-close" 
          onClick={onClose}
          title="Close"
          aria-label="Close modal"
        >
          <i className="bi bi-x-lg"></i>
        </button>
        
        {/* Error Icon */}
        <div className="credentials-error-icon">
          <div className={`credentials-error-icon-circle ${content.iconClass}`}>
            <i className={`${content.icon} ${content.iconClass}`}></i>
          </div>
        </div>
        
        {/* Content */}
        <div className="credentials-error-content">
          <h2 className="credentials-error-title">{content.title}</h2>
          <p className="credentials-error-message">
            {content.message}
          </p>
        </div>
        
        {/* Action Button */}
        <button className="credentials-error-button" onClick={content.buttonAction}>
          <span className="credentials-error-button-text">{content.buttonText}</span>
        </button>
      </div>
    </div>
  );
};

export default CredentialsError;
