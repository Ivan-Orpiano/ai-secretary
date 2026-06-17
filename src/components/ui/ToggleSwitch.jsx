import React from 'react';

/**
 * @param {{ checked: boolean, onChange: (v:boolean)=>void, label: string }} props
 */
export default function ToggleSwitch({ checked, onChange, label }) {
  return (
    <label className="toggle-row">
      <span className="toggle-label">{label}</span>
      <span className={`toggle-switch${checked ? ' on' : ''}`}>
        <input
          type="checkbox"
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
          aria-label={label}
        />
        <span className="toggle-knob" aria-hidden="true" />
      </span>
    </label>
  );
}