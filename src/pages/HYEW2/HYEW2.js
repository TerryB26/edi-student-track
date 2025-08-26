import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import HYEW2 from "../../components/HYEW2/HYEW2";

export default function HYEW2Page() {
  const { unitId } = useParams();
  const navigate = useNavigate();

  const sectionLabel = `Section ${unitId || 1}, Module 2`;
  const moduleTitle = "See, Think, Innovate";

  return (
    <HYEW2
      sectionLabel={sectionLabel}
      moduleTitle={moduleTitle}
      onBack={() => navigate(`/units/${unitId || 1}`)}
      onReport={() => alert("Report submitted")}
      onKeepGoing={() => { /* keep within HYEW2, show prompt */ }}
      onSkip={() => navigate(`/units/${unitId || 1}`)}
    />
  );
}
