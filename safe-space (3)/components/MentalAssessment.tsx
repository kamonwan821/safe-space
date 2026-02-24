
import React, { useState } from 'react';
import { SparkleIcon } from './Icons';

interface Question {
  id: number;
  text: string;
}

interface AssessmentType {
  id: string;
  title: string;
  description: string;
  questions: Question[];
  options: { text: string; value: number }[];
  scoring: (total: number) => { level: string; advice: string; color: string };
}

const ASSESSMENTS: AssessmentType[] = [
  {
    id: 'phq9',
    title: 'แบบประเมินภาวะซึมเศร้า (PHQ-9)',
    description: 'ในช่วง 2 สัปดาห์ที่ผ่านมา รวมทั้งวันนี้ ท่านมีอาการเหล่านี้บ่อยแค่ไหน?',
    options: [
      { text: 'ไม่มีเลย', value: 0 },
      { text: 'มีบางวัน', value: 1 },
      { text: 'มีบ่อยมาก', value: 2 },
      { text: 'มีเกือบทุกวัน', value: 3 }
    ],
    questions: [
      { id: 1, text: 'เบื่อ ทำอะไรๆ ก็ไม่เพลิดเพลิน' },
      { id: 2, text: 'ไม่สบายใจ ซึมเศร้า หรือท้อแท้' },
      { id: 3, text: 'หลับยาก หรือหลับๆ ตื่นๆ หรือหลับมากเกินไป' },
      { id: 4, text: 'เหนื่อยง่าย หรือไม่ค่อยมีแรง' },
      { id: 5, text: 'เบื่ออาหาร หรือกินมากเกินไป' },
      { id: 6, text: 'รู้สึกไม่ดีกับตัวเอง คิดว่าตัวเองล้มเหลว หรือทำให้ตัวเองและครอบครัวผิดหวัง' },
      { id: 7, text: 'สมาธิในการทำสิ่งต่างๆ แย่ลง เช่น อ่านหนังสือพิมพ์ หรือดูโทรทัศน์' },
      { id: 8, text: 'พูดหรือทำอะไรช้าจนคนอื่นสังเกตเห็นได้ หรือกระสับกระส่ายจนอยู่ไม่นิ่ง' },
      { id: 9, text: 'คิดทำร้ายตัวเอง หรือคิดว่าถ้าตายไปคงจะดีกว่า' }
    ],
    scoring: (total) => {
      if (total <= 4) return { level: 'ปกติ', advice: 'สุขภาพใจของคุณดูแข็งแรงดีนะ รักษาความสดใสนี้ไว้นะ', color: '#4caf50' };
      if (total <= 9) return { level: 'ระดับน้อย', advice: 'คุณอาจจะมีเรื่องกังวลบ้าง ลองหาเวลาพักผ่อนและทำสิ่งที่ชอบดูนะ', color: '#ffcc80' };
      if (total <= 14) return { level: 'ระดับปานกลาง', advice: 'ใจของคุณกำลังส่งสัญญาณเตือน ลองระบายกับคนรอบข้าง หรือปรึกษาผู้เชี่ยวชาญเพื่อความสบายใจนะ', color: '#ff9800' };
      return { level: 'ระดับรุนแรง', advice: 'ใจของคุณเหนื่อยล้ามากแล้วนะ เราอยากให้คุณลองปรึกษาจิตแพทย์หรือนักจิตวิทยาเพื่อหาทางออกด้วยกันนะ', color: '#f44336' };
    }
  },
  {
    id: 'gad7',
    title: 'แบบประเมินความวิตกกังวล (GAD-7)',
    description: 'ในช่วง 2 สัปดาห์ที่ผ่านมา ท่านมีอาการเหล่านี้บ่อยแค่ไหน?',
    options: [
      { text: 'ไม่มีเลย', value: 0 },
      { text: 'มีบางวัน', value: 1 },
      { text: 'มีบ่อยมาก', value: 2 },
      { text: 'มีเกือบทุกวัน', value: 3 }
    ],
    questions: [
      { id: 1, text: 'รู้สึกกระวนกระวาย กังวล หรือว้าวุ่นใจ' },
      { id: 2, text: 'หยุดกังวลไม่ได้ หรือควบคุมความกังวลไม่ได้' },
      { id: 3, text: 'กังวลมากเกินไปในหลายๆ เรื่อง' },
      { id: 4, text: 'ผ่อนคลายได้ยาก' },
      { id: 5, text: 'รู้สึกกระสับกระส่ายจนนั่งไม่ติด' },
      { id: 6, text: 'กลายเป็นคนขี้หงุดหงิด' },
      { id: 7, text: 'รู้สึกกลัวเหมือนว่าจะมีอะไรที่เลวร้ายเกิดขึ้น' }
    ],
    scoring: (total) => {
      if (total <= 4) return { level: 'น้อย', advice: 'ความกังวลของคุณอยู่ในระดับที่จัดการได้นะ สูดลมหายใจลึกๆ ไว้', color: '#4caf50' };
      if (total <= 9) return { level: 'ปานกลาง', advice: 'ความกังวลเริ่มรบกวนชีวิต ลองฝึกสมาธิหรือโยคะดูนะ', color: '#ffcc80' };
      return { level: 'สูง', advice: 'หากความกังวลนี้ทำให้คุณใช้ชีวิตลำบาก ลองคุยกับนักบำบัดดูสิ จะช่วยได้มากเลยนะ', color: '#f44336' };
    }
  },
  {
    id: 'burnout',
    title: 'แบบประเมินภาวะหมดไฟ (Burnout)',
    description: 'ประเมินความรู้สึกเกี่ยวกับงานหรือสิ่งที่ทำอยู่ปัจจุบัน',
    options: [
      { text: 'ไม่เคยเลย', value: 0 },
      { text: 'นานๆ ครั้ง', value: 1 },
      { text: 'บ่อยครั้ง', value: 2 },
      { text: 'ตลอดเวลา', value: 3 }
    ],
    questions: [
      { id: 1, text: 'รู้สึกหมดเรี่ยวแรงหลังจากทำงานเสร็จ' },
      { id: 2, text: 'รู้สึกเหนื่อยล้าตั้งแต่ยังไม่ได้เริ่มงาน' },
      { id: 3, text: 'รู้สึกว่างานที่ทำไม่มีความหมายหรือน่าเบื่อ' },
      { id: 4, text: 'รู้สึกหงุดหงิดหรือง่ายต่อการขัดเคืองเมื่อมีคนมาขัดจังหวะงาน' },
      { id: 5, text: 'ประสิทธิภาพในการทำงานลดลงอย่างเห็นได้ชัด' }
    ],
    scoring: (total) => {
      if (total <= 5) return { level: 'ยังมีไฟอยู่', advice: 'คุณยังจัดการสมดุลชีวิตได้ดีมาก เก่งมากเลยนะ', color: '#4caf50' };
      if (total <= 10) return { level: 'เริ่มหมดไฟ', advice: 'ไฟในใจเริ่มมอด ลองลาพักร้อนหรือวางมือจากงานสักครู่ดูนะ', color: '#ffcc80' };
      return { level: 'หมดไฟ (Burnout)', advice: 'ไฟของคุณดับลงชั่วคราวแล้ว ไม่เป็นไรนะ มาพักผ่อนให้เต็มที่เพื่อเติมพลังกันใหม่เถอะ', color: '#f44336' };
    }
  }
];

