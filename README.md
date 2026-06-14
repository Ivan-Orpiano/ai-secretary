<div align="center">

<!-- Animated capsule banner -->
<img src="https://capsule-render.vercel.app/api?type=waving&color=0:3DFFC0,50:00B4D8,100:0A0E1A&height=200&section=header&text=ARIA&fontSize=80&fontFamily=Syne&fontColor=fff&animation=fadeIn&fontAlignY=38&desc=AI%20Secretary%20Assistant%20Chatbot&descAlignY=60&descSize=20&descColor=3DFFC0" width="100%"/>

<!-- Typing animation -->
<a href="https://github.com/yourusername/ai-secretary-chatbot">
  <img src="https://readme-typing-svg.demolab.com?font=Syne&weight=700&size=22&pause=1000&color=3DFFC0&center=true&vCenter=true&width=600&lines=Your+Intelligent+AI+Secretary+%E2%9C%A6;Powered+by+n8n+Webhook+Integration;Send+Messages+%2B+Upload+Files;Beautiful+Dark+UI+%E2%80%94+Built+with+React.js" alt="Typing SVG" />
</a>

<br/><br/>

<!-- Badges -->
<img src="https://img.shields.io/badge/React-18.2.0-61DAFB?style=for-the-badge&logo=react&logoColor=white&labelColor=0A0E1A" alt="React"/>
<img src="https://img.shields.io/badge/JavaScript-ES2022-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black&labelColor=0A0E1A" alt="JavaScript"/>
<img src="https://img.shields.io/badge/n8n-Webhook-FF6D5A?style=for-the-badge&logo=n8n&logoColor=white&labelColor=0A0E1A" alt="n8n"/>
<img src="https://img.shields.io/badge/License-MIT-3DFFC0?style=for-the-badge&labelColor=0A0E1A" alt="MIT License"/>

<br/>

<img src="https://img.shields.io/badge/Status-Active-3DFFC0?style=flat-square&labelColor=0A0E1A" alt="Status"/>
<img src="https://img.shields.io/badge/PRs-Welcome-FF6B6B?style=flat-square&labelColor=0A0E1A" alt="PRs Welcome"/>
<img src="https://img.shields.io/badge/Made%20with-❤️-FF6B6B?style=flat-square&labelColor=0A0E1A" alt="Made with love"/>

</div>

---

<br/>

<!-- Feature highlights with animated icons -->
<div align="center">
  <img src="https://capsule-render.vercel.app/api?type=rect&color=0:0D1225,100:192034&height=2&section=header" width="100%"/>
</div>

## ✦ &nbsp;What is ARIA?

**ARIA** *(AI Secretary Assistant)* is a sleek, modern React.js chatbot interface that connects to an **n8n workflow** via webhook, turning your automation pipelines into a beautiful conversational experience. Send messages, attach documents, and receive intelligent responses — all in a polished dark-themed UI.

<br/>

<!-- Animated feature cards via HTML table -->
<div align="center">

|  |  |  |
|:---:|:---:|:---:|
| 💬 **Real-time Chat** | 📎 **File Attachments** | 🔗 **n8n Webhook** |
| Conversational interface with user & AI message bubbles, timestamps, and status indicators | Upload PDFs, DOCX, images, spreadsheets, and more — with live previews and drag & drop | Seamlessly sends messages and file metadata to your n8n workflow via HTTP GET |
| 🎨 **Dark Neon UI** | 📱 **Responsive** | ⚡ **Fast & Lightweight** |
| Deep navy + neon mint design system with smooth animations and custom CSS variables | Fully adaptive layout for desktop, tablet, and mobile devices | Built with pure React hooks, no heavy dependencies — 54 KB gzipped |

</div>

<br/>

---

## 🚀 &nbsp;Quick Start

```bash
# 1. Clone the repository
git clone https://github.com/yourusername/ai-secretary-chatbot.git

# 2. Navigate into the project
cd ai-secretary-chatbot

# 3. Install dependencies
npm install

# 4. Start the development server
npm start
```

> ✨ App opens at **http://localhost:3000** — no configuration needed.

<br/>

---

## 🗂️ &nbsp;Project Structure

```
ai-secretary-chatbot/
│
├── 📁 public/
│   └── index.html                  # HTML entry with Google Fonts
│
├── 📁 src/
│   ├── 📁 components/
│   │   ├── 📁 chat/
│   │   │   ├── ChatWindow.jsx      # Scrollable message list + welcome screen
│   │   │   └── MessageBubble.jsx   # User & AI bubbles with file previews
│   │   ├── 📁 input/
│   │   │   ├── ChatInput.jsx       # Textarea, send button, drag-drop trigger
│   │   │   └── FileUpload.jsx      # File chips, drag overlay, error display
│   │   └── 📁 ui/
│   │       ├── LoadingIndicator.jsx # Animated typing dots
│   │       └── Avatar.jsx           # User / AI avatar glyphs
│   │
│   ├── 📁 context/
│   │   └── ChatContext.jsx          # Global state (useReducer)
│   │
│   ├── 📁 hooks/
│   │   ├── useChat.js               # Convenience wrapper for context
│   │   └── useFileUpload.js         # File selection, drag-drop, validation
│   │
│   ├── 📁 services/
│   │   └── webhookService.js        # n8n GET webhook + response normaliser
│   │
│   ├── 📁 styles/
│   │   └── globals.css              # CSS variables, keyframe animations
│   │
│   ├── 📁 utils/
│   │   ├── fileUtils.js             # MIME types, size formatter, validator
│   │   └── messageUtils.js          # ID gen, timestamp helpers, suggestions
│   │
│   ├── App.jsx                      # Root layout: sidebar + header + chat
│   └── index.js                     # React DOM entry point
│
└── package.json
```

