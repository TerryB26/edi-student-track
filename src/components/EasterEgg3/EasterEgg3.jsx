import React, { useMemo, useState } from 'react';
import '../HYEW/HYEW.css';

// Unit 3 Easter Egg: only these four items
const items = [
  { id: 'smartphone-case', label: 'Smartphone Case', img: '/images/assets/smartphone-case.svg' },
  { id: 'sunglasses', label: 'Sunglasses', img: '/images/assets/sunglasses.svg' },
  { id: 'notebook', label: 'Notebook', img: '/images/assets/notebook.svg' },
  { id: 'umbrella', label: 'Umbrella', img: '/images/assets/umbrella.svg' },
];

export default function EasterEgg3({ sectionLabel, moduleTitle, onBack, onReport }) {
  const [selected, setSelected] = useState([]); // up to 2

  const toggle = (id) => {
    setSelected((prev) => {
      if (prev.includes(id)) return prev.filter((x) => x !== id);
      if (prev.length >= 2) return [prev[1], id];
      return [...prev, id];
    });
  };

  const selectedItems = useMemo(() => items.filter(i => selected.includes(i.id)), [selected]);

  return (
    <div className="hyew-page hyew3">
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

      <div className="card hyew-card">
        <div className="card-body">
          <div className="hyew-header">
            <span className="marker" aria-hidden="true"></span>
            <h3 className="hyew-heading">Easter Egg – Pick Two Products</h3>
            <span className="hyew-chip">Bonus</span>
          </div>
          <p className="hyew-intro">
            Hidden challenge unlocked! Choose two items below to spark a fun bonus mash‑up. This won’t unlock anything else—it’s just for practice.
          </p>
          <div className="select-grid select-grid--four" role="list">
            {items.map((it) => (
              <button
                key={it.id}
                className={`select-tile ${selected.includes(it.id) ? 'selected' : ''}`}
                onClick={() => toggle(it.id)}
                role="listitem"
              >
                <img src={it.img} alt={it.label} />
                <span>{it.label}</span>
              </button>
            ))}
          </div>
          <div className="detail-actions">
            <div style={{color:'#6b7280', fontWeight:600}}>
              {selected.length === 0 && 'Pick any two items to begin.'}
              {selected.length === 1 && 'Pick one more.'}
              {selected.length === 2 && `You chose ${selectedItems.map(s=>s.label).join(' + ')}`}
            </div>
            <button className="btn btn-primary-accent" disabled={selected.length !== 2} onClick={()=>alert('Great pick! This bonus activity is self‑contained and doesn\'t unlock anything further.')}>
              Lock in items
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
