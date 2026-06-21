import React from 'react';
import Avatar from '../ui/Avatar';

const DOTS = [
  { color: '#00F5A0', delay: '0s'    },
  { color: '#00D4FF', delay: '0.20s' },
  { color: '#B46EF8', delay: '0.40s' },
];

export default function TypingIndicator() {
  return (
    <div
      role="status"
      aria-label="ARIA is thinking"
      aria-live="polite"
      style={{
        display:    'flex',
        gap:         12,
        alignItems: 'flex-end',
        padding:    '4px 0 16px',
        animation:  'fadeSlideIn 0.24s ease-out both',
      }}
    >
      <Avatar role="assistant" size={32} />

      <div style={{
        background:           'rgba(8,14,34,0.84)',
        backdropFilter:       'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        border:               '1px solid var(--border-glass)',
        borderRadius:         '5px 18px 18px 18px',
        padding:              '14px 20px',
        display:              'flex',
        gap:                   6,
        alignItems:           'center',
        boxShadow:            'var(--shadow-ai)',
        position:             'relative',
      }}>
        {/* Left accent bar */}
        <div style={{
          position:     'absolute',
          left:          0,
          top:          '12%',
          height:       '76%',
          width:          2,
          borderRadius: '0 2px 2px 0',
          background:   'linear-gradient(180deg, var(--accent) 0%, var(--accent-blue) 100%)',
          opacity:       0.45,
        }} />

        {DOTS.map((d, i) => (
          <span
            key={i}
            aria-hidden="true"
            style={{
              width:        9,
              height:       9,
              borderRadius: '50%',
              background:    d.color,
              display:      'inline-block',
              boxShadow:    `0 0 10px ${d.color}AA`,
              animation:    `dotPop 1.6s ease-in-out ${d.delay} infinite`,
              flexShrink:    0,
            }}
          />
        ))}

        <span style={{
          fontSize:    11,
          color:       'var(--text-muted)',
          fontFamily:  'var(--font-mono)',
          marginLeft:   4,
          letterSpacing: '0.03em',
        }}>
          thinking…
        </span>
      </div>
    </div>
  );
}
