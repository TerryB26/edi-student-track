import React, { useState } from 'react';
import Profile from '../../components/Profile/Profile';

const ProfilePage = () => {
  const [form, setForm] = useState({
    displayName: 'Siyabonga Ngcobo',
    email: 'siya@edinova.com',
    country: 'South Africa',
    oldPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    // TODO: integrate API
    console.log('Saving profile', form);
    alert('Profile saved (demo)');
  };

  return (
    <Profile
      displayName={form.displayName}
      email={form.email}
      country={form.country}
      oldPassword={form.oldPassword}
      newPassword={form.newPassword}
      confirmPassword={form.confirmPassword}
      onChange={handleChange}
      onSave={handleSave}
    />
  );
};

export default ProfilePage;
