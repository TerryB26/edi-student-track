import React from 'react';
import './Help.css';

const Help = ({
  searchQuery,
  onSearchChange,
  onContactSupport,
  questions = [],
}) => {
  const borderClass = (tag) => {
    switch (tag) {
      case 'pink':
        return 'q-pink';
      case 'green':
        return 'q-green';
      case 'yellow':
        return 'q-yellow';
      case 'blue':
      default:
        return 'q-blue';
    }
  };

  return (
    <div className="help-page">
      <div className="help-header">
        <h2 className="page-title">Help</h2>
        <button className="report-link" type="button" aria-label="Report something">
          <i className="bi bi-flag-fill" aria-hidden="true"></i>
          <span>Report something</span>
        </button>
      </div>

      <div className="card help-card">
        <div className="card-body">
          <div className="help-card-header">
            <h3>Common Questions</h3>
          </div>
          <div className="search-box">
            <input
              type="text"
              className="search-input"
              placeholder="Search other common questions"
              value={searchQuery}
              onChange={(e) => onSearchChange && onSearchChange(e.target.value)}
            />
            <span className="bi bi-search" aria-hidden="true"></span>
          </div>

          <div className="questions-grid">
            {questions.map((q, idx) => (
              <button key={idx} className={`question-card ${borderClass(q.tag)}`} type="button">
                {q.text}
              </button>
            ))}
          </div>

          <div className="pager">
            <button className="page-btn" disabled>1</button>
            <button className="page-btn">2</button>
            <button className="page-btn">3</button>
            <span className="page-ellipsis">…</span>
            <button className="page-btn">8</button>
          </div>
        </div>
      </div>
      <div className="support-illustration">
        <img src="/images/assets/help-man.png" alt="Helper" />
      </div>
      <div className="contact-support">
        <div className="support-content">
          <h3>Can’t find what you’re looking for?</h3>
          <p>
            Contact our friendly support team that will help you get back up on your feet.
          </p>
          <button className="btn btn-support" onClick={onContactSupport}>
            Contact Support
          </button>
        </div>
      </div>
     
    </div>
  );
};

export default Help;
