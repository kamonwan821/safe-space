
import React from 'react';

interface IconProps {
  className?: string;
  color?: string;
  size?: number | string;
}

export const SparkleIcon = ({ className, color = "currentColor", size = 24 }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M12 3v3m0 12v3M3 12h3m12 0h3M5.6 5.6l2.1 2.1m8.6 8.6l2.1 2.1M5.6 18.4l2.1-2.1m8.6-8.6l2.1-2.1" />
  </svg>
);

export const ShredderIcon = ({ className, color = "currentColor", size = 24 }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M4 7h16M4 11h16M4 15h16M4 19h16M8 3v4M12 3v4M16 3v4" />
    <rect x="2" y="7" width="20" height="4" rx="1" />
  </svg>
);

export const MoonIcon = ({ className, color = "currentColor", size = 24 }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
  </svg>
);

export const MicIcon = ({ className, color = "currentColor", size = 24 }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z" />
    <path d="M19 10v2a7 7 0 0 1-14 0v-2M12 19v4M8 23h8" />
  </svg>
);

export const QuestionIcon = ({ className, color = "currentColor", size = 24 }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <circle cx="12" cy="12" r="10" />
    <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3M12 17h.01" />
  </svg>
);

export const FireIcon = ({ className, color = "currentColor", size = 24 }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.5 4 6.5 2 2 3 5.5 3 5.5s-1 1-1.5 1.5S16 19 15 21.5s-3-2-3-4-1.5-3-3.5-3z" />
  </svg>
);

export const HeartBrokenIcon = ({ className, color = "currentColor", size = 24 }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M12 21l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21z" />
    <path d="M12 5l-2 3 3 2-3 3 4 3" />
  </svg>
);

export const LightbulbIcon = ({ className, color = "currentColor", size = 24 }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M9 18h6m-3-15a7 7 0 0 0-7 7c0 2.22 1.02 4.2 2.61 5.5l.89 1.5a1 1 0 0 0 .85.5h5.3a1 1 0 0 0 .85-.5l.89-1.5C17.98 14.2 19 12.22 19 10a7 7 0 0 0-7-7z" />
  </svg>
);

export const CalendarIcon = ({ className, color = "currentColor", size = 24 }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <rect x="3" y="4" width="18" height="18" rx="4" />
    <path d="M16 2v4M8 2v4M3 10h18" />
  </svg>
);

export const JarIcon = ({ className, color = "currentColor", size = 24 }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M7 3h10a1 1 0 0 1 1 1v1h-12v-1a1 1 0 0 1 1-1z" />
    <path d="M5 5v13a4 4 0 0 0 4 4h6a4 4 0 0 0 4-4v-13" />
    <path d="M9 11a1 1 0 1 0 0-2 1 1 0 0 0 0 2zM15 11a1 1 0 1 0 0-2 1 1 0 0 0 0 2z" />
    <path d="M10 14c1 1 3 1 4 0" />
  </svg>
);

export const HandshakeIcon = ({ className, color = "currentColor", size = 24 }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M16 5c2 0 4 2 4 4s-2 4-4 4-4-2-4-4 2-4 4-4zM8 11c2 0 4 2 4 4s-2 4-4 4-4-2-4-4 2-4 4-4z" />
    <path d="M12 9c0 1-1 2-2 2" />
  </svg>
);

export const LetterIcon = ({ className, color = "currentColor", size = 24 }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <rect x="2" y="5" width="20" height="14" rx="3" />
    <path d="M22 7l-8.97 5.7a2 2 0 0 1-2.06 0L2 7" />
  </svg>
);

export const AssessmentIcon = ({ className, color = "currentColor", size = 24 }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M9 11l3 3L22 4" />
    <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
  </svg>
);

