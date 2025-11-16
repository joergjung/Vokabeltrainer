
import React from 'react';

interface CompletionCardProps {
  onRestart: () => void;
}

const CompletionCard: React.FC<CompletionCardProps> = ({ onRestart }) => {
  return (
    <div className="w-full max-w-2xl mx-auto flex flex-col">
      <div className="relative w-full aspect-[16/9] bg-gradient-to-br from-green-400 to-teal-500 rounded-2xl shadow-2xl p-8 flex flex-col justify-center items-center text-center select-none">
        <h2 className="text-4xl md:text-5xl font-bold text-white">Well done, Jacob.</h2>
        <p className="text-2xl text-white/80 mt-2">You are finished!</p>
        <div className="absolute bottom-4 right-4">
          <button onClick={onRestart} className="p-3 rounded-full bg-white/20 hover:bg-white/40 transition-colors focus:outline-none focus:ring-2 focus:ring-white" aria-label="Start over">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default CompletionCard;
