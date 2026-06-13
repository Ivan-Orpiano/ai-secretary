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

/* ── Orbit logo ──────────────────────────────────────────── */
function OrbitLogo() {
  return (
    <div style={{ position: 'relative', width: 110, height: 110 }}>
      <div style={{
        position:'absolute', inset:-6,
        borderRadius:'50%', border:'1px dashed rgba(0,200,255,0.08)',
      }} />
      <div style={{
        position:'absolute', inset:8,
        borderRadius:'50%', border:'1px solid rgba(0,245,160,0.11)',
      }} />
      <div style={{
        position:'absolute', inset:0, borderRadius:'50%',
        background:'linear-gradient(135deg,#00F5A0,#00C8FF)',
        display:'flex', alignItems:'center', justifyContent:'center',
        fontSize:34, animation:'glow 3s ease-in-out infinite',
        boxShadow:'0 0 40px var(--acc-glow)',
      }}>✦</div>
      {/* Orbiting particles */}
      {[
        { anim:'orb1 4.2s linear infinite', size:8, color:'#00F5A0', shadow:'rgba(0,245,160,0.9)' },
        { anim:'orb2 6.5s linear infinite', size:6, color:'#00C8FF', shadow:'rgba(0,200,255,0.9)' },
        { anim:'orb3 9s   linear infinite', size:5, color:'#FF6B9D', shadow:'rgba(255,107,157,0.9)' },
      ].map((p, i) => (
        <div key={i} style={{
          position:'absolute', top:'50%', left:'50%',
          marginTop:-p.size/2, marginLeft:-p.size/2,
          animation:p.anim,
        }}>
          <div style={{
            width:p.size, height:p.size, borderRadius:'50%',
            background:p.color, position:'absolute',
            transform:'translate(-50%,-50%)',
            boxShadow:`0 0 ${p.size}px ${p.shadow}`,
          }} />
        </div>
      ))}
    </div>
  );
}
