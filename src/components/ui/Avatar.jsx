import React from 'react';

/**
 * @param {{ role: 'user'|'assistant', name?: string, size?: number }} props
 */
export default function Avatar({ role, name, size = 34 }) {
  const isUser = role === 'user';

  /** Derive initials from name (e.g. "Jane Doe" → "JD") */
  const initials = name
    ? name.split(' ').map((w) => w[0]).join('').slice(0, 2).toUpperCase()
    : isUser ? 'U' : '✦';

  const style = {
    width:          size,
    height:         size,
    borderRadius:   '50%',
    flexShrink:     0,
    display:        'flex',
    alignItems:     'center',
    justifyContent: 'center',
    fontSize:       size * 0.42,
    fontWeight:     600,
    color:          '#fff',
    userSelect:     'none',
    background: isUser
      ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
      : 'linear-gradient(135deg, #0f766e 0%, #134e4a 100%)',
    boxShadow: isUser
      ? '0 2px 8px rgba(102,126,234,0.35)'
      : '0 2px 8px rgba(15,118,110,0.35)',
  };

  return (
    <div
      style={style}
      role="img"
      aria-label={isUser ? `User avatar${name ? ` for ${name}` : ''}` : 'AI Secretary avatar'}
      title={isUser ? (name || 'You') : 'AI Secretary'}
    >
      {initials}
    </div>
  );
}