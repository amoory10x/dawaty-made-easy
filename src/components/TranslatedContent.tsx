
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Play, Pause, Volume2, ArrowLeft, Square } from 'lucide-react';
import { useAudio } from '@/hooks/useAudio';
import { FallbackTranslationService } from '@/services/translationService';
import { getLanguageByCode } from '@/data/languages';
import type { Topic } from '@/data/topics';

interface TranslatedContentProps {
  topic: Topic;
  selectedLanguage: string;
  onBack: () => void;
}

const TranslatedContent = ({ topic, selectedLanguage, onBack }: TranslatedContentProps) => {
  const [translatedContent, setTranslatedContent] = useState<string>('');
  const [isTranslating, setIsTranslating] = useState(false);
  const { isPlaying, isLoading, playText, stopAudio } = useAudio({
    onError: (error) => console.error('Audio error:', error)
  });

  const selectedLang = getLanguageByCode(selectedLanguage);
  const translationService = new FallbackTranslationService();

  useEffect(() => {
    const translateContent = async () => {
      if (selectedLanguage === 'ar') {
        setTranslatedContent(topic.content);
        return;
      }

      setIsTranslating(true);
      try {
        const translated = await translationService.translateText(topic.content, selectedLanguage);
        setTranslatedContent(translated);
      } catch (error) {
        console.error('Translation failed:', error);
        setTranslatedContent(topic.content);
      } finally {
        setIsTranslating(false);
      }
    };

    translateContent();
  }, [topic.content, selectedLanguage]);

  const handlePlayAudio = () => {
    if (isPlaying) {
      stopAudio();
    } else {
      playText(translatedContent, selectedLanguage);
    }
  };

  const handleStopAudio = () => {
    stopAudio();
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-green-100 p-4">
      <div className="max-w-md mx-auto space-y-4">
        {/* Header */}
        <div className="flex items-center gap-4 mb-6">
          <Button 
            variant="outline" 
            size="icon"
            onClick={onBack}
            className="shrink-0"
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div className="flex items-center gap-2">
            <span className="text-lg">{selectedLang?.flag}</span>
            <span className="font-medium">{selectedLang?.name}</span>
          </div>
        </div>

        {/* Topic Card */}
        <Card className="border-2 border-green-200">
          <CardHeader className="text-center">
            <CardTitle className="text-xl text-green-800" dir="auto">
              {topic.title}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Content */}
            <div className="text-center p-6 bg-green-50 rounded-lg">
              {isTranslating ? (
                <div className="text-gray-600">جاري الترجمة... Translating...</div>
              ) : (
                <p 
                  className="text-lg leading-relaxed text-green-900"
                  dir={selectedLanguage === 'ar' ? 'rtl' : 'ltr'}
                >
                  {translatedContent}
                </p>
              )}
            </div>

            {/* Audio Controls */}
            <div className="flex justify-center gap-3">
              <Button
                onClick={handlePlayAudio}
                disabled={isLoading || isTranslating}
                className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 text-lg"
                size="lg"
              >
                {isLoading ? (
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white" />
                ) : isPlaying ? (
                  <>
                    <Pause className="w-5 h-5 mr-2" />
                    إيقاف مؤقت
                  </>
                ) : (
                  <>
                    <Volume2 className="w-5 h-5 mr-2" />
                    استمع
                  </>
                )}
              </Button>

              {isPlaying && (
                <Button
                  onClick={handleStopAudio}
                  variant="destructive"
                  className="px-6 py-3 text-lg"
                  size="lg"
                >
                  <Square className="w-5 h-5 mr-2" />
                  إيقاف
                </Button>
              )}
            </div>

            {/* Original Arabic (if different language selected) */}
            {selectedLanguage !== 'ar' && (
              <div className="mt-6 p-4 bg-amber-50 rounded-lg border border-amber-200">
                <h4 className="text-sm font-medium text-amber-800 mb-2">النص الأصلي - Original Arabic:</h4>
                <p className="text-amber-900" dir="rtl">
                  {topic.content}
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default TranslatedContent;
