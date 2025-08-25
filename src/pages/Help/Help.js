import React, { useMemo, useState } from 'react';
import Help from '../../components/Help/Help';

const ALL_QUESTIONS = [
  { text: 'I forgot my password — what should I do?', tag: 'pink' },
  { text: 'Can I skip a module?', tag: 'green' },
  { text: 'How do I start my first module?', tag: 'yellow' },
  { text: 'Do I have to finish a module in one sitting?', tag: 'blue' },
  { text: 'How do I earn badges or achievements?', tag: 'green' },
  { text: 'Can I change my email address later?', tag: 'blue' },
];

export default function HelpPage() {
  const [search, setSearch] = useState('');

  const filtered = useMemo(() => {
    if (!search) return ALL_QUESTIONS;
    const q = search.toLowerCase();
    return ALL_QUESTIONS.filter((x) => x.text.toLowerCase().includes(q));
  }, [search]);

  const handleContact = () => {
    // Placeholder action; could open mailto or route to support
    alert('Support will contact you shortly.');
  };

  return (
    <Help
      searchQuery={search}
      onSearchChange={setSearch}
      onContactSupport={handleContact}
      questions={filtered}
    />
  );
}
