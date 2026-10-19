import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { ChatTab } from './components/ChatTab';
import { PronunciationLab } from './components/PronunciationLab';
import { ProfileTelegramTab } from './components/ProfileTelegramTab';
import { ProficiencyLevel, UserProfile, TelegramBotInfo } from './types';
import { db } from './firebase';
import { doc, getDocFromServer } from 'firebase/firestore';

export default function App() {
  const [activeTab, setActiveTab] = useState<'chat' | 'pronunciation' | 'profile'>('chat');
  
  // Persistent user profile
  const [userProfile, setUserProfile] = useState<UserProfile>(() => {
    try {
      const saved = localStorage.getItem('bg_learner_profile');
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      // ignore
    }
    return {
      id: 'learner',
      username: 'learner',
      level: 'Beginner',
      autoLessonsEnabled: true,
      createdAt: Date.now(),
      history: [],
    };
  });

  const [botInfo, setBotInfo] = useState<TelegramBotInfo | null>(null);

  // Fetch bot info from server
  const fetchBotInfo = async () => {
    try {
      const res = await fetch('/api/telegram/bot-info');
      const data = await res.json();
      setBotInfo(data);
    } catch (err) {
      console.error('Error querying bot info:', err);
    }
  };

  // Test Firestore connection on boot (Firebase guideline)
  useEffect(() => {
    async function testFirestoreConnection() {
      try {
        await getDocFromServer(doc(db, 'test', 'connection'));
      } catch (error) {
        if (error instanceof Error && error.message.includes('the client is offline')) {
          console.warn('Firestore offline check note.');
        }
      }
    }
    testFirestoreConnection();
    fetchBotInfo();
  }, []);

  // Sync profile to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('bg_learner_profile', JSON.stringify(userProfile));
    } catch (e) {
      // ignore
    }
  }, [userProfile]);

  const handleSetLevel = (newLevel: ProficiencyLevel) => {
    setUserProfile((prev) => {
      const updated = { ...prev, level: newLevel };
      // Also update on server
      fetch('/api/profile/save', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username: prev.username,
          level: newLevel,
          telegramChatId: prev.telegramChatId,
          autoLessonsEnabled: prev.autoLessonsEnabled,
        }),
      }).catch(console.error);
      return updated;
    });
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 font-sans selection:bg-rose-500 selection:text-white">
      {/* 3-Zone Navigation Header */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        level={userProfile.level}
        setLevel={handleSetLevel}
        username={userProfile.username}
        telegramConfigured={Boolean(userProfile.telegramChatId)}
        botInfo={botInfo}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        {activeTab === 'chat' && (
          <ChatTab level={userProfile.level} username={userProfile.username} />
        )}

        {activeTab === 'pronunciation' && (
          <PronunciationLab level={userProfile.level} />
        )}

        {activeTab === 'profile' && (
          <ProfileTelegramTab
            userProfile={userProfile}
            setUserProfile={setUserProfile}
            botInfo={botInfo}
            onRefreshBotInfo={fetchBotInfo}
          />
        )}
      </main>

      {/* Subtle Footer */}
      <footer className="border-t border-slate-200 bg-white py-4 px-4 text-center text-xs text-slate-500">
        <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
          <span>🇧🇬 <b>Учи Български</b> · AI преподавател и Telegram бот на всеки 3 часа</span>
          <span className="text-[11px] text-slate-400">
            Ниво: <span className="font-semibold text-slate-600">{userProfile.level}</span> · Токен на бота: <span className="font-mono text-slate-600">865635...7eG7w</span>
          </span>
        </div>
      </footer>
    </div>
  );
}
