import React, { useMemo, useState } from 'react';
import '../HYEW/HYEW.css';

// Module 2: only the 4 products requested
const items = [
  { id: 'empty-bottle', label: 'An Empty Water Bottle', img: '/images/assets/bottle-beverage-water-glass-drink-1.svg' },
  { id: 'cereal-box', label: 'A cereal box', img: '/images/assets/cereal-081.svg' },
  { id: 'shoebox', label: 'An old shoebox', img: '/images/assets/shoe-box-11.png' },
  { id: 'tshirt', label: 'An old t-shirt', img: '/images/assets/t-shirt-1.png' },
];

export default function HYEW2({ sectionLabel, moduleTitle, onBack, onReport, onSkip }) {
  // stages: 'pick' | 'brainstorm' | 'describe' | 'describe-locked' | 'coach-success' | 'coach-fail' | 'expand' | 'expand-locked' | 'final'
  const [stage, setStage] = useState('pick');
  const [selected, setSelected] = useState(null);
  const [brainstormChoice, setBrainstormChoice] = useState('');
  const [ideaText, setIdeaText] = useState('');
  const [expandText, setExpandText] = useState('');

  const selectedItem = useMemo(() => items.find(i => i.id === selected), [selected]);

  const lockDescribe = () => {
    const ok = ideaText.trim().length >= 25;
    if (!ok) {
      setStage('coach-fail');
    } else {
      setStage('describe-locked');
    }
  };

  const lockExpand = () => {
    const ok = expandText.trim().length >= 25;
    setStage(ok ? 'final' : 'coach-fail');
  };

  return (
    <div className="hyew-page hyew2">
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

      {/* Step 1 - Pick Your Item */}
      {stage === 'pick' && (
        <div className="card hyew-card">
          <div className="card-body">
            <div className="hyew-header">
              <span className="marker" aria-hidden="true"></span>
              <h3 className="hyew-heading">Step 1 - Pick Your Item</h3>
              <span className="hyew-chip">Micro-lesson</span>
            </div>
            <p className="hyew-intro">
              First, choose an item from this list to investigate and brainstorm. Choose one based on how often you use it.
            </p>
            <div className="select-grid select-grid--four">
              {items.map((it) => (
                <button
                  key={it.id}
                  className={`select-tile ${selected === it.id ? 'selected' : ''}`}
                  onClick={() => { setSelected(it.id); setStage('brainstorm'); }}
                >
                  <img src={it.img} alt={it.label} />
                  <span>{it.label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Step 2 - Brainstorm Time */}
      {stage === 'brainstorm' && selectedItem && (
        <div className="card hyew-detail-card">
          <div className="card-body">
            <div className="hyew-header">
              <span className="marker" aria-hidden="true"></span>
              <h3 className="hyew-heading">Step 2 - Brainstorm Time</h3>
              <span className="hyew-chip">Micro-lesson</span>
            </div>
            <div className="detail-content">
              <div className="detail-figure">
                <img src={selectedItem.img} alt={selectedItem.label} />
              </div>
              <div className="detail-text">
                <h5 className="detail-title" style={{marginTop:0}}>{selectedItem.label}</h5>
                <ul className="radio-list">
                  <li>
                    <label>
                      <input type="radio" name="brainstorm" value="what-else" checked={brainstormChoice==='what-else'} onChange={(e)=>setBrainstormChoice(e.target.value)} />
                      <span>What else could it be?</span>
                    </label>
                  </li>
                  <li>
                    <label>
                      <input type="radio" name="brainstorm" value="solve-problem" checked={brainstormChoice==='solve-problem'} onChange={(e)=>setBrainstormChoice(e.target.value)} />
                      <span>Could it solve a problem in a new way?</span>
                    </label>
                  </li>
                  <li>
                    <label>
                      <input type="radio" name="brainstorm" value="make-exciting" checked={brainstormChoice==='make-exciting'} onChange={(e)=>setBrainstormChoice(e.target.value)} />
                      <span>Could it make a routine or chore more exciting?</span>
                    </label>
                  </li>
                </ul>
                <button className="btn btn-primary-accent" disabled={!brainstormChoice} onClick={()=>setStage('describe')}>Keep going</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Step 3 - Describe Your Idea */}
      {stage === 'describe' && selectedItem && (
        <div className="card hyew-detail-card">
          <div className="card-body">
            <div className="hyew-header">
              <span className="marker" aria-hidden="true"></span>
              <h3 className="hyew-heading">Step 3 - Describe Your Idea</h3>
              <span className="hyew-chip">Micro-lesson</span>
            </div>
            <div className="detail-content">
              <div className="detail-figure">
                <img src={selectedItem.img} alt={selectedItem.label} />
              </div>
              <div className="detail-text">
                <h5 className="detail-title" style={{marginTop:0}}>{selectedItem.label}</h5>
                {/* Repeat the brainstorm choices here as guidance */}
                <ul className="radio-list">
                  <li>
                    <label>
                      <input type="radio" name="brainstorm2" value="what-else" checked={brainstormChoice==='what-else'} onChange={(e)=>setBrainstormChoice(e.target.value)} />
                      <span>What else could it be?</span>
                    </label>
                  </li>
                  <li>
                    <label>
                      <input type="radio" name="brainstorm2" value="solve-problem" checked={brainstormChoice==='solve-problem'} onChange={(e)=>setBrainstormChoice(e.target.value)} />
                      <span>Could it solve a problem in a new way?</span>
                    </label>
                  </li>
                  <li>
                    <label>
                      <input type="radio" name="brainstorm2" value="make-exciting" checked={brainstormChoice==='make-exciting'} onChange={(e)=>setBrainstormChoice(e.target.value)} />
                      <span>Could it make a routine or chore more exciting?</span>
                    </label>
                  </li>
                </ul>
                <div className="inventor-input" style={{marginTop:8}}>
                  <textarea placeholder="I would create..." rows={5} value={ideaText} onChange={(e)=>setIdeaText(e.target.value)} />
                </div>
                <button className="btn btn-primary-accent" disabled={ideaText.trim().length<1} onClick={lockDescribe}>Lock in idea</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* After lock-in: summary or coach response */}
      {stage === 'describe-locked' && (
        <div className="card unit-card">
          <div className="card-body">
            <div className="hyew-header">
              <span className="marker" aria-hidden="true"></span>
              <h3 className="hyew-heading">Step 3 - Describe Your Idea</h3>
            </div>
            <div className="summary-block">
              <div className="detail-figure"><img src={selectedItem?.img} alt={selectedItem?.label}/></div>
              <div className="summary-text">
                <strong className="detail-headline">Summary</strong>
                <p>{ideaText}</p>
              </div>
            </div>
            <div className="summary-actions">
              <button className="btn btn-primary-accent" onClick={()=>setStage('expand')}>Keep going</button>
            </div>
          </div>
        </div>
      )}

      {stage === 'coach-fail' && (
        <div className="result-card result-fail">
          <img src="/images/assets/man.svg" alt="Coach" className="result-figure" />
          <h3 className="result-title">Hey Nova'preneur. That answer may have gone off-track</h3>
          <button className="btn btn-ghost" onClick={()=>setStage('describe')}>Try Again</button>
        </div>
      )}

      {stage === 'coach-success' && (
        <div className="result-card result-success">
          <img src="/images/assets/man.svg" alt="Coach" className="result-figure" />
          <h3 className="result-title">Great job!</h3>
          <p className="result-sub">Keep the momentum going, Nova'preneur!</p>
          <button className="btn btn-primary-accent" onClick={()=>setStage('expand')}>Keep going</button>
        </div>
      )}

      {/* Step 4 - Expand Your Thinking (orange card with coach) */}
      {stage === 'expand' && (
        <div className="expand-wrap">
          <img className="expand-figure" src="/images/assets/help-man.png" alt="Coach" />
          <div className="expand-card">
            <div className="business-header">
              <i className="bi bi-lightbulb-fill"></i>
              <h3>Step 4 - Expand Your Thinking</h3>
            </div>
            <p className="business-sub">
              You are thinking creatively with Coach Nova. Let’s push your creativity further.
              Consider one question below or write your own answer.
            </p>
            <div className="inventor-input">
              <textarea placeholder="I would create..." rows={5} value={expandText} onChange={(e)=>setExpandText(e.target.value)} />
            </div>
            <div className="business-actions">
              <button className="business-submit" disabled={expandText.trim().length<1} onClick={lockExpand}>Lock in answer</button>
            </div>
          </div>
        </div>
      )}

      {stage === 'final' && (
        <div className="result-card result-success">
          <img src="/images/assets/man.svg" alt="Coach" className="result-figure" />
          <h3 className="result-title">Well done, Novapreneur</h3>
          <p className="result-sub">You’ve just done what many people don’t: you looked at something ordinary and imagined something entirely new.</p>
          <button className="btn btn-primary-accent" onClick={()=>onSkip?.(selectedItem)}>Keep going</button>
        </div>
      )}
    </div>
  );
}
