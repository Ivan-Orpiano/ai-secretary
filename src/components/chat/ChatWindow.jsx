import React, { useEffect, useRef } from 'react';
import WelcomeScreen   from './WelcomeScreen';
import MessageBubble   from './MessageBubble';
import TypingIndicator from './TypingIndicator';

/* ── Ambient background ──────────────────────────────────── */
function Aurora() {
  const orbs = [
    { top: '-8%',    left: '-4%',  w: 520, h: 520, color: 'rgba(0,245,160,0.07)', dur: '18s', delay: '0s',   dir: '' },
    { bottom: '-12%', right: '-6%', w: 600, h: 600, color: 'rgba(0,150,255,0.06)', dur: '22s', delay: '-9s',  dir: 'reverse' },
    { top: '35%',    left: '25%',  w: 360, h: 360, color: 'rgba(90,60,200,0.04)', dur: '28s', delay: '-14s', dir: '' },
  ];
  return (
    <div className="aurora" aria-hidden="true">
      {orbs.map((o, i) => (
        <div
          key={i}
          className="aurora-orb"
          style={{
            width: o.w, height: o.h,
            top: o.top, left: o.left, bottom: o.bottom, right: o.right,
            background: `radial-gradient(circle, ${o.color} 0%, transparent 70%)`,
            animation: `aurora ${o.dur} ease-in-out infinite ${o.dir}`,
            animationDelay: o.delay,
          }}
        />
      ))}
    </div>
  );
}

/**
 * @param {{
 *   messages: Array,
 *   isLoading: boolean,
 *   onSuggestionSelect: (text: string) => void,
 * }} props
 */
export default function ChatWindow({ messages, isLoading, onSuggestionSelect }) {
  const endRef = useRef(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  const isEmpty = messages.length === 0;

  return (
    <>
      <Aurora />
      <div className="chat-scroll">
        {isEmpty ? (
          <WelcomeScreen onSelectSuggestion={onSuggestionSelect} />
        ) : (
          <>
            {messages.map((msg) => (
              <MessageBubble key={msg.id} message={msg} />
            ))}
            {isLoading && <TypingIndicator />}
            <div ref={endRef} style={{ height: 0 }} />
          </>
        )}
      </div>
    </>
  );
}