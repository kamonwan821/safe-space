
import React, { useState } from 'react';
import { FutureLetter } from '../types';

const FutureLetterView: React.FC = () => {
  const [text, setText] = useState('');
  const [date, setDate] = useState('');
  const [isSaved, setIsSaved] = useState(false);

  const handleSave = () => {
    if (!text.trim() || !date) return;

    const newLetter: FutureLetter = {
      id: Date.now().toString(),
      text,
      releaseDate: date,
      createdAt: new Date().toISOString()
    };

    const existing = JSON.parse(localStorage.getItem('future_letters') || '[]');
    localStorage.setItem('future_letters', JSON.stringify([...existing, newLetter]));
    
    setIsSaved(true);
    setText('');
    setDate('');
    setTimeout(() => setIsSaved(false), 3000);
  };

  const minDate = new Date();
  minDate.setDate(minDate.getDate() + 1);
  const minDateStr = minDate.toISOString().split('T')[0];

  return (
    <div className="flex flex-col gap-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {isSaved ? (
        <div className="text-center py-20 bg-[#e8f5e9]/30 rounded-[3rem] border border-[#e8f5e9]">
          <div className="text-6xl mb-6">✉️✨</div>
          <h3 className="text-2xl font-bold text-[#4caf50] mb-4">เก็บจดหมายเข้ากล่องความทรงจำแล้ว</h3>
          <p className="text-gray-500 italic">เราจะนำกลับมาให้คุณอ่านในวันที่คุณกำหนดนะ</p>
        </div>
      ) : (
        <>
          <div className="space-y-4">
            <label className="text-lg font-bold text-[#5d4037] block">เขียนถึงตัวเองในอนาคต...</label>
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="อยากบอกอะไรกับตัวเองในวันที่เติบโตขึ้นบ้างไหม?"
              className="w-full h-64 p-8 text-lg rounded-[2.5rem] bg-white border-none shadow-inner focus:ring-4 focus:ring-[#e3f2fd] resize-none outline-none transition-all placeholder-gray-300"
            />
          </div>

          <div className="flex flex-col md:flex-row items-center gap-6 bg-white p-6 rounded-[2rem] border border-gray-100">
            <div className="flex-grow space-y-2">
              <label className="text-sm font-bold text-gray-400 block px-2">วันที่ต้องการให้อ่าน</label>
              <input
                type="date"
                min={minDateStr}
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full px-6 py-3 rounded-full bg-[#fcfaf5] border-none focus:ring-2 focus:ring-[#4caf50] outline-none font-bold text-[#4caf50]"
              />
            </div>
            <button
              onClick={handleSave}
              disabled={!text.trim() || !date}
              className="w-full md:w-auto px-12 py-4 rounded-full bg-[#4caf50] text-white font-bold shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 transition-all disabled:opacity-30 disabled:hover:scale-100"
            >
              ฝากเรื่องราวไว้ให้ตัวเองในอนาคตนะ
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default FutureLetterView;
