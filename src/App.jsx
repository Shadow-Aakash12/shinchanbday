import React, { useEffect, useState, useCallback } from "react";
import { config } from "./config.js";
import { Girl, Dog } from "./Avatars.jsx";
import { CatchGame, MemoryGame } from "./Games.jsx";

/* ---------- helpers ---------- */

function useCountdown(target) {
  const calc = () => Math.max(0, new Date(target).getTime() - Date.now());
  const [ms, setMs] = useState(calc);
  useEffect(() => {
    const id = setInterval(() => setMs(calc()), 1000);
    return () => clearInterval(id);
  }, [target]);
  const s = Math.floor(ms / 1000);
  return {
    done: ms === 0,
    days: Math.floor(s / 86400),
    hours: Math.floor((s % 86400) / 3600),
    minutes: Math.floor((s % 3600) / 60),
    seconds: s % 60,
  };
}

const EMOJIS = ["🎉", "🎈", "✨", "🎂", "💛", "🍰", "🎊", "⭐"];

function useConfetti() {
  const [pieces, setPieces] = useState([]);
  const burst = useCallback((count = 36) => {
    const now = Date.now();
    const batch = Array.from({ length: count }, (_, i) => ({
      id: `${now}-${i}`,
      emoji: EMOJIS[Math.floor(Math.random() * EMOJIS.length)],
      left: Math.random() * 100,
      delay: Math.random() * 0.6,
      dur: 2.4 + Math.random() * 2,
      size: 18 + Math.random() * 20,
    }));
    setPieces((p) => [...p, ...batch]);
    setTimeout(() => setPieces((p) => p.filter((x) => !batch.includes(x))), 5500);
  }, []);
  const layer = (
    <div className="confetti" aria-hidden="true">
      {pieces.map((p) => (
        <span
          key={p.id}
          style={{
            left: `${p.left}%`,
            fontSize: p.size,
            animationDelay: `${p.delay}s`,
            animationDuration: `${p.dur}s`,
          }}
        >
          {p.emoji}
        </span>
      ))}
    </div>
  );
  return [layer, burst];
}

/* ---------- sections ---------- */

function Hero({ onParty }) {
  const t = useCountdown(config.birthday);
  return (
    <header className="hero">
      <p className="kicker">🎈 a tiny website made with love 🎈</p>
      <h1 className="title">
        {t.done ? "HAPPY BIRTHDAY" : "Birthday Countdown"}
        <span className="name">{config.herName}!</span>
      </h1>
      <p className="sub">{config.heroLine}</p>

      <div className="stage">
        <div className="char bounce"><Girl /></div>
        <div className="char bounce delay"><Dog /></div>
      </div>

      {t.done ? (
        <button className="btn" onClick={() => onParty(60)}>🎉 It's today! Tap for a party 🎉</button>
      ) : (
        <div className="countdown">
          {[["days", t.days], ["hours", t.hours], ["mins", t.minutes], ["secs", t.seconds]].map(([l, v]) => (
            <div className="tick" key={l}>
              <b>{String(v).padStart(2, "0")}</b>
              <span>{l}</span>
            </div>
          ))}
        </div>
      )}
    </header>
  );
}

function Chat() {
  const [shown, setShown] = useState(1);
  const all = config.chat;
  return (
    <section className="card">
      <h2>Overheard at the party 💬</h2>
      <div className="chat">
        {all.slice(0, shown).map((m, i) => (
          <div key={i} className={`row ${m.who}`}>
            <div className="mini">{m.who === "girl" ? <Girl size={56} /> : <Dog size={64} />}</div>
            <div className="bubble">{m.text}</div>
          </div>
        ))}
      </div>
      {shown < all.length ? (
        <button className="btn small" onClick={() => setShown((s) => s + 1)}>Next →</button>
      ) : (
        <p className="hint">The end! (or scroll down for more) 👇</p>
      )}
    </section>
  );
}

function Reasons() {
  const [flipped, setFlipped] = useState({});
  return (
    <section className="card">
      <h2>Why you're the best 💛</h2>
      <p className="hint">Tap a card to flip it</p>
      <div className="grid">
        {config.reasons.map((r, i) => (
          <button
            key={i}
            className={`flip ${flipped[i] ? "on" : ""}`}
            onClick={() => setFlipped((f) => ({ ...f, [i]: !f[i] }))}
          >
            <span className="face front">{r.front}</span>
            <span className="face back">{r.back}</span>
          </button>
        ))}
      </div>
    </section>
  );
}

function Cake({ onParty }) {
  const [lit, setLit] = useState(true);
  return (
    <section className="card center">
      <h2>Make a wish 🎂</h2>
      <div className="cake">
        <div className="candles">
          {[0, 1, 2].map((i) => (
            <div key={i} className="candle">
              <div className={`flame ${lit ? "" : "out"}`} />
            </div>
          ))}
        </div>
        <div className="tier t1" />
        <div className="tier t2" />
        <div className="plate" />
      </div>
      {lit ? (
        <button className="btn" onClick={() => { setLit(false); onParty(50); }}>
          💨 Blow the candles
        </button>
      ) : (
        <>
          <p className="wish">{config.wishMessage}</p>
          <button className="btn small" onClick={() => setLit(true)}>Light them again</button>
        </>
      )}
    </section>
  );
}

function Gallery() {
  if (!config.photos.length) return null;
  return (
    <section className="card">
      <h2>Our memories 📸</h2>
      <div className="photos">
        {config.photos.map((p, i) => (
          <figure key={i} style={{ "--tilt": `${(i % 2 ? 1 : -1) * (1 + (i % 3))}deg` }}>
            <img src={p.src} alt={p.caption || "memory"} loading="lazy" />
            {p.caption && <figcaption>{p.caption}</figcaption>}
          </figure>
        ))}
      </div>
    </section>
  );
}

function Letter({ onParty }) {
  const [open, setOpen] = useState(false);
  const L = config.letter;
  return (
    <section className="card center">
      <h2>One last thing 💌</h2>
      {!open ? (
        <button
          className="envelope"
          onClick={() => { setOpen(true); onParty(40); }}
          aria-label="Open the letter"
        >
          <span>💌</span>
          <small>Tap to open</small>
        </button>
      ) : (
        <article className="letter">
          <div className="addr">
            <div><b>From :</b>{L.from.map((l, i) => <div key={i} className="ind">{l}</div>)}</div>
            <div><b>To :</b>{L.to.map((l, i) => <div key={i} className="ind">{l}</div>)}</div>
          </div>
          <p className="salute">{L.salutation}</p>
          <p className="subject"><b>Subject:</b> {L.subject}</p>
          {L.body.map((p, i) => <p key={i} className="body">{p}</p>)}
          <p className="love">{L.love}</p>
          <p className="sign">{L.pet}<br /><br />{L.sincerely}</p>
        </article>
      )}
    </section>
  );
}

/* ---------- app ---------- */

export default function App() {
  const [layer, burst] = useConfetti();
  useEffect(() => { const id = setTimeout(() => burst(24), 600); return () => clearTimeout(id); }, [burst]);
  return (
    <>
      {layer}
      <main>
        <Hero onParty={burst} />
        <Chat />
        <Reasons />
        <Cake onParty={burst} />
        <CatchGame onParty={burst} />
        <MemoryGame onParty={burst} />
        <Gallery />
        <Letter onParty={burst} />
        <footer>Made with 💛 by Sheroo 🐶</footer>
      </main>
    </>
  );
}
