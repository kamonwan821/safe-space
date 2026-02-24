
import React, { useMemo } from 'react';
import { SavedMoods, MoodType, MOOD_CONFIGS } from '../types';

interface MonthlyStatsProps {
  viewDate: Date;
  savedMoods: SavedMoods;
}

const MonthlyStats: React.FC<MonthlyStatsProps> = ({ viewDate, savedMoods }) => {
  const month = viewDate.getMonth();
  const year = viewDate.getFullYear();
  const monthName = viewDate.toLocaleString('th-TH', { month: 'long' });

  const stats = useMemo(() => {
    const counts: Record<MoodType, number> = {
      [MoodType.VERY_HAPPY]: 0,
      [MoodType.HAPPY]: 0,
      [MoodType.NEUTRAL]: 0,
      [MoodType.BAD]: 0,
      [MoodType.AWFUL]: 0,
    };

    // Day of week analysis (0-6: Sun-Sat)
    const dayOfWeekStressCounts = Array(7).fill(0);
    const dayOfWeekTotalCounts = Array(7).fill(0);

    let totalRecorded = 0;
    const datePrefix = `${year}-${String(month + 1).padStart(2, '0')}`;

    Object.entries(savedMoods).forEach(([dateKey, mood]) => {
      if (dateKey.startsWith(datePrefix)) {
        counts[mood as MoodType]++;
        totalRecorded++;

        const date = new Date(dateKey);
        const dayIdx = date.getDay();
        dayOfWeekTotalCounts[dayIdx]++;
        if (mood === MoodType.BAD || mood === MoodType.AWFUL) {
          dayOfWeekStressCounts[dayIdx]++;
        }
      }
    });

    // Find the day with most stress relative to total logs on that day
    let mostStressedDayIdx = -1;
    let maxStressRatio = -1;
    dayOfWeekStressCounts.forEach((stress, idx) => {
      if (dayOfWeekTotalCounts[idx] > 0) {
        const ratio = stress / dayOfWeekTotalCounts[idx];
        if (ratio > maxStressRatio) {
          maxStressRatio = ratio;
          mostStressedDayIdx = idx;
        }
      }
    });

    return { counts, totalRecorded, mostStressedDayIdx, dayOfWeekStressCounts, dayOfWeekTotalCounts };
  }, [savedMoods, month, year]);

  const dominantMood = useMemo(() => {
    if (stats.totalRecorded === 0) return null;
    let max = -1;
    let mood: MoodType = MoodType.NEUTRAL;
    (Object.entries(stats.counts) as [MoodType, number][]).forEach(([m, count]) => {
      if (count > max) {
        max = count;
        mood = m;
      }
    });
    return MOOD_CONFIGS[mood];
  }, [stats]);

  const dayNames = ['วันอาทิตย์', 'วันจันทร์', 'วันอังคาร', 'วันพุธ', 'วันพฤหัสบดี', 'วันศุกร์', 'วันเสาร์'];

  if (stats.totalRecorded === 0) {
    return (
      <div className="bg-white/50 p-12 rounded-[3.5rem] border border-white text-center text-gray-300 italic text-lg">
        ยังไม่มีบันทึกในเดือน{monthName} ลองเลือกวันที่ในปฏิทินดูนะ...
      </div>
    );
  }

  return (
    <div className="space-y-12">
      <div className="bg-white p-12 rounded-[3.5rem] shadow-sm border border-white animate-in fade-in duration-700">
        <div className="mb-10 text-center md:text-left">
          <h3 className="text-3xl font-bold text-[#5d4037] mb-4">ภาพรวมเดือน{monthName}</h3>
          <p className="text-xl text-gray-500 leading-relaxed max-w-2xl">
            ในเดือน{monthName} นี้ คุณมีวันที่ <span className="font-bold text-[#ffcc80]">มีความสุขมากที่สุด</span> ทั้งหมด {stats.counts[MoodType.VERY_HAPPY]} วัน
            {dominantMood && (
              <span> และส่วนใหญ่คุณมักจะรู้สึก <strong>{dominantMood.label}</strong> {dominantMood.id === MoodType.VERY_HAPPY ? 'ช่างเป็นเดือนที่วิเศษจริงๆ!' : 'เราเป็นกำลังใจให้คุณนะ'}</span>
            )}
          </p>
        </div>

        <div className="space-y-6">
          {Object.values(MOOD_CONFIGS).map((mood) => {
            const count = stats.counts[mood.id];
            const percentage = (count / stats.totalRecorded) * 100;

            return (
              <div key={mood.id} className="w-full group">
                <div className="flex justify-between items-center mb-2 text-sm font-bold">
                  <span className="flex items-center gap-2 text-gray-600">
                     <span className="text-lg">{mood.emoji}</span> {mood.label}
                  </span>
                  <span className="text-gray-400">{count} วัน</span>
                </div>
                <div className="w-full h-4 bg-gray-50 rounded-full overflow-hidden shadow-inner border border-gray-100/50">
                  <div 
                    className="h-full rounded-full transition-all duration-1000 ease-out shadow-sm"
                    style={{ 
                      width: `${percentage}%`, 
                      backgroundColor: mood.color,
                    }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="bg-white p-12 rounded-[3.5rem] shadow-sm border border-white animate-in fade-in slide-in-from-bottom-6 duration-700">
        <div className="mb-8">
          <h3 className="text-2xl font-bold text-[#5d4037] mb-2 flex items-center gap-3">
             <span className="text-3xl">📊</span> วิเคราะห์รูปแบบความรู้สึก
          </h3>
          <p className="text-gray-400 italic">เราพบความสม่ำเสมอของอารมณ์ในสัปดาห์นี้ของคุณ...</p>
        </div>

        {stats.mostStressedDayIdx !== -1 ? (
          <div className="space-y-8">
            <div className="bg-[#fcfaf5] p-8 rounded-[2rem] border-l-8 border-[#ce93d8]">
              <p className="text-xl text-gray-600 leading-relaxed">
                ดูเหมือนว่า <span className="text-[#ce93d8] font-bold text-2xl underline">{dayNames[stats.mostStressedDayIdx]}</span> จะเป็นวันที่คุณ <span className="font-bold">เครียดหรือรู้สึกแย่บ่อยที่สุด</span> ในเดือนนี้
              </p>
              <p className="text-sm text-gray-400 mt-4 italic">
                ลองสังเกตดูนะว่าวันนั้นมีกิจกรรมหรือตารางงานอะไรที่ทำให้คุณรู้สึกแบบนั้นหรือเปล่า? การรู้ล่วงหน้าจะช่วยให้คุณเตรียมใจรับมือได้ดีขึ้นนะ
              </p>
            </div>

            <div className="grid grid-cols-7 gap-2 h-40 items-end px-4 border-b border-gray-100">
              {dayNames.map((name, i) => {
                const stressCount = stats.dayOfWeekStressCounts[i];
                const totalOnDay = stats.dayOfWeekTotalCounts[i];
                const height = totalOnDay > 0 ? (stressCount / stats.totalRecorded) * 300 + 10 : 10;
                const isMax = i === stats.mostStressedDayIdx;
                
                return (
                  <div key={i} className="flex flex-col items-center group relative">
                    <div className="absolute -top-10 opacity-0 group-hover:opacity-100 transition-opacity bg-gray-800 text-white text-[10px] py-1 px-2 rounded-md whitespace-nowrap z-20">
                      เครียด {stressCount} วัน
                    </div>
                    <div 
                      className={`w-full rounded-t-xl transition-all duration-700 ${isMax ? 'bg-[#ce93d8] shadow-lg' : 'bg-gray-100 group-hover:bg-gray-200'}`}
                      style={{ height: `${height}%`, minHeight: '12px' }}
                    />
                    <span className={`text-[10px] mt-2 font-bold ${isMax ? 'text-[#ce93d8]' : 'text-gray-300'}`}>
                      {name.replace('วัน', '')}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        ) : (
          <p className="text-center text-gray-300 italic py-10">กำลังรวบรวมข้อมูลเพื่อวิเคราะห์รูปแบบให้คุณนะ...</p>
        )}
      </div>
    </div>
  );
};

export default MonthlyStats;
