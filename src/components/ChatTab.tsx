import React, { useState, useRef, useEffect } from 'react';
import { 
  Send, 
  Mic, 
  MicOff, 
  Image as ImageIcon, 
  Volume2, 
  Sparkles, 
  Play, 
  Pause, 
  Award, 
  Globe, 
  X,
  RefreshCw
} from 'lucide-react';
import { ChatMessage, ProficiencyLevel } from '../types';

interface ChatTabProps {
  level: ProficiencyLevel;
  username: string;
}

const CYRILLIC_HELPERS = ['ъ', 'ж', 'ч', 'ш', 'щ', 'ю', 'я', 'ь', 'Ъ', 'Ж', 'Ч', 'Ш', 'Щ', 'Ю', 'Я'];

const TOPIC_CHIPS = [
  { id: 'greetings', label: 'Essential Greetings', prompt: 'Teach me essential Bulgarian greetings, polite expressions, and how to introduce myself with pronunciation guides.' },
  { id: 'cafe', label: 'Café & Dining', prompt: 'Let\'s practice ordering coffee, water, and traditional Bulgarian food in a restaurant in Sofia.' },
  { id: 'culture', label: 'Culture & Traditions', prompt: 'Teach me about famous Bulgarian traditions like Baba Marta (Martenitsa) and foods like Banitsa in Bulgarian with English explanations.' },
  { id: 'verbs', label: 'Verbs & Grammar', prompt: 'Explain how Bulgarian present tense verb conjugations work for key verbs like "съм" (to be) and "имам" (to have).' },
  { id: 'shopping', label: 'Shopping & Numbers', prompt: 'Let\'s practice asking how much something costs and counting Bulgarian Leva (лева).' },
  { id: 'free', label: 'Free Conversation', prompt: 'Let\'s have an everyday interactive Bulgarian conversation suited to my level!' },
];

