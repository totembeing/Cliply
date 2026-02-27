# Cliply — MVP Blueprint

> An AI-powered automation tool for content creators that tracks Instagram trends, analyzes raw video clips, and auto-generates reels.

---

## 🎯 Project Overview

**What it does:** Cliply monitors trending Instagram content, analyzes what's going viral, and uses raw video clips uploaded by the user to auto-edit reels that match trending formats — including clipping, music, captions, and transitions.

**Who it's for:** Content creators and social media entrepreneurs looking to fast-track content creation.

**Platform:** Web app first (Next.js), iOS later.

---

## 🧩 Tech Stack

| Layer            | Technology                          | Purpose                                      |
| ---------------- | ----------------------------------- | -------------------------------------------- |
| Frontend         | Next.js + React + Tailwind CSS      | Web UI, mobile-responsive, easy iOS pivot    |
| Backend API      | Python (FastAPI)                    | AI/ML ecosystem, video processing, scraping  |
| Database         | PostgreSQL (via Supabase)           | User data, saved reels, drafts               |
| Auth             | Supabase Auth                       | Google OAuth + Phone OTP verification        |
| File Storage     | AWS S3 or Supabase Storage          | User-uploaded clips & generated videos       |
| Trend Scraping   | Apify (Instagram Scraper) / RapidAPI| Pulls trending reels/hashtags/audio          |
| AI Analysis      | OpenAI GPT-4o                       | Trend categorization + clip matching         |
| Video Processing | FFmpeg                              | Trim, cut, transitions, music, export        |
| Captions         | OpenAI Whisper                      | Auto-generate subtitles from audio           |
| Music            | Pixabay Audio API (royalty-free)    | Add trending-style music legally             |
| Payments         | Stripe                              | Subscription management + free trial tracking|
| Hosting          | Vercel (frontend) + Railway (backend)| Simple, scalable, cheap for MVP             |

---

## 🏗️ System Architecture

```
┌─────────────────────────────────────────────────────┐
│                   FRONTEND (Web)                     │
│               Next.js + React + Tailwind             │
│                                                      │
│  ┌──────────┐ ┌──────────────┐ ┌──────────────────┐ │
│  │  Auth     │ │ Inspiration  │ │  Video Editor/   │ │
│  │  Flow     │ │ Feed (Trends)│ │  Upload Studio   │ │
│  └──────────┘ └──────────────┘ └──────────────────┘ │
└──────────────────────┬──────────────────────────────┘
                       │ API Calls
                       ▼
┌─────────────────────────────────────────────────────┐
│                   BACKEND (API)                      │
│              Python (FastAPI)                         │
│                                                      │
│  ┌──────────┐ ┌──────────────┐ ┌──────────────────┐ │
│  │  Auth &   │ │  Trend       │ │  Video Processing│ │
│  │  Billing  │ │  Analyzer    │ │  Pipeline (AI)   │ │
│  └──────────┘ └──────────────┘ └──────────────────┘ │
└──────────────────────┬──────────────────────────────┘
                       │
        ┌──────────────┼──────────────┐
        ▼              ▼              ▼
  ┌──────────┐  ┌────────────┐  ┌──────────┐
  │ Database │  │ Cloud Store│  │ AI / ML  │
  │ Postgres │  │ (S3/GCS)   │  │ Services │
  └──────────┘  └────────────┘  └──────────┘
```

---

## 📱 Core Screens (MVP)

| #  | Screen              | Description                                              |
| -- | ------------------- | -------------------------------------------------------- |
| 1  | Landing Page        | Sign up / Log in CTA                                    |
| 2  | Auth Flow           | Google Login + Phone OTP verification                    |
| 3  | Dashboard / Home    | Trial counter + quick actions                            |
| 4  | Inspiration Feed    | Grid of trending Instagram reels                         |
| 5  | Reel Detail         | Preview trending reel + "Use as template" button         |
| 6  | Upload Studio       | Upload raw MP4 clips + optional reference reel link      |
| 7  | Processing Screen   | AI agent working animation + progress bar                |
| 8  | Result / Preview    | Watch generated reel + download MP4                      |
| 9  | My Drafts           | Saved reels, generated videos, history                   |
| 10 | Subscription Page   | Pricing plans via Stripe                                 |

