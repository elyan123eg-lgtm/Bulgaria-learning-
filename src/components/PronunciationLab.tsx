import React, { useState, useRef } from 'react';
import { 
  Mic, 
  MicOff, 
  Volume2, 
  Play, 
  Pause, 
  Sparkles, 
  Award, 
  HelpCircle, 
  RefreshCw,
  Sliders
} from 'lucide-react';
import { PronunciationDrill, ProficiencyLevel } from '../types';

const PRESET_DRILLS: PronunciationDrill[] = [
  {
    id: 'drill-1',
    title: 'The Unique Vowel "Ъ"',
    sound: 'Ъ',
    ipa: '[ɤ] (like "u" in "cut", but deeper)',
    bulgarianPhrase: 'Добре дошли в България!',
    transliteration: '[do-bré do-shlí v Bǎl-gá-ri-ya]',
    englishMeaning: 'Welcome to Bulgaria!',
    tip: 'Keep your lips unrounded and relaxed. Vocalize firmly from the mid-back of your mouth without shifting into "ah" or "oo".',
    difficulty: 'Beginner',
  },
  {
    id: 'drill-2',
    title: 'The Compound Sound "Щ"',
    sound: 'Щ',
    ipa: '[ʃt] (pronounced as blended "sh + t")',
    bulgarianPhrase: 'Лека нощ и хубава къща.',
    transliteration: '[lé-ka nosht i hú-ba-va kǎ́-shta]',
    englishMeaning: 'Good night and nice house.',
    tip: 'Unlike Russian where "Щ" is soft "shch", in Bulgarian it is always pronounced crisply as "sht" like in the word "fresh-toast".',
    difficulty: 'Beginner',
  },
  {
    id: 'drill-3',
    title: 'Vowel Reduction',
    sound: 'O ➔ [U], A ➔ [Ъ]',
    ipa: '[o ➔ u, a ➔ ɤ]',
    bulgarianPhrase: 'Моля, дайте ми едно кафе с мляко.',
    transliteration: '[mó-lya, dáy-te mi ed-nó ka-fé s mlyá-ko]',
    englishMeaning: 'Please give me a coffee with milk.',
    tip: 'Unstressed "O" in natural Bulgarian speech is reduced slightly towards [U], and unstressed "A" softens towards [Ъ].',
    difficulty: 'Intermediate',
  },
  {
    id: 'drill-4',
    title: 'Word Stress & Intonation',
    sound: 'Word Stress (Ударение)',
    ipa: '[vǎ́l-na vs vǎl-ná]',
    bulgarianPhrase: 'Днес времето е чудесно за разходка.',
    transliteration: '[dnes vré-me-to e chu-dés-no za raz-hód-ka]',
    englishMeaning: 'Today the weather is wonderful for a walk.',
    tip: 'Bulgarian stress is dynamic and free. Vowels in stressed syllables are pronounced longer and louder than unstressed vowels.',
    difficulty: 'Intermediate',
  },
  {
    id: 'drill-5',
    title: 'Advanced Tongue-Twister',
    sound: 'Ж, Ч, Ш',
    ipa: '[ʒ, tʃ, ʃ]',
    bulgarianPhrase: 'Чичковите червенотиквеничета.',
    transliteration: '[chísh-ko-vi-te cher-ve-no-tik-ve-ni-che-ta]',
    englishMeaning: 'Uncle\'s little red pumpkin seeds (the most famous Bulgarian tongue-twister).',
    tip: 'Focus on clear transitions between the "ch" sound and the rhythm of the compound adjective!',
    difficulty: 'Advanced',
  },
];

