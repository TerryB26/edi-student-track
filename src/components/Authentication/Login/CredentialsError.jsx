import React, { useEffect } from 'react';
import '../../../css/CredentialsError.css';

const CredentialsError = ({ 
  onBackToLogin,
  onSignUp,
  onClose 
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
          <div className="credentials-error-icon-circle">
            <i className="bi bi-x"></i>
          </div>
        </div>
        
        {/* Content */}
        <div className="credentials-error-content">
          <h2 className="credentials-error-title">Password or Email Incorrect</h2>
          <p className="credentials-error-message">
            Hmm, something's not quite right with the email or password you entered. Let's give it another shot!
          </p>
        </div>
        
        {/* Action Button */}
        <button className="credentials-error-button" onClick={onBackToLogin}>
          <span className="credentials-error-button-text">Back to log in</span>
        </button>
      </div>
    </div>
  );
};

export default CredentialsError;
