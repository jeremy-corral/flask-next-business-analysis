"use client"

import { useState } from 'react';
import logo from '../assets/strai-logo.png';
import Link from 'next/link';
import Image from 'next/image';

const BrandValueForm = () => {
  const [url, setUrl] = useState('');
  const [csvFile, setCsvFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false); // State variable for loading state

  const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUrl(e.target.value);
  };

  const handleCsvFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0];
    if (file) {
      setCsvFile(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Ensure both URL and CSV file are provided
    if (!url || !csvFile) {
      alert('Please provide both the URL and upload a CSV file');
      return;
    }

    // Set loading state to true
    setLoading(true);

    // Prepare form data
    const formData = new FormData();
    formData.append('url', url);
    formData.append('csv', csvFile);

    try {
      // Send POST request to your API endpoint
      const response = await fetch('http://127.0.0.1:5000/api/insights', {
        method: 'POST',
        body: formData
      });

      // Handle response
      if (response.ok) {
        // Handle successful response
        alert('Download request sent successfully');
      } else {
        // Handle error response
        //alert('Failed to send download request');
      }
    } catch (error) {
      // Handle network error
      console.error('Error:', error);
      alert('Failed to send download request');
    } finally {
      // Set loading state back to false
      setLoading(false);
    }
  };

  return (
    <div className="flex bg-black flex-col h-screen justify-between overflow-y-hidden">
      <div className="flex bg-black items-center flex-row justify-between relative">
        <Link href="/">
          <Image className="p-2" src={logo} alt="Logo" width={100} height={100} />
        </Link>
        <Link href="/chat">
          <button
            className="px-6 py-1 m-4 font-bold bg-gradient-to-b from-skyblue to-blue-400 text-white rounded-full hover:bg-blue-400 transition-colors duration-500 ease-in-out focus:outline-none focus:bg-gray-600 inline-block transform hover:scale-105"
          >
            Chat
          </button>
        </Link>
      </div>
      <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-black to-gray-500">
        <div className="mx-auto p-4 justify-center items-center bg-white rounded-lg shadow-md">
          <h2 className="text-xl font-bold mb-4">Generate Brand Value & Insights</h2>
          <h4 className="text-sm italic mb-10">We'll create a brand value document for your business with data visualizations!</h4>
          <form onSubmit={handleSubmit}>
            <div className="mb-8">
              <label htmlFor="url" className="block text-gray-700 font-bold mb-2 text-left">Website URL:</label>
              <input type="text" id="url" value={url} onChange={handleUrlChange} className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500" />
            </div>
            <div className="mb-8">
              <label htmlFor="csv" className="block text-gray-700 font-bold mb-2 text-left">Upload CSV:</label>
              <input type="file" id="csv" accept=".csv" onChange={handleCsvFileChange} className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500" />
            </div>
            <div className="flex justify-center">
              <button type="submit" className={`bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 ${loading ? 'cursor-not-allowed opacity-50' : ''}`} disabled={loading}>
                {loading ? 'Loading...' : 'Download'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default BrandValueForm;
