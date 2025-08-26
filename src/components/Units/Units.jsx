import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Units.css';

import { isUnitUnlocked } from '../../lib/progress';
import { track, getTotalUnits } from '../../lib/track';

const Units = ({ units = [], progress = { completedUnitIds: [] } }) => {
  const navigate = useNavigate();
  const [openSections, setOpenSections] = useState(() => new Set(track.sections.map(s => s.id)));
  const totalUnits = getTotalUnits();
  const completedCount = progress.completedUnitIds?.length || 0;
  const progressLabel = `${completedCount} / ${totalUnits} complete`;
  const toggleSection = (id) => {
    setOpenSections(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id); else next.add(id);
      return next;
    });
  };
  return (
    <div className="units-page">
      <h2 className="page-title">My Journey</h2>

      <div className="units-header">
        <h3>Units</h3>
      </div>

      <div className="units-progress" aria-live="polite">{progressLabel}</div>

      <div className="units-grid" role="list">
        {track.sections.map((section) => (
          <div key={section.id} className="units-section">
            <button
              className="section-toggle"
              aria-expanded={openSections.has(section.id)}
              onClick={() => toggleSection(section.id)}
              onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); toggleSection(section.id); } }}
            >
              <i className={`bi ${openSections.has(section.id) ? 'bi-caret-down-fill' : 'bi-caret-right-fill'}`} aria-hidden="true" />
              <span className="section-title">{section.title}</span>
            </button>
            {openSections.has(section.id) && (
              <div className="section-units">
                {section.units.map((u, idx) => {
                  const i = u.order - 1;
          const colorClasses = ['uc-pink', 'uc-green', 'uc-yellow', 'uc-blue'];
          const cc = colorClasses[i % colorClasses.length];
          const unitIndex = u.id;
          const locked = !isUnitUnlocked(progress.completedUnitIds, unitIndex);
          const completed = progress.completedUnitIds?.includes(unitIndex);
          return (
            <div className={`unit-card ${cc}`} key={u.id} role="listitem">
              {locked && (
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
                  disabled={locked}
                  aria-disabled={locked}
                  onClick={() => !locked && navigate(`/units/${unitIndex}`)}
                >
                  {completed ? 'Review' : 'Start'}
                </button>
              </div>
            </div>
          );})}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Units;
