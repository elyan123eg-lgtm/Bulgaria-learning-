import express from 'express';
import { createServer as createViteServer } from 'vite';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';
import { GoogleGenAI } from '@google/genai';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
// Increase body limits for audio recordings and uploaded photos
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

// Telegram Bot Configuration
const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN || '8656359331:AAHRTxikzai9jS6OqrUFIJmc7EmyCV7eG7w';
const TELEGRAM_API_BASE = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}`;

// Initialize Gemini SDK
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY || '',
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    },
  },
});

// Persistent Learners Store for Telegram Scheduling & Simple Auth
const DATA_DIR = path.resolve(__dirname, 'data');
const LEARNERS_FILE = path.join(DATA_DIR, 'learners.json');

interface TelegramHistoryItem {
  topic: string;
  summary: string;
  sentAt: number;
  status: 'delivered' | 'failed';
  error?: string;
}

interface Learner {
  id: string; // username or userId
  username: string;
  password?: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  telegramChatId?: string;
  autoLessonsEnabled: boolean;
  lastTelegramSentAt?: number;
  createdAt: number;
  history?: TelegramHistoryItem[];
}

let learnersMap: Record<string, Learner> = {};

function initDataStore() {
  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
    if (fs.existsSync(LEARNERS_FILE)) {
      const content = fs.readFileSync(LEARNERS_FILE, 'utf-8');
      learnersMap = JSON.parse(content || '{}');
    } else {
      learnersMap = {};
      fs.writeFileSync(LEARNERS_FILE, JSON.stringify(learnersMap, null, 2), 'utf-8');
    }
  } catch (err) {
    console.error('Error initializing data store:', err);
    learnersMap = {};
  }
}

function saveLearners() {
  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
    fs.writeFileSync(LEARNERS_FILE, JSON.stringify(learnersMap, null, 2), 'utf-8');
  } catch (err) {
    console.error('Error saving learners:', err);
  }
}

initDataStore();

// Telegram Bot Helper Functions
async function getTelegramBotInfo() {
  try {
    const res = await fetch(`${TELEGRAM_API_BASE}/getMe`);
    const data = await res.json();
    return data;
  } catch (err) {
    console.error('Failed to query Telegram getMe:', err);
    return { ok: false, error: String(err) };
  }
}

async function sendTelegramMessage(chatId: string, text: string, parseMode: 'HTML' | 'Markdown' = 'HTML') {
  try {
    const res = await fetch(`${TELEGRAM_API_BASE}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: chatId,
        text,
        parse_mode: parseMode,
      }),
    });
    const result = await res.json();
    if (!result.ok && parseMode === 'HTML') {
      // Fallback to plain text if HTML tags failed parsing
      const plainRes = await fetch(`${TELEGRAM_API_BASE}/sendMessage`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          chat_id: chatId,
          text: text.replace(/<[^>]*>?/gm, ''),
        }),
      });
      return await plainRes.json();
    }
    return result;
  } catch (err) {
    console.error('Failed to send Telegram message:', err);
    return { ok: false, error: String(err) };
  }
}

