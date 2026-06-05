import React from 'react';
import { formatRelativeTime, formatTime, formatDate } from '../../utils/dateUtils';

/**
 * @param {{ date: string|Date}} props
 */

export default function Timestamp ({date}) {
    const fullLabel = `${formatDate(date)} at ${formatTime(date)}`;

  return (
    <time
      dateTime={new Date(date).toISOString()}
      title={fullLabel}
      aria-label={fullLabel}
      style={{
        fontSize:    11,
        color:       'var(--text-muted)',
        letterSpacing: '0.02em',
        fontFamily:  'var(--font-mono)',
        userSelect:  'none',
        cursor:      'default',
        whiteSpace:  'nowrap',
      }}
    >
      {formatRelativeTime(date)}
    </time>
  );


}