import { useState } from 'react';
import axios from 'axios';

export default function App() {
  const [file, setFile] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);


  const API_URL = 'http://localhost:/api/analyze'; 

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!file) return;

    setLoading(true);
    const formData = new FormData();
    formData.append('resume', file);

    try {
      const response = await axios.post(API_URL, formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      setResult(response.data);
    } catch (error) {
      console.error(error);
      alert('Error analyzing resume');
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8 font-sans">
      <div className="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold mb-4 text-gray-800">AI Resume Analyzer</h1>
        
        <form onSubmit={handleUpload} className="mb-6">
          <input 
            type="file" 
            accept=".pdf" 
            onChange={(e) => setFile(e.target.files[0])}
            className="mb-4 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
          />
          <button 
            type="submit" 
            disabled={loading}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:bg-blue-300"
          >
            {loading ? 'Analyzing...' : 'Analyze Resume'}
          </button>
        </form>

        {result && (
          <div className="border-t pt-4">
            <h2 className="text-xl font-semibold mb-2">Results</h2>
            <p><strong>Name:</strong> {result.name}</p>
            <p><strong>Email:</strong> {result.email}</p>
            <p><strong>Score:</strong> {result.score}/100</p>
            <div className="mt-2">
              <strong>Skills:</strong>
              <div className="flex flex-wrap gap-2 mt-1">
                {result.skills.map(skill => (
                  <span key={skill} className="bg-gray-200 px-2 py-1 rounded text-sm">{skill}</span>
                ))}
              </div>
            </div>
            <p className="mt-4"><strong>Feedback:</strong> {result.feedback}</p>
          </div>
        )}
      </div>
    </div>
  );
}
