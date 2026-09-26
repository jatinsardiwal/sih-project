import { Language } from '../types';
import { SUPPORTED_LANGUAGES } from './i18n';

/**
 * Farmer Voice Assist Utility
 * Reads out crop prices and offers aloud in the selected native language using Web Speech API
 */
export const speakText = (text: string, lang: Language = 'hi') => {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
    return;
  }

  // Cancel any ongoing speech
  window.speechSynthesis.cancel();

  const langConfig = SUPPORTED_LANGUAGES.find((l) => l.code === lang);
  const speechCode = langConfig ? langConfig.speechCode : 'hi-IN';

  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = speechCode;
  utterance.rate = 0.95; // Slightly slower for clarity
  utterance.pitch = 1.0;

  window.speechSynthesis.speak(utterance);
};

export const stopSpeech = () => {
  if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
    window.speechSynthesis.cancel();
  }
};
