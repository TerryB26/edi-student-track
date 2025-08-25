import React from 'react';
import Units from '../../components/Units/Units';

export default function UnitsPage() {
  const units = [
    { title: 'Unit 1', description: 'Introduction and basics.' },
    { title: 'Unit 2', description: 'Intermediate concepts.' },
    { title: 'Unit 3', description: 'Advanced practice.' },
    { title: 'Unit 4', description: 'Assessment and wrap-up.' },
  ];

  return <Units units={units} />;
}
