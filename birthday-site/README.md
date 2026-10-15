# Birthday Wish Website 🎂

A playful React (Vite) birthday site: countdown, chat bubbles, flip cards, a cake with candles to blow out, a photo gallery and a letter.

## Run locally

```bash
npm install
npm run dev
```

## Personalise

Edit `src/config.js`: her name, your name, messages, flip cards, letter text.

**Photos:** copy images into `public/photos/` and list them in `config.photos`, e.g. `{ src: "photos/1.jpg", caption: "That trip 😄" }`.

**Your own characters:** put images in `public/` (e.g. `her.png`, `me.png`) and in `src/App.jsx` change `<Girl />` to `<Girl img="her.png" />` and `<Dog />` to `<Dog img="me.png" />`.

## Deploy free on GitHub Pages

1. Create a new GitHub repo (e.g. `birthday-wish`) and push this folder to the `main` branch:
   ```bash
   git init
   git add .
   git commit -m "Birthday site"
   git branch -M main
   git remote add origin https://github.com/<your-username>/birthday-wish.git
   git push -u origin main
   ```
2. In the repo go to **Settings → Pages → Build and deployment → Source: GitHub Actions**.
3. The included workflow builds and publishes on every push. Your site will be at
   `https://<your-username>.github.io/birthday-wish/`

Tip: push a few days early and test the link on your phone before the 16th.
