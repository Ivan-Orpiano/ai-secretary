import React from 'react';
import { useChatContext } from '../../context/ChatContext';
import { nowISO }         from '../../utils/dateUtils';

const SUGGESTIONS = [
  { icon: '📅', label: 'Schedule a meeting',   text: 'Schedule a meeting for tomorrow at 2pm and send a calendar invite.' },
  { icon: '✉️', label: 'Draft an email',        text: 'Draft a professional follow-up email to a client after a product demo.' },
  { icon: '📊', label: 'Summarize a document', text: 'Here is my document — please summarize the key points in bullet form.' },
  { icon: '🔍', label: 'Research a topic',     text: 'Research the latest trends in AI automation for small businesses in 2025.' },
  { icon: '✅', label: 'Create a task list',   text: 'Create a prioritized task list for launching a new product next month.' },
  { icon: '📝', label: 'Write a report',        text: 'Write a concise executive summary report on Q3 performance highlights.' },
];

/** @param {{ onSelectSuggestion: (text: string) => void }} props */
export default function WelcomeScreen({ onSelectSuggestion }) {
  return (
    <div
      style={{
        flex:           1,
        display:        'flex',
        flexDirection:  'column',
        alignItems:     'center',
        justifyContent: 'center',
        padding:        '40px 24px 32px',
        gap:            28,
        textAlign:      'center',
        animation:      'fadeIn 0.35s ease-out',
      }}
    >
      {/* Logo + headline */}
      <div>
        <div
          aria-hidden="true"
          style={{
            width:          72,
            height:         72,
            borderRadius:   '50%',
            margin:         '0 auto 18px',
            background:     'linear-gradient(135deg, #0f766e 0%, #134e4a 100%)',
            display:        'flex',
            alignItems:     'center',
            justifyContent: 'center',
            fontSize:       34,
            boxShadow:      'var(--shadow-accent)',
            color:          '#fff',
          }}
        >
          ✦
        </div>

        <h1
          style={{
            fontSize:      26,
            fontWeight:    700,
            color:         'var(--text-primary)',
            margin:        0,
            letterSpacing: '-0.03em',
            fontFamily:    'var(--font-display)',
          }}
        >
          Your AI Secretary
        </h1>

        <p
          style={{
            fontSize:   14,
            color:      'var(--text-tertiary)',
            marginTop:  10,
            maxWidth:   360,
            lineHeight: 1.65,
            margin:     '10px auto 0',
          }}
        >
          Send a message or attach files to get started. I can draft emails,
          schedule tasks, summarize documents, and automate your workflows.
        </p>
      </div>

      {/* Suggestion chips */}
      <div
        role="list"
        aria-label="Suggested prompts"
        style={{
          display:             'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(210px, 1fr))',
          gap:                 8,
          width:               '100%',
          maxWidth:            560,
        }}
      >
        {SUGGESTIONS.map((s) => (
          <button
            key={s.label}
            role="listitem"
            onClick={() => onSelectSuggestion(s.text)}
            aria-label={`Try: ${s.text}`}
            style={{
              background:   'var(--bubble-ai)',
              border:       '1px solid var(--border)',
              borderRadius: 'var(--radius-lg)',
              padding:      '11px 13px',
              cursor:       'pointer',
              textAlign:    'left',
              display:      'flex',
              gap:          10,
              alignItems:   'center',
              fontSize:     13,
              color:        'var(--text-secondary)',
              transition:   'all var(--transition-base)',
              lineHeight:   1.4,
              fontFamily:   'inherit',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = 'var(--accent)';
              e.currentTarget.style.background  = 'var(--accent-alpha)';
              e.currentTarget.style.color       = 'var(--text-primary)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = 'var(--border)';
              e.currentTarget.style.background  = 'var(--bubble-ai)';
              e.currentTarget.style.color       = 'var(--text-secondary)';
            }}
          >
            <span aria-hidden="true" style={{ fontSize: 20, flexShrink: 0 }}>{s.icon}</span>
            <span>{s.label}</span>
          </button>
        ))}
      </div>

      {/* Capability tags */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, justifyContent: 'center' }}>
        {['File Attachments', 'n8n Automation', 'Real-time Responses', 'Conversation History'].map((tag) => (
          <span
            key={tag}
            style={{
              fontSize:     11,
              color:        'var(--text-muted)',
              background:   'var(--chip-bg)',
              border:       '1px solid var(--chip-border)',
              borderRadius: 'var(--radius-full)',
              padding:      '3px 10px',
            }}
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
}