const MentalAssessment: React.FC = () => {
  const [selectedAssessment, setSelectedAssessment] = useState<AssessmentType | null>(null);
  const [currentQuestionIdx, setCurrentQuestionIdx] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [isFinished, setIsFinished] = useState(false);

  const startAssessment = (type: AssessmentType) => {
    setSelectedAssessment(type);
    setCurrentQuestionIdx(0);
    setAnswers({});
    setIsFinished(false);
  };

  const handleAnswer = (value: number) => {
    if (!selectedAssessment) return;
    const newAnswers = { ...answers, [selectedAssessment.questions[currentQuestionIdx].id]: value };
    setAnswers(newAnswers);

    if (currentQuestionIdx < selectedAssessment.questions.length - 1) {
      setCurrentQuestionIdx(currentQuestionIdx + 1);
    } else {
      setIsFinished(true);
      // Give seeds for completing assessment
      const storedPoints = parseInt(localStorage.getItem('garden_growth_points') || '0');
      localStorage.setItem('garden_growth_points', (storedPoints + 2).toString());
    }
  };

  const reset = () => {
    setSelectedAssessment(null);
    setCurrentQuestionIdx(0);
    setAnswers({});
    setIsFinished(false);
  };

  if (isFinished && selectedAssessment) {
    const totalScore = Object.values(answers).reduce((a, b) => a + b, 0);
    const result = selectedAssessment.scoring(totalScore);

    return (
      <div className="flex flex-col items-center justify-center py-10 animate-in fade-in zoom-in duration-700 text-center">
        <div className="text-6xl mb-6">📊✨</div>
        <h3 className="text-3xl font-bold text-[#5d4037] mb-2">{selectedAssessment.title}</h3>
        <p className="text-gray-400 mb-8 italic">ประเมินเสร็จแล้วนะ... ขอบคุณที่เปิดใจ</p>

        <div className="w-full max-w-2xl bg-white p-10 rounded-[3rem] shadow-xl border-t-8 mb-10" style={{ borderColor: result.color }}>
          <p className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-2">ระดับสุขภาพใจของคุณ</p>
          <h4 className="text-4xl font-bold mb-6" style={{ color: result.color }}>{result.level}</h4>
          <div className="bg-[#fcfaf5] p-6 rounded-[2rem] text-xl text-gray-600 leading-relaxed italic">
            "{result.advice}"
          </div>
        </div>

        <div className="bg-red-50 p-6 rounded-[2rem] border border-red-100 max-w-xl mb-12">
          <p className="text-red-400 text-sm leading-relaxed">
            <strong>คำแนะนำ:</strong> แบบประเมินนี้เป็นเพียงเครื่องมือสำรวจเบื้องต้นเท่านั้น <span className="underline italic">ไม่ใช่การวินิจฉัยทางการแพทย์</span> หากคุณรู้สึกไม่สบายใจอย่างมาก เราแนะนำให้ปรึกษาผู้เชี่ยวชาญเพื่อรับการดูแลที่เหมาะสมนะ
          </p>
        </div>

        <div className="flex flex-col md:flex-row gap-4">
          <button onClick={reset} className="px-12 py-4 rounded-full bg-[#4caf50] text-white font-bold text-lg shadow-lg hover:scale-105 transition-all">
            อืม... เข้าใจแล้ว
          </button>
        </div>
      </div>
    );
  }

  if (selectedAssessment) {
    const currentQuestion = selectedAssessment.questions[currentQuestionIdx];
    const progress = ((currentQuestionIdx + 1) / selectedAssessment.questions.length) * 100;

    return (
      <div className="flex flex-col gap-10 animate-in fade-in slide-in-from-bottom-6 duration-500">
        <div className="bg-[#fcfaf5] p-8 md:p-12 rounded-[4rem] border-2 border-dashed border-[#f8bbd0] relative overflow-hidden">
          <button onClick={reset} className="absolute top-6 right-8 text-gray-300 hover:text-gray-500 transition-colors">
             เดี๋ยวค่อยกลับมานะ
          </button>
          
          <div className="mb-10 text-center">
            <h3 className="text-2xl font-bold text-[#5d4037] mb-2">{selectedAssessment.title}</h3>
            <p className="text-gray-400 italic">{selectedAssessment.description}</p>
          </div>

          <div className="w-full h-2 bg-gray-100 rounded-full mb-12 overflow-hidden">
             <div className="h-full bg-pink-300 transition-all duration-500" style={{ width: `${progress}%` }} />
          </div>

          <div className="text-center mb-12">
            <p className="text-sm font-bold text-pink-300 mb-4">คำถามที่ {currentQuestionIdx + 1} / {selectedAssessment.questions.length}</p>
            <h4 className="text-3xl md:text-4xl font-bold text-[#5d4037] leading-tight">
              {currentQuestion.text}
            </h4>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl mx-auto">
            {selectedAssessment.options.map((opt, idx) => (
              <button
                key={idx}
                onClick={() => handleAnswer(opt.value)}
                className="px-8 py-5 rounded-[2rem] bg-white border border-gray-100 hover:border-pink-300 hover:bg-pink-50 text-gray-700 text-lg font-medium transition-all shadow-sm hover:shadow-md active:scale-[0.98]"
              >
                {opt.text}
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-10 animate-in fade-in duration-500">
      <div className="text-center mb-6">
        <p className="text-xl text-gray-400 font-light italic">เลือกหัวข้อที่คุณต้องการสำรวจในวันนี้...</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {ASSESSMENTS.map((type) => (
          <button
            key={type.id}
            onClick={() => startAssessment(type)}
            className="bg-white p-10 rounded-[3.5rem] border border-gray-50 shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all group flex flex-col items-center text-center"
          >
            <div className="w-16 h-16 rounded-full bg-pink-50 flex items-center justify-center text-pink-400 mb-6 group-hover:scale-110 transition-transform">
               {type.id === 'phq9' ? '😔' : type.id === 'gad7' ? '😟' : '🔥'}
            </div>
            <h3 className="text-xl font-bold text-[#5d4037] mb-2">{type.title}</h3>
            <p className="text-sm text-gray-400 italic mb-6 leading-relaxed">{type.questions.length} คำถามเพื่อสำรวจใจ</p>
            <span className="px-6 py-2 rounded-full bg-pink-50 text-pink-400 font-bold text-sm">เริ่มต้นเช็กใจ</span>
          </button>
        ))}
      </div>

      <div className="mt-12 p-8 bg-blue-50 rounded-[3rem] border border-blue-100 flex items-center gap-6">
         <div className="text-4xl">🌱</div>
         <div>
            <h4 className="font-bold text-blue-800">รู้ไหม?</h4>
            <p className="text-blue-600 leading-relaxed italic">ทุกครั้งที่คุณทำแบบประเมินเสร็จ คุณจะได้รับ 2 เมล็ดพันธุ์เพื่อนำไปปลูกใน "สวนแห่งความภูมิใจ" ด้วยนะ</p>
         </div>
      </div>
    </div>
  );
};

export default MentalAssessment;
