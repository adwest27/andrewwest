# Modern Professional Portfolio Website

A sleek, state-of-the-art developer portfolio designed with modern web aesthetics, interactive components, responsive layouts, and clean placeholder slots ready to be filled in with your personal story, skills, projects, and career highlights.

---

## 🚀 Live Preview Locally

The site is currently served locally on:
**[http://localhost:5500](http://localhost:5500)**

You can also simply open `index.html` in any modern web browser (Chrome, Edge, Firefox, Brave, Safari) by double-clicking it.

---

## 📁 Project Structure

```
teamproject/
├── index.html         # Main semantic HTML5 structure with clearly marked EDIT comments
├── css/
│   └── style.css      # Design system, CSS variables, dark/light theme, glassmorphism, animations
├── js/
│   └── main.js        # Dynamic typewriter, theme switcher, project filters, timeline tabs, toast alert
└── README.md          # Guide on customizing and filling in the blanks
```

---

## 🎨 Key Features & Design Highlights

1. **Rich Aesthetics & Ambient Lighting**:
   - Subtle glowing ambient gradient blobs in the background.
   - Glassmorphic card styling (`backdrop-filter: blur(14px)`), refined borders, and micro-hover lifts.
2. **Instant Dark & Light Mode**:
   - Seamless toggle button located in the top navigation bar.
   - Automatic local storage persistence and system preference detection.
3. **Dynamic Typewriter Subtitle**:
   - Hero headline dynamically cycles through key engineering titles (Full Stack Engineer, UI/UX Specialist, Cloud Builder, Creative Problem Solver).
4. **Interactive Code & Developer Card**:
   - Sleek macOS-style terminal card with syntax highlighting and floating achievement pills.
5. **Interactive Project Filters**:
   - Filterable tabs (`All`, `Full Stack`, `Frontend`, `Backend & APIs`) that smoothly transition cards into view.
6. **Timeline Tabs (Career & Education)**:
   - Toggle between "Work Experience" and "Education & Degrees" with a clean vertical timeline.
7. **Contact System & Micro-Interactions**:
   - One-click "Copy Email to Clipboard" button.
   - Client-side validated interactive contact form with dynamic toast notifications.
   - Mobile hamburger menu with smooth slide-in navigation.

---

## 📝 How to Fill in the Blanks

All placeholder areas in [`index.html`](index.html) are marked with `<!-- EDIT: ... -->` comments or brackets like `[Your Name]`.

You have two easy options:

### Option A: Tell the Assistant to Fill Them In
Simply provide your details in the chat! For example:
> *"Fill in my name as Alex Morgan, email as alex@morgan.dev, 4 years experience, frontend skills React, TypeScript, Tailwind, and two projects: a crypto dashboard and an AI image generator."*

### Option B: Edit Directly in `index.html`
Look for these key sections in [`index.html`](index.html):

| Section | Line / ID | What to customize |
|---|---|---|
| **SEO & Title** | `<head>` | Page `<title>`, `<meta name="description">`, and author tag |
| **Navbar Brand** | `#site-header` | Monogram `[YN]` and Name `[YourName]` |
| **Hero Section** | `#hero` | Real name, elevator pitch, social media links (GitHub, LinkedIn, Twitter, Email) |
| **About Section** | `#about` | Headshot image (or keep the monogram badge), years of experience, bio paragraphs, and statistics counters |
| **Skills Arsenal** | `#skills` | Frontend, Backend, DevOps, and Design tool pills |
| **Projects** | `#projects` | Project screenshots, titles, descriptions, tech stacks, live demo links, and GitHub repositories |
| **Experience Timeline** | `#experience` | Job titles, company names, dates, key accomplishments, and university/certification credentials |
| **Endorsements** | `#testimonials` | Quotes, author names, job titles, and avatars |
| **Contact** | `#contact` | Contact email, location / remote status, and social channels |
| **Footer** | `<footer>` | Copyright year and name |
