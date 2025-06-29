import { runSpeedTest } from '../api/speedTest';
import { useState } from 'react';

export default function Home() {
  const [results, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleRunTest = async () => {
    setLoading(true);
    try {
      const data = await runSpeedTest();
      setResult(data);
    } catch (error) {
      console.error('Error running speed test:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>Welcome!</h1>    
      <button className="start-button" onClick={handleRunTest} disabled={loading}>
      {loading ? 'Running...' : 'Run Speed Test'}
      </button>
      {results && (
      <div>
          <p>Download Speed: {results.download} MB/s</p>
          <p>Upload Speed: {results.upload} MB/s</p>
          <p>Packet Loss: {results.packet_loss}%</p>
          <p>Average Ping: {results.avg_ping} ms</p>
      </div>
      )}
    </div>
  );
}
