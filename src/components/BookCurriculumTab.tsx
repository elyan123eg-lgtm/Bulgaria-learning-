import React, { useState, useMemo } from 'react';
import { 
  BookOpen, 
  Volume2, 
  Pause, 
  Search, 
  Mic, 
  Send, 
  Sparkles, 
  CheckCircle, 
  RefreshCw, 
  Check, 
  AlertCircle,
  BookMarked,
  Layers,
  ChevronRight,
  GraduationCap,
  MessageCircle,
  FileSpreadsheet
} from 'lucide-react';
import { BULGARIAN_PRACTICE_LESSONS, BOOK_APPENDICES, BookLesson, BookAppendix } from '../data/bulgarianPracticeBook';
import { BOOK_CHAPTERS, CORE_BOOK_WORDS, BookWord } from '../data/bookVocabulary';
import { ProficiencyLevel } from '../types';

interface BookCurriculumTabProps {
  level: ProficiencyLevel;
  telegramChatId?: string;
  onSelectForPractice: (phrase: string) => void;
  onSelectForChat: (phrase: string) => void;
}

export const BookCurriculumTab: React.FC<BookCurriculumTabProps> = ({
  level,
  telegramChatId,
  onSelectForPractice,
  onSelectForChat,
}) => {
  // Main Book Selector: 'practice_book' | 'core_2000'
  const [selectedBook, setSelectedBook] = useState<'practice_book' | 'core_2000'>('practice_book');

  // Book 1 State
  const [activePracticeSection, setActivePracticeSection] = useState<'lessons' | 'appendices'>('lessons');
  const [selectedLessonNumber, setSelectedLessonNumber] = useState<number>(1);
  const [selectedAppendixId, setSelectedAppendixId] = useState<number>(1);
  const [userExerciseAnswers, setUserExerciseAnswers] = useState<Record<string, string>>({});
  const [exerciseFeedback, setExerciseFeedback] = useState<Record<string, boolean | null>>({});

  // Book 2 State (2000 Core Words)
  const [selectedChapterId, setSelectedChapterId] = useState<number>(1);
  const [wordSearchQuery, setWordSearchQuery] = useState('');
  const [selectedWordCategory, setSelectedWordCategory] = useState('All');

  // Audio Playback
  const [playingPhrase, setPlayingPhrase] = useState<string | null>(null);

  // Telegram dispatch status
  const [telegramSending, setTelegramSending] = useState(false);
  const [telegramStatus, setTelegramStatus] = useState<string | null>(null);

  // Active Lesson & Appendix
  const currentLesson: BookLesson = useMemo(() => {
    return BULGARIAN_PRACTICE_LESSONS.find((l) => l.number === selectedLessonNumber) || BULGARIAN_PRACTICE_LESSONS[0];
  }, [selectedLessonNumber]);

  const currentAppendix: BookAppendix = useMemo(() => {
    return BOOK_APPENDICES.find((a) => a.id === selectedAppendixId) || BOOK_APPENDICES[0];
  }, [selectedAppendixId]);

  // Active Chapter Words (Book 2)
  const currentChapterWords = useMemo(() => {
    return CORE_BOOK_WORDS.filter((w) => w.chapter === selectedChapterId);
  }, [selectedChapterId]);

  const availableWordCategories = useMemo(() => {
    const cats = new Set<string>();
    currentChapterWords.forEach((w) => {
      if (w.category) cats.add(w.category);
    });
    return ['All', ...Array.from(cats)];
  }, [currentChapterWords]);

  const filteredChapterWords = useMemo(() => {
    const q = wordSearchQuery.toLowerCase().trim();
    return currentChapterWords.filter((w) => {
      const matchCat = selectedWordCategory === 'All' || w.category === selectedWordCategory;
      const matchQuery = !q ||
        w.bulgarian.toLowerCase().includes(q) ||
        w.transliteration.toLowerCase().includes(q) ||
        w.english.toLowerCase().includes(q) ||
        w.sampleBulgarian.toLowerCase().includes(q) ||
        w.sampleEnglish.toLowerCase().includes(q);
      return matchCat && matchQuery;
    });
  }, [currentChapterWords, selectedWordCategory, wordSearchQuery]);

  // Audio Playback Handler
  const handlePlayAudio = (phrase: string) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      if (playingPhrase === phrase) {
        setPlayingPhrase(null);
        return;
      }

      const cleanText = phrase.replace(/<[^>]*>?/gm, '');
      const utter = new SpeechSynthesisUtterance(cleanText);
      utter.lang = 'bg-BG';
      utter.rate = 0.85;

      utter.onend = () => setPlayingPhrase(null);
      utter.onerror = () => setPlayingPhrase(null);

      setPlayingPhrase(phrase);
      window.speechSynthesis.speak(utter);
    }
  };

  // Check exercise answers in Lesson view
  const handleCheckAnswer = (key: string, expected: string) => {
    const given = (userExerciseAnswers[key] || '').trim().toLowerCase();
    const correct = given === expected.trim().toLowerCase();
    setExerciseFeedback((prev) => ({ ...prev, [key]: correct }));
  };

  // Push lesson or topic to user's Telegram
  const handleSendToTelegram = async (title: string, summary: string) => {
    if (!telegramChatId) {
      alert('Please connect your Telegram Chat ID in the Profile & Telegram tab first!');
      return;
    }

    setTelegramSending(true);
    setTelegramStatus(null);
    try {
      const res = await fetch('/api/telegram/send-topic', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          chatId: telegramChatId,
          level,
          topic: `${title}: ${summary}`,
        }),
      });
      const data = await res.json();
      if (data.success) {
        setTelegramStatus('Delivered to Telegram!');
      } else {
        setTelegramStatus(data.error || 'Telegram delivery failed');
      }
    } catch (err: any) {
      setTelegramStatus(err.message || 'Network error sending to Telegram');
    } finally {
      setTelegramSending(false);
      setTimeout(() => setTelegramStatus(null), 4000);
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-6">
      
      {/* 1. DISTINCTIVE BOOK SELECTOR HEADER */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-6">
        <div>
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
            Selected Curriculum Library
          </span>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
            Bulgarian Textbooks & Learning Material
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Choose between your two textbooks to study lessons, grammar tables, authentic dialogues, or frequency word lists.
          </p>
        </div>

        {/* 2 DISTINCT TABS / TILES */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          
          {/* Tile 1: The Bulgarian Language in Practice */}
          <div 
            onClick={() => setSelectedBook('practice_book')}
            className={`p-5 rounded-2xl border-2 transition-all cursor-pointer flex flex-col justify-between space-y-3 ${
              selectedBook === 'practice_book'
                ? 'border-emerald-600 bg-emerald-50/50 shadow-sm ring-2 ring-emerald-500/20'
                : 'border-slate-200 bg-slate-50 hover:bg-slate-100 hover:border-slate-300'
            }`}
          >
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[11px] font-bold bg-emerald-100 text-emerald-800">
                  <BookOpen className="w-3.5 h-3.5 text-emerald-700" />
                  PDF 1: Course Textbook
                </span>
                {selectedBook === 'practice_book' && (
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-600 ring-4 ring-emerald-200"></span>
                )}
              </div>
              <h2 className="text-base font-bold text-slate-900">
                The Bulgarian Language in Practice
              </h2>
              <p className="text-xs text-slate-600 leading-relaxed">
                Authored by <b>Eleonora Ivanova (Sofia, 2000)</b>. Complete structured university-level course with dialogues, grammatical rules, exercises, and cultural essays.
              </p>
            </div>

            <div className="flex flex-wrap gap-2 text-[11px] text-slate-500 font-medium pt-2 border-t border-emerald-200/50">
              <span className="px-2 py-0.5 rounded-md bg-white border border-slate-200 text-slate-700 font-semibold">
                ✓ All 25 Lessons Present
              </span>
              <span className="px-2 py-0.5 rounded-md bg-white border border-slate-200 text-slate-700 font-semibold">
                ✓ 9 Thematic Appendices
              </span>
            </div>
          </div>

          {/* Tile 2: 2000 Core Words & Phrases */}
          <div 
            onClick={() => setSelectedBook('core_2000')}
            className={`p-5 rounded-2xl border-2 transition-all cursor-pointer flex flex-col justify-between space-y-3 ${
              selectedBook === 'core_2000'
                ? 'border-sky-600 bg-sky-50/50 shadow-sm ring-2 ring-sky-500/20'
                : 'border-slate-200 bg-slate-50 hover:bg-slate-100 hover:border-slate-300'
            }`}
          >
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[11px] font-bold bg-sky-100 text-sky-800">
                  <FileSpreadsheet className="w-3.5 h-3.5 text-sky-700" />
                  PDF 2: Vocabulary Guide
                </span>
                {selectedBook === 'core_2000' && (
                  <span className="w-2.5 h-2.5 rounded-full bg-sky-600 ring-4 ring-sky-200"></span>
                )}
              </div>
              <h2 className="text-base font-bold text-slate-900">
                2000 Core Words & Phrases Bulgarian
              </h2>
              <p className="text-xs text-slate-600 leading-relaxed">
                By <b>Innovative Language / BulgarianPod101</b>. Essential frequency vocabulary organized into 10 thematic chapters with Cyrillic, transliteration, and real-life sample sentences.
              </p>
            </div>

            <div className="flex flex-wrap gap-2 text-[11px] text-slate-500 font-medium pt-2 border-t border-sky-200/50">
              <span className="px-2 py-0.5 rounded-md bg-white border border-slate-200 text-slate-700 font-semibold">
                ✓ 10 Thematic Chapters
              </span>
              <span className="px-2 py-0.5 rounded-md bg-white border border-slate-200 text-slate-700 font-semibold">
                ✓ 2,000 Key Expressions
              </span>
            </div>
          </div>

        </div>
      </div>

      {/* ========================================================= */}
      {/* VIEW A: BOOK 1 - THE BULGARIAN LANGUAGE IN PRACTICE       */}
      {/* ========================================================= */}
      {selectedBook === 'practice_book' && (
        <div className="space-y-6">
          
          {/* Top Sub-Bar: Switch between Lessons 1-25 & Appendices 1-9 */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 bg-white p-4 rounded-2xl border border-slate-200 shadow-xs">
            <div className="flex items-center gap-2">
              <button
                onClick={() => setActivePracticeSection('lessons')}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  activePracticeSection === 'lessons'
                    ? 'bg-slate-900 text-white shadow-xs'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                📖 Lessons (Уроци 1–25)
              </button>
              <button
                onClick={() => setActivePracticeSection('appendices')}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  activePracticeSection === 'appendices'
                    ? 'bg-slate-900 text-white shadow-xs'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                📑 Appendices (Приложения 1–9)
              </button>
            </div>

            {telegramStatus && (
              <span className="text-xs font-semibold px-3 py-1 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-lg">
                {telegramStatus}
              </span>
            )}
          </div>

          {/* Section 1: LESSONS 1 TO 25 */}
          {activePracticeSection === 'lessons' && (
            <div className="space-y-6">
              
              {/* Horizontal Scrollable Lesson Grid / Selector (1 to 25) */}
              <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs space-y-2">
                <div className="flex items-center justify-between text-xs font-bold text-slate-500 px-1">
                  <span>SELECT LESSON (ALL 25 LESSONS PRESENT):</span>
                  <span>Currently viewing: Lesson {currentLesson.number} of 25</span>
                </div>
                
                <div className="flex items-center gap-2 overflow-x-auto pb-2 no-scrollbar">
                  {BULGARIAN_PRACTICE_LESSONS.map((lesson) => (
                    <button
                      key={lesson.id}
                      onClick={() => {
                        setSelectedLessonNumber(lesson.number);
                        setUserExerciseAnswers({});
                        setExerciseFeedback({});
                      }}
                      className={`flex flex-col items-center justify-center min-w-[76px] py-2 px-1.5 rounded-xl border text-center transition-all cursor-pointer shrink-0 ${
                        selectedLessonNumber === lesson.number
                          ? 'bg-emerald-600 text-white border-emerald-600 shadow-xs'
                          : 'bg-slate-50 hover:bg-slate-100 text-slate-700 border-slate-200'
                      }`}
                    >
                      <span className="text-xs font-extrabold">Урок {lesson.number}</span>
                      <span className={`text-[10px] mt-0.5 truncate max-w-[68px] ${selectedLessonNumber === lesson.number ? 'text-emerald-100' : 'text-slate-500'}`}>
                        {lesson.titleEn.split('&')[0].trim()}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Lesson Detail Card */}
              <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-6">
                
                {/* Lesson Header */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-100">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="px-2.5 py-0.5 text-[11px] font-bold rounded-md bg-emerald-100 text-emerald-800">
                        Урок {currentLesson.number}
                      </span>
                      <span className="px-2.5 py-0.5 text-[11px] font-bold rounded-md bg-slate-100 text-slate-700">
                        {currentLesson.level} Level
                      </span>
                    </div>
                    <h2 className="text-2xl font-bold text-slate-900 mt-1">
                      {currentLesson.titleBg}
                    </h2>
                    <p className="text-sm text-slate-500 font-medium">
                      {currentLesson.titleEn}
                    </p>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => onSelectForChat(`Let's practice Lesson ${currentLesson.number}: "${currentLesson.titleBg}" (${currentLesson.titleEn}) from The Bulgarian Language in Practice.`)}
                      className="flex items-center gap-1.5 px-3 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-semibold transition-colors cursor-pointer"
                    >
                      <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                      <span>Ask Tutor About Lesson</span>
                    </button>
                    {telegramChatId && (
                      <button
                        onClick={() => handleSendToTelegram(`Lesson ${currentLesson.number} (${currentLesson.titleEn})`, currentLesson.dialogueTitle)}
                        disabled={telegramSending}
                        className="flex items-center gap-1.5 px-3 py-2 bg-sky-50 hover:bg-sky-100 text-sky-800 border border-sky-300 rounded-xl text-xs font-semibold transition-colors cursor-pointer"
                      >
                        <Send className="w-3.5 h-3.5 text-sky-600" />
                        <span>{telegramSending ? 'Sending...' : 'Send to Telegram'}</span>
                      </button>
                    )}
                  </div>
                </div>

                {/* Grammar Focus Pills */}
                <div>
                  <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                    Grammar Focus & Objectives
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {currentLesson.grammarFocus.map((focus, idx) => (
                      <span key={idx} className="px-3 py-1.5 rounded-lg text-xs bg-slate-50 border border-slate-200 text-slate-800 font-medium">
                        • {focus}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Authentic Dialogue */}
                <div className="p-5 bg-slate-50 rounded-2xl border border-slate-200 space-y-3">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                      <MessageCircle className="w-4 h-4 text-emerald-600" />
                      <span>Диалог: {currentLesson.dialogueTitle}</span>
                    </h3>
                    <span className="text-xs text-slate-500">Authentic textbook dialogue</span>
                  </div>

                  <div className="space-y-3 pt-2">
                    {currentLesson.dialogue.map((line, idx) => (
                      <div key={idx} className="p-3 bg-white rounded-xl border border-slate-100 space-y-1">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-bold text-emerald-700">
                            {line.speaker}:
                          </span>
                          <button
                            onClick={() => handlePlayAudio(line.bulgarian)}
                            className="text-slate-400 hover:text-slate-700 p-1 cursor-pointer"
                            title="Listen"
                          >
                            <Volume2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                        <div className="text-sm font-medium text-slate-900">
                          {line.bulgarian}
                        </div>
                        <div className="text-xs text-slate-500 italic">
                          "{line.english}"
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Lesson Vocabulary Grid */}
                <div className="space-y-3">
                  <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                    <BookMarked className="w-4 h-4 text-sky-600" />
                    <span>Lesson Vocabulary ({currentLesson.vocabulary.length} words)</span>
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {currentLesson.vocabulary.map((vocab, idx) => (
                      <div key={idx} className="p-3.5 rounded-xl border border-slate-200 bg-white hover:border-slate-300 transition-all flex flex-col justify-between space-y-2">
                        <div>
                          <div className="flex items-start justify-between">
                            <div>
                              <div className="text-base font-bold text-slate-900">{vocab.bg}</div>
                              <div className="text-xs text-slate-500 font-mono">[{vocab.transliteration}]</div>
                            </div>
                            <button
                              onClick={() => handlePlayAudio(vocab.bg)}
                              className="p-1.5 text-slate-500 hover:text-slate-800 bg-slate-50 hover:bg-slate-100 rounded-lg border border-slate-200 cursor-pointer"
                            >
                              <Volume2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                          <div className="text-xs font-semibold text-sky-700 mt-1">
                            {vocab.en}
                          </div>
                        </div>

                        {vocab.sampleBg && (
                          <div className="pt-2 border-t border-slate-100 text-[11px] text-slate-600">
                            <span className="font-semibold text-slate-800">Sample:</span> "{vocab.sampleBg}"
                            <div className="text-slate-400 italic">"{vocab.sampleEn}"</div>
                          </div>
                        )}

                        <div className="flex items-center gap-2 pt-1">
                          <button
                            onClick={() => onSelectForPractice(vocab.bg)}
                            className="px-2 py-1 text-[10px] font-semibold bg-rose-50 hover:bg-rose-100 text-rose-700 rounded-md border border-rose-200 cursor-pointer"
                          >
                            Practice Speech
                          </button>
                          <button
                            onClick={() => onSelectForChat(`How do I use "${vocab.bg}" in Bulgarian? Give me 2 sentences.`)}
                            className="px-2 py-1 text-[10px] font-semibold bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-md cursor-pointer"
                          >
                            Ask Tutor
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Cultural Insights & Grammar Notes */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Grammar Notes */}
                  <div className="p-4 bg-amber-50/60 rounded-xl border border-amber-200/80 space-y-2">
                    <h4 className="text-xs font-bold text-amber-900 uppercase tracking-wider">
                      Grammar Notes (Граматика)
                    </h4>
                    <ul className="text-xs text-amber-950 space-y-1.5 list-disc list-inside">
                      {currentLesson.grammarNotes.map((note, idx) => (
                        <li key={idx} className="leading-relaxed">{note}</li>
                      ))}
                    </ul>
                  </div>

                  {/* Cultural Notes */}
                  <div className="p-4 bg-rose-50/60 rounded-xl border border-rose-200/80 space-y-2">
                    <h4 className="text-xs font-bold text-rose-900 uppercase tracking-wider">
                      Cultural Insight (Култура)
                    </h4>
                    <ul className="text-xs text-rose-950 space-y-1.5 list-disc list-inside">
                      {currentLesson.culturalNotes.map((note, idx) => (
                        <li key={idx} className="leading-relaxed">{note}</li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Interactive Practice Quiz */}
                {currentLesson.exercises.length > 0 && (
                  <div className="p-5 bg-slate-50 rounded-2xl border border-slate-200 space-y-4">
                    <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                      <GraduationCap className="w-4 h-4 text-emerald-600" />
                      <span>Interactive Exercise & Practice</span>
                    </h3>

                    {currentLesson.exercises.map((ex, exIdx) => (
                      <div key={exIdx} className="space-y-3">
                        <div className="text-xs font-semibold text-slate-700">{ex.instruction}</div>
                        <div className="space-y-2.5">
                          {ex.items.map((item, itemIdx) => {
                            const key = `ex-${currentLesson.number}-${exIdx}-${itemIdx}`;
                            const feedback = exerciseFeedback[key];
                            return (
                              <div key={itemIdx} className="flex flex-col sm:flex-row sm:items-center gap-2 p-3 bg-white rounded-xl border border-slate-200">
                                <span className="text-xs font-medium text-slate-800 flex-1">
                                  {item.prompt}
                                </span>
                                <div className="flex items-center gap-2">
                                  <input
                                    type="text"
                                    value={userExerciseAnswers[key] || ''}
                                    onChange={(e) => {
                                      setUserExerciseAnswers({ ...userExerciseAnswers, [key]: e.target.value });
                                      setExerciseFeedback({ ...exerciseFeedback, [key]: null });
                                    }}
                                    placeholder="Type answer..."
                                    className="px-3 py-1 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-slate-900"
                                  />
                                  <button
                                    onClick={() => handleCheckAnswer(key, item.answer)}
                                    className="px-3 py-1 bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold rounded-lg cursor-pointer"
                                  >
                                    Check
                                  </button>
                                  {feedback === true && (
                                    <span className="text-xs font-bold text-emerald-600 flex items-center gap-1">
                                      <Check className="w-3.5 h-3.5" /> Correct!
                                    </span>
                                  )}
                                  {feedback === false && (
                                    <span className="text-xs font-bold text-rose-600 flex items-center gap-1">
                                      <AlertCircle className="w-3.5 h-3.5" /> Answer: {item.answer}
                                    </span>
                                  )}
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    ))}
                  </div>
                )}

              </div>
            </div>
          )}

          {/* Section 2: APPENDICES 1 TO 9 */}
          {activePracticeSection === 'appendices' && (
            <div className="space-y-6">
              
              {/* Appendix Selector Pills */}
              <div className="flex items-center gap-2 overflow-x-auto pb-2 no-scrollbar bg-white p-4 rounded-2xl border border-slate-200 shadow-xs">
                {BOOK_APPENDICES.map((app) => (
                  <button
                    key={app.id}
                    onClick={() => setSelectedAppendixId(app.id)}
                    className={`px-3 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all border cursor-pointer ${
                      selectedAppendixId === app.id
                        ? 'bg-emerald-600 text-white border-emerald-600 shadow-xs'
                        : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    {app.titleEn.split(':')[0]}
                  </button>
                ))}
              </div>

              {/* Appendix Detail */}
              <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-5">
                <div>
                  <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
                    Приложение {currentAppendix.number}
                  </span>
                  <h2 className="text-xl font-bold text-slate-900 mt-2">
                    {currentAppendix.titleBg}
                  </h2>
                  <p className="text-sm font-semibold text-slate-600">
                    {currentAppendix.titleEn}
                  </p>
                  <p className="text-xs text-slate-500 mt-1">
                    {currentAppendix.description}
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                  {currentAppendix.items.map((item, idx) => (
                    <div key={idx} className="p-3.5 rounded-xl border border-slate-200 bg-slate-50/50 hover:bg-white hover:border-slate-300 transition-all space-y-1">
                      <div className="flex items-center justify-between">
                        <div className="text-sm font-bold text-slate-900">{item.bg}</div>
                        <button
                          onClick={() => handlePlayAudio(item.bg)}
                          className="text-slate-400 hover:text-slate-700 p-1 cursor-pointer"
                        >
                          <Volume2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                      <div className="text-xs text-sky-700 font-medium">{item.en}</div>
                      {item.details && (
                        <div className="text-[11px] text-slate-500 pt-1 border-t border-slate-100 leading-snug">
                          {item.details}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

            </div>
          )}

        </div>
      )}

      {/* ========================================================= */}
      {/* VIEW B: BOOK 2 - 2000 CORE WORDS & PHRASES               */}
      {/* ========================================================= */}
      {selectedBook === 'core_2000' && (
        <div className="space-y-6">
          
          {/* Chapter Selector Grid (Chapters 1 to 10) */}
          <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs space-y-2">
            <div className="flex items-center justify-between text-xs font-bold text-slate-500 px-1">
              <span>SELECT VOCABULARY CHAPTER (10 THEMATIC CHAPTERS):</span>
              <span>2,000 words total · Innovative Language</span>
            </div>

            <div className="flex items-center gap-2 overflow-x-auto pb-2 no-scrollbar">
              {BOOK_CHAPTERS.map((chap) => (
                <button
                  key={chap.id}
                  onClick={() => {
                    setSelectedChapterId(chap.id);
                    setSelectedWordCategory('All');
                    setWordSearchQuery('');
                  }}
                  className={`flex flex-col items-center justify-center min-w-[100px] py-2 px-2.5 rounded-xl border text-center transition-all cursor-pointer shrink-0 ${
                    selectedChapterId === chap.id
                      ? 'bg-sky-600 text-white border-sky-600 shadow-xs'
                      : 'bg-slate-50 hover:bg-slate-100 text-slate-700 border-slate-200'
                  }`}
                >
                  <span className="text-xs font-extrabold">Глава {chap.id}</span>
                  <span className={`text-[10px] mt-0.5 truncate max-w-[90px] ${selectedChapterId === chap.id ? 'text-sky-100' : 'text-slate-500'}`}>
                    {chap.title.split(':')[1]?.trim() || chap.title}
                  </span>
                  <span className={`text-[9px] font-mono mt-0.5 ${selectedChapterId === chap.id ? 'text-sky-200' : 'text-slate-400'}`}>
                    Words {chap.wordRange}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Chapter Search & Category Bar */}
          <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs space-y-3">
            <div className="flex flex-col sm:flex-row items-center gap-3">
              <div className="relative flex-1 w-full">
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={wordSearchQuery}
                  onChange={(e) => setWordSearchQuery(e.target.value)}
                  placeholder="Search chapter words in Cyrillic, transliteration or English..."
                  className="w-full pl-10 pr-4 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:bg-white focus:ring-1 focus:ring-slate-900"
                />
              </div>

              {telegramChatId && (
                <button
                  onClick={() => handleSendToTelegram(`Chapter ${selectedChapterId}`, `Core Bulgarian vocabulary from 2000 words list`)}
                  disabled={telegramSending}
                  className="flex items-center gap-1.5 px-3 py-2 bg-sky-50 hover:bg-sky-100 text-sky-800 border border-sky-300 rounded-xl text-xs font-semibold whitespace-nowrap cursor-pointer"
                >
                  <Send className="w-3.5 h-3.5 text-sky-600" />
                  <span>Send Chapter To Telegram</span>
                </button>
              )}
            </div>

            {/* Category Filter Pills */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mr-1">Category:</span>
              {availableWordCategories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedWordCategory(cat)}
                  className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold whitespace-nowrap transition-all border cursor-pointer ${
                    selectedWordCategory === cat
                      ? 'bg-slate-900 text-white border-slate-900 shadow-2xs'
                      : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Words Grid */}
          <div className="space-y-3">
            <div className="flex items-center justify-between text-xs text-slate-500 px-1">
              <span>
                Showing <b>{filteredChapterWords.length}</b> words from Chapter {selectedChapterId}
              </span>
              {wordSearchQuery && (
                <button onClick={() => setWordSearchQuery('')} className="text-sky-600 hover:underline cursor-pointer">
                  Clear search
                </button>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
              {filteredChapterWords.map((word) => (
                <div
                  key={word.id}
                  className="bg-white rounded-xl border border-slate-200 p-4 hover:border-slate-300 hover:shadow-xs transition-all space-y-2.5 flex flex-col justify-between"
                >
                  <div>
                    {/* Header */}
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="text-lg font-bold text-slate-900">{word.bulgarian}</h3>
                          <span className="text-[10px] font-mono text-slate-400">#{word.id}</span>
                        </div>
                        <div className="text-xs text-slate-500 font-mono">[{word.transliteration}]</div>
                        <div className="text-sm font-semibold text-sky-700 mt-1">{word.english}</div>
                      </div>

                      <div className="flex flex-col items-end gap-1">
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 border border-slate-200">
                          {word.category}
                        </span>
                        <button
                          onClick={() => handlePlayAudio(word.bulgarian)}
                          className="p-1.5 text-slate-500 hover:text-slate-800 bg-slate-50 hover:bg-slate-100 rounded-lg border border-slate-200 cursor-pointer"
                        >
                          <Volume2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>

                    {/* Sample Sentence */}
                    {word.sampleBulgarian && (
                      <div className="mt-2.5 pt-2 border-t border-slate-100 text-xs space-y-0.5">
                        <div className="flex items-center justify-between">
                          <span className="text-slate-900 font-medium italic">"{word.sampleBulgarian}"</span>
                          <button
                            onClick={() => handlePlayAudio(word.sampleBulgarian)}
                            className="text-slate-400 hover:text-slate-600 p-0.5 cursor-pointer"
                          >
                            <Volume2 className="w-3 h-3" />
                          </button>
                        </div>
                        <div className="text-[11px] text-slate-400 font-mono">[{word.sampleTransliteration}]</div>
                        <div className="text-[11px] text-slate-500">"{word.sampleEnglish}"</div>
                      </div>
                    )}
                  </div>

                  {/* Action Buttons */}
                  <div className="pt-2 border-t border-slate-100 flex items-center justify-between gap-2">
                    <button
                      onClick={() => onSelectForPractice(word.bulgarian)}
                      className="flex items-center gap-1 px-2.5 py-1 text-xs font-semibold bg-rose-50 hover:bg-rose-100 text-rose-700 rounded-lg border border-rose-200 cursor-pointer"
                    >
                      <Mic className="w-3 h-3" />
                      <span>Practice</span>
                    </button>
                    <button
                      onClick={() => onSelectForChat(`How do Bulgarians use "${word.bulgarian}" (${word.english}) in everyday conversations? Teach me 2 sample dialogues.`)}
                      className="flex items-center gap-1 px-2.5 py-1 text-xs font-semibold bg-slate-900 hover:bg-slate-800 text-white rounded-lg cursor-pointer"
                    >
                      <Sparkles className="w-3 h-3 text-amber-400" />
                      <span>Ask Tutor</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {filteredChapterWords.length === 0 && (
              <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center text-slate-500 text-xs">
                No words matched your search query in Chapter {selectedChapterId}.
              </div>
            )}
          </div>

        </div>
      )}

    </div>
  );
};
