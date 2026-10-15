# Birthday Wish Website 🎂

React (Vite) birthday site: countdown, chat bubbles, flip cards, cake, two mini games (Feed Sheroo 🍪, Memory Match 🧠), photo gallery and the letter.

Everything you'd edit lives in `src/config.js`.

## Quick preview on your computer

```bash
npm install
npm run dev
```

## Preview on your phone before it's live (same Wi-Fi)

```bash
npm run dev -- --host
```

Open the `Network:` address it prints (like `http://192.168.x.x:5173`) in your phone's browser.

## Make it live (GitHub Pages, free)

1. Create a free account at github.com, then a **new empty repo** (e.g. `keerthu-birthday`), set to **Public**.
2. In this folder run:
   ```bash
   git init
   git add .
   git commit -m "Birthday site"
   git branch -M main
   git remote add origin https://github.com/<your-username>/keerthu-birthday.git
   git push -u origin main
   ```
3. On GitHub: **Settings → Pages → Build and deployment → Source: GitHub Actions**.
4. Open the **Actions** tab and wait for "Deploy to GitHub Pages" to turn green (about 1–2 minutes). If it didn't start, click it and press **Run workflow**.
5. Your link is `https://<your-username>.github.io/keerthu-birthday/`. Open it on your phone and test everything.
6. Happy with it? Send her that link. Any later change: edit, `git add . && git commit -m "update" && git push` and it redeploys itself.

## Test the "it's her birthday" state

In `src/config.js` set `birthday` to a time in the past (e.g. `"2026-10-01T00:00:00+05:30"`), check how it looks, then set it back to `"2026-10-16T00:00:00+05:30"` before sending.

## Your own artwork / photos

- Photos: put them in `public/photos/` and list them in `config.photos`.
- Characters: put images in `public/` and use `<Girl img="her.png" />` / `<Dog img="me.png" />` in `src/App.jsx`.
