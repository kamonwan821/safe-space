App.tsx
          <button onClick={() => setView('jar')} className="bg-white rounded-[4rem] p-12 shadow-sm border border-white hover:shadow-2xl hover:-translate-y-2 transition-all group flex flex-col items-center text-center">
            <JarIcon size={80} className="mb-6 text-[#8d6e63]" />
            <h2 className="text-3xl font-bold text-[#5d4037] mb-2">โหลความสุข</h2>
            <p className="text-gray-400 italic">เก็บเกี่ยวรอยยิ้มเล็กๆ ไว้เป็นพลังในวันหน้า</p>
          </button>
        </div>

        <GlobalHotline />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#fcfaf5] py-12 px-6 md:px-12 flex flex-col items-center animate-in fade-in slide-in-from-bottom-4 duration-700 relative pb-64">
      <QuickEscape onEscape={handleQuickEscape} />
      {/* Header ส่วนย่อย - ปรับให้ Back อยู่ซ้าย Logo อยู่ขวา และมี Margin Top เลี่ยงปุ่ม Quick Escape */}
      <div className="w-full max-w-6xl flex items-center justify-between mb-12 mt-16 md:mt-10">
        <button onClick={() => setView('menu')} className="flex items-center gap-3 px-6 py-3 rounded-full bg-white text-gray-400 hover:text-[#4caf50] border border-gray-100 font-bold text-lg transition-all shadow-sm">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" /></svg>
          กลับหน้าหลัก
        </button>
        <span className="text-[#4caf50] font-bold text-3xl md:text-4xl tracking-tighter opacity-80 pr-12 md:pr-0">Safe Space</span>
      </div>

      <main className="w-full max-w-6xl pb-10">
        {view === 'vent' && <div className="bg-white p-12 md:p-20 rounded-[5rem] shadow-sm border border-white min-h-[700px] flex flex-col"><div className="flex items-center gap-6 mb-16"><SparkleIcon size={50} className="text-yellow-400" /><h2 className="text-4xl font-bold text-[#5d4037]">พื้นที่ระบายความอัดอั้น</h2></div><VentingBox /></div>}
        {view === 'crisis' && <div className="bg-white p-12 md:p-20 rounded-[5rem] shadow-sm border-red-50 border-2 min-h-[700px] flex flex-col items-center justify-center text-center space-y-12 animate-in zoom-in duration-500"><div className="w-32 h-32 rounded-full bg-red-50 flex items-center justify-center text-red-500 mb-4"><HeartBrokenIcon size={64} /></div><h2 className="text-5xl font-bold text-slate-700 leading-tight">เรารับรู้ว่าวันนี้ใจคุณหนักหนาเหลือเกิน...</h2><p className="text-2xl text-slate-500 max-w-2xl leading-relaxed italic">"ไม่เป็นไรนะ... ที่จะรู้สึกไม่ไหว ลองโทรหา 1323 หรือแวะระบายตรงนี้ดูได้นะ เราอยากเป็นพื้นที่ปลอดภัยให้คุณจริงๆ"</p><button onClick={() => setView('vent')} className="px-16 py-5 rounded-full bg-red-400 text-white font-bold text-2xl shadow-xl hover:bg-red-500 transition-all">อยากระบายออกมาเดี๋ยวนี้</button></div>}
        {view === 'sleep' && <div className="bg-white p-12 md:p-20 rounded-[5rem] shadow-sm border border-blue-50 border-2 min-h-[700px] flex flex-col"><div className="flex items-center gap-6 mb-16"><MoonIcon size={50} className="text-blue-400" /><h2 className="text-4xl font-bold text-[#5d4037]">นอนไม่หลับ/ฟุ้งซ่าน</h2></div><div className="flex-grow flex flex-col items-center justify-center text-center space-y-10"><p className="text-2xl text-slate-400 italic">"สูดลมหายใจเข้าลึกๆ... และค่อยๆ ปล่อยออกมานะ"</p><div className="w-64 h-64 rounded-full border-8 border-blue-50 flex items-center justify-center animate-pulse"><div className="w-48 h-48 rounded-full bg-blue-100/50 flex items-center justify-center text-blue-400 text-xl font-bold">หายใจเข้า - ออก</div></div><p className="text-slate-400">ลองฟังเสียงฝน หรือหลับตาลงนึกถึงทุ่งหญ้ากว้างๆ นะ...</p></div></div>}
        {view === 'calendar' && <div className="space-y-12"><div className="bg-white p-12 md:p-20 rounded-[5rem] shadow-sm border border-white"><div className="flex items-center gap-6 mb-16"><CalendarIcon size={50} className="text-blue-400" /><h2 className="text-4xl font-bold text-[#5d4037]">ปฏิทินของหัวใจ</h2></div><MoodCalendar currentViewDate={currentViewDate} setCurrentViewDate={setCurrentViewDate} savedMoods={savedMoods} onUpdateMood={handleUpdateMood} /></div><MonthlyStats viewDate={currentViewDate} savedMoods={savedMoods} /></div>}
        {view === 'mentorship' && <div className="bg-white p-12 md:p-20 rounded-[5rem] shadow-sm border border-white min-h-[700px] flex flex-col"><div className="flex items-center gap-6 mb-16"><LightbulbIcon size={50} className="text-orange-400" /><h2 className="text-4xl font-bold text-[#5d4037]">เพื่อนคู่คิด (Mentorship)</h2></div><MentorshipView /></div>}
        {view === 'reflection' && <div className="bg-white p-12 md:p-20 rounded-[5rem] shadow-sm border border-purple-50 border-2 min-h-[700px] flex flex-col"><div className="flex items-center gap-6 mb-16"><QuestionIcon size={50} className="text-purple-400" /><h2 className="text-4xl font-bold text-[#5d4037]">พื้นที่สำรวจการตัดสินใจ</h2></div><DecisionReflection /></div>}
        {view === 'future_letter' && <div className="bg-white p-12 md:p-20 rounded-[5rem] shadow-sm border border-white min-h-[700px] flex flex-col"><div className="flex items-center gap-6 mb-16"><LetterIcon size={50} className="text-purple-400" /><h2 className="text-4xl font-bold text-[#5d4037]">จดหมายถึงตัวฉันในวันพรุ่งนี้</h2></div><FutureLetterView /></div>}
        {view === 'jar' && <div className="bg-white p-12 md:p-20 rounded-[5rem] shadow-sm border border-white min-h-[700px] flex flex-col"><div className="flex items-center gap-6 mb-16"><JarIcon size={50} className="text-[#8d6e63]" /><h2 className="text-4xl font-bold text-[#5d4037]">โหลแก้วแห่งความสุข</h2></div><JarOfJoys /></div>}
        {view === 'coping' && <div className="bg-white p-12 md:p-20 rounded-[5rem] shadow-sm border border-white min-h-[700px] flex flex-col"><div className="flex items-center gap-6 mb-16"><HandshakeIcon size={50} className="text-green-500" /><h2 className="text-4xl font-bold text-[#5d4037]">วิธีโอบกอดใจในวันแย่ๆ</h2></div><InteractiveCoping /></div>}
        {view === 'pride' && <div className="bg-white p-12 md:p-20 rounded-[5rem] shadow-sm border border-white min-h-[700px] flex flex-col"><div className="flex items-center gap-6 mb-16"><span className="text-5xl select-none">🌳</span><h2 className="text-4xl font-bold text-[#5d4037] ml-2">สวนแห่งความภูมิใจ</h2></div><PrideGarden /></div>}
      </main>
      <GlobalHotline />
    </div>
  );
};

export default App;
