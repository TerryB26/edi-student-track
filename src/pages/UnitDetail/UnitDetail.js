import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import UnitDetail from '../../components/UnitDetail/UnitDetail';
import { getProgress, setProgress, subscribeProgress, allUnitsComplete, isUnitUnlocked } from '../../lib/progress';

export default function UnitDetailPage() {
  const [showTranscript, setShowTranscript] = useState(false);
  const navigate = useNavigate();
  const { unitId } = useParams();
  const [progress, setPg] = useState({ completedUnitIds: [] });
  useEffect(() => {
    const unsub = subscribeProgress(setPg);
    return unsub;
  }, []);

  const handleBack = () => navigate('/units');
  const handleReport = () => alert('Report submitted');
  const handleStart = () => navigate(`/units/${unitId || 1}/hyew`);
  const handleStartModule2 = () => navigate(`/units/${unitId || 1}/hyew2`);
  const handleStartEasterEgg = () => navigate(`/units/${unitId || 1}/easter-egg`);

  const unitIndex = Number(unitId) || 1;
  const sectionLabel = `Section ${unitIndex}, Module 1`;
  const moduleTitle = 'See, Think, Innovate';
  const unitTitle = unitIndex === 1 ? 'Introduction' : unitIndex === 2 ? 'Intermediate concepts' : 'Advanced practice';
  // Gating: only show for Unit 3 AND once all units are marked complete
  const showEasterEgg = allUnitsComplete(progress.completedUnitIds, 4) && unitIndex === 3;

  // Guard: block direct URL access if unit is locked
  useEffect(() => {
    const locked = !isUnitUnlocked(progress.completedUnitIds, unitIndex);
    if (locked) {
      alert('This unit is locked. Complete the previous unit to continue.');
      navigate('/units');
    }
  }, [progress, unitIndex, navigate]);

  async function markComplete() {
    const p = await getProgress();
    const setIds = new Set(p.completedUnitIds || []);
    setIds.add(unitIndex);
    await setProgress({ completedUnitIds: Array.from(setIds).sort((a,b)=>a-b) });
  }

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
  onStartModule2={handleStartModule2}
  onStartEasterEgg={showEasterEgg ? handleStartEasterEgg : undefined}
  progress={Math.min(100, (progress.completedUnitIds?.length || 0) * 25)}
  onMarkComplete={markComplete}
      showCompleted={progress.completedUnitIds?.includes(unitIndex)}
      showEasterEgg={showEasterEgg}
    />
  );
}
