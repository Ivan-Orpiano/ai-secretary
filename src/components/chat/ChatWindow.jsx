import React, { useEffect, useRef } from 'react';
import MessageBubble   from './MessageBubble';
import LoadingIndicator from '../ui/LoadingIndicator';
import { SUGGESTIONS } from '../../utils/messageUtils';

/* ── Inline styles ─────────────────────────────────────────────────── */
const s = {
  container: {
    flex:           1,
    overflowY:      'auto',
    overflowX:      'hidden',
    padding:        '24px 20px',
    display:        'flex',
    flexDirection:  'column',
    gap:             8,
    scrollBehavior: 'smooth',
  },

  /* Empty / welcome state */
  emptyWrapper: {
    flex:           1,
    display:        'flex',
    flexDirection:  'column',
    alignItems:     'center',
    justifyContent: 'center',
    gap:             32,
    padding:        '40px 20px',
    animation:      'fadeIn 0.6s ease both',
  },

  logo: {
    display:        'flex',
    flexDirection:  'column',
    alignItems:     'center',
    gap:             12,
  },

  logoGlyph: {
    width:          72,
    height:         72,
    borderRadius:   '50%',
    background:     'linear-gradient(135deg, #3DFFC0 0%, #00B4D8 100%)',
    display:        'flex',
    alignItems:     'center',
    justifyContent: 'center',
    fontSize:        32,
    boxShadow:      '0 0 40px rgba(61,255,192,0.25), 0 0 80px rgba(61,255,192,0.10)',
    animation:      'glow 3s ease-in-out infinite',
  },

  logoTitle: {
    fontFamily: 'var(--font-display)',
    fontSize:    28,
    fontWeight:  800,
    color:       'var(--text-primary)',
    letterSpacing: '-0.5px',
  },

  logoSubtitle: {
    fontFamily: 'var(--font-body)',
    fontSize:    14,
    color:      'var(--text-secondary)',
    textAlign:  'center',
    maxWidth:    320,
    lineHeight:  1.5,
  },

  suggestionsGrid: {
    display:             'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap:                  10,
    width:               '100%',
    maxWidth:             640,
  },

  suggestionChip: {
    padding:       '12px 16px',
    background:    'var(--bg-elevated)',
    border:        '1px solid var(--border-mid)',
    borderRadius:   12,
    cursor:        'pointer',
    fontSize:       13,
    color:         'var(--text-secondary)',
    fontFamily:    'var(--font-body)',
    textAlign:     'left',
    lineHeight:     1.4,
    transition:    'all 0.18s ease',
  },

  /* Scroll anchor */
  anchor: { height: 0, flexShrink: 0 },
};
