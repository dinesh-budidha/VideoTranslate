import React, { useState } from 'react';
import { Download, Subtitles, Volume2, Play, Pause } from 'lucide-react';

interface VideoPlayerProps {
  originalVideo: string;
  translatedVideo: string;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ originalVideo, translatedVideo }) => {
  const [activeTab, setActiveTab] = useState<'original' | 'translated'>('translated');
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [showSubtitles, setShowSubtitles] = useState<boolean>(true);
  
  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
    // In a real implementation, this would control the video element
  };

  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold text-center mb-6">Your Translated Video</h2>
      
      <div className="mb-6">
        <div className="flex border-b border-gray-200">
          <button
            className={`py-2 px-4 font-medium text-sm focus:outline-none ${
              activeTab === 'translated' 
                ? 'text-indigo-600 border-b-2 border-indigo-600' 
                : 'text-gray-500 hover:text-gray-700'
            }`}
            onClick={() => setActiveTab('translated')}
          >
            Translated Video
          </button>
          <button
            className={`py-2 px-4 font-medium text-sm focus:outline-none ${
              activeTab === 'original' 
                ? 'text-indigo-600 border-b-2 border-indigo-600' 
                : 'text-gray-500 hover:text-gray-700'
            }`}
            onClick={() => setActiveTab('original')}
          >
            Original Video
          </button>
        </div>
      </div>
      
      <div className="bg-black rounded-lg overflow-hidden relative">
        {/* Video Player (placeholder) */}
        <div className="aspect-video flex items-center justify-center bg-gray-900">
          {activeTab === 'original' ? (
            originalVideo ? (
              <video 
                src={originalVideo} 
                className="w-full h-full" 
                controls
                poster="https://images.unsplash.com/photo-1516541196182-6bdb0516ed27?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80"
              />
            ) : (
              <div className="text-white">Original video preview</div>
            )
          ) : (
            translatedVideo ? (
              <video 
                src={translatedVideo} 
                className="w-full h-full" 
                controls
                poster="https://images.unsplash.com/photo-1516541196182-6bdb0516ed27?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80"
              />
            ) : (
              <div className="text-white">Translated video preview</div>
            )
          )}
        </div>
        
        {/* Video Controls */}
        <div className="bg-gradient-to-t from-black to-transparent absolute bottom-0 left-0 right-0 p-4">
          <div className="flex items-center justify-between text-white">
            <div className="flex items-center space-x-4">
              <button 
                className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center hover:bg-white/30 transition-colors"
                onClick={handlePlayPause}
              >
                {isPlaying ? (
                  <Pause className="h-5 w-5" />
                ) : (
                  <Play className="h-5 w-5" />
                )}
              </button>
              <div className="text-sm">00:00 / 05:30</div>
            </div>
            
            <div className="flex items-center space-x-4">
              <button 
                className={`w-8 h-8 rounded-full ${showSubtitles ? 'bg-indigo-600' : 'bg-white/20'} flex items-center justify-center hover:bg-indigo-700 transition-colors`}
                onClick={() => setShowSubtitles(!showSubtitles)}
                title="Toggle Subtitles"
              >
                <Subtitles className="h-4 w-4" />
              </button>
              <button 
                className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center hover:bg-white/30 transition-colors"
                title="Volume"
              >
                <Volume2 className="h-4 w-4" />
              </button>
            </div>
          </div>
          
          {/* Progress bar */}
          <div className="mt-2 h-1 bg-white/30 rounded-full overflow-hidden">
            <div className="h-full bg-indigo-600 w-1/3"></div>
          </div>
          
          {/* Subtitles (if enabled) */}
          {showSubtitles && (
            <div className="absolute bottom-16 left-0 right-0 text-center">
              <div className="inline-block bg-black/70 px-4 py-2 rounded text-white text-sm">
                {activeTab === 'translated' ? 
                  "This is an example of translated subtitles in the target language." : 
                  "This is an example of original subtitles in the source language."}
              </div>
            </div>
          )}
        </div>
      </div>
      
      <div className="mt-8 flex flex-col md:flex-row justify-between items-center">
        <div>
          <h3 className="font-semibold text-gray-800 mb-2">Translation Details</h3>
          <p className="text-sm text-gray-600">
            {activeTab === 'translated' ? 
              "Translated from English to Spanish with AI voice synthesis." : 
              "Original video in English."}
          </p>
        </div>
        
        <div className="mt-4 md:mt-0">
          <button className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition-colors flex items-center">
            <Download className="mr-2 h-4 w-4" />
            Download {activeTab === 'translated' ? 'Translated' : 'Original'} Video
          </button>
        </div>
      </div>
      
      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-gray-50 p-4 rounded-lg">
          <h3 className="font-semibold text-gray-800 mb-2">Quality Options</h3>
          <div className="space-y-3">
            <div className="flex items-center">
              <input
                type="radio"
                id="quality-high"
                name="quality"
                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300"
                defaultChecked
              />
              <label htmlFor="quality-high" className="ml-2 text-sm text-gray-700">
                High Quality (1080p)
              </label>
            </div>
            <div className="flex items-center">
              <input
                type="radio"
                id="quality-medium"
                name="quality"
                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300"
              />
              <label htmlFor="quality-medium" className="ml-2 text-sm text-gray-700">
                Medium Quality (720p)
              </label>
            </div>
            <div className="flex items-center">
              <input
                type="radio"
                id="quality-low"
                name="quality"
                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300"
              />
              <label htmlFor="quality-low" className="ml-2 text-sm text-gray-700">
                Low Quality (480p)
              </label>
            </div>
          </div>
        </div>
        
        <div className="bg-gray-50 p-4 rounded-lg">
          <h3 className="font-semibold text-gray-800 mb-2">Additional Options</h3>
          <div className="space-y-3">
            <div className="flex items-center">
              <input
                type="checkbox"
                id="download-subtitles"
                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                defaultChecked
              />
              <label htmlFor="download-subtitles" className="ml-2 text-sm text-gray-700">
                Include subtitles file (SRT)
              </label>
            </div>
            <div className="flex items-center">
              <input
                type="checkbox"
                id="download-transcript"
                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
              />
              <label htmlFor="download-transcript" className="ml-2 text-sm text-gray-700">
                Include transcript (TXT)
              </label>
            </div>
            <div className="flex items-center">
              <input
                type="checkbox"
                id="download-audio"
                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
              />
              <label htmlFor="download-audio" className="ml-2 text-sm text-gray-700">
                Download audio only (MP3)
              </label>
            </div>
          </div>
        </div>
      </div>
      
      <div className="mt-8 border-t border-gray-200 pt-6">
        <h3 className="font-semibold text-gray-800 mb-4">Share Your Translated Video</h3>
        <div className="flex space-x-4">
          <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors text-sm">
            Share on Facebook
          </button>
          <button className="bg-sky-500 text-white px-4 py-2 rounded-md hover:bg-sky-600 transition-colors text-sm">
            Share on Twitter
          </button>
          <button className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition-colors text-sm">
            Share via Email
          </button>
        </div>
      </div>
    </div>
  );
};

export default VideoPlayer;