export type ProficiencyLevel = 'Beginner' | 'Intermediate' | 'Advanced';
export type ActiveTab = 'chat' | 'book' | 'pronunciation' | 'profile' | 'dictionary';

export interface UserProfile {
  id: string;
  username: string;
  password?: string;
  level: ProficiencyLevel;
  telegramChatId?: string;
  autoLessonsEnabled?: boolean;
  lastTelegramSentAt?: number;
  createdAt: number;
  history?: TelegramHistoryItem[];
}

export interface TelegramHistoryItem {
  topic: string;
  summary: string;
  sentAt: number;
  status: 'delivered' | 'failed';
  error?: string;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
  imageUrl?: string;
  audioUrl?: string;
  audioDuration?: number;
  pronunciationAnalysis?: {
    score: number;
    accuracyRating: string;
    phoneticFeedback: string;
    keySoundsToImprove: string[];
    nativeExampleTip: string;
    transcribed: string;
  };
  generatedImage?: string;
}

export interface TelegramBotInfo {
  ok: boolean;
  bot?: {
    id: number;
    is_bot: boolean;
    first_name: string;
    username: string;
    can_join_groups?: boolean;
  } | null;
  tokenConfigured: boolean;
  tokenEnding: string;
}

export interface PronunciationDrill {
  id: string;
  title: string;
  sound: string;
  ipa: string;
  bulgarianPhrase: string;
  transliteration: string;
  englishMeaning: string;
  tip: string;
  difficulty: ProficiencyLevel;
}
