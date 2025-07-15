
"use client";

// This function creates and plays a simple sound without needing an audio file.
export function playCorrectSound() {
  // Ensure this code only runs in the browser
  if (typeof window === 'undefined' || !window.AudioContext) {
    return;
  }

  const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
  
  // Create an oscillator node for the sound wave
  const oscillator = audioContext.createOscillator();
  // Create a gain node to control the volume
  const gainNode = audioContext.createGain();

  // Configure the sound
  oscillator.type = 'sine'; // A smooth, clean tone
  oscillator.frequency.setValueAtTime(600, audioContext.currentTime); // Start pitch
  oscillator.frequency.exponentialRampToValueAtTime(900, audioContext.currentTime + 0.05); // Rise in pitch

  // Configure the volume envelope to make it sound like a "pluck"
  gainNode.gain.setValueAtTime(0.5, audioContext.currentTime);
  gainNode.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + 0.2);

  // Connect the nodes: oscillator -> gain -> destination (speakers)
  oscillator.connect(gainNode);
  gainNode.connect(audioContext.destination);

  // Play the sound
  oscillator.start(audioContext.currentTime);
  // Stop the sound after a short duration
  oscillator.stop(audioContext.currentTime + 0.2);
}
