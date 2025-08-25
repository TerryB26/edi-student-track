import React, { useMemo, useState } from 'react';
import './HYEW.css';

const items = [
  { id: 'fork', label: 'Fork', img: '/images/assets/illustrated-crockery-icons.svg' },
  { id: 'plate', label: 'Plate', img: '/images/assets/plate.svg' },
  { id: 'spoon', label: 'Spoon', img: '/images/assets/spoon.svg' },
  { id: 'rolling-pin', label: 'Rolling Pin', img: '/images/assets/unnamed.svg' },
  { id: 'microwave', label: 'Microwave', img: '/images/assets/appliancesfilledcolor-3.svg' },
];

export default function HYEW({ sectionLabel, moduleTitle, onBack, onReport, onKeepGoing, onSkip }) {
  // State machine for the micro-lesson
  // stages: 'choose' | 'detail' | 'prompt' | 'inventor' | 'result-success' | 'result-fail'
  const [stage, setStage] = useState('choose');
  const [selected, setSelected] = useState(null);
  const [inventorText, setInventorText] = useState('');

  const selectedItem = useMemo(() => items.find(i => i.id === selected), [selected]);

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
        {stage === 'choose' && (
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
                    onClick={() => { setSelected(it.id); setStage('detail'); }}
                  >
                    <img src={it.img} alt={it.label} />
                    <span>{it.label}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

  {(stage === 'detail' || stage === 'prompt') && selectedItem && (
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
                <button className="btn btn-ghost" onClick={() => { setSelected(null); setStage('choose'); }}>Select a different item</button>
                <button className="btn btn-primary-accent" onClick={() => { setStage('prompt'); onKeepGoing?.(selectedItem); }}>Keep Going</button>
              </div>
            </div>
          </div>
        )}
      </div>

    {stage === 'prompt' && (
        <div className="question-prompt">
          <div className="prompt-card">
            <p className="prompt-title">Select a question you would like to answer</p>
            <div className="prompt-actions">
              <button className="prompt-btn prompt-orange" onClick={() => setStage('inventor')}>
                <i className="bi bi-lightbulb-fill"></i>
                <span>Think Like an Inventor</span>
              </button>
              <button className="prompt-btn prompt-green" onClick={() => alert('Business Opportunity coming soon')}>
                <i className="bi bi-buildings-fill"></i>
                <span>Business Opportunity</span>
              </button>
            </div>
          </div>
          <img className="prompt-figure" src="/images/assets/corner-man.png" alt="Coach" />
        </div>
      )}

      {stage === 'inventor' && (
        <div className="inventor-wrap">
          <div className="inventor-card">
            <div className="inventor-header">
              <i className="bi bi-lightbulb-fill"></i>
              <h3>Think Like an Inventor</h3>
            </div>
            <p className="inventor-sub">
              What eating tool could you create today that’s better suited for modern food, like noodles, wraps,
              or one-handed meals?
            </p>
            <div className="inventor-input">
              <textarea
                placeholder="I would create..."
                value={inventorText}
                onChange={(e) => setInventorText(e.target.value)}
                rows={5}
              />
            </div>
            <div className="inventor-actions">
              <button
                className="inventor-submit"
                disabled={inventorText.trim().length < 5}
                onClick={() => {
                  const ok = inventorText.trim().length >= 25; // simple heuristic
                  setStage(ok ? 'result-success' : 'result-fail');
                }}
              >
                Submit
              </button>
            </div>
          </div>
          <img className="inventor-figure" src="/images/assets/corner-man.png" alt="Coach" />
        </div>
      )}

      {stage === 'result-fail' && (
        <div className="result-card result-fail">
          <img src="/images/assets/man.svg" alt="Coach" className="result-figure" />
          <h3 className="result-title">Hey Nova'preneur. That answer may have gone off-track</h3>
          <p className="result-sub">Want to give it another go?</p>
          <button className="btn btn-ghost" onClick={() => setStage('inventor')}>Try Again</button>
        </div>
      )}

      {stage === 'result-success' && (
        <div className="result-card result-success">
          <img src="/images/assets/man.svg" alt="Coach" className="result-figure" />
          <h3 className="result-title">Great Job!</h3>
          <p className="result-sub">Want to try another item?</p>
          <div className="result-grid">
            {items.filter(i => i.id !== selected).map(it => (
              <button key={it.id} className="result-tile" onClick={() => { setSelected(it.id); setInventorText(''); setStage('detail'); }}>
                <img src={it.img} alt={it.label} />
                <span>{it.label}</span>
              </button>
            ))}
          </div>
          <button className="result-skip" onClick={() => onSkip?.(selectedItem)}>Skip</button>
        </div>
      )}
    </div>
  );
}
