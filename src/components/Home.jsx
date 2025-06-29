import { runSpeedTest } from '../api/speedTest';
import { useState } from 'react';

export default function Home() {
  const [result, setResult] = useState(null);

  const handleRunTest = async () => {
    const data = await runSpeedTest();
    setResult(data);
  };

  return (
    <div>
      <h1>Home</h1>
      <button onClick={handleRunTest}>Run Speed Test</button>
      {result && <pre>{JSON.stringify(result, null, 2)}</pre>}
    </div>
  );
}
