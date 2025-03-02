import React, { useState } from 'react';
import { Upload, Languages, Globe, Video, Headphones, Subtitles, ArrowRight, Play, Download, Loader2 } from 'lucide-react';
import LanguageSelector from './components/LanguageSelector';
import UploadArea from './components/UploadArea';
import ProcessingStatus from './components/ProcessingStatus';
import VideoPlayer from './components/VideoPlayer';

function App() {
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [translatedVideo, setTranslatedVideo] = useState<string | null>(null);
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [file, setFile] = useState<File | null>(null);
  const [sourceLanguage, setSourceLanguage] = useState<string>('en');
  const [targetLanguage, setTargetLanguage] = useState<string>('es');
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [progress, setProgress] = useState<number>(0);
  const [translatedVideoUrl, setTranslatedVideoUrl] = useState<string>('');

  const handleFileUpload = (uploadedFile: File) => {
    setFile(uploadedFile);
    setCurrentStep(2);
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files.length > 0) {
            setVideoFile(event.target.files[0]);
        }
    };
  const handleUpload = async () => {
        if (!videoFile) return;

        const formData = new FormData();
        formData.append("video", videoFile);

        const response = await fetch("http://localhost:5000/upload", {
            method: "POST",
            body: formData,
        });

        const data = await response.json();
        setTranslatedVideo(data.video_url);
    };


  const handleLanguageSelection = () => {
    setCurrentStep(3);
    // Simulate processing
    setIsProcessing(true);
    simulateProcessing();
  };

  const simulateProcessing = () => {
    let currentProgress = 0;
    const interval = setInterval(() => {
      currentProgress += 5;
      setProgress(currentProgress);
      
      if (currentProgress >= 100) {
        clearInterval(interval);
        setIsProcessing(false);
        // Simulate a translated video URL
        setTranslatedVideoUrl('https://example.com/translated-video.mp4');
        setCurrentStep(4);
      }
    }, 500);
  };

  return (
    <div className="p-5">
            <h1 className="text-xl font-bold">Upload Video for Translation</h1>
            <input type="file" accept="video/*" onChange={handleFileChange} />
            <button onClick={handleUpload} className="bg-blue-500 text-white px-4 py-2 rounded">
                Upload & Translate
            </button>

            {translatedVideo && (
                <video controls className="mt-4">
                    <source src={translatedVideo} type="video/mp4" />
                    Your browser does not support the video tag.
                </video>
            )}
        </div>
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white shadow-md">
        <div className="container mx-auto px-4 py-6 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Globe className="h-8 w-8 text-indigo-600" />
            <h1 className="text-2xl font-bold text-gray-800">VideoTranslate</h1>
          </div>
          <nav>
            <ul className="flex space-x-6">
              <li><a href="#" className="text-gray-600 hover:text-indigo-600 transition-colors">Home</a></li>
              <li><a href="#" className="text-gray-600 hover:text-indigo-600 transition-colors">Pricing</a></li>
              <li><a href="#" className="text-gray-600 hover:text-indigo-600 transition-colors">About</a></li>
              <li><a href="#" className="text-gray-600 hover:text-indigo-600 transition-colors">Contact</a></li>
            </ul>
          </nav>
          <button className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition-colors">
            Sign In
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12">
        {/* Steps Indicator */}
        <div className="mb-12">
          <div className="flex justify-between items-center max-w-3xl mx-auto">
            <div className={`flex flex-col items-center ${currentStep >= 1 ? 'text-indigo-600' : 'text-gray-400'}`}>
              <div className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 ${currentStep >= 1 ? 'bg-indigo-600 text-white' : 'bg-gray-200 text-gray-500'}`}>
                <Upload className="h-5 w-5" />
              </div>
              <span className="text-sm font-medium">Upload</span>
            </div>
            <div className={`flex-1 h-1 mx-2 ${currentStep >= 2 ? 'bg-indigo-600' : 'bg-gray-200'}`}></div>
            <div className={`flex flex-col items-center ${currentStep >= 2 ? 'text-indigo-600' : 'text-gray-400'}`}>
              <div className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 ${currentStep >= 2 ? 'bg-indigo-600 text-white' : 'bg-gray-200 text-gray-500'}`}>
                <Languages className="h-5 w-5" />
              </div>
              <span className="text-sm font-medium">Languages</span>
            </div>
            <div className={`flex-1 h-1 mx-2 ${currentStep >= 3 ? 'bg-indigo-600' : 'bg-gray-200'}`}></div>
            <div className={`flex flex-col items-center ${currentStep >= 3 ? 'text-indigo-600' : 'text-gray-400'}`}>
              <div className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 ${currentStep >= 3 ? 'bg-indigo-600 text-white' : 'bg-gray-200 text-gray-500'}`}>
                <Headphones className="h-5 w-5" />
              </div>
              <span className="text-sm font-medium">Processing</span>
            </div>
            <div className={`flex-1 h-1 mx-2 ${currentStep >= 4 ? 'bg-indigo-600' : 'bg-gray-200'}`}></div>
            <div className={`flex flex-col items-center ${currentStep >= 4 ? 'text-indigo-600' : 'text-gray-400'}`}>
              <div className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 ${currentStep >= 4 ? 'bg-indigo-600 text-white' : 'bg-gray-200 text-gray-500'}`}>
                <Video className="h-5 w-5" />
              </div>
              <span className="text-sm font-medium">Result</span>
            </div>
          </div>
        </div>

        {/* Content based on current step */}
        <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
          {currentStep === 1 && (
            <UploadArea onFileUpload={handleFileUpload} />
          )}

          {currentStep === 2 && (
            <LanguageSelector 
              file={file}
              sourceLanguage={sourceLanguage}
              targetLanguage={targetLanguage}
              setSourceLanguage={setSourceLanguage}
              setTargetLanguage={setTargetLanguage}
              onContinue={handleLanguageSelection}
            />
          )}

          {currentStep === 3 && (
            <ProcessingStatus 
              isProcessing={isProcessing} 
              progress={progress} 
              sourceLanguage={sourceLanguage}
              targetLanguage={targetLanguage}
            />
          )}

          {currentStep === 4 && (
            <VideoPlayer 
              originalVideo={file ? URL.createObjectURL(file) : ''}
              translatedVideo={translatedVideoUrl}
            />
          )}
        </div>
      </main>

      {/* Features Section */}
      <section className="bg-white py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">How It Works</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-blue-50 p-6 rounded-lg text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Upload className="h-8 w-8 text-indigo-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Upload Your Video</h3>
              <p className="text-gray-600">Upload your video in any supported format. We accept most common video formats including MP4, AVI, MOV, and more.</p>
            </div>
            
            <div className="bg-blue-50 p-6 rounded-lg text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Languages className="h-8 w-8 text-indigo-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Select Languages</h3>
              <p className="text-gray-600">Choose the source language of your video and the target language you want to translate it to. We support over 50 languages.</p>
            </div>
            
            <div className="bg-blue-50 p-6 rounded-lg text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Download className="h-8 w-8 text-indigo-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Get Translated Video</h3>
              <p className="text-gray-600">Our AI processes your video, translates the speech, and generates a new audio track. Download your translated video with perfect sync.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-indigo-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">What Our Users Say</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow">
              <div className="flex items-center mb-4">
                <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=120&h=120&q=80" alt="User" className="w-12 h-12 rounded-full mr-4" />
                <div>
                  <h4 className="font-semibold">Sarah Johnson</h4>
                  <p className="text-gray-500 text-sm">Content Creator</p>
                </div>
              </div>
              <p className="text-gray-600">"VideoTranslate has revolutionized my content strategy. I can now reach global audiences without hiring translators or voice actors. The quality is impressive!"</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow">
              <div className="flex items-center mb-4">
                <img src="https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-1.2.1&auto=format&fit=crop&w=120&h=120&q=80" alt="User" className="w-12 h-12 rounded-full mr-4" />
                <div>
                  <h4 className="font-semibold">David Chen</h4>
                  <p className="text-gray-500 text-sm">Marketing Director</p>
                </div>
              </div>
              <p className="text-gray-600">"We've cut our localization costs by 70% while expanding to 5 new markets. The AI translation maintains our brand voice perfectly across languages."</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow">
              <div className="flex items-center mb-4">
                <img src="https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?ixlib=rb-1.2.1&auto=format&fit=crop&w=120&h=120&q=80" alt="User" className="w-12 h-12 rounded-full mr-4" />
                <div>
                  <h4 className="font-semibold">Elena Rodriguez</h4>
                  <p className="text-gray-500 text-sm">Educational Content Developer</p>
                </div>
              </div>
              <p className="text-gray-600">"Our educational videos now reach students worldwide. The subtitle feature is especially helpful for language learners who want to follow along with the text."</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Globe className="h-6 w-6 text-indigo-400" />
                <h3 className="text-xl font-bold">VideoTranslate</h3>
              </div>
              <p className="text-gray-400">Breaking language barriers in video content since 2025.</p>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-4">Product</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Features</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Pricing</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">API</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Integrations</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-4">Resources</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Documentation</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Guides</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Support</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">API Status</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-4">Company</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">About</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Blog</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Careers</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Contact</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-700 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400">© 2025 VideoTranslate. All rights reserved.</p>
            <div className="flex space-x-4 mt-4 md:mt-0">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">Privacy Policy</a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">Terms of Service</a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">Cookie Policy</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