// Generate tailored Bulgarian topic lesson using Gemini, grounded in the 2000 Core Words book
async function generateBulgarianTopicLesson(level: string, customTopic?: string): Promise<{ title: string; htmlMessage: string; summary: string }> {
  try {
    const prompt = `You are "Даскал" (Daskal), an expert Bulgarian language tutor.
Your curriculum is strictly referenced from the textbook: "2000 Core Words and Phrases - Bulgarian" (BulgarianPod101.com).
Create a structured, bite-sized mini-lesson for an English-speaking learner at the ${level || 'Beginner'} level.
Topic context: ${customTopic || 'A core chapter from the 2000 Core Words book (e.g. Chapter 1 Greetings & Basics, Chapter 2 Colors & Daily Objects, Chapter 4 Dining & Food, Chapter 6 Essential Questions, or Chapter 10 National Cuisine & Conversational Phrases)'}.

Requirements:
- Teach 2-3 specific Bulgarian vocabulary words and their authentic sample sentences directly inspired by the 2000 Core Words book.
- All explanations and translations MUST be in ENGLISH.
- Format with Telegram HTML (use <b>, <i>, <code>).
Structure:
1. 🇧🇬 <b>[Chapter / Topic Title in English & Bulgarian]</b>
2. 💡 <b>Core Vocabulary (from 2000 Core Words)</b>:
   • <b>Bulgarian</b> [phonetic-transliteration] - English translation
   • <i>Sample sentence</i>: "Bulgarian sentence" - "English meaning"
3. 💬 <b>Practical Dialogue</b>: A short 2-3 line conversation demonstrating the words.
4. 📚 <b>Grammar / Cultural Insight</b>: Clear tip in English (e.g. Cyrillic spelling, noun gender, Bulgarian nod/shake gesture, traditional food like Shopska salad or Banitsa).
5. 🎯 <b>Quick Practice Quiz</b>: A quick question for the learner to test their knowledge!`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: prompt,
    });

    const fullText = response.text || 'Bulgarian Mini-Lesson';
    
    // Extract title from first line or generate one
    const lines = fullText.split('\n').filter(l => l.trim().length > 0);
    const title = lines[0] ? lines[0].replace(/<[^>]*>?/gm, '').slice(0, 80) : `2000 Core Words Lesson (${level})`;
    
    // Add banner and footer
    const htmlMessage = `🇧🇬 <b>Learn Bulgarian · 2000 Core Words Lesson</b>\n` +
      `<i>Reference: BulgarianPod101 2000 Core Phrases · Level: ${level}</i>\n\n` +
      `${fullText}\n\n` +
      `───────────────\n` +
      `✨ <i>Delivered automatically every 3 hours. Practice pronunciation on your web app!</i>`;

    return {
      title,
      htmlMessage,
      summary: fullText.slice(0, 180) + '...',
    };
  } catch (err) {
    console.error('Error generating Bulgarian lesson:', err);
    return {
      title: 'Урок по български',
      htmlMessage: `🇧🇬 <b>Здравейте!</b>\n\nВреме е за кратък урок по български език!\nДума на деня: <b>Благодаря</b> [bla-go-da-rya] - Thank you!`,
      summary: 'Daily Bulgarian vocabulary',
    };
  }
}

// Automated 3-Hour Topic Scheduler
// Checks periodically and sends new topic to learners who have Telegram Chat ID configured
const THREE_HOURS_MS = 3 * 60 * 60 * 1000;

async function checkAndDispatchScheduledLessons() {
  const now = Date.now();
  const learners = Object.values(learnersMap);

  for (const learner of learners) {
    if (!learner.telegramChatId || learner.autoLessonsEnabled === false) {
      continue;
    }

    const lastSent = learner.lastTelegramSentAt || 0;
    const timeSinceLastSent = now - lastSent;

    if (timeSinceLastSent >= THREE_HOURS_MS) {
      console.log(`[Telegram Scheduler] Dispatching 3-hour lesson for user: ${learner.username} (${learner.telegramChatId})`);
      
      const lesson = await generateBulgarianTopicLesson(learner.level || 'Beginner');
      const result = await sendTelegramMessage(learner.telegramChatId, lesson.htmlMessage, 'HTML');

      learner.lastTelegramSentAt = now;
      if (!learner.history) learner.history = [];
      
      learner.history.unshift({
        topic: lesson.title,
        summary: lesson.summary,
        sentAt: now,
        status: result.ok ? 'delivered' : 'failed',
        error: result.ok ? undefined : result.description || 'Dispatch error',
      });

      // Keep recent 30 entries
      if (learner.history.length > 30) {
        learner.history = learner.history.slice(0, 30);
      }

      saveLearners();
    }
  }
}

// Check every 2 minutes
setInterval(checkAndDispatchScheduledLessons, 2 * 60 * 1000);

// ======================== API ROUTES ========================

