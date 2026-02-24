
import React, { useState } from 'react';
import { LightbulbIcon, SparkleIcon } from './Icons';

interface Article {
  id: string;
  title: string;
  category: 'career' | 'study' | 'growth';
  summary: string;
  content: string;
  emoji: string;
}

const ARTICLES: Article[] = [
  {
    id: 'say_no',
    title: 'วิธีปฏิเสธงานยังไงไม่ให้รู้สึกผิด',
    category: 'career',
    summary: 'การสร้างขอบเขต (Boundary) คือกุญแจสำคัญของสุขภาพจิตที่ยั่งยืนในที่ทำงาน',
    emoji: '🙅‍♂️',
    content: 'การปฏิเสธไม่ได้หมายความว่าคุณไม่รับผิดชอบ แต่มันหมายความว่าคุณ "รักษาคุณภาพ" ของงานที่ทำอยู่ ลองใช้เทคนิค Yes-No-Yes ดูสิ: "ฉันยินดีที่ได้รับโอกาสนี้ (Yes) แต่ตอนนี้งานในมือล้นมือจริงๆ จึงยังไม่สามารถรับเพิ่มได้ในตอนนี้ (No) ไว้ถ้าเคลียร์งานนี้เสร็จ เรามาคุยกันใหม่อีกครั้งนะ (Yes)" วิธีนี้จะช่วยถนอมน้ำใจและรักษาอาชีพการงานไปพร้อมๆ กัน'
  },
  {
    id: 'study_mindful',
    title: 'วิธีอ่านหนังสือแบบไม่ทำร้ายสุขภาพจิต',
    category: 'study',
    summary: 'สมองของคุณต้องการเวลาพัก ไม่ใช่การอัดข้อมูลแบบ 24 ชั่วโมง',
    emoji: '📚',
    content: 'การอ่านหนังสือติดต่อกันหลายชั่วโมงโดยไม่พักจะทำให้เกิด Cognitive Load หรือภาวะล้าทางสมอง ลองใช้เทคนิค Pomodoro (อ่าน 25 พัก 5) หรือกฎ 50/10 และที่สำคัญที่สุด: อย่าอ่านหนังสือบนเตียงนอน เพราะสมองจะสับสนระหว่าง "เวลาทำงาน" กับ "เวลาพักผ่อน" ทำให้คุณนอนหลับยากขึ้นและเครียดสะสมโดยไม่รู้ตัว'
  },
  {
    id: 'impostor_syndrome',
    title: 'รับมือกับ Impostor Syndrome',
    category: 'growth',
    summary: 'ความรู้สึกว่า "เราไม่เก่งจริง" หรือ "เราคือตัวปลอม" จัดการได้ด้วยการจดบันทึก',
    emoji: '🎭',
    content: 'คนเก่งหลายคนมักกังวลว่าความสำเร็จที่ได้มาคือโชคช่วย วิธีแก้ง่ายๆ คือการทำ "Evidence Journal" หรือการจดบันทึกความสำเร็จที่เป็นรูปธรรม เมื่อไหร่ที่คุณเริ่มสงสัยในตัวเอง ให้หยิบสมุดเล่มนี้ขึ้นมาอ่านเพื่อย้ำเตือนตัวเองว่า คุณมายืนตรงนี้ได้เพราะความสามารถของคุณจริงๆ ไม่ใช่อุบัติเหตุ'
  },
  {
    id: 'deep_work_anxiety',
    title: 'Deep Work สำหรับคนขี้กังวล',
    category: 'career',
    summary: 'ฝึกสมาธิให้อยู่กับปัจจุบัน เพื่อลดความกังวลถึงอนาคตที่ยังมาไม่ถึง',
    emoji: '🧘‍♀️',
    content: 'เมื่อความกังวลรบกวนสมาธิ ลองใช้เทคนิค "Worry Window" หรือการกำหนดเวลาเครียดวันละ 15 นาที เมื่อมีเรื่องกังวลแวบเข้ามาในเวลาทำงาน ให้จดมันไว้แล้วบอกตัวเองว่า "เดี๋ยวค่อยไปกังวลตอน 4 โมงเย็น" วิธีนี้จะช่วยให้คุณจดจ่อกับงานตรงหน้า (Deep Work) ได้ดีขึ้นและลดความเครียดสะสมตลอดวัน'
  }
];

