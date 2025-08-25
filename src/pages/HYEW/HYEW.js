import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import HYEW from '../../components/HYEW/HYEW';

export default function HYEWPage() {
  const { unitId } = useParams();
  const navigate = useNavigate();

  const sectionLabel = `Section 1, Module ${unitId || 1}`;
  const moduleTitle = 'See, Think, Innovate';

  return (
    <HYEW
      sectionLabel={sectionLabel}
      moduleTitle={moduleTitle}
      onBack={() => navigate('/units')}
      onReport={() => alert('Report submitted')}
      onKeepGoing={() => navigate(`/units/${unitId || 1}`)}
    />
  );
}
