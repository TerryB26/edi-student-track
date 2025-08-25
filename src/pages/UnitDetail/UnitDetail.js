import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import UnitDetail from '../../components/UnitDetail/UnitDetail';

export default function UnitDetailPage() {
  const [showTranscript, setShowTranscript] = useState(false);
  const navigate = useNavigate();
  const { unitId } = useParams();

  const handleBack = () => navigate('/units');
  const handleReport = () => alert('Report submitted');
  const handleStart = () => alert(`Starting Unit ${unitId}`);

  const unitIndex = Number(unitId) || 1;
  const sectionLabel = `Section 1, Module ${unitIndex}`;
  const moduleTitle = 'See, Think, Innovate';
  const unitTitle = 'Introduction';

  return (
    <UnitDetail
      unitTitle={unitTitle}
      sectionLabel={sectionLabel}
      moduleTitle={moduleTitle}
      showTranscript={showTranscript}
      onToggleTranscript={() => setShowTranscript((v) => !v)}
      onBack={handleBack}
      onReport={handleReport}
      onStart={handleStart}
      progress={35}
    />
  );
}
