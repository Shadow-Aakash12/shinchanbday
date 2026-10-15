import React, { useEffect, useRef, useState, useCallback } from "react";

/* ---------- storage helpers (safe if storage is blocked) ---------- */
const getBest = (k) => { try { return Number(localStorage.getItem(k)) || 0; } catch { return 0; } };
const setBest = (k, v) => { try { localStorage.setItem(k, String(v)); } catch { /* ignore */ } };

/* =========================================================
 * Game 1: Biscuit Catch 🍪 — drag Sheroo left/right
 * ========================================================= */
const GAME_SECONDS = 30;
const CANVAS_H = 340;

export function CatchGame({ onParty }) {
  const canvasRef = useRef(null);
  const wrapRef = useRef(null);
  const g = useRef(null); // mutable game state
  const [phase, setPhase] = useState("idle"); // idle | playing | done
  const [score, setScore] = useState(0);
  const [time, setTime] = useState(GAME_SECONDS);
  const [best, setBestState] = useState(() => getBest("sheroo-best"));

  const movePointer = (e) => {
    if (!g.current) return;
    const rect = canvasRef.current.getBoundingClientRect();
    g.current.dogX = Math.min(rect.width - 24, Math.max(24, e.clientX - rect.left));
  };

  useEffect(() => {
    if (phase !== "playing") return;
    const canvas = canvasRef.current;
    const W = wrapRef.current.clientWidth;
    const dpr = window.devicePixelRatio || 1;
    canvas.width = W * dpr;
    canvas.height = CANVAS_H * dpr;
    canvas.style.width = `${W}px`;
    canvas.style.height = `${CANVAS_H}px`;
    const ctx = canvas.getContext("2d");
    ctx.scale(dpr, dpr);

    const s = (g.current = { dogX: W / 2, items: [], score: 0, elapsed: 0, spawn: 0, shownTime: GAME_SECONDS });
    let last = performance.now();
    let raf;

    const loop = (now) => {
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;
      s.elapsed += dt;
      s.spawn -= dt;

      if (s.spawn <= 0) {
        s.spawn = Math.max(0.35, 0.75 - s.elapsed * 0.012);
        const bad = Math.random() < 0.22;
        s.items.push({
          x: 20 + Math.random() * (W - 40),
          y: -20,
          vy: 130 + Math.random() * 90 + s.elapsed * 4,
          emoji: bad ? "🥦" : "🍪",
          bad,
        });
      }

      const dogY = CANVAS_H - 44;
      for (const it of s.items) {
        it.y += it.vy * dt;
        if (!it.done && it.y > dogY - 20 && it.y < dogY + 24 && Math.abs(it.x - s.dogX) < 34) {
          it.done = true;
          s.score = Math.max(0, s.score + (it.bad ? -2 : 1));
          setScore(s.score);
        }
      }
      s.items = s.items.filter((it) => !it.done && it.y < CANVAS_H + 30);

      // draw
      ctx.clearRect(0, 0, W, CANVAS_H);
      ctx.fillStyle = "#e6f6ff";
      ctx.fillRect(0, 0, W, CANVAS_H);
      ctx.fillStyle = "#8fd18f";
      ctx.fillRect(0, CANVAS_H - 18, W, 18);
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.font = "30px serif";
      for (const it of s.items) ctx.fillText(it.emoji, it.x, it.y);
      ctx.font = "52px serif";
      ctx.fillText("🐶", s.dogX, dogY);

      const left = Math.max(0, Math.ceil(GAME_SECONDS - s.elapsed));
      if (left !== s.shownTime) { s.shownTime = left; setTime(left); }

      if (s.elapsed >= GAME_SECONDS) {
        setPhase("done");
        return;
      }
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, [phase]);

  // end-of-game bookkeeping
  useEffect(() => {
    if (phase !== "done" || !g.current) return;
    const final = g.current.score;
    if (final > getBest("sheroo-best")) { setBest("sheroo-best", final); setBestState(final); }
    if (final >= 10) onParty(40);
  }, [phase]); // eslint-disable-line react-hooks/exhaustive-deps

  const start = () => { setScore(0); setTime(GAME_SECONDS); setPhase("playing"); };

  const verdict =
    score >= 20 ? "Biscuit champion! 🏆" : score >= 10 ? "Sheroo is full and happy! 😋" : "Sheroo is still hungry… try again! 🐶";

  return (
    <section className="card center">
      <h2>Feed Sheroo 🍪</h2>
      <p className="hint">Drag to move Sheroo. Catch 🍪 (+1), dodge 🥦 (−2). {GAME_SECONDS} seconds!</p>
      <div className="hud">
        <span>🍪 {score}</span>
        <span>⏱ {time}s</span>
        <span>🏅 Best {best}</span>
      </div>
      <div className="game-wrap" ref={wrapRef}>
        <canvas
          ref={canvasRef}
          className="game-canvas"
          style={{ height: CANVAS_H }}
          onPointerDown={movePointer}
          onPointerMove={movePointer}
        />
        {phase !== "playing" && (
          <div className="overlay">
            {phase === "done" && (
              <>
                <p className="big">{verdict}</p>
                <p>You caught {score} biscuits</p>
              </>
            )}
            <button className="btn" onClick={start}>{phase === "done" ? "Play again" : "▶ Start"}</button>
          </div>
        )}
      </div>
    </section>
  );
}

/* =========================================================
 * Game 2: Memory Match 🧠
 * ========================================================= */
const FACES = ["🍪", "🎂", "🐶", "🖤", "🎈", "🎁"];

const shuffled = () => {
  const a = [...FACES, ...FACES].map((f, i) => ({ id: i, f }));
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
};

export function MemoryGame({ onParty }) {
  const [cards, setCards] = useState(shuffled);
  const [open, setOpen] = useState([]); // indices currently face-up (unmatched)
  const [matched, setMatched] = useState([]); // face symbols matched
  const [moves, setMoves] = useState(0);
  const [best, setBestState] = useState(() => getBest("memory-best"));
  const lock = useRef(false);
  const won = matched.length === FACES.length;

  const flip = (i) => {
    if (lock.current || open.includes(i) || matched.includes(cards[i].f)) return;
    const next = [...open, i];
    setOpen(next);
    if (next.length === 2) {
      setMoves((m) => m + 1);
      lock.current = true;
      const [a, b] = next;
      setTimeout(() => {
        if (cards[a].f === cards[b].f) setMatched((m) => [...m, cards[a].f]);
        setOpen([]);
        lock.current = false;
      }, 700);
    }
  };

  useEffect(() => {
    if (!won) return;
    onParty(40);
    const prev = getBest("memory-best");
    if (!prev || moves < prev) { setBest("memory-best", moves); setBestState(moves); }
  }, [won]); // eslint-disable-line react-hooks/exhaustive-deps

  const reset = useCallback(() => {
    setCards(shuffled()); setOpen([]); setMatched([]); setMoves(0); lock.current = false;
  }, []);

  return (
    <section className="card center">
      <h2>Memory Match 🧠</h2>
      <p className="hint">Find all the matching pairs in the fewest moves.</p>
      <div className="hud">
        <span>Moves {moves}</span>
        <span>🏅 Best {best || "–"}</span>
      </div>
      <div className="memory">
        {cards.map((c, i) => {
          const up = open.includes(i) || matched.includes(c.f);
          return (
            <button
              key={c.id}
              className={`mcard ${up ? "up" : ""} ${matched.includes(c.f) ? "ok" : ""}`}
              onClick={() => flip(i)}
              aria-label={up ? c.f : "hidden card"}
            >
              <span className="mface mback">❓</span>
              <span className="mface mfront">{c.f}</span>
            </button>
          );
        })}
      </div>
      {won ? (
        <p className="wish">You did it in {moves} moves! 🎉</p>
      ) : null}
      <button className="btn small" onClick={reset}>{won ? "Play again" : "Shuffle / restart"}</button>
    </section>
  );
}