export const ChatTab: React.FC<ChatTabProps> = ({ level, username }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome-1',
      role: 'assistant',
      content: `Hello, **${username || 'Learner'}**! 🇧🇬 I am **Даскал** (Daskal) — your personal AI Bulgarian language tutor.\n\n` +
        `Here is how we can learn together:\n` +
        `• 💬 **Chat in English or Bulgarian**: Ask me any question, request translations, or practice conversation.\n` +
        `• 🎙️ **Send Voice Messages**: Speak Bulgarian using the microphone — I will analyze your pronunciation, score your accuracy, and guide your accent.\n` +
        `• 📸 **Send Photos**: Upload a photo of food, signs, or objects to learn the Bulgarian vocabulary for everything in the image.\n` +
        `• 🔊 **Hear Native Audio**: Tap the **"Listen"** button on any response to hear clear Bulgarian pronunciation.\n` +
        `• 🖼️ **Visual Flashcards**: Tap **"Flashcard"** to generate artwork illustrating new words.\n\n` +
        `What would you like to explore first? Choose a topic above or type a message below!`,
      timestamp: new Date().toISOString(),
    },
  ]);

  const [inputText, setInputText] = useState('');
  const [selectedTopic, setSelectedTopic] = useState('Essential Greetings');
  const [useSearch, setUseSearch] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  // Image Upload state
  const [selectedImageBase64, setSelectedImageBase64] = useState<string | null>(null);
  const [imageMimeType, setImageMimeType] = useState<string>('image/jpeg');
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // Audio Recording state
  const [isRecording, setIsRecording] = useState(false);
  const [recordingSeconds, setRecordingSeconds] = useState(0);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const timerRef = useRef<any>(null);
  const audioChunksRef = useRef<Blob[]>([]);

  // Audio Playback state
  const [playingAudioId, setPlayingAudioId] = useState<string | null>(null);
  const activeAudioRef = useRef<HTMLAudioElement | null>(null);
  const [generatingTtsId, setGeneratingTtsId] = useState<string | null>(null);
  const [generatingImageId, setGeneratingImageId] = useState<string | null>(null);

  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  // Handle Text Submission
  const handleSendMessage = async (customPrompt?: string) => {
    const textToSend = customPrompt || inputText.trim();
    if (!textToSend && !selectedImageBase64) return;

    const userMessage: ChatMessage = {
      id: 'user-' + Date.now(),
      role: 'user',
      content: textToSend || (selectedImageBase64 ? '📷 [Sent a photo for Bulgarian analysis]' : ''),
      timestamp: new Date().toISOString(),
      imageUrl: selectedImageBase64 || undefined,
    };

    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setInputText('');
    const curImage = selectedImageBase64;
    const curMime = imageMimeType;
    setSelectedImageBase64(null);
    setIsLoading(true);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: newMessages.map((m) => ({ role: m.role, content: m.content })),
          topic: selectedTopic,
          level,
          imageBase64: curImage,
          imageMimeType: curMime,
          useSearch,
        }),
      });

      if (!res.ok) {
        const errorText = await res.text();
        throw new Error(errorText || 'Failed to generate response');
      }

      const data = await res.json();
      if (data.message) {
        const assistantMessage: ChatMessage = {
          id: 'asst-' + Date.now(),
          role: 'assistant',
          content: data.message,
          timestamp: new Date().toISOString(),
        };
        setMessages((prev) => [...prev, assistantMessage]);
      } else {
        throw new Error('No message received');
      }
    } catch (err: any) {
      console.error('Chat error:', err);
      const errorMessage: ChatMessage = {
        id: 'err-' + Date.now(),
        role: 'assistant',
        content: `Sorry, a temporary error occurred: ${err.message}. Please try again!`,
        timestamp: new Date().toISOString(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  // Handle Image Upload
  const handleImageFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageMimeType(file.type || 'image/jpeg');
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImageBase64(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  // Voice Recording for Chat
  const startRecording = async () => {
    audioChunksRef.current = [];
    setRecordingSeconds(0);

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;

      mediaRecorder.ondataavailable = (e) => {
        if (e.data.size > 0) {
          audioChunksRef.current.push(e.data);
        }
      };

      mediaRecorder.onstop = async () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
        stream.getTracks().forEach((track) => track.stop());
        await processVoiceMessage(audioBlob);
      };

      mediaRecorder.start();
      setIsRecording(true);

      timerRef.current = setInterval(() => {
        setRecordingSeconds((prev) => prev + 1);
      }, 1000);
    } catch (err) {
      console.error('Mic access error:', err);
      alert('Please allow microphone access to record your Bulgarian speech.');
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      clearInterval(timerRef.current);
    }
  };

  // Process voice message with pronunciation check and generate teacher reply
  const processVoiceMessage = async (audioBlob: Blob) => {
    setIsLoading(true);

    const reader = new FileReader();
    reader.readAsDataURL(audioBlob);
    reader.onloadend = async () => {
      const base64Audio = reader.result as string;
      const audioUrl = URL.createObjectURL(audioBlob);

      // Create optimistic user message with voice note
      const userVoiceMsgId = 'voice-' + Date.now();
      const userMessage: ChatMessage = {
        id: userVoiceMsgId,
        role: 'user',
        content: '🎙️ [Voice Message]',
        timestamp: new Date().toISOString(),
        audioUrl,
        audioDuration: recordingSeconds,
      };

      setMessages((prev) => [...prev, userMessage]);

      try {
        // Step 1: Check pronunciation
        const checkRes = await fetch('/api/pronunciation-check', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            audioBase64: base64Audio,
            mimeType: 'audio/webm',
            level,
          }),
        });

        if (!checkRes.ok) {
          throw new Error('Pronunciation check failed');
        }

        const checkData = await checkRes.json();
        const analysis = checkData.analysis || checkData.fallback;

        // Update user message with pronunciation analysis
        setMessages((prev) =>
          prev.map((m) =>
            m.id === userVoiceMsgId
              ? {
                  ...m,
                  content: `🎙️ Spoken: "${analysis?.transcribed || 'Bulgarian speech'}"`,
                  pronunciationAnalysis: analysis,
                }
              : m
          )
        );

        // Step 2: Teacher responds to what was said in English + Bulgarian
        const chatRes = await fetch('/api/chat', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            messages: [
              ...messages.map((m) => ({ role: m.role, content: m.content })),
              {
                role: 'user',
                content: `I spoke in Bulgarian: "${analysis?.transcribed}". Pronunciation score was ${analysis?.score || 85}%. Please respond with encouraging feedback in English, translate what I said, and ask a follow-up question.`,
              },
            ],
            topic: selectedTopic,
            level,
            useSearch,
          }),
        });

        if (!chatRes.ok) {
          throw new Error('Chat response failed');
        }

        const chatData = await chatRes.json();
        const assistantMessage: ChatMessage = {
          id: 'asst-' + Date.now(),
          role: 'assistant',
          content: chatData.message || 'Great effort speaking Bulgarian! Keep practicing out loud.',
          timestamp: new Date().toISOString(),
        };

        setMessages((prev) => [...prev, assistantMessage]);
      } catch (err: any) {
        console.error('Voice processing error:', err);
      } finally {
        setIsLoading(false);
      }
    };
  };

  // Play Native Bulgarian Audio for Assistant Message
  const handlePlayTts = async (messageId: string, text: string) => {
    if (activeAudioRef.current) {
      activeAudioRef.current.pause();
    }

    if (playingAudioId === messageId) {
      setPlayingAudioId(null);
      return;
    }

    setGeneratingTtsId(messageId);

    try {
      const res = await fetch('/api/tts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text }),
      });

      if (!res.ok) {
        throw new Error('TTS failed');
      }

      const data = await res.json();
      if (data.success && data.audioDataUrl) {
        const audio = new Audio(data.audioDataUrl);
        activeAudioRef.current = audio;
        audio.onended = () => setPlayingAudioId(null);
        setPlayingAudioId(messageId);
        audio.play();
      } else {
        // Fallback to browser SpeechSynthesis
        const utter = new SpeechSynthesisUtterance(text.replace(/<[^>]*>?/gm, ''));
        utter.lang = 'bg-BG';
        utter.onend = () => setPlayingAudioId(null);
        setPlayingAudioId(messageId);
        window.speechSynthesis.speak(utter);
      }
    } catch (err) {
      // SpeechSynthesis fallback
      const utter = new SpeechSynthesisUtterance(text.replace(/<[^>]*>?/gm, ''));
      utter.lang = 'bg-BG';
      utter.onend = () => setPlayingAudioId(null);
      setPlayingAudioId(messageId);
      window.speechSynthesis.speak(utter);
    } finally {
      setGeneratingTtsId(null);
    }
  };

  // Generate Illustrative Visual Flashcard for Message Word
  const handleGenerateImage = async (messageId: string, text: string) => {
    setGeneratingImageId(messageId);
    try {
      const res = await fetch('/api/generate-image', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: text.slice(0, 120) }),
      });
      
      if (!res.ok) {
        throw new Error('Image generation failed');
      }
      
      const data = await res.json();
      if (data.success && data.imageUrl) {
        setMessages((prev) =>
          prev.map((m) => (m.id === messageId ? { ...m, generatedImage: data.imageUrl } : m))
        );
      }
    } catch (err) {
      console.error('Image generation error:', err);
    } finally {
      setGeneratingImageId(null);
    }
  };

  // Insert Cyrillic letter
  const insertLetter = (letter: string) => {
    setInputText((prev) => prev + letter);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-6 flex flex-col h-[calc(100vh-5rem)]">
      
      {/* Topic Chips Bar */}
      <div className="flex items-center gap-2 overflow-x-auto pb-3 mb-2 shrink-0 no-scrollbar">
        <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider whitespace-nowrap">
          Quick Topics:
        </span>
        {TOPIC_CHIPS.map((chip) => (
          <button
            key={chip.id}
            onClick={() => {
              setSelectedTopic(chip.label);
              handleSendMessage(chip.prompt);
            }}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all border cursor-pointer ${
              selectedTopic === chip.label
                ? 'bg-slate-900 text-white border-slate-900 shadow-xs'
                : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
            }`}
          >
            {chip.label}
          </button>
        ))}
      </div>

      {/* Messages Stream Container */}
      <div className="flex-1 bg-white rounded-2xl border border-slate-200 p-4 sm:p-6 overflow-y-auto space-y-5 shadow-xs mb-3">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'}`}
          >
            <div className="flex items-center gap-2 mb-1 text-[11px] text-slate-400">
              <span className="font-semibold text-slate-600">
                {msg.role === 'user' ? username || 'You' : 'Даскал (Tutor)'}
              </span>
              <span>·</span>
              <span>{new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
            </div>

            {/* Bubble */}
            <div
              className={`max-w-[85%] sm:max-w-[75%] rounded-2xl p-4 text-sm leading-relaxed ${
                msg.role === 'user'
                  ? 'bg-slate-900 text-white rounded-br-xs'
                  : 'bg-slate-50 text-slate-900 border border-slate-200 rounded-bl-xs'
              }`}
            >
              {/* Optional Uploaded Image */}
              {msg.imageUrl && (
                <div className="mb-3 rounded-xl overflow-hidden border border-white/20 max-w-sm">
                  <img
                    src={msg.imageUrl}
                    alt="Uploaded for Bulgarian vocabulary analysis"
                    className="w-full h-auto object-cover max-h-60"
                  />
                </div>
              )}

              {/* Optional Voice Note in Bubble */}
              {msg.audioUrl && (
                <div className="mb-3 p-3 bg-white/10 rounded-xl flex items-center gap-3">
                  <button
                    onClick={() => {
                      const audio = new Audio(msg.audioUrl);
                      audio.play();
                    }}
                    className="p-2 bg-white text-slate-900 rounded-lg hover:bg-slate-100 transition-colors cursor-pointer"
                  >
                    <Play className="w-4 h-4" />
                  </button>
                  <div className="text-xs">
                    <div className="font-semibold">Voice Recording ({msg.audioDuration || 2}s)</div>
                    <div className="text-[11px] opacity-80">Click to listen to your recording</div>
                  </div>
                </div>
              )}

              {/* Pronunciation Analysis Feedback if user sent speech */}
              {msg.pronunciationAnalysis && (
                <div className="mb-3 p-3 bg-white text-slate-900 rounded-xl border border-slate-200 space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-rose-600 flex items-center gap-1">
                      <Award className="w-3.5 h-3.5" />
                      <span>Pronunciation Assessment:</span>
                    </span>
                    <span className="text-xs font-extrabold px-2 py-0.5 bg-emerald-50 text-emerald-800 rounded-md border border-emerald-200">
                      {msg.pronunciationAnalysis.score}% ({msg.pronunciationAnalysis.accuracyRating})
                    </span>
                  </div>
                  <p className="text-xs text-slate-700">
                    {msg.pronunciationAnalysis.phoneticFeedback}
                  </p>
                  {msg.pronunciationAnalysis.keySoundsToImprove?.length > 0 && (
                    <div className="text-[11px] text-slate-500">
                      💡 Focus sounds: {msg.pronunciationAnalysis.keySoundsToImprove.join(', ')}
                    </div>
                  )}
                </div>
              )}

              {/* Text content with formatted paragraphs */}
              <div className="space-y-2 whitespace-pre-wrap">
                {msg.content.split('\n\n').map((para, i) => (
                  <p key={i}>{para}</p>
                ))}
              </div>

              {/* Optional AI Generated Illustration */}
              {msg.generatedImage && (
                <div className="mt-3 rounded-xl overflow-hidden border border-slate-200 shadow-xs">
                  <img
                    src={msg.generatedImage}
                    alt="AI Visual Flashcard"
                    className="w-full h-auto object-cover max-h-60"
                  />
                  <div className="p-2 bg-white text-[11px] text-slate-500 text-center font-medium">
                    ✨ Visual flashcard for this Bulgarian lesson
                  </div>
                </div>
              )}

              {/* Assistant Message Action Toolbar */}
              {msg.role === 'assistant' && (
                <div className="mt-3 pt-3 border-t border-slate-200/80 flex items-center justify-between text-xs text-slate-500">
                  <div className="flex items-center gap-2">
                    {/* Native Speech Pronunciation Audio */}
                    <button
                      onClick={() => handlePlayTts(msg.id, msg.content)}
                      disabled={generatingTtsId === msg.id}
                      className="flex items-center gap-1.5 px-2.5 py-1 bg-white hover:bg-slate-100 border border-slate-200 rounded-lg text-slate-700 transition-colors cursor-pointer"
                      title="Hear authentic Bulgarian pronunciation"
                    >
                      {generatingTtsId === msg.id ? (
                        <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                      ) : playingAudioId === msg.id ? (
                        <Pause className="w-3.5 h-3.5 text-rose-500" />
                      ) : (
                        <Volume2 className="w-3.5 h-3.5 text-slate-600" />
                      )}
                      <span>{playingAudioId === msg.id ? 'Pause' : 'Listen'}</span>
                    </button>

                    {/* Generate Visual Card */}
                    {!msg.generatedImage && (
                      <button
                        onClick={() => handleGenerateImage(msg.id, msg.content)}
                        disabled={generatingImageId === msg.id}
                        className="flex items-center gap-1 px-2.5 py-1 bg-white hover:bg-slate-100 border border-slate-200 rounded-lg text-slate-700 transition-colors cursor-pointer"
                        title="Generate visual illustration for this lesson"
                      >
                        {generatingImageId === msg.id ? (
                          <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                        ) : (
                          <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                        )}
                        <span>Flashcard</span>
                      </button>
                    )}
                  </div>

                  <span className="text-[11px] text-slate-400">Level: {level}</span>
                </div>
              )}
            </div>
          </div>
        ))}

        {isLoading && (
          <div className="flex items-center gap-2.5 text-slate-500 text-xs p-3 bg-slate-50 rounded-xl border border-slate-200 max-w-xs animate-pulse">
            <RefreshCw className="w-3.5 h-3.5 animate-spin text-slate-600" />
            <span>Даскал is preparing your Bulgarian lesson...</span>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Cyrillic Quick-Helper Bar */}
      <div className="flex items-center gap-1.5 overflow-x-auto py-1 px-2 bg-slate-100 rounded-t-xl border border-b-0 border-slate-200 text-xs">
        <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider shrink-0 mr-1">
          Cyrillic Helpers:
        </span>
        {CYRILLIC_HELPERS.map((char) => (
          <button
            key={char}
            onClick={() => insertLetter(char)}
            className="w-6 h-6 rounded bg-white hover:bg-slate-200 border border-slate-200 flex items-center justify-center font-bold text-slate-800 transition-colors shrink-0 shadow-2xs cursor-pointer"
            title={`Insert ${char}`}
          >
            {char}
          </button>
        ))}
      </div>

      {/* Selected Image Preview Strip */}
      {selectedImageBase64 && (
        <div className="p-2 bg-slate-100 border-x border-slate-200 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <img
              src={selectedImageBase64}
              alt="Preview"
              className="w-10 h-10 object-cover rounded-lg border border-slate-300"
            />
            <span className="text-xs text-slate-700 font-medium">Photo ready for Bulgarian vocabulary analysis</span>
          </div>
          <button
            onClick={() => setSelectedImageBase64(null)}
            className="p-1 hover:bg-slate-200 rounded-lg text-slate-500 cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Input Composer */}
      <div className="bg-white rounded-b-2xl border border-slate-200 p-3 shadow-xs">
        <div className="flex items-end gap-2">
          
          {/* Hidden File Input */}
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleImageFileChange}
            accept="image/*"
            className="hidden"
          />

          {/* Photo Upload Button */}
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="p-2.5 rounded-xl hover:bg-slate-100 text-slate-500 hover:text-slate-800 transition-colors cursor-pointer"
            title="Upload photo for Bulgarian vocabulary analysis"
          >
            <ImageIcon className="w-5 h-5" />
          </button>

          {/* Voice Record Button */}
          <button
            type="button"
            onClick={isRecording ? stopRecording : startRecording}
            className={`p-2.5 rounded-xl transition-all cursor-pointer ${
              isRecording
                ? 'bg-rose-600 text-white animate-pulse'
                : 'hover:bg-slate-100 text-slate-500 hover:text-slate-800'
            }`}
            title={isRecording ? 'Stop Recording' : 'Record voice message in Bulgarian'}
          >
            {isRecording ? <MicOff className="w-5 h-5 text-white" /> : <Mic className="w-5 h-5" />}
          </button>

          {/* Text Area Input */}
          <div className="flex-1">
            <textarea
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleSendMessage();
                }
              }}
              placeholder={isRecording ? `Recording speech... (${recordingSeconds}s)` : "Ask a question in English or practice writing Bulgarian..."}
              rows={1}
              className="w-full px-3.5 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-transparent transition-all resize-none"
            />
          </div>

          {/* Open Sources Toggle */}
          <button
            type="button"
            onClick={() => setUseSearch(!useSearch)}
            className={`p-2.5 rounded-xl border transition-colors cursor-pointer ${
              useSearch
                ? 'bg-sky-50 text-sky-700 border-sky-200'
                : 'bg-slate-50 text-slate-400 border-slate-200'
            }`}
            title={useSearch ? 'Open sources search grounding enabled' : 'Search grounding disabled'}
          >
            <Globe className="w-4 h-4" />
          </button>

          {/* Send Button */}
          <button
            type="button"
            onClick={() => handleSendMessage()}
            disabled={isLoading || (!inputText.trim() && !selectedImageBase64)}
            className="p-2.5 bg-slate-900 hover:bg-slate-800 disabled:opacity-40 text-white rounded-xl transition-colors cursor-pointer shadow-xs"
            title="Send message"
          >
            <Send className="w-4 h-4" />
          </button>

        </div>
      </div>

    </div>
  );
};