// 1. Get Telegram Bot Info & Status
app.get('/api/telegram/bot-info', async (req, res) => {
  const info = await getTelegramBotInfo();
  res.json({
    ok: info.ok,
    bot: info.result || null,
    tokenConfigured: Boolean(TELEGRAM_BOT_TOKEN),
    tokenEnding: TELEGRAM_BOT_TOKEN.slice(-6),
  });
});

// Auto-detect Telegram Chat ID from recent messages/start command sent to the bot
app.get('/api/telegram/detect-chat-id', async (req, res) => {
  try {
    const response = await fetch(`${TELEGRAM_API_BASE}/getUpdates?limit=20`);
    const data = await response.json();
    if (data.ok && Array.isArray(data.result) && data.result.length > 0) {
      // Find the most recent message with a valid chat object
      for (let i = data.result.length - 1; i >= 0; i--) {
        const item = data.result[i];
        const chat = item.message?.chat || item.channel_post?.chat || item.my_chat_member?.chat;
        if (chat && chat.id) {
          const fromUser = item.message?.from;
          return res.json({
            found: true,
            chatId: String(chat.id),
            firstName: fromUser?.first_name || chat.first_name || '',
            username: fromUser?.username || chat.username || '',
            text: item.message?.text || '',
            date: item.message?.date ? item.message.date * 1000 : Date.now(),
          });
        }
      }
    }
    res.json({
      found: false,
      message: 'No incoming messages detected yet. Please open @BulgarianLanguagelearning_Bot in Telegram, press Start or send any message, then click Detect again!',
    });
  } catch (err: any) {
    res.status(500).json({ found: false, error: err.message });
  }
});

// 2. Test send a message to a specific Telegram Chat ID
app.post('/api/telegram/test', async (req, res) => {
  const { chatId, username } = req.body;
  if (!chatId) {
    return res.status(400).json({ error: 'Chat ID is required' });
  }

  const welcomeText = `🎉 <b>Welcome to your Bulgarian Language Tutor!</b>\n\n` +
    `Hello, <b>${username || 'Learner'}</b>! Your Telegram chat is now connected to <i>Learn Bulgarian</i>.\n\n` +
    `⏰ <b>What happens next?</b>\n` +
    `Every 3 hours, our AI bot will automatically send you a new bite-sized Bulgarian topic, vocabulary with phonetics, and dialogue tailored to your level.\n\n` +
    `🇧🇬 <i>Здравей и успех в ученето! (Hello and good luck learning!)</i>`;

  const result = await sendTelegramMessage(String(chatId), welcomeText, 'HTML');
  if (result.ok) {
    res.json({ success: true, result });
  } else {
    res.status(400).json({ success: false, error: result.description || 'Failed to send Telegram message' });
  }
});

// 3. Immediately trigger / send a new topic to Telegram
app.post('/api/telegram/send-topic', async (req, res) => {
  const { chatId, level, topic, username } = req.body;
  if (!chatId) {
    return res.status(400).json({ error: 'Chat ID is required' });
  }

  try {
    const lesson = await generateBulgarianTopicLesson(level || 'Beginner', topic);
    const result = await sendTelegramMessage(String(chatId), lesson.htmlMessage, 'HTML');

    // Update history if user exists
    if (username && learnersMap[username]) {
      const learner = learnersMap[username];
      learner.lastTelegramSentAt = Date.now();
      if (!learner.history) learner.history = [];
      learner.history.unshift({
        topic: lesson.title,
        summary: lesson.summary,
        sentAt: Date.now(),
        status: result.ok ? 'delivered' : 'failed',
        error: result.ok ? undefined : result.description,
      });
      saveLearners();
    }

    if (result.ok) {
      res.json({ success: true, lesson, result });
    } else {
      res.status(400).json({ success: false, error: result.description || 'Telegram rejected message' });
    }
  } catch (err: any) {
    res.status(500).json({ error: err.message || 'Failed to send topic' });
  }
});

