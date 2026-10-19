export interface LessonDialogueLine {
  speaker: string;
  bulgarian: string;
  english: string;
}

export interface LessonVocabularyItem {
  bg: string;
  transliteration: string;
  en: string;
  sampleBg?: string;
  sampleEn?: string;
}

export interface LessonExercise {
  instruction: string;
  pattern?: string;
  items: { prompt: string; answer: string }[];
}

export interface BookLesson {
  id: number;
  number: number;
  titleBg: string;
  titleEn: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  grammarFocus: string[];
  dialogueTitle: string;
  dialogue: LessonDialogueLine[];
  vocabulary: LessonVocabularyItem[];
  grammarNotes: string[];
  culturalNotes: string[];
  exercises: LessonExercise[];
}

export interface BookAppendix {
  id: number;
  number: number;
  titleBg: string;
  titleEn: string;
  description: string;
  items: { bg: string; en: string; details?: string }[];
}

export const BULGARIAN_PRACTICE_LESSONS: BookLesson[] = [
  {
    id: 1,
    number: 1,
    titleBg: 'Среща и Запознаване',
    titleEn: 'Meeting & Introductions',
    level: 'Beginner',
    grammarFocus: [
      'Лични местоимения (Personal Pronouns: аз, ти, той, тя, то, ние, вие, те)',
      'Спомагателен глагол "съм" (Auxiliary verb "to be": съм, си, е, сме, сте, са)',
      'Отрицателна форма "не съм", "не си"...',
      'Показателни местоимения (Demonstrative: този/онзи, тази/онази, това/онова)',
      'Звателна форма (Vocative case: Иване!, Петре!, господине!, госпожо!)'
    ],
    dialogueTitle: 'Среща на улицата (Meeting on the street)',
    dialogue: [
      { speaker: 'Петър', bulgarian: 'Добър ден.', english: 'Good afternoon.' },
      { speaker: 'Иван', bulgarian: 'Добър ден. Как сте?', english: 'Good afternoon. How are you?' },
      { speaker: 'Петър', bulgarian: 'Благодаря, добре. А вие?', english: 'Thank you, well. And you?' },
      { speaker: 'Иван', bulgarian: 'И аз съм добре, благодаря.', english: 'I am also fine, thank you.' },
      { speaker: 'Светльо', bulgarian: 'Здравей, аз съм Светльо.', english: 'Hello, I am Svetlio.' },
      { speaker: 'Калина', bulgarian: 'Аз съм Калина. Приятно ми е да се запознаем.', english: 'I am Kalina. Nice to meet you.' },
      { speaker: 'Светльо', bulgarian: 'И на мен.', english: 'Nice to meet you too.' },
      { speaker: 'Петър', bulgarian: 'Радвам се, че се видяхме. Желая ви приятен ден!', english: 'Glad we met. Have a nice day!' },
      { speaker: 'Иван', bulgarian: 'Всичко хубаво, довиждане!', english: 'All the best, good-bye!' }
    ],
    vocabulary: [
      { bg: 'Добър ден', transliteration: 'Dóbǎr den', en: 'Good afternoon', sampleBg: 'Добър ден, как сте?', sampleEn: 'Good afternoon, how are you?' },
      { bg: 'Здравей', transliteration: 'Zdravéy', en: 'Hello (informal)', sampleBg: 'Здравей, Калина!', sampleEn: 'Hello, Kalina!' },
      { bg: 'Здравейте', transliteration: 'Zdravéyte', en: 'Hello (formal / plural)', sampleBg: 'Здравейте, господин Петров!', sampleEn: 'Hello, Mr. Petrov!' },
      { bg: 'Благодаря', transliteration: 'Blagodaríya', en: 'Thank you', sampleBg: 'Благодаря, много добре.', sampleEn: 'Thank you, very well.' },
      { bg: 'Приятно ми е', transliteration: 'Priyátno mi e', en: 'Nice to meet you', sampleBg: 'Приятно ми е да се запознаем.', sampleEn: 'Pleased to meet you.' },
      { bg: 'Довиждане', transliteration: 'Dovízhdane', en: 'Good-bye', sampleBg: 'Довиждане, до утре!', sampleEn: 'Good-bye, see you tomorrow!' },
      { bg: 'Чао', transliteration: 'Chao', en: 'Bye', sampleBg: 'Хайде, чао засега!', sampleEn: 'Well, bye for now!' },
      { bg: 'Горе-долу', transliteration: 'Góre-dólu', en: 'So-so', sampleBg: 'Как си? - Горе-долу.', sampleEn: 'How are you? - So-so.' },
      { bg: 'Заповядай / Заповядайте', transliteration: 'Zapovyáday / Zapovyádayte', en: 'Here you are / Please come in', sampleBg: 'Заповядайте, седнете!', sampleEn: 'Please, have a seat!' }
    ],
    grammarNotes: [
      'The verb "съм" (to be) has no infinitive. Affirmative: аз съм, ти си, той/тя/то е, ние сме, вие сте, те са.',
      'Negative form: просто се добавя "не" пред глагола: аз не съм, ти не си, той не е, ние не сме, вие не сте, те не са.',
      'General question: добавя се частицата "ли" след глагола: "Студент ли си?", "Учител ли сте?"',
      'Vocative case (Звателна форма): when addressing someone, add -e or -o: Иван -> Иване!, Петър -> Петре!, господин -> господине!, жена -> жено!'
    ],
    culturalNotes: [
      'In Bulgarian culture, the French word "мерси" (merci) is often used as a casual alternative to "благодаря", but only standalone (not with "ти").',
      'Bulgarians traditionally nod their head for "no" and shake side-to-side for "yes", though younger generations often adopt Western gestures.'
    ],
    exercises: [
      {
        instruction: 'Fill in the blanks with the correct form of the verb "съм" (to be):',
        items: [
          { prompt: 'Аз _____ ученик от София.', answer: 'съм' },
          { prompt: 'Вие _____ ли лекар?', answer: 'сте' },
          { prompt: 'Те не _____ от България.', answer: 'са' },
          { prompt: 'Ние _____ колеги.', answer: 'сме' }
        ]
      }
    ]
  },
  {
    id: 2,
    number: 2,
    titleBg: 'Представяне и Род на Съществителните',
    titleEn: 'Introductions, Gender & Articles',
    level: 'Beginner',
    grammarFocus: [
      'Граматически род на съществителните (Masculine ending in consonant, Feminine in -а/-я, Neuter in -о/-е)',
      'Образуване на женски род с наставка -ка (лекар -> лекарка, студент -> студентка)',
      'Определителен член за единствено число (-ът/-а за м.р., -та за ж.р., -то за ср.р.)',
      'Прилагателно име и съгласуване по род и число (хубав, хубава, хубаво, хубави)'
    ],
    dialogueTitle: 'Кой кой е? (Who is who?)',
    dialogue: [
      { speaker: 'Иван', bulgarian: 'Здравейте! Аз съм Иван, на 16 години съм и съм ученик от София. По народност съм българин.', english: 'Hello! I am Ivan, 16 years old, a student from Sofia. By nationality I am Bulgarian.' },
      { speaker: 'Катя', bulgarian: 'Здрасти! Аз съм Катя, на 14 години съм. Аз съм ученичка от Варна. Не съм омъжена.', english: 'Hi! I am Katya, 14 years old. I am a student from Varna. I am unmarried.' },
      { speaker: 'Петър', bulgarian: 'Добър ден! Казвам се Петър Илиев, на 28 години съм. Актьор съм в Пловдивския театър.', english: 'Good afternoon! My name is Petar Iliev, 28 years old. I am an actor in Plovdiv theatre.' },
      { speaker: 'Д-р Петя Георгиева', bulgarian: 'Приятно ми е, аз съм д-р Петя Георгиева, на 30 години, от Бургас. Аз съм лекарка. Омъжена съм, имам две деца.', english: 'Nice to meet you, I am Dr. Petya Georgieva, 30 years old, from Burgas. I am a doctor. Married, I have two children.' }
    ],
    vocabulary: [
      { bg: 'мъж (м.р.)', transliteration: 'mǎzh', en: 'man / husband', sampleBg: 'Този мъж е лекар.', sampleEn: 'This man is a doctor.' },
      { bg: 'жена (ж.р.)', transliteration: 'zhená', en: 'woman / wife', sampleBg: 'Тя е хубава жена.', sampleEn: 'She is a beautiful woman.' },
      { bg: 'дете (ср.р.)', transliteration: 'deté', en: 'child', sampleBg: 'Детето играе в парка.', sampleEn: 'The child is playing in the park.' },
      { bg: 'лекар / лекарка', transliteration: 'lékar / lékarka', en: 'doctor (m / f)', sampleBg: 'Д-р Георгиева е лекарка.', sampleEn: 'Dr. Georgieva is a doctor.' },
      { bg: 'ученик / ученичка', transliteration: 'ucheník / ucheníchka', en: 'pupil / school student (m / f)', sampleBg: 'Иван е ученик.', sampleEn: 'Ivan is a pupil.' },
      { bg: 'актьор / актриса', transliteration: 'aktíor / aktrísa', en: 'actor / actress', sampleBg: 'Петър е актьор в театъра.', sampleEn: 'Petar is an actor in the theater.' },
      { bg: 'женен / омъжена', transliteration: 'zhénen / omǎ́zhena', en: 'married (for a man / woman)', sampleBg: 'Женени ли сте? - Да, омъжена съм.', sampleEn: 'Are you married? - Yes, I am married.' }
    ],
    grammarNotes: [
      'Masculine nouns typically end in a consonant: мъж, стол, град, лекар.',
      'Feminine nouns typically end in -а or -я: жена, маса, стая, къща.',
      'Neuter nouns typically end in -о or -е: бебе, дете, село, колело.',
      'Definite articles: Столът е тук (full article for masculine subject), Виждам стола (short article for direct object). Масата (fem. +та), Детето (neut. +то).'
    ],
    culturalNotes: [
      'Sofia is the capital of Bulgaria, while Plovdiv is one of the oldest living cities in Europe and famous for its Roman theatre.',
      'Bulgarian names have patronymics and family names: e.g. Иван Георгиев, Петя Георгиева (feminine family names end in -а).'
    ],
    exercises: [
      {
        instruction: 'Add the feminine suffix -ка to form the female profession:',
        items: [
          { prompt: 'учител -> _____', answer: 'учителка' },
          { prompt: 'студент -> _____', answer: 'студентка' },
          { prompt: 'директор -> _____', answer: 'директорка' },
          { prompt: 'физик -> _____ (notice к -> ч)', answer: 'физичка' }
        ]
      }
    ]
  },
  {
    id: 3,
    number: 3,
    titleBg: 'Семеен албум и Глаголът "Имам"',
    titleEn: 'Family Album & The Verb "To Have"',
    level: 'Beginner',
    grammarFocus: [
      'Глаголът "имам" / "нямам" (Verb "to have" & "to have not")',
      'Безличният глагол "има" / "няма" ("There is / There are")',
      'Притежателно местоимение "мой" (мой, моя, мое, мои)',
      'Множествено число на съществителни (градове, стаи, бебета)'
    ],
    dialogueTitle: 'Семейна снимка (Family photo)',
    dialogue: [
      { speaker: 'Григор', bulgarian: 'Здравейте! Представям ви моето голямо семейство. Тук на снимката е цялата фамилия.', english: 'Hello! Let me introduce my big family. Here on the photo is the entire family.' },
      { speaker: 'Григор', bulgarian: 'Започвам с мама. Тя се казва Диана Василева. Има черна коса и сини очи.', english: 'I start with mom. Her name is Diana Vasileva. She has black hair and blue eyes.' },
      { speaker: 'Григор', bulgarian: 'Моят баща - Симеон Василев, е вдясно на снимката. Той много работи и няма време за дома.', english: 'My father - Simeon Vasilev, is on the right of the photo. He works a lot and has no time for home.' },
      { speaker: 'Григор', bulgarian: 'Това малко момче отпред е Петьо - моят брат. Той много обича шоколад и кока-кола!', english: 'This little boy in front is Petyo - my brother. He loves chocolate and Coca-Cola very much!' },
      { speaker: 'Григор', bulgarian: 'Отпред е Рекс - това е нашето куче. С него сме големи приятели.', english: 'In front is Rex - that is our dog. We are great friends with him.' }
    ],
    vocabulary: [
      { bg: 'семейство', transliteration: 'seméystvo', en: 'family', sampleBg: 'Имам голямо семейство.', sampleEn: 'I have a large family.' },
      { bg: 'баща / татко', transliteration: 'bashtá / tátko', en: 'father / dad', sampleBg: 'Баща ми е инжeнер.', sampleEn: 'My father is an engineer.' },
      { bg: 'майка / мама', transliteration: 'máyka / máma', en: 'mother / mom', sampleBg: 'Майка ми обича цветя.', sampleEn: 'My mother loves flowers.' },
      { bg: 'брат / сестра', transliteration: 'brat / sestrá', en: 'brother / sister', sampleBg: 'Имам един брат и една сестра.', sampleEn: 'I have one brother and one sister.' },
      { bg: 'дядо / баба', transliteration: 'dyádo / bába', en: 'grandfather / grandmother', sampleBg: 'Дядо ми е пенсионер.', sampleEn: 'My grandfather is a retiree.' },
      { bg: 'куче / котка', transliteration: 'kúche / kótka', en: 'dog / cat', sampleBg: 'Нашето куче е много умно.', sampleEn: 'Our dog is very smart.' },
      { bg: 'обичам', transliteration: 'obícham', en: 'to love / to like', sampleBg: 'Обичам хубава храна.', sampleEn: 'I like good food.' }
    ],
    grammarNotes: [
      'Conjugation of "имам": аз имам, ти имаш, той има, ние имаме, вие имате, те имат.',
      'Negative of "имам": нямам, нямаш, няма, нямаме, нямате, нямат (DO NOT say "не имам").',
      'Impersonal "има" = There is / There are. "На масата има книга." (There is a book on the table). Negative: "На масата няма книга."'
    ],
    culturalNotes: [
      'Bulgarian family bonds are very close; Sundays are often reserved for family dinners at the grandparents\' house.'
    ],
    exercises: [
      {
        instruction: 'Choose between "има" (there is) and "няма" (there is not):',
        items: [
          { prompt: 'На масата _____ една книга (+)', answer: 'има' },
          { prompt: 'В хладилника _____ мляко (-)', answer: 'няма' },
          { prompt: 'В София _____ ли метро? (+)', answer: 'има' }
        ]
      }
    ]
  },
  {
    id: 4,
    number: 4,
    titleBg: 'Числата, Дните и Дневната програма',
    titleEn: 'Numbers, Days of the Week & Daily Routine',
    level: 'Beginner',
    grammarFocus: [
      'Числата от 1 до 20 (Numbers 1 to 20)',
      'Дните на седмицата (Days of the week)',
      'Удвояване на предлозите: с -> със, в -> във (Gemination of prepositions)',
      'Членуване в множествено число (градовете, жените, селата)',
      'Сегашно време на глаголи от 2-ро спрежение като "правя"'
    ],
    dialogueTitle: 'Дневната програма на Димитър и г-жа Георгиева',
    dialogue: [
      { speaker: 'Димитър', bulgarian: 'В понеделник от девет до седемнадесет часа съм в офиса. В петнадесет часа съм на среща.', english: 'On Monday from 9 to 17 I am at the office. At 15:00 I am at a meeting.' },
      { speaker: 'Димитър', bulgarian: 'Във вторник в дванайсет часа съм при директора, а вечерта съм на гости у Павлов.', english: 'On Tuesday at 12:00 I am with the director, and in the evening visiting Pavlov.' },
      { speaker: 'Г-жа Георгиева', bulgarian: 'В сряда в единайсет часа съм на фризьор, а вечерта в осемнадесет и трийсет - на кино.', english: 'On Wednesday at 11:00 I am at the hairdresser, and in the evening at 18:30 at the cinema.' },
      { speaker: 'Димитър', bulgarian: 'В петък играя футбол с колегите.', english: 'On Friday I play football with colleagues.' }
    ],
    vocabulary: [
      { bg: 'понеделник', transliteration: 'ponedélnik', en: 'Monday (1st day)', sampleBg: 'В понеделник работя.', sampleEn: 'On Monday I work.' },
      { bg: 'вторник', transliteration: 'vtórnik', en: 'Tuesday (2nd day)', sampleBg: 'Във вторник съм свободен.', sampleEn: 'On Tuesday I am free.' },
      { bg: 'сряда', transliteration: 'sryáda', en: 'Wednesday (3rd day)', sampleBg: 'В сряда имам среща.', sampleEn: 'On Wednesday I have a meeting.' },
      { bg: 'четвъртък', transliteration: 'chetvǎ́rtǎk', en: 'Thursday (4th day)', sampleBg: 'В четвъртък сме на гости.', sampleEn: 'On Thursday we are visiting.' },
      { bg: 'петък', transliteration: 'pétǎk', en: 'Friday (5th day)', sampleBg: 'В петък играя футбол.', sampleEn: 'On Friday I play football.' },
      { bg: 'събота', transliteration: 'sǎ́bota', en: 'Saturday (6th day)', sampleBg: 'В събота почивам.', sampleEn: 'On Saturday I rest.' },
      { bg: 'неделя', transliteration: 'nedélya', en: 'Sunday (7th day)', sampleBg: 'В неделя сме на екскурзия.', sampleEn: 'On Sunday we are on a trip.' },
      { bg: 'закусвам / обядвам / вечерям', transliteration: 'zakúsvam / obyádvam / vechéryam', en: 'have breakfast / lunch / dinner', sampleBg: 'Закусвам в осем часа.', sampleEn: 'I have breakfast at 8 o\'clock.' }
    ],
    grammarNotes: [
      'Gemination rule: Use "ВЪВ" instead of "в" before words starting with В or Ф (e.g. във вторник, във фирмата).',
      'Gemination rule: Use "СЪС" instead of "с" before words starting with С or З (e.g. със Силвия, със здраве).',
      'Plural definite articles: -те for plurals ending in -е, -и (градовете, мъжете, жените); -та for neuter plurals in -а, -я (селата, децата).'
    ],
    culturalNotes: [
      'In Bulgaria, the working day typically runs from 8:30/9:00 to 17:00/17:30, with lunch between 12:00 and 13:00.'
    ],
    exercises: [
      {
        instruction: 'Choose the correct preposition ("в" or "във", "с" or "със"):',
        items: [
          { prompt: 'Отивам _____ вторник.', answer: 'във' },
          { prompt: 'Пия кафе _____ Силвия.', answer: 'със' },
          { prompt: 'Работя _____ София.', answer: 'в' },
          { prompt: 'Говоря _____ Иван.', answer: 'с' }
        ]
      }
    ]
  },
  {
    id: 5,
    number: 5,
    titleBg: 'Нашият дом и Посоките',
    titleEn: 'Our Home & Directions',
    level: 'Beginner',
    grammarFocus: [
      'Среден род на съществителните (село, вино, легло; бебе, поле, кафе)',
      'Посоки и ориентация (горе, долу, пред, зад, отляво, отдясно)',
      'Четирите посоки на света (север, юг, изток, запад)',
      'Пълни притежателни местоимения (мой, твой, негов, неин, наш, ваш, техен)',
      'Въпросително местоимение "чий, чия, чие, чии" (whose)'
    ],
    dialogueTitle: 'Къщата на Ваня Павлова',
    dialogue: [
      { speaker: 'Ваня', bulgarian: 'Здравейте! Ето това е къщата, в която живеем от десет години насам. Тя е удобна и уютна.', english: 'Hello! Here is the house in which we have lived for 10 years. It is comfortable and cosy.' },
      { speaker: 'Ваня', bulgarian: 'В нашето семейство има петима души - аз, моят съпруг и трите ни деца.', english: 'In our family there are five people - me, my husband and our three children.' },
      { speaker: 'Ваня', bulgarian: 'Ето това е дневната. Обикновено сядаме около малката маса и гледаме телевизия.', english: 'Here is the living room. Usually we sit around the small table and watch TV.' },
      { speaker: 'Ваня', bulgarian: 'Кухнята е моето царство. Обичам сама да готвя.', english: 'The kitchen is my kingdom. I like to cook myself.' },
      { speaker: 'Ваня', bulgarian: 'Пред къщата има малка градина, отдясно е гаражът, а отзад има голяма поляна.', english: 'In front of the house is a small garden, to the right is the garage, and behind is a large lawn.' }
    ],
    vocabulary: [
      { bg: 'къща / апартамент', transliteration: 'kǎ́shta / apartamént', en: 'house / apartment', sampleBg: 'Къщата е много уютна.', sampleEn: 'The house is very cosy.' },
      { bg: 'дневна / хол', transliteration: 'dnévna / hol', en: 'living room', sampleBg: 'В хола има диван и маса.', sampleEn: 'In the living room there is a couch and table.' },
      { bg: 'кухня', transliteration: 'kúhnya', en: 'kitchen', sampleBg: 'Готвя в кухнята.', sampleEn: 'I cook in the kitchen.' },
      { bg: 'спалня', transliteration: 'spálnya', en: 'bedroom', sampleBg: 'Спалнята е топла и слънчева.', sampleEn: 'The bedroom is warm and sunny.' },
      { bg: 'баня и тоалетна', transliteration: 'bánya i toalétna', en: 'bathroom and toilet', sampleBg: 'Банята е на втория етаж.', sampleEn: 'The bathroom is on the 2nd floor.' },
      { bg: 'горе / долу', transliteration: 'góre / dólu', en: 'up / down', sampleBg: 'Стаята е горе.', sampleEn: 'The room is upstairs.' },
      { bg: 'ляво / дясно', transliteration: 'lyávo / dyásno', en: 'left / right', sampleBg: 'Завийте надясно.', sampleEn: 'Turn right.' }
    ],
    grammarNotes: [
      'Cardinal directions: север (North), юг (South), изток (East), запад (West).',
      'Asking "whose": Чий е този стол? (m), Чия е тази къща? (f), Чие е това дете? (n), Чии са тези книги? (pl).'
    ],
    culturalNotes: [
      'Bulgarian homes often have a small garden ("градинка") with flowers, tomatoes, and grape vines used for shade and making homemade wine or rakia.'
    ],
    exercises: [
      {
        instruction: 'Choose the correct form of "чий / чия / чие / чии":',
        items: [
          { prompt: '_____ е това куче? (n)', answer: 'Чие' },
          { prompt: '_____ е тази кола? (f)', answer: 'Чия' },
          { prompt: '_____ е този апартамент? (m)', answer: 'Чий' },
          { prompt: '_____ са тези цветя? (pl)', answer: 'Чии' }
        ]
      }
    ]
  },
  {
    id: 14,
    number: 14,
    titleBg: 'На път, Градски транспорт и Вид на глагола',
    titleEn: 'Transport, Tickets & Verbal Aspect',
    level: 'Intermediate',
    grammarFocus: [
      'Вид на глагола: Свършен вид (Perfective) срещу Несвършен вид (Imperfective)',
      'Винителни форми на личните местоимения (Accusative: мен/ме, теб/те, него/го, нея/я, нас/ни, вас/ви, тях/ги)',
      'Как се поръчва такси в България',
      'Градски транспорт: билети, карти за пътуване, перфориране'
    ],
    dialogueTitle: 'Фред и Здравка пътуват из София',
    dialogue: [
      { speaker: 'Фред', bulgarian: 'Как да стигнем до Националната художествена галерия?', english: 'How do we get to the National Art Gallery?' },
      { speaker: 'Здравка', bulgarian: 'Първо пътуваме с автобуса за две спирки, след това пътуваме с метрото, после вървим малко пеша.', english: 'First we travel by bus for two stops, then we take the metro, then walk a little.' },
      { speaker: 'Фред', bulgarian: 'Трябва ли да си купим билети?', english: 'Do we need to buy tickets?' },
      { speaker: 'Здравка', bulgarian: 'Да, по-добре е да си вземеш дневна карта, защото е валидна за цял ден.', english: 'Yes, it is better to get a daily card because it is valid all day.' },
      { speaker: 'Фред', bulgarian: 'Какво да правя с билета, като си го купя? Шофьорът заверява ли го?', english: 'What do I do with the ticket once I buy it? Does the driver stamp it?' },
      { speaker: 'Здравка', bulgarian: 'Не, просто трябва да го перфорираш.', english: 'No, you simply have to perforate / validate it.' }
    ],
    vocabulary: [
      { bg: 'пътувам', transliteration: 'pǎtúvam', en: 'to travel', sampleBg: 'Обичам да пътувам.', sampleEn: 'I love to travel.' },
      { bg: 'автобус / трамвай / тролей', transliteration: 'avtobús / tramváy / troléy', en: 'bus / tram / trolleybus', sampleBg: 'Автобусът идва след 5 минути.', sampleEn: 'The bus arrives in 5 minutes.' },
      { bg: 'метро', transliteration: 'metró', en: 'subway / metro', sampleBg: 'Софийското метро е много бързо.', sampleEn: 'Sofia metro is very fast.' },
      { bg: 'спирка', transliteration: 'spírka', en: 'stop / station', sampleBg: 'Слизам на следващата спирка.', sampleEn: 'I get off at the next stop.' },
      { bg: 'билет / карта', transliteration: 'bilét / kárta', en: 'ticket / travel card', sampleBg: 'Купувам си карта за пътуване.', sampleEn: 'I buy a travel card.' },
      { bg: 'такси', transliteration: 'taksí', en: 'taxi (neuter)', sampleBg: 'Хайде да вземем такси.', sampleEn: 'Let\'s take a taxi.' },
      { bg: 'пеша', transliteration: 'peshá', en: 'on foot', sampleBg: 'Вървим пеша до центъра.', sampleEn: 'We walk on foot to the center.' }
    ],
    grammarNotes: [
      'Aspect distinction: Несвършен вид (action in progress / repeated: купувам, пиша) vs Свършен вид (completed action / one-off: купя, напиша).',
      'Rule: Verbs of perfective aspect cannot stand alone in the present tense; they must be preceded by "да" or "ще": "Искам да купя", "Ще напиша".'
    ],
    culturalNotes: [
      'In Sofia, yellow taxis are everywhere. The most reliable company dispatchers can be called by phone or apps (e.g. Yellow, TaxiMe).'
    ],
    exercises: [
      {
        instruction: 'Choose the correct verbal aspect (купувам / купя):',
        items: [
          { prompt: 'Всеки ден _____ вестник (repeated).', answer: 'купувам' },
          { prompt: 'Утре искам да _____ хубава книга (one-time completion).', answer: 'купя' }
        ]
      }
    ]
  },
  {
    id: 19,
    number: 19,
    titleBg: 'На ресторант и Българска национална кухня',
    titleEn: 'At the Restaurant & Traditional Bulgarian Cuisine',
    level: 'Intermediate',
    grammarFocus: [
      'Учтив речник при поръчка (Polite vocabulary for ordering)',
      'Форми за изразяване на желание (Бих искал/а..., Желаете ли...)',
      'Традиционни български гозби и напитки (Шопска салата, Таратор, Сирене по шопски)',
      'Плащане на сметка (плащане в брой, с карта, бакшиш)'
    ],
    dialogueTitle: 'Вечеря в бистро "Бохем"',
    dialogue: [
      { speaker: 'Сервитьор', bulgarian: 'Добър вечер! Какво ще обичате?', english: 'Good evening! What would you like?' },
      { speaker: 'Константин', bulgarian: 'Първо дамите. Емилия, какво ще избереш?', english: 'Ladies first. Emilia, what will you choose?' },
      { speaker: 'Емилия', bulgarian: 'За мен - чаша доматен сок и една Шопска салата.', english: 'For me - a glass of tomato juice and a Shopska salad.' },
      { speaker: 'Николай', bulgarian: 'За мен - една мускатова ракия, сода и таратор.', english: 'For me - a muscat rakia, soda water, and tarator.' },
      { speaker: 'Константин', bulgarian: 'А за мен донесете една телешка пържола с гъби и кашкавал, и пържени картофи.', english: 'And for me bring a veal steak with mushrooms and kashkaval, plus French fries.' },
      { speaker: 'Сервитьор', bulgarian: 'Желаете ли вино към ястията?', english: 'Would you like some wine with the meals?' },
      { speaker: 'Константин', bulgarian: 'Да, една бутилка бяло вино шардоне. По мое мнение българското вино е най-хубаво.', english: 'Yes, a bottle of Chardonnay white wine. In my opinion Bulgarian wine is the best.' },
      { speaker: 'Сервитьор', bulgarian: 'Благодаря ви. Добър апетит!', english: 'Thank you. Enjoy your meal!' }
    ],
    vocabulary: [
      { bg: 'Шопска салата', transliteration: 'Shópska saláta', en: 'Shopska salad (tomatoes, cucumbers, peppers, onions, white sirene)', sampleBg: 'Шопската салата е национална гордост.', sampleEn: 'Shopska salad is national pride.' },
      { bg: 'таратор', transliteration: 'taratór', en: 'cold cucumber and yogurt soup with garlic, dill, and walnuts', sampleBg: 'През лятото обичам студен таратор.', sampleEn: 'In summer I love cold tarator.' },
      { bg: 'сирене по шопски', transliteration: 'sírene po shópski', en: 'baked white cheese in a clay pot with tomato, pepper, and egg', sampleBg: 'Поръчах сирене по шопски.', sampleEn: 'I ordered cheese Shopska style.' },
      { bg: 'кебапче / кюфте', transliteration: 'kebápche / kiyufté', en: 'grilled minced meat sausage / meatball', sampleBg: 'Две кебапчета с пържени картофи.', sampleEn: 'Two kebapcheta with French fries.' },
      { bg: 'ракия', transliteration: 'rakíya', en: 'traditional Bulgarian fruit brandy (grape/plum)', sampleBg: 'Мускатовата ракия се пие със салата.', sampleEn: 'Muscat rakia is drunk with salad.' },
      { bg: 'Сметката, моля!', transliteration: 'Smétkata, mólya!', en: 'The check / bill, please!', sampleBg: 'Може ли сметката?', sampleEn: 'Could we have the bill, please?' }
    ],
    grammarNotes: [
      'Polite conditional: "Бих искал" (m) / "Бих искала" (f) = I would like.',
      '"Какво ще обичате?" is the standard polite formula waiters use in Bulgaria.'
    ],
    culturalNotes: [
      'Bulgarian cuisine is famous for white brine cheese (сирене), yellow cheese (кашкавал), and probiotic yogurt (кисело мляко) containing Lactobacillus bulgaricus.'
    ],
    exercises: [
      {
        instruction: 'Complete the polite ordering sentence:',
        items: [
          { prompt: 'Бих _____ (искам) една чаша вода.', answer: 'искал' },
          { prompt: 'Може _____ сметката, моля?', answer: 'ли' }
        ]
      }
    ]
  },
  {
    id: 20,
    number: 20,
    titleBg: 'Болен съм и Човешкото тяло',
    titleEn: 'At the Doctor & Human Body',
    level: 'Advanced',
    grammarFocus: [
      'Изразяване на болка ("Боли ме главата", "Болят ме краката")',
      'Части на човешкото тяло (глава, гърло, очи, уши, зъб, сърце, корем)',
      'Минало време на глагола "съм" (бях, беше, бяхме, бяхте, бяха)',
      'Сегашно деятелно причастие (работещ, спящ, живеещ)'
    ],
    dialogueTitle: 'В кабинета на лекаря (At the doctor\'s office)',
    dialogue: [
      { speaker: 'Пациент', bulgarian: 'Добър ден, докторе. Мисля, че съм болен.', english: 'Good afternoon, doctor. I think I am ill.' },
      { speaker: 'Лекар', bulgarian: 'Добър ден. От какво се оплаквате?', english: 'Good afternoon. What are your complaints?' },
      { speaker: 'Пациент', bulgarian: 'Всичко ме боли - главата, гърлото, носът ми тече и имам температура.', english: 'Everything aches - my head, throat, my nose is running and I have a fever.' },
      { speaker: 'Лекар', bulgarian: 'Болят ли ви мускулите и костите? Кашляте ли?', english: 'Do your muscles and bones ache? Are you coughing?' },
      { speaker: 'Пациент', bulgarian: 'Да, кашлям много и нямам никакъв апетит.', english: 'Yes, I cough a lot and have no appetite at all.' },
      { speaker: 'Лекар', bulgarian: 'Разбирам. Това е грип. Ще ви изпиша лекарства. Пийте много топъл чай с лимон и почивайте на легло.', english: 'I see. It is the flu. I will prescribe medicines. Drink plenty of warm tea with lemon and rest in bed.' }
    ],
    vocabulary: [
      { bg: 'боли ме / болят ме', transliteration: 'bolí me / bolyát me', en: 'it hurts me / they hurt me', sampleBg: 'Боли ме главата.', sampleEn: 'My head hurts.' },
      { bg: 'глава / гърло', transliteration: 'glavá / gǎ́rlo', en: 'head / throat', sampleBg: 'Боли ме гърлото.', sampleEn: 'My throat hurts.' },
      { bg: 'зъб / зъболекар', transliteration: 'zǎb / zǎbolékar', en: 'tooth / dentist', sampleBg: 'Боли ме зъб.', sampleEn: 'I have a toothache.' },
      { bg: 'температура', transliteration: 'temperatúra', en: 'fever / temperature', sampleBg: 'Имам висока температура.', sampleEn: 'I have a high fever.' },
      { bg: 'лекарство', transliteration: 'lekárstvo', en: 'medicine / remedy', sampleBg: 'Взимам това лекарство три пъти на ден.', sampleEn: 'I take this medicine three times a day.' },
      { bg: 'аптека', transliteration: 'aptéka', en: 'pharmacy', sampleBg: 'Къде има денонощна аптека?', sampleEn: 'Where is there a 24-hour pharmacy?' }
    ],
    grammarNotes: [
      'Expression of pain: Singular noun uses "боли ме" (Боли ме стомахът); Plural noun uses "болят ме" (Болят ме очите).',
      'Past tense of "съм": аз бях, ти беше, той беше, ние бяхме, вие бяхте, те бяха.'
    ],
    culturalNotes: [
      'In Bulgaria, Linden tea (липов чай) and mountain herbal tea (мурсалски чай) with honey are beloved home remedies for colds and flu.'
    ],
    exercises: [
      {
        instruction: 'Choose "боли ме" (singular) or "болят ме" (plural):',
        items: [
          { prompt: '_____ гърлото (throat - singular).', answer: 'Боли ме' },
          { prompt: '_____ краката (legs - plural).', answer: 'Болят ме' },
          { prompt: '_____ зъбите (teeth - plural).', answer: 'Болят ме' }
        ]
      }
    ]
  },
  {
    id: 22,
    number: 22,
    titleBg: 'Юбилей и Български традиции (Баба Марта)',
    titleEn: 'Celebrations, Holidays & Baba Marta',
    level: 'Advanced',
    grammarFocus: [
      'Традиционни поздравления (Честит рожден ден, Честита Баба Марта, Весела Коледа)',
      'Минало свършено време на глаголите "ям" и "дам" (ядох, дадох)',
      'Сложни глаголни форми в минало време',
      'Субстантивирани думи'
    ],
    dialogueTitle: 'Баба Марта и мартениците',
    dialogue: [
      { speaker: 'Учител', bulgarian: 'В България има един уникален празник, който не се среща никъде другаде по света - денят на Баба Марта на първи март.', english: 'In Bulgaria there is a unique holiday found nowhere else in the world - Grandmother Marta day on March 1st.' },
      { speaker: 'Ученик', bulgarian: 'Какво си подаряват българите на този ден?', english: 'What do Bulgarians give each other on this day?' },
      { speaker: 'Учител', bulgarian: 'Подаряват си мартеници - бяло-червени фигури от усукани конци за здраве, радост и дълъг живот.', english: 'They give each other martenitsas - red and white twisted yarn figures for health, joy, and long life.' },
      { speaker: 'Ученик', bulgarian: 'Какво символизират цветовете?', english: 'What do the colors symbolize?' },
      { speaker: 'Учител', bulgarian: 'Бялото е символ на чистотата и надеждата, а червеното - на здравето, силата и възраждането на природата.', english: 'White is the symbol of purity and hope, and red - of health, strength, and nature\'s revival.' }
    ],
    vocabulary: [
      { bg: 'мартеница', transliteration: 'mártenitsa', en: 'martenitsa (red-and-white yarn tassel / bracelet)', sampleBg: 'Честита Баба Марта!', sampleEn: 'Happy Baba Marta!' },
      { bg: 'Честит рожден ден!', transliteration: 'Chestít rozhdén den!', en: 'Happy Birthday!', sampleBg: 'Пожелавам ти здраве и щастие.', sampleEn: 'I wish you health and happiness.' },
      { bg: 'Честит имен ден!', transliteration: 'Chestít ímen den!', en: 'Happy Name Day!', sampleBg: 'В България именните дни са голям празник.', sampleEn: 'In Bulgaria name days are a big holiday.' },
      { bg: 'Бъди жив и здрав!', transliteration: 'Bǎdi zhiv i zdrav!', en: 'Be alive and healthy! (traditional blessing)', sampleBg: 'Бъди жив и здрав за много години!', sampleEn: 'Stay alive and healthy for many years!' },
      { bg: 'празник', transliteration: 'práznik', en: 'holiday / festival', sampleBg: 'Днес е официален празник.', sampleEn: 'Today is an official holiday.' }
    ],
    grammarNotes: [
      'Past tense of "ям" (to eat): ядох, яде, яде, ядохме, ядохте, ядоха.',
      'Past tense of "дам" (to give): дадох, даде, даде, дадохме, дадохте, дадоха.'
    ],
    culturalNotes: [
      'Name days (Имен ден) in Bulgaria (like St. George\'s Day - Гергьовден, St. John\'s Day - Ивановден, St. Nicholas - Никулден) are celebrated with even greater joy than birthdays!',
      'Martenitsas are worn until one sees the first stork, swallow, or blossoming fruit tree in spring, then tied onto a blooming branch.'
    ],
    exercises: [
      {
        instruction: 'Fill in the blanks with the past tense of "дам":',
        items: [
          { prompt: 'Аз му _____ книгата.', answer: 'дадох' },
          { prompt: 'Те ни _____ подаръци.', answer: 'дадоха' }
        ]
      }
    ]
  }
];