---

## 🤖 AI Video Agent Pipeline

### Step 1: Trend Analysis
- Scrape Instagram trending reels via Apify / RapidAPI
- Extract metadata: hashtags, audio, duration, style, captions
- GPT-4o categorizes trends: "fast-cuts", "talking-head", "cinematic", "before-after", "montage", etc.

### Step 2: Content Matching
- User uploads raw MP4 clips
- AI analyzes clips: scene detection, duration, quality, content type
- AI decides what kind of reel it can produce with the given clips
- If clips aren't suitable, AI tells the user what's needed

### Step 3: Video Generation
- FFmpeg: trim, cut, reorder, resize clips to 9:16 (vertical)
- Add trending-style royalty-free music track
- Whisper AI: generate captions → burn subtitles onto video
- Apply transitions, speed ramps, text overlays as needed
- Export final MP4 (reel-ready, 15–60 seconds)

### Optional — Reference Reel Mode
- User shares an Instagram reel link saying "make something like this"
- AI analyzes the reference reel's structure, pacing, style
- Replicates the format using the user's own clips

---

## 🗄️ Database Schema

```sql
-- USERS
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT UNIQUE NOT NULL,
  phone TEXT UNIQUE,
  google_id TEXT UNIQUE,
  name TEXT,
  avatar_url TEXT,
  trial_count INTEGER DEFAULT 3,
  subscription_status TEXT DEFAULT 'free', -- free | active | cancelled
  stripe_customer_id TEXT,
  created_at TIMESTAMP DEFAULT now()
);

-- SAVED TRENDS (bookmarks from Inspiration page)
CREATE TABLE saved_trends (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id),
  instagram_reel_url TEXT NOT NULL,
  thumbnail_url TEXT,
  trend_category TEXT,
  audio_name TEXT,
  saved_at TIMESTAMP DEFAULT now()
);

-- PROJECTS (each video generation request)
CREATE TABLE projects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id),
  reference_reel_url TEXT,          -- optional: "make it like this" link
  trend_id UUID REFERENCES saved_trends(id), -- optional: from inspiration
  status TEXT DEFAULT 'queued',     -- queued | processing | done | failed
  output_video_url TEXT,
  created_at TIMESTAMP DEFAULT now()
);

-- UPLOADED CLIPS (raw user videos per project)
CREATE TABLE uploaded_clips (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id UUID REFERENCES projects(id),
  user_id UUID REFERENCES users(id),
  file_url TEXT NOT NULL,
  duration FLOAT,
  file_size BIGINT,
  uploaded_at TIMESTAMP DEFAULT now()
);
```

---

## 💰 Monetization (Free Trial + Subscription)

- **Free tier:** 3 reel generations (no credit card required)
- **Pro tier:** Unlimited reels, priority processing, premium music library
- **Implementation:** Stripe Checkout + Webhooks
- **Anti-exploit:** Google login + phone OTP required (prevents alt accounts)

---

## 🚀 Development Phases

### Phase 1 — Auth + UI Shell (Week 1–2)
- [ ] Initialize Next.js project with Tailwind CSS
- [ ] Set up Supabase (database + auth)
- [ ] Implement Google OAuth login
- [ ] Implement Phone OTP verification
- [ ] Build layout shell: navbar, sidebar, page routing
- [ ] Build Landing Page, Dashboard, and placeholder pages

### Phase 2 — Trend Scraping + Inspiration Feed (Week 3)
- [ ] Set up FastAPI backend
- [ ] Integrate Apify / RapidAPI Instagram scraper
- [ ] Build trend analysis pipeline (GPT-4o categorization)
- [ ] Build Inspiration Feed UI (grid of trending reels)
- [ ] Build Reel Detail page with "Use as template" action
- [ ] Implement save/bookmark functionality

### Phase 3 — Video Upload + Storage (Week 4)
- [ ] Set up S3 / Supabase Storage bucket
- [ ] Build Upload Studio UI (drag-and-drop MP4 upload)
- [ ] Implement file upload API (chunked upload for large files)
- [ ] Build clip preview and management UI
- [ ] Optional: reference reel link input

