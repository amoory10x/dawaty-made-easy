
export interface Topic {
  id: string;
  title: string;
  content: string;
  category: string;
}

export const arabicTopics: Topic[] = [
  {
    id: 'shahada',
    title: 'الشهادة',
    content: 'أشهد أن لا إله إلا الله وأشهد أن محمداً رسول الله',
    category: 'أركان الإيمان'
  },
  {
    id: 'bismillah',
    title: 'البسملة',
    content: 'بسم الله الرحمن الرحيم',
    category: 'الأذكار'
  },
  {
    id: 'hamd',
    title: 'الحمد',
    content: 'الحمد لله رب العالمين',
    category: 'الأذكار'
  },
  {
    id: 'prayer-importance',
    title: 'أهمية الصلاة',
    content: 'الصلاة هي الركن الثاني من أركان الإسلام، وهي صلة بين العبد وربه، فرضها الله على المؤمنين خمس مرات في اليوم والليلة',
    category: 'العبادات'
  },
  {
    id: 'quran-guidance',
    title: 'القرآن هداية',
    content: 'القرآن الكريم هو كتاب الله المنزل على نبيه محمد صلى الله عليه وسلم، وهو هداية للناس أجمعين ونور يضيء طريق المؤمنين',
    category: 'القرآن'
  }
];

export const getTopicById = (id: string): Topic | undefined => {
  return arabicTopics.find(topic => topic.id === id);
};

export const getTopicsByCategory = (category: string): Topic[] => {
  return arabicTopics.filter(topic => topic.category === category);
};

export const getAllCategories = (): string[] => {
  return [...new Set(arabicTopics.map(topic => topic.category))];
};
