
import React, { useState, useRef, useEffect } from 'react';
import { ShredderIcon, SparkleIcon, FireIcon } from './Icons';

const COMFORT_MESSAGES = [
  'ขอบคุณที่เล่าให้เราฟังนะ พื้นที่ตรงนี้จะโอบกอดคุณเอง',
  'วันนี้เก่งมากแล้วนะ ทิ้งความเหนื่อยล้าไว้ที่นี่ แล้วหลับให้สบายนะ',
  'ไม่ว่าเรื่องจะหนักแค่ไหน ขอบคุณที่คุณยังสู้มาถึงตอนนี้',
  'ขอบคุณที่แวะมาพักใจที่นี่นะ คุณไม่ได้สู้คนเดียวหรอก',
  'พักสักนิดนะ วันนี้คุณทำดีที่สุดแล้ว'
];

const RED_FLAG_KEYWORDS = [
  'ไม่อยากอยู่', 'ตาย', 'ฆ่าตัวตาย', 'ทำร้ายตัวเอง', 'จบชีวิต', 'ลาก่อน', 'ไม่อยากหายใจ', 'ไม่ไหวแล้ว'
];

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  color: string;
  alpha: number;
}

type VentMode = 'stars' | 'shred' | 'fire';

const VentingBox: React.FC = () => {
  const [text, setText] = useState('');
  const [isVenting, setIsVenting] = useState(true);
  const [isAnimating, setIsAnimating] = useState(false);
  const [mode, setMode] = useState<VentMode>('stars');
  const [comfortMessage, setComfortMessage] = useState<React.ReactNode>('');
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleSubmit = () => {
    if (!text.trim() || isAnimating) return;

    const hasRedFlag = RED_FLAG_KEYWORDS.some(keyword => text.includes(keyword));
    setIsAnimating(true);

    if (mode === 'stars') {
      spawnParticles('stars', () => finalizeVenting(hasRedFlag));
    } else if (mode === 'shred') {
      spawnParticles('shred', () => finalizeVenting(hasRedFlag));
    } else {
      spawnParticles('fire', () => finalizeVenting(hasRedFlag));
    }
  };

  const finalizeVenting = (hasRedFlag: boolean) => {
    setIsVenting(false);
    setIsAnimating(false);
    
    const storedPoints = parseInt(localStorage.getItem('garden_growth_points') || '0');
    localStorage.setItem('garden_growth_points', (storedPoints + 1).toString());
    
    if (hasRedFlag) {
      setComfortMessage(
        <div className="space-y-6">
          <p className="text-red-500 font-bold text-3xl">เรารับรู้ถึงความเจ็บปวดของคุณนะ...</p>
          <p className="text-gray-600 text-xl leading-relaxed">
            หากคุณรู้สึกว่าไม่ไหวจริงๆ เราอยากขอให้คุณลองโทรหา 
            <span className="text-[#4caf50] font-bold mx-2">สายด่วนสุขภาพจิต 1323</span> 
            เขายินดีรับฟังคุณตลอด 24 ชม. นะ เราอยากให้คุณอยู่ตรงนี้กับเรา
          </p>
        </div>
      );
    } else {
      setComfortMessage(COMFORT_MESSAGES[Math.floor(Math.random() * COMFORT_MESSAGES.length)]);
    }
    setText('');
  };

  const spawnParticles = (type: VentMode, onComplete: () => void) => {
    const canvas = canvasRef.current;
    if (!canvas || !textareaRef.current) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = textareaRef.current.getBoundingClientRect();
    const containerRect = canvas.getBoundingClientRect();
    const xOffset = rect.left - containerRect.left;
    const yOffset = rect.top - containerRect.top;

    const particles: Particle[] = [];
    const count = type === 'shred' ? 800 : 1200;

    for (let i = 0; i < count; i++) {
      let vx = (Math.random() - 0.5) * 4;
      let vy = -Math.random() * 6 - 2;
      let color = '#ffffff';

      if (type === 'fire') {
        color = Math.random() > 0.3 ? '#ff9800' : '#f44336';
        vy = -Math.random() * 8 - 4;
      } else if (type === 'shred') {
        color = '#f5f5f5';
        vx = (Math.random() - 0.5) * 1;
        vy = Math.random() * 4 + 2;
      } else {
        color = Math.random() > 0.4 ? '#ffcc80' : '#ffffff';
      }

      particles.push({
        x: xOffset + Math.random() * rect.width,
        y: yOffset + (type === 'shred' ? Math.random() * 20 : Math.random() * rect.height),
        vx,
        vy,
        size: type === 'shred' ? Math.random() * 4 + 2 : Math.random() * 2.5 + 1,
        color,
        alpha: 1
      });
    }

    let frameCount = 0;
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      let alive = false;
      frameCount++;

      particles.forEach(p => {
        if (p.alpha > 0) {
          alive = true;
          ctx.globalAlpha = p.alpha;
          ctx.fillStyle = p.color;
          
          if (type === 'shred') {
            ctx.fillRect(p.x, p.y, p.size, p.size * 3);
          } else {
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
            ctx.fill();
          }

          p.x += p.vx;
          p.y += p.vy;
          p.alpha -= 0.008;
          if (type === 'fire') p.vy -= 0.02;
        }
      });

      if (frameCount === 110) onComplete();
      if (alive) requestAnimationFrame(animate);
      else ctx.clearRect(0, 0, canvas.width, canvas.height);
    };

    animate();
  };

  useEffect(() => {
    const handleResize = () => {
      if (canvasRef.current && containerRef.current) {
        canvasRef.current.width = containerRef.current.offsetWidth;
        canvasRef.current.height = containerRef.current.offsetHeight;
      }
    };
    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div ref={containerRef} className="relative w-full h-full flex flex-col">
      <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none z-50 rounded-[2.5rem]" />
      
      {isVenting ? (
        <div className={`flex flex-col flex-grow transition-opacity duration-1000 ${isAnimating ? 'opacity-0' : 'opacity-100'}`}>
          <div className="flex justify-center gap-4 mb-6">
            <button onClick={() => setMode('stars')} className={`flex items-center gap-2 px-4 py-2 rounded-full border transition-all ${mode === 'stars' ? 'bg-yellow-50 border-yellow-200 text-yellow-600 scale-105' : 'bg-white border-gray-100 text-gray-400 hover:border-yellow-100'}`}>
              <SparkleIcon size={18} /> <span className="text-sm font-bold">หมู่ดาว</span>
            </button>
            <button onClick={() => setMode('shred')} className={`flex items-center gap-2 px-4 py-2 rounded-full border transition-all ${mode === 'shred' ? 'bg-blue-50 border-blue-200 text-blue-600 scale-105' : 'bg-white border-gray-100 text-gray-400 hover:border-blue-100'}`}>
              <ShredderIcon size={18} /> <span className="text-sm font-bold">ทำลายทิ้ง</span>
            </button>
            <button onClick={() => setMode('fire')} className={`flex items-center gap-2 px-4 py-2 rounded-full border transition-all ${mode === 'fire' ? 'bg-red-50 border-red-200 text-red-600 scale-105' : 'bg-white border-gray-100 text-gray-400 hover:border-red-100'}`}>
              <FireIcon size={18} /> <span className="text-sm font-bold">เผาความเศร้า</span>
            </button>
          </div>

          <div className="relative flex-grow min-h-[350px] flex flex-col group">
            <textarea
              ref={textareaRef}
              value={text}
              onChange={(e) => setText(e.target.value)}
              disabled={isAnimating}
              placeholder="ปลดปล่อยทุกอย่างออกมาตรงนี้... พื้นที่นี้เป็นความลับของคุณนะ"
              className="w-full flex-grow p-10 text-xl rounded-[3rem] bg-white border-none shadow-inner focus:ring-8 focus:ring-[#fcfaf5] resize-none outline-none transition-all duration-500 placeholder-gray-200 leading-relaxed font-light italic"
            />
            
            <button
              onClick={handleSubmit}
              className={`absolute bottom-8 right-8 p-6 rounded-full shadow-2xl hover:scale-110 active:scale-95 transition-all duration-300 group
                ${mode === 'stars' ? 'bg-yellow-400 text-white' : mode === 'shred' ? 'bg-blue-400 text-white' : 'bg-red-500 text-white'}
                ${(!text.trim() || isAnimating) ? 'opacity-30 cursor-not-allowed scale-90' : 'cursor-pointer'}`}
              disabled={!text.trim() || isAnimating}
            >
              <div className="flex items-center gap-2 px-2">
                <span className="font-bold">ปลดปล่อย</span>
                {mode === 'stars' ? <SparkleIcon size={24} /> : mode === 'shred' ? <ShredderIcon size={24} /> : <FireIcon size={24} />}
              </div>
            </button>
          </div>
          <p className="mt-6 text-gray-300 text-center text-sm italic">"เราฟังคุณอยู่เสมอ... และเราจะไม่ตัดสินคุณเลย"</p>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center text-center py-24 animate-in fade-in zoom-in duration-1000">
          <div className="max-w-2xl px-8">
            <div className="text-7xl mb-8 animate-bounce transition-transform duration-1000">🌱</div>
            <p className="text-gray-400 mb-6 italic text-xl">เรื่องหนักๆ เหล่านั้นสลายไปแล้วนะ...</p>
            <div className="bg-white/60 backdrop-blur-sm p-10 rounded-[3rem] border border-white/50 mb-12 shadow-sm">
              {typeof comfortMessage === 'string' ? (
                <p className="text-3xl md:text-4xl text-slate-600 leading-relaxed font-bold tracking-tight">
                  {comfortMessage}
                </p>
              ) : (
                <div className="text-slate-600">{comfortMessage}</div>
              )}
            </div>
          </div>
          <button
            onClick={() => setIsVenting(true)}
            className="px-12 py-4 rounded-full bg-[#4caf50] text-white font-bold text-xl shadow-lg hover:bg-[#388e3c] hover:scale-105 transition-all"
          >
            ระบายต่ออีกสักนิดไหม?
          </button>
        </div>
      )}
    </div>
  );
};

export default VentingBox;
