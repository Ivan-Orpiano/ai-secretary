import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  ChatIcon, FilesIcon, CalendarIcon,
  MailIcon, SettingsIcon, SparkleIcon, XIcon,
} from '../icons/Icons';

const NAV_ITEMS = [
  { to: '/',         label: 'Chat',     icon: ChatIcon,     end: true },
  { to: '/files',    label: 'Files',    icon: FilesIcon },
  { to: '/calendar', label: 'Calendar', icon: CalendarIcon },
  { to: '/email',    label: 'Email',    icon: MailIcon },
  { to: '/settings', label: 'Settings', icon: SettingsIcon },
];

/**
 * @param {{
 *   open:          boolean,
 *   mobileOpen:    boolean,
 *   onCloseMobile: () => void,
 * }} props
 */
export default function Sidebar({ open, mobileOpen, onCloseMobile }) {
  const className = [
    'sidebar',
    open ? '' : 'collapsed',
    mobileOpen ? 'mobile-open' : '',
  ].filter(Boolean).join(' ');

  return (
    <aside className={className} aria-label="Primary navigation">

      {/* ── Header ─────────────────────────────── */}
      <div className="sidebar-header">
        <div
          className="sidebar-logo"
          aria-hidden="true"
        >
          <SparkleIcon size={18} />
        </div>

        <div className="sidebar-title-group">
          <div className="sidebar-title">ARIA</div>
          <div className="sidebar-subtitle">AI Secretary</div>
        </div>

        <button
          type="button"
          className="sidebar-close-btn"
          onClick={onCloseMobile}
          aria-label="Close navigation"
        >
          <XIcon size={18} />
        </button>
      </div>

      {/* ── Nav ────────────────────────────────── */}
      <nav className="sidebar-body" aria-label="Main menu">
        <div className="sidebar-section-label">Navigation</div>

        {NAV_ITEMS.map(({ to, label, icon: Icon, end }, idx) => (
          <NavLink
            key={to}
            to={to}
            end={end}
            onClick={onCloseMobile}
            className={({ isActive }) => `sidebar-item${isActive ? ' active' : ''}`}
          >
            <span style={{
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              width: 22, height: 22, flexShrink: 0,
              opacity: 0,
              animation: `slideInLeft 0.3s ease ${0.05 + idx * 0.042}s both`,
            }}>
              <Icon size={18} />
            </span>
            <span style={{
              opacity: 0,
              animation: `slideInLeft 0.3s ease ${0.07 + idx * 0.042}s both`,
            }}>
              {label}
            </span>
          </NavLink>
        ))}
      </nav>

      {/* ── Footer ─────────────────────────────── */}
      <div className="sidebar-footer">
        <div className="sidebar-pill">
          <span className="sidebar-pill-dot" aria-hidden="true" />
          Webhook active
        </div>

        <div className="sidebar-webhook-info">
          <div style={{
            color: 'var(--text-hint)', fontSize: 10,
            textTransform: 'uppercase', letterSpacing: '0.08em',
            marginBottom: 4, fontFamily: 'var(--font-body)', fontWeight: 600,
          }}>
            n8n · GET endpoint
          </div>
          fee2e2ba-a3c1-4d…
        </div>
      </div>
    </aside>
  );
}import React, { useState, useRef, useCallback, useEffect } from 'react';
import FileUpload        from './FileUpload';
import { useFileUpload }  from '../../hooks/useFileUpload';
import { MAX_FILES_PER_MSG } from '../../utils/constants';
import { PaperclipIcon, SendIcon, SpinnerIcon } from '../icons/Icons';

const isEmpty = (text, files) => !text?.trim() && (!files || files.length === 0);

