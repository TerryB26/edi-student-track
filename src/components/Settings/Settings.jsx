import React from 'react';
import './Settings.css';

const Settings = ({
  settings,
  onToggle,
  onSave,
}) => {
  return (
    <div className="settings-page">
      <h2 className="page-title">Settings</h2>

      <div className="card settings-card">
        <div className="card-body">
          <div className="settings-list">
            <div className="settings-row">
              <div className="settings-label">Edinova announcements</div>
              <div className="form-check form-switch m-0">
                <input
                  className="form-check-input toggle-input"
                  type="checkbox"
                  id="announceSwitch"
                  checked={!!settings.announcements}
                  onChange={() => onToggle('announcements')}
                />
              </div>
            </div>

            <div className="settings-row">
              <div className="settings-label">Sound effects</div>
              <div className="form-check form-switch m-0">
                <input
                  className="form-check-input toggle-input"
                  type="checkbox"
                  id="soundsSwitch"
                  checked={!!settings.sounds}
                  onChange={() => onToggle('sounds')}
                />
              </div>
            </div>

            <div className="settings-row">
              <div className="settings-label">Coach Nova feedback voice</div>
              <div className="form-check form-switch m-0">
                <input
                  className="form-check-input toggle-input"
                  type="checkbox"
                  id="coachVoiceSwitch"
                  checked={!!settings.coachVoice}
                  onChange={() => onToggle('coachVoice')}
                />
              </div>
            </div>
          </div>

          <div className="d-flex justify-content-start mt-3">
            <button className="btn btn-teal" onClick={onSave}>
              <i className="bi bi-save me-2"/>Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
