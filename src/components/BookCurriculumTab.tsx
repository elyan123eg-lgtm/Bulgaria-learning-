import React, { useState } from 'react';
import { 
  BookOpen, 
  Volume2, 
  Play, 
  Pause, 
  Search, 
  Mic, 
  Send, 
  Sparkles, 
  CheckCircle, 
  RefreshCw,
  ExternalLink,
  MessageSquare
} from 'lucide-react';
import { BookWord, BOOK_CHAPTERS, CORE_BOOK_WORDS } from '../data/bookVocabulary';
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
  const [selectedChapter, setSelectedChapter] = useState<number | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [playingWordId, setPlayingWordId] = useState<number | null>(null);
  const [loadingAudioId, setLoadingAudioId] = useState<number | null>(null);
  const [telegramStatus, setTelegramStatus] = useState<{ id: number; message: string; ok: boolean } | null>(null);
  const [isSendingTg, setIsSendingTg] = useState<number | null>(null);

  // Filter words by chapter and search query
  const filteredWords = CORE_BOOK_WORDS.filter((word) => {
    const matchesChapter = selectedChapter === 'all' || word.chapter === selectedChapter;
    const query = searchQuery.toLowerCase().trim();
    const matchesQuery = !query || 
      word.bulgarian.toLowerCase().includes(query) ||
      word.english.toLowerCase().includes(query) ||
      word.transliteration.toLowerCase().includes(query) ||
      word.sampleBulgarian.toLowerCase().includes(query) ||
      word.sampleEnglish.toLowerCase().includes(query);

    return matchesChapter && matchesQuery;
  });

  // Play word and sample sentence via TTS
  const handlePlayAudio = async (word: BookWord) => {
    setLoadingAudioId(word.id);
    try {
      const textToSpeak = `${word.bulgarian}. ${word.sampleBulgarian}`;
      const res = await fetch('/api/tts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: textToSpeak }),
      });
      const data = await res.json();
      if (data.success && data.audioDataUrl) {
        const audio = new Audio(data.audioDataUrl);
        audio.onended = () => setPlayingWordId(null);
        setPlayingWordId(word.id);
        audio.play();
      } else {
        // Fallback to SpeechSynthesis
        const utter = new SpeechSynthesisUtterance(textToSpeak);
        utter.lang = 'bg-BG';
        utter.onend = () => setPlayingWordId(null);
        setPlayingWordId(word.id);
        window.speechSynthesis.speak(utter);
      }
    } catch (err) {
      const textToSpeak = `${word.bulgarian}. ${word.sampleBulgarian}`;
      const utter = new SpeechSynthesisUtterance(textToSpeak);
      utter.lang = 'bg-BG';
      utter.onend = () => setPlayingWordId(null);
      setPlayingWordId(word.id);
      window.speechSynthesis.speak(utter);
    } finally {
      setLoadingAudioId(null);
    }
  };

  // Dispatch specific book word to user's Telegram
  const handleSendWordToTelegram = async (word: BookWord) => {
    if (!telegramChatId) {
      alert('Please configure your Telegram Chat ID in the Profile & Telegram tab first!');
      return;
    }

    setIsSendingTg(word.id);
    setTelegramStatus(null);

    const messageHtml = `📖 <b>2000 Core Bulgarian Words · Word #${word.id}</b>\n\n` +
      `🇧🇬 <b>${word.bulgarian}</b> [${word.transliteration}]\n` +
      `🇬🇧 <b>Meaning:</b> ${word.english}\n` +
      `🏷️ <i>Category: ${word.category} (Chapter ${word.chapter})</i>\n\n` +
      `💬 <b>Sample Sentence from Textbook:</b>\n` +
      `"<code>${word.sampleBulgarian}</code>"\n` +
      `[${word.sampleTransliteration}]\n` +
      `<i>${word.sampleEnglish}</i>\n\n` +
      `───────────────\n` +
      `✨ <i>Practice speaking this word in the Pronunciation Lab!</i>`;

    try {
      const res = await fetch('/api/telegram/send-topic', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          chatId: telegramChatId,
          level,
          topic: `Word #${word.id}: ${word.bulgarian} (${word.english})`,
        }),
      });

      const data = await res.json();
      if (data.success) {
        setTelegramStatus({ id: word.id, ok: true, message: 'Delivered to Telegram!' });
      } else {
        setTelegramStatus({ id: word.id, ok: false, message: data.error || 'Telegram delivery failed' });
      }
    } catch (err: any) {
      setTelegramStatus({ id: word.id, ok: false, message: err.message });
    } finally {
      setIsSendingTg(null);
      setTimeout(() => setTelegramStatus(null), 4000);
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-6">
      
      {/* Textbook Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-emerald-950 rounded-2xl p-6 sm:p-8 text-white shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-6 border border-slate-700">
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-emerald-400 text-xs font-bold uppercase tracking-wider">
            <BookOpen className="w-4 h-4" />
            <span>Official Curriculum Reference</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            2000 Core Words & Phrases — Bulgarian
          </h1>
          <p className="text-sm text-slate-300 max-w-2xl leading-relaxed">
            Everyday vocabulary, phonetic transcriptions, and authentic sample sentences from the <i>BulgarianPod101 2000 Core Words</i> textbook. Listen to native speech, practice pronunciation, and push phrases to your Telegram bot.
          </p>
        </div>

        <div className="shrink-0 flex flex-col items-start md:items-end gap-2 bg-white/10 backdrop-blur-xs p-4 rounded-xl border border-white/10">
          <span className="text-xs text-slate-300 font-medium">Textbook Coverage</span>
          <span className="text-xl font-bold text-white">10 Chapters</span>
          <span className="text-[11px] text-emerald-300 font-semibold">2000 Words & Dialogues</span>
        </div>
      </div>

      {/* Chapter Filter & Search Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 bg-white p-4 rounded-2xl border border-slate-200 shadow-xs">
        
        {/* Chapter dropdown */}
        <div className="flex-1">
          <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">
            Filter by Textbook Chapter:
          </label>
          <select
            value={selectedChapter}
            onChange={(e) => setSelectedChapter(e.target.value === 'all' ? 'all' : Number(e.target.value))}
            className="w-full px-3 py-2 text-xs font-semibold bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-slate-900 cursor-pointer"
          >
            <option value="all">All Chapters (2000 Core Words & Phrases)</option>
            {BOOK_CHAPTERS.map((ch) => (
              <option key={ch.id} value={ch.id}>
                {ch.title} (Words {ch.wordRange})
              </option>
            ))}
          </select>
        </div>

        {/* Search Input */}
        <div className="flex-1">
          <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">
            Search Word or Sentence:
          </label>
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search in English or Cyrillic (e.g. coffee, кафе, здравей)..."
              className="w-full pl-9 pr-4 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-slate-900"
            />
          </div>
        </div>

      </div>

      {/* Vocabulary Grid */}
      <div className="space-y-3">
        <div className="flex items-center justify-between text-xs text-slate-500 font-medium px-1">
          <span>Showing {filteredWords.length} phrases from the textbook</span>
          <span className="text-[11px] text-slate-400">Click any card to listen or practice</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredWords.map((word) => (
            <div
              key={word.id}
              className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs hover:border-slate-300 transition-all flex flex-col justify-between space-y-4"
            >
              {/* Header: Word ID & Category */}
              <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-bold bg-slate-100 text-slate-700 px-2 py-0.5 rounded-md font-mono">
                    #{word.id}
                  </span>
                  <span className="text-xs font-semibold text-slate-500">
                    {word.chapterTitle}
                  </span>
                </div>
                <span className="text-[11px] font-medium text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
                  {word.category}
                </span>
              </div>

              {/* Main Word Presentation */}
              <div className="space-y-1">
                <div className="flex items-baseline gap-2">
                  <h3 className="text-xl font-extrabold text-slate-900 tracking-tight font-serif">
                    {word.bulgarian}
                  </h3>
                  <span className="text-xs text-rose-600 font-medium">
                    [{word.transliteration}]
                  </span>
                </div>
                <p className="text-sm text-slate-700 font-medium">
                  {word.english}
                </p>
              </div>

              {/* Sample Sentence Box from Textbook */}
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/80 space-y-1 text-xs">
                <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                  Textbook Sample Sentence:
                </div>
                <div className="font-semibold text-slate-900">
                  "{word.sampleBulgarian}"
                </div>
                <div className="text-[11px] text-rose-600">
                  [{word.sampleTransliteration}]
                </div>
                <div className="text-slate-600 italic text-[11px]">
                  {word.sampleEnglish}
                </div>
              </div>

              {/* Action Toolbar */}
              <div className="flex items-center justify-between pt-1 text-xs">
                {/* Audio Button */}
                <button
                  onClick={() => handlePlayAudio(word)}
                  disabled={loadingAudioId === word.id}
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl font-medium transition-colors cursor-pointer shadow-2xs"
                  title="Listen to native audio for word and sentence"
                >
                  {loadingAudioId === word.id ? (
                    <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                  ) : playingWordId === word.id ? (
                    <Pause className="w-3.5 h-3.5 text-rose-400" />
                  ) : (
                    <Volume2 className="w-3.5 h-3.5" />
                  )}
                  <span>{playingWordId === word.id ? 'Playing...' : 'Listen'}</span>
                </button>

                {/* Lab Practice */}
                <button
                  onClick={() => onSelectForPractice(word.sampleBulgarian)}
                  className="flex items-center gap-1 px-2.5 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl font-medium transition-colors cursor-pointer"
                  title="Practice pronunciation in the Lab"
                >
                  <Mic className="w-3.5 h-3.5 text-rose-600" />
                  <span>Pronounce</span>
                </button>

                {/* Ask Daskal */}
                <button
                  onClick={() => onSelectForChat(`Let's study Word #${word.id} from the 2000 Core Words book: "${word.bulgarian}" (${word.english}). Can you explain how to use it in everyday conversation?`)}
                  className="flex items-center gap-1 px-2.5 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl font-medium transition-colors cursor-pointer"
                  title="Practice with Daskal in Chat"
                >
                  <MessageSquare className="w-3.5 h-3.5 text-sky-600" />
                  <span>Chat</span>
                </button>

                {/* Push to Telegram */}
                {telegramChatId && (
                  <button
                    onClick={() => handleSendWordToTelegram(word)}
                    disabled={isSendingTg === word.id}
                    className="flex items-center gap-1 px-2.5 py-1.5 bg-sky-50 hover:bg-sky-100 text-sky-700 border border-sky-200 rounded-xl font-medium transition-colors cursor-pointer"
                    title="Send this phrase to your Telegram bot"
                  >
                    {isSendingTg === word.id ? (
                      <RefreshCw className="w-3 h-3 animate-spin" />
                    ) : (
                      <Send className="w-3 h-3 text-sky-600" />
                    )}
                    <span>Telegram</span>
                  </button>
                )}
              </div>

              {/* Telegram Status feedback */}
              {telegramStatus && telegramStatus.id === word.id && (
                <div className={`p-2 rounded-lg text-[11px] flex items-center gap-1.5 ${
                  telegramStatus.ok ? 'bg-emerald-50 text-emerald-800' : 'bg-rose-50 text-rose-800'
                }`}>
                  <CheckCircle className="w-3.5 h-3.5 shrink-0" />
                  <span>{telegramStatus.message}</span>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
