import React, { useEffect, useRef, useState, useCallback } from 'react';

/* ── Suggestion data ─────────────────────────────────────── */
export const SUGGESTIONS = [
  { icon: '📧', text: 'Draft a professional email to reschedule a meeting' },
  { icon: '📋', text: "Summarize a document's key points for me" },
  { icon: '📅', text: 'Create a structured weekly schedule template' },
  { icon: '✍️', text: 'Help me write a Q3 performance review' },
  { icon: '🔍', text: 'Research the latest AI agent frameworks' },
  { icon: '💡', text: 'Brainstorm SaaS growth strategies for 2025' },
];

