
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { BookOpen, Heart, Church } from 'lucide-react';
import { arabicTopics, getAllCategories, type Topic } from '@/data/topics';

interface TopicSelectorProps {
  onTopicSelect: (topic: Topic) => void;
}

const TopicSelector = ({ onTopicSelect }: TopicSelectorProps) => {
  const categories = getAllCategories();

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'أركان الإيمان':
        return <Heart className="w-5 h-5 text-red-600" />;
      case 'العبادات':
        return <Church className="w-5 h-5 text-green-600" />;
      case 'القرآن':
        return <BookOpen className="w-5 h-5 text-blue-600" />;
      default:
        return <BookOpen className="w-5 h-5 text-gray-600" />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-green-100 p-4">
      <div className="max-w-md mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-green-800 mb-2">
            دعوتي سهلة
          </h1>
          <p className="text-green-600">
            اختر موضوع الدعوة - Choose Da'wah Topic
          </p>
        </div>

        {/* Topics by Category */}
        <div className="space-y-6">
          {categories.map((category) => (
            <Card key={category} className="border-2 border-green-200">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2 text-lg text-green-800">
                  {getCategoryIcon(category)}
                  {category}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {arabicTopics
                  .filter(topic => topic.category === category)
                  .map((topic) => (
                    <Button
                      key={topic.id}
                      variant="outline"
                      className="w-full h-auto p-4 text-right border-green-300 hover:border-green-400 hover:bg-green-50"
                      onClick={() => onTopicSelect(topic)}
                    >
                      <div className="text-right w-full">
                        <div className="font-medium text-green-800 mb-1">
                          {topic.title}
                        </div>
                        <div className="text-sm text-green-600 line-clamp-2" dir="rtl">
                          {topic.content.length > 50 
                            ? topic.content.substring(0, 50) + '...'
                            : topic.content
                          }
                        </div>
                      </div>
                    </Button>
                  ))}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TopicSelector;
