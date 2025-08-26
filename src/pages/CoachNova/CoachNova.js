import React, { useMemo, useRef, useState } from 'react';
import './Chat.css';

export default function CoachNovaPage() {
  const starterMessages = useMemo(() => ([
    { id: 1, from: 'coach', text: "Hey there! Let's chat about your idea. Where would you like to start?" },
    { id: 2, from: 'user', text: 'Hi, Coach Nova. My idea is already named' },
    { id: 3, from: 'coach', text: "Let’s review what you’ve written. How about this…" },
    { id: 4, from: 'user', text: "Yes, but I don’t know where to begin." },
    { id: 5, from: 'coach', text: "That’s a great idea, Novapreneur! Let's start with a short intro. Try saying: “Hi, my name is [Your Name], and I’m learning English.”" },
    { id: 6, from: 'coach', text: '[Closing statement]' },
  ]), []);

  const [messages, setMessages] = useState(starterMessages);
  const [input, setInput] = useState('');
  const listRef = useRef(null);
  const [isTyping, setIsTyping] = useState(false);

  const cannedReplies = [
    'Nice! Tell me who your idea helps and why it matters.',
    'Great progress—what problem are you solving in one sentence?',
    'Try describing your idea in 10 words or fewer.',
    'Awesome. What’s the very first step you can take today?',
  ];

  function scrollToBottom() {
    requestAnimationFrame(() => {
      listRef.current?.scrollTo({ top: listRef.current.scrollHeight, behavior: 'smooth' });
    });
  }

  function send() {
    const text = input.trim();
    if (!text) return;
    const next = [...messages, { id: Date.now(), from: 'user', text }];
    setMessages(next);
    setInput('');
    scrollToBottom();
    const reply = cannedReplies[Math.floor(Math.random() * cannedReplies.length)];
    setIsTyping(true);
    scrollToBottom();
    setTimeout(() => {
      setIsTyping(false);
      setMessages((m) => [...m, { id: Date.now() + 1, from: 'coach', text: reply }]);
      scrollToBottom();
    }, 900);
  }

  function onKeyDown(e) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      send();
    }
  }

  return (
    <div className="cn-page">
      <div className="cn-card">
        <div className="cn-hero">
          <div className="cn-hero-title">
            <img src="/images/assets/bulb-filled.svg" alt="Final step" />
            <span>Final Step – Coach Nova Chat</span>
          </div>
          <div className="cn-hero-subtitle">Coach Nova would like to chat about your idea</div>
        </div>
        <div className="cn-body">
        <div className="cn-chat" ref={listRef} role="log" aria-live="polite">
          {messages.map((m) => (
            <div key={m.id} className={`cn-msg ${m.from === 'user' ? 'right' : 'left'}`}>
              <div className="cn-avatar" aria-hidden="true">{m.from === 'user' ? '🧑' : '🤖'}</div>
              <div className="cn-bubble">{m.text}</div>
            </div>
          ))}
          {isTyping && (
            <div className="cn-msg left">
              <div className="cn-avatar" aria-hidden="true">🤖</div>
              <div className="cn-bubble typing" aria-label="Coach Nova is typing">
                <span className="cn-typing" aria-hidden="true">
                  <span className="dot"></span>
                  <span className="dot"></span>
                  <span className="dot"></span>
                  <span className="dot"></span>
                  <span className="dot"></span>
                </span>
              </div>
            </div>
          )}
        </div>
        <div className="cn-input">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={onKeyDown}
            placeholder="Type your message…"
            aria-label="Message input"
          />
          <button onClick={send}>Respond</button>
        </div>
        </div>
      </div>
    </div>
  );
}
