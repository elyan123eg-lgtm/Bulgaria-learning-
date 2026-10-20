import React from 'react';
import { MessageSquare, BookOpen, Mic, User, Send } from 'lucide-react';
import { ProficiencyLevel, TelegramBotInfo, ActiveTab } from '../types';

interface NavbarProps {
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  level: ProficiencyLevel;
  setLevel: (level: ProficiencyLevel) => void;
  username: string;
  telegramConfigured: boolean;
  botInfo: TelegramBotInfo | null;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  level,
  setLevel,
  username,
  telegramConfigured,
  botInfo,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">
          
          {/* Zone 1: Single text element wordmark */}
          <div className="flex items-center gap-3 shrink-0">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-emerald-600 via-rose-600 to-slate-900 flex items-center justify-center text-white shadow-sm font-bold text-sm">
              BG
            </div>
            <div className="flex flex-col">
              <span className="text-base font-bold text-slate-900 tracking-tight whitespace-nowrap">
                Learn Bulgarian
              </span>
              <span className="text-[11px] text-slate-500 font-medium">
                AI Tutor & Telegram Companion
              </span>
            </div>
          </div>

          {/* Zone 2: Navigation Links (Clean single-line tabs in English) */}
          <nav className="flex items-center gap-1 sm:gap-2">
            <button
              onClick={() => setActiveTab('chat')}
              className={`flex items-center gap-2 px-3 py-2 text-xs sm:text-sm font-medium rounded-lg transition-colors whitespace-nowrap cursor-pointer ${
                activeTab === 'chat'
                  ? 'bg-slate-900 text-white shadow-sm'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <MessageSquare className="w-4 h-4 shrink-0 text-emerald-500" />
              <span>AI Tutor Chat</span>
            </button>

            <button
              onClick={() => setActiveTab('book')}
              className={`flex items-center gap-2 px-3 py-2 text-xs sm:text-sm font-medium rounded-lg transition-colors whitespace-nowrap cursor-pointer ${
                activeTab === 'book'
                  ? 'bg-slate-900 text-white shadow-sm'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <BookOpen className="w-4 h-4 shrink-0 text-sky-500" />
              <span>2 Books & 25 Lessons</span>
            </button>

             <button
              onClick={() => setActiveTab('pronunciation')}
              className={`flex items-center gap-2 px-3 py-2 text-xs sm:text-sm font-medium rounded-lg transition-colors whitespace-nowrap cursor-pointer ${
                activeTab === 'pronunciation'
                  ? 'bg-slate-900 text-white shadow-sm'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <Mic className="w-4 h-4 shrink-0 text-rose-500" />
              <span>Pronunciation Lab</span>
            </button>
            <button
              onClick={() => setActiveTab('dictionary')}
              className={`flex items-center gap-2 px-3 py-2 text-xs sm:text-sm font-medium rounded-lg transition-colors whitespace-nowrap cursor-pointer ${
                activeTab === 'dictionary'
                  ? 'bg-slate-900 text-white shadow-sm'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <BookOpen className="w-4 h-4 shrink-0 text-sky-600" />
              <span>Dictionary</span>
            </button>

            <button
              onClick={() => setActiveTab('profile')}
              className={`flex items-center gap-2 px-3 py-2 text-xs sm:text-sm font-medium rounded-lg transition-colors whitespace-nowrap relative cursor-pointer ${
                activeTab === 'profile'
                  ? 'bg-slate-900 text-white shadow-sm'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <User className="w-4 h-4 shrink-0" />
              <span>Profile & Telegram</span>
              {telegramConfigured && (
                <span className="w-2 h-2 rounded-full bg-emerald-500 ring-2 ring-white"></span>
              )}
            </button>
          </nav>

          {/* Zone 3: Level Selector & Status Indicator */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            {/* Level Selector */}
            <div className="hidden sm:flex items-center gap-1.5 bg-slate-100 p-1 rounded-lg border border-slate-200">
              <span className="text-[11px] font-semibold text-slate-500 px-2 uppercase tracking-wider">Level:</span>
              {(['Beginner', 'Intermediate', 'Advanced'] as ProficiencyLevel[]).map((lvl) => (
                <button
                  key={lvl}
                  onClick={() => setLevel(lvl)}
                  className={`px-2.5 py-1 text-xs font-semibold rounded-md transition-all whitespace-nowrap cursor-pointer ${
                    level === lvl
                      ? 'bg-white text-slate-900 shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {lvl === 'Beginner' ? 'A1-A2' : lvl === 'Intermediate' ? 'B1-B2' : 'C1-C2'}
                </button>
              ))}
            </div>

            {/* Telegram Indicator */}
            <button
              onClick={() => setActiveTab('profile')}
              className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium border transition-colors cursor-pointer ${
                telegramConfigured
                  ? 'bg-emerald-50 text-emerald-800 border-emerald-200 hover:bg-emerald-100'
                  : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
              }`}
              title={telegramConfigured ? 'Telegram Bot Active (Every 3h)' : 'Configure Telegram in Profile'}
            >
              <Send className="w-3.5 h-3.5 text-sky-500" />
              <span className="hidden md:inline">
                {telegramConfigured ? '3h Bot Active' : 'Setup Bot'}
              </span>
            </button>
          </div>

        </div>
      </div>
    </header>
  );
};