// 4. Save or update learner profile
app.post('/api/profile/save', (req, res) => {
  console.log('[API] Profile save request received:', req.body.username);
  const { username, password, level, telegramChatId, autoLessonsEnabled } = req.body;
  if (!username) {
    return res.status(400).json({ error: 'Username is required' });
  }

  const existing = learnersMap[username] || {
    id: username,
    username,
    createdAt: Date.now(),
    history: [],
  };

  learnersMap[username] = {
    ...existing,
    username,
    password: password || existing.password || '',
    level: level || existing.level || 'Beginner',
    telegramChatId: telegramChatId !== undefined ? String(telegramChatId).trim() : existing.telegramChatId,
    autoLessonsEnabled: autoLessonsEnabled !== undefined ? Boolean(autoLessonsEnabled) : (existing.autoLessonsEnabled ?? true),
  };

  saveLearners();
  console.log('[API] Profile saved successfully');
  res.json({ success: true, profile: learnersMap[username] });
});

// 5. Simple profile login / retrieval
app.post('/api/profile/login', (req, res) => {
  const { username, password } = req.body;
  if (!username) {
    return res.status(400).json({ error: 'Username is required' });
  }

  let learner = learnersMap[username];
  if (!learner) {
    // Auto-create on first simple login if not existing
    learner = {
      id: username,
      username,
      password: password || '',
      level: 'Beginner',
      autoLessonsEnabled: true,
      createdAt: Date.now(),
      history: [],
    };
    learnersMap[username] = learner;
    saveLearners();
  } else if (password && learner.password && learner.password !== password) {
    return res.status(401).json({ error: 'Incorrect password for this username' });
  }

  res.json({ success: true, profile: learner });
});

// 6. Get learner profile details & telegram history
app.get('/api/profile/:username', (req, res) => {
  const { username } = req.params;
  const learner = learnersMap[username];
  if (!learner) {
    return res.status(404).json({ error: 'Learner profile not found' });
  }
  res.json({ success: true, profile: learner });
});

// 7. Interactive Multimodal Chat (Text + Image Analysis + Google Search Grounding)
app.post('/api/chat', async (req, res) => {
  const { messages, topic, level, imageBase64, imageMimeType, useSearch } = req.body;
  console.log('[API] Chat request received');

  try {
    const systemInstruction = `You are "Даскал" (Daskal), an exceptionally warm, encouraging, and expert Bulgarian language tutor.
Your core syllabus and vocabulary reference is the book: "The Bulgarian Language in Practice" (Eleonora Ivanova).
The user is learning Bulgarian, and the primary instructional and explanation language is ENGLISH.
The user is at the ${level || 'Beginner'} proficiency level.
Current topic or focus: "${topic || 'General Bulgarian Conversation'}".

Your teaching principles:
1. Ground your lessons and vocabulary in the "The Bulgarian Language in Practice" textbook. When introducing new concepts, cite authentic examples and sample sentences from this textbook.
2. Always explain concepts, grammar rules, and vocabulary in ENGLISH so the learner fully understands.
3. Teach authentic Bulgarian words, sentences, and expressions written in the Bulgarian Cyrillic alphabet.
4. For all Bulgarian words and sentences, ALWAYS provide:
   - Cyrillic Bulgarian (e.g., Здравейте!)
   - English phonetic transcription in brackets, e.g., [zdráv-ey-te]
   - Accurate English translation (e.g., "Hello (formal/plural)")
   - Practical sample sentence in Bulgarian with English translation
5. If the user provides a photo or asks about an image:
   - Identify objects in the photo and teach Bulgarian vocabulary with noun gender and definite articles (e.g. "ябълка (f) [yá-bǎl-ka] - apple, ябълката - the apple").
   - Describe the scene in Bulgarian and English, and ask a conversational question.
6. Correct learner mistakes gently and positively, explaining the reason in English (e.g. noun gender agreement, verb conjugation, or definite article placement).
7. Highlight authentic Bulgarian culture (customs like Martenitsa, Bulgarian holidays, traditional foods like banitsa, shopska salad, tarator, landmarks like Sofia, Plovdiv, Rila Monastery, Black Sea).
8. Keep explanations clear, engaging, and encourage active practice with a short follow-up question or exercise.`;

    // Construct alternating contents for Gemini multi-turn conversation
    const contents: any[] = [];

    // Prior history context (excluding the current latest user message)
    if (Array.isArray(messages) && messages.length > 1) {
      const prior = messages.slice(0, -1).slice(-8);
      for (const m of prior) {
        contents.push({
          role: m.role === 'user' ? 'user' : 'model',
          parts: [{ text: m.content || '' }],
        });
      }
    }

    // Current user prompt with optional image
    const currentParts: any[] = [];
    if (imageBase64) {
      currentParts.push({
        inlineData: {
          mimeType: imageMimeType || 'image/jpeg',
          data: imageBase64.replace(/^data:image\/[a-zA-Z]+;base64,/, ''),
        },
      });
      currentParts.push({
        text: 'Please examine this image and teach me Bulgarian vocabulary, phrases, and cultural details related to what is shown. Explain in English and Bulgarian.',
      });
    }

    const lastUserMsg = messages && messages.length > 0 
      ? messages[messages.length - 1].content 
      : 'Hello! Teach me something useful in Bulgarian today.';

    currentParts.push({
      text: lastUserMsg || 'Teach me something useful in Bulgarian today!',
    });

    contents.push({
      role: 'user',
      parts: currentParts,
    });

    const config: any = {
      systemInstruction,
    };

    // Google Search Grounding for open sources
    if (useSearch !== false) {
      config.tools = [{ googleSearch: {} }];
    }

    console.log('[API] Calling Gemini API');
    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents,
      config,
    });
    console.log('[API] Gemini API response received');

    res.json({
      message: response.text || 'Здравейте! Готов съм да учим български.',
      searchGroundingUsed: Boolean(useSearch !== false),
    });
  } catch (error: any) {
    console.error('Chat generation error:', error);
    res.status(500).json({ error: error.message || 'Failed to generate Bulgarian tutor response' });
  }
});

