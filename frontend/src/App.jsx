import { useState } from 'react';
import axios from 'axios';
import { API_BASE } from './config/api';

export default function App() {
  const [files, setFiles] = useState([]);
  const [pdfUrl, setPdfUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const onFiles = (e) => {
    setFiles(e.target.files);
    setPdfUrl('');
    setError('');
  };

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setPdfUrl('');

    const form = new FormData();
    for (let i = 0; i < files.length; i++) {
      form.append('images', files[i]);
    }

    try {
      const res = await axios.post(`${API_BASE}/api/convert`, form, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      setPdfUrl(`${API_BASE}${res.data.downloadUrl}`);
    } catch (err) {
      setError(err?.response?.data?.error || 'Conversion failed.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-6">
      <h1 className="text-3xl font-bold mt-10 mb-4">Image → PDF Converter</h1>

      <p className="text-gray-600 mb-8 text-center">
        Select up to 10 images (PNG/JPG). We’ll merge them into a single PDF.
      </p>

      <form onSubmit={submit} className="bg-white w-full max-w-xl p-6 rounded-xl shadow">
        <label className="block font-medium mb-2">Images</label>
        <input
          type="file"
          multiple
          accept="image/*"
          onChange={onFiles}
          className="mb-4 w-full"
        />

        <button
          type="submit"
          disabled={loading || !files?.length}
          className="px-5 py-2 rounded-lg bg-blue-600 text-white font-semibold disabled:opacity-50"
        >
          {loading ? 'Converting…' : 'Convert to PDF'}
        </button>

        {error && <p className="text-red-600 mt-4">{error}</p>}

        {pdfUrl && (
          <div className="mt-6">
            <p className="font-semibold mb-2">Your PDF is ready:</p>
            <a
              href={pdfUrl}
              target="_blank"
              rel="noreferrer"
              className="text-blue-700 underline break-all"
            >
              {pdfUrl}
            </a>
          </div>
        )}
      </form>

      <footer className="mt-10 text-xs text-gray-500">
        Built with React, Tailwind, Axios · Backend: Node + Express + Multer + PDFKit
      </footer>
    </div>
  );
}
