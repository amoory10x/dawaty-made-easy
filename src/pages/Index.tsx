
import { useState } from 'react';
import TopicSelector from '@/components/TopicSelector';
import LanguageSelector from '@/components/LanguageSelector';
import TranslatedContent from '@/components/TranslatedContent';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import type { Topic } from '@/data/topics';

type AppState = 'topic-selection' | 'language-selection' | 'content-display';

const Index = () => {
  const [currentState, setCurrentState] = useState<AppState>('topic-selection');
  const [selectedTopic, setSelectedTopic] = useState<Topic | null>(null);
  const [selectedLanguage, setSelectedLanguage] = useState<string>('ar');

  const handleTopicSelect = (topic: Topic) => {
    setSelectedTopic(topic);
    setCurrentState('language-selection');
  };

  const handleLanguageSelect = (languageCode: string) => {
    setSelectedLanguage(languageCode);
    setCurrentState('content-display');
  };

  const handleBackToTopics = () => {
    setSelectedTopic(null);
    setSelectedLanguage('ar');
    setCurrentState('topic-selection');
  };

  const handleBackToLanguages = () => {
    setCurrentState('language-selection');
  };

  // Topic Selection Screen
  if (currentState === 'topic-selection') {
    return <TopicSelector onTopicSelect={handleTopicSelect} />;
  }

  // Language Selection Screen
  if (currentState === 'language-selection' && selectedTopic) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-green-50 to-green-100 p-4">
        <div className="max-w-md mx-auto">
          {/* Header */}
          <div className="flex items-center gap-4 mb-6">
            <Button 
              variant="outline" 
              size="icon"
              onClick={handleBackToTopics}
              className="shrink-0"
            >
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <div className="text-center flex-1">
              <h2 className="text-lg font-bold text-green-800">
                اختر اللغة - Select Language
              </h2>
            </div>
          </div>

          {/* Selected Topic Preview */}
          <Card className="border-2 border-green-200 mb-6">
            <CardHeader className="text-center pb-3">
              <CardTitle className="text-green-800" dir="rtl">
                {selectedTopic.title}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-green-600 text-center" dir="rtl">
                {selectedTopic.content.length > 100 
                  ? selectedTopic.content.substring(0, 100) + '...'
                  : selectedTopic.content
                }
              </p>
            </CardContent>
          </Card>

          {/* Language Selector */}
          <Card className="border-2 border-green-200">
            <CardContent className="p-6">
              <LanguageSelector
                selectedLanguage={selectedLanguage}
                onLanguageChange={handleLanguageSelect}
              />
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  // Content Display Screen
  if (currentState === 'content-display' && selectedTopic) {
    return (
      <TranslatedContent
        topic={selectedTopic}
        selectedLanguage={selectedLanguage}
        onBack={handleBackToLanguages}
      />
    );
  }

  return null;
};

export default Index;