<br/>

---

## ⚙️ &nbsp;Webhook Integration

ARIA sends every message to your **n8n workflow** automatically using HTTP GET:

```
GET https://vanvanproject.app.n8n.cloud/webhook-test/fee2e2ba-dd83-4fe9-9757-cc9ea6ae4bb1
    ?message=Hello+ARIA
    &sessionId=session_abc123
    &timestamp=2025-01-01T00:00:00.000Z
    &source=aria-chatbot
    &fileCount=1
    &file0_name=report.pdf
    &file0_type=application/pdf
    &file0_size=204800
    &file0_data=<base64>        ← included for files ≤ 1 MB
```

### Response Shapes Supported

ARIA's response parser automatically detects any of the following n8n output keys:

```json
{ "reply":    "..." }
{ "message":  "..." }
{ "response": "..." }
{ "output":   "..." }
{ "text":     "..." }
{ "answer":   "..." }
{ "data":     { "reply": "..." } }
```

<br/>

---

## 📎 &nbsp;Supported File Types

| Category | Extensions |
|---|---|
| 📄 **Documents** | PDF, DOC, DOCX, TXT |
| 📊 **Spreadsheets** | XLS, XLSX, CSV |
| 📋 **Presentations** | PPT, PPTX |
| 🖼️ **Images** | JPG, PNG, GIF, WEBP, SVG |
| 📦 **Archives** | ZIP, RAR |
| ⚙️ **Code / Data** | JSON, JS, HTML, CSS |

> **Limits:** Up to **5 files** per message · Max **20 MB** per file

<br/>

---

## 🎨 &nbsp;Design System

<div align="center">

| Token | Value | Usage |
|:---:|:---:|---|
| `--accent` | ![#3DFFC0](https://placehold.co/16x16/3DFFC0/3DFFC0.png) `#3DFFC0` | Primary action, AI elements, glow effects |
| `--user-accent` | ![#FF6B6B](https://placehold.co/16x16/FF6B6B/FF6B6B.png) `#FF6B6B` | User message bubbles, coral highlights |
| `--bg-base` | ![#080C18](https://placehold.co/16x16/080C18/080C18.png) `#080C18` | App background |
| `--bg-elevated` | ![#192034](https://placehold.co/16x16/192034/192034.png) `#192034` | Cards, message bubbles |
| `--font-display` | `Syne` | Headings, logo, labels |
| `--font-body` | `DM Sans` | All body text, inputs |
| `--font-mono` | `JetBrains Mono` | Code, metadata, session IDs |

</div>

<br/>

---

## 🧩 &nbsp;State Management

ARIA uses **React Context + useReducer** — no Redux, no external libraries needed.

```
ChatContext (global state)
├── messages[]          ← full conversation history
├── isLoading           ← webhook in-flight flag
├── error               ← last error string
├── sessionId           ← unique conversation ID
├── sendMessage(text, files[])   ← dispatches optimistic update → webhook → reply
└── clearChat()         ← resets conversation
```

```
useFileUpload (local state per input)
├── files[]             ← FilePreview objects with name, size, preview URL
├── dragActive          ← drag-over state for overlay
├── fileErrors[]        ← per-file validation errors
└── addFiles / removeFile / clearFiles / openPicker
```

<br/>

---

## 🛠️ &nbsp;Available Scripts

| Command | Description |
|---|---|
| `npm start` | Start development server at http://localhost:3000 |
| `npm run build` | Create an optimised production build in `/build` |
| `npm test` | Launch the test runner |

<br/>

---

## 🔧 &nbsp;Customisation

**Change the webhook URL** — edit one constant in `src/services/webhookService.js`:

```js
const WEBHOOK_URL = 'https://your-n8n-instance.com/webhook-test/your-id';
```

**Change the accent colour** — edit one variable in `src/styles/globals.css`:

```css
:root {
  --accent: #3DFFC0;   /* swap to any colour you like */
}
```

**Add suggestion chips** — edit the array in `src/utils/messageUtils.js`:

```js
export const SUGGESTIONS = [
  'Summarize the attached document',
  'Draft a professional email response',
  // add your own prompts here…
];
```

<br/>

---

## 🤝 &nbsp;Contributing

Contributions, issues and feature requests are very welcome!

```bash
# Fork → clone → create your branch
git checkout -b feature/amazing-feature

# Make your changes, then commit
git commit -m "feat: add amazing feature"

# Push and open a Pull Request
git push origin feature/amazing-feature
```

<br/>

---

## 📄 &nbsp;License

Distributed under the **MIT License** — free to use, modify, and share.

<br/>

---

<!-- Footer wave -->
<div align="center">

<img src="https://capsule-render.vercel.app/api?type=waving&color=0:0A0E1A,50:00B4D8,100:3DFFC0&height=120&section=footer&animation=twinkling" width="100%"/>

<br/>

<img src="https://readme-typing-svg.demolab.com?font=DM+Sans&size=14&pause=2000&color=3DFFC0&center=true&vCenter=true&width=500&lines=Built+with+React.js+%E2%9C%A6+Powered+by+n8n;ARIA+%E2%80%94+Your+AI+Secretary+is+ready." alt="Footer typing" />

<br/><br/>

⭐ **Star this repo if ARIA made your workflow smarter!** ⭐

</div>
