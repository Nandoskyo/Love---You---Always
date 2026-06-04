# 💌 For You, My Everything

A romantic animated love-letter web app built with **React + Vite + GSAP**.

## Features

| Feature | Detail |
|---|---|
| 🎁 Gift intro | 3-D gift box with a lid that flies open on tap; particle burst on open |
| ✿ Floating petals | Randomised petals & dots that drift upward across the entire viewport |
| 📜 Hero reveal | Staggered GSAP entrance — tag → title → subtitle → flower → scroll hint |
| 🎵 Music player | Fixed bottom-left player with progress bar, seek, and play/pause |
| 💬 Love letter | Scroll-triggered paragraph reveals via GSAP + ScrollTrigger |
| 📱 Responsive | Fluid typography (`clamp`), adapts to mobile (≥ 320 px) and desktop |

## Getting Started

```bash
# install
npm install

# dev server (http://localhost:5173)
npm run dev

# production build
npm run build
```

## Project Structure

```
src/
  components/      # Reusable UI pieces
    FloatingFlowers.jsx   background petal animation
    GiftBox.jsx           interactive 3-D gift → GSAP open sequence
    Hero.jsx              hero section with staggered entrance
    MusicPlayer.jsx       fixed audio player widget
    LoveLetter.jsx        scroll-triggered letter paragraphs
    Footer.jsx            simple footer
  pages/
    Home.jsx              global phase controller (gift → revealed)
  layouts/
    MainLayout.jsx        thin root wrapper
  hooks/
    useMusic.js           Audio element lifecycle & state
  lib/
    gsap.js               GSAP + ScrollTrigger registration
    utils.js              random, clamp, formatTime helpers
  styles/
    globals.css           design tokens + all component styles
    animations.css        @keyframe definitions
```

## Assets

Place your own files in `public/`:

| File | Purpose |
|---|---|
| `/music/song.mp3` | Background track (default: Sampai Jadi Debu — Banda Neira) |
| `/images/hero.jpg` | Optional photo in the love letter section |

In `LoveLetter.jsx` replace the placeholder `<div>` with:
```jsx
<img src="/images/hero.jpg" alt="us" />
```

## Tech Stack

- [React 18](https://react.dev)
- [Vite 5](https://vitejs.dev)
- [GSAP 3 + ScrollTrigger](https://gsap.com)
- CSS custom properties (no CSS-in-JS, no Tailwind)
- Google Fonts: *Cormorant Garamond* + *Raleway*
