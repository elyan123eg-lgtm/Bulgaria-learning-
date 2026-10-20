export interface DictionaryEntry {
  id: number;
  bg: string;
  en: string;
  partOfSpeech: 'noun (m)' | 'noun (f)' | 'noun (n)' | 'verb (I)' | 'verb (II)' | 'verb (III)' | 'adjective' | 'adverb' | 'preposition' | 'pronoun' | 'expression';
  category: 'Greetings' | 'Food & Drinks' | 'Travel & City' | 'Home & Family' | 'Health & Body' | 'Work & Office' | 'Nature & Animals' | 'Grammar & Numbers' | 'Shopping & Money';
  sampleBg?: string;
  sampleEn?: string;
  sourceBook?: 'practice_book' | 'core_2000';
  sourceTitle?: string;
}

export const BULGARIAN_DICTIONARY: DictionaryEntry[] = [
  // А
  { id: 1, bg: 'август', en: 'August', partOfSpeech: 'noun (m)', category: 'Grammar & Numbers', sampleBg: 'През август отиваме на море.', sampleEn: 'In August we go to the sea.' },
  { id: 2, bg: 'автобус', en: 'bus, coach', partOfSpeech: 'noun (m)', category: 'Travel & City', sampleBg: 'Автобусът тръгва в девет часа.', sampleEn: 'The bus leaves at 9 o\'clock.' },
  { id: 3, bg: 'автомат', en: 'vending machine, automat', partOfSpeech: 'noun (m)', category: 'Work & Office', sampleBg: 'Купувам напитка от автомата.', sampleEn: 'I buy a drink from the vending machine.' },
  { id: 4, bg: 'адрес', en: 'address', partOfSpeech: 'noun (m)', category: 'Travel & City', sampleBg: 'Знаеш ли адреса си?', sampleEn: 'Do you know your address?' },
  { id: 5, bg: 'актьор / актриса', en: 'actor / actress', partOfSpeech: 'noun (m)', category: 'Work & Office', sampleBg: 'Петър е актьор в Пловдивския театър.', sampleEn: 'Petar is an actor in Plovdiv theater.' },
  { id: 6, bg: 'албум', en: 'album', partOfSpeech: 'noun (m)', category: 'Home & Family', sampleBg: 'Това е моят семеен албум.', sampleEn: 'This is my family album.' },
  { id: 7, bg: 'алея', en: 'lane, path, vista', partOfSpeech: 'noun (f)', category: 'Travel & City', sampleBg: 'Вървя по цветната алея в парка.', sampleEn: 'I walk along the flower lane in the park.' },
  { id: 8, bg: 'апартамент', en: 'apartment, flat', partOfSpeech: 'noun (m)', category: 'Home & Family', sampleBg: 'Живея в просторен апартамент.', sampleEn: 'I live in a spacious apartment.' },
  { id: 9, bg: 'апетит', en: 'appetite', partOfSpeech: 'noun (m)', category: 'Food & Drinks', sampleBg: 'Добър апетит!', sampleEn: 'Bon appétit!' },
  { id: 10, bg: 'аптека', en: 'pharmacy, drugstore', partOfSpeech: 'noun (f)', category: 'Health & Body', sampleBg: 'Купувам лекарство от аптеката.', sampleEn: 'I buy medicine from the pharmacy.' },

  // Б
  { id: 11, bg: 'баба', en: 'grandmother, granny', partOfSpeech: 'noun (f)', category: 'Home & Family', sampleBg: 'Баба прави вкусна баница.', sampleEn: 'Grandmother bakes delicious banitsa.' },
  { id: 12, bg: 'баница', en: 'banitsa (cheese filo pie)', partOfSpeech: 'noun (f)', category: 'Food & Drinks', sampleBg: 'На Нова година правим баница с късмети.', sampleEn: 'On New Year we make banitsa with lucky charms.' },
  { id: 13, bg: 'баня', en: 'bathroom, bath', partOfSpeech: 'noun (f)', category: 'Home & Family', sampleBg: 'Взимам душ в банята.', sampleEn: 'I take a shower in the bathroom.' },
  { id: 14, bg: 'баща', en: 'father, dad', partOfSpeech: 'noun (m)', category: 'Home & Family', sampleBg: 'Баща ми чете вестник.', sampleEn: 'My father reads a newspaper.' },
  { id: 15, bg: 'бебе', en: 'baby, infant', partOfSpeech: 'noun (n)', category: 'Home & Family', sampleBg: 'Бебето спи спокойно в леглото.', sampleEn: 'The baby sleeps peacefully in bed.' },
  { id: 16, bg: 'билет', en: 'ticket, fare', partOfSpeech: 'noun (m)', category: 'Travel & City', sampleBg: 'Трябва да перфорираш билета.', sampleEn: 'You must validate the ticket.' },
  { id: 17, bg: 'бистро', en: 'bistro', partOfSpeech: 'noun (n)', category: 'Food & Drinks', sampleBg: 'Сядаме в кварталното бистро.', sampleEn: 'We sit in the neighborhood bistro.' },
  { id: 18, bg: 'благодаря', en: 'thank you, thanks', partOfSpeech: 'expression', category: 'Greetings', sampleBg: 'Благодаря, много добре.', sampleEn: 'Thank you, very well.' },
  { id: 19, bg: 'болен', en: 'sick, ill', partOfSpeech: 'adjective', category: 'Health & Body', sampleBg: 'Днес съм болен и лежа вкъщи.', sampleEn: 'Today I am ill and resting at home.' },
  { id: 20, bg: 'боли ме', en: 'it hurts me', partOfSpeech: 'expression', category: 'Health & Body', sampleBg: 'Боли ме гърлото.', sampleEn: 'My throat hurts.' },
  { id: 21, bg: 'ботуши', en: 'boots', partOfSpeech: 'noun (m)', category: 'Shopping & Money', sampleBg: 'Нося топли ботуши през зимата.', sampleEn: 'I wear warm boots in winter.' },
  { id: 22, bg: 'брат', en: 'brother', partOfSpeech: 'noun (m)', category: 'Home & Family', sampleBg: 'Моят брат учи в университета.', sampleEn: 'My brother studies at the university.' },
  { id: 23, bg: 'булевард', en: 'boulevard', partOfSpeech: 'noun (m)', category: 'Travel & City', sampleBg: 'Разхождам се по булевард Витоша.', sampleEn: 'I stroll along Vitosha Boulevard.' },
  { id: 24, bg: 'бърз / бързо', en: 'fast, quick / quickly', partOfSpeech: 'adjective', category: 'Travel & City', sampleBg: 'Метрото е много бързо.', sampleEn: 'The subway is very fast.' },

  // В
  { id: 25, bg: 'ваканция', en: 'vacation, holiday', partOfSpeech: 'noun (f)', category: 'Travel & City', sampleBg: 'През ваканцията ходя на планина.', sampleEn: 'During vacation I go to the mountains.' },
  { id: 26, bg: 'вали', en: 'it is raining / snowing', partOfSpeech: 'verb (II)', category: 'Nature & Animals', sampleBg: 'Навън вали студен дъжд.', sampleEn: 'Cold rain is falling outside.' },
  { id: 27, bg: 'валута', en: 'currency', partOfSpeech: 'noun (f)', category: 'Shopping & Money', sampleBg: 'В обменното бюро сменям валута.', sampleEn: 'At the exchange bureau I exchange currency.' },
  { id: 28, bg: 'вечер', en: 'evening', partOfSpeech: 'noun (f)', category: 'Grammar & Numbers', sampleBg: 'Добър вечер, скъпи приятели!', sampleEn: 'Good evening, dear friends!' },
  { id: 29, bg: 'вечерям', en: 'to have dinner', partOfSpeech: 'verb (III)', category: 'Food & Drinks', sampleBg: 'Вечеряме в осем часа.', sampleEn: 'We have dinner at 8 o\'clock.' },
  { id: 30, bg: 'взимам / взема', en: 'to take, to get', partOfSpeech: 'verb (III)', category: 'Travel & City', sampleBg: 'Взимам такси до гарата.', sampleEn: 'I take a taxi to the station.' },
  { id: 31, bg: 'виждам / видя', en: 'to see', partOfSpeech: 'verb (III)', category: 'Grammar & Numbers', sampleBg: 'Радвам се да те видя!', sampleEn: 'Glad to see you!' },
  { id: 32, bg: 'вилица', en: 'fork', partOfSpeech: 'noun (f)', category: 'Food & Drinks', sampleBg: 'Сервитьорът донесе вилица и нож.', sampleEn: 'The waiter brought a fork and knife.' },
  { id: 33, bg: 'вино', en: 'wine', partOfSpeech: 'noun (n)', category: 'Food & Drinks', sampleBg: 'Българското червено вино е прочуто.', sampleEn: 'Bulgarian red wine is famous.' },
  { id: 34, bg: 'висок', en: 'tall, high', partOfSpeech: 'adjective', category: 'Grammar & Numbers', sampleBg: 'Мусала е най-високият връх.', sampleEn: 'Musala is the highest peak.' },
  { id: 35, bg: 'вода', en: 'water', partOfSpeech: 'noun (f)', category: 'Food & Drinks', sampleBg: 'Една чаша минерална вода, моля.', sampleEn: 'A glass of mineral water, please.' },
  { id: 36, bg: 'време', en: 'weather / time', partOfSpeech: 'noun (n)', category: 'Nature & Animals', sampleBg: 'Днес времето е слънчево и тихо.', sampleEn: 'Today the weather is sunny and calm.' },
  { id: 37, bg: 'вървя', en: 'to walk, to go', partOfSpeech: 'verb (II)', category: 'Travel & City', sampleBg: 'Вървете направо по улицата.', sampleEn: 'Walk straight down the street.' },

  // Г
  { id: 38, bg: 'гараж', en: 'garage', partOfSpeech: 'noun (m)', category: 'Home & Family', sampleBg: 'Колата е паркирана в гаража.', sampleEn: 'The car is parked in the garage.' },
  { id: 39, bg: 'глава', en: 'head', partOfSpeech: 'noun (f)', category: 'Health & Body', sampleBg: 'Боли ме главата от умора.', sampleEn: 'My head aches from tiredness.' },
  { id: 40, bg: 'гладен', en: 'hungry', partOfSpeech: 'adjective', category: 'Food & Drinks', sampleBg: 'Много съм гладен, хайде да обядваме!', sampleEn: 'I am very hungry, let\'s have lunch!' },
  { id: 41, bg: 'гледам', en: 'to watch, to look', partOfSpeech: 'verb (III)', category: 'Home & Family', sampleBg: 'Гледаме телевизия вечер.', sampleEn: 'We watch TV in the evening.' },
  { id: 42, bg: 'говоря', en: 'to speak, to talk', partOfSpeech: 'verb (II)', category: 'Grammar & Numbers', sampleBg: 'Говоря малко български.', sampleEn: 'I speak a little Bulgarian.' },
  { id: 43, bg: 'година', en: 'year', partOfSpeech: 'noun (f)', category: 'Grammar & Numbers', sampleBg: 'Честита Нова Година!', sampleEn: 'Happy New Year!' },
  { id: 44, bg: 'голям', en: 'big, large, great', partOfSpeech: 'adjective', category: 'Grammar & Numbers', sampleBg: 'София е голям град.', sampleEn: 'Sofia is a big city.' },
  { id: 45, bg: 'горе', en: 'up, upstairs, above', partOfSpeech: 'adverb', category: 'Travel & City', sampleBg: 'Спалнята се намира горе.', sampleEn: 'The bedroom is located upstairs.' },
  { id: 46, bg: 'горещ', en: 'hot', partOfSpeech: 'adjective', category: 'Food & Drinks', sampleBg: 'Пия горещ чай с мед.', sampleEn: 'I drink hot tea with honey.' },
  { id: 47, bg: 'готвя', en: 'to cook', partOfSpeech: 'verb (II)', category: 'Food & Drinks', sampleBg: 'Обичам сама да готвя у дома.', sampleEn: 'I like to cook at home myself.' },
  { id: 48, bg: 'град', en: 'town, city', partOfSpeech: 'noun (m)', category: 'Travel & City', sampleBg: 'Пловдив е красив древен град.', sampleEn: 'Plovdiv is a beautiful ancient city.' },
  { id: 49, bg: 'градина', en: 'garden', partOfSpeech: 'noun (f)', category: 'Home & Family', sampleBg: 'В градината растат рози.', sampleEn: 'Roses grow in the garden.' },
  { id: 50, bg: 'гъби', en: 'mushrooms', partOfSpeech: 'noun (f)', category: 'Food & Drinks', sampleBg: 'Поръчах омлет с гъби.', sampleEn: 'I ordered an omelette with mushrooms.' },

  // Д
  { id: 51, bg: 'да', en: 'yes / to (infinitive particle)', partOfSpeech: 'expression', category: 'Greetings', sampleBg: 'Да, разбира се.', sampleEn: 'Yes, of course.' },
  { id: 52, bg: 'дай / дайте', en: 'give (imperative)', partOfSpeech: 'verb (I)', category: 'Greetings', sampleBg: 'Дай ми хляба, моля.', sampleEn: 'Give me the bread, please.' },
  { id: 53, bg: 'далече', en: 'far, away', partOfSpeech: 'adverb', category: 'Travel & City', sampleBg: 'Музеят не е далече оттук.', sampleEn: 'The museum is not far from here.' },
  { id: 54, bg: 'ден', en: 'day', partOfSpeech: 'noun (m)', category: 'Grammar & Numbers', sampleBg: 'Желая ви хубав ден!', sampleEn: 'I wish you a nice day!' },
  { id: 55, bg: 'дете / деца', en: 'child / children', partOfSpeech: 'noun (n)', category: 'Home & Family', sampleBg: 'Децата играят навън.', sampleEn: 'The children play outside.' },
  { id: 56, bg: 'директор', en: 'director, principal, manager', partOfSpeech: 'noun (m)', category: 'Work & Office', sampleBg: 'Г-н Милев е директор на училището.', sampleEn: 'Mr. Milev is the school director.' },
  { id: 57, bg: 'днес', en: 'today', partOfSpeech: 'adverb', category: 'Grammar & Numbers', sampleBg: 'Днес имам изпит по български.', sampleEn: 'Today I have an exam in Bulgarian.' },
  { id: 58, bg: 'добре', en: 'well, fine, good, alright', partOfSpeech: 'adverb', category: 'Greetings', sampleBg: 'Всичко е наред, благодаря.', sampleEn: 'Everything is fine, thank you.' },
  { id: 59, bg: 'добър / добра / добро / добри', en: 'good, kind', partOfSpeech: 'adjective', category: 'Greetings', sampleBg: 'Добро утро! Добър ден! Добър вечер!', sampleEn: 'Good morning! Good day! Good evening!' },
  { id: 60, bg: 'довиждане', en: 'good-bye', partOfSpeech: 'expression', category: 'Greetings', sampleBg: 'Довиждане, до скоро!', sampleEn: 'Good-bye, see you soon!' },
  { id: 61, bg: 'долу', en: 'down, downstairs, below', partOfSpeech: 'adverb', category: 'Travel & City', sampleBg: 'Слизаме долу в хола.', sampleEn: 'We go downstairs to the living room.' },
  { id: 62, bg: 'домат', en: 'tomato', partOfSpeech: 'noun (m)', category: 'Food & Drinks', sampleBg: 'Салатата се прави с пресни домати.', sampleEn: 'The salad is made with fresh tomatoes.' },
  { id: 63, bg: 'дом', en: 'home, house', partOfSpeech: 'noun (m)', category: 'Home & Family', sampleBg: 'Добре дошли в нашия дом!', sampleEn: 'Welcome to our home!' },
  { id: 64, bg: 'дрехи', en: 'clothes, clothing', partOfSpeech: 'noun (f)', category: 'Shopping & Money', sampleBg: 'Обличам чисти дрехи.', sampleEn: 'I put on clean clothes.' },
  { id: 65, bg: 'дъжд', en: 'rain', partOfSpeech: 'noun (m)', category: 'Nature & Animals', sampleBg: 'Летният дъжд е топъл.', sampleEn: 'Summer rain is warm.' },
  { id: 66, bg: 'дъщеря', en: 'daughter', partOfSpeech: 'noun (f)', category: 'Home & Family', sampleBg: 'Тяхната дъщеря е студентка.', sampleEn: 'Their daughter is a university student.' },
  { id: 67, bg: 'дядо', en: 'grandfather', partOfSpeech: 'noun (m)', category: 'Home & Family', sampleBg: 'Дядо ми разказва приказки.', sampleEn: 'My grandfather tells fairy tales.' },
  { id: 68, bg: 'дясно', en: 'right (direction)', partOfSpeech: 'adverb', category: 'Travel & City', sampleBg: 'Завийте вдясно след светофара.', sampleEn: 'Turn right after the traffic light.' },

  // Е
  { id: 69, bg: 'евтин', en: 'cheap, inexpensive', partOfSpeech: 'adjective', category: 'Shopping & Money', sampleBg: 'Този магазин продава евтини стоки.', sampleEn: 'This shop sells inexpensive goods.' },
  { id: 70, bg: 'един / една / едно / едни', en: 'one (m/f/n/pl)', partOfSpeech: 'pronoun', category: 'Grammar & Numbers', sampleBg: 'Имам едно дете и две кучета.', sampleEn: 'I have one child and two dogs.' },
  { id: 71, bg: 'език', en: 'language / tongue', partOfSpeech: 'noun (m)', category: 'Grammar & Numbers', sampleBg: 'Българският език е красив.', sampleEn: 'The Bulgarian language is beautiful.' },
  { id: 72, bg: 'екскурзия', en: 'excursion, trip, tour', partOfSpeech: 'noun (f)', category: 'Travel & City', sampleBg: 'Отиваме на екскурзия до Рилския манастир.', sampleEn: 'We go on a trip to the Rila Monastery.' },
  { id: 73, bg: 'есен', en: 'autumn, fall', partOfSpeech: 'noun (f)', category: 'Nature & Animals', sampleBg: 'През есента листата капят.', sampleEn: 'In autumn the leaves fall.' },
  { id: 74, bg: 'етаж', en: 'floor, storey', partOfSpeech: 'noun (m)', category: 'Home & Family', sampleBg: 'Живея на четвъртия етаж.', sampleEn: 'I live on the fourth floor.' },

  // Ж
  { id: 75, bg: 'жена', en: 'woman, wife', partOfSpeech: 'noun (f)', category: 'Home & Family', sampleBg: 'Жената чете книга.', sampleEn: 'The woman is reading a book.' },
  { id: 76, bg: 'женен / омъжена', en: 'married (man / woman)', partOfSpeech: 'adjective', category: 'Home & Family', sampleBg: 'Той е женен от 5 години.', sampleEn: 'He has been married for 5 years.' },
  { id: 77, bg: 'живея', en: 'to live, to reside', partOfSpeech: 'verb (I)', category: 'Home & Family', sampleBg: 'Живея в София на ул. Раковски.', sampleEn: 'I live in Sofia on Rakovski Street.' },
  { id: 78, bg: 'живот', en: 'life', partOfSpeech: 'noun (m)', category: 'Grammar & Numbers', sampleBg: 'Животът е кратък, изкуството - вечно.', sampleEn: 'Life is short, art is long.' },
  { id: 79, bg: 'животно', en: 'animal', partOfSpeech: 'noun (n)', category: 'Nature & Animals', sampleBg: 'Обичам домашните животни.', sampleEn: 'I love pets / domestic animals.' },

  // З
  { id: 80, bg: 'забравям / забравя', en: 'to forget', partOfSpeech: 'verb (III)', category: 'Grammar & Numbers', sampleBg: 'Не забравяй да се обадиш!', sampleEn: 'Don\'t forget to call!' },
  { id: 81, bg: 'завивам / завия', en: 'to turn (direction)', partOfSpeech: 'verb (III)', category: 'Travel & City', sampleBg: 'Завийте наляво на ъгъла.', sampleEn: 'Turn left at the corner.' },
  { id: 82, bg: 'закусвам / закуся', en: 'to have breakfast', partOfSpeech: 'verb (III)', category: 'Food & Drinks', sampleBg: 'Закусвам препечени филийки с мед.', sampleEn: 'I eat toasted bread with honey for breakfast.' },
  { id: 83, bg: 'заминавам / замина', en: 'to leave, to depart', partOfSpeech: 'verb (III)', category: 'Travel & City', sampleBg: 'Влакът заминава в десет часа.', sampleEn: 'The train departs at 10 o\'clock.' },
  { id: 84, bg: 'заповядай / заповядайте', en: 'please, here you are, come in', partOfSpeech: 'expression', category: 'Greetings', sampleBg: 'Заповядайте във фирмата!', sampleEn: 'Welcome into the company!' },
  { id: 85, bg: 'започвам / започна', en: 'to begin, to start', partOfSpeech: 'verb (III)', category: 'Grammar & Numbers', sampleBg: 'Урокът започва точно сега.', sampleEn: 'The lesson starts right now.' },
  { id: 86, bg: 'затварям / затворя', en: 'to close, to shut', partOfSpeech: 'verb (III)', category: 'Shopping & Money', sampleBg: 'Магазинът затваря в седем часа.', sampleEn: 'The shop closes at 7 o\'clock.' },
  { id: 87, bg: 'здравей / здравейте', en: 'hello / greetings', partOfSpeech: 'expression', category: 'Greetings', sampleBg: 'Здравейте, колеги!', sampleEn: 'Hello, colleagues!' },
  { id: 88, bg: 'зеле', en: 'cabbage', partOfSpeech: 'noun (n)', category: 'Food & Drinks', sampleBg: 'През зимата правим салата от кисело зеле.', sampleEn: 'In winter we make sauerkraut salad.' },
  { id: 89, bg: 'зелен', en: 'green', partOfSpeech: 'adjective', category: 'Nature & Animals', sampleBg: 'Тя има красиви зелени очи.', sampleEn: 'She has beautiful green eyes.' },
  { id: 90, bg: 'зеленчуци', en: 'vegetables', partOfSpeech: 'noun (m)', category: 'Food & Drinks', sampleBg: 'Купувам пресни плодове и зеленчуци.', sampleEn: 'I buy fresh fruits and vegetables.' },
  { id: 91, bg: 'зима', en: 'winter', partOfSpeech: 'noun (f)', category: 'Nature & Animals', sampleBg: 'Зимата в България е студена и снежна.', sampleEn: 'Winter in Bulgaria is cold and snowy.' },
  { id: 92, bg: 'знам / зная', en: 'to know', partOfSpeech: 'verb (I)', category: 'Grammar & Numbers', sampleBg: 'Знаеш ли къде е спирката?', sampleEn: 'Do you know where the stop is?' },
  { id: 93, bg: 'зъб / зъби', en: 'tooth / teeth', partOfSpeech: 'noun (m)', category: 'Health & Body', sampleBg: 'Мия си зъбите сутрин и вечер.', sampleEn: 'I brush my teeth morning and evening.' },

  // И
  { id: 94, bg: 'играя', en: 'to play', partOfSpeech: 'verb (I)', category: 'Nature & Animals', sampleBg: 'Децата играят футбол.', sampleEn: 'The kids play soccer.' },
  { id: 95, bg: 'идват / идвам', en: 'to come, to arrive', partOfSpeech: 'verb (III)', category: 'Travel & City', sampleBg: 'Гостите идват в седем часа.', sampleEn: 'The guests arrive at 7 o\'clock.' },
  { id: 96, bg: 'извинете', en: 'excuse me, pardon me', partOfSpeech: 'expression', category: 'Greetings', sampleBg: 'Извинете, колко е часът?', sampleEn: 'Excuse me, what time is it?' },
  { id: 97, bg: 'излизам / изляза', en: 'to exit, to go out', partOfSpeech: 'verb (III)', category: 'Travel & City', sampleBg: 'Излизам от офиса.', sampleEn: 'I am leaving the office.' },
  { id: 98, bg: 'изпит', en: 'exam, examination', partOfSpeech: 'noun (m)', category: 'Work & Office', sampleBg: 'Студентите имат изпит в сряда.', sampleEn: 'Students have an exam on Wednesday.' },
  { id: 99, bg: 'искам', en: 'to want, to wish', partOfSpeech: 'verb (III)', category: 'Grammar & Numbers', sampleBg: 'Искам да науча български.', sampleEn: 'I want to learn Bulgarian.' },
  { id: 100, bg: 'история', en: 'history / story', partOfSpeech: 'noun (f)', category: 'Grammar & Numbers', sampleBg: 'България има древна история.', sampleEn: 'Bulgaria has ancient history.' },

  // К
  { id: 101, bg: 'календар', en: 'calendar', partOfSpeech: 'noun (m)', category: 'Grammar & Numbers', sampleBg: 'В календара има дванайсет месеца.', sampleEn: 'There are twelve months in the calendar.' },
  { id: 102, bg: 'карта', en: 'map / transport card', partOfSpeech: 'noun (f)', category: 'Travel & City', sampleBg: 'Купих карта на град София.', sampleEn: 'I bought a map of Sofia city.' },
  { id: 103, bg: 'картофи', en: 'potatoes', partOfSpeech: 'noun (m)', category: 'Food & Drinks', sampleBg: 'Обичам пържени картофи със сирене.', sampleEn: 'I like French fries with white cheese.' },
  { id: 104, bg: 'кафе', en: 'coffee', partOfSpeech: 'noun (n)', category: 'Food & Drinks', sampleBg: 'Всяка сутрин пия кафе без захар.', sampleEn: 'Every morning I drink coffee without sugar.' },
  { id: 105, bg: 'кашкавал', en: 'kashkaval (yellow cheese)', partOfSpeech: 'noun (m)', category: 'Food & Drinks', sampleBg: 'Топла принцеса с кашкавал.', sampleEn: 'Warm toasted bread with yellow cheese.' },
  { id: 106, bg: 'кебапче', en: 'grilled minced meat sausage', partOfSpeech: 'noun (n)', category: 'Food & Drinks', sampleBg: 'Поръчах три кебапчета и салата.', sampleEn: 'I ordered three kebapcheta and salad.' },
  { id: 107, bg: 'кисело мляко', en: 'yogurt', partOfSpeech: 'noun (n)', category: 'Food & Drinks', sampleBg: 'Българското кисело мляко е най-вкусно.', sampleEn: 'Bulgarian yogurt is the most delicious.' },
  { id: 108, bg: 'книга', en: 'book', partOfSpeech: 'noun (f)', category: 'Grammar & Numbers', sampleBg: 'Чета интересна книга.', sampleEn: 'I am reading an interesting book.' },
  { id: 109, bg: 'книжарница', en: 'bookshop', partOfSpeech: 'noun (f)', category: 'Shopping & Money', sampleBg: 'Купувам речник от книжарницата.', sampleEn: 'I buy a dictionary from the bookshop.' },
  { id: 110, bg: 'кола', en: 'car, automobile', partOfSpeech: 'noun (f)', category: 'Travel & City', sampleBg: 'Карам кола внимателно.', sampleEn: 'I drive a car carefully.' },
  { id: 111, bg: 'колко', en: 'how much, how many', partOfSpeech: 'pronoun', category: 'Shopping & Money', sampleBg: 'Колко струва тази книга?', sampleEn: 'How much does this book cost?' },
  { id: 112, bg: 'компютър', en: 'computer', partOfSpeech: 'noun (m)', category: 'Work & Office', sampleBg: 'Работя на компютър по цял ден.', sampleEn: 'I work on a computer all day long.' },
  { id: 113, bg: 'костюм', en: 'suit, costume', partOfSpeech: 'noun (m)', category: 'Shopping & Money', sampleBg: 'Стоян облича син костюм за празника.', sampleEn: 'Stoyan puts on a blue suit for the holiday.' },
  { id: 114, bg: 'краставица', en: 'cucumber', partOfSpeech: 'noun (f)', category: 'Food & Drinks', sampleBg: 'Шопската салата има домати и краставици.', sampleEn: 'Shopska salad has tomatoes and cucumbers.' },
  { id: 115, bg: 'купувам / купя', en: 'to buy, to purchase', partOfSpeech: 'verb (III)', category: 'Shopping & Money', sampleBg: 'Купувам пресен хляб от хлебарницата.', sampleEn: 'I buy fresh bread from the bakery.' },
  { id: 116, bg: 'куче', en: 'dog', partOfSpeech: 'noun (n)', category: 'Nature & Animals', sampleBg: 'Рекс е нашето куче.', sampleEn: 'Rex is our dog.' },
  { id: 117, bg: 'къде', en: 'where', partOfSpeech: 'adverb', category: 'Travel & City', sampleBg: 'Къде се намира хотелът?', sampleEn: 'Where is the hotel located?' },

  // Л
  { id: 118, bg: 'лекар / лекарка', en: 'doctor, physician', partOfSpeech: 'noun (m)', category: 'Health & Body', sampleBg: 'Отивам на преглед при лекаря.', sampleEn: 'I am going for a checkup with the doctor.' },
  { id: 119, bg: 'лекарство', en: 'medicine, medication', partOfSpeech: 'noun (n)', category: 'Health & Body', sampleBg: 'Взимам си лекарството навреме.', sampleEn: 'I take my medicine on time.' },
  { id: 120, bg: 'легло', en: 'bed', partOfSpeech: 'noun (n)', category: 'Home & Family', sampleBg: 'Лягам да спя в леглото.', sampleEn: 'I lie down to sleep in bed.' },
  { id: 121, bg: 'лев / лева', en: 'lev / leva (Bulgarian currency)', partOfSpeech: 'noun (m)', category: 'Shopping & Money', sampleBg: 'Това струва десет лева.', sampleEn: 'This costs ten leva.' },
  { id: 122, bg: 'лесен', en: 'easy', partOfSpeech: 'adjective', category: 'Grammar & Numbers', sampleBg: 'Този урок е лесен и приятен.', sampleEn: 'This lesson is easy and pleasant.' },
  { id: 123, bg: 'лице', en: 'face / person', partOfSpeech: 'noun (n)', category: 'Health & Body', sampleBg: 'Мия си лицето с хладка вода.', sampleEn: 'I wash my face with lukewarm water.' },
  { id: 124, bg: 'лъжица', en: 'spoon', partOfSpeech: 'noun (f)', category: 'Food & Drinks', sampleBg: 'Ям супа с голяма лъжица.', sampleEn: 'I eat soup with a large spoon.' },
  { id: 125, bg: 'любов', en: 'love', partOfSpeech: 'noun (f)', category: 'Home & Family', sampleBg: 'В семейството цари мир и любов.', sampleEn: 'Peace and love reign in the family.' },
  { id: 126, bg: 'лято', en: 'summer', partOfSpeech: 'noun (n)', category: 'Nature & Animals', sampleBg: 'През лятото ходя на Черно море.', sampleEn: 'In summer I go to the Black Sea.' },

  // М
  { id: 127, bg: 'магазин', en: 'shop, store', partOfSpeech: 'noun (m)', category: 'Shopping & Money', sampleBg: 'В магазина има много пресни стоки.', sampleEn: 'The store has many fresh goods.' },
  { id: 128, bg: 'майка', en: 'mother', partOfSpeech: 'noun (f)', category: 'Home & Family', sampleBg: 'Майка ми се грижи за дома.', sampleEn: 'My mother takes care of the home.' },
  { id: 129, bg: 'малко', en: 'a little, few', partOfSpeech: 'adverb', category: 'Grammar & Numbers', sampleBg: 'Говоря малко български.', sampleEn: 'I speak a little Bulgarian.' },
  { id: 130, bg: 'мартеница', en: 'martenitsa (red-and-white yarn tassel)', partOfSpeech: 'noun (f)', category: 'Home & Family', sampleBg: 'Подарявам мартеница на първи март.', sampleEn: 'I give a martenitsa on March 1st.' },
  { id: 131, bg: 'маса', en: 'table', partOfSpeech: 'noun (f)', category: 'Home & Family', sampleBg: 'Сядаме около голямата маса.', sampleEn: 'We sit around the big table.' },
  { id: 132, bg: 'меню', en: 'menu', partOfSpeech: 'noun (n)', category: 'Food & Drinks', sampleBg: 'Може ли менюто, моля?', sampleEn: 'May I have the menu, please?' },
  { id: 133, bg: 'месо', en: 'meat', partOfSpeech: 'noun (n)', category: 'Food & Drinks', sampleBg: 'Обичам печено месо на скара.', sampleEn: 'I love grilled meat on the grill.' },
  { id: 134, bg: 'метро', en: 'metro, underground', partOfSpeech: 'noun (n)', category: 'Travel & City', sampleBg: 'Пътувам с метрото до летището.', sampleEn: 'I travel by metro to the airport.' },
  { id: 135, bg: 'мия (се)', en: 'to wash (oneself)', partOfSpeech: 'verb (I)', category: 'Health & Body', sampleBg: 'Мия си ръцете преди ядене.', sampleEn: 'I wash my hands before eating.' },
  { id: 136, bg: 'мляко (прясно / кисело)', en: 'milk (fresh / yogurt)', partOfSpeech: 'noun (n)', category: 'Food & Drinks', sampleBg: 'Пия прясно мляко с какао.', sampleEn: 'I drink fresh milk with cocoa.' },
  { id: 137, bg: 'моля', en: 'please / you are welcome', partOfSpeech: 'expression', category: 'Greetings', sampleBg: 'Едно кафе, моля!', sampleEn: 'One coffee, please!' },
  { id: 138, bg: 'момче / момиче', en: 'boy / girl', partOfSpeech: 'noun (n)', category: 'Home & Family', sampleBg: 'Момчето и момичето учат заедно.', sampleEn: 'The boy and girl study together.' },
  { id: 139, bg: 'море', en: 'sea', partOfSpeech: 'noun (n)', category: 'Nature & Animals', sampleBg: 'Варна и Бургас са на Черно море.', sampleEn: 'Varna and Burgas are on the Black Sea.' },
  { id: 140, bg: 'музей', en: 'museum', partOfSpeech: 'noun (m)', category: 'Travel & City', sampleBg: 'Посещаваме Историческия музей.', sampleEn: 'We visit the Historical Museum.' },
  { id: 141, bg: 'музика', en: 'music', partOfSpeech: 'noun (f)', category: 'Home & Family', sampleBg: 'Слушам българска народна музика.', sampleEn: 'I listen to Bulgarian folk music.' },
  { id: 142, bg: 'мъж', en: 'man / husband', partOfSpeech: 'noun (m)', category: 'Home & Family', sampleBg: 'Мъжът говори с колегите.', sampleEn: 'The man is talking to colleagues.' },

  // Н
  { id: 143, bg: 'надясно / наляво', en: 'to the right / to the left', partOfSpeech: 'adverb', category: 'Travel & City', sampleBg: 'Завийте наляво след спирката.', sampleEn: 'Turn left after the stop.' },
  { id: 144, bg: 'направо', en: 'straight on, directly', partOfSpeech: 'adverb', category: 'Travel & City', sampleBg: 'Продължете направо по булеварда.', sampleEn: 'Continue straight down the boulevard.' },
  { id: 145, bg: 'не', en: 'no, not', partOfSpeech: 'expression', category: 'Greetings', sampleBg: 'Не, благодаря.', sampleEn: 'No, thank you.' },
  { id: 146, bg: 'неделя', en: 'Sunday', partOfSpeech: 'noun (f)', category: 'Grammar & Numbers', sampleBg: 'В неделя сме у дома.', sampleEn: 'On Sunday we are at home.' },
  { id: 147, bg: 'нож', en: 'knife', partOfSpeech: 'noun (m)', category: 'Food & Drinks', sampleBg: 'Режа хляба с остър нож.', sampleEn: 'I cut the bread with a sharp knife.' },
  { id: 148, bg: 'нос', en: 'nose', partOfSpeech: 'noun (m)', category: 'Health & Body', sampleBg: 'Носът ми тече от настинка.', sampleEn: 'My nose is running from a cold.' },
  { id: 149, bg: 'нощ', en: 'night', partOfSpeech: 'noun (f)', category: 'Grammar & Numbers', sampleBg: 'Лека нощ и сладки сънища!', sampleEn: 'Good night and sweet dreams!' },
  { id: 150, bg: 'нов', en: 'new', partOfSpeech: 'adjective', category: 'Shopping & Money', sampleBg: 'Това е новата ми кола.', sampleEn: 'This is my new car.' },

  // О
  { id: 151, bg: 'обичам', en: 'to love, to like', partOfSpeech: 'verb (III)', category: 'Home & Family', sampleBg: 'Обичам българската природа.', sampleEn: 'I love Bulgarian nature.' },
  { id: 152, bg: 'обяд / обядвам', en: 'lunch / to have lunch', partOfSpeech: 'noun (m)', category: 'Food & Drinks', sampleBg: 'Обядвам в дванайсет и половина.', sampleEn: 'I have lunch at 12:30.' },
  { id: 153, bg: 'обувки', en: 'shoes', partOfSpeech: 'noun (f)', category: 'Shopping & Money', sampleBg: 'Купувам си нови обувки.', sampleEn: 'I buy myself new shoes.' },
  { id: 154, bg: 'око / очи', en: 'eye / eyes', partOfSpeech: 'noun (n)', category: 'Health & Body', sampleBg: 'Тя има топли кафяви очи.', sampleEn: 'She has warm brown eyes.' },
  { id: 155, bg: 'отивам / отида', en: 'to go', partOfSpeech: 'verb (III)', category: 'Travel & City', sampleBg: 'Отивам на работа в девет часа.', sampleEn: 'I go to work at 9 o\'clock.' },
  { id: 156, bg: 'офис', en: 'office', partOfSpeech: 'noun (m)', category: 'Work & Office', sampleBg: 'Офисът ни е в центъра на града.', sampleEn: 'Our office is in the city center.' },

  // П
  { id: 157, bg: 'пазар', en: 'market, bazaar', partOfSpeech: 'noun (m)', category: 'Shopping & Money', sampleBg: 'Отивам на Женския пазар за зеленчуци.', sampleEn: 'I am going to Zhenski Pazar for vegetables.' },
  { id: 158, bg: 'палто', en: 'overcoat, coat', partOfSpeech: 'noun (n)', category: 'Shopping & Money', sampleBg: 'Обличам топло зимно палто.', sampleEn: 'I put on a warm winter coat.' },
  { id: 159, bg: 'панталон', en: 'trousers, pants', partOfSpeech: 'noun (m)', category: 'Shopping & Money', sampleBg: 'Нося черен панталон.', sampleEn: 'I wear black trousers.' },
  { id: 160, bg: 'пари', en: 'money (always plural)', partOfSpeech: 'noun (f)', category: 'Shopping & Money', sampleBg: 'Парите са в портфейла.', sampleEn: 'The money is in the wallet.' },
  { id: 161, bg: 'пеша', en: 'on foot', partOfSpeech: 'adverb', category: 'Travel & City', sampleBg: 'Всяка сутрин вървя пеша до университета.', sampleEn: 'Every morning I walk on foot to the university.' },
  { id: 162, bg: 'пия', en: 'to drink', partOfSpeech: 'verb (I)', category: 'Food & Drinks', sampleBg: 'Пия чай с лимон.', sampleEn: 'I drink tea with lemon.' },
  { id: 163, bg: 'пиша / напиша', en: 'to write', partOfSpeech: 'verb (I)', category: 'Grammar & Numbers', sampleBg: 'Пиша писмо до семейството си.', sampleEn: 'I am writing a letter to my family.' },
  { id: 164, bg: 'планина', en: 'mountain', partOfSpeech: 'noun (f)', category: 'Nature & Animals', sampleBg: 'Витоша е красива планина близо до София.', sampleEn: 'Vitosha is a beautiful mountain near Sofia.' },
  { id: 165, bg: 'плодове', en: 'fruits', partOfSpeech: 'noun (m)', category: 'Food & Drinks', sampleBg: 'Ям пресни плодове всеки ден.', sampleEn: 'I eat fresh fruits every day.' },
  { id: 166, bg: 'понеделник', en: 'Monday', partOfSpeech: 'noun (m)', category: 'Grammar & Numbers', sampleBg: 'Понеделник е първият ден от седмицата.', sampleEn: 'Monday is the first day of the week.' },
  { id: 167, bg: 'поръчвам / поръчам', en: 'to order', partOfSpeech: 'verb (III)', category: 'Food & Drinks', sampleBg: 'Поръчвам две кебапчета и бира.', sampleEn: 'I order two kebapcheta and beer.' },
  { id: 168, bg: 'почивам си', en: 'to rest, to relax', partOfSpeech: 'verb (III)', category: 'Home & Family', sampleBg: 'Почивам си след дългия работен ден.', sampleEn: 'I rest after the long working day.' },
  { id: 169, bg: 'правя / направя', en: 'to do, to make', partOfSpeech: 'verb (II)', category: 'Grammar & Numbers', sampleBg: 'Какво правиш в свободното си време?', sampleEn: 'What do you do in your free time?' },
  { id: 170, bg: 'празник', en: 'holiday, festivity', partOfSpeech: 'noun (m)', category: 'Home & Family', sampleBg: 'Днес имаме голям семеен празник.', sampleEn: 'Today we have a big family celebration.' },
  { id: 171, bg: 'преглед', en: 'medical checkup, examination', partOfSpeech: 'noun (m)', category: 'Health & Body', sampleBg: 'Лекарят прави подробен преглед.', sampleEn: 'The doctor conducts a thorough checkup.' },
  { id: 172, bg: 'приятел / приятелка', en: 'friend (m / f)', partOfSpeech: 'noun (m)', category: 'Home & Family', sampleBg: 'Излизам на разходка с приятели.', sampleEn: 'I go out for a walk with friends.' },
  { id: 173, bg: 'пролет', en: 'spring', partOfSpeech: 'noun (f)', category: 'Nature & Animals', sampleBg: 'През пролетта всичко цъфти.', sampleEn: 'In spring everything blooms.' },
  { id: 174, bg: 'пържола', en: 'steak, cutlet, chop', partOfSpeech: 'noun (f)', category: 'Food & Drinks', sampleBg: 'Телешка пържола с гъби на фурна.', sampleEn: 'Oven-baked veal steak with mushrooms.' },
  { id: 175, bg: 'път / пътувам', en: 'road, trip / to travel', partOfSpeech: 'noun (m)', category: 'Travel & City', sampleBg: 'Приятен път и лек полет!', sampleEn: 'Have a pleasant trip and smooth flight!' },

  // Р
  { id: 176, bg: 'работа / работя', en: 'work, job / to work', partOfSpeech: 'noun (f)', category: 'Work & Office', sampleBg: 'Работя във финансова фирма.', sampleEn: 'I work in a financial firm.' },
  { id: 177, bg: 'радвам се', en: 'to be glad, to rejoice', partOfSpeech: 'verb (III)', category: 'Greetings', sampleBg: 'Радвам се да се запознаем!', sampleEn: 'Pleased to make your acquaintance!' },
  { id: 178, bg: 'ракия', en: 'rakia (traditional brandy)', partOfSpeech: 'noun (f)', category: 'Food & Drinks', sampleBg: 'Вдигаме наздравица с гроздова ракия.', sampleEn: 'We raise a toast with grape rakia.' },
  { id: 179, bg: 'разбирам / разбера', en: 'to understand', partOfSpeech: 'verb (III)', category: 'Grammar & Numbers', sampleBg: 'Да, разбирам много добре.', sampleEn: 'Yes, I understand very well.' },
  { id: 180, bg: 'разходка', en: 'walk, stroll', partOfSpeech: 'noun (f)', category: 'Travel & City', sampleBg: 'Отиваме на разходка в Борисовата градина.', sampleEn: 'We go for a walk in Borisova Gradina.' },
  { id: 181, bg: 'ресторант', en: 'restaurant', partOfSpeech: 'noun (m)', category: 'Food & Drinks', sampleBg: 'Резервирахме маса в ресторанта.', sampleEn: 'We reserved a table in the restaurant.' },
  { id: 182, bg: 'рецепта', en: 'recipe / medical prescription', partOfSpeech: 'noun (f)', category: 'Food & Drinks', sampleBg: 'Това е традиционна българска рецепта за баница.', sampleEn: 'This is a traditional Bulgarian recipe for banitsa.' },
  { id: 183, bg: 'риза', en: 'shirt', partOfSpeech: 'noun (f)', category: 'Shopping & Money', sampleBg: 'Купих нова бяла риза.', sampleEn: 'I bought a new white shirt.' },
  { id: 184, bg: 'рокля', en: 'dress', partOfSpeech: 'noun (f)', category: 'Shopping & Money', sampleBg: 'Тя носи елегантна черна рокля.', sampleEn: 'She is wearing an elegant black dress.' },
  { id: 185, bg: 'ръка / ръце', en: 'arm, hand / hands', partOfSpeech: 'noun (f)', category: 'Health & Body', sampleBg: 'Подавам ти ръка за поздрав.', sampleEn: 'I offer you my hand in greeting.' },

  // С
  { id: 186, bg: 'салата', en: 'salad', partOfSpeech: 'noun (f)', category: 'Food & Drinks', sampleBg: 'Шопската салата е с домати, краставици и сирене.', sampleEn: 'Shopska salad has tomatoes, cucumbers, and cheese.' },
  { id: 187, bg: 'свободен', en: 'free, vacant', partOfSpeech: 'adjective', category: 'Grammar & Numbers', sampleBg: 'Свободен ли си тази вечер?', sampleEn: 'Are you free this evening?' },
  { id: 188, bg: 'свят', en: 'world', partOfSpeech: 'noun (m)', category: 'Travel & City', sampleBg: 'Пътувам по целия свят.', sampleEn: 'I travel all over the world.' },
  { id: 189, bg: 'седмица', en: 'week', partOfSpeech: 'noun (f)', category: 'Grammar & Numbers', sampleBg: 'В седмицата има седем дни.', sampleEn: 'There are seven days in a week.' },
  { id: 190, bg: 'село', en: 'village, countryside', partOfSpeech: 'noun (n)', category: 'Travel & City', sampleBg: 'Баба и дядо живеят на село.', sampleEn: 'Grandmother and grandfather live in the village.' },
  { id: 191, bg: 'семейство', en: 'family', partOfSpeech: 'noun (n)', category: 'Home & Family', sampleBg: 'Обичам моето семейство.', sampleEn: 'I love my family.' },
  { id: 192, bg: 'сервитьор', en: 'waiter', partOfSpeech: 'noun (m)', category: 'Food & Drinks', sampleBg: 'Сервитьорът носи сметката.', sampleEn: 'The waiter brings the check.' },
  { id: 193, bg: 'сирене', en: 'white brine cheese', partOfSpeech: 'noun (n)', category: 'Food & Drinks', sampleBg: 'Българското сирене се прави от овче или краве мляко.', sampleEn: 'Bulgarian sirene is made from sheep or cow milk.' },
  { id: 194, bg: 'скъп', en: 'expensive / dear, precious', partOfSpeech: 'adjective', category: 'Shopping & Money', sampleBg: 'Тази рокля е твърде скъпа.', sampleEn: 'This dress is too expensive.' },
  { id: 195, bg: 'слизам / сляза', en: 'to descend, to get off', partOfSpeech: 'verb (III)', category: 'Travel & City', sampleBg: 'Слизам на площад Света Неделя.', sampleEn: 'I get off at Sveta Nedelya Square.' },
  { id: 196, bg: 'слънце / слънчев', en: 'sun / sunny', partOfSpeech: 'noun (n)', category: 'Nature & Animals', sampleBg: 'Днес грее топло слънце.', sampleEn: 'Warm sun is shining today.' },
  { id: 197, bg: 'сметка', en: 'bill, check, account', partOfSpeech: 'noun (f)', category: 'Food & Drinks', sampleBg: 'Може ли сметката, моля?', sampleEn: 'Could we have the bill, please?' },
  { id: 198, bg: 'спирка', en: 'transit stop / bus station', partOfSpeech: 'noun (f)', category: 'Travel & City', sampleBg: 'Чакам на трамвайната спирка.', sampleEn: 'I am waiting at the tram stop.' },
  { id: 199, bg: 'спортувам', en: 'to play sports / to exercise', partOfSpeech: 'verb (III)', category: 'Health & Body', sampleBg: 'В здраво тяло - здрав дух!', sampleEn: 'A sound mind in a sound body!' },
  { id: 200, bg: 'спя', en: 'to sleep', partOfSpeech: 'verb (II)', category: 'Home & Family', sampleBg: 'Спя по 8 часа всяка нощ.', sampleEn: 'I sleep 8 hours every night.' },
  { id: 201, bg: 'стая', en: 'room', partOfSpeech: 'noun (f)', category: 'Home & Family', sampleBg: 'Стаята е светла и просторна.', sampleEn: 'The room is bright and spacious.' },
  { id: 202, bg: 'стигам / стигна', en: 'to reach, to arrive at', partOfSpeech: 'verb (III)', category: 'Travel & City', sampleBg: 'Как да стигна до центъра?', sampleEn: 'How can I get to the center?' },
  { id: 203, bg: 'студен', en: 'cold', partOfSpeech: 'adjective', category: 'Nature & Animals', sampleBg: 'През януари е много студено.', sampleEn: 'In January it is very cold.' },
  { id: 204, bg: 'студент / студентка', en: 'university student (m / f)', partOfSpeech: 'noun (m)', category: 'Work & Office', sampleBg: 'Аз съм студент в Софийския университет.', sampleEn: 'I am a student at Sofia University.' },
  { id: 205, bg: 'събота', en: 'Saturday', partOfSpeech: 'noun (f)', category: 'Grammar & Numbers', sampleBg: 'В събота отиваме на разходка.', sampleEn: 'On Saturday we go for a walk.' },
  { id: 206, bg: 'съпруг / съпруга', en: 'husband / wife', partOfSpeech: 'noun (m)', category: 'Home & Family', sampleBg: 'Моят съпруг работи като архитект.', sampleEn: 'My husband works as an architect.' },

  // Т
  { id: 207, bg: 'такси', en: 'taxi, cab', partOfSpeech: 'noun (n)', category: 'Travel & City', sampleBg: 'Поръчвам такси по телефона.', sampleEn: 'I order a taxi over the phone.' },
  { id: 208, bg: 'таратор', en: 'cold yogurt and cucumber soup', partOfSpeech: 'noun (m)', category: 'Food & Drinks', sampleBg: 'Тараторът е идеален за горещото лято.', sampleEn: 'Tarator is ideal for hot summer.' },
  { id: 209, bg: 'театър', en: 'theater', partOfSpeech: 'noun (m)', category: 'Home & Family', sampleBg: 'Тази вечер отиваме на театър.', sampleEn: 'Tonight we are going to the theater.' },
  { id: 210, bg: 'телевизор', en: 'television set', partOfSpeech: 'noun (m)', category: 'Home & Family', sampleBg: 'Гледам новините по телевизора.', sampleEn: 'I watch the news on the TV.' },
  { id: 211, bg: 'тенис', en: 'tennis', partOfSpeech: 'noun (m)', category: 'Health & Body', sampleBg: 'Играя тенис всяка неделя.', sampleEn: 'I play tennis every Sunday.' },
  { id: 212, bg: 'тоалетна', en: 'toilet, restroom', partOfSpeech: 'noun (f)', category: 'Home & Family', sampleBg: 'Къде е тоалетната, моля?', sampleEn: 'Where is the restroom, please?' },
  { id: 213, bg: 'топъл', en: 'warm', partOfSpeech: 'adjective', category: 'Nature & Animals', sampleBg: 'Обичам топъл хляб със сирене.', sampleEn: 'I love warm bread with cheese.' },
  { id: 214, bg: 'трамвай', en: 'tram, streetcar', partOfSpeech: 'noun (m)', category: 'Travel & City', sampleBg: 'Трамвай номер 5 отива до Княжево.', sampleEn: 'Tram number 5 goes to Knyazhevo.' },
  { id: 215, bg: 'трябва', en: 'must, should, need to', partOfSpeech: 'verb (II)', category: 'Grammar & Numbers', sampleBg: 'Трябва да бъдем точни.', sampleEn: 'We must be punctual.' },

  // У
  { id: 216, bg: 'улица', en: 'street', partOfSpeech: 'noun (f)', category: 'Travel & City', sampleBg: 'Живея на тиха улица.', sampleEn: 'I live on a quiet street.' },
  { id: 217, bg: 'университет', en: 'university', partOfSpeech: 'noun (m)', category: 'Work & Office', sampleBg: 'Софийски университет "Св. Климент Охридски".', sampleEn: 'Sofia University "St. Kliment Ohridski".' },
  { id: 218, bg: 'урок', en: 'lesson', partOfSpeech: 'noun (m)', category: 'Grammar & Numbers', sampleBg: 'Урок номер едно е за запознаване.', sampleEn: 'Lesson number one is about introductions.' },
  { id: 219, bg: 'утро', en: 'morning', partOfSpeech: 'noun (n)', category: 'Grammar & Numbers', sampleBg: 'Добро утро на всички!', sampleEn: 'Good morning to all!' },
  { id: 220, bg: 'уча / уча се', en: 'to study, to learn', partOfSpeech: 'verb (II)', category: 'Work & Office', sampleBg: 'Уча български език с удоволствие.', sampleEn: 'I study Bulgarian language with pleasure.' },
  { id: 221, bg: 'учител / учителка', en: 'teacher (m / f)', partOfSpeech: 'noun (m)', category: 'Work & Office', sampleBg: 'Учителката обяснява граматиката.', sampleEn: 'The teacher explains the grammar.' },

  // Ф
  { id: 222, bg: 'фирма', en: 'firm, company', partOfSpeech: 'noun (f)', category: 'Work & Office', sampleBg: 'Работя в търговска фирма.', sampleEn: 'I work in a commercial firm.' },
  { id: 223, bg: 'футбол', en: 'soccer, football', partOfSpeech: 'noun (m)', category: 'Health & Body', sampleBg: 'Българите обичат да гледат футбол.', sampleEn: 'Bulgarians love watching soccer.' },

  // Х
  { id: 224, bg: 'хладилник', en: 'refrigerator, fridge', partOfSpeech: 'noun (m)', category: 'Food & Drinks', sampleBg: 'Слагам млякото в хладилника.', sampleEn: 'I put the milk in the fridge.' },
  { id: 225, bg: 'хляб', en: 'bread', partOfSpeech: 'noun (m)', category: 'Food & Drinks', sampleBg: 'Българският топъл хляб е превъзходен.', sampleEn: 'Bulgarian warm bread is superb.' },
  { id: 226, bg: 'ходя', en: 'to go, to walk, to attend', partOfSpeech: 'verb (II)', category: 'Travel & City', sampleBg: 'Ходя на работа с метро.', sampleEn: 'I go to work by metro.' },
  { id: 227, bg: 'хотел', en: 'hotel', partOfSpeech: 'noun (m)', category: 'Travel & City', sampleBg: 'Отсядаме в хубав хотел на морето.', sampleEn: 'We stay in a nice hotel at the sea.' },
  { id: 228, bg: 'храна', en: 'food', partOfSpeech: 'noun (f)', category: 'Food & Drinks', sampleBg: 'Обичам вкусна и здравословна храна.', sampleEn: 'I love delicious and healthy food.' },
  { id: 229, bg: 'хубав', en: 'nice, beautiful, handsome, fine', partOfSpeech: 'adjective', category: 'Grammar & Numbers', sampleBg: 'Това е много хубав град.', sampleEn: 'This is a very nice city.' },

  // Ц
  { id: 230, bg: 'църква', en: 'church', partOfSpeech: 'noun (f)', category: 'Travel & City', sampleBg: 'Храмът "Св. Александър Невски" е величествен.', sampleEn: 'St. Alexander Nevsky Cathedral is magnificent.' },

  // Ч
  { id: 231, bg: 'чай', en: 'tea', partOfSpeech: 'noun (m)', category: 'Food & Drinks', sampleBg: 'Пия топъл билков чай.', sampleEn: 'I drink warm herbal tea.' },
  { id: 232, bg: 'чао', en: 'bye, ciao', partOfSpeech: 'expression', category: 'Greetings', sampleBg: 'Хайде, чао и до утре!', sampleEn: 'Well, bye and see you tomorrow!' },
  { id: 233, bg: 'час / часът', en: 'hour / o\'clock / the hour', partOfSpeech: 'noun (m)', category: 'Grammar & Numbers', sampleBg: 'Колко е часът? - Девет часът.', sampleEn: 'What time is it? - Nine o\'clock.' },
  { id: 234, bg: 'чаша', en: 'glass, cup', partOfSpeech: 'noun (f)', category: 'Food & Drinks', sampleBg: 'Една чаша червено вино, моля.', sampleEn: 'A glass of red wine, please.' },
  { id: 235, bg: 'чета / прочета', en: 'to read', partOfSpeech: 'verb (I)', category: 'Grammar & Numbers', sampleBg: 'Чета български учебник.', sampleEn: 'I am reading a Bulgarian textbook.' },
  { id: 236, bg: 'число', en: 'number / date', partOfSpeech: 'noun (n)', category: 'Grammar & Numbers', sampleBg: 'Кое число сме днес?', sampleEn: 'What is today\'s date?' },
  { id: 237, bg: 'чушка', en: 'pepper (bell pepper, chili)', partOfSpeech: 'noun (f)', category: 'Food & Drinks', sampleBg: 'Пълнени чушки с ориз и кайма.', sampleEn: 'Stuffed peppers with rice and minced meat.' },

  // Ш
  { id: 238, bg: 'шоколад', en: 'chocolate', partOfSpeech: 'noun (m)', category: 'Food & Drinks', sampleBg: 'Петьо много обича шоколад.', sampleEn: 'Petyo loves chocolate very much.' },
  { id: 239, bg: 'шопска салата', en: 'Shopska salad', partOfSpeech: 'noun (f)', category: 'Food & Drinks', sampleBg: 'Българската шопска салата е световноизвестна.', sampleEn: 'Bulgarian Shopska salad is world-famous.' },
  { id: 240, bg: 'шофьор', en: 'driver', partOfSpeech: 'noun (m)', category: 'Travel & City', sampleBg: 'Шофьорът на автобуса е много любезен.', sampleEn: 'The bus driver is very polite.' },

  // Я
  { id: 241, bg: 'ябълка', en: 'apple', partOfSpeech: 'noun (f)', category: 'Food & Drinks', sampleBg: 'Ябълките са сладки и сочни.', sampleEn: 'The apples are sweet and juicy.' },
  { id: 242, bg: 'яйце / яйца', en: 'egg / eggs', partOfSpeech: 'noun (n)', category: 'Food & Drinks', sampleBg: 'Ям пържени яйца за закуска.', sampleEn: 'I eat fried eggs for breakfast.' },
  { id: 243, bg: 'ям / изям', en: 'to eat', partOfSpeech: 'verb (I)', category: 'Food & Drinks', sampleBg: 'Ядем за да живеем, а не живеем за да ядем!', sampleEn: 'We eat to live, not live to eat!' }
];
