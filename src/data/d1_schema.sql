-- ==========================================================
-- Cloudflare D1 Database Schema for Bulgarian Language App
-- Database name: bulgarialearning
-- Run in terminal: npx wrangler d1 execute bulgarialearning --file=./src/data/d1_schema.sql
-- ==========================================================

-- 1. Table for Textbook Lessons (The Bulgarian Language in Practice)
CREATE TABLE IF NOT EXISTS lessons (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  lesson_number INTEGER NOT NULL UNIQUE,
  title_bg TEXT NOT NULL,
  title_en TEXT NOT NULL,
  level TEXT NOT NULL, -- Beginner, Intermediate, Advanced
  grammar_focus TEXT,
  dialogue_title TEXT,
  dialogue_json TEXT, -- JSON array of dialogue lines
  vocabulary_json TEXT, -- JSON array of vocabulary items
  cultural_notes TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 2. Table for Searchable Dictionary
CREATE TABLE IF NOT EXISTS dictionary (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  bg TEXT NOT NULL,
  en TEXT NOT NULL,
  part_of_speech TEXT NOT NULL,
  category TEXT NOT NULL,
  sample_bg TEXT,
  sample_en TEXT
);

-- 3. Table for Learners / User Profiles
CREATE TABLE IF NOT EXISTS learners (
  id TEXT PRIMARY KEY,
  username TEXT NOT NULL UNIQUE,
  password_hash TEXT,
  level TEXT DEFAULT 'Beginner',
  telegram_chat_id TEXT,
  auto_lessons_enabled INTEGER DEFAULT 1,
  last_telegram_sent_at INTEGER,
  created_at INTEGER
);

-- 4. Table for Dispatched Telegram Lessons
CREATE TABLE IF NOT EXISTS telegram_logs (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  username TEXT NOT NULL,
  chat_id TEXT NOT NULL,
  topic TEXT NOT NULL,
  summary TEXT,
  status TEXT DEFAULT 'delivered',
  error_message TEXT,
  sent_at INTEGER
);

-- ==========================================================
-- Initial Seeds from 'The Bulgarian Language in Practice'
-- ==========================================================

INSERT OR IGNORE INTO lessons (lesson_number, title_bg, title_en, level, grammar_focus, dialogue_title)
VALUES
(1, 'Среща и Запознаване', 'Meeting & Introductions', 'Beginner', 'Лични местоимения, Глаголът "съм", Звателна форма', 'Среща на улицата'),
(2, 'Представяне и Род', 'Introductions & Gender', 'Beginner', 'Род на съществителните, Наставка -ка, Определителен член', 'Кой кой е?'),
(3, 'Семеен албум', 'Family Album', 'Beginner', 'Глаголът "имам", Безличен глагол "има/няма", Притежателно местоимение "мой"', 'Семейна снимка'),
(4, 'Дневна програма', 'Daily Routine & Numbers', 'Beginner', 'Числата 1-20, Дните на седмицата, Удвояване със/във', 'Програмата на Димитър'),
(5, 'Нашият дом', 'Our Home & Directions', 'Beginner', 'Среден род, Посоки на света, Чий/чия/чие/чии', 'Къщата на Ваня Павлова'),
(14, 'На път и Градски транспорт', 'Transport & Verbal Aspect', 'Intermediate', 'Вид на глагола: свършен/несвършен, Винителни местоимения', 'Фред и Здравка пътуват из София'),
(19, 'На ресторант', 'At the Restaurant', 'Intermediate', 'Учтив речник, Български традиционни гозби', 'Вечеря в бистро Бохем'),
(20, 'Болен съм', 'At the Doctor', 'Advanced', 'Боли ме/болят ме, Части на тялото, Минало време на "съм"', 'В кабинета на лекаря'),
(22, 'Юбилей и Баба Марта', 'Celebrations & Baba Marta', 'Advanced', 'Традиция на мартениците, Пожелания и поздравления', 'Баба Марта и мартениците');

INSERT OR IGNORE INTO dictionary (bg, en, part_of_speech, category, sample_bg, sample_en)
VALUES
('здравей / здравейте', 'hello (informal / formal)', 'expression', 'Greetings', 'Здравейте, как сте?', 'Hello, how are you?'),
('благодаря', 'thank you', 'expression', 'Greetings', 'Благодаря, много добре.', 'Thank you, very well.'),
('добър ден', 'good afternoon', 'expression', 'Greetings', 'Добър ден, господин Петров!', 'Good afternoon, Mr. Petrov!'),
('довиждане', 'goodbye', 'expression', 'Greetings', 'Довиждане, до скоро!', 'Goodbye, see you soon!'),
('шопска салата', 'Shopska salad (traditional)', 'noun (f)', 'Food & Drinks', 'Поръчвам една шопска салата.', 'I order one Shopska salad.'),
('таратор', 'cold cucumber yogurt soup', 'noun (m)', 'Food & Drinks', 'През лятото обичам студен таратор.', 'In summer I love cold tarator.'),
('баница', 'filo pastry with white cheese', 'noun (f)', 'Food & Drinks', 'Баба прави топла баница.', 'Grandmother makes warm banitsa.'),
('ракия', 'traditional fruit brandy', 'noun (f)', 'Food & Drinks', 'Мускатовата ракия се пие със салата.', 'Muscat rakia is drunk with salad.'),
('хляб', 'bread', 'noun (m)', 'Food & Drinks', 'Топъл бял хляб.', 'Warm white bread.'),
('сирене', 'white brine cheese', 'noun (n)', 'Food & Drinks', 'Българското сирене е вкусно.', 'Bulgarian sirene is delicious.'),
('метро', 'subway, metro', 'noun (n)', 'Travel & City', 'Софийското метро е бързо.', 'Sofia subway is fast.'),
('билет', 'ticket', 'noun (m)', 'Travel & City', 'Трябва да перфорираш билета.', 'You must validate the ticket.'),
('такси', 'taxi', 'noun (n)', 'Travel & City', 'Как да си поръчаме такси?', 'How to order a taxi?'),
('мартеница', 'red-and-white yarn charm', 'noun (f)', 'Home & Family', 'Честита Баба Марта!', 'Happy Baba Marta!'),
('урок', 'lesson', 'noun (m)', 'Grammar & Numbers', 'Урок номер едно.', 'Lesson number one.'),
('лекар / лекарка', 'doctor (m / f)', 'noun (m)', 'Health & Body', 'Д-р Георгиева е лекарка.', 'Dr. Georgieva is a doctor.');
