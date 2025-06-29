export async function runSpeedTest() {
  try {
    const result = await window.electronAPI.runSpeedTest();
    const parsed = typeof result === 'string' ? JSON.parse(result) : result;

    return parsed;
  } catch (e) {
    console.error('Error running speed test:', e);
    return { error: e.toString() };
  }
}
