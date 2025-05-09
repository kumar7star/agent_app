import React, { useState, useRef } from 'react';

function MainContent() {
  const [selectedTask, setSelectedTask] = useState(null);
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [uploadResult, setUploadResult] = useState(null);
  const [error, setError] = useState(null);
  const fileInputRef = useRef(null);

  const taskOptions = [
    {
      title: 'Create a new proposal',
      description: 'for your existing client',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
        </svg>
      )
    },
    {
      title: 'Create a RFP',
      description: 'for an upcoming project',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      )
    },
    {
      title: 'Make development plan',
      description: 'for your next project',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
        </svg>
      )
    },
    {
      title: 'Write technical documentation',
      description: 'for a software project',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
        </svg>
      )
    },
    {
      title: 'Draft a blog post for your website',
      description: 'focused on a specific topic',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z" />
        </svg>
      )
    },
    {
      title: 'Assign team members',
      description: 'to a project based on their availability',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      )
    }
  ];

  const handleTaskSelect = (index) => {
    setSelectedTask(index);
    setFile(null);
    setUploadResult(null);
    setError(null);
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
      setError(null);
    }
  };

  const handleFileUpload = async () => {
    if (!file) {
      setError('Please select a file first');
      return;
    }

    setUploading(true);
    setError(null);
    
    try {
      const formData = new FormData();
      formData.append('file', file);

      const response = await fetch('http://localhost:5000/api/upload', {
        method: 'POST',
        body: formData,
      });

      const result = await response.json();
      
      if (!response.ok) {
        throw new Error(result.error || 'Failed to upload file');
      }

      setUploadResult(result);
      setFile(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    } catch (err) {
      setError(err.message || 'An error occurred during upload');
    } finally {
      setUploading(false);
    }
  };

  const handleBack = () => {
    setSelectedTask(null);
    setFile(null);
    setUploadResult(null);
    setError(null);
  };

  // Task selection screen
  if (selectedTask === null) {
    return (
      <div className="flex flex-col items-center justify-center h-full p-8">
        <div className="mb-8 flex flex-col items-center">
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center mb-4">
            <div className="w-12 h-12 rounded-full bg-gray-900 flex items-center justify-center">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-400 to-purple-500"></div>
            </div>
          </div>
          <h1 className="text-2xl font-semibold mt-4">What you want to do today?</h1>
        </div>
        
        <div className="grid grid-cols-2 gap-4 w-full max-w-3xl">
          {taskOptions.map((option, index) => (
            <button 
              key={index}
              className="bg-gray-800 hover:bg-gray-700 rounded-lg p-4 text-left transition-colors"
              onClick={() => handleTaskSelect(index)}
            >
              <h3 className="font-medium text-lg">{option.title}</h3>
              <p className="text-gray-400 text-sm mt-1">{option.description}</p>
            </button>
          ))}
        </div>
      </div>
    );
  }

  // Create a new proposal screen with file upload
  if (selectedTask === 0) {
    return (
      <div className="flex flex-col h-full p-8">
        <button 
          onClick={handleBack}
          className="flex items-center text-blue-400 hover:text-blue-300 mb-6"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
          </svg>
          Back
        </button>

        <div className="bg-gray-800 rounded-lg p-6 max-w-3xl mx-auto w-full">
          <h2 className="text-xl font-semibold mb-6">Create a new proposal</h2>
          
          <div className="mb-6">
            <label className="block text-sm font-medium mb-2">Upload Files</label>
            <div className="flex flex-col space-y-4">
              <div className="flex items-center">
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  className="block w-full text-sm text-gray-400
                    file:mr-4 file:py-2 file:px-4
                    file:rounded-md file:border-0
                    file:text-sm file:font-medium
                    file:bg-blue-500 file:text-white
                    hover:file:bg-blue-600"
                />
              </div>
              
              {file && (
                <div className="flex items-center justify-between bg-gray-700 p-3 rounded">
                  <span className="text-sm truncate max-w-xs">{file.name}</span>
                  <span className="text-xs text-gray-400">{(file.size / 1024).toFixed(2)} KB</span>
                </div>
              )}
              
              <button
                onClick={handleFileUpload}
                disabled={!file || uploading}
                className={`py-2 px-4 rounded-md text-white font-medium ${
                  !file || uploading
                    ? 'bg-gray-600 cursor-not-allowed'
                    : 'bg-blue-500 hover:bg-blue-600'
                }`}
              >
                {uploading ? 'Uploading...' : 'Upload File'}
              </button>
              
              {error && (
                <div className="text-red-500 text-sm mt-2">{error}</div>
              )}
              
              {uploadResult && (
                <div className="bg-green-800 bg-opacity-20 border border-green-600 text-green-400 p-3 rounded">
                  <p className="font-medium">File uploaded successfully!</p>
                  <p className="text-sm mt-1">
                    File: {uploadResult.file.originalname} ({(uploadResult.file.size / 1024).toFixed(2)} KB)
                  </p>
                  <p className="text-sm">
                    Path: {uploadResult.file.path}
                  </p>
                </div>
              )}
            </div>
          </div>
          
          {/* Additional form fields for the proposal would go here */}
        </div>
      </div>
    );
  }

  // Other task screens would go here
  return (
    <div className="flex flex-col h-full p-8">
      <button 
        onClick={handleBack}
        className="flex items-center text-blue-400 hover:text-blue-300 mb-6"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
        </svg>
        Back
      </button>

      <div className="bg-gray-800 rounded-lg p-6 max-w-3xl mx-auto w-full">
        <h2 className="text-xl font-semibold mb-6">{taskOptions[selectedTask].title}</h2>
        <p>This feature is coming soon.</p>
      </div>
    </div>
  );
}

export default MainContent;
