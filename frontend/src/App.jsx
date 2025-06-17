import { useState } from 'react';
import './App.css';
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer
} from 'recharts';

function App() {
  const [text, setText] = useState('');
  const [lang, setLang] = useState('id');
  const [result, setResult] = useState([]);
  const [loading, setLoading] = useState(false);

  const emotionLabels = {
    joy: 'Senang',
    anger: 'Marah',
    sadness: 'Sedih',
    fear: 'Takut',
    love: 'Cinta',
    surprise: 'Terkejut',
    neutral: 'Netral',
    disgust: 'Jijik'
  };

  const mapLabel = (label) => {
    return lang === 'id' ? (emotionLabels[label] || label) : label;
  };

  const handleSubmit = async () => {
    if (!text.trim()) return;
    setLoading(true);
    const res = await fetch('http://localhost:8000/predict', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text, lang })
    });
    const data = await res.json();
    setResult(data.emotions);
    setLoading(false);
  };

  return (
    <div style={{
      maxWidth: 700,
      margin: '2rem auto',
      fontFamily: 'sans-serif',
      textAlign: 'center'
    }}>
      <h2>💬 Deteksi Emosi dari Komentar</h2>

      <div style={{ marginBottom: '1rem' }}>
        <label htmlFor="lang">Pilih Bahasa:</label>{' '}
        <select id="lang" value={lang} onChange={(e) => setLang(e.target.value)}>
          <option value="id">Indonesia</option>
          <option value="en">English</option>
        </select>
      </div>

      <textarea
        rows="4"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Masukkan komentar di sini..."
        style={{ width: '100%', padding: '0.5rem', textAlign: 'left' }}
      />

      <button
        onClick={handleSubmit}
        disabled={loading}
        style={{
          marginTop: '1rem',
          padding: '0.5rem 1rem',
          backgroundColor: '#4CAF50',
          color: 'white',
          border: 'none',
          cursor: 'pointer'
        }}>
        {loading ? 'Mendeteksi...' : 'Deteksi Emosi'}
      </button>

      {result.length > 0 && (
        <div style={{ marginTop: '2rem' }}>
          <h4>Hasil Deteksi (Tabel):</h4>
          {result.map((r) => (
            <div key={r.label}>
              <strong>{mapLabel(r.label)}</strong>: {(r.score * 100).toFixed(2)}%
            </div>
          ))}

          <h4 style={{ marginTop: '2rem' }}>Visualisasi Emosi:</h4>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={result
              .sort((a, b) => b.score - a.score)
              .slice(0, 3)
              .map(r => ({
                ...r,
                score: r.score * 100,
                label: mapLabel(r.label)
              }))}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="label" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="score" fill="#4CAF50" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
}

export default App;
