import React from 'react';
import { ArrowRight, Languages } from 'lucide-react';

interface LanguageSelectorProps {
  file: File | null;
  sourceLanguage: string;
  targetLanguage: string;
  setSourceLanguage: (language: string) => void;
  setTargetLanguage: (language: string) => void;
  onContinue: () => void;
}

const LanguageSelector: React.FC<LanguageSelectorProps> = ({
  file,
  sourceLanguage,
  targetLanguage,
  setSourceLanguage,
  setTargetLanguage,
  onContinue
}) => {
  const languages = [
    { code: 'en', name: 'English' },
    { code: 'es', name: 'Spanish' },
    { code: 'fr', name: 'French' },
    { code: 'de', name: 'German' },
    { code: 'it', name: 'Italian' },
    { code: 'pt', name: 'Portuguese' },
    { code: 'ru', name: 'Russian' },
    { code: 'zh', name: 'Chinese' },
    { code: 'ja', name: 'Japanese' },
    { code: 'ko', name: 'Korean' },
    { code: 'ar', name: 'Arabic' },
    { code: 'hi', name: 'Hindi' },
  ];

  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold text-center mb-6">Select Languages</h2>
      
      {file && (
        <div className="mb-6 p-4 bg-blue-50 rounded-lg flex items-center">
          <div className="w-12 h-12 bg-blue-100 rounded-md flex items-center justify-center mr-4">
            <Languages className="h-6 w-6 text-indigo-600" />
          </div>
          <div>
            <p className="font-medium text-gray-800">Selected File</p>
            <p className="text-sm text-gray-600">{file.name}</p>
          </div>
        </div>
      )}
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Source Language (Original Video)
          </label>
          <select
            value={sourceLanguage}
            onChange={(e) => setSourceLanguage(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          >
            {languages.map((language) => (
              <option key={`source-${language.code}`} value={language.code}>
                {language.name}
              </option>
            ))}
          </select>
          <p className="mt-2 text-sm text-gray-500">
            Select the language spoken in your video
          </p>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Target Language (Translation)
          </label>
          <select
            value={targetLanguage}
            onChange={(e) => setTargetLanguage(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          >
            {languages.map((language) => (
              <option key={`target-${language.code}`} value={language.code}>
                {language.name}
              </option>
            ))}
          </select>
          <p className="mt-2 text-sm text-gray-500">
            Select the language you want to translate to
          </p>
        </div>
      </div>
      
      <div className="flex items-center justify-center my-8">
        <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center">
          <ArrowRight className="h-8 w-8 text-indigo-600" />
        </div>
      </div>
      
      <div className="bg-gray-50 p-4 rounded-lg mb-6">
        <h3 className="font-semibold text-gray-800 mb-2">Translation Summary</h3>
        <p className="text-gray-600">
          We'll translate your video from <span className="font-medium">{languages.find(l => l.code === sourceLanguage)?.name}</span> to <span className="font-medium">{languages.find(l => l.code === targetLanguage)?.name}</span>.
        </p>
      </div>
      
      <div className="mt-8 flex justify-center">
        <button
          onClick={onContinue}
          className="bg-indigo-600 text-white px-6 py-3 rounded-md hover:bg-indigo-700 transition-colors flex items-center"
        >
          Start Translation Process
          <ArrowRight className="ml-2 h-4 w-4" />
        </button>
      </div>
      
      <div className="mt-8 border-t border-gray-200 pt-6">
        <h3 className="text-lg font-semibold mb-4">Additional Options</h3>
        <div className="space-y-3">
          <div className="flex items-center">
            <input
              type="checkbox"
              id="generate-subtitles"
              className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
            />
            <label htmlFor="generate-subtitles" className="ml-2 text-gray-700">
              Generate subtitles in target language
            </label>
          </div>
          <div className="flex items-center">
            <input
              type="checkbox"
              id="preserve-tone"
              className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
              defaultChecked
            />
            <label htmlFor="preserve-tone" className="ml-2 text-gray-700">
              Preserve emotional tone and intonation
            </label>
          </div>
          <div className="flex items-center">
            <input
              type="checkbox"
              id="high-quality"
              className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
              defaultChecked
            />
            <label htmlFor="high-quality" className="ml-2 text-gray-700">
              Use high-quality voice synthesis
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LanguageSelector;