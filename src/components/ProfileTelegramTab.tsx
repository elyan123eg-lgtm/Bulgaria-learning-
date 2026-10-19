import React, { useState, useEffect } from 'react';
import { 
  Send, 
  CheckCircle, 
  AlertCircle, 
  Clock, 
  ExternalLink, 
  BookOpen, 
  HelpCircle, 
  Sparkles,
  RefreshCw,
  User
} from 'lucide-react';
import { ProficiencyLevel, UserProfile, TelegramBotInfo } from '../types';

interface ProfileTelegramTabProps {
  userProfile: UserProfile;
  setUserProfile: React.Dispatch<React.SetStateAction<UserProfile>>;
  botInfo: TelegramBotInfo | null;
  onRefreshBotInfo: () => void;
}

export const ProfileTelegramTab: React.FC<ProfileTelegramTabProps> = ({
  userProfile,
  setUserProfile,
  botInfo,
}) => {
  const [usernameInput, setUsernameInput] = useState(userProfile.username || 'learner');
  const [passwordInput, setPasswordInput] = useState(userProfile.password || '');
  const [levelInput, setLevelInput] = useState<ProficiencyLevel>(userProfile.level || 'Beginner');
  const [chatIdInput, setChatIdInput] = useState(userProfile.telegramChatId || '');
  const [autoLessons, setAutoLessons] = useState(userProfile.autoLessonsEnabled ?? true);
  
  const [saveStatus, setSaveStatus] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [isTesting, setIsTesting] = useState(false);
  const [testResult, setTestResult] = useState<{ ok: boolean; message: string } | null>(null);
  
  const [isSendingTopic, setIsSendingTopic] = useState(false);
  const [topicResult, setTopicResult] = useState<{ ok: boolean; message: string } | null>(null);
  const [showGuide, setShowGuide] = useState(false);

  // Sync inputs if userProfile changes
  useEffect(() => {
    setUsernameInput(userProfile.username || 'learner');
    setPasswordInput(userProfile.password || '');
    setLevelInput(userProfile.level || 'Beginner');
    setChatIdInput(userProfile.telegramChatId || '');
    setAutoLessons(userProfile.autoLessonsEnabled ?? true);
  }, [userProfile]);

  const handleSaveProfile = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setIsSaving(true);
    setSaveStatus(null);
    setTestResult(null);

    try {
      const res = await fetch('/api/profile/save', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username: usernameInput.trim() || 'learner',
          password: passwordInput,
          level: levelInput,
          telegramChatId: chatIdInput.trim(),
          autoLessonsEnabled: autoLessons,
        }),
      });

      if (!res.ok) {
        throw new Error('Failed to save profile');
      }

      const data = await res.json();
      if (data.success && data.profile) {
        setUserProfile(data.profile);
        setSaveStatus('Profile and Telegram settings saved successfully!');
        setTimeout(() => setSaveStatus(null), 4000);
      } else {
        setSaveStatus('Save failed: ' + (data.error || 'Unknown error'));
      }
    } catch (err: any) {
      setSaveStatus('Network error saving profile: ' + err.message);
    } finally {
      setIsSaving(false);
    }
  };

  const handleSendTestMessage = async () => {
    if (!chatIdInput.trim()) {
      setTestResult({ ok: false, message: 'Please enter your Telegram Chat ID first!' });
      return;
    }

    setIsTesting(true);
    setTestResult(null);

    try {
      const res = await fetch('/api/telegram/test', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          chatId: chatIdInput.trim(),
          username: usernameInput.trim() || 'Learner',
        }),
      });

      if (!res.ok) {
        throw new Error('Test message failed');
      }

      const data = await res.json();
      if (data.success) {
        setTestResult({
          ok: true,
          message: 'Test message sent successfully to your Telegram! Check your app.',
        });
      } else {
        setTestResult({
          ok: false,
          message: data.error || 'Telegram returned an error. Check if your Chat ID is correct.',
        });
      }
    } catch (err: any) {
      setTestResult({
        ok: false,
        message: 'Failed to connect to Telegram API: ' + err.message,
      });
    } finally {
      setIsTesting(false);
    }
  };

  const handleSendTopicNow = async () => {
    if (!chatIdInput.trim()) {
      setTopicResult({ ok: false, message: 'Please enter your Telegram Chat ID first!' });
      return;
    }

    setIsSendingTopic(true);
    setTopicResult(null);

    try {
      const res = await fetch('/api/telegram/send-topic', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          chatId: chatIdInput.trim(),
          level: levelInput,
          username: usernameInput.trim(),
        }),
      });

      if (!res.ok) {
        throw new Error('Lesson dispatch failed');
      }

      const data = await res.json();
      if (data.success) {
        setTopicResult({
          ok: true,
          message: `A fresh Bulgarian lesson was generated by AI and dispatched to your Telegram!`,
        });
        // Refresh profile to show new history
        const profRes = await fetch(`/api/profile/${usernameInput.trim()}`);
        if (profRes.ok) {
            const profData = await profRes.json();
            if (profData.success && profData.profile) {
              setUserProfile(profData.profile);
            }
        }
      } else {
        setTopicResult({
          ok: false,
          message: data.error || 'Failed to dispatch Telegram lesson.',
        });
      }
    } catch (err: any) {
      setTopicResult({
        ok: false,
        message: 'Error: ' + err.message,
      });
    } finally {
      setIsSendingTopic(false);
    }
  };

  const botUsername = botInfo?.bot?.username || 'BulgarianTutorBot';
  const botLink = `https://t.me/${botUsername}`;

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-8">
      
      {/* Header Info */}
      <div className="border-b border-slate-200 pb-5">
        <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
          User Profile & Telegram Bot Settings
        </h1>
        <p className="text-sm text-slate-600 mt-1">
          Set your Bulgarian learning level and connect your Telegram account to receive automated micro-lessons every 3 hours.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        
        {/* Card 1: Simple Profile & Level Settings */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-5">
          <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
            <div className="w-8 h-8 rounded-lg bg-slate-900 text-white flex items-center justify-center">
              <User className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-base font-bold text-slate-900">Your Learner Profile</h2>
              <p className="text-xs text-slate-500">Username, password, and target proficiency</p>
            </div>
          </div>

          <form onSubmit={handleSaveProfile} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                Username
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={usernameInput}
                  onChange={(e) => setUsernameInput(e.target.value)}
                  placeholder="e.g. maria_learner"
                  required
                  className="w-full px-3.5 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-transparent transition-all"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                Password
              </label>
              <div className="relative">
                <input
                  type="password"
                  value={passwordInput}
                  onChange={(e) => setPasswordInput(e.target.value)}
                  placeholder="••••••••"
                  className="w-full px-3.5 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-transparent transition-all"
                />
              </div>
              <p className="text-[11px] text-slate-400 mt-1">Simple login credentials to save your progress</p>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">
                Bulgarian Proficiency Level
              </label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: 'Beginner', code: 'A1-A2', title: 'Beginner', desc: 'Alphabet, greetings, café, basic verbs' },
                  { id: 'Intermediate', code: 'B1-B2', title: 'Intermediate', desc: 'Past tenses, conversations, grammar' },
                  { id: 'Advanced', code: 'C1-C2', title: 'Advanced', desc: 'Idioms, culture, complex dialogues' },
                ].map((l) => (
                  <button
                    key={l.id}
                    type="button"
                    onClick={() => setLevelInput(l.id as ProficiencyLevel)}
                    className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                      levelInput === l.id
                        ? 'border-slate-900 bg-slate-900 text-white shadow-xs'
                        : 'border-slate-200 bg-slate-50 text-slate-800 hover:bg-slate-100'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${
                        levelInput === l.id ? 'bg-slate-800 text-white' : 'bg-slate-200 text-slate-700'
                      }`}>
                        {l.code}
                      </span>
                    </div>
                    <div className="font-bold text-xs mt-1.5">{l.title}</div>
                    <div className={`text-[10px] mt-0.5 line-clamp-2 ${
                      levelInput === l.id ? 'text-slate-300' : 'text-slate-500'
                    }`}>
                      {l.desc}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            <button
              type="submit"
              disabled={isSaving}
              className="w-full py-2.5 px-4 bg-slate-900 hover:bg-slate-800 text-white font-medium text-xs rounded-xl transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-sm"
            >
              {isSaving ? <RefreshCw className="w-4 h-4 animate-spin" /> : <CheckCircle className="w-4 h-4" />}
              <span>Save Profile & Preferences</span>
            </button>

            {saveStatus && (
              <div className={`p-3 rounded-xl text-xs flex items-center gap-2 ${
                saveStatus.includes('successfully')
                  ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                  : 'bg-rose-50 text-rose-800 border border-rose-200'
              }`}>
                {saveStatus.includes('successfully') ? <CheckCircle className="w-4 h-4 shrink-0 text-emerald-600" /> : <AlertCircle className="w-4 h-4 shrink-0 text-rose-600" />}
                <span>{saveStatus}</span>
              </div>
            )}
          </form>
        </div>

        {/* Card 2: Telegram Bot Integration */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-5">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-sky-500 text-white flex items-center justify-center">
                <Send className="w-4 h-4" />
              </div>
              <div>
                <h2 className="text-base font-bold text-slate-900">Telegram Bot</h2>
                <p className="text-xs text-slate-500">Automated lessons every 3 hours</p>
              </div>
            </div>
            
            {/* Live Bot Link */}
            <a
              href={botLink}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-1.5 px-2.5 py-1 text-xs font-semibold text-sky-700 bg-sky-50 hover:bg-sky-100 border border-sky-200 rounded-lg transition-colors cursor-pointer"
            >
              <span>@{botUsername}</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>

          <div className="space-y-4">
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-xs font-semibold text-slate-700 uppercase tracking-wider">
                  Your Telegram Chat ID
                </label>
                <button
                  type="button"
                  onClick={() => setShowGuide(!showGuide)}
                  className="text-xs text-sky-600 hover:text-sky-800 flex items-center gap-1 cursor-pointer"
                >
                  <HelpCircle className="w-3.5 h-3.5" />
                  <span>How to find your Chat ID?</span>
                </button>
              </div>

              {showGuide && (
                <div className="p-3.5 mb-3 bg-sky-50/80 border border-sky-200 rounded-xl text-xs text-sky-950 space-y-2">
                  <div className="font-semibold text-sky-900 flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-sky-600" />
                    <span>3 Quick Steps to Get Your Chat ID:</span>
                  </div>
                  <ol className="list-decimal list-inside space-y-1 text-sky-900/90 text-[11px]">
                    <li>Open Telegram and search for the helper bot <b>@userinfobot</b></li>
                    <li>Press <b>Start</b> — the bot will reply with your numeric <b>Id (e.g. 987654321)</b></li>
                    <li>Copy that number and paste it into the field below!</li>
                  </ol>
                  <div className="pt-1 text-[11px] text-sky-700">
                    💡 <i>Also send <b>/start</b> to our teaching bot <a href={botLink} target="_blank" rel="noreferrer" className="underline font-bold">@{botUsername}</a> so it can message you!</i>
                  </div>
                </div>
              )}

              <div className="flex gap-2">
                <input
                  type="text"
                  value={chatIdInput}
                  onChange={(e) => setChatIdInput(e.target.value)}
                  placeholder="e.g. 123456789"
                  className="flex-1 px-3.5 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent transition-all font-mono"
                />
                <button
                  type="button"
                  onClick={async () => {
                    setTestResult(null);
                    try {
                      const res = await fetch('/api/telegram/detect-chat-id');
                      const data = await res.json();
                      if (data.found && data.chatId) {
                        setChatIdInput(data.chatId);
                        setTestResult({
                          ok: true,
                          message: `Auto-detected Chat ID ${data.chatId} (${data.firstName || data.username || 'User'})! Click "Save Profile" to keep it.`,
                        });
                      } else {
                        setTestResult({
                          ok: false,
                          message: data.message || 'No messages received yet. Please open @BulgarianLanguagelearning_Bot in Telegram, send /start, and try again!',
                        });
                      }
                    } catch (err: any) {
                      setTestResult({ ok: false, message: 'Detection error: ' + err.message });
                    }
                  }}
                  className="px-3 py-2 bg-sky-50 hover:bg-sky-100 text-sky-700 border border-sky-200 rounded-xl text-xs font-semibold whitespace-nowrap cursor-pointer transition-colors"
                  title="Auto-detect chat ID after you message the bot"
                >
                  Auto-Detect ID
                </button>
              </div>
              <p className="text-[11px] text-slate-400 mt-1">
                Open <a href={botLink} target="_blank" rel="noreferrer" className="text-sky-600 underline font-medium">@{botUsername}</a> on Telegram, tap Start, then click "Auto-Detect ID" or paste your ID.
              </p>
            </div>

            {/* 3-Hour Automation Toggle */}
            <div className="flex items-center justify-between p-3.5 bg-slate-50 rounded-xl border border-slate-200">
              <div className="flex items-center gap-2.5">
                <Clock className="w-4 h-4 text-slate-600 shrink-0" />
                <div>
                  <div className="text-xs font-semibold text-slate-800">
                    Automatic lessons every 3 hours
                  </div>
                  <div className="text-[11px] text-slate-500">
                    Bot generates fresh Bulgarian vocabulary & grammar for your level ({levelInput})
                  </div>
                </div>
              </div>
              <input
                type="checkbox"
                checked={autoLessons}
                onChange={(e) => setAutoLessons(e.target.checked)}
                className="w-4 h-4 text-slate-900 rounded focus:ring-slate-900 cursor-pointer"
              />
            </div>

            {/* Action Buttons */}
            <div className="grid grid-cols-2 gap-2 pt-1">
              <button
                type="button"
                onClick={handleSendTestMessage}
                disabled={isTesting || !chatIdInput}
                className="px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 font-medium text-xs rounded-xl transition-colors flex items-center justify-center gap-1.5 disabled:opacity-50 cursor-pointer"
              >
                {isTesting ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : <Send className="w-3.5 h-3.5 text-sky-600" />}
                <span>Test Connection</span>
              </button>

              <button
                type="button"
                onClick={handleSendTopicNow}
                disabled={isSendingTopic || !chatIdInput}
                className="px-3 py-2 bg-sky-600 hover:bg-sky-500 text-white font-medium text-xs rounded-xl transition-colors flex items-center justify-center gap-1.5 disabled:opacity-50 cursor-pointer shadow-xs"
              >
                {isSendingTopic ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : <BookOpen className="w-3.5 h-3.5" />}
                <span>Send Lesson Now</span>
              </button>
            </div>

            {/* Results Feedback */}
            {testResult && (
              <div className={`p-3 rounded-xl text-xs flex items-center gap-2 ${
                testResult.ok ? 'bg-emerald-50 text-emerald-800 border border-emerald-200' : 'bg-rose-50 text-rose-800 border border-rose-200'
              }`}>
                {testResult.ok ? <CheckCircle className="w-4 h-4 shrink-0 text-emerald-600" /> : <AlertCircle className="w-4 h-4 shrink-0 text-rose-600" />}
                <span>{testResult.message}</span>
              </div>
            )}

            {topicResult && (
              <div className={`p-3 rounded-xl text-xs flex items-center gap-2 ${
                topicResult.ok ? 'bg-emerald-50 text-emerald-800 border border-emerald-200' : 'bg-rose-50 text-rose-800 border border-rose-200'
              }`}>
                {topicResult.ok ? <CheckCircle className="w-4 h-4 shrink-0 text-emerald-600" /> : <AlertCircle className="w-4 h-4 shrink-0 text-rose-600" />}
                <span>{topicResult.message}</span>
              </div>
            )}
          </div>
        </div>

      </div>

      {/* Dispatched Topics History */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-slate-500" />
            <h3 className="text-sm font-bold text-slate-900">
              Telegram Lesson Delivery History
            </h3>
          </div>
          <span className="text-xs text-slate-500">
            {userProfile.history?.length || 0} lessons dispatched
          </span>
        </div>

        {userProfile.history && userProfile.history.length > 0 ? (
          <div className="space-y-2.5 max-h-60 overflow-y-auto pr-1">
            {userProfile.history.map((item, idx) => (
              <div
                key={idx}
                className="p-3 bg-slate-50 hover:bg-slate-100/80 rounded-xl border border-slate-100 transition-colors flex items-start justify-between gap-4"
              >
                <div className="space-y-1">
                  <div className="text-xs font-semibold text-slate-900 flex items-center gap-2">
                    <span>{item.topic}</span>
                    <span className="text-[10px] font-medium text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
                      Delivered
                    </span>
                  </div>
                  <div className="text-[11px] text-slate-500 line-clamp-1">
                    {item.summary}
                  </div>
                </div>
                <div className="text-[11px] text-slate-400 whitespace-nowrap tabular-nums">
                  {new Date(item.sentAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="p-6 text-center text-slate-400 text-xs">
            No lessons sent to Telegram yet. Enter your Chat ID above and tap "Send Lesson Now" or let the 3-hour automated schedule deliver your first lesson!
          </div>
        )}
      </div>

    </div>
  );
};
