import React from 'react';
import './UnitDetail.css';

const UnitDetail = ({
  unitTitle = 'Introduction',
  sectionLabel = 'Section 1, Module 1',
  moduleTitle = 'See, Think, Innovate',
  showTranscript = false,
  onToggleTranscript,
  onBack,
  onReport,
  onStart,
  progress = 0, // 0–100
}) => {
  return (
    <div className="unit-detail-page">
      <div className="unit-detail-header">
        <button className="header-link" onClick={onBack}>
          <i className="bi bi-arrow-left"></i>
          <span>Back to My Journey</span>
        </button>
        <button className="header-link report" onClick={onReport}>
          <i className="bi bi-flag-fill"></i>
          <span>Report something</span>
        </button>
      </div>

      <div className="module-context">
        <div className="context-pill">
          <span className="context-label">{sectionLabel}</span>
          <strong className="context-title">{moduleTitle}</strong>
        </div>
      </div>

      <div className="card unit-card">
        <div className="card-body">
          {/* Module progress (not video progress) – shown above the title per design */}
          <div className="unit-progress" aria-label="Module progress">
            <div className="progress-wrap">
              <div className="progress-track">
                <div className="progress-fill" style={{ width: `${Math.max(0, Math.min(progress, 100))}%` }} />
              </div>
            </div>
          </div>

          <div className="unit-card-header">
            <span className="marker" aria-hidden="true"></span>
            <h3 className="unit-heading">{unitTitle}</h3>
          </div>

          <div className="unit-media" aria-label="Unit media">
            <div className="media-placeholder">
              <button className="play-btn" type="button" aria-label="Play">
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M8 5l10 7-10 7V5z" fill="#FFDF5D"/>
                </svg>
              </button>
            </div>
          </div>

          <div className="unit-actions">
            <button className="link-transcript" onClick={onToggleTranscript}>
              {showTranscript ? (
                <>
                  <i className="bi bi-eye-slash"></i>
                  <span>Hide transcriptions</span>
                </>
              ) : (
                <>
                  <i className="bi bi-eye"></i>
                  <span>Show transcriptions</span>
                </>
              )}
            </button>
            <button className="btn btn-primary-accent" onClick={onStart}>Let's get started</button>
          </div>
        </div>
      </div>

      {showTranscript && (
        <div className="card transcript-card">
          <div className="card-body">
            <h4 className="transcript-title">Transcription</h4>
            <p>
              Welcome back, Innovpreneur! You're already enrolled in See, Think, Innovate; now it's time to level up.
              This module is all about thinking beyond the obvious, recognizing patterns, and experimenting with ideas.
            </p>
            <p>
              We'll begin with a short video, observe patterns, and work through insight prompts. Continue as you learn by
              doing. Let's dive in.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default UnitDetail;
