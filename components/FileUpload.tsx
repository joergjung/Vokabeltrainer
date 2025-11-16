
import React, { useCallback } from 'react';

interface FileUploadProps {
  onFileUpload: (content: string) => void;
}

const FileUpload: React.FC<FileUploadProps> = ({ onFileUpload }) => {
  const handleFileChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const text = e.target?.result as string;
        onFileUpload(text);
      };
      reader.readAsText(file);
    }
  }, [onFileUpload]);

  return (
    <div className="w-full max-w-md mx-auto bg-white rounded-xl shadow-2xl p-8 text-center flex flex-col items-center justify-center space-y-6">
      <h1 className="text-3xl font-bold text-gray-800">Vocabulary Trainer</h1>
      <p className="text-gray-600">Upload a CSV file to begin your learning session.</p>
      <p className="text-sm text-gray-500">Format: English Word,German Word,Example Sentence</p>
      <div className="w-full">
        <label htmlFor="file-upload" className="cursor-pointer inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 transition-all duration-300">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
          </svg>
          Select CSV File
        </label>
        <input id="file-upload" name="file-upload" type="file" className="sr-only" accept=".csv" onChange={handleFileChange} />
      </div>
    </div>
  );
};

export default FileUpload;
