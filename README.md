# Welcome to my portfolio 👋

Find more details on the link: **[paste your live URL here once deployed]**

---

Personal portfolio for **Arpit Agrawal** — Software Developer & Tech Fitness Influencer ([@techarfit](https://www.instagram.com/techarfit/)).

## Features
- Hero with intro, resume link & CTAs
- About + skills
- Latest Instagram reels & YouTube videos from **@techarfit**
- 1:1 **Coaching** application form → writes to Google Sheet
- Brand **Collab** pitch form → writes to a separate Google Sheet
- Dark mode toggle (persisted in localStorage)
- Mobile-responsive, smooth scroll reveal animations

## Run locally
```bash
cd personal-website
python3 -m http.server 5500
# then visit http://localhost:5500
```

## Customizing

| What | Where |
| --- | --- |
| Instagram reels | `index.html` → `https://www.instagram.com/reel/REEL_ID/embed` |
| YouTube videos | `index.html` → `https://www.youtube.com/embed/VIDEO_ID` |
| Form fields | `index.html` → `#coachingForm` / `#collabForm` |
| Google Sheets endpoints | `script.js` → `SHEET_ENDPOINTS` |
| Social links | `index.html` → `.socials` section |
| Colors / theme | `styles.css` → `:root` & `[data-theme="dark"]` |

## Form submissions
Both forms POST to Google Apps Script web apps that append rows to Google Sheets.
Endpoints are configured in `script.js` → `SHEET_ENDPOINTS`.

## Files
- `index.html` — markup
- `styles.css` — styling (light + dark mode)
- `script.js` — interactivity, theme toggle, form submission
- `Arpit_Self_Photo_Dp.jpg` — profile photo

## Deploy
Static site — works on any host:
- **GitHub Pages**: push to a repo, enable Pages in Settings
- **Netlify / Vercel**: drag & drop the folder, or connect the repo
- **Cloudflare Pages**: connect the repo