// 8. Pronunciation Check & Voice Message Analysis
app.post('/api/pronunciation-check', async (req, res) => {
  const { audioBase64, mimeType, targetText, level } = req.body;

  if (!audioBase64) {
    return res.status(400).json({ error: 'Audio data is required' });
  }

  try {
    const cleanAudio = audioBase64.replace(/^data:audio\/[a-zA-Z0-9]+;base64,/, '');

    const prompt = `You are an expert Bulgarian speech and phonetics coach.
The learner recorded a voice message in Bulgarian.
Target phrase or expected speech: "${targetText || 'General Bulgarian speech'}".
Learner level: ${level || 'Beginner'}.

Analyze the user's spoken audio:
1. Transcribe exactly what was spoken in Bulgarian Cyrillic.
2. Evaluate their pronunciation accuracy, intonation, and stress (ударение).
3. Pay special attention to specific Bulgarian sounds:
   - The unique Bulgarian vowel 'Ъ' [uh] (as in България, път, зъб)
   - Soft consonants (e.g. 'л' vs 'ль', 'ня', 'дя')
   - Letter 'Щ' [sht]
   - Word stress placement
4. Score the pronunciation from 0 to 100.
5. Provide helpful, encouraging phonetic advice.

Respond ONLY with a JSON object conforming to this schema:
{
  "score": number, // 0 to 100
  "transcribed": string, // What the user said in Cyrillic
  "accuracyRating": "Excellent" | "Very Good" | "Good Start" | "Needs Practice",
  "phoneticFeedback": string, // 2-3 sentences of constructive feedback in English with Bulgarian terms
  "keySoundsToImprove": string[], // List of 1-3 specific phonemes or words to focus on
  "nativeExampleTip": string // A clear tip in English on mouth/tongue position or word stress
}`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: {
        parts: [
          {
            inlineData: {
              mimeType: mimeType || 'audio/webm',
              data: cleanAudio,
            },
          },
          { text: prompt },
        ],
      },
      config: {
        responseMimeType: 'application/json',
      },
    });

    const parsed = JSON.parse(response.text || '{}');
    res.json({
      success: true,
      analysis: parsed,
    });
  } catch (error: any) {
    console.error('Pronunciation check error:', error);
    res.status(500).json({
      error: error.message || 'Failed to analyze pronunciation audio',
      fallback: {
        score: 85,
        transcribed: targetText || 'Българска реч',
        accuracyRating: 'Very Good',
        phoneticFeedback: 'Good effort! Pay close attention to the Bulgarian vowel "ъ" and word stress (ударение).',
        keySoundsToImprove: ['The vowel "Ъ"', 'Word stress (ударение)'],
        nativeExampleTip: 'Keep your lips relaxed and unrounded, producing the sound firmly from the mid-back of your mouth.',
      },
    });
  }
});

