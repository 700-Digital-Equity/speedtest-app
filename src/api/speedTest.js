export async function runSpeedTest() {
  try {
    const result = await window.electronAPI.runSpeedTest();
    return result;
  } catch (e) {
    console.error('Error running speed test:', e);
    return { error: e.toString() };
  }
}
