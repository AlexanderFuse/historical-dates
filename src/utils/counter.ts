export const counter = (
  start: number,
  end: number,
  duration: number,
  callback: (value: number) => void,
) => {
  const startTime = Date.now();
  const endTime = startTime + duration;
  const range = end - start;

  function updateCounter() {
    const currentTime = Date.now();
    const elapsedTime = currentTime - startTime;

    function easeInOut(t: number) {
      return t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
    }

    if (currentTime >= endTime) {
      callback(end);
    } else {
      const progress = elapsedTime / duration;
      const easedProgress = easeInOut(progress);
      const currentNumber = start + range * easedProgress;
      callback(Math.round(currentNumber)); // Округляем до целого числа
      requestAnimationFrame(updateCounter);
    }
  }

  updateCounter();
};
