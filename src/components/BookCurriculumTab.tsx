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
  MessageSquare,
  FileText,
  Layers,
  ChevronRight,
  Check,
  AlertCircle
} from 'lucide-react';
import { BULGARIAN_PRACTICE_LESSONS, BOOK_APPENDICES, BookLesson, BookAppendix } from '../data/bulgarianPracticeBook';
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
  const [activeSection, setActiveSection] = useState<'lessons' | 'appendices'>('lessons');
  const [selectedLessonId, setSelectedLessonId] = useState<number>(1);
  const [selectedAppendixId, setSelectedAppendixId] = useState<number>(1);
  const [playingPhrase, setPlayingPhrase] = useState<string | null>(null);
  const [userExerciseAnswers, setUserExerciseAnswers] = useState<Record<string, string>>({});
  const [exerciseFeedback, setExerciseFeedback] = useState<Record<string, boolean | null>>({});

  const currentLesson = BULGARIAN_PRACTICE_LESSONS.find((l) => l.id === selectedLessonId) || BULGARIAN_PRACTICE_LESSONS[0];
  const currentAppendix = BOOK_APPENDICES.find((a) => a.id === selectedAppendixId) || BOOK_APPENDICES[0];

  // Speech pronunciation helper
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

  const handleCheckAnswer = (key: string, expected: string) => {
    const given = (userExerciseAnswers[key] || '').trim().toLowerCase();
    const correct = given === expected.trim().toLowerCase();
    setExerciseFeedback((prev) => ({ ...prev, [key]: correct }));
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-6">
      
      {/* Header Banner */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center font-bold shadow-xs">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-slate-900 tracking-tight">
                The Bulgarian Language in Practice
              </h1>
              <p className="text-xs text-slate-500">
                A Basic Course in Contemporary Bulgarian as a Foreign Language · Eleonora Ivanova (Sofia, 2000)
              </p>
            </div>
          </div>
        </div>

        {/* Section Switcher */}
        <div className="flex items-center gap-1.5 bg-slate-100 p-1.5 rounded-xl border border-slate-200">
          <button
            onClick={() => setActiveSection('lessons')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              activeSection === 'lessons'
                ? 'bg-white text-slate-900 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            📖 Lessons (Уроци 1–25)
          </button>
          <button
            onClick={() => setActiveSection('appendices')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              activeSection === 'appendices'
                ? 'bg-white text-slate-900 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            📑 Appendices (Приложения 1–9)
          </button>
        </div>
      </div>

      {/* ================= SECTION: LESSONS ================= */}
      {activeSection === 'lessons' && (
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          
          {/* Left Column: Lesson Selector Drawer */}
          <div className="lg:col-span-1 bg-white rounded-2xl border border-slate-200 p-4 shadow-xs space-y-2 h-fit">
            <div className="text-xs font-bold text-slate-400 uppercase tracking-wider px-2 pb-1 border-b border-slate-100">
              Course Chapters
            </div>
            <div className="space-y-1 max-h-[70vh] overflow-y-auto pr-1">
              {BULGARIAN_PRACTICE_LESSONS.map((lesson) => (
                <button
                  key={lesson.id}
                  onClick={() => setSelectedLessonId(lesson.id)}
                  className={`w-full p-2.5 rounded-xl text-left text-xs transition-all cursor-pointer flex items-center justify-between gap-2 ${
                    selectedLessonId === lesson.id
                      ? 'bg-slate-900 text-white shadow-xs font-semibold'
                      : 'hover:bg-slate-50 text-slate-700'
                  }`}
                >
                  <div className="space-y-0.5 truncate">
                    <div className="font-bold truncate">Урок {lesson.number}: {lesson.titleBg}</div>
                    <div className={`text-[10px] truncate ${selectedLessonId === lesson.id ? 'text-slate-300' : 'text-slate-400'}`}>
                      {lesson.titleEn}
                    </div>
                  </div>
                  <ChevronRight className={`w-3.5 h-3.5 shrink-0 ${selectedLessonId === lesson.id ? 'text-white' : 'text-slate-400'}`} />
                </button>
              ))}
            </div>
          </div>

          {/* Right Area: Selected Lesson Reader */}
          <div className="lg:col-span-3 space-y-6">
            
            {/* Lesson Title Card */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-slate-100">
                <div>
                  <span className="text-xs font-extrabold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-200">
                    Урок № {currentLesson.number}
                  </span>
                  <h2 className="text-xl font-bold text-slate-900 mt-2">
                    {currentLesson.titleBg}
                  </h2>
                  <p className="text-sm text-slate-500">
                    {currentLesson.titleEn} · Level: <span className="font-semibold text-slate-700">{currentLesson.level}</span>
                  </p>
                </div>

                <button
                  onClick={() => onSelectForChat(`Let's study Lesson ${currentLesson.number}: "${currentLesson.titleBg}" from The Bulgarian Language in Practice. Can you quiz me on its vocabulary and grammar?`)}
                  className="flex items-center gap-1.5 px-3.5 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-semibold transition-colors cursor-pointer shadow-xs whitespace-nowrap self-start sm:self-auto"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Practice with Tutor</span>
                </button>
              </div>

              {/* Grammar Points list */}
              <div className="space-y-1.5">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                  Grammar & Topics in this Lesson:
                </span>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                  {currentLesson.grammarFocus.map((pt, i) => (
                    <li key={i} className="flex items-start gap-2 p-2 bg-slate-50 rounded-lg border border-slate-100 text-slate-700">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5 shrink-0" />
                      <span>{pt}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Lesson Dialogue Card */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <h3 className="text-base font-bold text-slate-900">
                  💬 {currentLesson.dialogueTitle}
                </h3>
                <span className="text-[11px] text-slate-400">Authentic textbook dialogue</span>
              </div>

              <div className="space-y-3">
                {currentLesson.dialogue.map((line, idx) => (
                  <div key={idx} className="p-3 bg-slate-50 rounded-xl border border-slate-100 flex items-start justify-between gap-3">
                    <div className="space-y-1">
                      <div className="text-xs font-bold text-slate-900">
                        <span className="text-emerald-700 font-extrabold">{line.speaker}:</span> {line.bulgarian}
                      </div>
                      <div className="text-xs text-slate-500 italic">
                        {line.english}
                      </div>
                    </div>

                    <div className="flex items-center gap-1.5 shrink-0">
                      <button
                        onClick={() => handlePlayAudio(line.bulgarian)}
                        className="p-1.5 bg-white hover:bg-slate-200 border border-slate-200 rounded-lg text-slate-600 transition-colors cursor-pointer"
                        title="Listen to native audio"
                      >
                        {playingPhrase === line.bulgarian ? (
                          <Pause className="w-3.5 h-3.5 text-rose-500" />
                        ) : (
                          <Volume2 className="w-3.5 h-3.5" />
                        )}
                      </button>

                      <button
                        onClick={() => onSelectForPractice(line.bulgarian)}
                        className="p-1.5 bg-rose-50 hover:bg-rose-100 border border-rose-200 rounded-lg text-rose-700 transition-colors cursor-pointer"
                        title="Practice speaking in Pronunciation Lab"
                      >
                        <Mic className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Lesson Core Vocabulary Grid */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <h3 className="text-base font-bold text-slate-900">
                  💡 Core Vocabulary (Списък на думите)
                </h3>
                <span className="text-[11px] text-slate-400">{currentLesson.vocabulary.length} words</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {currentLesson.vocabulary.map((v, i) => (
                  <div key={i} className="p-3 bg-slate-50 rounded-xl border border-slate-100 flex flex-col justify-between gap-2">
                    <div>
                      <div className="flex items-start justify-between gap-2">
                        <div className="font-bold text-sm text-slate-900">{v.bg}</div>
                        <span className="text-[10px] text-slate-400 font-mono">[{v.transliteration}]</span>
                      </div>
                      <div className="text-xs text-sky-700 font-medium">{v.en}</div>
                      {v.sampleBg && (
                        <div className="text-[11px] text-slate-500 mt-1 pt-1 border-t border-slate-200/60">
                          <i>"{v.sampleBg}"</i> — {v.sampleEn}
                        </div>
                      )}
                    </div>

                    <div className="flex items-center justify-end gap-1 pt-1">
                      <button
                        onClick={() => handlePlayAudio(v.bg)}
                        className="px-2 py-1 bg-white hover:bg-slate-100 border border-slate-200 rounded-lg text-[11px] text-slate-700 flex items-center gap-1 cursor-pointer"
                      >
                        <Volume2 className="w-3 h-3" />
                        <span>Listen</span>
                      </button>
                      <button
                        onClick={() => onSelectForPractice(v.bg)}
                        className="px-2 py-1 bg-rose-50 hover:bg-rose-100 border border-rose-200 rounded-lg text-[11px] text-rose-700 flex items-center gap-1 cursor-pointer"
                      >
                        <Mic className="w-3 h-3" />
                        <span>Drill</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Grammar & Cultural Notes */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs space-y-3">
                <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
                  <FileText className="w-4 h-4 text-emerald-600" />
                  <span>Grammar Rules & Insights</span>
                </h4>
                <ul className="space-y-2 text-xs text-slate-600 leading-relaxed">
                  {currentLesson.grammarNotes.map((note, i) => (
                    <li key={i} className="p-2.5 bg-slate-50 rounded-xl border border-slate-100">
                      {note}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs space-y-3">
                <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-amber-500" />
                  <span>Bulgarian Culture Notes</span>
                </h4>
                <ul className="space-y-2 text-xs text-slate-600 leading-relaxed">
                  {currentLesson.culturalNotes.map((note, i) => (
                    <li key={i} className="p-2.5 bg-amber-50/60 rounded-xl border border-amber-100 text-amber-950">
                      {note}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Interactive Exercises from Book */}
            {currentLesson.exercises.length > 0 && (
              <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                  <h3 className="text-base font-bold text-slate-900">
                    ✍️ Interactive Exercises (Упражнения)
                  </h3>
                  <span className="text-[11px] text-slate-400">Self-grading quiz</span>
                </div>

                {currentLesson.exercises.map((ex, exIdx) => (
                  <div key={exIdx} className="space-y-3">
                    <p className="text-xs font-bold text-slate-700">{ex.instruction}</p>
                    <div className="space-y-2.5">
                      {ex.items.map((item, itemIdx) => {
                        const key = `ex-${currentLesson.id}-${exIdx}-${itemIdx}`;
                        const feedback = exerciseFeedback[key];
                        return (
                          <div key={itemIdx} className="p-3 bg-slate-50 rounded-xl border border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                            <span className="font-medium text-slate-800">{item.prompt}</span>
                            <div className="flex items-center gap-2">
                              <input
                                type="text"
                                placeholder="Your answer"
                                value={userExerciseAnswers[key] || ''}
                                onChange={(e) => {
                                  setUserExerciseAnswers({ ...userExerciseAnswers, [key]: e.target.value });
                                  setExerciseFeedback({ ...exerciseFeedback, [key]: null });
                                }}
                                onKeyDown={(e) => e.key === 'Enter' && handleCheckAnswer(key, item.answer)}
                                className="px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-xs w-36 focus:outline-none focus:ring-2 focus:ring-slate-900"
                              />
                              <button
                                onClick={() => handleCheckAnswer(key, item.answer)}
                                className="px-2.5 py-1.5 bg-slate-900 text-white rounded-lg font-medium text-xs hover:bg-slate-800 cursor-pointer"
                              >
                                Check
                              </button>
                              {feedback === true && (
                                <span className="text-emerald-600 font-bold flex items-center gap-1">
                                  <Check className="w-4 h-4" /> Correct!
                                </span>
                              )}
                              {feedback === false && (
                                <span className="text-rose-600 text-[11px]">
                                  Answer: <b>{item.answer}</b>
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

      {/* ================= SECTION: APPENDICES ================= */}
      {activeSection === 'appendices' && (
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Left Appendix Selector Drawer */}
          <div className="lg:col-span-1 bg-white rounded-2xl border border-slate-200 p-4 shadow-xs space-y-2 h-fit">
            <div className="text-xs font-bold text-slate-400 uppercase tracking-wider px-2 pb-1 border-b border-slate-100">
              Appendices (Приложения)
            </div>
            <div className="space-y-1">
              {BOOK_APPENDICES.map((app) => (
                <button
                  key={app.id}
                  onClick={() => setSelectedAppendixId(app.id)}
                  className={`w-full p-2.5 rounded-xl text-left text-xs transition-all cursor-pointer flex items-center justify-between gap-2 ${
                    selectedAppendixId === app.id
                      ? 'bg-slate-900 text-white shadow-xs font-semibold'
                      : 'hover:bg-slate-50 text-slate-700'
                  }`}
                >
                  <div className="truncate">
                    <div className="font-bold truncate">{app.titleBg}</div>
                    <div className={`text-[10px] truncate ${selectedAppendixId === app.id ? 'text-slate-300' : 'text-slate-400'}`}>
                      {app.titleEn}
                    </div>
                  </div>
                  <ChevronRight className={`w-3.5 h-3.5 shrink-0 ${selectedAppendixId === app.id ? 'text-white' : 'text-slate-400'}`} />
                </button>
              ))}
            </div>
          </div>

          {/* Right Appendix Content */}
          <div className="lg:col-span-3 space-y-6">
            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-4">
              <div className="pb-3 border-b border-slate-100">
                <h2 className="text-lg font-bold text-slate-900">
                  {currentAppendix.titleBg}
                </h2>
                <p className="text-xs text-slate-500 mt-0.5">
                  {currentAppendix.titleEn} — {currentAppendix.description}
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {currentAppendix.items.map((item, idx) => (
                  <div key={idx} className="p-3.5 bg-slate-50 rounded-xl border border-slate-100 flex items-start justify-between gap-3">
                    <div className="space-y-1">
                      <div className="font-bold text-sm text-slate-900">
                        {item.bg}
                      </div>
                      <div className="text-xs text-sky-700 font-medium">
                        {item.en}
                      </div>
                      {item.details && (
                        <div className="text-[11px] text-slate-500 pt-1">
                          {item.details}
                        </div>
                      )}
                    </div>

                    <button
                      onClick={() => handlePlayAudio(item.bg)}
                      className="p-1.5 bg-white hover:bg-slate-200 border border-slate-200 rounded-lg text-slate-600 transition-colors cursor-pointer shrink-0"
                      title="Pronounce word"
                    >
                      <Volume2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
