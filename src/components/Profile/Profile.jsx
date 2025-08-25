import React from 'react';
import './Profile.css';

const Profile = ({
  displayName,
  email,
  country,
  oldPassword,
  newPassword,
  confirmPassword,
  onChange,
  onSave
}) => {
  return (
    <div className="profile-page">
      <h2 className="page-title">Profile</h2>

      <div className="card profile-card">
        <div className="card-header d-flex align-items-center gap-2">
          <i className="bi bi-person-circle text-primary"></i>
          <span className="fw-semibold">Profile information</span>
        </div>
        <div className="card-body">
          <div className="d-flex align-items-center gap-3 mb-4">
            <img src="/images/assets/man.svg" alt="Profile avatar" className="avatar"/>
            <div>
              <div className="fw-semibold">{displayName || 'Your name'}</div>
              <div className="text-muted small">{email}</div>
            </div>
          </div>

          <div className="form-grid">
            <div className="mb-3 field-display-name">
              <label className="form-label">Display name <i className="bi bi-info-circle ms-1 text-muted" title="Visible to others"/></label>
              <input
                className="form-control"
                name="displayName"
                value={displayName}
                onChange={onChange}
                placeholder="Your display name"
              />
            </div>

            <div className="mb-3 field-email">
              <label className="form-label">Email <i className="bi bi-info-circle ms-1 text-muted" title="Your email address"/></label>
              <input
                type="email"
                className="form-control"
                name="email"
                value={email}
                onChange={onChange}
                placeholder="name@edinova.com"
                disabled
                readOnly
                title="Email cannot be edited"
              />
            </div>

            <div className="mb-3 field-location">
              <label className="form-label">Location</label>
              <select
                className="form-select"
                name="country"
                value={country}
                onChange={onChange}
              >
                <option value="South Africa">South Africa</option>
                <option value="Kenya">Kenya</option>
                <option value="Nigeria">Nigeria</option>
                <option value="Ghana">Ghana</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      <div className="card profile-card mt-3">
        <div className="card-header d-flex align-items-center gap-2">
          <i className="bi bi-shield-lock text-warning"></i>
          <span className="fw-semibold">Account</span>
        </div>
        <div className="card-body">
          <div className="alert alert-warning py-2 small" role="alert">
            <i className="bi bi-exclamation-triangle me-2"></i>
            You will be asked to login again when you change your password
          </div>

          <div className="mb-3">
            <label className="form-label">Old password</label>
            <input
              type="password"
              className="form-control"
              name="oldPassword"
              value={oldPassword}
              onChange={onChange}
              placeholder="Old password"
            />
          </div>

          <div className="row g-3">
            <div className="col-12 col-md-6">
              <label className="form-label">New password</label>
              <input
                type="password"
                className="form-control"
                name="newPassword"
                value={newPassword}
                onChange={onChange}
                placeholder="New password"
              />
            </div>
            <div className="col-12 col-md-6">
              <label className="form-label">Confirm new password</label>
              <input
                type="password"
                className="form-control"
                name="confirmPassword"
                value={confirmPassword}
                onChange={onChange}
                placeholder="Confirm password"
              />
            </div>
          </div>

          <ul className="password-hints list-unstyled mt-3">
            <li><i className="bi bi-check-circle text-success me-2"></i>Minimum 8 characters</li>
            <li><i className="bi bi-check-circle text-success me-2"></i>One uppercase letter and one lowercase letter</li>
            <li><i className="bi bi-check-circle text-success me-2"></i>One number</li>
            <li><i className="bi bi-check-circle text-success me-2"></i>One special character (e.g. !@#$%^)</li>
          </ul>

          <div className="d-flex justify-content-start">
            <button className="btn btn-teal" onClick={onSave}>
              <i className="bi bi-save me-2"/>Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
