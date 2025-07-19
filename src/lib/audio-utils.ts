
"use client";

function playSound(type: 'sine' | 'square' | 'sawtooth' | 'triangle', startFreq: number, endFreq: number, duration: number, startVol: number = 0.5) {
  if (typeof window === 'undefined' || !window.AudioContext) {
    return;
  }

  const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
  const oscillator = audioContext.createOscillator();
  const gainNode = audioContext.createGain();

  oscillator.type = type;
  oscillator.frequency.setValueAtTime(startFreq, audioContext.currentTime);
  oscillator.frequency.exponentialRampToValueAtTime(endFreq, audioContext.currentTime + duration * 0.7);

  gainNode.gain.setValueAtTime(startVol, audioContext.currentTime);
  gainNode.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + duration);

  oscillator.connect(gainNode);
  gainNode.connect(audioContext.destination);

  oscillator.start(audioContext.currentTime);
  oscillator.stop(audioContext.currentTime + duration);
}

// This function creates and plays a simple sound without needing an audio file.
export function playCorrectSound() {
  playSound('sine', 600, 900, 0.2);
}

export function playIncorrectSound() {
  playSound('sawtooth', 200, 100, 0.3);
}

export function playClickSound() {
  playSound('triangle', 440, 440, 0.05, 0.2);
}
