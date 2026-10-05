// Web Speech API wrapper for hands-free cooking assistant
export const speechHelper = {
  isSupported: () => 'speechSynthesis' in window,

  speak: (text, onEnd) => {
    if (!('speechSynthesis' in window)) return;

    window.speechSynthesis.cancel(); // Stop any ongoing speech

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 0.95; // Slightly slower, clear kitchen pace
    utterance.pitch = 1.0;

    // Try finding an Indian English voice if available, otherwise default
    const voices = window.speechSynthesis.getVoices();
    const indianVoice = voices.find(v => v.lang.includes('en-IN') || v.name.includes('India'));
    if (indianVoice) {
      utterance.voice = indianVoice;
    }

    if (onEnd) {
      utterance.onend = onEnd;
      utterance.onerror = onEnd;
    }

    window.speechSynthesis.speak(utterance);
  },

  stop: () => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
  }
};