export const PronunciationLab: React.FC<{ level: ProficiencyLevel }> = ({ level }) => {
  const [selectedDrill, setSelectedDrill] = useState<PronunciationDrill>(PRESET_DRILLS[0]);
  const [customPhrase, setCustomPhrase] = useState('');
  
  // Audio playback state
  const [isPlayingNative, setIsPlayingNative] = useState(false);
  const [audioSpeed, setAudioSpeed] = useState<0.8 | 1.0>(1.0);
  const [isLoadingAudio, setIsLoadingAudio] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Recording state
  const [isRecording, setIsRecording] = useState(false);
  const [recordedAudioBlob, setRecordedAudioBlob] = useState<Blob | null>(null);
  const [recordedAudioUrl, setRecordedAudioUrl] = useState<string | null>(null);
  const [recordingSeconds, setRecordingSeconds] = useState(0);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const timerRef = useRef<any>(null);
  const audioChunksRef = useRef<Blob[]>([]);

  // Evaluation result state
  const [isEvaluating, setIsEvaluating] = useState(false);
  const [evaluation, setEvaluation] = useState<{
    score: number;
    transcribed: string;
    accuracyRating: string;
    phoneticFeedback: string;
    keySoundsToImprove: string[];
    nativeExampleTip: string;
  } | null>(null);

  // Native Bulgarian TTS Audio Fetch
  const handlePlayNative = async (textToSpeak: string) => {
    if (audioRef.current) {
      audioRef.current.pause();
    }

    setIsLoadingAudio(true);
    try {
      const res = await fetch('/api/tts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: textToSpeak }),
      });
      const data = await res.json();
      if (data.success && data.audioDataUrl) {
        const audio = new Audio(data.audioDataUrl);
        audio.playbackRate = audioSpeed;
        audioRef.current = audio;
        audio.onended = () => setIsPlayingNative(false);
        setIsPlayingNative(true);
        audio.play();
      } else {
        // Fallback to speech synthesis
        const synth = window.speechSynthesis;
        const utter = new SpeechSynthesisUtterance(textToSpeak);
        utter.lang = 'bg-BG';
        utter.rate = audioSpeed;
        utter.onend = () => setIsPlayingNative(false);
        setIsPlayingNative(true);
        synth.speak(utter);
      }
    } catch (err) {
      console.error('TTS error:', err);
      const synth = window.speechSynthesis;
      const utter = new SpeechSynthesisUtterance(textToSpeak);
      utter.lang = 'bg-BG';
      utter.rate = audioSpeed;
      utter.onend = () => setIsPlayingNative(false);
      setIsPlayingNative(true);
      synth.speak(utter);
    } finally {
      setIsLoadingAudio(false);
    }
  };

  // Recording Handler
  const startRecording = async () => {
    setEvaluation(null);
    setRecordedAudioBlob(null);
    setRecordedAudioUrl(null);
    setRecordingSeconds(0);
    audioChunksRef.current = [];

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;

      mediaRecorder.ondataavailable = (e) => {
        if (e.data.size > 0) {
          audioChunksRef.current.push(e.data);
        }
      };

      mediaRecorder.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
        setRecordedAudioBlob(audioBlob);
        setRecordedAudioUrl(URL.createObjectURL(audioBlob));
        stream.getTracks().forEach((track) => track.stop());
      };

      mediaRecorder.start();
      setIsRecording(true);

      timerRef.current = setInterval(() => {
        setRecordingSeconds((prev) => prev + 1);
      }, 1000);
    } catch (err) {
      console.error('Microphone access denied:', err);
      alert('Please allow microphone access to practice your Bulgarian pronunciation.');
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      clearInterval(timerRef.current);
    }
  };

  // Evaluate Recorded Speech
  const handleEvaluateSpeech = async () => {
    if (!recordedAudioBlob) return;

    setIsEvaluating(true);
    setEvaluation(null);

    try {
      const reader = new FileReader();
      reader.readAsDataURL(recordedAudioBlob);
      reader.onloadend = async () => {
        const base64Audio = reader.result as string;
        const target = customPhrase.trim() || selectedDrill.bulgarianPhrase;

        const res = await fetch('/api/pronunciation-check', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            audioBase64: base64Audio,
            mimeType: 'audio/webm',
            targetText: target,
            level,
          }),
        });

        const data = await res.json();
        if (data.success && data.analysis) {
          setEvaluation(data.analysis);
        } else if (data.fallback) {
          setEvaluation(data.fallback);
        }
        setIsEvaluating(false);
      };
    } catch (err) {
      console.error('Evaluation error:', err);
      setIsEvaluating(false);
    }
  };

  const activeTargetText = customPhrase.trim() || selectedDrill.bulgarianPhrase;

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-8">
      
      {/* Header */}
      <div className="border-b border-slate-200 pb-5">
        <div className="flex items-center gap-2 text-rose-600 text-xs font-bold uppercase tracking-wider mb-1">
          <Sparkles className="w-4 h-4" />
          <span>Interactive Phonetics & Speech Assessment</span>
        </div>
        <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
          Bulgarian Pronunciation Lab
        </h1>
        <p className="text-sm text-slate-600 mt-1">
          Listen to native Bulgarian pronunciation, record yourself speaking, and receive instant AI analysis with actionable tips for improvement.
        </p>
      </div>

      {/* Drill Selector Tabs */}
      <div className="space-y-3">
        <label className="text-xs font-semibold text-slate-600 uppercase tracking-wider">
          Select a Sound Drill:
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2">
          {PRESET_DRILLS.map((drill) => (
            <button
              key={drill.id}
              onClick={() => {
                setSelectedDrill(drill);
                setCustomPhrase('');
                setEvaluation(null);
                setRecordedAudioBlob(null);
              }}
              className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                selectedDrill.id === drill.id && !customPhrase
                  ? 'border-rose-600 bg-rose-50/50 text-slate-900 ring-1 ring-rose-600 shadow-xs'
                  : 'border-slate-200 bg-white hover:bg-slate-50 text-slate-700'
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm font-bold text-rose-600">{drill.sound}</span>
                <span className="text-[10px] font-semibold text-slate-400">{drill.difficulty}</span>
              </div>
              <div className="text-xs font-semibold line-clamp-1">{drill.title}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Active Drill Card */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-6">
        
        {/* Target Phrase Box */}
        <div className="space-y-3">
          <div className="flex items-center justify-between text-xs text-slate-500 font-medium">
            <span>Target Bulgarian Phrase</span>
            <span className="font-mono text-slate-600">{selectedDrill.ipa}</span>
          </div>

          <div className="p-5 bg-slate-50 rounded-2xl border border-slate-200 text-center space-y-2">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight font-serif">
              "{activeTargetText}"
            </h2>
            <div className="text-sm text-rose-600 font-medium">
              {selectedDrill.transliteration}
            </div>
            <div className="text-xs text-slate-500 italic">
              {selectedDrill.englishMeaning}
            </div>
          </div>

          {/* Phonetic Guidance Tip */}
          <div className="p-3 bg-amber-50/70 border border-amber-200 rounded-xl text-xs text-amber-900 flex items-start gap-2.5">
            <HelpCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
            <div>
              <span className="font-bold">Phonetic Tip: </span>
              <span>{selectedDrill.tip}</span>
            </div>
          </div>
        </div>

        {/* Audio Interaction Area */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-slate-100">
          
          {/* Step 1: Listen to Native Pronunciation */}
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex flex-col justify-between space-y-3">
            <div>
              <div className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5 mb-1">
                <Volume2 className="w-4 h-4 text-slate-600" />
                <span>1. Listen to Native Speaker</span>
              </div>
              <p className="text-xs text-slate-500">
                AI native tutor speaks the phrase with authentic Bulgarian intonation and stress
              </p>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => handlePlayNative(activeTargetText)}
                disabled={isLoadingAudio}
                className="flex-1 py-2.5 px-4 bg-slate-900 hover:bg-slate-800 text-white font-medium text-xs rounded-xl transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-xs disabled:opacity-50"
              >
                {isLoadingAudio ? (
                  <RefreshCw className="w-4 h-4 animate-spin" />
                ) : isPlayingNative ? (
                  <Pause className="w-4 h-4 text-rose-400" />
                ) : (
                  <Play className="w-4 h-4" />
                )}
                <span>{isPlayingNative ? 'Playing audio...' : 'Hear Native Audio'}</span>
              </button>

              {/* Speed control */}
              <button
                onClick={() => setAudioSpeed(audioSpeed === 1.0 ? 0.8 : 1.0)}
                className="px-3 py-2.5 bg-white border border-slate-200 rounded-xl text-xs font-semibold text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
                title="Playback speed (0.8x for learners)"
              >
                {audioSpeed}x
              </button>
            </div>
          </div>

          {/* Step 2: Record Your Speech */}
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex flex-col justify-between space-y-3">
            <div>
              <div className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5 mb-1">
                <Mic className="w-4 h-4 text-rose-600" />
                <span>2. Record Your Voice</span>
              </div>
              <p className="text-xs text-slate-500">
                {isRecording 
                  ? `Recording in progress... (${recordingSeconds}s)`
                  : recordedAudioUrl 
                  ? 'Recording ready for assessment!' 
                  : 'Press the button and speak the Bulgarian phrase out loud'}
              </p>
            </div>

            <div className="flex items-center gap-2">
              {!isRecording ? (
                <button
                  onClick={startRecording}
                  className="flex-1 py-2.5 px-4 bg-rose-600 hover:bg-rose-500 text-white font-medium text-xs rounded-xl transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-xs"
                >
                  <Mic className="w-4 h-4" />
                  <span>{recordedAudioUrl ? 'Record Again' : 'Start Recording'}</span>
                </button>
              ) : (
                <button
                  onClick={stopRecording}
                  className="flex-1 py-2.5 px-4 bg-slate-900 hover:bg-slate-800 text-white font-medium text-xs rounded-xl transition-colors flex items-center justify-center gap-2 cursor-pointer animate-pulse"
                >
                  <MicOff className="w-4 h-4 text-rose-400" />
                  <span>Stop Recording ({recordingSeconds}s)</span>
                </button>
              )}

              {recordedAudioUrl && !isRecording && (
                <button
                  onClick={() => {
                    const audio = new Audio(recordedAudioUrl);
                    audio.play();
                  }}
                  className="p-2.5 bg-white border border-slate-200 rounded-xl hover:bg-slate-100 text-slate-700 transition-colors cursor-pointer"
                  title="Listen to your recording"
                >
                  <Play className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>

        </div>

        {/* Evaluate Action */}
        {recordedAudioBlob && !isRecording && (
          <div className="pt-2">
            <button
              onClick={handleEvaluateSpeech}
              disabled={isEvaluating}
              className="w-full py-3 px-4 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-sm rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer shadow-sm disabled:opacity-50"
            >
              {isEvaluating ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>AI analyzing Bulgarian phonemes and word stress...</span>
                </>
              ) : (
                <>
                  <Award className="w-4 h-4" />
                  <span>Evaluate My Pronunciation with AI</span>
                </>
              )}
            </button>
          </div>
        )}

        {/* Evaluation Results Card */}
        {evaluation && (
          <div className="p-6 bg-slate-50 rounded-2xl border border-slate-200 space-y-5 animate-in fade-in duration-300">
            <div className="flex items-center justify-between border-b border-slate-200 pb-4">
              <div className="flex items-center gap-3">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-white font-extrabold text-lg shadow-sm ${
                  evaluation.score >= 85 ? 'bg-emerald-600' : evaluation.score >= 70 ? 'bg-sky-600' : 'bg-amber-600'
                }`}>
                  {evaluation.score}%
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-900">
                    {evaluation.accuracyRating}
                  </h3>
                  <p className="text-xs text-slate-500">
                    Transcribed: "{evaluation.transcribed}"
                  </p>
                </div>
              </div>

              <span className={`text-xs font-semibold px-2.5 py-1 rounded-full border ${
                evaluation.score >= 85
                  ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                  : 'bg-amber-50 text-amber-800 border-amber-200'
              }`}>
                {evaluation.score >= 85 ? 'Great Work!' : 'Good Progress!'}
              </span>
            </div>

            {/* Phonetic Feedback Details */}
            <div className="space-y-3">
              <div>
                <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Teacher's Phonetic Feedback:
                </h4>
                <p className="text-xs text-slate-700 leading-relaxed bg-white p-3 rounded-xl border border-slate-200">
                  {evaluation.phoneticFeedback}
                </p>
              </div>

              {evaluation.keySoundsToImprove && evaluation.keySoundsToImprove.length > 0 && (
                <div>
                  <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Sounds to Focus On:
                  </h4>
                  <div className="flex flex-wrap gap-1.5">
                    {evaluation.keySoundsToImprove.map((sound, i) => (
                      <span
                        key={i}
                        className="text-xs font-medium bg-rose-50 text-rose-800 border border-rose-200 px-2.5 py-1 rounded-lg"
                      >
                        {sound}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {evaluation.nativeExampleTip && (
                <div className="p-3 bg-sky-50 border border-sky-200 rounded-xl text-xs text-sky-900 flex items-start gap-2">
                  <Sparkles className="w-4 h-4 text-sky-600 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold">Practical Advice: </span>
                    <span>{evaluation.nativeExampleTip}</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

      </div>

      {/* Custom Phrase Box */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-3">
        <div className="flex items-center gap-2 text-xs font-bold text-slate-700 uppercase tracking-wider">
          <Sliders className="w-4 h-4 text-slate-500" />
          <span>Practice Any Custom Bulgarian Phrase</span>
        </div>
        <p className="text-xs text-slate-500">
          Type any Bulgarian phrase to hear its native pronunciation and test your speaking:
        </p>
        <div className="flex gap-2">
          <input
            type="text"
            value={customPhrase}
            onChange={(e) => setCustomPhrase(e.target.value)}
            placeholder="e.g. 'Една чаша червено вино, моля' (A glass of red wine, please)"
            className="flex-1 px-4 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-transparent transition-all"
          />
          {customPhrase && (
            <button
              onClick={() => handlePlayNative(customPhrase)}
              className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-semibold rounded-xl transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <Volume2 className="w-3.5 h-3.5" />
              <span>Listen</span>
            </button>
          )}
        </div>
      </div>

    </div>
  );
};