// 9. Text-to-Speech (TTS) for Authentic Native Bulgarian Pronunciation
app.post('/api/tts', async (req, res) => {
  const { text } = req.body;
  if (!text) {
    return res.status(400).json({ error: 'Text is required for TTS' });
  }

  try {
    // Clean text of markdown/HTML before speaking
    const cleanText = text
      .replace(/<[^>]*>?/gm, '')
      .replace(/\[.*?\]/g, '') // remove phonetic brackets so TTS speaks the Bulgarian word
      .slice(0, 300);

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash-lite-tts',
      contents: [
        {
          role: 'user',
          parts: [
            {
              text: cleanText,
              speechMetadata: {
                style: 'Clear, warm, native Bulgarian pronunciation, gentle pedagogical pace',
              },
            },
          ],
        },
      ],
      config: {
        responseModalities: ['AUDIO'],
        speechConfig: {
          voiceConfig: {
            prebuiltVoiceConfig: { voiceName: 'Kore' }, // 'Puck', 'Charon', 'Kore', 'Fenrir', 'Zephyr'
          },
        },
      },
    });

    const base64Audio = response.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;
    if (base64Audio) {
      res.json({
        success: true,
        audioDataUrl: `data:audio/wav;base64,${base64Audio}`,
      });
    } else {
      res.status(500).json({ error: 'No audio returned from TTS model' });
    }
  } catch (error: any) {
    console.error('TTS generation error:', error);
    res.status(500).json({ error: error.message || 'TTS generation failed' });
  }
});

// 10. Generate Visual Flashcard / Illustrative Image for Bulgarian vocabulary
app.post('/api/generate-image', async (req, res) => {
  const { prompt } = req.body;
  if (!prompt) {
    return res.status(400).json({ error: 'Prompt is required' });
  }

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3.1-flash-lite-image',
      contents: {
        parts: [
          {
            text: `High quality, clean educational illustration depicting: ${prompt}. Authentic Bulgarian cultural atmosphere, vivid colors, warm lighting, textbook aesthetic.`,
          },
        ],
      },
      config: {
        imageConfig: {
          aspectRatio: '4:3',
        },
      },
    });

    let imageUrl: string | null = null;
    if (response.candidates?.[0]?.content?.parts) {
      for (const part of response.candidates[0].content.parts) {
        if (part.inlineData?.data) {
          imageUrl = `data:${part.inlineData.mimeType || 'image/png'};base64,${part.inlineData.data}`;
          break;
        }
      }
    }

    if (imageUrl) {
      res.json({ success: true, imageUrl });
    } else {
      res.status(500).json({ error: 'No image generated' });
    }
  } catch (error: any) {
    console.error('Image generation error:', error);
    res.status(500).json({ error: error.message || 'Image generation failed' });
  }
});

// Vite Server Integration for Dev & Static Production Serving
async function startServer() {
  const isProd = process.env.NODE_ENV === 'production';

  if (!isProd) {
    const vite = await createViteServer({
      server: {
        middlewareMode: true,
        hmr: process.env.DISABLE_HMR !== 'true',
        watch: process.env.DISABLE_HMR === 'true' ? null : {},
      },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.resolve(__dirname, 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`🇧🇬 Bulgarian Teaching Agent & Telegram Server listening on http://0.0.0.0:${PORT}`);
    console.log(`🤖 Telegram Bot Token: ${TELEGRAM_BOT_TOKEN ? 'Configured' : 'Missing'}`);
  });
}

startServer();
