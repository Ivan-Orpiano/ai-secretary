import React, { useState } from 'react';
import Avatar              from '../ui/Avatar';
import { formatTime }      from '../../utils/messageUtils';
import { getFileMeta, formatFileSize } from '../../utils/fileUtils';

/* ── Inline styles ─────────────────────────────────────────────────── */
const s = {
  row: (isUser) => ({
    display:        'flex',
    flexDirection:  isUser ? 'row-reverse' : 'row',
    alignItems:     'flex-end',
    gap:             10,
    padding:        '4px 0',
    animation:       isUser ? 'slideInRight 0.25s ease both' : 'slideInLeft 0.25s ease both',
  }),

  bubble: (isUser, isError) => ({
    maxWidth:       'min(72%, 600px)',
    borderRadius:    isUser ? '18px 18px 4px 18px' : '18px 18px 18px 4px',
    padding:        '12px 16px',
    background:      isError
      ? 'rgba(255,107,107,0.08)'
      : isUser
        ? 'linear-gradient(135deg, rgba(255,107,107,0.18) 0%, rgba(255,142,83,0.12) 100%)'
        : 'var(--bg-elevated)',
    border:          isError
      ? '1px solid rgba(255,107,107,0.3)'
      : isUser
        ? '1px solid rgba(255,107,107,0.25)'
        : '1px solid var(--border-mid)',
    boxShadow:       isUser
      ? 'var(--shadow-user)'
      : 'var(--shadow-sm)',
    backdropFilter: 'blur(8px)',
    transition:     'box-shadow 0.2s ease',
  }),

  text: (isUser) => ({
    fontSize:    14.5,
    lineHeight:   1.65,
    color:        isUser ? 'var(--text-primary)' : 'var(--text-primary)',
    fontFamily:  'var(--font-body)',
    whiteSpace:  'pre-wrap',
    wordBreak:   'break-word',
  }),

  meta: (isUser) => ({
    display:        'flex',
    alignItems:     'center',
    gap:             6,
    marginTop:       6,
    justifyContent: isUser ? 'flex-end' : 'flex-start',
  }),

  timestamp: {
    fontSize: 10.5,
    color:    'var(--text-muted)',
    fontFamily: 'var(--font-body)',
  },

  statusIcon: {
    fontSize: 10,
    color:    'var(--text-muted)',
  },
