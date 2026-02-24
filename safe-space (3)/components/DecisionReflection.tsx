
import React, { useState, useEffect } from 'react';
import { SparkleIcon } from './Icons';

const DecisionReflection: React.FC = () => {
  const [keepGoing, setKeepGoing] = useState('');
  const [stopHere, setStopHere] = useState('');
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    const savedData = localStorage.getItem('safe_space_reflection');
    if (savedData) {
      const { keepGoing: k, stopHere: s } = JSON.parse(savedData);
      setKeepGoing(k || '');
      setStopHere(s || '');
    }
  }, []);

  const handleSave = () => {
    localStorage.setItem('safe_space_reflection', JSON.stringify({ keepGoing, stopHere }));
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3000);
  };

  return (
    <div className="flex flex-col gap-10 animate-in fade-in duration-700">
      <div className="text-center space-y-4 mb-6">
        <p className="text-2xl text-slate-500 leading-relaxed italic max-w-3xl mx-auto">
          "การอยากเริ่มต้นใหม่ไม่ใช่เรื่องผิด... ลองถามใจตัวเองดูนะว่า ถ้าความกังวลหายไป คุณยังอยากจะไปทางนี้ต่อไหม?"
        </p>
        <p className="text-gray-400 text-sm">ลองพิมพ์สิ่งที่อยู่ในใจออกมาทีละฝั่งนะ เพื่อให้คุณมองเห็นความต้องการของตัวเองได้ชัดขึ้น</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        {/* ฝั่งอยากไปต่อ */}
        <div className="flex flex-col space-y-6 animate-in slide-in-from-left-6 duration-700">
          <div className="p-6 rounded-[2.5rem] bg-purple-50 border border-purple-100 text-center">
            <h3 className="text-2xl font-bold text-purple-600">เหตุผลที่อยากไปต่อ</h3>
          </div>
          <textarea
            value={keepGoing}
            onChange={(e) => setKeepGoing(e.target.value)}
            placeholder="มีอะไรที่ยังทำให้คุณอยากสู้ต่อไหม? หรือความฝันอะไรที่ยังรอคุณอยู่..."
            className="w-full h-64 p-8 text-lg rounded-[3rem] bg-white border-none shadow-inner focus:ring-8 focus:ring-purple-50 resize-none outline-none transition-all placeholder-gray-200 leading-relaxed italic"
          />
        </div>

        {/* ฝั่งอยากพอแค่นี้ */}
        <div className="flex flex-col space-y-6 animate-in slide-in-from-right-6 duration-700">
          <div className="p-6 rounded-[2.5rem] bg-red-50 border border-red-100 text-center">
            <h3 className="text-2xl font-bold text-red-600">เหตุผลที่อยากพอแค่นี้</h3>
          </div>
          <textarea
            value={stopHere}
            onChange={(e) => setStopHere(e.target.value)}
            placeholder="อะไรที่ทำให้คุณรู้สึกเหนื่อยล้า? หรือมีสิ่งไหนที่ควรค่าแก่การวางมือลงบ้าง..."
            className="w-full h-64 p-8 text-lg rounded-[3rem] bg-white border-none shadow-inner focus:ring-8 focus:ring-red-50 resize-none outline-none transition-all placeholder-gray-200 leading-relaxed italic"
          />
        </div>
      </div>

      <div className="flex flex-col items-center gap-6 mt-6">
        <button
          onClick={handleSave}
          className={`px-16 py-5 rounded-full bg-[#4caf50] text-white font-bold text-2xl shadow-xl hover:scale-105 active:scale-95 transition-all flex items-center gap-3 ${isSaved ? 'bg-blue-400' : ''}`}
        >
          {isSaved ? (
            <>
              <SparkleIcon size={24} />
              <span>บันทึกความรู้สึกไว้แล้วนะ</span>
            </>
          ) : (
            'บันทึกคำตอบของหัวใจ'
          )}
        </button>
        <p className="text-gray-300 italic text-center max-w-lg">
          "ไม่ว่าบทสรุปจะเป็นอย่างไร... เราเคารพการตัดสินใจของคุณนะ เพราะคุณคือคนที่รู้จักหัวใจตัวเองดีที่สุด"
        </p>
      </div>
    </div>
  );
};

export default DecisionReflection;
