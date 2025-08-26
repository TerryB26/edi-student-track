// Shared mock track definition used across the app
// Adjust counts/titles to match designs as needed

export const track = {
  id: 'defaultTrack',
  title: 'Innovpreneur Mini-Track',
  sections: [
    {
      id: 's1',
      title: 'Getting Started',
      order: 1,
      units: [
        { id: 1, title: 'Unit 1', description: 'Introduction and basics.', order: 1 },
        { id: 2, title: 'Unit 2', description: 'Intermediate concepts.', order: 2 },
      ],
    },
    {
      id: 's2',
      title: 'Level Up',
      order: 2,
      units: [
        { id: 3, title: 'Unit 3', description: 'Advanced practice.', order: 3 },
        { id: 4, title: 'Unit 4', description: 'Assessment and wrap-up.', order: 4 },
      ],
    },
  ],
};

export function getTotalUnits() {
  return track.sections.reduce((acc, s) => acc + s.units.length, 0);
}
