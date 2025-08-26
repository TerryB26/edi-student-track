import React, { useEffect, useState } from 'react';
import Units from '../../components/Units/Units';
import { subscribeProgress } from '../../lib/progress';
import { track } from '../../lib/track';

export default function UnitsPage() {
  const [progress, setProgress] = useState({ completedUnitIds: [] });
  useEffect(() => {
    const unsub = subscribeProgress(setProgress);
    return unsub;
  }, []);

  // Flatten units from sections for backward compatibility with Units props
  const units = track.sections.flatMap(s => s.units);
  return <Units units={units} progress={progress} />;
}
