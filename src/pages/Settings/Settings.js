import React, { useState } from 'react';
import Settings from '../../components/Settings/Settings';

const SettingsPage = () => {
  const [settings, setSettings] = useState({
    announcements: true,
    sounds: false,
    coachVoice: true,
  });

  const handleToggle = (key) => {
    setSettings(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const handleSave = () => {
    console.log('Saving settings', settings);
    alert('Settings saved (demo)');
  };

  return (
    <Settings settings={settings} onToggle={handleToggle} onSave={handleSave} />
  );
};

export default SettingsPage;
