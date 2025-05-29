# Prime Academy – API Integration Guide

This document outlines how to leverage all mentioned APIs within the Prime Academy full-stack boilerplate, ensuring advanced, automated, and scalable features for students, faculty, and admins.

---

## 1. API Integration Map

| Feature/Module                 | API(s) Used                                                                    | Purpose/Usage                                                                                      |
|------------------------------- |-------------------------------------------------------------------------------|----------------------------------------------------------------------------------------------------|
| AI Summaries/Notes/Quiz        | OpenAI GPT API                                                                 | Auto-generate notes, flashcards, explanations, and quizzes from course content                     |
| Book Search/Embedding          | Google Books API, Open Library API                                             | Search, preview, and embed academic books/resources                                                |
| Quiz Generation                | OpenAI GPT API, Internal Question Bank DB                                      | Turn notes/lectures into MCQs and short-answer quizzes                                             |
| Video Content                  | YouTube Data API v3                                                            | Fetch and embed educational videos by topic/unit                                                   |
| Document Viewer                | PDF.js, Google Drive Embed API                                                 | Display course PDFs directly in-browser                                                            |
| General Chatbot                | OpenAI GPT API                                                                 | General and contextual conversational assistant                                                    |
| Custom Knowledge Chatbot       | Pinecone + OpenAI or LangChain                                                 | Index internal FAQs, docs for targeted Q&A                                                         |
| Voice Assistant                | Speechly API, Google Speech-to-Text API                                        | Enable voice input/output for chatbots and accessibility                                           |
| WhatsApp Integration           | Twilio API, 360dialog                                                          | Chatbot and notification delivery via WhatsApp                                                     |
| Job Integration                | RapidAPI (LinkedIn/Indeed), BrighterMonday API, Fuzu Job Board                 | Real-time dynamic jobs/internships board                                                           |
| Resume Builder                 | Rezi.ai API, Novoresume API                                                    | AI-powered, job-specific resume/CV generation                                                      |
| Coding Sandbox                 | Judge0 API                                                                     | In-browser code execution and sharing for IT/Engineering modules                                   |
| Plagiarism Checker             | Turnitin API or PlagiarismCheck.org                                            | Assignment and research originality verification                                                   |
| Payments                       | Stripe API, PayPal API, Mobile Money APIs                                      | Tuition, subscriptions, and installment processing                                                 |
| Notifications                  | Twilio (SMS), Firebase Cloud Messaging, Email Providers                        | Push/email/SMS announcements, reminders                                                            |
| Analytics                      | Google Analytics API, Custom Metrics API                                       | Track engagement, usage, and trends for admin/faculty                                              |
| Universal Search               | ElasticSearch, MongoDB Atlas Search                                            | Cross-platform search for courses, staff, documents, news, etc.                                    |

---

## 2. Server-Side Integration Example (Express)

```javascript
// server/routes/ai.js
const express = require('express');
const axios = require('axios');
const router = express.Router();

// AI-generated notes with OpenAI
router.post('/notes', async (req, res) => {
  const { text, topic } = req.body;
  const openaiRes = await axios.post(
    'https://api.openai.com/v1/chat/completions',
    {
      model: 'gpt-4',
      messages: [
        { role: 'system', content: `Summarize the following for a student: ${topic}` },
        { role: 'user', content: text }
      ]
    },
    { headers: { 'Authorization': `Bearer ${process.env.OPENAI_API_KEY}` } }
  );
  res.json({ summary: openaiRes.data.choices[0].message.content });
});

// Quiz generation
router.post('/quiz', async (req, res) => {
  const { notes } = req.body;
  const openaiRes = await axios.post(
    'https://api.openai.com/v1/chat/completions',
    {
      model: 'gpt-4',
      messages: [
        { role: 'system', content: 'Create 5 MCQ questions from these notes.' },
        { role: 'user', content: notes }
      ]
    },
    { headers: { 'Authorization': `Bearer ${process.env.OPENAI_API_KEY}` } }
  );
  res.json({ quiz: openaiRes.data.choices[0].message.content });
});

module.exports = router;
```

