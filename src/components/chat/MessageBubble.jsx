import React, { useState } from 'react';
import Avatar    from '../ui/Avatar';
import Timestamp from '../ui/Timestamp';
import { getFileIcon, isImageFile, formatFileSize } from '../../utils/fileUtils';

function AttachedFile({ file }) {
  return (
    <div
      style={{
        display:      'flex',
        alignItems:   'center',
        gap:          6,
        background:   'rgba(255,255,255,0.12)',
        borderRadius: 8,
        padding:      '4px 8px',
        fontSize:     11,
        maxWidth:     180,
      }}
    >
      {file.preview ? (
        <img
          src={file.preview}
          alt={file.name}
          style={{ width: 22, height: 22, objectFit: 'cover', borderRadius: 4, flexShrink: 0 }}
        />
      ) : (
        <span style={{ fontSize: 16, flexShrink: 0 }}>{getFileIcon(file.type)}</span>
      )}
      <div style={{ overflow: 'hidden' }}>
        <div style={{
          overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
          fontWeight: 500, maxWidth: 120,
        }}>
          {file.name}
        </div>
        <div style={{ opacity: 0.7, fontSize: 10 }}>
          {formatFileSize(file.size)}
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────
// Main MessageBubble
// ─────────────────────────────────────────────

/**
 * @param {{
 *   message: {
 *     id:        string,
 *     role:      'user'|'assistant',
 *     content:   string,
 *     files:     Array<{name,type,size,preview}>,
 *     timestamp: string,
 *   }
 * }} props
 */
export default function MessageBubble({ message }) {
  const isUser = message.role === 'user';
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(message.content);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      /* clipboard API not available */
    }
  };

  return (
    <div
      style={{
        display:       'flex',
        flexDirection: isUser ? 'row-reverse' : 'row',
        gap:           10,
        alignItems:    'flex-end',
        padding:       '3px 0',
        animation:     isUser ? 'slideInRight 0.22s ease-out' : 'slideInLeft 0.22s ease-out',
      }}
    >
      {/* Avatar */}
      <Avatar role={message.role} />

      {/* Bubble + meta */}
      <div
        style={{
          maxWidth:      'min(72%, 640px)',
          display:       'flex',
          flexDirection: 'column',
          gap:           4,
          alignItems:    isUser ? 'flex-end' : 'flex-start',
        }}
      >
        {/* Bubble */}
        <div
          style={{
            background:   isUser ? 'var(--bubble-user)' : 'var(--bubble-ai)',
            color:        isUser ? 'var(--bubble-user-text)' : 'var(--bubble-ai-text)',
            borderRadius: isUser ? '18px 18px 4px 18px' : '18px 18px 18px 4px',
            padding:      '11px 15px',
            fontSize:     14,
            lineHeight:   1.65,
            border:       isUser ? 'none' : '1px solid var(--border)',
            boxShadow:    'var(--shadow-sm)',
            wordBreak:    'break-word',
            whiteSpace:   'pre-wrap',
          }}
        >
          {/* Message text */}
          {message.content && <span>{message.content}</span>}

          {/* File attachments */}
          {message.files?.length > 0 && (
            <div
              style={{
                display:   'flex',
                flexWrap:  'wrap',
                gap:       6,
                marginTop: message.content ? 8 : 0,
              }}
            >
              {message.files.map((f, i) => (
                <AttachedFile key={i} file={f} />
              ))}
            </div>
          )}
        </div>

        {/* Timestamp + copy */}
        <div
          style={{
            display:       'flex',
            gap:           8,
            alignItems:    'center',
            flexDirection: isUser ? 'row-reverse' : 'row',
          }}
        >
          <Timestamp date={message.timestamp} />

          {/* Copy button — only for assistant messages */}
          {!isUser && message.content && (
            <button
              onClick={handleCopy}
              aria-label={copied ? 'Copied!' : 'Copy message'}
              style={{
                background:   'none',
                border:       'none',
                cursor:       'pointer',
                fontSize:     11,
                color:        copied ? 'var(--success)' : 'var(--text-muted)',
                padding:      '2px 6px',
                borderRadius: 'var(--radius-sm)',
                fontFamily:   'inherit',
                transition:   'all var(--transition-fast)',
                display:      'flex',
                alignItems:   'center',
                gap:          3,
              }}
              onMouseEnter={(e) => (e.currentTarget.style.background = 'var(--surface-overlay)')}
              onMouseLeave={(e) => (e.currentTarget.style.background = 'none')}
            >
              {copied ? '✓ Copied' : 'Copy'}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}