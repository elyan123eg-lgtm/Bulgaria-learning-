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
  // LESSON 1
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
      { bg: 'Заповядайте', transliteration: 'Zapovyádayte', en: 'Please come in / Here you are', sampleBg: 'Заповядайте, седнете!', sampleEn: 'Please, have a seat!' }
    ],
    grammarNotes: [
      'The verb "съм" (to be) has no infinitive. Affirmative: аз съм, ти си, той/тя/то е, ние сме, вие сте, те са.',
      'Negative form: simply place "не" before the verb: аз не съм, ти не си, той не е, ние не сме, вие не сте, те не са.',
      'General question: add the particle "ли" directly after the verb: "Студент ли си?", "Учител ли сте?"',
      'Vocative case: add -e or -o when addressing people: Иван -> Иване!, Петър -> Петре!, господин -> господине!'
    ],
    culturalNotes: [
      'In Bulgarian culture, the French word "мерси" (merci) is often used as a casual alternative to "благодаря".',
      'Bulgarians traditionally nod their head for "no" and shake side-to-side for "yes", though younger generations often use Western gestures.'
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

  // LESSON 2
  {
    id: 2,
    number: 2,
    titleBg: 'Представяне и Род на Съществителните',
    titleEn: 'Introductions, Gender & Articles',
    level: 'Beginner',
    grammarFocus: [
      'Граматически род на съществителните (Masculine in consonant, Feminine in -а/-я, Neuter in -о/-е)',
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
      { bg: 'ученик / ученичка', transliteration: 'ucheník / ucheníchka', en: 'pupil (m / f)', sampleBg: 'Иван е ученик.', sampleEn: 'Ivan is a pupil.' },
      { bg: 'актьор / актриса', transliteration: 'aktíor / aktrísa', en: 'actor / actress', sampleBg: 'Петър е актьор.', sampleEn: 'Petar is an actor.' },
      { bg: 'женен / омъжена', transliteration: 'zhénen / omǎ́zhena', en: 'married (m / f)', sampleBg: 'Женени ли сте? - Да, омъжена съм.', sampleEn: 'Are you married? - Yes, I am married.' }
    ],
    grammarNotes: [
      'Masculine nouns typically end in a consonant: мъж, стол, град, лекар.',
      'Feminine nouns typically end in -а or -я: жена, маса, стая, къща.',
      'Neuter nouns typically end in -о or -е: бебе, дете, село, колело.',
      'Definite articles: Столът е тук (full article for masculine subject), Виждам стола (short article for direct object). Масата (fem. +та), Детето (neut. +то).'
    ],
    culturalNotes: [
      'Sofia is the capital of Bulgaria, while Plovdiv is one of the oldest continuously inhabited cities in Europe and famous for its Roman theatre.'
    ],
    exercises: [
      {
        instruction: 'Add the feminine suffix -ка to form the female profession:',
        items: [
          { prompt: 'учител -> _____', answer: 'учителка' },
          { prompt: 'студент -> _____', answer: 'студентка' },
          { prompt: 'директор -> _____', answer: 'директорка' }
        ]
      }
    ]
  },

  // LESSON 3
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
      { speaker: 'Григор', bulgarian: 'Това малко момче отпред е Петьо - моят брат. Той много обича шоколад!', english: 'This little boy in front is Petyo - my brother. He loves chocolate very much!' },
      { speaker: 'Григор', bulgarian: 'Отпред е Рекс - това е нашето куче. С него сме големи приятели.', english: 'In front is Rex - that is our dog. We are great friends with him.' }
    ],
    vocabulary: [
      { bg: 'семейство', transliteration: 'seméystvo', en: 'family', sampleBg: 'Имам голямо семейство.', sampleEn: 'I have a large family.' },
      { bg: 'баща / татко', transliteration: 'bashtá / tátko', en: 'father / dad', sampleBg: 'Баща ми е инженер.', sampleEn: 'My father is an engineer.' },
      { bg: 'майка / мама', transliteration: 'máyka / máma', en: 'mother / mom', sampleBg: 'Майка ми обича цветя.', sampleEn: 'My mother loves flowers.' },
      { bg: 'брат / сестра', transliteration: 'brat / sestrá', en: 'brother / sister', sampleBg: 'Имам един брат и една сестра.', sampleEn: 'I have one brother and one sister.' },
      { bg: 'дядо / баба', transliteration: 'dyádo / bába', en: 'grandfather / grandmother', sampleBg: 'Дядо ми е пенсионер.', sampleEn: 'My grandfather is a retiree.' },
      { bg: 'куче / котка', transliteration: 'kúche / kótka', en: 'dog / cat', sampleBg: 'Нашето куче е умно.', sampleEn: 'Our dog is smart.' }
    ],
    grammarNotes: [
      'Conjugation of "имам": аз имам, ти имаш, той има, ние имаме, вие имате, те имат.',
      'Negative of "имам": нямам, нямаш, няма, нямаме, нямате, нямат (DO NOT say "не имам").',
      'Impersonal "има" = There is / There are. "На масата има книга." Negative: "На масата няма книга."'
    ],
    culturalNotes: [
      'Bulgarian family bonds are very close; Sundays are often reserved for family dinners at the grandparents\' house.'
    ],
    exercises: [
      {
        instruction: 'Choose between "има" (there is) and "няма" (there is not):',
        items: [
          { prompt: 'На масата _____ една книга (+)', answer: 'има' },
          { prompt: 'В хладилника _____ мляко (-)', answer: 'няма' }
        ]
      }
    ]
  },

  // LESSON 4
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
      'Сегашно време на глаголи от 3-то спрежение като "закусвам"'
    ],
    dialogueTitle: 'Дневната програма на Димитър и г-жа Георгиева',
    dialogue: [
      { speaker: 'Димитър', bulgarian: 'В понеделник от девет до седемнадесет часа съм в офиса. В петнадесет часа съм на среща.', english: 'On Monday from 9 to 17 I am at the office. At 15:00 I am at a meeting.' },
      { speaker: 'Димитър', bulgarian: 'Във вторник в дванайсет часа съм при директора, а вечерта съм на гости.', english: 'On Tuesday at 12:00 I am with the director, and in the evening visiting.' },
      { speaker: 'Г-жа Георгиева', bulgarian: 'В сряда в единайсет часа съм на фризьор, а вечерта - на кино.', english: 'On Wednesday at 11:00 I am at the hairdresser, and in the evening at the cinema.' },
      { speaker: 'Димитър', bulgarian: 'В петък играя футбол с колегите.', english: 'On Friday I play football with colleagues.' }
    ],
    vocabulary: [
      { bg: 'понеделник', transliteration: 'ponedélnik', en: 'Monday', sampleBg: 'В понеделник работя.', sampleEn: 'On Monday I work.' },
      { bg: 'вторник', transliteration: 'vtórnik', en: 'Tuesday', sampleBg: 'Във вторник съм свободен.', sampleEn: 'On Tuesday I am free.' },
      { bg: 'сряда', transliteration: 'sryáda', en: 'Wednesday', sampleBg: 'В сряда имам среща.', sampleEn: 'On Wednesday I have a meeting.' },
      { bg: 'четвъртък', transliteration: 'chetvǎ́rtǎk', en: 'Thursday', sampleBg: 'В четвъртък сме на гости.', sampleEn: 'On Thursday we are visiting.' },
      { bg: 'петък', transliteration: 'pétǎk', en: 'Friday', sampleBg: 'В петък играя футбол.', sampleEn: 'On Friday I play football.' },
      { bg: 'събота / неделя', transliteration: 'sǎ́bota / nedélya', en: 'Saturday / Sunday', sampleBg: 'В събота и неделя почивам.', sampleEn: 'On Saturday and Sunday I rest.' }
    ],
    grammarNotes: [
      'Gemination rule: Use "ВЪВ" instead of "в" before words starting with В or Ф (e.g. във вторник, във фирмата).',
      'Gemination rule: Use "СЪС" instead of "с" before words starting with С or З (e.g. със Силвия, със здраве).'
    ],
    culturalNotes: [
      'In Bulgaria, the working day typically runs from 8:30/9:00 to 17:00/17:30.'
    ],
    exercises: [
      {
        instruction: 'Choose the correct preposition ("в" or "във", "с" or "със"):',
        items: [
          { prompt: 'Отивам _____ вторник.', answer: 'във' },
          { prompt: 'Пия кафе _____ Силвия.', answer: 'със' }
        ]
      }
    ]
  },

  // LESSON 5
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
      'Въпросително местоимение "чий, чия, чие, чии" (whose)'
    ],
    dialogueTitle: 'Къщата на Ваня Павлова',
    dialogue: [
      { speaker: 'Ваня', bulgarian: 'Здравейте! Ето това е къщата, в която живеем от десет години насам. Тя е удобна и уютна.', english: 'Hello! Here is the house in which we have lived for 10 years. It is comfortable and cosy.' },
      { speaker: 'Ваня', bulgarian: 'Ето това е дневната. Обикновено сядаме около малката маса и гледаме телевизия.', english: 'Here is the living room. Usually we sit around the small table and watch TV.' },
      { speaker: 'Ваня', bulgarian: 'Кухнята е моето царство. Обичам сама да готвя.', english: 'The kitchen is my kingdom. I like to cook myself.' },
      { speaker: 'Ваня', bulgarian: 'Пред къщата има малка градина, отдясно е гаражът, а отзад има поляна.', english: 'In front of the house is a small garden, to the right is the garage, and behind is a lawn.' }
    ],
    vocabulary: [
      { bg: 'къща / апартамент', transliteration: 'kǎ́shta / apartamént', en: 'house / apartment', sampleBg: 'Къщата е много уютна.', sampleEn: 'The house is very cosy.' },
      { bg: 'дневна / хол', transliteration: 'dnévna / hol', en: 'living room', sampleBg: 'В хола има диван и маса.', sampleEn: 'In the living room there is a couch and table.' },
      { bg: 'кухня', transliteration: 'kúhnya', en: 'kitchen', sampleBg: 'Готвя в кухнята.', sampleEn: 'I cook in the kitchen.' },
      { bg: 'спалня / баня', transliteration: 'spálnya / bánya', en: 'bedroom / bathroom', sampleBg: 'Спалнята е топла.', sampleEn: 'The bedroom is warm.' },
      { bg: 'ляво / дясно', transliteration: 'lyávo / dyásno', en: 'left / right', sampleBg: 'Завийте надясно.', sampleEn: 'Turn right.' }
    ],
    grammarNotes: [
      'Cardinal directions: север (North), юг (South), изток (East), запад (West).',
      'Asking "whose": Чий е този стол? (m), Чия е тази къща? (f), Чие е това дете? (n), Чии са тези книги? (pl).'
    ],
    culturalNotes: [
      'Bulgarian homes often feature a small garden ("градинка") with flowers and vine trellises for summer shade.'
    ],
    exercises: [
      {
        instruction: 'Choose the correct form of "чий / чия / чие / чии":',
        items: [
          { prompt: '_____ е това куче? (n)', answer: 'Чие' },
          { prompt: '_____ е тази кола? (f)', answer: 'Чия' }
        ]
      }
    ]
  },

  // LESSON 6
  {
    id: 6,
    number: 6,
    titleBg: 'В магазина и Пазаруване на храна',
    titleEn: 'At the Grocery Store & Food Shopping',
    level: 'Beginner',
    grammarFocus: [
      'Бройна форма за мъжки род (два стола, три лева, пет молива)',
      'Мерни единици (килограм, половин килограм, грам, литър, пакет)',
      'Въпрос за цена: "Колко струва...?" / "Колко струват...?"',
      'Числата от 20 до 100'
    ],
    dialogueTitle: 'В кварталния хранителен магазин',
    dialogue: [
      { speaker: 'Продавач', bulgarian: 'Добър ден! Заповядайте, какво ще обичате?', english: 'Good afternoon! Welcome, what would you like?' },
      { speaker: 'Мария', bulgarian: 'Добър ден. Искам половин килограм бяло саламурено сирене и двеста грама кашкавал.', english: 'Good afternoon. I want half a kilogram of white brine cheese and 200 grams of yellow cheese.' },
      { speaker: 'Продавач', bulgarian: 'Още нещо желаете ли?', english: 'Would you like anything else?' },
      { speaker: 'Мария', bulgarian: 'Да, дайте ми един топъл бял хляб и една кофичка кисело мляко. Колко струва всичко?', english: 'Yes, give me one warm white bread and one tub of yogurt. How much is everything?' },
      { speaker: 'Продавач', bulgarian: 'Всичко прави осем лева и петдесет стотинки.', english: 'Everything comes to eight leva and fifty stotinki.' }
    ],
    vocabulary: [
      { bg: 'сирене', transliteration: 'sírene', en: 'white brine cheese (feta style)', sampleBg: 'Купувам прясно сирене.', sampleEn: 'I buy fresh white cheese.' },
      { bg: 'кашкавал', transliteration: 'kashkavál', en: 'yellow semi-hard cheese', sampleBg: 'Обичам препечена филийка с кашкавал.', sampleEn: 'I like toasted bread with kashkaval.' },
      { bg: 'кисело мляко', transliteration: 'kíselo myáko', en: 'Bulgarian yogurt', sampleBg: 'Една кофичка кисело мляко.', sampleEn: 'One tub of Bulgarian yogurt.' },
      { bg: 'хляб', transliteration: 'hlyab', en: 'bread', sampleBg: 'Един топъл хляб, моля.', sampleEn: 'One warm bread, please.' },
      { bg: 'Колко струва?', transliteration: 'Kólko strúva?', en: 'How much does it cost?', sampleBg: 'Колко струва това сирене?', sampleEn: 'How much does this cheese cost?' },
      { bg: 'лев / стотинка', transliteration: 'lev / stotínka', en: 'lev / stotinka (currency)', sampleBg: 'Това струва пет лева.', sampleEn: 'This costs five leva.' }
    ],
    grammarNotes: [
      'Count form for masculine nouns: after numerals 2, 3, 4, etc., use -а/-я instead of plural -и/-ове: два лева (not два левове), три стола, пет молива.',
      'For feminine and neuter nouns, use the regular plural: две жени, три села.'
    ],
    culturalNotes: [
      'Bulgarian yogurt (кисело мляко) contains the unique bacterium Lactobacillus bulgaricus, known worldwide for its longevity benefits.'
    ],
    exercises: [
      {
        instruction: 'Use the correct count form of the masculine noun:',
        items: [
          { prompt: 'два _____ (лев)', answer: 'лева' },
          { prompt: 'три _____ (час)', answer: 'часа' }
        ]
      }
    ]
  },

  // LESSON 7
  {
    id: 7,
    number: 7,
    titleBg: 'В кафенето, Напитки и Свободно време',
    titleEn: 'At the Café, Drinks & Free Time',
    level: 'Beginner',
    grammarFocus: [
      'Глаголи от 1-во спрежение с основна гласна -Е- (чета, пиша, пия, пея)',
      'Сегашно време: пия, пиеш, пие, пием, пиете, пият',
      'Поръчка в заведение ("Едно кафе, моля")',
      'Отрицание при глаголи ("Не пия кафе с захар")'
    ],
    dialogueTitle: 'На среща в кафене "България"',
    dialogue: [
      { speaker: 'Сервитьорка', bulgarian: 'Добър ден! Какво ще поръчате?', english: 'Good afternoon! What will you order?' },
      { speaker: 'Елена', bulgarian: 'За мен едно чисто еспресо без захар и бутилка минерална вода.', english: 'For me a black espresso without sugar and a bottle of mineral water.' },
      { speaker: 'Мартин', bulgarian: 'Аз ще пия билков чай с мед и лимон. Имате ли парче домашна торта?', english: 'I will drink herbal tea with honey and lemon. Do you have a slice of homemade cake?' },
      { speaker: 'Сервитьорка', bulgarian: 'Да, имаме чудесна шоколадова торта. Веднага ще ви донеса.', english: 'Yes, we have a wonderful chocolate cake. I will bring it right away.' }
    ],
    vocabulary: [
      { bg: 'кафе', transliteration: 'kafé', en: 'coffee', sampleBg: 'Пия кафе сутрин.', sampleEn: 'I drink coffee in the morning.' },
      { bg: 'чай', transliteration: 'chay', en: 'tea', sampleBg: 'Обичам билков чай с мед.', sampleEn: 'I like herbal tea with honey.' },
      { bg: 'минерална вода', transliteration: 'minerálna vodá', en: 'mineral water', sampleBg: 'Една чаша минерална вода.', sampleEn: 'A glass of mineral water.' },
      { bg: 'сок', transliteration: 'sok', en: 'juice', sampleBg: 'Портокалов сок, моля.', sampleEn: 'Orange juice, please.' },
      { bg: 'захар / мед', transliteration: 'záhar / med', en: 'sugar / honey', sampleBg: 'Кафе без захар.', sampleEn: 'Coffee without sugar.' },
      { bg: 'сметка', transliteration: 'smétka', en: 'bill / check', sampleBg: 'Сметката, моля!', sampleEn: 'The bill, please!' }
    ],
    grammarNotes: [
      'First Conjugation verbs end in -е- in the 3rd person singular present: чета -> чете, пиша -> пише, пия -> пие.',
      'Conjugation of "пия": аз пия, ти пиеш, той пие, ние пием, вие пиете, те пият.'
    ],
    culturalNotes: [
      'Going for coffee ("на кафе") in Bulgaria is a long social ritual that can last two hours or more while conversing with friends.'
    ],
    exercises: [
      {
        instruction: 'Conjugate the verb "пия" (to drink):',
        items: [
          { prompt: 'Аз _____ кафе.', answer: 'пия' },
          { prompt: 'Ти какво _____?', answer: 'пиеш' }
        ]
      }
    ]
  },

  // LESSON 8
  {
    id: 8,
    number: 8,
    titleBg: 'Моят град, Забележителности и Ориентация',
    titleEn: 'My City, Landmarks & Orienting',
    level: 'Beginner',
    grammarFocus: [
      'Въпрос за местоположение: "Къде се намира...?"',
      'Предлози за място: срещу, близо до, далеч от, до, между',
      'Ориентация в града: "Вървете направо, завийте наляво/надясно"',
      'Членуване на географски и градски обекти'
    ],
    dialogueTitle: 'Питане за посоката към Народния театър',
    dialogue: [
      { speaker: 'Турист', bulgarian: 'Извинете, госпожо! Може ли да ми кажете къде се намира Народният театър "Иван Вазов"?', english: 'Excuse me, madam! Could you tell me where the "Ivan Vazov" National Theatre is located?' },
      { speaker: 'Минувачка', bulgarian: 'Разбира се. Вървете право напред по тази улица до Градската градина. Театърът е точно срещу фонтана.', english: 'Of course. Walk straight ahead down this street until the City Garden. The theatre is right opposite the fountain.' },
      { speaker: 'Турист', bulgarian: 'Далеч ли е оттук?', english: 'Is it far from here?' },
      { speaker: 'Минувачка', bulgarian: 'Не, съвсем близо е - около пет минути пеша.', english: 'No, it is very close - about five minutes on foot.' },
      { speaker: 'Турист', bulgarian: 'Много ви благодаря!', english: 'Thank you very much!' }
    ],
    vocabulary: [
      { bg: 'улица / площад', transliteration: 'úlitsa / ploshtád', en: 'street / square', sampleBg: 'Живея на централна улица.', sampleEn: 'I live on a central street.' },
      { bg: 'театър / музей', transliteration: 'teátǎr / muzéy', en: 'theatre / museum', sampleBg: 'Народният театър е красив.', sampleEn: 'The National Theatre is beautiful.' },
      { bg: 'направо', transliteration: 'naprávo', en: 'straight ahead', sampleBg: 'Вървете само направо.', sampleEn: 'Walk only straight ahead.' },
      { bg: 'наляво / надясно', transliteration: 'nalyávo / nadyásno', en: 'to the left / to the right', sampleBg: 'Завийте наляво след светофара.', sampleEn: 'Turn left after the traffic lights.' },
      { bg: 'близо / далеч', transliteration: 'blízo / daléch', en: 'near / far', sampleBg: 'Метрото е близо.', sampleEn: 'The subway is near.' }
    ],
    grammarNotes: [
      'Use "Къде се намира...?" (Where is ... located?) as the most natural polite inquiry in Bulgarian.',
      'Preposition "срещу" means "opposite / facing", while "до" means "next to / by".'
    ],
    culturalNotes: [
      'The Ivan Vazov National Theatre in Sofia was built in 1906 by renowned Viennese architects Helmer and Fellner.'
    ],
    exercises: [
      {
        instruction: 'Fill in with the opposite word (наляво / надясно, близо / далеч):',
        items: [
          { prompt: 'Не завивайте наляво, завийте _____.', answer: 'надясно' },
          { prompt: 'Хотелът не е далеч, той е съвсем _____.', answer: 'близо' }
        ]
      }
    ]
  },

  // LESSON 9
  {
    id: 9,
    number: 9,
    titleBg: 'Времето, Сезоните и Климатът в България',
    titleEn: 'Weather, Four Seasons & Climate',
    level: 'Beginner',
    grammarFocus: [
      'Сезоните: пролет, лято, есен, зима',
      'Безлични изрази за време: "Топло е", "Студено е", "Вали дъжд", "Духа вятър"',
      'Степенуване на прилагателни (по-топло, най-топло)',
      'Въпросът: "Какво е времето днес?"'
    ],
    dialogueTitle: 'Прогнозата за времето над България',
    dialogue: [
      { speaker: 'Борис', bulgarian: 'Какво е времето навън днес? Студено ли е?', english: 'What is the weather like outside today? Is it cold?' },
      { speaker: 'Силвия', bulgarian: 'Днес времето е чудесно! Слънчево е, температурата е около двайсет и два градуса.', english: 'Today the weather is wonderful! It is sunny, temperature is around 22 degrees.' },
      { speaker: 'Борис', bulgarian: 'Очаква ли се да вали дъжд следобед?', english: 'Is rain expected in the afternoon?' },
      { speaker: 'Силвия', bulgarian: 'Синоптиците казаха, че утре в планините ще превали, но днес ще бъде ясно и тихо.', english: 'Weather forecasters said tomorrow it will rain in the mountains, but today will be clear and calm.' }
    ],
    vocabulary: [
      { bg: 'пролет (ж.р.)', transliteration: 'prólet', en: 'spring', sampleBg: 'През пролетта цъфтят дърветата.', sampleEn: 'In spring trees blossom.' },
      { bg: 'лято (ср.р.)', transliteration: 'lyáto', en: 'summer', sampleBg: 'През лятото ходим на Черно море.', sampleEn: 'In summer we go to the Black Sea.' },
      { bg: 'есен (ж.р.)', transliteration: 'ésen', en: 'autumn / fall', sampleBg: 'Есента е златна и красива.', sampleEn: 'Autumn is golden and beautiful.' },
      { bg: 'зима (ж.р.)', transliteration: 'zíma', en: 'winter', sampleBg: 'През зимата караме ски в Банско.', sampleEn: 'In winter we ski in Bansko.' },
      { bg: 'слънчево / дъждовно', transliteration: 'slǎ́nchevo / dǎzhdóvno', en: 'sunny / rainy', sampleBg: 'Днес е слънчево.', sampleEn: 'Today it is sunny.' },
      { bg: 'сняг / дъжд', transliteration: 'snyag / dǎzhd', en: 'snow / rain', sampleBg: 'Вали пухкав сняг.', sampleEn: 'Fluffy snow is falling.' }
    ],
    grammarNotes: [
      'Comparative degree uses prefix "по-" with a hyphen: по-топъл, по-студен.',
      'Superlative degree uses prefix "най-" with a hyphen: най-топъл, най-студен.'
    ],
    culturalNotes: [
      'Bulgaria has four distinct seasons with temperate continental climate, hot sunny summers on the Black Sea coast, and snowy winters in the Rila, Pirin, and Rhodope mountains.'
    ],
    exercises: [
      {
        instruction: 'Form the comparative and superlative degrees:',
        items: [
          { prompt: 'топъл -> comparative: _____', answer: 'по-топъл' },
          { prompt: 'студен -> superlative: _____', answer: 'най-студен' }
        ]
      }
    ]
  },

  // LESSON 10
  {
    id: 10,
    number: 10,
    titleBg: 'Моят работен ден, Професии и Часовникът',
    titleEn: 'My Working Day, Occupations & Clock Time',
    level: 'Beginner',
    grammarFocus: [
      'Глаголи от 2-ро спрежение с основна гласна -И- (говоря, уча, мисля, работя)',
      'Колко е часът? Изразяване на точен час, половина и четвърт',
      'Сегашно време на 2-ро спрежение: уча, учиш, учи, учим, учите, учат',
      'Названия на професии и месторабота'
    ],
    dialogueTitle: 'Един ден на архитект Каменов',
    dialogue: [
      { speaker: 'Колега', bulgarian: 'Колко е часът, Георги? Закъсняваме ли за срещата?', english: 'What time is it, Georgi? Are we late for the meeting?' },
      { speaker: 'Георги', bulgarian: 'Сега е десет и петнайсет. Срещата с клиента започва в десет и половина.', english: 'Now it is ten fifteen. The meeting with the client starts at ten thirty.' },
      { speaker: 'Колега', bulgarian: 'От колко часа работиш сутрин?', english: 'From what time do you work in the morning?' },
      { speaker: 'Георги', bulgarian: 'Ставам в седем, закусвам и в осем и половина вече съм в бюрото.', english: 'I get up at seven, have breakfast and at eight thirty I am already at the office.' }
    ],
    vocabulary: [
      { bg: 'Колко е часът?', transliteration: 'Kólko e chasǎ́t?', en: 'What time is it?', sampleBg: 'Извинете, колко е часът?', sampleEn: 'Excuse me, what time is it?' },
      { bg: 'час / минута', transliteration: 'chas / minúta', en: 'hour / minute', sampleBg: 'Идвам след половин час.', sampleEn: 'I am coming in half an hour.' },
      { bg: 'половина / четвърт', transliteration: 'polovína / chétvǎrt', en: 'half / quarter', sampleBg: 'Сега е пет и половина.', sampleEn: 'Now it is half past five.' },
      { bg: 'работя', transliteration: 'rabótya', en: 'to work', sampleBg: 'Работя като архитект.', sampleEn: 'I work as an architect.' },
      { bg: 'уча', transliteration: 'úcha', en: 'to study / to learn', sampleBg: 'Уча български език.', sampleEn: 'I study the Bulgarian language.' },
      { bg: 'офис / кантора', transliteration: 'ófis / kantóra', en: 'office / bureau', sampleBg: 'Офисът ни е в центъра.', sampleEn: 'Our office is in the center.' }
    ],
    grammarNotes: [
      'Second Conjugation verbs end in -и- in 3rd person singular: учи -> учиш, учи; работи -> работиш, работи.',
      'Expressing time: "В осем часа" (At 8 o\'clock), "В осем и половина" (At half past eight), "В осем без петнайсет" (At quarter to eight).'
    ],
    culturalNotes: [
      'Punctuality in formal business settings in Bulgaria is valued, though social gatherings allow a polite 10-15 minute flexibility.'
    ],
    exercises: [
      {
        instruction: 'Conjugate "уча" (to study):',
        items: [
          { prompt: 'Аз _____ български.', answer: 'уча' },
          { prompt: 'Те _____ в университета.', answer: 'учат' }
        ]
      }
    ]
  },

  // LESSON 11
  {
    id: 11,
    number: 11,
    titleBg: 'В пощата и Банката',
    titleEn: 'At the Post Office & The Bank',
    level: 'Intermediate',
    grammarFocus: [
      'Редни числителни имена (първи, втори, трети, четвърти...) и съгласуване',
      'Обмяна на валута и банкови термини (курс купува/продава, банкомат, сметка)',
      'Изпращане на писмо, колет и препоръчана поща',
      'Употреба на "мога" и "трябва"'
    ],
    dialogueTitle: 'Обмяна на валута в банката',
    dialogue: [
      { speaker: 'Служител', bulgarian: 'Добър ден, как мога да ви помогна?', english: 'Good afternoon, how can I help you?' },
      { speaker: 'Клиент', bulgarian: 'Искам да обменя двеста евро в български лева. Какъв е курсът днес?', english: 'I want to exchange 200 euros into Bulgarian leva. What is the exchange rate today?' },
      { speaker: 'Служител', bulgarian: 'Официалният фиксиран курс е 1 евро за 1.95583 лева. Няма допълнителна комисиона. Моля, покажете документ за самоличност.', english: 'The official fixed rate is 1 euro for 1.95583 leva. There is no extra commission. Please show ID.' },
      { speaker: 'Клиент', bulgarian: 'Заповядайте паспорта ми.', english: 'Here is my passport.' }
    ],
    vocabulary: [
      { bg: 'поща / банка', transliteration: 'póshta / bánka', en: 'post office / bank', sampleBg: 'Пощата работи до шест часа.', sampleEn: 'The post office is open until 6.' },
      { bg: 'марка / плик', transliteration: 'márka / plik', en: 'postage stamp / envelope', sampleBg: 'Трябва ми марка за писмо до Лондон.', sampleEn: 'I need a stamp for a letter to London.' },
      { bg: 'обмяна на валута', transliteration: 'obmyána na valúta', en: 'currency exchange', sampleBg: 'Къде има обменно бюро?', sampleEn: 'Where is there an exchange booth?' },
      { bg: 'банкомат', transliteration: 'bankomát', en: 'ATM / cash machine', sampleBg: 'Тегля пари от банкомата.', sampleEn: 'I withdraw money from the ATM.' },
      { bg: 'паспорт / лична карта', transliteration: 'pásport / líchna kárta', en: 'passport / identity card', sampleBg: 'Ето личната ми карта.', sampleEn: 'Here is my ID card.' }
    ],
    grammarNotes: [
      'The Bulgarian Lev has had a legally fixed peg to the Euro since 1999 (1 EUR = 1.95583 BGN).',
      'Ordinal numbers behave like adjectives: първи (m), първа (f), първо (n), първи (pl).'
    ],
    culturalNotes: [
      'Postcards from Bulgarian historic towns (like Nesebar, Sozopol, Koprivshtitsa) are classic souvenirs sent to family abroad.'
    ],
    exercises: [
      {
        instruction: 'Write the feminine form of the ordinal number:',
        items: [
          { prompt: 'първи етаж -> _____ стая', answer: 'първа' },
          { prompt: 'втори ден -> _____ седмица', answer: 'втора' }
        ]
      }
    ]
  },

  // LESSON 12
  {
    id: 12,
    number: 12,
    titleBg: 'На пазара за плодове и зеленчуци',
    titleEn: 'At the Open-Air Green Market',
    level: 'Intermediate',
    grammarFocus: [
      'Множествено число на плодове и зеленчуци (домати, краставици, чушки, ябълки)',
      'Сравнение на качества: "по-сладък", "по-пресен", "най-хубав"',
      'Разговорни пазарни изрази ("Опитайте!", "Колко да ви претегля?")',
      'Кратки форми на дателните местоимения (ми, ти, му, ѝ, ни, ви, им)'
    ],
    dialogueTitle: 'Пазаруване на Женския пазар в София',
    dialogue: [
      { speaker: 'Продавачка', bulgarian: 'Заповядайте, момче! Пресни розови домати от Пловдив, много са сладки!', english: 'Come over, young man! Fresh pink tomatoes from Plovdiv, they are very sweet!' },
      { speaker: 'Купувач', bulgarian: 'Колко струва килограмът от розовите домати?', english: 'How much is a kilogram of the pink tomatoes?' },
      { speaker: 'Продавачка', bulgarian: 'Четири лева килото. Да ви претегля ли два килограма?', english: 'Four leva per kilo. Shall I weigh two kilograms for you?' },
      { speaker: 'Купувач', bulgarian: 'Да, сложете ми два килограма домати, един килограм краставици и половин килограм пресни ягоди.', english: 'Yes, put in two kilos of tomatoes, one kilo of cucumbers, and half a kilo of fresh strawberries.' }
    ],
    vocabulary: [
      { bg: 'домати / краставици', transliteration: 'domáti / krástavitsi', en: 'tomatoes / cucumbers', sampleBg: 'Купувам сладки домати.', sampleEn: 'I buy sweet tomatoes.' },
      { bg: 'чушки / пипер', transliteration: 'chúshki / pipér', en: 'peppers', sampleBg: 'Печени чушки със сирене.', sampleEn: 'Roasted peppers with cheese.' },
      { bg: 'ябълки / круши', transliteration: 'yábǎlki / krúshi', en: 'apples / pears', sampleBg: 'Тези ябълки са сочни.', sampleEn: 'These apples are juicy.' },
      { bg: 'дини / пъпеши', transliteration: 'díni / pǎ́peshi', en: 'watermelons / melons', sampleBg: 'През август ядем студена диня.', sampleEn: 'In August we eat cold watermelon.' },
      { bg: 'пресен / прясна', transliteration: 'présen / pryásna', en: 'fresh', sampleBg: 'Прясна салата.', sampleEn: 'Fresh salad.' }
    ],
    grammarNotes: [
      'Vegetable plural forms: домат -> домати, морков -> моркови, картоф -> картофи, патладжан -> патладжани.',
      '"Кило" is a common colloquial abbreviation for "килограм".'
    ],
    culturalNotes: [
      'The "Zhenski Pazar" (Women\'s Market) is the oldest open-air market in Sofia, operating continuously since Ottoman times.'
    ],
    exercises: [
      {
        instruction: 'Provide the plural form of the vegetables:',
        items: [
          { prompt: 'един домат -> два _____', answer: 'домата' },
          { prompt: 'една чушка -> много _____', answer: 'чушки' }
        ]
      }
    ]
  },

  // LESSON 13
  {
    id: 13,
    number: 13,
    titleBg: 'В хотела, Резервация и Настаняване',
    titleEn: 'At the Hotel & Accommodation',
    level: 'Intermediate',
    grammarFocus: [
      'Форми за вежливост: "Имате ли свободна стая?", "Бих искал да резервирам"',
      'Видове стаи: единична стая, двойна стая, апартамент с изглед към морето/планината',
      'Включени услуги (закуска, безжичен интернет, климатик, паркинг)',
      'Въпросителни думи: кога, колко, как, за колко дни'
    ],
    dialogueTitle: 'Настаняване в хотел "Рила"',
    dialogue: [
      { speaker: 'Рецепционист', bulgarian: 'Добър вечер, добре дошли в хотел "Рила"!', english: 'Good evening, welcome to Hotel Rila!' },
      { speaker: 'Гост', bulgarian: 'Добър вечер. Имам резервация на името на Джон Смит за три нощувки.', english: 'Good evening. I have a reservation under the name of John Smith for three nights.' },
      { speaker: 'Рецепционист', bulgarian: 'Да, виждам резервацията. Двойна стая с изглед към планината и включена закуска на шведска маса.', english: 'Yes, I see the reservation. Double room with mountain view and buffet breakfast included.' },
      { speaker: 'Гост', bulgarian: 'Чудесно. В колко часа се сервира закуската?', english: 'Wonderful. At what time is breakfast served?' },
      { speaker: 'Рецепционист', bulgarian: 'От седем до десет часа в ресторанта на първия етаж. Ето вашия ключ, стая триста и четири.', english: 'From 7 to 10 in the restaurant on the 1st floor. Here is your key, room 304.' }
    ],
    vocabulary: [
      { bg: 'стая', transliteration: 'stáya', en: 'room', sampleBg: 'Стаята е светла и чиста.', sampleEn: 'The room is bright and clean.' },
      { bg: 'резервация', transliteration: 'rezervátsiya', en: 'reservation / booking', sampleBg: 'Направих резервация по интернет.', sampleEn: 'I made a reservation online.' },
      { bg: 'нощувка', transliteration: 'noshtúvka', en: 'night (stay)', sampleBg: 'Колко струва една нощувка?', sampleEn: 'How much does one night stay cost?' },
      { bg: 'закуска', transliteration: 'zakúska', en: 'breakfast', sampleBg: 'Закуската е включена в цената.', sampleEn: 'Breakfast is included in the price.' },
      { bg: 'ключ', transliteration: 'klyuch', en: 'key', sampleBg: 'Заповядайте ключа от стаята.', sampleEn: 'Here is the key to the room.' }
    ],
    grammarNotes: [
      'In Bulgarian hotels, "нощувка" (overnight stay) is used to count nights rather than "нощ".',
      '"С изглед към..." translates "with a view of..." (e.g. с изглед към морето - sea view).'
    ],
    culturalNotes: [
      'Bulgaria has world-class spa and balneology hotels in mineral spring towns like Velingrad, Sandanski, and Hisarya.'
    ],
    exercises: [
      {
        instruction: 'Fill in the blank with "стая" or "нощувка":',
        items: [
          { prompt: 'Резервирам двойна _____.', answer: 'стая' },
          { prompt: 'Оставаме за три _____.', answer: 'нощувки' }
        ]
      }
    ]
  },

  // LESSON 14
  {
    id: 14,
    number: 14,
    titleBg: 'На път, Градски транспорт и Вид на глагола',
    titleEn: 'Transport, Tickets & Verbal Aspect',
    level: 'Intermediate',
    grammarFocus: [
      'Вид на глагола: Свършен вид (Perfective) срещу Несвършен вид (Imperfective)',
      'Винителни форми на личните местоимения (Accusative: ме, те, го, я, ни, ви, ги)',
      'Градски транспорт: билети, карти за пътуване, перфориране / валидиране',
      'Поръчка на такси в България'
    ],
    dialogueTitle: 'Фред и Здравка пътуват из София',
    dialogue: [
      { speaker: 'Фред', bulgarian: 'Как да стигнем до Националната художествена галерия?', english: 'How do we get to the National Art Gallery?' },
      { speaker: 'Здравка', bulgarian: 'Първо пътуваме с автобуса за две спирки, след това пътуваме с метрото, после вървим малко пеша.', english: 'First we travel by bus for two stops, then take the metro, then walk a little.' },
      { speaker: 'Фред', bulgarian: 'Трябва ли да си купим билети?', english: 'Do we need to buy tickets?' },
      { speaker: 'Здравка', bulgarian: 'Да, по-добре е да си вземеш дневна карта, защото е валидна за цял ден.', english: 'Yes, it is better to get a daily card because it is valid all day.' },
      { speaker: 'Фред', bulgarian: 'Шофьорът ли заверява билета?', english: 'Does the driver stamp the ticket?' },
      { speaker: 'Здравка', bulgarian: 'Не, просто трябва да го валидираш на автомата.', english: 'No, you simply have to validate it on the device.' }
    ],
    vocabulary: [
      { bg: 'пътувам', transliteration: 'pǎtúvam', en: 'to travel', sampleBg: 'Обичам да пътувам.', sampleEn: 'I love to travel.' },
      { bg: 'автобус / трамвай / метро', transliteration: 'avtobús / tramváy / metró', en: 'bus / tram / metro', sampleBg: 'Метрото е бързо.', sampleEn: 'The metro is fast.' },
      { bg: 'спирка', transliteration: 'spírka', en: 'stop / station', sampleBg: 'Слизам на следващата спирка.', sampleEn: 'I get off at the next stop.' },
      { bg: 'билет / карта', transliteration: 'bilét / kárta', en: 'ticket / travel card', sampleBg: 'Купувам дневна карта.', sampleEn: 'I buy a daily card.' },
      { bg: 'такси', transliteration: 'taksí', en: 'taxi', sampleBg: 'Взимаме такси.', sampleEn: 'We take a taxi.' },
      { bg: 'пеша', transliteration: 'peshá', en: 'on foot', sampleBg: 'Вървим пеша.', sampleEn: 'We walk on foot.' }
    ],
    grammarNotes: [
      'Imperfective aspect denotes ongoing, continuous, or repeated actions (купувам, пиша).',
      'Perfective aspect denotes completed, one-time actions (купя, напиша). Perfective verbs cannot stand alone in present tense without "да" or "ще".'
    ],
    culturalNotes: [
      'Sofia\'s metro network is ultra-modern and features underground stations that display excavated ancient Roman ruins from ancient Serdica.'
    ],
    exercises: [
      {
        instruction: 'Choose "купувам" (repeated) or "купя" (one-time completion):',
        items: [
          { prompt: 'Всеки ден _____ билет.', answer: 'купувам' },
          { prompt: 'Сега искам да _____ карта.', answer: 'купя' }
        ]
      }
    ]
  },

  // LESSON 15
  {
    id: 15,
    number: 15,
    titleBg: 'На гарата и С влак из България',
    titleEn: 'At the Railway Station & Train Journeys',
    level: 'Intermediate',
    grammarFocus: [
      'Разписание на влаковете (бърз влак, пътнически влак, експрес)',
      'Купуване на билет за влак: еднопосочен билет, двупосочен билет, първа / втора класа',
      'Коловоз, перон, купе и места за сядане',
      'Въпросът "От кой коловоз заминава влакът?"'
    ],
    dialogueTitle: 'На Централна гара София за Пловдив',
    dialogue: [
      { speaker: 'Пътник', bulgarian: 'Добър ден! Един двупосочен билет за бързия влак за Пловдив, моля.', english: 'Good afternoon! One return ticket for the fast train to Plovdiv, please.' },
      { speaker: 'Касиерка', bulgarian: 'Първа или втора класа предпочитате?', english: 'Do you prefer first or second class?' },
      { speaker: 'Пътник', bulgarian: 'Втора класа, с запазено място до прозореца.', english: 'Second class, with a reserved seat next to the window.' },
      { speaker: 'Касиерка', bulgarian: 'Влакът заминава в тринайсет и двайсет от четвърти коловоз.', english: 'The train departs at 13:20 from platform (track) four.' },
      { speaker: 'Пътник', bulgarian: 'Благодаря ви, приятен ден!', english: 'Thank you, have a nice day!' }
    ],
    vocabulary: [
      { bg: 'гара / влак', transliteration: 'gára / vlak', en: 'station / train', sampleBg: 'Влакът пристига на гарата.', sampleEn: 'The train arrives at the station.' },
      { bg: 'коловоз / перон', transliteration: 'kolovóz / perón', en: 'track / platform', sampleBg: 'Влакът е на първи коловоз.', sampleEn: 'The train is on track one.' },
      { bg: 'еднопосочен билет', transliteration: 'ednoposóchen bilét', en: 'one-way ticket', sampleBg: 'Искам еднопосочен билет.', sampleEn: 'I want a one-way ticket.' },
      { bg: 'двупосочен билет', transliteration: 'dvuposóchen bilét', en: 'round-trip / return ticket', sampleBg: 'Двупосочният билет е с отстъпка.', sampleEn: 'The return ticket has a discount.' },
      { bg: 'запазено място', transliteration: 'zapázeno myásto', en: 'reserved seat', sampleBg: 'Имам запазено място в купето.', sampleEn: 'I have a reserved seat in the compartment.' }
    ],
    grammarNotes: [
      'In Bulgarian rail terminology, "коловоз" refers specifically to the railroad track, while "перон" is the platform where passengers stand.'
    ],
    culturalNotes: [
      'The scenic Rhodope narrow-gauge railway (Септември–Добринище) is the last remaining operating 760mm narrow-gauge railway in Bulgaria.'
    ],
    exercises: [
      {
        instruction: 'Complete the sentence with "коловоз" or "билет":',
        items: [
          { prompt: 'Влакът за Варна тръгва от трети _____.', answer: 'коловоз' },
          { prompt: 'Купувам двупосочен _____.', answer: 'билет' }
        ]
      }
    ]
  },

  // LESSON 16
  {
    id: 16,
    number: 16,
    titleBg: 'На летището, Полети и Митница',
    titleEn: 'At the Airport, Flights & Border Control',
    level: 'Intermediate',
    grammarFocus: [
      'Летищни термини: гише за регистрация, полет, заминаващи, пристигащи',
      'Багаж: ръчен багаж, чекиран куфар, свръхбагаж',
      'Митническа декларация и паспортен контрол',
      'Изразяване на забрана и разрешение ("Забранено е", "Разрешено ли е?")'
    ],
    dialogueTitle: 'На Летище София - Терминал 2',
    dialogue: [
      { speaker: 'Служителка', bulgarian: 'Добър ден, паспорта и билета ви, моля.', english: 'Good afternoon, your passport and ticket, please.' },
      { speaker: 'Пътничка', bulgarian: 'Заповядайте. Летя за Франкфурт с полет FB 437.', english: 'Here you are. I am flying to Frankfurt on flight FB 437.' },
      { speaker: 'Служителка', bulgarian: 'Поставете куфара на кантара. Имате ли ръчен багаж?', english: 'Place the suitcase on the scales. Do you have cabin luggage?' },
      { speaker: 'Пътничка', bulgarian: 'Само тази малка раница.', english: 'Only this small backpack.' },
      { speaker: 'Служителка', bulgarian: 'Ето вашата бордна карта. Изходът за качване е B4, качването започва в десет и петнайсет.', english: 'Here is your boarding pass. Gate is B4, boarding begins at 10:15.' }
    ],
    vocabulary: [
      { bg: 'летище / самолет', transliteration: 'letíste / samolét', en: 'airport / airplane', sampleBg: 'Летище София има два терминала.', sampleEn: 'Sofia Airport has two terminals.' },
      { bg: 'полет', transliteration: 'pólet', en: 'flight', sampleBg: 'Полетът закъснява с 20 минути.', sampleEn: 'The flight is delayed 20 minutes.' },
      { bg: 'бордна карта', transliteration: 'bórdna kárta', en: 'boarding pass', sampleBg: 'Покажете бордната карта.', sampleEn: 'Show the boarding pass.' },
      { bg: 'куфар / раница', transliteration: 'kúfar / ránitsa', en: 'suitcase / backpack', sampleBg: 'Куфарът ми тежи 18 килограма.', sampleEn: 'My suitcase weighs 18 kg.' },
      { bg: 'изход за качване (гейт)', transliteration: 'íz-hod za káchvane', en: 'boarding gate', sampleBg: 'Отиваме към изход B4.', sampleEn: 'We are heading to gate B4.' }
    ],
    grammarNotes: [
      'The word "самолет" is masculine (самолетът, самолети), while "летище" is neuter (летището, летища).'
    ],
    culturalNotes: [
      'Bulgaria joined the Schengen air and sea travel area in March 2024, eliminating border checks for flights within member states.'
    ],
    exercises: [
      {
        instruction: 'Fill in the blank with "бордна карта" or "полет":',
        items: [
          { prompt: 'На гишето ми дадоха _____.', answer: 'бордна карта' },
          { prompt: 'Нашият _____ е в 14:00.', answer: 'полет' }
        ]
      }
    ]
  },

  // LESSON 17
  {
    id: 17,
    number: 17,
    titleBg: 'По телефона и Уговаряне на среща',
    titleEn: 'On the Telephone & Scheduling Appointments',
    level: 'Intermediate',
    grammarFocus: [
      'Телефонен етикет ("Ало!", "Кой се обажда?", "Може ли да говоря с...?")',
      'Предаване на съобщение ("Може ли да му предадете, че...?")',
      'Уговаряне на време и място за среща',
      'Дателни местоимения в кратка форма (ми, ти, му, ѝ, ни, ви, им)'
    ],
    dialogueTitle: 'Телефонен разговор между Стефан и Радослав',
    dialogue: [
      { speaker: 'Радослав', bulgarian: 'Ало, Радослав слуша.', english: 'Hello, Radoslav speaking.' },
      { speaker: 'Стефан', bulgarian: 'Здравей, Радо! Стефан е. Свободен ли си тази събота следобед?', english: 'Hi, Rado! It is Stefan. Are you free this Saturday afternoon?' },
      { speaker: 'Радослав', bulgarian: 'Здравей, Стефане! Да, свободен съм след четири часа. Какво предлагаш?', english: 'Hi Stefan! Yes, I am free after four. What do you suggest?' },
      { speaker: 'Стефан', bulgarian: 'Хайде да отидем на Витоша до хижа "Алеко" на чист въздух.', english: 'Let\'s go to Vitosha mountain up to Aleko chalet for fresh air.' },
      { speaker: 'Радослав', bulgarian: 'Страхотна идея! Ще се чакаме ли пред спирката на автобуса в четири и половина?', english: 'Great idea! Shall we meet in front of the bus stop at 4:30?' }
    ],
    vocabulary: [
      { bg: 'Ало!', transliteration: 'Alo!', en: 'Hello! (on the phone)', sampleBg: 'Ало, чуваме ли се?', sampleEn: 'Hello, can you hear me?' },
      { bg: 'Кой се обажда?', transliteration: 'Koy se obázhda?', en: 'Who is calling?', sampleBg: 'Извинете, кой се обажда?', sampleEn: 'Excuse me, who is calling?' },
      { bg: 'обаждам се / обадя се', transliteration: 'obázhdam se', en: 'to call / ring', sampleBg: 'Ще ти се обадя утре.', sampleEn: 'I will call you tomorrow.' },
      { bg: 'среща', transliteration: 'sréshta', en: 'meeting / appointment / date', sampleBg: 'Имам важна среща.', sampleEn: 'I have an important meeting.' },
      { bg: 'хижа', transliteration: 'hízha', en: 'mountain hut / chalet', sampleBg: 'Спим в хижа в планината.', sampleEn: 'We sleep in a mountain chalet.' }
    ],
    grammarNotes: [
      'In Bulgarian phone conversations, "Ало" is the universal greeting.',
      '"Слушам" (literally "I am listening") is also a polite greeting used by office receptionists or professionals answering work phones.'
    ],
    culturalNotes: [
      'Mount Vitosha rises immediately above Sofia (highest peak Cherni Vrah, 2,290 m), allowing residents to reach alpine hiking trails in 30 minutes.'
    ],
    exercises: [
      {
        instruction: 'Fill in the correct phone phrase:',
        items: [
          { prompt: 'Когато вдигна телефона, казвам: "_____!"', answer: 'Ало' },
          { prompt: 'Когато питам за името на обаждащия се: "Кой се _____?"', answer: 'обажда' }
        ]
      }
    ]
  },

  // LESSON 18
  {
    id: 18,
    number: 18,
    titleBg: 'Мода, Облекло, Размери и Цветове',
    titleEn: 'Fashion, Clothing, Sizes & Shopping',
    level: 'Intermediate',
    grammarFocus: [
      'Названия на дрехи и обувки (рокля, костюм, палто, сако, риза, панталон)',
      'Цветове и съгласуване по род и число (бял/бяла/бяло/бели, син/синя/синьо/сини)',
      'Проба на дреха: "Може ли да я премеря?", "Става ми", "Малка ми е"',
      'Размери на облекло и обувки'
    ],
    dialogueTitle: 'В бутика за дамска и мъжка мода',
    dialogue: [
      { speaker: 'Продавач', bulgarian: 'Добър ден, с какво мога да ви помогна?', english: 'Good afternoon, how can I help you?' },
      { speaker: 'Клиентка', bulgarian: 'Харесва ми тази синя рокля на витрината. Имате ли я в размер М?', english: 'I like this blue dress in the display window. Do you have it in size M?' },
      { speaker: 'Продавач', bulgarian: 'Да, заповядайте. Пробната кабина е отляво в края.', english: 'Yes, here you are. The fitting cabin is on the left at the end.' },
      { speaker: 'Клиентка', bulgarian: 'Роклята ми става перфектно. От какъв плат е ушита?', english: 'The dress fits me perfectly. What fabric is it sewn from?' },
      { speaker: 'Продавач', bulgarian: 'От чист естествен памук с малко еластан за удобство.', english: 'From pure natural cotton with a little elastane for comfort.' }
    ],
    vocabulary: [
      { bg: 'рокля / пола', transliteration: 'róklya / póla', en: 'dress / skirt', sampleBg: 'Тази синя рокля е елегантна.', sampleEn: 'This blue dress is elegant.' },
      { bg: 'костюм / сако', transliteration: 'kostyúm / sakó', en: 'suit / jacket', sampleBg: 'Нося тъмен костюм.', sampleEn: 'I wear a dark suit.' },
      { bg: 'риза / панталон', transliteration: 'ríza / pantalón', en: 'shirt / trousers', sampleBg: 'Бяла памучна риза.', sampleEn: 'White cotton shirt.' },
      { bg: 'пробвам / премеря', transliteration: 'próbvam / premérya', en: 'to try on', sampleBg: 'Може ли да премеря палтото?', sampleEn: 'May I try on the coat?' },
      { bg: 'размер', transliteration: 'razmér', en: 'size', sampleBg: 'Кой размер носите?', sampleEn: 'What size do you wear?' }
    ],
    grammarNotes: [
      'Bulgarian color adjectives agree with nouns: бял мъж, бяла риза, бяло палто, бели обувки.',
      'Idiom for fit: "Става ми" = It fits me; "Голямо ми е" = It is too big for me; "Тясно ми е" = It is too tight for me.'
    ],
    culturalNotes: [
      'Traditional Bulgarian embroidery (шевици) uses geometric patterns in red, green, and gold, each motif symbolizing protection, fertility, and health.'
    ],
    exercises: [
      {
        instruction: 'Adjust the adjective "син" (blue) to match the gender:',
        items: [
          { prompt: 'костюм (m) -> _____ костюм', answer: 'син' },
          { prompt: 'рокля (f) -> _____ рокля', answer: 'синя' },
          { prompt: 'палто (n) -> _____ палто', answer: 'синьо' }
        ]
      }
    ]
  },

  // LESSON 19
  {
    id: 19,
    number: 19,
    titleBg: 'На ресторант и Българска национална кухня',
    titleEn: 'At the Restaurant & Traditional Cuisine',
    level: 'Intermediate',
    grammarFocus: [
      'Учтив речник при поръчка (Polite ordering phrases: "Бих искал/а...", "Какво ще препоръчате?")',
      'Традиционни български ястия и напитки (Шопска салата, Таратор, Каварма, Баница)',
      'Вкусове и описания (солен, лют, кисел, сладък, мазен)',
      'Сметката, бакшиш и плащане в брой или с карта'
    ],
    dialogueTitle: 'Вечеря в механа "Български тертип"',
    dialogue: [
      { speaker: 'Сервитьор', bulgarian: 'Добър вечер! Заповядайте в нашата механа. Ето менюто.', english: 'Good evening! Welcome to our traditional tavern. Here is the menu.' },
      { speaker: 'Константин', bulgarian: 'Добър вечер. За начало бихме искали две Шопски салати и кана червено вино мерло.', english: 'Good evening. To start we would like two Shopska salads and a jug of Merlot red wine.' },
      { speaker: 'Емилия', bulgarian: 'А какво традиционно топло ястие ще ни препоръчате за основно?', english: 'And what traditional hot dish would you recommend for the main course?' },
      { speaker: 'Сервитьор', bulgarian: 'Препоръчвам свинска каварма в глинен гювеч или сирене по шопски с пресни яйца и домати.', english: 'I recommend pork kavarma in a clay pot or cheese Shopska style with eggs and tomatoes.' },
      { speaker: 'Константин', bulgarian: 'Отлично! Донесете ни две каварми и топла пърленка с чесън.', english: 'Excellent! Bring us two kavarmas and warm flatbread with garlic.' }
    ],
    vocabulary: [
      { bg: 'Шопска салата', transliteration: 'Shópska saláta', en: 'Shopska salad (tomatoes, cucumbers, peppers, white cheese)', sampleBg: 'Шопската салата е национална гордост.', sampleEn: 'Shopska salad is national pride.' },
      { bg: 'таратор', transliteration: 'taratór', en: 'cold cucumber yogurt soup with walnuts', sampleBg: 'Обичам студен таратор.', sampleEn: 'I like cold tarator.' },
      { bg: 'каварма', transliteration: 'kavarmá', en: 'traditional meat stew baked in clay pot', sampleBg: 'Кавармата ухае прекрасно.', sampleEn: 'The kavarma smells wonderful.' },
      { bg: 'пърленка', transliteration: 'pǎ́rlenka', en: 'traditional grilled flatbread with butter or garlic', sampleBg: 'Топла пърленка със сирене.', sampleEn: 'Warm flatbread with cheese.' },
      { bg: 'ракия', transliteration: 'rakíya', en: 'traditional fruit brandy', sampleBg: 'Мускатова ракия със салата.', sampleEn: 'Muscat rakia with salad.' },
      { bg: 'Сметката, моля!', transliteration: 'Smétkata, mólya!', en: 'The check / bill, please!', sampleBg: 'Може ли сметката?', sampleEn: 'Could we have the bill, please?' }
    ],
    grammarNotes: [
      'Polite conditional "бих искал" (masculine) / "бих искала" (feminine) = I would like.',
      '"Какво ще обичате?" is the authentic Bulgarian hospitality greeting waiters use.'
    ],
    culturalNotes: [
      'Shopska salad was created in the 1950s with colors reflecting the Bulgarian national flag: white (cheese), green (cucumbers & parsley), red (tomatoes & roasted peppers).'
    ],
    exercises: [
      {
        instruction: 'Complete the polite request:',
        items: [
          { prompt: 'Бих _____ (искам - m.) сметката.', answer: 'искал' },
          { prompt: 'Бих _____ (искам - f.) една салата.', answer: 'искала' }
        ]
      }
    ]
  },

  // LESSON 20
  {
    id: 20,
    number: 20,
    titleBg: 'Болен съм, При лекаря и Човешкото тяло',
    titleEn: 'At the Doctor & Human Body',
    level: 'Advanced',
    grammarFocus: [
      'Изразяване на болка ("Боли ме главата", "Болят ме зъбите")',
      'Части на човешкото тяло (глава, гърло, очи, уши, ръка, крак, сърце, корем)',
      'Минало време на глагола "съм" (бях, беше, бяхме, бяхте, бяха)',
      'Симптоми и предписания (температура, кашлица, антибиотик)'
    ],
    dialogueTitle: 'В кабинета на лекаря (At the doctor\'s office)',
    dialogue: [
      { speaker: 'Пациент', bulgarian: 'Добър ден, докторе. Мисля, че съм болен.', english: 'Good afternoon, doctor. I think I am ill.' },
      { speaker: 'Лекар', bulgarian: 'Добър ден. От какво се оплаквате?', english: 'Good afternoon. What are your complaints?' },
      { speaker: 'Пациент', bulgarian: 'Всичко ме боли - главата, гърлото, носът ми тече и имам температура трийсет и осем градуса.', english: 'Everything hurts - head, throat, nose running and I have a fever of 38 degrees.' },
      { speaker: 'Лекар', bulgarian: 'Отворете устата и кажете "А". Гърлото ви е силно зачервено. Това е сезонен грип.', english: 'Open your mouth and say "Ah". Your throat is quite red. It is seasonal flu.' },
      { speaker: 'Лекар', bulgarian: 'Ще ви изпиша лекарства. Почивайте на легло и пийте топъл билков чай с лимон.', english: 'I will prescribe medicines. Rest in bed and drink warm herbal tea with lemon.' }
    ],
    vocabulary: [
      { bg: 'боли ме / болят ме', transliteration: 'bolí me / bolyát me', en: 'it hurts me / they hurt me', sampleBg: 'Боли ме главата.', sampleEn: 'My head hurts.' },
      { bg: 'глава / гърло', transliteration: 'glavá / gǎ́rlo', en: 'head / throat', sampleBg: 'Боли ме гърлото.', sampleEn: 'My throat hurts.' },
      { bg: 'зъб / зъболекар', transliteration: 'zǎb / zǎbolékar', en: 'tooth / dentist', sampleBg: 'Отивам на зъболекар.', sampleEn: 'I am going to the dentist.' },
      { bg: 'температура', transliteration: 'temperatúra', en: 'temperature / fever', sampleBg: 'Имам висока температура.', sampleEn: 'I have a high fever.' },
      { bg: 'лекарство', transliteration: 'lekárstvo', en: 'medicine', sampleBg: 'Взимам това лекарство.', sampleEn: 'I take this medicine.' }
    ],
    grammarNotes: [
      'Singular body part: "Боли ме" + singular noun: Боли ме зъбът, боли ме коремът.',
      'Plural body part: "Болят ме" + plural noun: Болят ме очите, болят ме краката.'
    ],
    culturalNotes: [
      'Mursal tea (мурсалски чай) from the Rhodope mountains and linden tea (липов чай) are legendary Bulgarian natural remedies for respiratory ailments.'
    ],
    exercises: [
      {
        instruction: 'Choose "боли ме" (singular) or "болят ме" (plural):',
        items: [
          { prompt: '_____ гърлото.', answer: 'Боли ме' },
          { prompt: '_____ краката.', answer: 'Болят ме' }
        ]
      }
    ]
  },

  // LESSON 21
  {
    id: 21,
    number: 21,
    titleBg: 'В аптеката, Лекарства и Здраве',
    titleEn: 'At the Pharmacy, Medicines & Wellness',
    level: 'Advanced',
    grammarFocus: [
      'Падежни остатъци и звателни форми при обръщение',
      'Инструкции за прием на медикаменти ("Три пъти на ден след хранене")',
      'Повелително наклонение (Imperative mood: пий, пийте, вземи, вземете)',
      'Денонощна аптека и рецептурна бланка'
    ],
    dialogueTitle: 'Купуване на лекарства в аптеката',
    dialogue: [
      { speaker: 'Фармацевт', bulgarian: 'Добър ден, заповядайте рецептата.', english: 'Good afternoon, please give me the prescription.' },
      { speaker: 'Клиент', bulgarian: 'Ето рецептата от д-р Георгиева за капки за нос и сироп за кашлица.', english: 'Here is the prescription from Dr. Georgieva for nose drops and cough syrup.' },
      { speaker: 'Фармацевт', bulgarian: 'Сиропът се приема по една супена лъжица три пъти на ден след ядене.', english: 'The syrup is taken one tablespoon three times a day after eating.' },
      { speaker: 'Клиент', bulgarian: 'Трябва ли да взимам и витамин Ц?', english: 'Should I also take Vitamin C?' },
      { speaker: 'Фармацевт', bulgarian: 'Да, разтворимите таблетки с витамин Ц и цинк подсилват имунитета.', english: 'Yes, effervescent Vitamin C and zinc tablets strengthen immunity.' }
    ],
    vocabulary: [
      { bg: 'аптека', transliteration: 'aptéka', en: 'pharmacy / drugstore', sampleBg: 'Търся денонощна аптека.', sampleEn: 'I am looking for a 24-hour pharmacy.' },
      { bg: 'рецепта', transliteration: 'retsépta', en: 'prescription', sampleBg: 'Лекарят ми даде рецепта.', sampleEn: 'The doctor gave me a prescription.' },
      { bg: 'сироп за кашлица', transliteration: 'siróp za káshlitsa', en: 'cough syrup', sampleBg: 'Пия сироп за кашлица.', sampleEn: 'I drink cough syrup.' },
      { bg: 'капки за нос', transliteration: 'kápki za nos', en: 'nose drops', sampleBg: 'Слагам си капки за нос.', sampleEn: 'I put in nose drops.' },
      { bg: 'хапче / таблетка', transliteration: 'hápche / tablétka', en: 'pill / tablet', sampleBg: 'Едно хапче с вода.', sampleEn: 'One pill with water.' }
    ],
    grammarNotes: [
      'Imperative formation: verbs in -а/-я take -ай / -айте (слушай / слушайте); verbs in -е/-и take -и / -ете (пий / пийте, чети / четете).'
    ],
    culturalNotes: [
      'Pharmacies in Bulgaria marked with a green cross and the sign "Денонощна аптека" operate 24 hours a day 7 days a week.'
    ],
    exercises: [
      {
        instruction: 'Form the polite/plural imperative (-те):',
        items: [
          { prompt: 'чета -> _____ (Read!)', answer: 'четете' },
          { prompt: 'пия -> _____ (Drink!)', answer: 'пийте' }
        ]
      }
    ]
  },

  // LESSON 22
  {
    id: 22,
    number: 22,
    titleBg: 'Юбилей, Празници и Баба Марта',
    titleEn: 'Celebrations, Holidays & Baba Marta',
    level: 'Advanced',
    grammarFocus: [
      'Традиционни пожелания (Честита Баба Марта, Честит рожден ден, Весел празник)',
      'Минало свършено време на глаголите (аорист: четох, писах, живях)',
      'Именни дни в българския календар (Гергьовден, Ивановден, Димитровден)',
      'Символика на мартениците'
    ],
    dialogueTitle: 'Баба Марта и белите и червени конци',
    dialogue: [
      { speaker: 'Учител', bulgarian: 'На първи март българите празнуват Баба Марта - древен обичай за посрещане на пролетта.', english: 'On March 1st Bulgarians celebrate Baba Marta - an ancient custom welcoming spring.' },
      { speaker: 'Ученичка', bulgarian: 'Какво си казват хората на този ден?', english: 'What do people say to each other on this day?' },
      { speaker: 'Учител', bulgarian: 'Поздравяват се с "Честита Баба Марта!" и си закичват мартеници от усукан бял и червен конец.', english: 'They greet each other with "Happy Baba Marta!" and pin martenitsas of twisted white and red yarn.' },
      { speaker: 'Ученичка', bulgarian: 'Докога се носи мартеницата?', english: 'Until when is the martenitsa worn?' },
      { speaker: 'Учител', bulgarian: 'Докато видиш първия щъркел или цъфнало плодно дръвче. Тогава я завързваш на цъфнал клон за здраве.', english: 'Until you see the first stork or blossoming fruit tree. Then you tie it to a blooming branch for health.' }
    ],
    vocabulary: [
      { bg: 'мартеница', transliteration: 'mártenitsa', en: 'martenitsa (red and white amulet)', sampleBg: 'Честита Баба Марта!', sampleEn: 'Happy Baba Marta!' },
      { bg: 'Честит рожден ден!', transliteration: 'Chestít rozhdén den!', en: 'Happy Birthday!', sampleBg: 'Пожелавам ти здраве и щастие.', sampleEn: 'I wish you health and happiness.' },
      { bg: 'Честит имен ден!', transliteration: 'Chestít ímen den!', en: 'Happy Name Day!', sampleBg: 'Именните дни са голям празник.', sampleEn: 'Name days are a big holiday.' },
      { bg: 'здраве и късмет', transliteration: 'zdráve i kǎsmét', en: 'health and good luck', sampleBg: 'Желая ви здраве и късмет.', sampleEn: 'I wish you health and good luck.' },
      { bg: 'празник', transliteration: 'práznik', en: 'holiday / festival', sampleBg: 'Днес е национален празник.', sampleEn: 'Today is a national holiday.' }
    ],
    grammarNotes: [
      'The Aorist (Минало свършено време) expresses completed actions in the past: аз правих, ти прави, той прави, ние правихме, вие правихте, те правиха.'
    ],
    culturalNotes: [
      'In Bulgaria, Name Days (Имени дни) are often celebrated with greater joy and open-door hospitality ("На имен ден не се кани - всеки е добре дошъл") than birthdays.'
    ],
    exercises: [
      {
        instruction: 'Fill in the traditional holiday greeting:',
        items: [
          { prompt: 'На 1-ви март казваме: "Честита _____!"', answer: 'Баба Марта' },
          { prompt: 'На празника на приятел: "Честит рожден _____!"', answer: 'ден' }
        ]
      }
    ]
  },

  // LESSON 23
  {
    id: 23,
    number: 23,
    titleBg: 'Българска култура, Музеи и Театър',
    titleEn: 'Bulgarian Culture, Folk Music & Theatre',
    level: 'Advanced',
    grammarFocus: [
      'Минало несвършено време (Имперфект: четях, пишех, ходех)',
      'Пасивни конструкции и страдателно причастие (построен, написан, открит)',
      'Български фолклор: неравноделни размери (Ръченица 7/8, Право хоро 2/4)',
      'Кирилицата и празникът на светите братя Кирил и Методий (24 май)'
    ],
    dialogueTitle: 'Разговор за българското културно наследство',
    dialogue: [
      { speaker: 'Професор', bulgarian: 'България има богата хилядолетна култура, съчетаваща тракийски, римски, византийски и славянски пластове.', english: 'Bulgaria has a rich millennia-old culture blending Thracian, Roman, Byzantine, and Slavic layers.' },
      { speaker: 'Студент', bulgarian: 'Кой е най-големият български духовен център?', english: 'What is the largest Bulgarian spiritual center?' },
      { speaker: 'Професор', bulgarian: 'Рилският манастир, основан през десети век от св. Иван Рилски. Той е под закрилата на ЮНЕСКО.', english: 'The Rila Monastery, founded in the 10th century by St. Ivan of Rila. It is protected by UNESCO.' },
      { speaker: 'Студент', bulgarian: 'А кога се чества българската азбука?', english: 'And when is the Bulgarian alphabet celebrated?' },
      { speaker: 'Професор', bulgarian: 'На 24 май - Денят на светите братя Кирил и Методий, на българската просвета и култура.', english: 'On May 24th - Day of Holy Brothers Cyril and Methodius, of Bulgarian literacy and culture.' }
    ],
    vocabulary: [
      { bg: 'култура / изкуство', transliteration: 'kultúra / izkústvo', en: 'culture / art', sampleBg: 'Обичам българското изкуство.', sampleEn: 'I love Bulgarian art.' },
      { bg: 'манастир', transliteration: 'manastír', en: 'monastery', sampleBg: 'Рилският манастир е величествен.', sampleEn: 'The Rila monastery is magnificent.' },
      { bg: 'кирилица', transliteration: 'kirílitsa', en: 'Cyrillic alphabet', sampleBg: 'Кирилицата е създадена в България.', sampleEn: 'The Cyrillic script was developed in Bulgaria.' },
      { bg: 'фолклор / хоро', transliteration: 'folklór / horó', en: 'folklore / round chain dance', sampleBg: 'Играем българско хоро.', sampleEn: 'We dance the Bulgarian horo.' },
      { bg: 'песен (ж.р.)', transliteration: 'pésen', en: 'song', sampleBg: 'Родопските народни песни са магични.', sampleEn: 'Rhodope folk songs are magical.' }
    ],
    grammarNotes: [
      'The past imperfect tense (Минало несвършено време) expresses uncompleted or background actions in the past: "Докато четях, телефонът звънна."'
    ],
    culturalNotes: [
      'The Bulgarian folk song "Излел е Делю хайдутин", performed by Valya Balkanska, was included on the golden Voyager Golden Record sent into deep space in 1977.'
    ],
    exercises: [
      {
        instruction: 'Fill in the cultural term:',
        items: [
          { prompt: 'Българският народен танц се нарича _____.', answer: 'хоро' },
          { prompt: 'Азбуката, на която пишем, е _____.', answer: 'кирилица' }
        ]
      }
    ]
  },

  // LESSON 24
  {
    id: 24,
    number: 24,
    titleBg: 'Екскурзия сред Българската природа',
    titleEn: 'Excursions in Bulgarian Nature & Mountains',
    level: 'Advanced',
    grammarFocus: [
      'Географски понятия и членуване (планината, върхът, реката, езерото)',
      'Бъдеще предварително време ("Ще съм свършил преди да тръгнем")',
      'Седемте рилски езера, Пиринският мраморен връх Вихрен и Родопите',
      'Екологичен туризъм и планински маркировки'
    ],
    dialogueTitle: 'Поход до Седемте рилски езера',
    dialogue: [
      { speaker: 'Водач', bulgarian: 'Днес правим преход в Рила планина до Седемте рилски езера - перлата на българската природа.', english: 'Today we hike in Rila Mountain to the Seven Rila Lakes - the pearl of Bulgarian nature.' },
      { speaker: 'Турист', bulgarian: 'Как се казват езерата?', english: 'What are the names of the lakes?' },
      { speaker: 'Водач', bulgarian: 'Сълзата, Окото, Бъбрека, Близнака, Трилистника, Рибното езеро и Долното езеро. Имената им описват тяхната форма.', english: 'The Tear, The Eye, The Kidney, The Twin, The Trefoil, The Fish Lake, and The Lower Lake. Their names describe their shapes.' },
      { speaker: 'Турист', bulgarian: 'Колко часа трае изкачването?', english: 'How many hours does the ascent take?' },
      { speaker: 'Водач', bulgarian: 'С лифта се качваме до хижа Рилски езера, а оттам пълната обиколка отнема около четири до пет часа.', english: 'With the chairlift we reach Rila Lakes hut, and from there the full circuit takes 4-5 hours.' }
    ],
    vocabulary: [
      { bg: 'планина / връх', transliteration: 'planiná / vrǎh', en: 'mountain / peak', sampleBg: 'Мусала е най-високият връх.', sampleEn: 'Musala is the highest peak.' },
      { bg: 'езеро / река', transliteration: 'ézero / reká', en: 'lake / river', sampleBg: 'Езерото е кристално чисто.', sampleEn: 'The lake is crystal clear.' },
      { bg: 'поход / преход', transliteration: 'póhod / préhod', en: 'hike / trek', sampleBg: 'Отиваме на планински поход.', sampleEn: 'We are going on a mountain hike.' },
      { bg: 'гора', transliteration: 'gorá', en: 'forest / woods', sampleBg: 'Борова гора с аромат на смола.', sampleEn: 'Pine forest with resin aroma.' },
      { bg: 'чист въздух', transliteration: 'chist vǎ́zduh', en: 'fresh / pure air', sampleBg: 'В планината въздухът е лечебен.', sampleEn: 'In the mountain the air is healing.' }
    ],
    grammarNotes: [
      'In Bulgarian, masculine peaks like "връх Мусала" or "връх Вихрен" take the full article when used as the subject: "Върхът е висок 2925 метра."'
    ],
    culturalNotes: [
      'Every August at the Seven Rila Lakes, the Universal White Brotherhood performs the sacred circle dance Paneurhythmy in white garments.'
    ],
    exercises: [
      {
        instruction: 'Fill in the geographic word:',
        items: [
          { prompt: 'Рила е висока _____.', answer: 'планина' },
          { prompt: 'Окото и Сълзата са ледникови _____.', answer: 'езера' }
        ]
      }
    ]
  },

  // LESSON 25
  {
    id: 25,
    number: 25,
    titleBg: 'Писма, Пожелания и Годишен преговор',
    titleEn: 'Letters, Correspondence & Review',
    level: 'Advanced',
    grammarFocus: [
      'Официална и неофициална кореспонденция (Уважаеми г-н..., Сърдечни поздрави)',
      'Преговор на глаголните времена (сегашно, минало свършено, минало несвършено, бъдеще)',
      'Бъдеще време с частицата "ЩЕ" (ще пътувам, ще науча, ще се видим)',
      'Обобщение на курса "Български език в практика"'
    ],
    dialogueTitle: 'Писмо до преподавателя по български език',
    dialogue: [
      { speaker: 'Студент', bulgarian: 'Уважаема г-жо Иванова, пиша ви това писмо на чист български език, за да ви благодаря за чудесния курс.', english: 'Dear Ms. Ivanova, I am writing you this letter in pure Bulgarian to thank you for the wonderful course.' },
      { speaker: 'Студент', bulgarian: 'Когато започнахме от Урок 1, знаех само "Здравей". Сега мога свободно да разговарям, да чета вестници и да пътувам из България.', english: 'When we started from Lesson 1, I only knew "Zdravei". Now I can freely converse, read newspapers, and travel across Bulgaria.' },
      { speaker: 'Преподавателка', bulgarian: 'Скъпи ученико, поздравявам те за трудолюбието и успеха! Българският език вече е твоят верен мост към приятелството и знанието.', english: 'Dear student, I congratulate you on your diligence and success! The Bulgarian language is now your true bridge to friendship and knowledge.' }
    ],
    vocabulary: [
      { bg: 'писмо', transliteration: 'pismó', en: 'letter', sampleBg: 'Пиша писмо до приятел.', sampleEn: 'I write a letter to a friend.' },
      { bg: 'Уважаеми / Уважаема', transliteration: 'Uvazháemi / Uvazháema', en: 'Dear / Respected (formal m / f)', sampleBg: 'Уважаеми господин Директоре,', sampleEn: 'Respected Mr. Director,' },
      { bg: 'Сърдечни поздрави', transliteration: 'Sǎrdéchni pózdravi', en: 'Warm / heartfelt regards', sampleBg: 'Сърдечни поздрави от България!', sampleEn: 'Warm regards from Bulgaria!' },
      { bg: 'успех', transliteration: 'uspéh', en: 'success', sampleBg: 'Желая ти голям успех!', sampleEn: 'I wish you great success!' },
      { bg: 'на добър час', transliteration: 'na dóbǎr chas', en: 'Godspeed / good luck', sampleBg: 'На добър час в ученето!', sampleEn: 'Best of luck in your learning!' }
    ],
    grammarNotes: [
      'Future tense in Bulgarian is formed simply by placing the invariant particle "ЩЕ" before the present tense: аз ще уча, ти ще учиш, той ще учи, ние ще учим, вие ще учите, те ще учат.',
      'Negative future tense uses "НЯМА ДА": аз няма да забравя (I will not forget).'
    ],
    culturalNotes: [
      'Congratulations on mastering the 25 core lessons of Eleonora Ivanova\'s "The Bulgarian Language in Practice"! You now possess the foundation for CEFR A1 through B2 Bulgarian language competency.'
    ],
    exercises: [
      {
        instruction: 'Form the future tense using "ще":',
        items: [
          { prompt: 'Аз говоря -> Аз _____ говоря.', answer: 'ще' },
          { prompt: 'Ние пътуваме -> Ние _____ пътуваме.', answer: 'ще' }
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
    description: 'Authentic essays on Bulgarian culture, hospitality, history, and modern life from Eleonora Ivanova\'s textbook.',
    items: [
      { bg: 'Моите впечатления от България', en: 'My Impressions of Bulgaria', details: 'Essay on Bulgarian greenery, hospitality, friendly people, and traditional habits like tertip.' },
      { bg: 'България и българите', en: 'Bulgaria and Bulgarians', details: 'Historical review of monasteries, Paisius of Hilendar, the Slavonic alphabet, and religious tolerance.' },
      { bg: 'Понеделниците докарват инфаркти', en: 'Mondays bring heart attacks', details: 'Humorous study about work stress, weekend eating habits, and taking life easy.' }
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
    description: 'Visual dictionary of careers and job titles in Bulgaria.',
    items: [
      { bg: 'лекар / лекарка', en: 'doctor / physician' },
      { bg: 'учител / учителка', en: 'teacher' },
      { bg: 'архитект', en: 'architect' },
      { bg: 'инженер', en: 'engineer' },
      { bg: 'директор', en: 'director / manager' },
      { bg: 'шофьор', en: 'driver' },
      { bg: 'актьор / актриса', en: 'actor / actress' },
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
      { bg: 'масло', en: 'butter' },
      { bg: 'мед', en: 'honey' },
      { bg: 'кафе', en: 'coffee' },
      { bg: 'чай', en: 'tea' },
      { bg: 'вино', en: 'wine' },
      { bg: 'ракия', en: 'fruit brandy' },
      { bg: 'бира', en: 'beer' }
    ]
  },
  {
    id: 5,
    number: 5,
    titleBg: 'Приложение 5: Места в града',
    titleEn: 'Appendix 5: Places in the City',
    description: 'Public buildings, urban locations, and services.',
    items: [
      { bg: 'училище', en: 'school' },
      { bg: 'университет', en: 'university' },
      { bg: 'болница', en: 'hospital' },
      { bg: 'поликлиника', en: 'polyclinic / health center' },
      { bg: 'поща', en: 'post office' },
      { bg: 'банка', en: 'bank' },
      { bg: 'театър', en: 'theatre' },
      { bg: 'кино', en: 'cinema / movie theatre' },
      { bg: 'музей', en: 'museum' },
      { bg: 'библиотека', en: 'library' },
      { bg: 'гара', en: 'railway station' },
      { bg: 'автогара', en: 'bus station' },
      { bg: 'летище', en: 'airport' },
      { bg: 'хотел', en: 'hotel' },
      { bg: 'ресторант', en: 'restaurant' }
    ]
  },
  {
    id: 6,
    number: 6,
    titleBg: 'Приложение 6: Магазини',
    titleEn: 'Appendix 6: Shops & Stores',
    description: 'Retail stores and market vendors.',
    items: [
      { bg: 'супермаркет', en: 'supermarket' },
      { bg: 'бакалия', en: 'grocery shop' },
      { bg: 'месарница', en: 'butcher shop' },
      { bg: 'хлебарница / фурна', en: 'bakery' },
      { bg: 'сладкарница', en: 'confectionery / pastry shop' },
      { bg: 'аптека', en: 'pharmacy / chemist' },
      { bg: 'книжарница', en: 'bookstore' },
      { bg: 'магазин за облекло', en: 'clothing store' },
      { bg: 'магазин за обувки', en: 'shoe store' },
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
      { bg: 'чанта', en: 'bag / handbag' }
    ]
  },
  {
    id: 8,
    number: 8,
    titleBg: 'Приложение 8: Спорт',
    titleEn: 'Appendix 8: Sports & Fitness',
    description: 'Athletics, leisure, and activities.',
    items: [
      { bg: 'плуване', en: 'swimming' },
      { bg: 'футбол', en: 'football / soccer' },
      { bg: 'тенис', en: 'tennis' },
      { bg: 'ски', en: 'skiing' },
      { bg: 'фитнес', en: 'fitness / gym workout' },
      { bg: 'бокс', en: 'boxing' },
      { bg: 'бягане', en: 'running' },
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