/* ── Inline styles ──────────────────────────────────────────────── */
const s = {
  outer: {
    background: 'var(--bg-glass)',
    backdropFilter: 'blur(12px)',
    WebkitBackdropFilter: 'blur(12px)',
    borderTop: '1px solid var(--border-subtle)',
    padding: '0 0 16px',
    flexShrink: 0,
    position: 'relative',
    zIndex: 5,
  },

  bar: {
    display: 'flex',
    alignItems: 'flex-end',
    gap: 10,
    margin: '16px 24px 0',
    background: 'var(--bg-surface)',
    border: '1px solid var(--border-mid)',
    borderRadius: 'var(--radius-xl)',
    padding: '10px 12px 10px 18px',
    boxShadow: 'var(--shadow-sm)',
  },

  textarea: {
    flex: 1,
    background: 'none',
    border: 'none',
    outline: 'none',
    resize: 'none',
    color: 'var(--text-primary)',
    fontFamily: 'var(--font-body)',
    fontSize: 14.5,
    lineHeight: 1.6,
    padding: 0,
    minHeight: 24,
    maxHeight: 160,
    overflowY: 'auto',
    caretColor: 'var(--accent)',
  },

  actions: {
    display: 'flex',
    alignItems: 'flex-end',
    gap: 6,
    paddingBottom: 2,
  },

  iconBtn: (active) => ({
    width: 38, height: 38,
    borderRadius: 'var(--radius-sm)',
    background: active ? 'var(--accent-dim)' : 'var(--bg-subtle)',
    border: active ? '1px solid var(--border-accent)' : '1px solid var(--border-subtle)',
    cursor: 'pointer',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    color: active ? 'var(--accent)' : 'var(--text-muted)',
    transition: 'all 0.16s ease',
    flexShrink: 0, position: 'relative',
  }),

  sendBtn: (canSend, isLoading) => ({
    width: 40, height: 40,
    borderRadius: 'var(--radius-sm)',
    background: canSend && !isLoading
      ? 'var(--gradient-send)'
      : 'var(--bg-hover)',
    border: 'none',
    cursor: canSend && !isLoading ? 'pointer' : 'default',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    color: canSend && !isLoading ? '#FFFFFF' : 'var(--text-muted)',
    transition: 'all 0.18s ease',
    flexShrink: 0,
    boxShadow: canSend && !isLoading ? 'var(--shadow-md)' : 'none',
    transform: 'scale(1)',
  }),

  hint: {
    fontSize: 12, color: 'var(--text-muted)',
    fontFamily: 'var(--font-body)',
    padding: '8px 24px 0',
    display: 'flex', justifyContent: 'space-between',
  },

  fileBadge: {
    position: 'absolute', top: -4, right: -4,
    width: 16, height: 16, borderRadius: '50%',
    background: 'var(--accent)',
    color: '#FFFFFF', fontSize: 9, fontWeight: 700,
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    fontFamily: 'var(--font-body)',
    border: '2px solid var(--bg-surface)',
    lineHeight: 1,
  },
};

/* ── ChatInput ──────────────────────────────────────────────────── */
export default function ChatInput({ onSend, isLoading, prefillText = '' }) {
  const [text, setText]       = useState('');
  const textareaRef           = useRef(null);

  const {
    files, fileErrors, dragActive,
    inputRef, removeFile, clearFiles,
    openPicker, onDragEnter, onDragLeave, onDragOver, onDrop, onInputChange,
    hasFiles,
  } = useFileUpload();

  /* Auto-resize textarea */
  const resizeTextarea = useCallback(() => {
    const el = textareaRef.current;
    if (!el) return;
    el.style.height = 'auto';
    el.style.height = `${Math.min(el.scrollHeight, 160)}px`;
  }, []);

  useEffect(() => { resizeTextarea(); }, [text, resizeTextarea]);

  /* Handle prefill from suggestion chips */
  useEffect(() => {
    if (prefillText) {
      setText(prefillText);
      textareaRef.current?.focus();
    }
  }, [prefillText]);

  /* Send message */
  const handleSend = useCallback(() => {
    if (isLoading || isEmpty(text, files)) return;
    onSend(text, files);
    setText('');
    clearFiles();
    if (textareaRef.current) textareaRef.current.style.height = 'auto';
  }, [text, files, isLoading, onSend, clearFiles]);

  /* Keyboard: Enter to send, Shift+Enter for newline */
  const handleKeyDown = useCallback((e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  }, [handleSend]);

  const canSend = !isEmpty(text, files) && !isLoading;

  return (
    <div
      style={s.outer}
      onDragEnter={onDragEnter}
      onDragOver={onDragOver}
    >
      {/* File previews & drag overlay */}
      <FileUpload
        files={files}
        fileErrors={fileErrors}
        dragActive={dragActive}
        inputRef={inputRef}
        onInputChange={onInputChange}
        onDragLeave={onDragLeave}
        onDrop={onDrop}
        removeFile={removeFile}
      />

      {/* Input bar */}
      <div className="chat-input-bar" style={s.bar}>
        <textarea
          ref={textareaRef}
          style={s.textarea}
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Ask ARIA anything…"
          rows={1}
          aria-label="Message input"
          disabled={isLoading}
        />

        <div style={s.actions}>
          {/* Attach button */}
          <button
            type="button"
            style={s.iconBtn(hasFiles)}
            onClick={openPicker}
            title={`Attach files (${files.length}/${MAX_FILES_PER_MSG})`}
            aria-label="Attach files"
            disabled={isLoading}
          >
            <PaperclipIcon size={17} />
            {hasFiles && (
              <span style={s.fileBadge} aria-hidden="true">
                {files.length}
              </span>
            )}
          </button>

          {/* Send button */}
          <button
            type="button"
            style={s.sendBtn(canSend, isLoading)}
            onClick={handleSend}
            title="Send message (Enter)"
            aria-label="Send message"
            disabled={!canSend}
            onMouseDown={(e) => {
              if (canSend && !isLoading) e.currentTarget.style.transform = 'scale(0.92)';
            }}
            onMouseUp={(e) => {
              e.currentTarget.style.transform = 'scale(1)';
            }}
          >
            {isLoading
              ? <SpinnerIcon size={17} className="icon-spin" />
              : <SendIcon size={17} />}
          </button>
        </div>
      </div>

      {/* Hint bar */}
      <div style={s.hint} className="chat-input-hint">
        <span>Enter to send · Shift+Enter for new line</span>
        {hasFiles && <span>{files.length}/{MAX_FILES_PER_MSG} file(s)</span>}
      </div>
    </div>
  );
}