export const TreeIcon = ({ className, color = "currentColor", size = 24, level = 4 }: IconProps & { level?: number }) => {
  const levels = [
    <g key="0">
      <path d="M12 22V19" stroke={color} />
      <path d="M12 19C12 17 10 16 9 16" stroke={color} />
      <path d="M12 19C12 17 14 16 15 16" stroke={color} />
      <path d="M9 16C8 16 7 15 7 14C7 13 8 12 9 12C10 12 11 13 11 14C11 15 10 16 9 16Z" fill={color} opacity="0.2" />
      <path d="M15 16C16 16 17 15 17 14C17 13 16 12 15 12C14 12 13 13 13 14C13 15 14 16 15 16Z" fill={color} opacity="0.2" />
    </g>,
    <g key="1">
      <path d="M12 22V16" stroke={color} />
      <path d="M12 16L9 13" stroke={color} />
      <path d="M12 18L15 15" stroke={color} />
      <circle cx="9" cy="13" r="2" fill={color} opacity="0.3" />
      <circle cx="15" cy="15" r="2" fill={color} opacity="0.3" />
      <circle cx="12" cy="14" r="2.5" fill={color} opacity="0.3" />
    </g>,
    <g key="2">
      <path d="M12 22V15" stroke={color} />
      <path d="M12 15C10 15 8 13 8 10C8 7 10 5 12 5C14 5 16 7 16 10C16 13 14 15 12 15Z" stroke={color} fill={color} opacity="0.1" />
      <path d="M10 12C9 12 8 11 8 10" stroke={color} />
      <path d="M14 12C15 12 16 11 16 10" stroke={color} />
    </g>,
    <g key="3">
      <path d="M11 22V18M13 22V18" stroke={color} strokeWidth="2" />
      <path d="M12 18C8 18 5 15 5 10C5 5 8 2 12 2C16 2 19 5 19 10C19 15 16 18 12 18Z" stroke={color} fill={color} opacity="0.1" />
      <path d="M8 8C7 9 7 11 8 12M16 8C17 9 17 11 16 12" stroke={color} />
      <path d="M11 6C12 5 13 5 14 6" stroke={color} />
    </g>,
    <g key="4">
      <path d="M11 22V18M13 22V18" stroke={color} strokeWidth="2.5" />
      <path d="M12 18C7 18 4 14 4 9C4 4 8 1 12 1C16 1 20 4 20 9C20 14 17 18 12 18Z" stroke={color} fill={color} opacity="0.15" />
      <circle cx="8" cy="7" r="1.5" fill="#FFB7C5" />
      <circle cx="16" cy="6" r="1.5" fill="#FFB7C5" />
      <circle cx="12" cy="4" r="1.5" fill="#FFB7C5" />
      <circle cx="15" cy="11" r="1.5" fill="#FFB7C5" />
      <circle cx="9" cy="12" r="1.5" fill="#FFB7C5" />
      <path d="M9 9C10 8 11 8 12 9" stroke={color} opacity="0.5" />
    </g>
  ];
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
      {levels[Math.min(level, levels.length - 1)]}
    </svg>
  );
};

export const MoodIcon = ({ mood, size = 48, className }: { mood: string, size?: number, className?: string }) => {
  const icons: Record<string, React.ReactElement> = {
    VERY_HAPPY: (
      <g>
        <circle cx="12" cy="12" r="10" />
        <path d="M8 11s.5-1 1.5-1 1.5 1 1.5 1M13 11s.5-1 1.5-1 1.5 1 1.5 1" />
        <path d="M8 15s1.5 2.5 4 2.5 4-2.5 4-2.5" />
      </g>
    ),
    HAPPY: (
      <g>
        <circle cx="12" cy="12" r="10" />
        <circle cx="9" cy="10" r="1" fill="currentColor" />
        <circle cx="15" cy="10" r="1" fill="currentColor" />
        <path d="M8 15s1.5 2 4 2 4-2 4-2" />
      </g>
    ),
    NEUTRAL: (
      <g>
        <circle cx="12" cy="12" r="10" />
        <circle cx="9" cy="10" r="1" fill="currentColor" />
        <circle cx="15" cy="10" r="1" fill="currentColor" />
        <path d="M9 16h6" />
      </g>
    ),
    BAD: (
      <g>
        <circle cx="12" cy="12" r="10" />
        <circle cx="9" cy="10" r="1" fill="currentColor" />
        <circle cx="15" cy="10" r="1" fill="currentColor" />
        <path d="M16 17s-1.5-2-4-2-4 2-4 2" />
      </g>
    ),
    AWFUL: (
      <g>
        <circle cx="12" cy="12" r="10" />
        <path d="M7 9l2 2m-2 0l2-2M15 9l2 2m-2 0l2-2" />
        <path d="M8 17s1.5-2.5 4-2.5 4 2.5 4 2.5" />
      </g>
    )
  };
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
      {icons[mood] || icons.NEUTRAL}
    </svg>
  );
};
