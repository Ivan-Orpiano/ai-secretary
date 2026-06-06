import React, { useState, useCallback } from 'react';
import { useChat }          from '../../hooks/useChat';
import { useAutoScroll }    from '../../hooks/useAutoScroll';
import { useChatContext }   from '../../context/ChatContext';
import MessageBubble        from './MessageBubble';
import TypingIndicator      from './TypingIndicator';
import WelcomeScreen        from './WelcomeScreen';

export default function ChatWindow() {
  const { messages, isTyping, sendMessage } = useChat();
  const { addMessage } = useChatContext();

  // Scroll ref — triggers on message count or typing indicator change
  const scrollRef = useAutoScroll([messages.length, isTyping]);

  /**
   * Called when user clicks a WelcomeScreen suggestion chip.
   * Pre-fills the message and immediately sends it.
   */
  const handleSuggestion = useCallback((text) => {
    sendMessage(text, []);
  }, [sendMessage]);

  return (
    <main
      ref={scrollRef}
      id="chat-window"
      aria-label="Conversation"
      aria-live="polite"
      aria-relevant="additions"
      style={{
        flex:       1,
        overflowY:  'auto',
        padding:    '16px 20px 8px',
        display:    'flex',
        flexDirection: 'column',
      }}
    >
      {messages.length === 0 ? (
        <WelcomeScreen onSelectSuggestion={handleSuggestion} />
      ) : (
        <>
          {messages.map((msg) => (
            <MessageBubble key={msg.id} message={msg} />
          ))}

          {isTyping && <TypingIndicator />}

          {/* Bottom anchor for auto-scroll */}
          <div style={{ height: 1 }} aria-hidden="true" />
        </>
      )}
    </main>
  );
}