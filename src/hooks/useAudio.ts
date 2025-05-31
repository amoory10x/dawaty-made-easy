
import { useState, useCallback, useRef } from 'react';
import AudioService from '@/services/audioService';

interface UseAudioOptions {
  apiKey?: string;
  onError?: (error: string) => void;
}

export const useAudio = (options: UseAudioOptions = {}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const audioServiceRef = useRef<AudioService | null>(null);

  const initializeAudioService = useCallback((apiKey: string) => {
    audioServiceRef.current = new AudioService({ apiKey });
  }, []);

  const playText = useCallback(async (text: string, languageCode: string) => {
    if (!audioServiceRef.current) {
      options.onError?.('مطلوب مفتاح API من ElevenLabs - ElevenLabs API key required');
      return;
    }

    try {
      setIsLoading(true);
      
      // Try offline audio first
      let audioUrl = audioServiceRef.current.getOfflineAudio(text, languageCode);
      
      // If not available offline, generate online
      if (!audioUrl) {
        audioUrl = await audioServiceRef.current.generateSpeech(text, languageCode);
        // Save for offline use
        audioServiceRef.current.saveAudioForOffline(text, languageCode);
      }

      setIsPlaying(true);
      await audioServiceRef.current.playAudio(audioUrl);
      setIsPlaying(false);
    } catch (error) {
      console.error('Error playing audio:', error);
      options.onError?.(error instanceof Error ? error.message : 'خطأ في تشغيل الصوت');
      setIsPlaying(false);
    } finally {
      setIsLoading(false);
    }
  }, [options]);

  const stopAudio = useCallback(() => {
    if (audioServiceRef.current) {
      audioServiceRef.current.stopAudio();
      setIsPlaying(false);
    }
  }, []);

  return {
    isPlaying,
    isLoading,
    playText,
    stopAudio,
    initializeAudioService,
  };
};