const MentorshipView: React.FC = () => {
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);

  return (
    <div className="flex flex-col gap-10 animate-in fade-in duration-700">
      <div className="bg-gradient-to-br from-orange-50 to-white p-10 md:p-16 rounded-[4rem] border border-orange-100 flex flex-col md:flex-row items-center gap-10">
        <div className="w-32 h-32 rounded-full bg-white flex items-center justify-center shadow-xl text-5xl">
           💡
        </div>
        <div className="flex-grow text-center md:text-left">
           <h3 className="text-3xl font-bold text-[#5d4037] mb-2">เพื่อนคู่คิด (Mentorship)</h3>
           <p className="text-xl text-gray-500 italic leading-relaxed">
             "ความสำเร็จที่แท้จริง... คือความสำเร็จที่หัวใจยังยิ้มได้"
           </p>
           <p className="text-gray-400 mt-4">
             รวบรวมเคล็ดลับการทำงานและการเรียนที่ออกแบบมาเพื่อคนแคร์สุขภาพจิตโดยเฉพาะ
           </p>
        </div>
      </div>

      {!selectedArticle ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {ARTICLES.map((art) => (
            <button 
              key={art.id}
              onClick={() => setSelectedArticle(art)}
              className="bg-white p-10 rounded-[3rem] shadow-sm border border-white hover:shadow-xl hover:-translate-y-2 transition-all flex flex-col text-left group"
            >
              <div className="text-5xl mb-6 group-hover:scale-110 transition-transform duration-300">
                {art.emoji}
              </div>
              <span className={`text-[10px] font-bold uppercase tracking-widest mb-2 px-3 py-1 rounded-full w-fit ${
                art.category === 'career' ? 'bg-blue-50 text-blue-400' : 
                art.category === 'study' ? 'bg-green-50 text-green-400' : 'bg-purple-50 text-purple-400'
              }`}>
                {art.category}
              </span>
              <h4 className="text-2xl font-bold text-[#5d4037] mb-3 group-hover:text-[#4caf50] transition-colors">
                {art.title}
              </h4>
              <p className="text-gray-400 italic leading-relaxed">
                {art.summary}
              </p>
              <div className="mt-8 flex items-center gap-2 text-[#4caf50] font-bold text-sm">
                 อ่านต่อเพื่อความเบาสบาย <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-4 h-4"><path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" /></svg>
              </div>
            </button>
          ))}
        </div>
      ) : (
        <div className="bg-white p-10 md:p-16 rounded-[4rem] shadow-sm border border-white animate-in zoom-in duration-500 relative min-h-[500px] flex flex-col">
          <button 
            onClick={() => setSelectedArticle(null)}
            className="absolute top-10 right-10 text-gray-300 hover:text-[#4caf50] transition-colors flex items-center gap-2 group"
          >
             <span className="text-sm font-bold opacity-0 group-hover:opacity-100 transition-opacity">กลับไปดูหัวข้ออื่น</span>
             <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
             </svg>
          </button>

          <div className="mb-10">
            <div className="text-6xl mb-6">{selectedArticle.emoji}</div>
            <h3 className="text-4xl font-bold text-[#5d4037] mb-4">{selectedArticle.title}</h3>
            <div className="w-20 h-1.5 bg-orange-200 rounded-full mb-8"></div>
          </div>

          <div className="flex-grow">
             <p className="text-2xl text-gray-600 leading-relaxed italic mb-10 font-light">
               "{selectedArticle.content}"
             </p>
          </div>

          <div className="mt-auto pt-10 border-t border-gray-50 flex items-center gap-6 text-gray-400 italic">
             <div className="w-12 h-12 rounded-full bg-orange-50 flex items-center justify-center text-orange-400">
                <SparkleIcon size={24} />
             </div>
             <p>ความพยายามของคุณมีค่าเสมอ... อย่าลืมใจดีกับตัวเองในขณะที่กำลังก้าวไปข้างหน้านะ</p>
          </div>
        </div>
      )}

      <div className="p-8 bg-white/50 rounded-[3rem] border border-white text-center">
         <p className="text-gray-300 italic">"You don't have to be perfect to be successful."</p>
      </div>
    </div>
  );
};

export default MentorshipView;
