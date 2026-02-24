
import React, { useState } from 'react';
import { SparkleIcon, HandshakeIcon } from './Icons';

interface Scenario {
  id: string;
  title: string;
  description: string;
  choices: {
    text: string;
    feedback: string;
    isHealthy: boolean;
  }[];
}

const SCENARIOS: Scenario[] = [
  {
    id: 'work_stress',
    title: 'เมื่อโดนดุจากงาน',
    description: 'หัวหน้าทักท้วงงานต่อหน้าคนอื่น และคุณรู้สึกเสียหน้าและเครียดมาก...',
    choices: [
      {
        text: 'ขอตัวไปล้างหน้า สูดลมหายใจลึกๆ 5 ครั้ง',
        feedback: 'เก่งมาก! การดึงตัวเองออกจากสถานการณ์ที่ตึงเครียดชั่วคราวจะช่วยลดระดับฮอร์โมนความเครียด และป้องกันการตอบโต้ด้วยอารมณ์ได้ดีที่สุด',
        isHealthy: true
      },
      {
        text: 'นั่งเงียบๆ แล้วกดดันตัวเองว่าไม่เก่งเลย',
        feedback: 'เข้าใจนะว่ามันเจ็บปวด แต่การตำหนิตัวเองซ้ำๆ จะทำให้ใจเหนื่อยล้าเกินความจำเป็น ลองอนุญาตให้ตัวเองทำพลาดได้บ้าง เพราะนั่นคือส่วนหนึ่งของการเติบโตนะ',
        isHealthy: false
      }
    ]
  },
  {
    id: 'fight_partner',
    title: 'ทะเลาะกับคนรัก',
    description: 'บทสนทนาเริ่มรุนแรง และคุณเริ่มคุมอารมณ์ไม่อยู่...',
    choices: [
      {
        text: 'บอกอีกฝ่ายว่า "เราขอพักสัก 15 นาทีให้ใจเย็นลงก่อนแล้วค่อยคุยกันใหม่นะ"',
        feedback: 'ยอดเยี่ยม! นี่คือการทำ Time-out อย่างสันติ การหยุดก่อนที่อารมณ์จะระเบิดช่วยรักษาความสัมพันธ์และป้องกันคำพูดที่จะมาเสียใจภายหลังได้',
        isHealthy: true
      },
      {
        text: 'พยายามเถียงกลับให้ชนะเพื่อให้เขารู้ว่าเราถูก',
        feedback: 'การเอาชนะด้วยอารมณ์มักทิ้งรอยแผลไว้ในใจเสมอ ในความสัมพันธ์ "ความเข้าใจ" สำคัญกว่า "ชัยชนะ" ลองถอยออกมาตั้งหลักก่อนจะดีกว่านะ',
        isHealthy: false
      }
    ]
  },
  {
    id: 'loneliness',
    title: 'คืนวันเสาร์ที่เงียบเหงา',
    description: 'เพื่อนทุกคนดูเหมือนจะมีปาร์ตี้หรือไปเที่ยวกันหมด ยกเว้นคุณที่นั่งอยู่บ้านคนเดียว...',
    choices: [
      {
        text: 'เปิดเพลงที่ชอบ ทำอาหารอร่อยๆ หรืออ่านหนังสือที่ค้างไว้',
        feedback: 'ดีจัง! การเปลี่ยน "ความเหงา" ให้เป็น "ความสันโดษที่รื่นรมย์" คือทักษะที่ยอดเยี่ยม คุณกำลังเรียนรู้ที่จะมีความสุขได้ด้วยตัวเอง',
        isHealthy: true
      },
      {
        text: 'ไถโซเชียลดูสตอรี่เพื่อนๆ แล้วเปรียบเทียบกับชีวิตตัวเอง',
        feedback: 'โซเชียลมีเดียมักแสดงแค่ "ไฮไลท์" ของชีวิตคนอื่น การเปรียบเทียบในวันที่เราอ่อนแอจะยิ่งทำให้ใจดิ่งลง ลองวางมือถือแล้วทำอะไรเพื่อตัวเองดูนะ',
        isHealthy: false
      }
    ]
  },
  {
    id: 'failure',
    title: 'ทำพลาดเป้าหมายสำคัญ',
    description: 'คุณตั้งใจกับโปรเจกต์นี้มาก แต่ผลลัพธ์กลับล้มเหลวไม่เป็นท่า...',
    choices: [
      {
        text: 'เขียนวิเคราะห์สิ่งที่เกิดขึ้น และวางแผนแก้ไขในก้าวต่อไป',
        feedback: 'สุดยอด! การมองความล้มเหลวเป็น "บทเรียน" (Feedback) ไม่ใช่ "จุดจบ" คือนิสัยของผู้ที่จะประสบความสำเร็จในระยะยาว',
        isHealthy: true
      },
      {
        text: 'เก็บตัวเงียบ ไม่คุยกับใคร และคิดว่าเราคงทำอะไรไม่สำเร็จสักอย่าง',
        feedback: 'ความผิดพลาดครั้งเดียวไม่ได้นิยามตัวตนทั้งหมดของคุณนะ อย่าปล่อยให้ความล้มเหลวชั่วคราวมาบดบังศักยภาพที่เหลืออยู่ของคุณเลย',
        isHealthy: false
      }
    ]
  },
  {
    id: 'social_anxiety',
    title: 'ความประหม่าในที่ประชุม',
    description: 'คุณต้องนำเสนองาน และเริ่มรู้สึกใจสั่น มือเย็น กลัวคนอื่นจะตัดสินคุณ...',
    choices: [
      {
        text: 'บอกตัวเองว่า "เป็นเรื่องปกติที่จะตื่นเต้น" แล้วโฟกัสที่การส่งต่อข้อมูล',
        feedback: 'ดีมาก! การยอมรับความรู้สึก (Acceptance) จะช่วยลดความกดดันได้ดีกว่าการพยายามบังคับไม่ให้ตื่นเต้น โฟกัสที่ "ผู้ฟัง" ไม่ใช่ "ตัวเอง" นะ',
        isHealthy: true
      },
      {
        text: 'พยายามพูดให้เร็วที่สุดเพื่อให้จบไวๆ จะได้กลับไปนั่งที่',
        feedback: 'การรีบเร่งจะยิ่งทำให้ลมหายใจสั้นลงและตื่นเต้นกว่าเดิม ลองสูดลมหายใจยาวๆ แล้วค่อยๆ พูดทีละประโยค ทุกคนพร้อมจะฟังคุณนะ',
        isHealthy: false
      }
    ]
  }
];

