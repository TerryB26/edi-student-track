import React from 'react';
import { useNavigate } from 'react-router-dom';
import EasterEgg3 from '../../components/EasterEgg3/EasterEgg3';

export default function EasterEgg3Page() {
  const navigate = useNavigate();
  return (
    <EasterEgg3
      sectionLabel="Section 1, Unit 3"
      moduleTitle="Easter Egg – See, Think, Innovate"
      onBack={() => navigate('/units/1')}
      onReport={() => alert('Report submitted')}
    />
  );
}
