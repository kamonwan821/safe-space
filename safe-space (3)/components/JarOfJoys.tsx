
import React, { useState, useEffect } from 'react';
import { JoyMemory } from '../types';
import { JarIcon, SparkleIcon } from './Icons';

const JarOfJoys: React.FC = () => {
  const [joys, setJoys] = useState<JoyMemory[]>([]);
  const [newJoy, setNewJoy] = useState('');
  const [showSavedAnimation, setShowSavedAnimation] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem('safe_space_joys');
    if (stored) setJoys(JSON.parse(stored));
  }, []);

  const saveJoy = () => {
    if (!newJoy.trim()) return;
    const memory: JoyMemory = {
      id: Date.now().toString(),
      text: newJoy,
      date: new Date().toISOString()
    };
    const updated = [...joys, memory];
    setJoys(updated);
    localStorage.setItem('safe_space_joys', JSON.stringify(updated));
    setNewJoy('');
    setShowSavedAnimation(true);
    setTimeout(() => setShowSavedAnimation(false), 2000);
  };

  return (
    <div className="flex flex-col gap-6 animate-in fade-in duration-500">
      <div className="bg-[#e3f2fd]/30 p-8 rounded-[3rem] border border-[#e3f2fd] text-center relative overflow-hidden">
        {showSavedAnimation && (
          <div className="absolute inset-0 bg-[#e3f2fd] flex items-center justify-center animate-out fade-out fill-mode-forwards duration-1000 z-10">
            <SparkleIcon size={60} className="text-yellow-400 animate-bounce" />
          </div>
        )}
        <JarIcon size={80} className="mx-auto text-[#5c6bc0] mb-4" />
        <h3 className="text-2xl font-bold text-[#5c6bc0] mb-2">โหลแก้วแห่งความสุข</h3>
        <p className="text-gray-500 italic mb-6">เรื่องเล็กๆ ที่ทำให้ยิ้มได้... เก็บมันไว้ที่นี่นะ</p>
        
        <div className="relative">
          <input 
            type="text"
            value={newJoy}
            onChange={(e) => setNewJoy(e.target.value)}
            placeholder="วันนี้เจอเรื่องดีๆ อะไรบ้าง?"
            className="w-full px-8 py-4 rounded-full bg-white shadow-inner border-none focus:ring-4 focus:ring-[#e3f2fd] outline-none"
            onKeyPress={(e) => e.key === 'Enter' && saveJoy()}
          />
          <button 
            onClick={saveJoy}
            className="absolute right-2 top-2 bottom-2 px-6 rounded-full bg-[#5c6bc0] text-white font-bold text-sm hover:scale-105 active:scale-95 transition-all"
          >
            ฝากความสุขไว้ในโหลนะ
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="p-6 bg-white rounded-[2rem] border border-gray-100 flex items-center gap-4">
          <SparkleIcon size={40} className="text-blue-200" />
          <div>
            <p className="font-bold text-gray-400">สะสมแล้ว</p>
            <p className="text-2xl font-bold text-[#5c6bc0]">{joys.length} ความทรงจำ</p>
          </div>
        </div>
        <div className="p-6 bg-white rounded-[2rem] border border-gray-100 flex items-center gap-4">
          <JarIcon size={40} className="text-yellow-200" />
          <div>
            <p className="font-bold text-gray-400">พลังบวก</p>
            <p className="text-xl font-bold text-[#5c6bc0]">พร้อมดูแลคุณเสมอ</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JarOfJoys;
