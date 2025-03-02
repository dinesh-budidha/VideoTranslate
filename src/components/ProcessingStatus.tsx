import React from 'react';
import { Loader2, CheckCircle2, Headphones, Subtitles, Languages, Video } from 'lucide-react';

interface ProcessingStatusProps {
  isProcessing: boolean;
  progress: number;
  sourceLanguage: string;
  targetLanguage: string;
}

const ProcessingStatus: React.FC<ProcessingStatusProps> = ({
  isProcessing,
  progress,
  sourceLanguage,
  targetLanguage
}) => {
  const getLanguageName = (code: string): string => {
    const languages: Record<string, string> = {
      'en': 'English',
      'es': 'Spanish',
      'fr': 'French',
      'de': 'German',
      'it': 'Italian',
      'pt': 'Portuguese',
      'ru': 'Russian',
      'zh': 'Chinese',
      'ja': 'Japanese',
      'ko': 'Korean',
      'ar': 'Arabic',
      'hi': 'Hindi',
    };
    return languages[code] || code;
  };

  const steps = [
    { 
      name: 'Speech Recognition', 
      description: `Extracting speech from ${getLanguageName(sourceLanguage)} audio`,
      icon: Headphones,
      complete: progress >= 25
    },
    { 
      name: 'Translation', 
      description: `Translating from ${getLanguageName(sourceLanguage)} to ${getLanguageName(targetLanguage)}`,
      icon: Languages,
      complete: progress >= 50
    },
    { 
      name: 'Voice Synthesis', 
      description: `Generating ${getLanguageName(targetLanguage)} speech with natural intonation`,
      icon: Subtitles,
      complete: progress >= 75
    },
    { 
      name: 'Video Rendering', 
      description: 'Combining translated audio with original video',
      icon: Video,
      complete: progress >= 100
    }
  ];

  const currentStep = Math.min(Math.floor(progress / 25), 3);

  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold text-center mb-6">Processing Your Video</h2>
      
      <div className="mb-8">
        <div className="relative pt-1">
          <div className="flex mb-2 items-center justify-between">
            <div>
              <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-indigo-600 bg-indigo-200">
                Progress
              </span>
            </div>
            <div className="text-right">
              <span className="text-xs font-semibold inline-block text-indigo-600">
                {progress}%
              </span>
            </div>
          </div>
          <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-indigo-200">
            <div 
              style={{ width: `${progress}%` }} 
              className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-indigo-600 transition-all duration-500"
            ></div>
          </div>
        </div>
      </div>
      
      <div className="space-y-8">
        {steps.map((step, index) => (
          <div key={step.name} className="flex">
            <div className="flex-shrink-0">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                index < currentStep ? 'bg-green-100' : 
                index === currentStep ? 'bg-indigo-100' : 'bg-gray-100'
              }`}>
                {index < currentStep ? (
                  <CheckCircle2 className="h-6 w-6 text-green-600" />
                ) : index === currentStep ? (
                  isProcessing ? (
                    <Loader2 className="h-6 w-6 text-indigo-600 animate-spin" />
                  ) : (
                    <CheckCircle2 className="h-6 w-6 text-green-600" />
                  )
                ) : (
                  <step.icon className="h-6 w-6 text-gray-400" />
                )}
              </div>
            </div>
            <div className="ml-4 flex-1">
              <h3 className={`text-lg font-medium ${
                index < currentStep ? 'text-green-600' : 
                index === currentStep ? 'text-indigo-600' : 'text-gray-500'
              }`}>
                {step.name}
              </h3>
              <p className="mt-1 text-sm text-gray-500">{step.description}</p>
              
              {index === currentStep && isProcessing && (
                <div className="mt-2 text-xs text-indigo-500 animate-pulse">
                  Processing...
                </div>
              )}
              
              {index < currentStep && (
                <div className="mt-2 text-xs text-green-500 flex items-center">
                  <CheckCircle2 className="h-3 w-3 mr-1" />
                  Completed
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-8 bg-blue-50 p-4 rounded-lg">
        <h3 className="font-semibold text-gray-800 mb-2">Processing Information</h3>
        <p className="text-sm text-gray-600">
          Our AI is working hard to translate your video. This process involves several steps including speech recognition, 
          translation, voice synthesis, and final rendering. The time required depends on the length and complexity of your video.
        </p>
      </div>
      
      {progress === 100 && !isProcessing && (
        <div className="mt-8 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 mb-4">
            <CheckCircle2 className="h-8 w-8 text-green-600" />
          </div>
          <h3 className="text-xl font-semibold text-green-600 mb-2">Processing Complete!</h3>
          <p className="text-gray-600 mb-4">Your translated video is ready to view and download.</p>
        </div>
      )}
    </div>
  );
};

export default ProcessingStatus;