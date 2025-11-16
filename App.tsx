
import React, { useState, useEffect, useCallback } from 'react';
import FileUpload from './components/FileUpload';
import VocabularyCard from './components/VocabularyCard';
import CompletionCard from './components/CompletionCard';
import { VocabularyItem, CardFace } from './types';

type AppState = 'upload' | 'preview' | 'learning' | 'finished';

const App: React.FC = () => {
  const [appState, setAppState] = useState<AppState>('upload');
  const [vocabulary, setVocabulary] = useState<VocabularyItem[]>([]);
  const [rawCsvData, setRawCsvData] = useState<string>('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentFace, setCurrentFace] = useState<CardFace>(CardFace.ENGLISH);
  const [audioContext, setAudioContext] = useState<AudioContext | null>(null);

  useEffect(() => {
    // Initialize AudioContext after a user interaction (like file upload), but we can create it here.
    // Playback will be blocked until a user gesture. The audio button click serves as that gesture.
    setAudioContext(new (window.AudioContext || (window as any).webkitAudioContext)());
  }, []);

  const handleFileUpload = useCallback((content: string) => {
    // Step 2: Read vocabulary, replace delimiter, and store data.
    const sanitizedContent = content.replace(/;/g, ',');
    const rows = sanitizedContent.split('\n');
    const importedData: VocabularyItem[] = rows
      .map(row => {
        const [english, german, sentence] = row.split(',');
        return { 
          english: english?.trim(), 
          german: german?.trim(), 
          sentence: sentence?.trim() 
        };
      })
      .filter(item => item.english && item.german && item.sentence); // Ignore missing data

    if (importedData.length > 0) {
      setVocabulary(importedData);
      setRawCsvData(sanitizedContent);
      setAppState('preview');

      setTimeout(() => {
        setAppState('learning');
        setRawCsvData('');
      }, 5000);
    } else {
      alert("No valid vocabulary data found in the file. Please check the format.");
    }
  }, []);

  const handleNext = useCallback(() => {
    if (currentFace === CardFace.SENTENCE) {
      if (currentIndex < vocabulary.length - 1) {
        setCurrentIndex(prev => prev + 1);
        setCurrentFace(CardFace.ENGLISH);
      } else {
        setAppState('finished');
      }
    } else {
      setCurrentFace(prev => prev + 1);
    }
  }, [currentFace, currentIndex, vocabulary.length]);

  const handlePrev = useCallback(() => {
    if (currentFace === CardFace.ENGLISH) {
      if (currentIndex > 0) {
        setCurrentIndex(prev => prev - 1);
        setCurrentFace(CardFace.SENTENCE);
      }
    } else {
      setCurrentFace(prev => prev - 1);
    }
  }, [currentFace, currentIndex]);

  const handleRestart = useCallback(() => {
    setCurrentIndex(0);
    setCurrentFace(CardFace.ENGLISH);
    setAppState('learning');
  }, []);

  const renderContent = () => {
    switch (appState) {
      case 'upload':
        return <FileUpload onFileUpload={handleFileUpload} />;
      case 'preview':
        return (
          <div className="w-full max-w-2xl mx-auto bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-bold mb-4 text-gray-800">Imported Data Preview</h2>
            <p className="text-sm text-gray-500 mb-4">Switching to learning cards in 5 seconds...</p>
            <pre className="bg-gray-100 p-4 rounded-md text-gray-700 whitespace-pre-wrap text-sm">{rawCsvData}</pre>
          </div>
        );
      case 'learning':
        if (vocabulary.length > 0) {
          return (
            <VocabularyCard
              item={vocabulary[currentIndex]}
              currentCard={currentIndex}
              totalCards={vocabulary.length}
              face={currentFace}
              onNext={handleNext}
              onPrev={handlePrev}
              audioContext={audioContext}
            />
          );
        }
        return null;
      case 'finished':
        return <CompletionCard onRestart={handleRestart} />;
      default:
        return null;
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen flex items-center justify-center p-4 font-sans">
      {renderContent()}
    </div>
  );
};

export default App;
