
import React, { useState, useRef, useEffect } from 'react';
import { MicIcon, SparkleIcon } from './Icons';

const VoiceMemoView: React.FC = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  const [timer, setTimer] = useState(0);
  const timerRef = useRef<number | null>(null);

  const startRecording = () => {
    setIsRecording(true);
    setIsFinished(false);
    setTimer(0);
    timerRef.current = window.setInterval(() => {
      setTimer(prev => {
        if (prev >= 60) {
          stopRecording();
          return 60;
        }
        return prev + 1;
      });
    }, 1000);
  };

  const stopRecording = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    setIsRecording(false);
    setIsFinished(true);
  };

  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="flex flex-col items-center justify-center flex-grow space-y-12 animate-in fade-in duration-700">
      {!isFinished ? (
        <div className="flex flex-col items-center space-y-10">
          <p className="text-2xl text-slate-500 italic max-w-xl text-center leading-relaxed">
            "พื้นที่นี้คือหลุมดำแห่งความลับ... พูดออกมาให้หมดนะ พอพูดจบ ทุกอย่างจะสลายไปเอง"
          </p>
          
          <div className="relative">
            {isRecording && (
              <div className="absolute inset-0 rounded-full bg-blue-100 animate-ping opacity-25"></div>
            )}
            <button
              onMouseDown={startRecording}
              onMouseUp={stopRecording}
              onTouchStart={startRecording}
              onTouchEnd={stopRecording}
              className={`w-32 h-32 rounded-full flex items-center justify-center transition-all duration-300 shadow-2xl relative z-10
                ${isRecording ? 'bg-red-500 scale-110 text-white' : 'bg-blue-500 text-white hover:bg-blue-600'}`}
            >
              <MicIcon size={48} />
            </button>
          </div>

          <div className="text-center">
            <p className={`text-3xl font-bold mb-2 ${isRecording ? 'text-red-500' : 'text-slate-300'}`}>
              {formatTime(timer)} / 1:00
            </p>
            <p className="text-slate-400">
              {isRecording ? 'กำลังรับฟังอย่างตั้งใจ...' : 'กดค้างไว้เพื่อเริ่มระบายความในใจนะ'}
            </p>
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center text-center space-y-10 animate-in zoom-in duration-700">
          <div className="w-24 h-24 rounded-full bg-green-50 flex items-center justify-center text-green-500">
             <SparkleIcon size={48} />
          </div>
          <div className="space-y-6">
            <h3 className="text-4xl font-bold text-slate-700">ส่งความในใจไปเรียบร้อยแล้วนะ...</h3>
            <p className="text-xl text-slate-400 italic leading-relaxed">
              "เรารับฟังและเก็บความลับนี้ไว้ให้คุณแล้วนะ... สบายใจขึ้นไหม?<br/>
              ตอนนี้ไปหาอะไรอร่อยๆ ทาน หรือดื่มน้ำเย็นๆ สักแก้วนะ คุณคนเก่ง"
            </p>
          </div>
          <button
            onClick={() => setIsFinished(false)}
            className="px-12 py-4 rounded-full bg-blue-50 text-blue-500 font-bold text-xl hover:bg-blue-100 transition-all border border-blue-100"
          >
            ระบายเพิ่มอีกหน่อยไหม?
          </button>
        </div>
      )}
      <p className="text-slate-300 text-sm max-w-md text-center italic">
        *เพื่อความเป็นส่วนตัว เราจะไม่บันทึกไฟล์เสียงของคุณไว้ในระบบ ทุกอย่างจะหายไปทันทีที่คุณพูดจบ
      </p>
    </div>
  );
};

export default VoiceMemoView;
