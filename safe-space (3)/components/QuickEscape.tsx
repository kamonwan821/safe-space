
import React from 'react';

interface QuickEscapeProps {
  onEscape: () => void;
}

const QuickEscape: React.FC<QuickEscapeProps> = ({ onEscape }) => {
  const handleEscape = (e?: React.MouseEvent) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    
    // เรียก callback เพื่อเปลี่ยนสถานะมุมมองกลับไปยังหน้า Landing ของแอปทันที
    onEscape();
  };

  return (
    <button
      onClick={handleEscape}
      className="fixed top-4 right-4 z-[300] group flex items-center gap-3 px-4 py-2 bg-white/90 backdrop-blur-md border border-gray-100 rounded-full shadow-md hover:bg-red-50 hover:border-red-100 transition-all duration-300 scale-90 md:scale-100 origin-right"
      title="กลับสู่หน้าหลักทันที (Esc)"
    >
      <div className="w-7 h-7 rounded-full bg-red-50 flex items-center justify-center group-hover:bg-red-100 transition-colors">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-4 h-4 text-red-500">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75" />
        </svg>
      </div>
      <span className="text-sm font-bold text-slate-500 group-hover:text-red-500 transition-colors whitespace-nowrap">ขอตัวไปทำงานก่อนนะ</span>
    </button>
  );
};

export default QuickEscape;