### Phase 4 — AI Video Agent (Week 5–7)
- [ ] Build clip analysis pipeline (scene detection, duration, content type)
- [ ] Build content matching logic (GPT-4o decides edit style)
- [ ] Build FFmpeg video processing pipeline:
  - Trim and reorder clips
  - Resize to 9:16
  - Add music track
  - Generate + burn captions (Whisper)
  - Apply transitions
  - Export MP4
- [ ] Set up async job queue (Celery + Redis)
- [ ] Build Processing Screen UI (progress tracking)
- [ ] Build Result/Preview page (video player + download)

### Phase 5 — Payments + Trial System (Week 8)
- [ ] Integrate Stripe (Checkout + Customer Portal)
- [ ] Implement trial counter logic (decrement on each generation)
- [ ] Build Subscription Page UI
- [ ] Set up Stripe webhooks for subscription status updates
- [ ] Gate video generation behind trial/subscription check

### Phase 6 — Polish + Deploy (Week 9–10)
- [ ] Error handling and edge cases
- [ ] Loading states and animations
- [ ] Mobile-responsive testing
- [ ] Deploy frontend to Vercel
- [ ] Deploy backend to Railway / Render
- [ ] Set up environment variables and secrets
- [ ] End-to-end testing
- [ ] Soft launch

---

## ⚠️ Known Challenges

1. **Instagram scraping** — Instagram blocks direct scraping. Use Apify or RapidAPI (~$30–50/mo). Be prepared for API changes.
2. **Video processing is CPU-heavy** — Use background workers (Celery + Redis). Consider GPU instances for faster processing later.
3. **AI accuracy** — Start with simpler edit styles (fast-cuts, montages). Complex styles need iteration.
4. **Copyright** — Trending Instagram audio is copyrighted. Use royalty-free music that matches the vibe for MVP.
5. **Storage costs** — Video files are large. Implement auto-cleanup of old uploads and set file size limits.

---

## 📂 Suggested Project Structure

```
cliply/
├── frontend/                  # Next.js app
│   ├── app/                   # App router pages
│   │   ├── page.tsx           # Landing page
│   │   ├── dashboard/
│   │   ├── inspiration/
│   │   ├── studio/
│   │   ├── processing/
│   │   ├── result/
│   │   ├── drafts/
│   │   └── subscription/
│   ├── components/            # Reusable UI components
│   ├── lib/                   # Supabase client, utils
│   ├── public/
│   ├── tailwind.config.ts
│   └── package.json
│
├── backend/                   # FastAPI app
│   ├── app/
│   │   ├── main.py            # FastAPI entry point
│   │   ├── routers/
│   │   │   ├── auth.py
│   │   │   ├── trends.py
│   │   │   ├── projects.py
│   │   │   └── videos.py
│   │   ├── services/
│   │   │   ├── instagram.py   # Trend scraping
│   │   │   ├── ai_agent.py    # GPT-4o analysis + matching
│   │   │   ├── video.py       # FFmpeg processing
│   │   │   └── stripe.py      # Payment logic
│   │   ├── models/            # DB models
│   │   ├── schemas/           # Pydantic schemas
│   │   └── config.py
│   ├── workers/
│   │   └── video_worker.py    # Celery async video tasks
│   ├── requirements.txt
│   └── Dockerfile
│
├── BLUEPRINT.md               # This file
├── .env.example               # Environment variables template
└── README.md
```

---

## 🔑 Environment Variables Needed

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=

# OpenAI
OPENAI_API_KEY=

# Instagram Scraping
APIFY_API_KEY=

# Storage (S3)
AWS_ACCESS_KEY_ID=
AWS_SECRET_ACCESS_KEY=
AWS_S3_BUCKET=

# Stripe
STRIPE_SECRET_KEY=
STRIPE_WEBHOOK_SECRET=
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=

# Redis (for Celery)
REDIS_URL=
```

---

## 🧑‍💻 Getting Started in VS Code

1. Open this repo in VS Code
2. Open Copilot Chat → Switch to **Agent Mode**
3. Select **Claude Sonnet 3.7** or **Gemini 2.5 Pro** as the model
4. Say: **"Read BLUEPRINT.md and start building Phase 1"**
5. Let the agent scaffold and iterate!