export const BOOK_APPENDICES: BookAppendix[] = [
  {
    id: 1,
    number: 1,
    titleBg: 'Приложение 1: Текстове за допълнителна работа',
    titleEn: 'Appendix 1: Supplementary Reading Texts',
    description: 'Authentic essays on Bulgarian culture, hospitality, history, and modern life.',
    items: [
      { bg: 'Моите впечатления от България', en: 'My Impressions of Bulgaria', details: 'Essay on Bulgarian greenery, hospitality, friendly people, and traditional habits like tertip.' },
      { bg: 'България и българите', en: 'Bulgaria and Bulgarians', details: 'Historical review of monasteries, Paisius of Hilendar, the Slavonic alphabet, and religious tolerance.' },
      { bg: 'Понеделниците докарват инфаркти', en: 'Mondays bring heart attacks', details: 'Humorous BBC study about work stress, weekend eating habits, and taking life easy.' }
    ]
  },
  {
    id: 2,
    number: 2,
    titleBg: 'Приложение 2: Кратка морфология',
    titleEn: 'Appendix 2: Concise Grammar & Morphology Tables',
    description: 'Summary tables of Nouns, Adjectives, Pronouns, Verbs, and Participles.',
    items: [
      { bg: 'Съществително име', en: 'Nouns', details: 'Gender markers: m (consonant), f (-а/-я), n (-о/-е). Plural endings: -ове, -и, -е, -а, -та.' },
      { bg: 'Членуване (Definite Articles)', en: 'Articles', details: 'Singular: -ът/-а (m), -та (f), -то (n). Plural: -те, -та.' },
      { bg: 'Прилагателно име', en: 'Adjectives', details: 'Gender forms: нов, нова, ново, нови. Degrees: по-нов, най-нов.' },
      { bg: 'Местоимения', en: 'Pronouns', details: 'Personal, Possessive, Demonstrative, Interrogative, Relative, Negative.' },
      { bg: 'Глагол и спрежения', en: 'Verbs & Conjugations', details: '1st (-е: чета, четеш), 2nd (-и: говоря, говориш), 3rd (-а/-я: обичам, обичаш).' }
    ]
  },
  {
    id: 3,
    number: 3,
    titleBg: 'Приложение 3: Професии',
    titleEn: 'Appendix 3: Occupations & Professions',
    description: 'Visual dictionary of careers in Bulgaria.',
    items: [
      { bg: 'лекар / лекарка', en: 'doctor / physician' },
      { bg: 'учител / учителка', en: 'teacher' },
      { bg: 'архитект', en: 'architect' },
      { bg: 'инженер', en: 'engineer' },
      { bg: 'директор', en: 'director / manager' },
      { bg: 'шофьор', en: 'driver' },
      { bg: 'актъор / актриса', en: 'actor / actress' },
      { bg: 'фризьор / фризьорка', en: 'hairdresser' },
      { bg: 'магазинер / продавач', en: 'shopkeeper / shop assistant' },
      { bg: 'биолог', en: 'biologist' },
      { bg: 'агроном', en: 'agronomist' },
      { bg: 'счетоводител', en: 'accountant' }
    ]
  },
  {
    id: 4,
    number: 4,
    titleBg: 'Приложение 4: Храни и напитки',
    titleEn: 'Appendix 4: Food & Beverages',
    description: 'Authentic Bulgarian culinary terms from the textbook.',
    items: [
      { bg: 'хляб (бял / черен)', en: 'bread (white / brown)' },
      { bg: 'сирене', en: 'white brine cheese (feta style)' },
      { bg: 'кашкавал', en: 'yellow semi-hard cheese' },
      { bg: 'кисело мляко', en: 'Bulgarian yogurt' },
      { bg: 'прясно мляко', en: 'fresh milk' },
      { bg: 'яйца', en: 'eggs' },
      { bg: 'пиле / пилешко месо', en: 'chicken meat' },
      { bg: 'телешка пържола', en: 'veal steak' },
      { bg: 'риба (пъстърва)', en: 'fish (trout)' },
      { bg: 'салам / шунка', en: 'salami / ham' },
      { bg: 'баница', en: 'banitsa (traditional filo pastry with cheese)' },
      { bg: 'таратор', en: 'cold cucumber yogurt soup' },
      { bg: 'шопска салата', en: 'Shopska salad' },
      { bg: 'кебапче / кюфте', en: 'grilled minced meat sausage / meatball' },
      { bg: 'вино (бяло / червено)', en: 'wine (white / red)' },
      { bg: 'ракия', en: 'traditional fruit brandy' },
      { bg: 'минерална вода', en: 'mineral water' },
      { bg: 'кафе / чай', en: 'coffee / tea' }
    ]
  },
  {
    id: 5,
    number: 5,
    titleBg: 'Приложение 5: Плодове и зеленчуци',
    titleEn: 'Appendix 5: Fruits & Vegetables',
    description: 'Fresh produce vocabulary.',
    items: [
      { bg: 'домат', en: 'tomato' },
      { bg: 'краставица', en: 'cucumber' },
      { bg: 'чушка (люта чушка)', en: 'pepper (hot chili pepper)' },
      { bg: 'морков', en: 'carrot' },
      { bg: 'зеле', en: 'cabbage' },
      { bg: 'лук', en: 'onion' },
      { bg: 'гъби', en: 'mushrooms' },
      { bg: 'ябълка', en: 'apple' },
      { bg: 'круша', en: 'pear' },
      { bg: 'череша', en: 'cherry' },
      { bg: 'ягода', en: 'strawberry' },
      { bg: 'диня', en: 'watermelon' },
      { bg: 'грозде', en: 'grapes' },
      { bg: 'праскова', en: 'peach' },
      { bg: 'тиква', en: 'pumpkin' }
    ]
  },
  {
    id: 6,
    number: 6,
    titleBg: 'Приложение 6: Магазини',
    titleEn: 'Appendix 6: Shops & Stores',
    description: 'Types of stores in Bulgaria.',
    items: [
      { bg: 'хранителни стоки / супермаркет', en: 'grocery store / supermarket' },
      { bg: 'плод и зеленчук', en: 'greengrocer / fruit & vegetable stand' },
      { bg: 'месарски магазин', en: 'butcher shop' },
      { bg: 'хлебарница', en: 'bakery' },
      { bg: 'аптека', en: 'pharmacy / chemist' },
      { bg: 'книжарница', en: 'bookstore' },
      { bg: 'магазин за облекло', en: 'clothing store' },
      { bg: 'магазин за обувки', en: 'shoe store' },
      { bg: 'автосалон', en: 'car dealership' },
      { bg: 'павилион за вестници', en: 'newsstand' }
    ]
  },
  {
    id: 7,
    number: 7,
    titleBg: 'Приложение 7: Облекло и обувки',
    titleEn: 'Appendix 7: Clothes & Footwear',
    description: 'Wardrobe and fashion terms.',
    items: [
      { bg: 'костюм', en: 'suit' },
      { bg: 'рокля', en: 'dress' },
      { bg: 'пола', en: 'skirt' },
      { bg: 'сако', en: 'jacket / blazer' },
      { bg: 'палто', en: 'overcoat' },
      { bg: 'риза', en: 'shirt' },
      { bg: 'панталон', en: 'trousers / pants' },
      { bg: 'пуловер', en: 'sweater' },
      { bg: 'обувки', en: 'shoes' },
      { bg: 'ботуши', en: 'boots' },
      { bg: 'сандали', en: 'sandals' },
      { bg: 'шапка', en: 'hat' },
      { bg: 'вратовръзка', en: 'necktie' },
      { bg: 'чанта', en: 'bag / handbag' }
    ]
  },
  {
    id: 8,
    number: 8,
    titleBg: 'Приложение 8: Спорт',
    titleEn: 'Appendix 8: Sports & Fitness',
    description: 'Athletics and activities.',
    items: [
      { bg: 'плуване', en: 'swimming' },
      { bg: 'футбол', en: 'football / soccer' },
      { bg: 'тенис', en: 'tennis' },
      { bg: 'ски', en: 'skiing' },
      { bg: 'фитнес', en: 'fitness / gym workout' },
      { bg: 'бокс', en: 'boxing' },
      { bg: 'бягане / джогинг', en: 'running / jogging' },
      { bg: 'борба', en: 'wrestling' }
    ]
  },
  {
    id: 9,
    number: 9,
    titleBg: 'Приложение 9: Животни',
    titleEn: 'Appendix 9: Animals',
    description: 'Domestic and wild animals.',
    items: [
      { bg: 'куче', en: 'dog' },
      { bg: 'котка', en: 'cat' },
      { bg: 'кон', en: 'horse' },
      { bg: 'птица', en: 'bird' },
      { bg: 'лъв', en: 'lion' },
      { bg: 'тигър', en: 'tiger' },
      { bg: 'слон', en: 'elephant' },
      { bg: 'мечка', en: 'bear' },
      { bg: 'орел', en: 'eagle' },
      { bg: 'делфин', en: 'dolphin' }
    ]
  }
];
