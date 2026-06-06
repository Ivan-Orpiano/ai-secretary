import React from 'react';
import Avatar from '../ui/Avatar';

export default function TypingIndicator() {
  return (
    <div
      role="status"
      aria-label="AI Secretary is typing"
      style={{
        display:    'flex',
        gap:        10,
        alignItems: 'flex-end',
        padding:    '4px 0',
        animation:  'fadeSlideIn 0.22s ease-out',
      }}
    >
      <Avatar role="assistant" />

      <div
        style={{
          background:   'var(--bubble-ai)',
          border:       '1px solid var(--border)',
          borderRadius: '18px 18px 18px 4px',
          padding:      '13px 18px',
          display:      'flex',
          gap:          5,
          alignItems:   'center',
          boxShadow:    'var(--shadow-sm)',
        }}
      >
        {[0, 1, 2].map((i) => (
          <span
            key={i}
            aria-hidden="true"
            style={{
              width:        7,
              height:       7,
              borderRadius: '50%',
              background:   'var(--accent)',
              display:      'inline-block',
              animation:    `bounce 1.2s ease-in-out ${i * 0.18}s infinite`,
            }}
          />
        ))}
      </div>
    </div>
  );
}