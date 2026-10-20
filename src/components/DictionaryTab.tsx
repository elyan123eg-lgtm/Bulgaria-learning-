import React, { useState, useMemo } from 'react';
import { 
  Search, 
  Book, 
  Volume2, 
  Pause, 
  Sparkles, 
  Database, 
  Copy, 
  Check, 
  Filter,
  Mic,
  BookMarked,
  FileSpreadsheet
} from 'lucide-react';
import { BULGARIAN_DICTIONARY, DictionaryEntry } from '../data/bulgarianDictionary';
import { CORE_BOOK_WORDS } from '../data/bookVocabulary';

interface DictionaryTabProps {
  onSelectForPractice?: (phrase: string) => void;
  onSelectForChat?: (phrase: string) => void;
}

const CATEGORIES = [
  'All',
  'Greetings',
  'Food & Drinks',
  'Travel & City',
  'Home & Family',
  'Health & Body',
  'Work & Office',
  'Nature & Animals',
  'Grammar & Numbers',
  'Shopping & Money',
];

export const DictionaryTab: React.FC<DictionaryTabProps> = ({
  onSelectForPractice,
  onSelectForChat,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedSource, setSelectedSource] = useState<'All' | 'practice_book' | 'core_2000'>('All');
  const [playingWordId, setPlayingWordId] = useState<number | null>(null);
  const [showD1Modal, setShowD1Modal] = useState(false);
  const [copiedSql, setCopiedSql] = useState(false);

  // Combined master list with source tags
  const masterDictionary = useMemo<DictionaryEntry[]>(() => {
    const list1: DictionaryEntry[] = BULGARIAN_DICTIONARY.map((item) => ({
      ...item,
      sourceBook: 'practice_book',
      sourceTitle: 'The Bulgarian Language in Practice (Eleonora Ivanova)',
    }));

    const list2: DictionaryEntry[] = CORE_BOOK_WORDS.map((w) => ({
      id: 10000 + w.id,
      bg: w.bulgarian,
      en: w.english,
      partOfSpeech: 'expression' as const,
      category: (w.category as any) || 'Greetings',
      sampleBg: w.sampleBulgarian,
      sampleEn: w.sampleEnglish,
      sourceBook: 'core_2000',
      sourceTitle: '2000 Core Words and Phrases',
    }));

    return [...list1, ...list2];
  }, []);

  // Filtered by search, category, and textbook source
  const filteredWords = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    return masterDictionary.filter((item) => {
      const matchesSource = selectedSource === 'All' || item.sourceBook === selectedSource;
      const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
      const matchesQuery = !q ||
        item.bg.toLowerCase().includes(q) ||
        item.en.toLowerCase().includes(q) ||
        (item.sampleBg && item.sampleBg.toLowerCase().includes(q)) ||
        (item.sampleEn && item.sampleEn.toLowerCase().includes(q));
      return matchesSource && matchesCategory && matchesQuery;
    });
  }, [masterDictionary, searchQuery, selectedCategory, selectedSource]);

  // Audio Pronunciation via SpeechSynthesis
  const handlePlayAudio = (word: DictionaryEntry) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      if (playingWordId === word.id) {
        setPlayingWordId(null);
        return;
      }

      const textToSpeak = word.bg.replace(/<[^>]*>?/gm, '');
      const utter = new SpeechSynthesisUtterance(textToSpeak);
      utter.lang = 'bg-BG';
      utter.rate = 0.85;

      utter.onend = () => setPlayingWordId(null);
      utter.onerror = () => setPlayingWordId(null);

      setPlayingWordId(word.id);
      window.speechSynthesis.speak(utter);
    }
  };

  const getPosBadgeColor = (pos: string) => {
    if (pos.startsWith('noun')) return 'bg-sky-50 text-sky-700 border-sky-200';
    if (pos.startsWith('verb')) return 'bg-emerald-50 text-emerald-700 border-emerald-200';
    if (pos === 'adjective') return 'bg-purple-50 text-purple-700 border-purple-200';
    if (pos === 'expression') return 'bg-amber-50 text-amber-700 border-amber-200';
    return 'bg-slate-100 text-slate-700 border-slate-200';
  };

  const sampleD1Sql = `-- Cloudflare D1 Database Setup for "bulgarialearning"
-- Run: npx wrangler d1 execute bulgarialearning --file=./src/data/d1_schema.sql

CREATE TABLE IF NOT EXISTS dictionary (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  bg TEXT NOT NULL,
  en TEXT NOT NULL,
  part_of_speech TEXT NOT NULL,
  category TEXT NOT NULL,
  source_book TEXT NOT NULL,
  sample_bg TEXT,
  sample_en TEXT
);

CREATE TABLE IF NOT EXISTS lessons (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  lesson_number INTEGER NOT NULL UNIQUE,
  title_bg TEXT NOT NULL,
  title_en TEXT NOT NULL,
  level TEXT NOT NULL,
  grammar_focus TEXT,
  dialogue_title TEXT
);

-- Seed entries from both textbooks
INSERT OR IGNORE INTO dictionary (bg, en, part_of_speech, category, source_book, sample_bg, sample_en)
VALUES
('здравейте', 'hello (formal/plural)', 'expression', 'Greetings', 'The Bulgarian Language in Practice', 'Здравейте, как сте?', 'Hello, how are you?'),
('благодаря', 'thank you', 'expression', 'Greetings', '2000 Core Words & Phrases', 'Благодаря, добре съм.', 'Thank you, I am fine.'),
('шопска салата', 'Shopska salad', 'noun (f)', 'Food & Drinks', 'The Bulgarian Language in Practice', 'Поръчвам шопска салата.', 'I order Shopska salad.'),
('таратор', 'cold cucumber soup', 'noun (m)', 'Food & Drinks', '2000 Core Words & Phrases', 'Тараторът е вкусен.', 'Tarator is delicious.'),
('баница', 'cheese filo pie', 'noun (f)', 'Food & Drinks', 'The Bulgarian Language in Practice', 'Топла баница с боза.', 'Warm banitsa with boza.'),
('метро', 'subway, metro', 'noun (n)', 'Travel & City', 'The Bulgarian Language in Practice', 'Софийското метро е бързо.', 'Sofia metro is fast.');`;

  const copyD1SqlToClipboard = () => {
    navigator.clipboard.writeText(sampleD1Sql);
    setCopiedSql(true);
    setTimeout(() => setCopiedSql(false), 3000);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 space-y-6">
      
      {/* Header Banner */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-sky-600 text-white flex items-center justify-center font-bold shadow-xs">
              <Book className="w-5 h-5" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-slate-900 tracking-tight">
                Bulgarian-English Dictionary
              </h1>
              <p className="text-xs text-slate-500">
                Grounded in both <i>The Bulgarian Language in Practice</i> & <i>2000 Core Words & Phrases</i>
              </p>
            </div>
          </div>
        </div>

        {/* Cloudflare D1 Button */}
        <button
          onClick={() => setShowD1Modal(true)}
          className="flex items-center gap-2 px-3.5 py-2 bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-300 rounded-xl text-xs font-semibold transition-colors cursor-pointer shadow-2xs"
          title="View and export Cloudflare D1 SQL Schema"
        >
          <Database className="w-4 h-4 text-amber-700" />
          <span>Cloudflare D1 Database</span>
        </button>
      </div>

      {/* Distinct Textbook Source Selector */}
      <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-xs space-y-3">
        <div className="flex items-center justify-between text-xs font-bold text-slate-400 uppercase tracking-wider">
          <span>Filter by Textbook Source:</span>
          <span>{filteredWords.length} words matched</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
          <button
            onClick={() => setSelectedSource('All')}
            className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
              selectedSource === 'All'
                ? 'bg-slate-900 text-white border-slate-900 shadow-xs'
                : 'bg-slate-50 hover:bg-slate-100 text-slate-700 border-slate-200'
            }`}
          >
            <div className="text-xs font-bold">All Sources (Both Books)</div>
            <div className={`text-[10px] mt-0.5 ${selectedSource === 'All' ? 'text-slate-300' : 'text-slate-400'}`}>
              Complete combined vocabulary
            </div>
          </button>

          <button
            onClick={() => setSelectedSource('practice_book')}
            className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
              selectedSource === 'practice_book'
                ? 'bg-emerald-700 text-white border-emerald-700 shadow-xs'
                : 'bg-emerald-50/50 hover:bg-emerald-100/50 text-emerald-900 border-emerald-200'
            }`}
          >
            <div className="text-xs font-bold flex items-center gap-1.5">
              <BookMarked className="w-3.5 h-3.5" />
              <span>Ivanova Practice Book</span>
            </div>
            <div className={`text-[10px] mt-0.5 ${selectedSource === 'practice_book' ? 'text-emerald-100' : 'text-emerald-700'}`}>
              25 Lessons & 9 Appendices
            </div>
          </button>

          <button
            onClick={() => setSelectedSource('core_2000')}
            className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
              selectedSource === 'core_2000'
                ? 'bg-sky-700 text-white border-sky-700 shadow-xs'
                : 'bg-sky-50/50 hover:bg-sky-100/50 text-sky-900 border-sky-200'
            }`}
          >
            <div className="text-xs font-bold flex items-center gap-1.5">
              <FileSpreadsheet className="w-3.5 h-3.5" />
              <span>2000 Core Words & Phrases</span>
            </div>
            <div className={`text-[10px] mt-0.5 ${selectedSource === 'core_2000' ? 'text-sky-100' : 'text-sky-700'}`}>
              10 Thematic Frequency Chapters
            </div>
          </button>
        </div>
      </div>

      {/* Search and Category Filters */}
      <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-xs space-y-3">
        {/* Search Input */}
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search words in Bulgarian Cyrillic or English (e.g., благодаря, салата, train, hello)..."
            className="w-full pl-10 pr-4 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-transparent transition-all"
          />
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider shrink-0 mr-1 flex items-center gap-1">
            <Filter className="w-3 h-3" />
            Topic:
          </span>
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1 rounded-lg text-xs font-semibold whitespace-nowrap transition-all border cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-slate-900 text-white border-slate-900 shadow-xs'
                  : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Word Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
        {filteredWords.map((word) => (
          <div
            key={word.id}
            className="bg-white rounded-xl border border-slate-200 p-4 hover:border-slate-300 hover:shadow-xs transition-all space-y-2.5 flex flex-col justify-between"
          >
            <div>
              {/* Header row: Bulgarian word, source badge, part of speech */}
              <div className="flex items-start justify-between gap-2">
                <div>
                  <h3 className="text-lg font-bold text-slate-900 tracking-tight">
                    {word.bg}
                  </h3>
                  <div className="text-sm font-medium text-sky-700">
                    {word.en}
                  </div>
                </div>

                <div className="flex flex-col items-end gap-1 shrink-0">
                  <span className={`text-[9px] font-bold px-2 py-0.5 rounded-md border ${
                    word.sourceBook === 'practice_book'
                      ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                      : 'bg-sky-50 text-sky-800 border-sky-200'
                  }`}>
                    {word.sourceBook === 'practice_book' ? '📘 Ivanova Course' : '📗 2000 Words'}
                  </span>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md border ${getPosBadgeColor(word.partOfSpeech)}`}>
                    {word.partOfSpeech}
                  </span>
                </div>
              </div>

              {/* Sample sentence */}
              {word.sampleBg && (
                <div className="mt-2.5 pt-2 border-t border-slate-100 text-xs space-y-0.5">
                  <div className="text-slate-800 font-medium italic">
                    "{word.sampleBg}"
                  </div>
                  <div className="text-slate-500 text-[11px]">
                    "{word.sampleEn}"
                  </div>
                </div>
              )}
            </div>

            {/* Action Bar */}
            <div className="pt-2 border-t border-slate-100 flex items-center justify-between gap-2">
              <button
                onClick={() => handlePlayAudio(word)}
                className="flex items-center gap-1.5 px-2.5 py-1 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-lg text-xs font-medium text-slate-700 transition-colors cursor-pointer"
                title="Listen to pronunciation"
              >
                {playingWordId === word.id ? (
                  <Pause className="w-3.5 h-3.5 text-rose-500" />
                ) : (
                  <Volume2 className="w-3.5 h-3.5 text-slate-600" />
                )}
                <span>{playingWordId === word.id ? 'Playing' : 'Pronounce'}</span>
              </button>

              <div className="flex items-center gap-1.5">
                {onSelectForPractice && (
                  <button
                    onClick={() => onSelectForPractice(word.bg)}
                    className="flex items-center gap-1 px-2.5 py-1 bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 rounded-lg text-xs font-medium transition-colors cursor-pointer"
                  >
                    <Mic className="w-3 h-3" />
                    <span>Practice</span>
                  </button>
                )}

                {onSelectForChat && (
                  <button
                    onClick={() => onSelectForChat(`How is the word "${word.bg}" (${word.en}) used in Bulgarian sentences? Teach me sample dialogues.`)}
                    className="flex items-center gap-1 px-2.5 py-1 bg-slate-900 hover:bg-slate-800 text-white rounded-lg text-xs font-medium transition-colors cursor-pointer shadow-2xs"
                  >
                    <Sparkles className="w-3 h-3 text-amber-400" />
                    <span>Ask Tutor</span>
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredWords.length === 0 && (
        <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center space-y-3">
          <Book className="w-8 h-8 text-slate-300 mx-auto" />
          <h3 className="text-base font-semibold text-slate-700">No words found</h3>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">
            Try searching for another word, or switch the textbook filter above to search both books.
          </p>
        </div>
      )}

      {/* Cloudflare D1 Modal */}
      {showD1Modal && (
        <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full p-6 shadow-xl border border-slate-200 space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <Database className="w-5 h-5 text-amber-600" />
                <h3 className="text-base font-bold text-slate-900">
                  Cloudflare D1 Database Setup (<code>bulgarialearning</code>)
                </h3>
              </div>
              <button
                onClick={() => setShowD1Modal(false)}
                className="text-slate-400 hover:text-slate-600 text-sm font-bold cursor-pointer"
              >
                ✕
              </button>
            </div>

            <p className="text-xs text-slate-600">
              Your Cloudflare D1 database <b><code>bulgarialearning</code></b> can store tables for both textbooks (all 25 lessons + 2,000 words).
            </p>

            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs space-y-1.5">
              <div className="font-semibold text-slate-800">Execute in Cloudflare Wrangler:</div>
              <pre className="bg-slate-900 text-slate-100 p-2.5 rounded-lg text-[11px] font-mono overflow-x-auto">
                npx wrangler d1 execute bulgarialearning --file=./src/data/d1_schema.sql
              </pre>
            </div>

            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-700">SQL Schema & Seed Script:</span>
                <button
                  onClick={copyD1SqlToClipboard}
                  className="flex items-center gap-1 text-xs text-sky-600 hover:text-sky-800 font-semibold cursor-pointer"
                >
                  {copiedSql ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedSql ? 'Copied to Clipboard!' : 'Copy SQL'}</span>
                </button>
              </div>

              <textarea
                readOnly
                value={sampleD1Sql}
                rows={10}
                className="w-full p-3 font-mono text-[11px] bg-slate-900 text-emerald-400 rounded-xl resize-none focus:outline-none"
              />
            </div>

            <div className="flex justify-end pt-2">
              <button
                onClick={() => setShowD1Modal(false)}
                className="px-4 py-2 bg-slate-900 text-white rounded-xl text-xs font-semibold hover:bg-slate-800 transition-colors cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
