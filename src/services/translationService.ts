
export interface TranslationService {
  translateText(text: string, targetLanguage: string): Promise<string>;
}

class GoogleTranslateService implements TranslationService {
  private apiKey: string;
  
  constructor(apiKey: string) {
    this.apiKey = apiKey;
  }

  async translateText(text: string, targetLanguage: string): Promise<string> {
    try {
      const response = await fetch(
        `https://translation.googleapis.com/language/translate/v2?key=${this.apiKey}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            q: text,
            target: targetLanguage,
            source: 'ar',
            format: 'text'
          }),
        }
      );

      if (!response.ok) {
        throw new Error('Translation failed');
      }

      const data = await response.json();
      return data.data.translations[0].translatedText;
    } catch (error) {
      console.error('Translation error:', error);
      // Fallback: return original text if translation fails
      return text;
    }
  }
}

// Simple fallback translator for development
class FallbackTranslationService implements TranslationService {
  async translateText(text: string, targetLanguage: string): Promise<string> {
    // This is a simple fallback - in production you'd use a real translation service
    const translations: Record<string, Record<string, string>> = {
      'en': {
        'بسم الله الرحمن الرحيم': 'In the name of Allah, the Most Gracious, the Most Merciful',
        'الحمد لله رب العالمين': 'All praise is due to Allah, Lord of all the worlds',
        'أشهد أن لا إله إلا الله وأشهد أن محمداً رسول الله': 'I bear witness that there is no deity except Allah, and I bear witness that Muhammad is the Messenger of Allah'
      },
      'fr': {
        'بسم الله الرحمن الرحيم': 'Au nom d\'Allah, le Tout Miséricordieux, le Très Miséricordieux',
        'الحمد لله رب العالمين': 'Louange à Allah, Seigneur de l\'univers',
        'أشهد أن لا إله إلا الله وأشهد أن محمداً رسول الله': 'J\'atteste qu\'il n\'y a de divinité qu\'Allah et j\'atteste que Muhammad est le Messager d\'Allah'
      }
    };

    return translations[targetLanguage]?.[text] || text;
  }
}

export { GoogleTranslateService, FallbackTranslationService };
