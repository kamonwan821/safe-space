
import React, { useState, useEffect } from 'react';
import { PrideEntry } from '../types';

const PrideGarden: React.FC = () => {
  const [entries, setEntries] = useState<PrideEntry[]>([]);
  const [newPride, setNewPride] = useState('');
  const [isGrowing, setIsGrowing] = useState(false);
  const [gardenPoints, setGardenPoints] = useState(0);

  useEffect(() => {
    const stored = localStorage.getItem('safe_space_pride');
    if (stored) setEntries(JSON.parse(stored));
    
    const points = parseInt(localStorage.getItem('garden_growth_points') || '0');
    setGardenPoints(points);
  }, []);

  const addPride = () => {
    if (!newPride.trim()) return;
    const entry: PrideEntry = {
      id: Date.now().toString(),
      text: newPride,
      date: new Date().toISOString()
    };
    const updated = [entry, ...entries];
    setEntries(updated);
    localStorage.setItem('safe_space_pride', JSON.stringify(updated));
    
    // Add point for pride entry
    const newPoints = gardenPoints + 1;
    setGardenPoints(newPoints);
    localStorage.setItem('garden_growth_points', newPoints.toString());
    
    setNewPride('');
    setIsGrowing(true);
    setTimeout(() => setIsGrowing(false), 1500);
  };

  const getTreeEmoji = () => {
    const totalActions = gardenPoints + entries.length;
    if (totalActions === 0) return '🌱';
    if (totalActions <= 5) return '🌱';
    if (totalActions <= 15) return '🌿';
    if (totalActions <= 30) return '🌲';
    if (totalActions <= 50) return '🌳';
    return '🌸';
  };

  const getGrowthStatus = () => {
    const totalActions = gardenPoints + entries.length;
    if (totalActions === 0) return 'รอการเริ่มต้นของคุณอยู่ตรงนี้...';
    if (totalActions <= 5) return 'ความภูมิใจเล็กๆ กำลังเริ่มผลิใบแล้วนะ';
    if (totalActions <= 15) return 'ดูสิ... ความพยายามของเธอกำลังเติบโตขึ้นเรื่อยๆ';
    if (totalActions <= 30) return 'ต้นไม้แห่งใจเริ่มแข็งแรงขึ้นมากแล้ว เก่งที่สุดเลย';
    if (totalActions <= 50) return 'ความพยายามผลิบานเป็นร่มเงาที่แสนดีแล้วนะ';
    return 'สวนของคุณงดงามและผลิบานที่สุด ขอบคุณที่ตั้งใจมาถึงตรงนี้';
  };

  return (
    <div className="flex flex-col gap-10 animate-in fade-in duration-700">
      <div className="flex flex-col items-center justify-center py-16 bg-gradient-to-b from-[#e8f5e9]/50 to-white rounded-[4rem] border border-[#e8f5e9] relative overflow-hidden">
        <div className={`transition-all duration-700 transform text-[120px] leading-none select-none ${isGrowing ? 'scale-125 rotate-12' : 'scale-100'}`}>
          {getTreeEmoji()}
        </div>
        <div className="text-center px-6 mt-8">
          <h3 className="text-3xl font-bold text-[#2e7d32] mb-2">สวนแห่งความภูมิใจ</h3>
          <p className="text-gray-500 italic text-xl">{getGrowthStatus()}</p>
          <p className="text-gray-300 text-sm mt-4">กลับมาเมื่อไหร่... ต้นไม้ของคุณก็ยังรอคุณอยู่เสมอที่นี่นะ ไม่ต้องรีบหรอก</p>
        </div>
        
        {/* Decorative clouds */}
        <div className="absolute top-10 left-10 text-gray-200 opacity-40">
           <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M17.5 19c2.5 0 4.5-2 4.5-4.5 0-2.4-1.9-4.3-4.3-4.5-.4-2.5-2.6-4-5-4-1.9 0-3.6 1-4.4 2.5C6.3 8.3 4 10.3 4 13c0 3.3 2.7 6 6 6h7.5z" /></svg>
        </div>
        <div className="absolute top-20 right-20 text-gray-200 opacity-40">
           <svg width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M17.5 19c2.5 0 4.5-2 4.5-4.5 0-2.4-1.9-4.3-4.3-4.5-.4-2.5-2.6-4-5-4-1.9 0-3.6 1-4.4 2.5C6.3 8.3 4 10.3 4 13c0 3.3 2.7 6 6 6h7.5z" /></svg>
        </div>
      </div>

      <div className="max-w-2xl mx-auto w-full space-y-6">
        <div className="relative group">
          <input 
            type="text"
            value={newPride}
            onChange={(e) => setNewPride(e.target.value)}
            placeholder="วันนี้คุณภูมิใจเรื่องอะไรในตัวเองบ้าง?"
            className="w-full px-8 py-5 rounded-[2.5rem] bg-white shadow-lg border-2 border-transparent focus:border-[#4caf50] outline-none text-xl transition-all"
            onKeyPress={(e) => e.key === 'Enter' && addPride()}
          />
          <button 
            onClick={addPride}
            disabled={!newPride.trim()}
            className="absolute right-3 top-3 bottom-3 px-8 rounded-full bg-[#4caf50] text-white font-bold hover:bg-[#388e3c] transition-colors disabled:opacity-30"
          >
            ฝากความภูมิใจไว้ตรงนี้นะ
          </button>
        </div>

        <div className="space-y-4 max-h-[400px] overflow-y-auto pr-4 custom-scrollbar">
          {entries.map((entry) => (
            <div key={entry.id} className="bg-white p-6 rounded-[2rem] border border-gray-100 shadow-sm flex items-start gap-4 animate-in slide-in-from-left-4 duration-500">
              <span className="text-2xl mt-1 select-none">🌱</span>
              <div>
                <p className="text-lg text-gray-700 font-medium leading-relaxed">{entry.text}</p>
                <p className="text-xs text-gray-300 mt-2 font-bold uppercase tracking-wider">
                  {new Date(entry.date).toLocaleDateString('th-TH', { day: 'numeric', month: 'short', year: '2-digit' })}
                </p>
              </div>
            </div>
          ))}
          {entries.length === 0 && (
            <div className="text-center py-10 text-gray-300 italic">
              เริ่มเขียนเรื่องที่น่าภูมิใจ เพื่อให้สวนแห่งนี้เติบโตไปพร้อมกับคุณนะ
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PrideGarden;
