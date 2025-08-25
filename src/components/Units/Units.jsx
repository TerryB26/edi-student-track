import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Units.css';

const Units = ({ units = [] }) => {
  const navigate = useNavigate();
  return (
    <div className="units-page">
      <h2 className="page-title">My Journey</h2>

      <div className="units-header">
        <h3>Units</h3>
      </div>

      <div className="units-grid">
        {units.map((u, i) => {
          const colorClasses = ['uc-pink', 'uc-green', 'uc-yellow', 'uc-blue'];
          const cc = colorClasses[i % colorClasses.length];
          return (
          <div className={`unit-card ${cc}`} key={i}>
            {i !== 0 && (
              <div className="unit-lock" title="Locked">
                <i className="bi bi-lock-fill" aria-hidden="true"></i>
              </div>
            )}
            <div className="unit-icon" aria-hidden="true">
              <i className="bi bi-journal-text"></i>
            </div>
            <div className="unit-body">
              <h4 className="unit-title">{u.title}</h4>
              <p className="unit-desc">{u.description}</p>
            </div>
            <div className="unit-footer">
              <button
                className="btn unit-btn"
                type="button"
                disabled={i !== 0}
                aria-disabled={i !== 0}
                onClick={() => i === 0 && navigate('/units/1')}
              >
                Start
              </button>
            </div>
          </div>
        );})}
      </div>
    </div>
  );
};

export default Units;
