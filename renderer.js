const runTestBtn = document.getElementById('runTest');
const output = document.getElementById('output');

runTestBtn.addEventListener('click', async () => {
  output.textContent = 'Running test...';
  try {
    const result = await window.electronAPI.runSpeedTest();
    output.textContent = result;

    // Optional: upload result
    await fetch('https://your-backend.com/api/upload', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(JSON.parse(result)),
    });
  } catch (err) {
    output.textContent = 'Error: ' + err;
  }
});
