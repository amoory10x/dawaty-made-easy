
interface AudioServiceConfig {
  apiKey: string;
}

class AudioService {
  private apiKey: string;
  private audioCache: Map<string, string> = new Map();
  private currentAudio: HTMLAudioElement | null = null;

  constructor(config: AudioServiceConfig) {
    this.apiKey = config.apiKey;
  }

  private getCacheKey(text: string, languageCode: string, voiceId: string): string {
    return `${text}-${languageCode}-${voiceId}`;
  }

  private getVoiceIdForLanguage(languageCode: string): string {
    // Map languages to appropriate ElevenLabs voices
    const voiceMapping: { [key: string]: string } = {
      'ar': '9BWtsMINqrJLrRacOk9x', // Aria
      'en': 'EXAVITQu4vr4xnSDxMaL', // Sarah
      'fr': 'XB0fDUnXU5powFXDhCwa', // Charlotte
      'es': 'IKne3meq5aSn9XLyUdCD', // Charlie
      'de': 'N2lVS1w4EtoT3dr4eOWO', // Callum
      'it': 'XrExE9yKIg1WjnnlVkGX', // Matilda
      'pt': 'TX3LPaxmHKxFdv7VOQHJ', // Liam
      'ru': 'CwhRBWXzGAHq8TQ4Fs17', // Roger
      'zh': 'SAz9YHcvj6GT2YYXdXww', // River
      'ja': 'bIHbv24MWmeRgasZH58o', // Will
      'ko': 'iP95p4xoKVk53GoZ742B', // Chris
      'hi': 'cgSgspJ2msm6clMCkdW9', // Jessica
      'ur': 'pFZP5JQG7iQjIQuC4Bku', // Lily
      'tr': 'cjVigY5qzO86Huf0OWal', // Eric
      'fa': 'onwK4e9ZLuTAKqWW03F9', // Daniel
    };

    return voiceMapping[languageCode.split('-')[0]] || '9BWtsMINqrJLrRacOk9x'; // Default to Aria
  }

  async generateSpeech(text: string, languageCode: string): Promise<string> {
    const voiceId = this.getVoiceIdForLanguage(languageCode);
    const cacheKey = this.getCacheKey(text, languageCode, voiceId);

    // Check cache first
    if (this.audioCache.has(cacheKey)) {
      return this.audioCache.get(cacheKey)!;
    }

    try {
      const response = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${voiceId}`, {
        method: 'POST',
        headers: {
          'Accept': 'audio/mpeg',
          'Content-Type': 'application/json',
          'xi-api-key': this.apiKey,
        },
        body: JSON.stringify({
          text: text,
          model_id: 'eleven_multilingual_v2',
          voice_settings: {
            stability: 0.5,
            similarity_boost: 0.5,
          },
        }),
      });

      if (!response.ok) {
        throw new Error(`ElevenLabs API error: ${response.status}`);
      }

      const audioBlob = await response.blob();
      const audioUrl = URL.createObjectURL(audioBlob);
      
      // Cache the audio URL
      this.audioCache.set(cacheKey, audioUrl);
      
      return audioUrl;
    } catch (error) {
      console.error('Error generating speech:', error);
      throw new Error('فشل في توليد الصوت - Failed to generate audio');
    }
  }

  async playAudio(audioUrl: string): Promise<void> {
    return new Promise((resolve, reject) => {
      try {
        // Stop current audio if playing
        this.stopAudio();

        this.currentAudio = new Audio(audioUrl);
        this.currentAudio.onended = () => resolve();
        this.currentAudio.onerror = () => reject(new Error('Audio playback failed'));
        this.currentAudio.play();
      } catch (error) {
        reject(error);
      }
    });
  }

  stopAudio(): void {
    if (this.currentAudio) {
      this.currentAudio.pause();
      this.currentAudio.currentTime = 0;
      this.currentAudio = null;
    }
  }

  isPlaying(): boolean {
    return this.currentAudio && !this.currentAudio.paused;
  }

  // Offline functionality - save audio to local storage
  async saveAudioForOffline(text: string, languageCode: string): Promise<void> {
    try {
      const audioUrl = await this.generateSpeech(text, languageCode);
      const response = await fetch(audioUrl);
      const arrayBuffer = await response.arrayBuffer();
      const base64Audio = btoa(String.fromCharCode(...new Uint8Array(arrayBuffer)));
      
      const cacheKey = this.getCacheKey(text, languageCode, this.getVoiceIdForLanguage(languageCode));
      localStorage.setItem(`audio_${cacheKey}`, base64Audio);
      
      console.log('Audio saved for offline use');
    } catch (error) {
      console.error('Failed to save audio for offline:', error);
    }
  }

  getOfflineAudio(text: string, languageCode: string): string | null {
    const voiceId = this.getVoiceIdForLanguage(languageCode);
    const cacheKey = this.getCacheKey(text, languageCode, voiceId);
    const savedAudio = localStorage.getItem(`audio_${cacheKey}`);
    
    if (savedAudio) {
      const audioBlob = new Blob([Uint8Array.from(atob(savedAudio), c => c.charCodeAt(0))], { type: 'audio/mpeg' });
      return URL.createObjectURL(audioBlob);
    }
    
    return null;
  }
}

export default AudioService;
