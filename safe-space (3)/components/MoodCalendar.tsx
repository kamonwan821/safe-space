
import React, { useState } from 'react';
import { SavedMoods, MoodType, MOOD_CONFIGS } from '../types';
import { MoodIcon } from './Icons';

interface MoodCalendarProps {
  currentViewDate: Date;
  setCurrentViewDate: (date: Date) => void;
  savedMoods: SavedMoods;
  onUpdateMood: (dateKey: string, mood: MoodType) => void;
}

const MoodCalendar: React.FC<MoodCalendarProps> = ({ 
  currentViewDate, 
  setCurrentViewDate, 
  savedMoods, 
  onUpdateMood 
}) => {
  const [selectedDay, setSelectedDay] = useState<string | null>(null);

  const month = currentViewDate.getMonth();
  const year = currentViewDate.getFullYear();

  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDayOfMonth = new Date(year, month, 1).getDay();

  const monthName = currentViewDate.toLocaleString('th-TH', { month: 'long' });

  const handlePrevMonth = () => {
    setCurrentViewDate(new Date(year, month - 1, 1));
    setSelectedDay(null);
  };

  const handleNextMonth = () => {
    setCurrentViewDate(new Date(year, month + 1, 1));
    setSelectedDay(null);
  };

  const renderDays = () => {
    const days = [];
    // Padding สำหรับวันแรกของสัปดาห์
    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push(<div key={`pad-${i}`} className="aspect-square"></div>);
    }
    
    for (let d = 1; d <= daysInMonth; d++) {
      const dateKey = `${year}-${String(month + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
      const mood = savedMoods[dateKey];
      const isSelected = selectedDay === dateKey;

      days.push(
        <button
          key={dateKey}
          type="button"
          onClick={() => setSelectedDay(dateKey)}
          className={`aspect-square rounded-[1.5rem] flex flex-col items-center justify-center text-xl transition-all duration-300 relative group
            ${mood ? 'text-white shadow-md' : 'text-gray-400 bg-white/50 hover:bg-[#e8f5e9] hover:text-[#4caf50]'}
            ${isSelected ? 'ring-4 ring-[#4caf50] ring-offset-2 scale-110 z-10' : 'hover:scale-105'}
          `}
          style={{ backgroundColor: mood ? MOOD_CONFIGS[mood].color : '' }}
        >
          <span className={`font-bold ${mood ? 'text-white drop-shadow-sm' : isSelected ? 'text-[#4caf50]' : 'text-gray-400'}`}>{d}</span>
          {mood && (
             <div className="absolute -top-1 -right-1 bg-white/95 rounded-full w-8 h-8 flex items-center justify-center shadow-sm border border-white">
               <MoodIcon mood={mood} size={18} className="text-gray-600" />
             </div>
          )}
        </button>
      );
    }
    return days;
  };

  return (
    <div className="flex flex-col w-full relative">
      {/* ส่วนหัวของปฏิทิน */}
      <div className="flex items-center justify-between w-full mb-12">
        <button type="button" onClick={handlePrevMonth} className="p-4 bg-white/80 hover:bg-white rounded-full transition-all text-gray-300 hover:text-gray-600 shadow-sm border border-gray-100">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
          </svg>
        </button>
        <div className="text-center">
          <h3 className="text-5xl font-bold text-[#5d4037] mb-1">{monthName}</h3>
          <p className="text-gray-300 text-xl font-medium tracking-widest">พ.ศ. {year + 543}</p>
        </div>
        <button type="button" onClick={handleNextMonth} className="p-4 bg-white/80 hover:bg-white rounded-full transition-all text-gray-300 hover:text-gray-600 shadow-sm border border-gray-100">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
          </svg>
        </button>
      </div>

      {/* ชื่อวันในสัปดาห์ */}
      <div className="grid grid-cols-7 gap-4 md:gap-6 mb-6">
        {['อา', 'จ', 'อ', 'พ', 'พฤ', 'ศ', 'ส'].map((day, idx) => (
          <div key={idx} className={`text-center font-bold text-lg mb-2 ${idx === 0 ? 'text-red-400' : 'text-gray-300'}`}>
            {day}
          </div>
        ))}
      </div>

      {/* ตารางวันที่ */}
      <div className="grid grid-cols-7 gap-4 md:gap-6 mb-8">
        {renderDays()}
      </div>

      {/* Pop-up Palette เลือกอารมณ์ */}
      {selectedDay && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 animate-in fade-in duration-300">
          <div className="absolute inset-0 bg-black/10 backdrop-blur-sm" onClick={() => setSelectedDay(null)}></div>
          <div className="bg-white p-10 md:p-14 rounded-[4rem] border-2 border-[#e8f5e9] shadow-2xl relative max-w-4xl w-full animate-in zoom-in slide-in-from-bottom-8 duration-500">
            <button 
              type="button"
              onClick={() => setSelectedDay(null)}
              className="absolute top-8 right-10 text-gray-300 hover:text-red-400 transition-all flex items-center gap-2 group"
            >
              <span className="text-sm font-bold opacity-0 group-hover:opacity-100 transition-opacity">ปิดหน้านี้นะ</span>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            
            <div className="text-center mb-12">
              <h4 className="text-4xl font-bold text-[#5d4037] mb-3">
                วันที่ {new Date(selectedDay).getDate()} {monthName}
              </h4>
              <p className="text-gray-400 text-2xl italic font-light">วันนี้หัวใจของคุณเป็นสีอะไรดี?</p>
            </div>
            
            <div className="flex flex-wrap justify-center gap-6 md:gap-10 w-full">
              {(Object.values(MOOD_CONFIGS)).map((mood) => {
                const isActive = savedMoods[selectedDay] === mood.id;
                return (
                  <button
                    key={mood.id}
                    type="button"
                    onClick={() => {
                      onUpdateMood(selectedDay, mood.id);
                      setSelectedDay(null);
                    }}
                    className={`group flex flex-col items-center gap-4 transition-all hover:scale-110 active:scale-95 p-6 rounded-[3rem]
                      ${isActive ? 'bg-gray-50 ring-2 ring-gray-100 shadow-inner' : 'hover:bg-gray-50/50'}
                    `}
                  >
                    <div 
                      className={`w-28 h-28 md:w-32 md:h-32 rounded-full shadow-lg border-[10px] border-white flex items-center justify-center transition-transform group-hover:rotate-12
                        ${isActive ? 'ring-4 ring-offset-2 ring-gray-200' : ''}
                      `}
                      style={{ backgroundColor: mood.color }}
                    >
                      <MoodIcon mood={mood.id} size={56} className="text-white drop-shadow-md" />
                    </div>
                    <div className="text-center">
                      <span className={`text-lg font-bold block ${isActive ? 'text-[#4caf50]' : 'text-gray-400'}`}>
                        {mood.label}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>

            <div className="mt-12 text-center text-gray-300 text-lg italic">
              "ไม่ว่าวันนี้จะเป็นสีอะไร... คุณทำดีที่สุดแล้วนะ"
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MoodCalendar;
