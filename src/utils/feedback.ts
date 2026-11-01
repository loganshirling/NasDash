/** A very short synthetic mechanical "clack" using built-in Web Audio. */
let audioContext: AudioContext | null = null;

export function playClickSound() {
  try {
    audioContext ??= new AudioContext();
    if (audioContext.state === 'suspended') void audioContext.resume();

    const now = audioContext.currentTime;
    const oscillator = audioContext.createOscillator();
    const volume = audioContext.createGain();

    oscillator.type = 'triangle';
    oscillator.frequency.setValueAtTime(210, now);
    oscillator.frequency.exponentialRampToValueAtTime(70, now + 0.055);

    volume.gain.setValueAtTime(0.001, now);
    volume.gain.exponentialRampToValueAtTime(0.11, now + 0.003);
    volume.gain.exponentialRampToValueAtTime(0.001, now + 0.065);

    oscillator.connect(volume);
    volume.connect(audioContext.destination);
    oscillator.start(now);
    oscillator.stop(now + 0.07);
  } catch {
    // Audio may be unavailable or disabled. Launching still works.
  }
}

/** Android browsers commonly support this; unsupported browsers silently ignore it. */
export function vibrateOnPress() {
  if ('vibrate' in navigator) navigator.vibrate(18);
}
