
export enum MoodType {
  VERY_HAPPY = 'VERY_HAPPY',
  HAPPY = 'HAPPY',
  NEUTRAL = 'NEUTRAL',
  BAD = 'BAD',
  AWFUL = 'AWFUL'
}

export interface MoodConfig {
  id: MoodType;
  color: string;
  label: string;
  emoji: string;
}

export const MOOD_CONFIGS: Record<MoodType, MoodConfig> = {
  [MoodType.VERY_HAPPY]: { id: MoodType.VERY_HAPPY, color: '#ffcc80', label: 'มีความสุขมากที่สุด', emoji: '🟠' },
  [MoodType.HAPPY]: { id: MoodType.HAPPY, color: '#fff59d', label: 'มีความสุข', emoji: '🟡' },
  [MoodType.NEUTRAL]: { id: MoodType.NEUTRAL, color: '#c8e6c9', label: 'เฉยๆ', emoji: '🟢' },
  [MoodType.BAD]: { id: MoodType.BAD, color: '#90caf9', label: 'ไม่ค่อยดี', emoji: '🔵' },
  [MoodType.AWFUL]: { id: MoodType.AWFUL, color: '#ce93d8', label: 'แย่', emoji: '🟣' }
};

export interface FutureLetter {
  id: string;
  text: string;
  releaseDate: string; // YYYY-MM-DD
  createdAt: string;
}

export interface JoyMemory {
  id: string;
  text: string;
  date: string;
}

export interface PrideEntry {
  id: string;
  text: string;
  date: string;
}

export type SavedMoods = Record<string, MoodType>; // dateKey: "YYYY-MM-DD"
