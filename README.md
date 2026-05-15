# Personal Portfolio Website

Personal portfolio for **Arpit Agrawal** — Software Developer at Google & Tech Fitness Influencer.

## Features
- Hero section with intro & CTAs
- About + skills sections
- **Latest Instagram Reel** embed (replace the `data-instgrm-permalink` in `index.html`)
- **Latest YouTube videos** embed (replace the YouTube `embed/VIDEO_ID` URLs)
- **Coaching application form** (dummy — fields & submission can be customized)
- Mobile-responsive, smooth scroll reveal animations

## Run locally
Just open `index.html` in a browser, or serve it:

```bash
cd personal-website
python3 -m http.server 5500
# then visit http://localhost:5500
```

## Customizing

| What | Where |
| --- | --- |
| Instagram Reel URL | `index.html` → `data-instgrm-permalink="..."` |
| YouTube videos | `index.html` → `<iframe src="https://www.youtube.com/embed/VIDEO_ID">` |
| Coaching form fields | `index.html` → `<form id="coachingForm">` |
| Form submission backend | `script.js` → `// TODO: replace with real submission` |
| Social links | `index.html` → `.socials` section |
| Colors / theme | `styles.css` → `:root` CSS variables |

## Wiring up the form
The form currently logs submissions to the browser console. To make it functional:
- Use [Formspree](https://formspree.io/), [Getform](https://getform.io/), or a Google Apps Script endpoint.
- Replace the `console.log(...)` in `script.js` with a `fetch()` POST to your endpoint.

## Files
- `index.html` — markup
- `styles.css` — styling
- `script.js` — interactivity & form handling
