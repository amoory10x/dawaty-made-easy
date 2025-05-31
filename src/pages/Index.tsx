
import { useState, useEffect } from "react";
import { Search, Heart, Play, Pause, Volume2, Key, Wifi, WifiOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import LanguageSelector from "@/components/LanguageSelector";
import { useAudio } from "@/hooks/useAudio";
import { getLanguageByCode } from "@/data/languages";

const Index = () => {
  const [selectedTopic, setSelectedTopic] = useState(null);
  const [selectedLanguage, setSelectedLanguage] = useState("ar");
  const [searchTerm, setSearchTerm] = useState("");
  const [favorites, setFavorites] = useState(new Set());
  const [apiKey, setApiKey] = useState("");
  const [showApiDialog, setShowApiDialog] = useState(false);
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  
  const { toast } = useToast();
  const { isPlaying, isLoading, playText, stopAudio, initializeAudioService } = useAudio({
    onError: (error) => toast({ title: "خطأ في الصوت", description: error, variant: "destructive" })
  });

  // Monitor online status
  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);
    
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  // Load API key from localStorage
  useEffect(() => {
    const savedApiKey = localStorage.getItem('elevenlabs_api_key');
    if (savedApiKey) {
      setApiKey(savedApiKey);
      initializeAudioService(savedApiKey);
    }
  }, [initializeAudioService]);

  const topics = [
    {
      id: 1,
      title: "ما هو الإسلام؟",
      category: "أساسيات",
      content: {
        ar: "الإسلام هو دين التوحيد الذي جاء به النبي محمد صلى الله عليه وسلم. وهو دين الاستسلام لله الواحد الأحد، والإيمان بأن لا إله إلا الله وأن محمداً رسول الله.",
        en: "Islam is the religion of monotheism brought by Prophet Muhammad (peace be upon him). It is the religion of submission to Allah, the One and Only, and believing that there is no god but Allah and Muhammad is His messenger.",
        fr: "L'Islam est la religion du monothéisme apportée par le Prophète Muhammad (paix sur lui). C'est la religion de la soumission à Allah, l'Unique, et croire qu'il n'y a de dieu qu'Allah et Muhammad est Son messager.",
        es: "El Islam es la religión del monoteísmo traída por el Profeta Muhammad (paz sea con él). Es la religión de sumisión a Allah, el Único, y creer que no hay dios sino Allah y Muhammad es Su mensajero.",
        ur: "اسلام توحید کا دین ہے جو نبی محمد صلی اللہ علیہ وسلم لائے۔ یہ اللہ واحد کے سامنے تسلیم ہونے کا دین ہے، اور یہ یقین رکھنا کہ اللہ کے سوا کوئی معبود نہیں اور محمد اللہ کے رسول ہیں۔",
        hi: "इस्लाम एकेश्वरवाद का धर्म है जो पैगंबर मुहम्मद (उन पर शांति हो) लाए थे। यह अल्लाह, एक और एकमात्र के सामने समर्पण का धर्म है, और यह विश्वास करना कि अल्लाह के सिवा कोई भगवान नहीं है और मुहम्मद उसके दूत हैं।"
      }
    },
    {
      id: 2,
      title: "أركان الإسلام الخمسة",
      category: "أساسيات",
      content: {
        ar: "أركان الإسلام خمسة: الشهادتان، وإقام الصلاة، وإيتاء الزكاة، وصوم رمضان، وحج البيت لمن استطاع إليه سبيلا.",
        en: "The Five Pillars of Islam are: The testimony of faith, establishing prayer, giving charity (Zakat), fasting in Ramadan, and Hajj pilgrimage for those who are able.",
        fr: "Les Cinq Piliers de l'Islam sont : Le témoignage de foi, l'établissement de la prière, le don de la charité (Zakat), le jeûne du Ramadan, et le pèlerinage du Hajj pour ceux qui en ont la capacité.",
        es: "Los Cinco Pilares del Islam son: El testimonio de fe, establecer la oración, dar caridad (Zakat), ayunar en Ramadán, y la peregrinación Hajj para aquellos que puedan.",
        ur: "اسلام کے پانچ رکن ہیں: شہادت، نماز قائم کرنا، زکوٰۃ دینا، رمضان کا روزہ، اور استطاعت رکھنے والوں کے لیے حج۔",
        hi: "इस्लाम के पांच स्तंभ हैं: विश्वास की गवाही, नमाज़ की स्थापना, दान (ज़कात) देना, रमज़ान का रोज़ा, और सक्षम लोगों के लिए हज तीर्थयात्रा।"
      }
    },
    {
      id: 3,
      title: "محمد رسول الله",
      category: "السيرة",
      content: {
        ar: "محمد صلى الله عليه وسلم هو خاتم الأنبياء والمرسلين، أرسله الله رحمة للعالمين. وُلد في مكة المكرمة وبُعث بالرسالة في سن الأربعين.",
        en: "Muhammad (peace be upon him) is the final Prophet and Messenger, sent by Allah as a mercy to all worlds. He was born in Mecca and received his mission at the age of forty.",
        fr: "Muhammad (paix sur lui) est le dernier Prophète et Messager, envoyé par Allah comme miséricorde pour tous les mondes. Il est né à La Mecque et a reçu sa mission à l'âge de quarante ans.",
        es: "Muhammad (paz sea con él) es el último Profeta y Mensajero, enviado por Allah como misericordia para todos los mundos. Nació en La Meca y recibió su misión a los cuarenta años.",
        ur: "محمد صلی اللہ علیہ وسلم آخری نبی اور رسول ہیں، جنہیں اللہ نے تمام جہانوں کے لیے رحمت بنا کر بھیجا۔ آپ مکہ میں پیدا ہوئے اور چالیس سال کی عمر میں نبوت ملی۔",
        hi: "मुहम्मद (उन पर शांति हो) अंतिम पैगंबर और दूत हैं, जिन्हें अल्लाह ने सभी संसारों के लिए दया के रूप में भेजा। वे मक्का में पैदा हुए और चालीस साल की उम्र में उन्हें अपना संदेश मिला।"
      }
    },
    {
      id: 4,
      title: "القرآن الكريم",
      category: "القرآن",
      content: {
        ar: "القرآن الكريم هو كلام الله المنزل على نبيه محمد صلى الله عليه وسلم، وهو آخر الكتب السماوية. محفوظ من التحريف والتبديل إلى يوم الدين.",
        en: "The Holy Quran is the word of Allah revealed to His Prophet Muhammad (peace be upon him), and it is the final heavenly book. It is preserved from corruption and alteration until the Day of Judgment.",
        fr: "Le Saint Coran est la parole d'Allah révélée à Son Prophète Muhammad (paix sur lui), et c'est le dernier livre céleste. Il est préservé de la corruption et de l'altération jusqu'au Jour du Jugement.",
        es: "El Santo Corán es la palabra de Allah revelada a Su Profeta Muhammad (paz sea con él), y es el último libro celestial. Está preservado de la corrupción y alteración hasta el Día del Juicio.",
        ur: "قرآن کریم اللہ کا کلام ہے جو اس کے نبی محمد صلی اللہ علیہ وسلم پر نازل ہوا، اور یہ آخری آسمانی کتاب ہے۔ یہ قیامت تک تحریف اور تبدیلی سے محفوظ ہے۔",
        hi: "पवित्र क़ुरान अल्लाह का वचन है जो उसके पैगंबर मुहम्मद (उन पर शांति हो) पर उतारा गया, और यह अंतिम स्वर्गीय पुस्तक है। यह न्याय के दिन तक भ्रष्टाचार और परिवर्तन से संरक्षित है।"
      }
    },
    {
      id: 5,
      title: "السلام والرحمة في الإسلام",
      category: "أخلاق",
      content: {
        ar: "الإسلام دين السلام والرحمة. اسم 'الإسلام' مشتق من السلام، والمسلم هو من سلم الناس من لسانه ويده. يدعو الإسلام إلى العدل والرحمة مع جميع الناس.",
        en: "Islam is a religion of peace and mercy. The name 'Islam' is derived from peace, and a Muslim is one from whose tongue and hand people are safe. Islam calls for justice and mercy with all people.",
        fr: "L'Islam est une religion de paix et de miséricorde. Le nom 'Islam' dérive de la paix, et un musulman est celui dont la langue et la main ne causent pas de mal aux gens. L'Islam appelle à la justice et à la miséricorde envers tous.",
        es: "El Islam es una religión de paz y misericordia. El nombre 'Islam' deriva de la paz, y un musulmán es aquel de cuya lengua y mano la gente está a salvo. El Islam llama a la justicia y misericordia con todas las personas.",
        ur: "اسلام امن اور رحمت کا دین ہے۔ 'اسلام' کا نام سلامتی سے آیا ہے، اور مسلمان وہ ہے جس کی زبان اور ہاتھ سے لوگ محفوظ ہیں۔ اسلام تمام لوگوں کے ساتھ انصاف اور رحمت کی دعوت دیتا ہے۔",
        hi: "इस्लाम शांति और दया का धर्म है। 'इस्लाम' नाम शांति से लिया गया है, और मुस्लिम वह है जिसकी जुबान और हाथ से लोग सुरक्षित हैं। इस्लाम सभी लोगों के साथ न्याय और दया का आह्वान करता है।"
      }
    }
  ];

  const categories = [...new Set(topics.map(topic => topic.category))];

  const filteredTopics = topics.filter(topic =>
    topic.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    topic.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const toggleFavorite = (topicId) => {
    const newFavorites = new Set(favorites);
    if (newFavorites.has(topicId)) {
      newFavorites.delete(topicId);
    } else {
      newFavorites.add(topicId);
    }
    setFavorites(newFavorites);
  };

  const handleTopicSelect = (topic) => {
    setSelectedTopic(topic);
    stopAudio();
  };

  const handleSaveApiKey = () => {
    if (apiKey.trim()) {
      localStorage.setItem('elevenlabs_api_key', apiKey);
      initializeAudioService(apiKey);
      setShowApiDialog(false);
      toast({ title: "تم الحفظ", description: "تم حفظ مفتاح API بنجاح" });
    }
  };

  const handlePlayAudio = () => {
    if (!apiKey) {
      setShowApiDialog(true);
      return;
    }

    if (isPlaying) {
      stopAudio();
    } else if (selectedTopic) {
      const content = selectedTopic.content[selectedLanguage] || selectedTopic.content.ar;
      playText(content, selectedLanguage);
    }
  };

  const selectedLang = getLanguageByCode(selectedLanguage);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100">
      {/* Header */}
      <header className="bg-gradient-to-r from-green-600 to-emerald-700 text-white shadow-lg">
        <div className="container mx-auto px-4 py-6">
          <div className="text-center">
            <h1 className="text-3xl font-bold mb-2">دعوة إلى الإسلام</h1>
            <p className="text-green-100 text-lg">تطبيق الدعوة التفاعلي - Interactive Da'wah App</p>
            <div className="flex items-center justify-center gap-4 mt-3">
              <Badge variant={isOnline ? "default" : "destructive"} className="flex items-center gap-1">
                {isOnline ? <Wifi className="h-3 w-3" /> : <WifiOff className="h-3 w-3" />}
                {isOnline ? "متصل" : "غير متصل"}
              </Badge>
              <Dialog open={showApiDialog} onOpenChange={setShowApiDialog}>
                <DialogTrigger asChild>
                  <Button variant="outline" size="sm" className="border-white text-white hover:bg-white/10">
                    <Key className="h-4 w-4 mr-2" />
                    إعداد الصوت
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>إعداد مفتاح ElevenLabs API</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4">
                    <p className="text-sm text-gray-600">
                      لتفعيل ميزة الصوت، يرجى إدخال مفتاح API الخاص بك من ElevenLabs
                    </p>
                    <Input
                      type="password"
                      placeholder="أدخل مفتاح API"
                      value={apiKey}
                      onChange={(e) => setApiKey(e.target.value)}
                    />
                    <Button onClick={handleSaveApiKey} className="w-full">
                      حفظ المفتاح
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Topics Section */}
          <div className="space-y-6">
            {/* Search and Filters */}
            <Card className="border-green-200 shadow-md">
              <CardHeader className="pb-4">
                <CardTitle className="text-green-800 flex items-center gap-2">
                  <Search className="h-5 w-5" />
                  البحث في المواضيع
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <Input
                    placeholder="ابحث عن موضوع..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="border-green-300 focus:border-green-500"
                  />
                  <div className="flex flex-wrap gap-2">
                    {categories.map((category) => (
                      <Badge
                        key={category}
                        variant="outline"
                        className="border-green-300 text-green-700 hover:bg-green-50 cursor-pointer"
                      >
                        {category}
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Topics List */}
            <div className="space-y-4">
              {filteredTopics.map((topic) => (
                <Card
                  key={topic.id}
                  className={`cursor-pointer transition-all hover:shadow-lg border-2 topic-card ${
                    selectedTopic?.id === topic.id
                      ? "border-green-500 bg-green-50"
                      : "border-green-200 hover:border-green-300"
                  }`}
                  onClick={() => handleTopicSelect(topic)}
                >
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-green-800 mb-1">
                          {topic.title}
                        </h3>
                        <Badge variant="secondary" className="bg-green-100 text-green-700">
                          {topic.category}
                        </Badge>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleFavorite(topic.id);
                        }}
                        className={`ml-2 ${
                          favorites.has(topic.id)
                            ? "text-red-500 hover:text-red-600"
                            : "text-gray-400 hover:text-red-500"
                        }`}
                      >
                        <Heart className={`h-5 w-5 ${favorites.has(topic.id) ? "fill-current" : ""}`} />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Content Display Section */}
          <div className="space-y-6">
            {selectedTopic ? (
              <>
                {/* Language Selector */}
                <Card className="border-amber-200 shadow-md">
                  <CardHeader className="pb-4">
                    <CardTitle className="text-amber-800 flex items-center gap-2">
                      <Volume2 className="h-5 w-5" />
                      اختر اللغة - Choose Language
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <LanguageSelector 
                      selectedLanguage={selectedLanguage}
                      onLanguageChange={setSelectedLanguage}
                    />
                  </CardContent>
                </Card>

                {/* Content Display */}
                <Card className="border-blue-200 shadow-md">
                  <CardHeader>
                    <CardTitle className="text-blue-800 text-xl">
                      {selectedTopic.title}
                    </CardTitle>
                    {selectedLang && (
                      <Badge className="bg-blue-100 text-blue-700 w-fit">
                        {selectedLang.name} - {selectedLang.nativeName}
                      </Badge>
                    )}
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <p className="text-gray-700 leading-relaxed text-lg" dir="auto">
                        {selectedTopic.content[selectedLanguage] || selectedTopic.content.ar}
                      </p>
                      
                      {/* Audio Controls */}
                      <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg audio-controls">
                        <Button
                          onClick={handlePlayAudio}
                          disabled={isLoading}
                          className={`flex items-center gap-2 ${
                            isPlaying
                              ? "bg-red-500 hover:bg-red-600"
                              : "bg-green-500 hover:bg-green-600"
                          } ${isLoading ? "opacity-50" : ""}`}
                        >
                          {isLoading ? (
                            <>
                              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                              جاري التحميل...
                            </>
                          ) : isPlaying ? (
                            <>
                              <Pause className="h-4 w-4" />
                              إيقاف
                            </>
                          ) : (
                            <>
                              <Play className="h-4 w-4" />
                              تشغيل الصوت
                            </>
                          )}
                        </Button>
                        <span className="text-sm text-gray-600">
                          {isLoading 
                            ? "جاري تحضير الصوت..." 
                            : isPlaying 
                              ? "جاري التشغيل..." 
                              : "اضغط لتشغيل الصوت"}
                        </span>
                        {!isOnline && (
                          <Badge variant="outline" className="text-orange-600 border-orange-300">
                            وضع عدم الاتصال
                          </Badge>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </>
            ) : (
              <Card className="border-gray-200 shadow-md">
                <CardContent className="p-12 text-center">
                  <div className="text-gray-400 mb-4">
                    <Search className="h-16 w-16 mx-auto mb-4" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-600 mb-2">
                    اختر موضوعاً من القائمة
                  </h3>
                  <p className="text-gray-500">
                    اختر أي موضوع من المواضيع المتاحة لعرض المحتوى والصوت
                  </p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-green-800 text-white py-6 mt-12">
        <div className="container mx-auto px-4 text-center">
          <p className="text-green-200">
            بارك الله فيكم - May Allah bless you all
          </p>
          <p className="text-sm text-green-300 mt-2">
            تطبيق دعوة تفاعلي لنشر رسالة الإسلام السمحة
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
