
import React from 'react';
import { VocabularyItem, CardFace } from '../types';
import AudioButton from './AudioButton';

interface VocabularyCardProps {
  item: VocabularyItem;
  currentCard: number;
  totalCards: number;
  face: CardFace;
  onNext: () => void;
  onPrev: () => void;
  audioContext: AudioContext | null;
}

const FaceContent: React.FC<{ face: CardFace; item: VocabularyItem }> = ({ face, item }) => {
    switch (face) {
      case CardFace.ENGLISH:
        return (
          <>
            <p className="text-sm font-semibold text-white/70 uppercase tracking-widest">English</p>
            <h2 className="text-4xl md:text-5xl font-bold text-white mt-2">{item.english}</h2>
          </>
        );
      case CardFace.GERMAN:
        return (
          <>
            <p className="text-sm font-semibold text-white/70 uppercase tracking-widest">German</p>
            <h2 className="text-4xl md:text-5xl font-bold text-white mt-2">{item.german}</h2>
          </>
        );
      case CardFace.SENTENCE:
        return (
          <>
            <p className="text-sm font-semibold text-white/70 uppercase tracking-widest">Example</p>
            <h3 className="text-2xl md:text-3xl font-medium text-white mt-2">{item.sentence}</h3>
          </>
        );
      default:
        return null;
    }
  };
  
const getTextForFace = (face: CardFace, item: VocabularyItem): string => {
    switch(face) {
        case CardFace.ENGLISH: return item.english;
        case CardFace.GERMAN: return item.german;
        case CardFace.SENTENCE: return item.sentence;
    }
}

const VocabularyCard: React.FC<VocabularyCardProps> = ({ item, currentCard, totalCards, face, onNext, onPrev, audioContext }) => {

  return (
    <div className="w-full max-w-2xl mx-auto flex flex-col">
       <div className="relative w-full aspect-[16/9] bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl shadow-2xl p-8 flex flex-col justify-center items-center text-center select-none">
        <AudioButton text={getTextForFace(face, item)} audioContext={audioContext}/>
        <div className="absolute top-4 left-4 text-white font-semibold bg-black/20 px-3 py-1 rounded-full text-sm">
            {currentCard + 1} / {totalCards}
        </div>
        <FaceContent face={face} item={item} />
        <div className="absolute bottom-4 left-4">
            <button onClick={onPrev} className="p-3 rounded-full bg-white/20 hover:bg-white/40 transition-colors focus:outline-none focus:ring-2 focus:ring-white">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
            </button>
        </div>
        <div className="absolute bottom-4 right-4">
            <button onClick={onNext} className="p-3 rounded-full bg-white/20 hover:bg-white/40 transition-colors focus:outline-none focus:ring-2 focus:ring-white">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
            </button>
        </div>
       </div>
    </div>
  );
};

export default VocabularyCard;