```javascript
// server/routes/resources.js
const express = require('express');
const axios = require('axios');
const router = express.Router();

// Book search using Google Books API
router.get('/books', async (req, res) => {
  const { q } = req.query;
  const booksRes = await axios.get(
    `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(q)}&key=${process.env.GOOGLE_BOOKS_API_KEY}`
  );
  res.json(booksRes.data.items);
});

// YouTube video search
router.get('/videos', async (req, res) => {
  const { topic } = req.query;
  const ytRes = await axios.get(
    `https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&q=${encodeURIComponent(topic)}&key=${process.env.YOUTUBE_API_KEY}`
  );
  res.json(ytRes.data.items);
});

module.exports = router;
```

---

## 3. Frontend Integration Example (React)

```javascript
// client/src/api/resources.js
import axios from 'axios';

export const getNotes = async (text, topic) =>
  (await axios.post('/api/ai/notes', { text, topic })).data.summary;

export const getQuiz = async notes =>
  (await axios.post('/api/ai/quiz', { notes })).data.quiz;

export const searchBooks = async query =>
  (await axios.get('/api/resources/books', { params: { q: query } })).data;

export const searchVideos = async topic =>
  (await axios.get('/api/resources/videos', { params: { topic } })).data;
```

```javascript
// client/src/components/ResourceCenter.jsx
import React, { useState } from 'react';
import { getNotes, getQuiz, searchBooks, searchVideos } from '../api/resources';

const ResourceCenter = () => {
  const [input, setInput] = useState('');
  const [notes, setNotes] = useState('');
  const [quiz, setQuiz] = useState('');
  const [books, setBooks] = useState([]);
  const [videos, setVideos] = useState([]);

  const handleSummarize = async () => setNotes(await getNotes(input, 'Biology'));
  const handleQuiz = async () => setQuiz(await getQuiz(notes));
  const handleBooks = async () => setBooks(await searchBooks('Biology'));
  const handleVideos = async () => setVideos(await searchVideos('Biology'));

  // Render UI with notes, quiz, books, videos...
};
```

---

## 4. Sample: Coding Sandbox Integration (Judge0)

```javascript
// client/src/api/code.js
import axios from 'axios';
export const runCode = async (source_code, language_id) =>
  (await axios.post('https://judge0-ce.p.rapidapi.com/submissions', {
    source_code, language_id
  }, {
    headers: {
      'X-RapidAPI-Key': import.meta.env.VITE_JUDGE0_KEY,
      'X-RapidAPI-Host': 'judge0-ce.p.rapidapi.com'
    }
  })).data;
```

---

## 5. Sample: WhatsApp Chatbot via Twilio

- Webhook in `/server/routes/webhook.js` listens for WhatsApp messages.
- Use Twilio API to send/receive messages, then forward to OpenAI for processing.

---

## 6. Sample: Job Board Integration

```javascript
// server/routes/jobs.js
const express = require('express');
const axios = require('axios');
const router = express.Router();

router.get('/external', async (req, res) => {
  // Example: fetch from BrighterMonday API or RapidAPI job feed
  const jobsRes = await axios.get('https://api.brightermonday.co.ug/v1/jobs/?q=developer');
  res.json(jobsRes.data.results);
});

module.exports = router;
```

---

## 7. Sample: Resume Builder Integration

- Frontend calls `/api/resume/build` endpoint.
- Backend POSTs to Rezi.ai/Novoresume API with user data and returns generated resume.

---

## 8. Secure Storage & Env Variables

- Store all API keys in `.env` and never commit this file!
- Use server-side proxy endpoints to keep API keys hidden from frontend.

```env
OPENAI_API_KEY=sk-...
GOOGLE_BOOKS_API_KEY=...
YOUTUBE_API_KEY=...
JUDGE0_KEY=...
TWILIO_AUTH_TOKEN=...
REZI_API_KEY=...
MONGO_URI=...
```

---

## 9. Additional API Integrations

- **Plagiarism/Turnitin:** Upload documents via backend, receive originality reports.
- **Payment/Stripe:** Handle checkout/payment endpoints on backend, update user status in DB.
- **Speech-to-Text (Voice Bot):** Use Speechly/Google API in frontend for voice input, send to chat endpoint.
- **ElasticSearch/Atlas Search:** Index courses, books, events, users for universal search API.

---

## 10. Modular Expansion

- Each API-driven feature is a separate route/controller/module for maintainability and scaling.
- Add more integrations as needed for new features or faculties.

---

**This integration approach ensures Prime Academy is future-proof, highly automated, and delivers a world-class, AI-powered educational experience.**