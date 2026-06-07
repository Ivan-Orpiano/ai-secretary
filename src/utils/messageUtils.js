// for format messages
let _counter = 0;

/* ── Generate a unique message ID ───────────────────────────────── */
export const genId = () => `msg_${Date.now()}_${++_counter}`;

/* ── Generate a session ID ───────────────────────────────────────── */
export const genSessionId = () =>
  `session_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`;

/* ── Format timestamp ────────────────────────────────────────────── */
export const formatTime = (date) => {
  const d = date instanceof Date ? date : new Date(date);
  return d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
};

export const formatDate = (date) => {
  const d   = date instanceof Date ? date : new Date(date);
  const now = new Date();
  const isToday = d.toDateString() === now.toDateString();
  if (isToday) return 'Today';
  const yesterday = new Date(now);
  yesterday.setDate(now.getDate() - 1);
  if (d.toDateString() === yesterday.toDateString()) return 'Yesterday';
  return d.toLocaleDateString([], { month: 'short', day: 'numeric', year: 'numeric' });
};

/* ── Create a user message object ────────────────────────────────── */
export const createUserMessage = (text, files = []) => ({
  id:        genId(),
  role:      'user',
  text:      text.trim(),
  files:     files,
  timestamp: new Date(),
  status:    'sending',
});

/* ── Create an AI message object ─────────────────────────────────── */
export const createAssistantMessage = (text = '') => ({
  id:        genId(),
  role:      'assistant',
  text,
  files:     [],
  timestamp: new Date(),
  status:    'done',
});

/* ── Create an error message object ─────────────────────────────── */
export const createErrorMessage = (errorText) => ({
  id:        genId(),
  role:      'assistant',
  text:      errorText,
  files:     [],
  timestamp: new Date(),
  status:    'error',
  isError:   true,
});

/* ── Greeting suggestions ────────────────────────────────────────── */
export const SUGGESTIONS = [
  'Summarize the attached document',
  'Draft a professional email response',
  'Schedule a meeting for next week',
  'Create a to-do list from this brief',
  'Translate this text to Spanish',
  'Proofread and improve my writing',
];

/* ── Naive check whether message looks empty ─────────────────────── */
export const isEmpty = (text, files) =>
  (!text || text.trim().length === 0) && (!files || files.length === 0);