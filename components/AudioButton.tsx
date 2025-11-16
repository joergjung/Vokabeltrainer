
import React, { useState, useCallback } from 'react';
import { generateSpeech } from '../services/geminiService';

interface AudioButtonProps {
  text: string;
  audioContext: AudioContext | null;
}

const AudioButton: React.FC<AudioButtonProps> = ({ text, audioContext }) => {
  const [isLoading, setIsLoading] = useState(false);

  const playAudio = useCallback(async () => {
    if (!text || !audioContext) return;
    setIsLoading(true);
    try {
      const audioBuffer = await generateSpeech(text, audioContext);
      if (audioBuffer) {
        const source = audioContext.createBufferSource();
        source.buffer = audioBuffer;
        source.connect(audioContext.destination);
        source.start();
      }
    } catch (error) {
      console.error("Failed to play audio:", error);
    } finally {
      setIsLoading(false);
    }
  }, [text, audioContext]);

  return (
    <button
      onClick={playAudio}
      disabled={isLoading || !audioContext}
      className="absolute top-4 right-4 p-2 rounded-full bg-white/20 hover:bg-white/40 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors focus:outline-none focus:ring-2 focus:ring-white"
      aria-label="Play audio pronunciation"
    >
      {isLoading ? (
        <svg className="animate-spin h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
      ) : (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.858 8.464a5 5 0 000 7.072m2.828 9.9a9 9 0 000-12.728M12 12h.01" />
        </svg>
      )}
    </button>
  );
};

export default AudioButton;