const InteractiveCoping: React.FC = () => {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedChoice, setSelectedChoice] = useState<number | null>(null);
  const [reflection, setReflection] = useState('');
  const [showReflectionInput, setShowReflectionInput] = useState(false);

  const scenario = SCENARIOS[currentIdx];

  const handleNext = () => {
    setSelectedChoice(null);
    setReflection('');
    setShowReflectionInput(false);
    setCurrentIdx((currentIdx + 1) % SCENARIOS.length);
  };

  const submitReflection = () => {
    handleNext();
  };

  return (
    <div className="flex flex-col gap-8 animate-in fade-in duration-500">
      <div className="bg-[#fcfaf5] p-8 md:p-12 rounded-[4rem] border-2 border-dashed border-[#c8e6c9] min-h-[500px] flex flex-col justify-center text-center">
        {!selectedChoice && selectedChoice !== 0 ? (
          <>
            <div className="mb-8">
              <span className="inline-block px-4 py-1 bg-[#e8f5e9] text-[#4caf50] rounded-full text-sm font-bold mb-4">
                สถานการณ์ที่ {currentIdx + 1} / {SCENARIOS.length}
              </span>
              <h3 className="text-3xl md:text-4xl font-bold text-[#5d4037] mb-6">{scenario.title}</h3>
              <p className="text-xl md:text-2xl text-gray-500 leading-relaxed italic">"{scenario.description}"</p>
            </div>
            <div className="flex flex-col gap-5 max-w-xl mx-auto w-full">
              {scenario.choices.map((choice, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedChoice(idx)}
                  className="px-8 py-5 rounded-[2rem] bg-white border border-gray-100 hover:border-[#4caf50] hover:bg-[#e8f5e9] text-gray-700 text-lg font-medium transition-all shadow-sm hover:shadow-md active:scale-[0.98]"
                >
                  {choice.text}
                </button>
              ))}
            </div>
          </>
        ) : !showReflectionInput ? (
          <div className="space-y-8 animate-in zoom-in duration-500 max-w-2xl mx-auto">
            <div className="flex justify-center mb-4">
               {scenario.choices[selectedChoice].isHealthy ? <SparkleIcon size={80} className="text-[#4caf50]" /> : <HandshakeIcon size={80} className="text-blue-300" />}
            </div>
            <p className="text-3xl text-[#5d4037] font-bold">
              {scenario.choices[selectedChoice].isHealthy ? 'ทางเลือกที่ดีต่อใจ' : 'โอ๋ๆ ไม่เป็นไรนะ...'}
            </p>
            <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-gray-50">
               <p className="text-xl text-gray-600 leading-relaxed italic">
                {scenario.choices[selectedChoice].feedback}
              </p>
            </div>
            <button
              onClick={() => setShowReflectionInput(true)}
              className="px-12 py-4 rounded-full bg-[#4caf50] text-white font-bold text-lg shadow-lg hover:bg-[#388e3c] transition-all"
            >
              ขอเวลาคุยกับตัวเองสักครู่
            </button>
          </div>
        ) : (
          <div className="space-y-8 animate-in slide-in-from-bottom-6 duration-500 max-w-2xl mx-auto w-full">
            <div className="text-5xl mb-4 flex justify-center">
               <svg width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="#4caf50" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 20h9" /><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" /></svg>
            </div>
            <h3 className="text-2xl font-bold text-[#5d4037]">หลังจากลองเลือกทางนี้... คุณรู้สึกอย่างไรบ้าง?</h3>
            <p className="text-gray-400 italic">การพิมพ์ออกมาช่วยให้ความคิดเป็นระเบียบและเบาลงนะ</p>
            <textarea
              value={reflection}
              onChange={(e) => setReflection(e.target.value)}
              placeholder="ความรู้สึกของฉันหลังจากเรียนรู้สถานการณ์นี้คือ..."
              className="w-full h-48 p-8 text-lg rounded-[2.5rem] bg-white border-none shadow-inner focus:ring-4 focus:ring-[#e8f5e9] resize-none outline-none transition-all placeholder-gray-300"
            />
            <div className="flex flex-col md:flex-row gap-4 justify-center">
              <button
                onClick={submitReflection}
                className="px-12 py-4 rounded-full bg-[#4caf50] text-white font-bold text-lg shadow-lg hover:scale-105 transition-all"
              >
                อืม...เข้าใจแล้ว
              </button>
              <button
                onClick={handleNext}
                className="px-10 py-4 rounded-full bg-white text-gray-400 font-bold border border-gray-100 hover:text-[#4caf50] transition-all"
              >
                ยังไม่อยากเล่าตอนนี้
              </button>
            </div>
          </div>
        )}
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 bg-white rounded-[2rem] border border-gray-50 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-[#e3f2fd] flex items-center justify-center text-[#2196f3]">
             <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96.44 2.5 2.5 0 0 1-2.54-2.44 2.5 2.5 0 0 1 0-5 2.5 2.5 0 0 1 2.54-2.44 2.5 2.5 0 0 1 2.46-2.56z" /><path d="M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96.44 2.5 2.5 0 0 0 2.54-2.44 2.5 2.5 0 0 0 0-5 2.5 2.5 0 0 0-2.54-2.44 2.5 2.5 0 0 0-2.46-2.56z" /></svg>
          </div>
          <p className="text-sm text-gray-500 font-bold">ฝึกการรู้เท่าทันอารมณ์</p>
        </div>
        <div className="p-6 bg-white rounded-[2rem] border border-gray-50 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-[#fce4ec] flex items-center justify-center text-[#e91e63]">
             <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.505 4.046 3 5.5L12 21l7-7z" /></svg>
          </div>
          <p className="text-sm text-gray-500 font-bold">ใจดีกับตัวเองให้มากขึ้น</p>
        </div>
        <div className="p-6 bg-white rounded-[2rem] border border-gray-50 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-[#fff9c4] flex items-center justify-center text-[#fbc02d]">
             <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><path d="M8 12h8" /></svg>
          </div>
          <p className="text-sm text-gray-500 font-bold">หายใจเข้าลึก... หายใจออกยาว</p>
        </div>
      </div>
    </div>
  );
};

export default InteractiveCoping;
