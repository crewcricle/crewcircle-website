# Social Media Implementation Plan — @crewcircle

**Status:** Ready for Execution  
**Owner:** Prabhat Ranjan  
**Website:** https://crewcircle.com  
**Brand:** CrewCircle (product suite) / crew circle (consultancy entity)  
**Last Updated:** 2026-06-12

---

## Table of Contents

1. [Platform Selection & Rationale](#1-platform-selection--rationale)
2. [Account Creation & Setup](#2-account-creation--setup)
3. [Profile Configuration Per Platform](#3-profile-configuration-per-platform)
4. [Cross-Platform Integration](#4-cross-platform-integration)
5. [Initial Content Planning](#5-initial-content-planning)
6. [Content Calendar (First 4 Weeks)](#6-content-calendar-first-4-weeks)
7. [Verification & Testing](#7-verification--testing)
8. [Analytics & Monitoring](#8-analytics--monitoring)
9. [Timeline / Execution Phases](#9-timeline--execution-phases)
10. [Ongoing Maintenance Plan](#10-ongoing-maintenance-plan)
11. [Appendices](#11-appendices)

---

## 1. Platform Selection & Rationale

### Primary Platforms (Must-Have)

| Platform | Handle | URL | Why |
|----------|--------|-----|-----|
| **LinkedIn** | `/company/crew-circle` | https://linkedin.com/company/crew-circle | Primary B2B channel. Target: Australian SMB owners, tech decision-makers. Best ROI for professional services. |
| **X (Twitter)** | `@crew_circle` | https://x.com/crew_circle | Real-time engagement, AI/tech community. Quick tips, thread content, industry conversation. |
| **YouTube** | `@crewcircle` | https://youtube.com/@crewcircle | Long-form tutorials, product demos, case study presentations. SEO value for "how-to" content. |
| **GitHub** | `crew-circle` | https://github.com/crew-circle | Open-source credibility. Hosts SDKs, example code, XeroAssist extension. Developer trust signal. |

### Secondary Platforms (Nice-to-Have)

| Platform | Handle | URL | Why | Priority |
|----------|--------|-----|-----|----------|
| **Instagram** | `@crewcircle` | https://instagram.com/crewcircle | Visual content, behind-the-scenes, team culture | Low — only after primary platforms are stable |
| **Facebook** | `/crewcircle` | https://facebook.com/crewcircle | Local Australian business groups, events | Low — only if community demand appears |

### Platforms Intentionally Skipped

| Platform | Reason |
|----------|--------|
| **TikTok** | Demographics don't match B2B AI consultancy audience |
| **Threads** | Low current ROI, revisit if Threads gains B2B traction |
| **Reddit** | Participate organically as individual (u/prabhatr) rather than brand account |

---

## 2. Account Creation & Setup

### 2.1 Prerequisites

Before creating any accounts, prepare:

**Brand Assets:**
- [ ] Logo — SVG: `public/crewcircle-logo.svg` (exists). Create social-specific variants:
  - Profile picture (400×400px, square, transparent bg) → `public/social/avatar-400px.png`
  - Banner image (1500×500px for LinkedIn/Twitter) → `public/social/banner-1500x500.png`
  - YouTube banner (2560×1440px) → `public/social/youtube-banner-2560x1440.png`
  - Favicon-social variant (for link previews) → `public/social/social-preview-1200x630.png`

**Account Credentials:**
- [ ] Create a password manager entry (1Password/Bitwarden) for `mybyconsultancy-social`
- [ ] Generate unique passwords per platform (min 20 chars, alphanumeric + symbols)
- [ ] Use a dedicated social media email alias: `social@crewcircle.com` (or forward from Gmail)
- [ ] Document recovery phone/email for each platform

**Business Verification Documents Ready:**
- [ ] ABN (Australian Business Number)
- [ ] Business address
- [ ] Business registration certificate
- [ ] Government-issued photo ID (for platform verification)

### 2.2 Account Creation Order

Accounts must be created in this specific order due to dependency chains:

```
Week 1          Week 2          Week 3          Week 4
┌─────────┐    ┌─────────┐    ┌─────────┐    ┌─────────┐
│ GitHub  │───→│ Twitter │───→│ LinkedIn│───→│ YouTube │
└─────────┘    └─────────┘    └─────────┘    └─────────┘
     │              │              │
     └──────────────┴──────────────┴──→ Website footer update
```

**Rationale:** GitHub first (no verification delay). Twitter second (quick setup, used to claim handle ASAP). LinkedIn third (1-3 week verification, start early). YouTube last (depends on content being ready).

### 2.3 Account-Specific Setup Checklists

#### GitHub (`github.com/crew-circle`)

**Timeline:** Day 1 (instant)

```
Steps:
□ Create GitHub account with social@mybyconsultancy.com
□ Username: mybyconsultancy
□ Profile:
  - Name: "mybyconsultancy"
  - Bio: "Practical AI that sorts your small biz, no dramas. Built for Aussie businesses."
  - URL: https://mybyconsultancy.com
  - Company: @mybyconsultancy
  - Location: Sydney, Australia
□ Profile picture: 400×400px logo
□ Enable 2FA (hardware key or TOTP)
□ Create organization (mybyconsultancy) for team repos
□ Pin repositories:
  1. crewcircle-website (this repo)
  2. xero-assist (Chrome extension)
  3. sensible-db (if public)
□ Create README profile: github.com/mybyconsultancy/mybyconsultancy
□ Add topics to each repo (ai, australia, small-business)
□ Configure Dependabot alerts
```

#### X / Twitter (`x.com/mybyconsultancy`)

**Timeline:** Day 1 (instant, but handle must be available)

```
Steps:
□ Create account with social@mybyconsultancy.com
□ Display name: "mybyconsultancy | CrewCircle"
□ @username: mybyconsultancy
□ Bio (max 160 chars):
  "Practical AI that sorts your small biz. 🤖⚡
  Aussie-built tools for tradies, cafes & SMBs.
  ↓ Crew Roster, Smart GL, Card Snap & more"
□ Location: Sydney, Australia
□ Website: https://mybyconsultancy.com
□ Profile picture: 400×400px logo
□ Header image: 1500×500px banner
□ Enable 2FA
□ Pin introductory tweet (see §5)
□ Create List: "Aussie AI Builders" (curated list)
□ Turn on: Analytics, Premium (if subscribing)
□ Set content preferences: Show replies, media
```

#### LinkedIn (`linkedin.com/company/my-by-consultancy`)

**Timeline:** 1-3 weeks for verification — START IMMEDIATELY

```
Steps:
□ Go to LinkedIn Create a Company Page
  → https://www.linkedin.com/company/setup/
□ Choose: Company > "Small business" or "Other"
□ Company name: "mybyconsultancy"
□ LinkedIn vanity URL: /company/my-by-consultancy
  (must be 3-100 characters, letters/numbers/hyphens only)
  NOTE: "mybyconsultancy" (no hyphens) may be taken — use "my-by-consultancy"

□ Page details:
  - Tagline: "Practical AI that sorts your small biz"
  - Description (1,500 chars max):
    "We build practical AI tools that sort out the boring stuff for Australian 
    small businesses. No jargon, no enterprise nonsense, just real software 
    that works.
    
    Our suite includes Crew Roster (GPS-tracked digital timesheets), Smart GL 
    (AI-powered bookkeeping), Card Snap (business card OCR), and XeroAssist 
    (Chrome extension for Xero power users).
    
    Founded by Prabhat Ranjan — 15+ years building software at Canva, JPMorgan, 
    MSCI, and BNP Paribas. IIT-BHU alumnus. Based in Sydney."
    
  - Industry: Computer Software
  - Company size: 1-10 employees
  - Company type: Privately Held
  - Specialties:
    AI Strategy & Consulting, Custom AI Tools, Data & Analytics, 
    Workforce Management Software, Bookkeeping Automation
  - Founded: 2024
  - Location: Sydney, New South Wales, Australia

□ Profile picture: 400×400px logo
□ Banner image: 1584×396px (LinkedIn company page spec)
□ Cover story: Short video or image (30 sec max)

□ Verification:
  - Verify domain: Add DNS TXT record or HTML file to mybyconsultancy.com
    TXT record: `linkedin-domain-verification=<verification-code>`
  OR
  - Upload business registration document
  - Provide business email (not free provider)
  - Wait for LinkedIn review (1-3 weeks)

□ Add CTA button: "Visit Website" → https://mybyconsultancy.com
□ Add featured posts (once content exists)
□ Create Showcase Pages (future):
  - CrewCircle Roster
  - Smart GL
```

#### YouTube (`youtube.com/@mybyconsultancy`)

**Timeline:** Day 14 (after content is ready)

```
Steps:
□ Use Google account tied to mybyconsultancy (Gmail/Workspace)
□ Channel name: "mybyconsultancy"
□ Handle: @mybyconsultancy
□ Channel URL: https://youtube.com/@mybyconsultancy

□ Channel description:
  "Practical AI that sorts your small biz. 
  
  We build tools for Australian small businesses — Crew Roster, Smart GL, 
  Card Snap, and XeroAssist. Here you'll find tutorials, product deep-dives, 
  and case studies showing how AI can save you time and money.
  
  No hype, no jargon. Just stuff that works."

□ Channel branding:
  - Profile picture: 400×400px logo
  - Banner: 2560×1440px (safe area: 1546×423px center)
  - Video watermark: logo (low opacity, bottom-right)

□ Sections (in order):
  1. "Latest" (auto)
  2. "Tutorials" (playlist)
  3. "Product Demos" (playlist)
  4. "Case Studies" (playlist)

□ Upload channel trailer (30-60 sec intro — see §5)
□ Enable: Community tab, Email notifications
□ Verify: Phone verification (required for uploads >15 min)
□ Link: Website, LinkedIn, Twitter in channel links
□ Set default upload settings: Category "Science & Technology"
```

---

## 3. Profile Configuration Per Platform

### 3.1 Brand Voice & Tone Matrix

| Dimension | LinkedIn | X/Twitter | YouTube | GitHub |
|-----------|----------|-----------|---------|--------|
| **Tone** | Professional, helpful | Conversational, punchy | Educational, clear | Technical, direct |
| **Formality** | Formal but warm | Casual | Semi-formal | Technical |
| **Pronouns** | We (company) | We / I (founder voice) | We / I | We |
| **Emoji use** | Occasional (📊🔧🤖) | Regular (🚀⚡💡) | Titles only | None in code |
| **Hashtags** | #AIAustralia #SmallBiz | #AussieAI #CrewCircle | descriptive tags | N/A |
| **Reply style** | "Thanks for asking — here's how..." | "Good question! Here's the thread 🧵" | Full explanation | Issue/PR comments |
| **Link sharing** | LinkedIn articles + external | Short links, alt text | Cards + description | README + wiki |

### 3.2 Bio / Description Templates (Copy-Paste Ready)

**LinkedIn Tagline (120 char):**
```
Practical AI that sorts your small biz. Aussie-built tools for tradies, cafes & SMBs.
```

**LinkedIn Description (1,500 char):**  
(Use the full description from §2.3 LinkedIn section above)

**Twitter Bio (160 char):**
```
Practical AI that sorts your small biz. 🤖⚡
Aussie-built tools for tradies, cafes & SMBs.
↓ Crew Roster, Smart GL, Card Snap & more
```

**YouTube Description (500 char):**
```
Practical AI that sorts your small biz.

We build tools for Australian small businesses — Crew Roster, Smart GL, 
Card Snap, and XeroAssist. Here you'll find tutorials, product deep-dives, 
and case studies showing how AI can save you time and money.

No hype, no jargon. Just stuff that works.
```

**GitHub Bio (160 char):**
```
Practical AI that sorts your small biz. Aussie-built tools. Crew Roster, Smart GL, Card Snap, XeroAssist.
```

---

## 4. Cross-Platform Integration

### 4.1 Link Accounts to Each Other

Each platform should link to the others where possible:

```
Website (mybyconsultancy.com)
  ├── Footer: LinkedIn, X/Twitter, GitHub, YouTube icons
  ├── About Section: Social links panel (already implemented)
  └── Blog posts: Social share buttons (future)

LinkedIn Company Page
  ├── Website: https://mybyconsultancy.com
  └── Featured: Link to YouTube channel, GitHub

X/Twitter Profile
  ├── Website: https://mybyconsultancy.com
  └── Can add: LinkedIn company URL in bio

YouTube Channel
  ├── Links section: Website, LinkedIn, Twitter, GitHub
  └── Featured channel: None (until relevant partners)

GitHub Organization
  ├── Website: https://mybyconsultancy.com
  └── README.md: Badge links to LinkedIn, Twitter
```

### 4.2 Website Footer (Already Implemented)

The footer in `src/components/layout/Footer.tsx` currently links to:
- LinkedIn: `https://www.linkedin.com/company/my-by-consultancy`
- X/Twitter: `https://x.com/mybyconsultancy`
- GitHub: `https://github.com/mybyconsultancy`
- YouTube: `https://youtube.com/@mybyconsultancy`

**Constants file:** `src/lib/constants.ts` → `CREWCIRCLE_SOCIAL` object (lines 75-80)

**Verified:** All 4 links are already wired and rendering. No code changes needed.

### 4.3 URL Uniformity

All platforms use the `mybyconsultancy` handle. Document expected URLs:

| Platform | Expected URL | Status |
|----------|-------------|--------|
| LinkedIn Company | `https://linkedin.com/company/my-by-consultancy` | ✅ configured (note: hyphen due to LinkedIn URL rules) |
| X/Twitter | `https://x.com/mybyconsultancy` | ✅ configured |
| GitHub | `https://github.com/mybyconsultancy` | ✅ configured |
| YouTube | `https://youtube.com/@mybyconsultancy` | ✅ configured |
| Instagram | `https://instagram.com/mybyconsultancy` | 🔲 future |
| Website | `https://mybyconsultancy.com` | ✅ live |

### 4.4 Email Signature

Add to email signature (HTML):

```html
<div style="font-family: sans-serif; font-size: 12px; color: #666;">
  <p><strong>Prabhat Ranjan</strong> · Founding Engineer</p>
  <p>mybyconsultancy · Practical AI for Aussie small biz</p>
  <p>
    <a href="https://mybyconsultancy.com" style="color: #ff6b35;">Website</a> ·
    <a href="https://linkedin.com/company/my-by-consultancy" style="color: #ff6b35;">LinkedIn</a> ·
    <a href="https://x.com/mybyconsultancy" style="color: #ff6b35;">X</a> ·
    <a href="https://github.com/mybyconsultancy" style="color: #ff6b35;">GitHub</a>
  </p>
</div>
```

---

## 5. Initial Content Planning

### 5.1 Content Pillars

| Pillar | Description | Example Topics | Platforms |
|--------|-------------|---------------|-----------|
| **Practical AI** | AI solving real business problems | "How we cut payroll prep from 3hrs to 20min" | LinkedIn, YouTube, X |
| **Aussie Small Biz** | Local focus, Australian context | "Why off-the-shelf software doesn't work for tradies" | All |
| **Behind the Build** | Building process, tech decisions | "I chose Rust over Python for SensibleDB because..." | X, LinkedIn |
| **Product Updates** | New features, releases | "Crew Roster v2.0 — GPS clock-in is live" | All |
| **Founder Stories** | Prabhat's journey, lessons | "How I went from JPMorgan to building for tradies" | LinkedIn, X |

### 5.2 Launch Week Content (Welcome Sequence)

#### Day 1 — GitHub

```
Repository: mybyconsultancy/mybyconsultancy (profile README)

Content:
## mybyconsultancy

Practical AI that sorts your small biz, no dramas. 🛠️

We build tools for Australian small businesses:
- **Crew Roster** — GPS-tracked digital timesheets
- **Smart GL** — AI-powered bookkeeping
- **Card Snap** — Business card OCR (on-device)
- **XeroAssist** — Chrome extension for Xero power users

Built by [Prabhat Ranjan](https://mybyconsultancy.com), ex-Canva, JPMorgan.
Based in Sydney, Australia.

📍 https://mybyconsultancy.com
🐦 https://x.com/mybyconsultancy
💼 https://linkedin.com/company/my-by-consultancy
▶️ https://youtube.com/@mybyconsultancy
```

#### Day 1 — X / Twitter (Pinned Tweet)

```
Welcome to mybyconsultancy. 🤖⚡

We build practical software that sorts out the boring stuff for Aussie small businesses.

→ AI-powered timesheets for tradies
→ Smart bookkeeping that talks to Xero
→ Business card OCR that stays on your phone
→ Chrome tools for accounting pros

Built in Sydney. No enterprise nonsense.
↓

https://mybyconsultancy.com
```

#### Day 1 — LinkedIn Welcome Post

```
🚀 We're live: mybyconsultancy

After 15+ years building software at Canva, JPMorgan, and MSCI, I'm 
launching something closer to home.

mybyconsultancy builds practical AI tools for Australian small businesses. 
No hype. No jargon. Just software that actually sorts your day-to-day.

Our tools so far:
• Crew Roster — GPS-tracked digital timesheets
• Smart GL — AI bookkeeping that talks to Xero
• Card Snap — Business card OCR, on-device
• XeroAssist — Chrome extension for Xero users

Built here in Sydney, for Aussie businesses.

Check us out → https://mybyconsultancy.com

#AIAustralia #SmallBusiness #SydneyTech #CrewCircle
```

#### Week 1 — YouTube Channel Trailer (30-60 seconds)

```
Script:
[Visual: Screen recording of Crew Roster + Smart GL interface]

[Prabhat, voiceover]
"Most software for small businesses is either too complicated 
or too simple. At mybyconsultancy, we build tools that hit 
the sweet spot.

Crew Roster replaces paper timesheets with GPS-tracked 
clock-ins. Smart GL does your bookkeeping with AI. 
Card Snap saves business cards without the clutter.

No enterprise sales pitch. No fake AI hype. 
Just practical tools for Aussie small businesses.

Check us out at mybyconsultancy.com"

[End card: Logo + Website URL + Subscribe button]
```

### 5.3 Recurring Content Series

| Series | Frequency | Format | Platforms | Description |
|--------|-----------|--------|-----------|-------------|
| **Tool Tip Tuesday** | Weekly | Single image + text | LinkedIn, X | One pro-tip for Crew Roster/Smart GL |
| **Build Log** | Bi-weekly | Thread / article | X (thread), LinkedIn (article) | Technical deep-dive into what we're building |
| **Case Study** | Monthly | Article + video | LinkedIn (article), YouTube (video) | How a customer saved time/money |
| **Aussie AI Roundup** | Weekly | Curated list | X, LinkedIn | Latest AI news relevant to Aussie biz |
| **Friday Demo** | Weekly | Short video | LinkedIn, YouTube (Shorts) | Quick product feature demo |

---

## 6. Content Calendar (First 4 Weeks)

### Week 1 — Launch

| Day | LinkedIn | X/Twitter | YouTube | GitHub |
|-----|----------|-----------|---------|--------|
| **Mon** | Welcome post 🚀 | Pinned: Welcome thread | — | Profile README |
| **Tue** | — | Tool Tip: "Did you know Crew Roster..." | — | — |
| **Wed** | Behind the build post | Build Log thread #1 | — | — |
| **Thu** | — | Aussie AI Roundup | — | — |
| **Fri** | Services overview | Friday Demo: Smart GL | Channel trailer | — |
| **Sat** | — | Community engagement | — | — |
| **Sun** | — | — | — | — |

### Week 2 — Establish Rhythm

| Day | LinkedIn | X/Twitter | YouTube | GitHub |
|-----|----------|-----------|---------|--------|
| **Mon** | Industry insight post | Industry take reply | — | — |
| **Tue** | — | Tool Tip: Smart GL shortcut | — | — |
| **Wed** | Customer problem post | Build Log thread #2 | — | — |
| **Thu** | — | Aussie AI Roundup | — | — |
| **Fri** | — | Friday Demo: Card Snap | Tutorial #1: "Setting up Crew Roster" | — |
| **Sat** | — | Engagement | — | — |
| **Sun** | — | — | — | — |

### Week 3 — Deepen

| Day | LinkedIn | X/Twitter | YouTube | GitHub |
|-----|----------|-----------|---------|--------|
| **Mon** | Case study teaser | Case study thread | — | — |
| **Tue** | — | Tool Tip: XeroAssist | — | — |
| **Wed** | Thought leadership article | Build Log thread #3 | — | — |
| **Thu** | — | Aussie AI Roundup | — | — |
| **Fri** | — | Friday Demo: XeroAssist | Tutorial #2: "Smart GL basics" | — |
| **Sat** | — | Engagement | — | — |
| **Sun** | — | — | — | — |

### Week 4 — Analyze & Adjust

| Day | LinkedIn | X/Twitter | YouTube | GitHub |
|-----|----------|-----------|---------|--------|
| **Mon** | Monthly reflection | Monthly highlights thread | — | — |
| **Tue** | — | Tool Tip: Card Snap OCR | — | — |
| **Wed** | Customer story | Build Log thread #4 | — | — |
| **Thu** | — | Aussie AI Roundup | — | — |
| **Fri** | — | Friday Demo: any product | Tutorial #3: "Combined workflow" | — |
| **Sat** | — | Engagement | — | — |
| **Sun** | Analytics review | Analytics review | Analytics review | — |

---

## 7. Verification & Testing

### 7.1 Pre-Launch Link Verification Checklist

Test all URLs before any public announcement:

```
□ https://mybyconsultancy.com → loads, shows correct site
□ https://linkedin.com/company/my-by-consultancy → resolves
□ https://x.com/mybyconsultancy → resolves
□ https://github.com/mybyconsultancy → resolves
□ https://youtube.com/@mybyconsultancy → resolves
□ https://instagram.com/mybyconsultancy → (if created) resolves

□ Footer LinkedIn icon → opens LinkedIn in new tab
□ Footer X icon → opens X in new tab
□ Footer GitHub icon → opens GitHub in new tab
□ Footer YouTube icon → opens YouTube in new tab
□ About section social links → all open correct external URLs
□ Each link has rel="noopener noreferrer" (security)

□ LinkedIn profile → website link works
□ X profile → website link works
□ YouTube channel → website link works
□ GitHub profile → website link works
```

### 7.2 Profile Consistency Audit

Run after all accounts are created:

```
Check each platform for:
□ Display name matches "mybyconsultancy" (or "mybyconsultancy | CrewCircle")
□ Profile picture is same high-res logo (400×400px)
□ Bio/description consistent tone and key messages
□ Website URL is https://mybyconsultancy.com
□ Location is Sydney, Australia (or Sydney, NSW)
□ Industry is Computer Software / Technology

Content check:
□ No placeholder text ("Coming soon", "Under construction")
□ No default profile pictures
□ No auto-generated bios
□ Pinned/introductory post is correct for each platform
□ Profile is set to PUBLIC (not private)

Cross-platform:
□ Brand colors match across banners/images
□ Logo orientation is consistent (not flipped/rotated on one platform)
□ Handle @mybyconsultancy is the same everywhere (where available)
```

### 7.3 Functional Testing

```
Browser/Device tests:
□ Open website on Chrome → Footer social links work
□ Open website on Safari → Footer social links work  
□ Open website on Firefox → Footer social links work
□ Open website on mobile (iPhone) → Footer social links open correct apps
□ Open website on mobile (Android) → Footer social links work
□ Social link preview cards show correct metadata (Open Graph)

Account tests:
□ Can log into each social account with stored credentials
□ 2FA is active on all accounts
□ Recovery email is verified on all accounts
□ Account notifications are configured (email vs in-app)
□ No "incomplete profile" warnings on any platform
```

### 7.4 Website Link Verification Script

Add this test to catch broken social links in CI:

Place at `src/lib/__tests__/social-links.test.ts`:

```typescript
import { CREWCIRCLE_SOCIAL } from '@/lib/constants';

describe('Social media links', () => {
  const links = [
    { name: 'LinkedIn', url: CREWCIRCLE_SOCIAL.linkedin },
    { name: 'Twitter', url: CREWCIRCLE_SOCIAL.twitter },
    { name: 'GitHub', url: CREWCIRCLE_SOCIAL.github },
    { name: 'YouTube', url: CREWCIRCLE_SOCIAL.youtube },
  ];

  it.each(links)('$name URL is valid', ({ url }) => {
    expect(url).toMatch(/^https:\/\//);
    expect(url).not.toContain('crewcircle'); // must not point to old brand
    expect(url).toContain('mybyconsultancy');
  });

  it('all links use noopener noreferrer', () => {
    // Verify by scanning Footer.tsx output
    // This is a compile-time check — Footer already has rel="noopener noreferrer"
  });
});
```

---

## 8. Analytics & Monitoring

### 8.1 Platform Analytics Setup

#### LinkedIn Analytics

```
Setup:
□ Auto-enabled when company page is created
□ Access: LinkedIn Admin > Analytics tab
□ Track:
  - Impressions
  - Unique visitors
  - Click-through rate
  - Follower demographics (industry, location, job function)
  - Engagement rate (likes + comments + shares / impressions)

Monthly export: CSV download from Analytics > Export
```

#### X/Twitter Analytics

```
Setup:
□ Enable: Settings > Your account > Analytics
□ Or: https://analytics.twitter.com
□ Track:
  - Tweet impressions
  - Profile visits
  - Mention volume
  - Follower growth (weekly)
  - Top tweet by engagement
  - Link clicks

Monthly export: Analytics > Export data
```

#### YouTube Analytics

```
Setup:
□ Auto-enabled when channel created
□ Access: YouTube Studio > Analytics
□ Track:
  - Views and watch time
  - Subscriber growth
  - Top videos by retention
  - Traffic source (YouTube search, suggested, external)
  - Audience retention graphs

Monthly export: YouTube Studio > Analytics > Advanced mode > Export
```

#### GitHub Traffic

```
Setup:
□ Auto-enabled for public repos
□ Access: Repository > Insights > Traffic
□ Track:
  - Clones (unique + total)
  - Views (unique + total)
  - Referrer sources
  - Popular content
  - Stars / forks / watchers

Monthly export: Manual screenshot (no export)
```

### 8.2 Aggregated Dashboard (Recommended)

**Option A: Google Data Studio (Looker Studio)**
```
Data sources to connect:
□ LinkedIn Page API → via Supermetrics or manual CSV
□ Twitter API → via Supermetrics or manual CSV
□ YouTube Analytics API → native connector
□ GitHub API → via Supermetrics or manual CSV
□ Google Analytics 4 → mybyconsultancy.com traffic

Dashboard pages:
1. Overview — Follower totals, weekly growth, top content
2. Engagement — Likes, comments, shares per platform
3. Traffic — Social → Website referral traffic (from GA4)
4. Content — Top posts by platform, best posting times
```

**Option B: Simple Spreadsheet (No-Code)**
```
File: Google Sheets → "mybyconsultancy Social Media Dashboard"

Tabs:
1. Weekly Tracker
   | Week | Platform | Followers | New | Impressions | Engagements | Top Post | Notes |
   |------|----------|-----------|-----|-------------|-------------|----------|-------|

2. Monthly Report
   | Month | Platform | Followers | Growth% | Avg Engagement | Website Clicks | Top Content | 
   |-------|----------|-----------|---------|----------------|----------------|-------------|

3. Content Library
   | Date | Platform | Content | Type | Link | Impressions | Engagement | Notes |
   |------|----------|---------|------|------|-------------|------------|-------|
```

### 8.3 Monthly Reporting Template

```markdown
# Social Media Monthly Report — [Month] [Year]

## Executive Summary
- Total followers across all platforms: [N]
- Month-over-month growth: [X%]
- Top performing content: [link]
- Key insight: [1-sentence takeaway]

## Per-Platform Breakdown

### LinkedIn
- Followers: [N] (+[X] this month)
- Impressions: [N]
- Engagement rate: [X%]
- Top post: [link]
- Best posting time: [day/time]

### X/Twitter
- Followers: [N] (+[X] this month)
- Impressions: [N]
- Engagement rate: [X%]
- Top tweet: [link]
- Mentions received: [N]

### YouTube
- Subscribers: [N] (+[X] this month)
- Total views: [N]
- Watch time (hours): [N]
- Top video: [link]
- Best traffic source: [source]

### GitHub
- Stars: [N] (+[X])
- Forks: [N]
- Clones (unique): [N]
- Top repo by views: [name]

## Website Traffic from Social (GA4)
- Total sessions from social: [N]
- Top social referrer: [platform]
- Bounce rate from social: [X%]
- Conversions from social: [N]

## Recommendations for Next Month
1. [Actionable recommendation]
2. [Actionable recommendation]
3. [Actionable recommendation]
```

### 8.4 Key Performance Indicators (KPIs)

| KPI | Target (Month 3) | Target (Month 6) | Measurement |
|-----|------------------|------------------|-------------|
| LinkedIn followers | 500+ | 2,000+ | LinkedIn Analytics |
| X followers | 1,000+ | 3,000+ | X Analytics |
| YouTube subscribers | 100+ | 500+ | YouTube Studio |
| GitHub stars (across repos) | 50+ | 200+ | GitHub Insights |
| LinkedIn engagement rate | >3% | >5% | Engagements / Impressions |
| X engagement rate | >1% | >2% | Engagements / Impressions |
| Social → Website clicks/mo | 200+ | 1,000+ | GA4 |
| Response time (inquiries) | <24hr | <12hr | Manual tracking |

---

## 9. Timeline / Execution Phases

### Phase 0: Preparation (Days 1-2)

```
Day 1:
□ Create brand assets (profile pictures, banners for all platforms)
□ Prepare business verification documents
□ Set up password manager entry
□ Claim social@mybyconsultancy.com email alias
□ Register GitHub organization: github.com/mybyconsultancy
□ Create GitHub profile README

Day 2:
□ Create X/Twitter account: @mybyconsultancy
□ Full profile setup (bio, avatar, banner, pinned tweet)
□ Enable 2FA on both accounts
```

### Phase 1: Core Setup (Days 3-7)

```
Day 3-4:
□ Create LinkedIn company page: /company/my-by-consultancy
□ Submit domain verification (TXT record)
□ Full page setup while waiting for verification
□ Begin applying to LinkedIn for Services Page (future)

Day 5-6:
□ Create YouTube channel with Google account
□ Channel branding (avatar, banner, links, sections)
□ Record/edit channel trailer (30-60 sec)
□ Upload channel trailer as unlisted (publish later)

Day 7:
□ Review all 4 accounts for consistency
□ Fix any profile issues found
□ Share calendar invite for launch day
```

### Phase 2: Cross-Platform Linking (Days 8-10)

```
Day 8:
□ Add all social links to each platform where possible
□ Update website footer (verify current links are correct)
□ Update AboutSection social links (verify correct)

Day 9:
□ Run link verification checklist (§7.1)
□ Run profile consistency audit (§7.2)
□ Run functional testing (§7.3)

Day 10:
□ Create social link test file (§7.4)
□ Fix any broken links discovered
□ Final review before launch
```

### Phase 3: Launch Week (Days 11-17)

```
Day 11 (Monday):
□ Publish welcome posts on all platforms
□ Pin welcome tweet on X
□ Publish channel trailer (set to public)
□ Announce on personal accounts (Prabhat's LinkedIn, X)

Day 12-17:
□ Follow content calendar (Week 1)
□ Respond to all comments/questions within 24hr
□ Monitor analytics for baseline
```

### Phase 4: Growth & Optimization (Weeks 3-8)

```
Week 3-4:
□ Continue content calendar
□ Review Week 1-2 analytics
□ Adjust posting times based on engagement data
□ Create first YouTube tutorial

Week 5-6:
□ First monthly report
□ Double down on best-performing content type
□ Engage with 5 new accounts/day in target audience

Week 7-8:
□ Second monthly report
□ Evaluate paid promotion (LinkedIn Sponsored, X Ads)
□ Consider Instagram if demand warrants
```

---

## 10. Ongoing Maintenance Plan

### 10.1 Daily Tasks (5-10 min)

```
□ Check notifications on all platforms
□ Respond to comments and messages
□ Engage with 3-5 relevant posts (like, comment, share)
□ Post scheduled content (if not auto-scheduled)
```

### 10.2 Weekly Tasks (30 min)

```
□ Review weekly analytics snapshot
□ Prepare content for upcoming week
□ Engage with 10+ new accounts in target audience
□ Check for platform policy changes
□ Review GitHub issues/PRs for social mentions
```

### 10.3 Monthly Tasks (1-2 hours)

```
□ Generate and review monthly analytics report (§8.3)
□ Update content calendar for next month
□ Review follower growth and engagement trends
□ Audit profile consistency across platforms
□ Check all links still work (run link test)
□ Plan next month's content themes
```

### 10.4 Quarterly Tasks (2-4 hours)

```
□ Comprehensive brand audit across all platforms
□ Review KPI progress against targets
□ Update bio/description if brand messaging evolved
□ Evaluate new platforms (Instagram, Facebook, Threads)
□ Review tool stack (scheduling, analytics, design)
□ Plan quarter's content themes and campaigns
```

### 10.5 Security Maintenance

```
Monthly:
□ Review active sessions on all platforms
□ Rotate passwords if any breach detected

Quarterly:
□ Full password rotation (all platforms)
□ Review 2FA methods (still active? still have recovery codes?)
□ Audit authorized apps connected to social accounts
□ Check for unrecognized login attempts

Annually:
□ Full security review
□ Update recovery methods
□ Review access if any team members were added
```

### 10.6 Content Repurposing Workflow

To maximize content ROI, repurpose across platforms:

```
Long-form content (YouTube tutorial / LinkedIn article)
  │
  ├──→ 3-5 X/Twitter threads (key takeaways)
  ├──→ 2-3 LinkedIn posts (teasers with link to full content)
  ├──→ 1 GitHub gist (code snippets from tutorial)
  └──→ Blog post on mybyconsultancy.com (if applicable)

Example:
"YouTube: How to set up Crew Roster GPS clock-in"
  ├── X thread: "5 things I learned building GPS clock-in"
  ├── LinkedIn post: "Why tradies need GPS timesheets"
  ├── GitHub: Crew Roster API example code
  └── Blog: Step-by-step setup guide with screenshots
```

---

## 11. Appendices

### A. Asset File Manifest

| File | Dimensions | Format | Used By |
|------|-----------|--------|---------|
| `public/crewcircle-logo.svg` | vector | SVG | Website logo |
| `public/social/avatar-400px.png` | 400×400 | PNG | All platforms |
| `public/social/banner-1500x500.png` | 1500×500 | PNG | Twitter, LinkedIn |
| `public/social/youtube-banner-2560x1440.png` | 2560×1440 | PNG | YouTube |
| `public/social/social-preview-1200x630.png` | 1200×630 | PNG | Open Graph (link previews) |
| `public/social/logo-square-1024px.png` | 1024×1024 | PNG | Instagram, high-res use |

### B. Tools & Services Recommended

| Purpose | Tool | Cost | Notes |
|---------|------|------|-------|
| Scheduling | Buffer (free plan) | Free | 3 platforms, 30 scheduled posts |
| Design | Canva (free) | Free | Social media templates |
| Link in bio | bio.link or linktr.ee | Free | Until website social page is built |
| Password mgmt | 1Password / Bitwarden | Free-$5/mo | Shared social vault |
| Analytics (simple) | Google Sheets | Free | Monthly dashboard template |
| Analytics (advanced) | Looker Studio | Free | GA4 + platform connectors |
| URL shortener | None (use full URLs) | Free | Better for trust/SEO |
| Hashtag research | Later.com free tool | Free | For LinkedIn/Instagram |
| Video editing | DaVinci Resolve / CapCut | Free | YouTube content |

### C. Content Approval Checklist (Pre-Publish)

Before posting any content, verify:

```
□ Does this align with our brand voice? (Practical, no-nonsense, Aussie)
□ Is the information accurate? (dates, links, claims)
□ Are all links working?
□ Is there a clear CTA? (visit site, comment, share, subscribe)
□ Is it accessible? (image alt text, captions on video)
□ Would I want to see this in my feed?
□ Is the tone appropriate for the platform?
□ Does this add value for the audience?
□ Are relevant hashtags included? (LinkedIn: 3-5, X: 2-3)
□ Image/text ratio is platform-appropriate?
```

### D. Crisis Communication Quick-Reference

| Scenario | Response | Timeline |
|----------|----------|----------|
| Negative comment | Acknowledge, apologize if needed, take to DM | <4 hours |
| Product issue (bug) | Public acknowledgment + timeline for fix | <2 hours |
| Incorrect information posted | Delete (if early) or corrected follow-up post | <1 hour |
| Account compromised | Change password, revoke sessions, post warning | Immediate |
| Negative press/review | Don't respond defensively. Acknowledge and address | <24 hours |

---

## References

- **Website codebase:** `/src/lib/constants.ts` — `CREWCIRCLE_SOCIAL` object
- **Footer component:** `/src/components/layout/Footer.tsx` — social icon rendering
- **About section:** `/src/components/sections/AboutSection.tsx` — social link panel
- **Existing strategy doc:** `social_media_plan.md`
- **Existing setup guide:** `SOCIAL_MEDIA_SETUP_GUIDE.md`
- **Task summary:** `TASK_COMPLETION_SUMMARY.md`

---

*This plan is a living document. Update as platforms evolve, analytics data accumulates, and brand priorities shift.*
