
import React from 'react';

/**
 * @param {{
 *   message:   string | null,
 *   onDismiss: () => void,
 * }} props
 */
export default function ErrorBanner({ message, onDismiss }) {
  if (!message) return null;

  return (
    <div
      role="alert"
      aria-live="polite"
      style={{
        background:   'var(--error-bg)',
        border:       '1px solid var(--error-border)',
        borderRadius: 'var(--radius-md)',
        padding:      '9px 12px',
        marginBottom: 'var(--space-2)',
        display:      'flex',
        alignItems:   'flex-start',
        gap:          8,
        fontSize:     13,
        color:        'var(--error-text)',
        lineHeight:   1.45,
        animation:    'fadeIn 0.18s ease-out',
      }}
    >
      {/* Warning icon */}
      <span aria-hidden="true" style={{ fontSize: 15, flexShrink: 0, marginTop: 1 }}>
        ⚠️
      </span>

      {/* Message text */}
      <span style={{ flex: 1 }}>{message}</span>

      {/* Dismiss button */}
      <button
        onClick={onDismiss}
        aria-label="Dismiss error"
        style={{
          background:   'none',
          border:       'none',
          cursor:       'pointer',
          color:        'var(--error-text)',
          fontSize:     18,
          lineHeight:   1,
          padding:      '0 2px',
          flexShrink:   0,
          opacity:      0.7,
          transition:   'opacity var(--transition-fast)',
        }}
        onMouseEnter={(e) => (e.currentTarget.style.opacity = '1')}
        onMouseLeave={(e) => (e.currentTarget.style.opacity = '0.7')}
      >
        ×
      </button>
    </div>
  );
}