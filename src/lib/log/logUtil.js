async function getLogPath() {
  console.log('Some Directory');
}

export async function parseNewLogLines() {
  const logPath = await getLogPath();
  console.log('placeholder for now.', logPath);
}
