# Bulgarian Language Teaching Agent

An interactive, AI-powered web application for learning Bulgarian, offering a personalized, chat-centric experience for all proficiency levels, with an architecture supporting future integration for Telegram-based lessons and reminders.

## User Review & Critical Decisions

> [!IMPORTANT]
> The app will focus on an interactive, chat-based learning model for all proficiency levels. User profile will persist via Firebase to track proficiency and chat history.

-   **Confirmed Decision 1**: Interactive chat-based learning experience.
-   **Confirmed Decision 2**: Target all language proficiency levels.
-   **Open Question 1**: Do you want specific Bulgarian learning topics (e.g., travel, business, daily life) prioritized in the curriculum? (Recommended: Start with daily life, and then allow learners to choose topics).

## 1. Overview & Core Concept

-   **What It Does**: An AI agent acts as a Bulgarian tutor. It conducts lessons via a chat interface, generating text explanations and audio pronunciation/examples.
-   **Target Audience**: Learners of Bulgarian at any level.
-   **Key Value**: Personalized, interactive, and portable language learning.

## 2. User Experience & Visual Design

-   **Key User Flows**:
    1.  User signs in (Google Auth) and sets initial proficiency level.
    2.  User starts a chat session with the AI tutor (text/audio).
    3.  User can request specific topics or grammar explanations.
    4.  User can optionally enter a Telegram Chat ID to receive lessons via a bot.
-   **Visual Identity & Theme**:
    -   *Aesthetic Direction*: Minimal, editorial, distraction-free.
    -   *Color Palette*: Dominant neutral white (`#F8FAFC`), structural slate borders (`#E2E8F0`), and a single primary accent (e.g., a calm cerulean blue for actions).
    -   *Typography*: High-legibility sans-serif pair (e.g., `Plus Jakarta Sans` for titles, `DM Sans` for body).
    -   *Component Styling*: Clean whitespace-defined zones, no pill-badge islands, minimal hairline dividers.

## 3. Key Product Decisions & Trade-Offs

-   **Decision 1**: Server-side Gemini for interaction.
    -   *Chosen Approach*: Use `@google/genai` on an Express server.
    -   *Why*: Security (no API keys in client-side bundles) and full control over AI behavior.
-   **Decision 2**: Persistence with Firestore.
    -   *Chosen Approach*: Store chat history, user settings, and Telegram Chat ID in Firestore.
    -   *Why*: Reliable sync, security, and authentication integration.

## 4. Technical Architecture & Data Strategy

### Architecture Diagram
```
┌─────────────┐   (HTTPS/API)    ┌──────────────┐   (Firebase)    ┌───────────┐
│   Client    │ ◄──────────────► │    Server    │ ◄──────────────► │ Firestore │
│(React/Vite) │                  │ (Express/Gemini)│               └───────────┘
└─────────────┘                  └──────────────┘
```

### Data Model & State
-   **Users Collection**: Stores `userId`, `proficiencyLevel`, `telegramChatId`, `preferences`.
-   **Chats Collection**: Stores `userId`, `messages` (array of `role`, `content`, `timestamp`), `topic`.

### Key Sequences & Integrations
-   **Audio Learning**: Server-side Gemini (`gemini-3.8-flash-lite-tts`) generates audio clips from text responses.
-   **Telegram Integration**: Future turn, using `rpc_action` once API key is provided.
