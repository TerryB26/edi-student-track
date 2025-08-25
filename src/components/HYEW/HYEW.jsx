import React, { useState } from 'react';
import './HYEW.css';

const items = [
  { id: 'fork', label: 'Fork', img: '/images/assets/illustrated-crockery-icons.svg' },
  { id: 'plate', label: 'Plate', img: '/images/assets/plate.svg' },
  { id: 'spoon', label: 'Spoon', img: '/images/assets/spoon.svg' },
  { id: 'rolling-pin', label: 'Rolling Pin', img: '/images/assets/unnamed.svg' },
  { id: 'microwave', label: 'Microwave', img: '/images/assets/appliancesfilledcolor-3.svg' },
];

export default function HYEW({ sectionLabel, moduleTitle, onBack, onReport, onKeepGoing }) {
  const [selected, setSelected] = useState(null);
  const [showPrompt, setShowPrompt] = useState(false);

  const selectedItem = items.find(i => i.id === selected);

  return (
    <div className="hyew-page">
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

      <div className="hyew-grid">
        {!selected && (
          <div className="card hyew-card">
            <div className="card-body">
              <div className="hyew-header">
                <span className="marker" aria-hidden="true"></span>
                <h3 className="hyew-heading">Have You Ever Wondered?</h3>
                <span className="hyew-chip">Micro-lesson</span>
              </div>
              <p className="hyew-intro">
                Select an item you use often and explore a short story about how people interact with it.
                We’ll use this to spark observation and curiosity.
              </p>
              <div className="select-grid">
                {items.map((it) => (
                  <button
                    key={it.id}
                    className={`select-tile ${selected === it.id ? 'selected' : ''}`}
                    onClick={() => { setSelected(it.id); setShowPrompt(false); }}
                  >
                    <img src={it.img} alt={it.label} />
                    <span>{it.label}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {selected && selectedItem && (
          <div className="card hyew-detail-card">
            <div className="card-body">
              <div className="detail-header">
                <span className="marker" aria-hidden="true"></span>
                <h4 className="detail-title">{selectedItem.label}</h4>
                <span className="hyew-chip">Micro-lesson</span>
              </div>
              <div className="detail-content">
                <div className="detail-figure">
                  <img src={selectedItem.img} alt={selectedItem.label} />
                </div>
                <div className="detail-text">
                  <span className="detail-kicker">The Story</span>
                  <strong className="detail-headline">The Tool People Didn’t Trust</strong>
                  <p>
                    People have complex relationships with everyday tools and items. Let’s observe
                    how trust, habits, and context shape how they’re used. Imagine how small design
                    shifts could change behaviors.
                  </p>
                </div>
              </div>
              <div className="detail-actions">
                <button className="btn btn-ghost" onClick={() => setSelected(null)}>Select a different item</button>
                <button className="btn btn-primary-accent" onClick={() => { setShowPrompt(true); onKeepGoing?.(selectedItem); }}>Keep Going</button>
              </div>
            </div>
          </div>
        )}
      </div>

      {showPrompt && (
        <div className="question-prompt">
          <div className="prompt-card">
            <p className="prompt-title">Select a question you would like to answer</p>
            <div className="prompt-actions">
              <button className="prompt-btn prompt-orange">Make this an invention</button>
              <button className="prompt-btn prompt-green">Business Opportunity</button>
            </div>
          </div>
          <img className="prompt-figure" src="/images/assets/man.svg" alt="Coach" />
        </div>
      )}
    </div>
  );
}
