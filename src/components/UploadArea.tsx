import React, { useState, useRef } from 'react';
import { Upload, FileVideo } from 'lucide-react';

interface UploadAreaProps {
  onFileUpload: (file: File) => void;
}

const UploadArea: React.FC<UploadAreaProps> = ({ onFileUpload }) => {
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [fileName, setFileName] = useState<string>('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const file = e.dataTransfer.files[0];
      if (file.type.startsWith('video/')) {
        setFileName(file.name);
        onFileUpload(file);
      } else {
        alert('Please upload a video file');
      }
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      if (file.type.startsWith('video/')) {
        setFileName(file.name);
        onFileUpload(file);
      } else {
        alert('Please upload a video file');
      }
    }
  };

  const handleButtonClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold text-center mb-6">Upload Your Video</h2>
      <p className="text-gray-600 text-center mb-8">
        Upload a video file to get started with the translation process.
        We support MP4, AVI, MOV, and other common formats.
      </p>
      
      <div 
        className={`border-2 border-dashed rounded-lg p-12 text-center ${
          isDragging ? 'border-indigo-500 bg-indigo-50' : 'border-gray-300 hover:border-indigo-400'
        } transition-colors cursor-pointer`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={handleButtonClick}
      >
        <input 
          type="file" 
          ref={fileInputRef}
          className="hidden" 
          accept="video/*" 
          onChange={handleFileChange}
        />
        
        <div className="flex flex-col items-center">
          {fileName ? (
            <>
              <FileVideo className="h-16 w-16 text-indigo-500 mb-4" />
              <p className="text-lg font-medium text-gray-800 mb-2">{fileName}</p>
              <p className="text-sm text-gray-500">File selected. Click to change.</p>
            </>
          ) : (
            <>
              <Upload className="h-16 w-16 text-indigo-500 mb-4" />
              <p className="text-lg font-medium text-gray-800 mb-2">Drag and drop your video here</p>
              <p className="text-sm text-gray-500">Or click to browse files</p>
            </>
          )}
        </div>
      </div>
      
      <div className="mt-8">
        <h3 className="text-lg font-semibold mb-4">Supported Features</h3>
        <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <li className="flex items-center text-gray-700">
            <span className="w-2 h-2 bg-indigo-500 rounded-full mr-2"></span>
            Multiple source languages
          </li>
          <li className="flex items-center text-gray-700">
            <span className="w-2 h-2 bg-indigo-500 rounded-full mr-2"></span>
            High-quality voice synthesis
          </li>
          <li className="flex items-center text-gray-700">
            <span className="w-2 h-2 bg-indigo-500 rounded-full mr-2"></span>
            Automatic subtitle generation
          </li>
          <li className="flex items-center text-gray-700">
            <span className="w-2 h-2 bg-indigo-500 rounded-full mr-2"></span>
            Emotion preservation in speech
          </li>
          <li className="flex items-center text-gray-700">
            <span className="w-2 h-2 bg-indigo-500 rounded-full mr-2"></span>
            Videos up to 1 hour in length
          </li>
          <li className="flex items-center text-gray-700">
            <span className="w-2 h-2 bg-indigo-500 rounded-full mr-2"></span>
            Secure and private processing
          </li>
        </ul>
      </div>
    </div>
  );
};

export default UploadArea;