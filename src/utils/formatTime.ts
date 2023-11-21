export function formatTime(seconds: number): string {
  if (isNaN(seconds) || seconds < 0) {
    return "Invalid input";
  }

  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = Math.floor(seconds % 60);

  const formattedTime = `${minutes}m${remainingSeconds}s`;

  return formattedTime;
}
