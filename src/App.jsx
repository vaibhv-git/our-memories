import { useState, useEffect } from "react";
const BASE = import.meta.env.BASE_URL;
const memories = [
  {
   image: `${BASE}img1.jpg`,
    title: "The First Day I Saw You",
    text: `When it was my first day at the gym, I noticed you right away. Honestly, I was really impressed by you. There was just something different about you that made you stand out from everyone else.

I think you became a bit of a crush for me from that very first day. I wanted to come and talk to you, but I didn't have enough confidence back then, so I never did. Still, I remember noticing you and thinking that you seemed really special.`,
  },
{
 image: `${BASE}img2.jpg`,
  title: "New Year Party",
  text: "I still remember that New Year's party. The moment I entered, you were right in front of me, and somehow I spotted you instantly because nobody else really caught my attention. Later, you went into the hall, and when I came inside, you were sitting with your friend. Throughout the evening, I kept noticing you while dancing and enjoying the party. Then, just when we were about to leave and head home, you randomly asked me, 'Did you eat?' It felt a little unexpected at the time, but looking back, it's one of those small moments that stayed with me. It may seem simple, but it's one of my favorite memories with you.",
},
  {
  image: `${BASE}img3.jpg`,
    title: "The first time in the gym, you asked me for a spot",
    text: "I remember you were doing shoulder presses and had asked someone else for a spot. He was busy, so he asked me to help you instead. That was probably the first real interaction we had in the gym. A while after that, we ended up doing preacher curls together, and while spotting you, I noticed a few things you could improve. Looking back, it all started with such a simple gym moment, but maybe it was the beginning of something good.",
  },
  {
   image: `${BASE}img4.jpg`,
    title: "How It All Started",
    text: "When I followed you on Instagram, I honestly had no idea how to start a conversation. The first thing I texted you about was that preacher curl thing, which was a little weird. I still remember you asking, 'Did you follow me just to tell me that?' 😭 But somehow, that awkward start turned into something much better. Just a few days later, we started watching movies together on Google Meet, and after the movie we'd stay up talking until 5 in the morning. Now we even try to match our gym routines and sometimes end up twinning without planning it. Looking back, things got a lot better after that first awkward message.",
  },
  {
   image: `${BASE}img4.jpg`,
    title: "Our First Date",
    text: "It was a Sunday. You had gone to your nani's place, and when you came back, we finally got to meet. I still remember you arriving around 8:22 PM. We went out on my bike and started the evening with a shake that was way too sweet and honestly a little weird. Somewhere in between, I spent most of the time flirting with you. After that, we went to eat momos together, and getting to sit there and share that simple moment with you felt special. On the way back, I kept asking, 'Puchhii kro mere cheeks pe,' and after asking a few times, you finally did. Of course, I asked again, and you gave me another puchhii. When we reached outside your society, neither of us really wanted the night to end. Before you left, I gave you a hug and a puchhii on the cheek. It was one of my favorite memories with you, and hopefully just the beginning of many more memories we'll create together.",
  },
];

const taunts = [
  "Think again puchhuuu 😏",
  "Are you sure babuuu? 🥺",
  "Wrong answer detected 🚨",
  "Nice try babu 😄",
  "System says: Try again ❤️",
  "Lagta hai missclick hua hai 😭",
  "Dil tod diya yaar 💔",
  "Error 404: Expected different answer",
];

const roman = ["I", "II", "III", "IV", "V"];

// ── CSS injected once ──
const css = `
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;1,400&family=Inter:wght@300;400;500&display=swap');

*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

body { background: #1a0a0e; }

.app {
  min-height: 100vh;
  background: linear-gradient(135deg, #1a0a0e 0%, #2d0f1a 40%, #1a0a0e 100%);
  display: flex; align-items: center; justify-content: center;
  font-family: 'Inter', sans-serif;
  position: relative; overflow: hidden; padding: 16px;
}

/* Petals */
.petals-bg { position: absolute; inset: 0; pointer-events: none; overflow: hidden; }
.petal { position: absolute; opacity: 0; animation: fall linear infinite; }
@keyframes fall {
  0%   { transform: translateY(-40px) rotate(0deg); opacity: 0.7; }
  100% { transform: translateY(110vh) rotate(720deg); opacity: 0; }
}

/* Question card */
.card {
  background: rgba(255,255,255,0.05);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255,180,200,0.2);
  border-radius: 24px;
  padding: 36px 28px;
  max-width: 440px; width: 100%;
  text-align: center; position: relative;
  animation: cardIn 0.6s cubic-bezier(0.34,1.56,0.64,1) both;
}
.card::before {
  content: ''; position: absolute; inset: 0;
  background: radial-gradient(ellipse at top, rgba(220,80,120,0.12) 0%, transparent 60%);
  pointer-events: none; border-radius: 24px;
}
@keyframes cardIn {
  from { opacity: 0; transform: translateY(30px) scale(0.92); }
  to   { opacity: 1; transform: translateY(0) scale(1); }
}

.page-indicator {
  font-size: 11px; color: rgba(255,200,215,0.4);
  margin-bottom: 20px; letter-spacing: 2px; text-transform: uppercase;
}
.big-emoji {
  font-size: 56px; margin-bottom: 14px; display: block;
  animation: pulseBig 1.5s ease-in-out infinite;
}
@keyframes pulseBig { 0%,100%{transform:scale(1);}50%{transform:scale(1.1);} }

.card-title {
  font-family: 'Playfair Display', serif;
  font-size: 28px; color: #fff; line-height: 1.25; margin-bottom: 10px;
}
.card-sub {
  font-size: 14px; color: rgba(255,200,215,0.75);
  line-height: 1.6; margin-bottom: 28px; font-weight: 300;
}

/* Buttons */
.btn-primary {
  background: linear-gradient(135deg, #e0436f, #c0294f);
  color: #fff; border: none; padding: 13px 32px;
  border-radius: 50px; font-size: 15px; font-weight: 500;
  cursor: pointer; transition: transform 0.18s, box-shadow 0.18s;
  font-family: 'Inter', sans-serif; white-space: nowrap;
}
.btn-primary:hover { transform: translateY(-2px) scale(1.03); box-shadow: 0 12px 32px rgba(200,40,80,0.4); }
.btn-primary:active { transform: scale(0.97); }

.btn-outline {
  background: rgba(255,255,255,0.08); color: #fff;
  border: 1px solid rgba(255,255,255,0.25); padding: 12px 28px;
  border-radius: 50px; font-size: 15px; font-weight: 500;
  cursor: pointer; transition: transform 0.18s, background 0.18s;
  font-family: 'Inter', sans-serif; white-space: nowrap;
}
.btn-outline:hover { background: rgba(255,255,255,0.14); transform: translateY(-2px); }

.msg-toast {
  background: rgba(220,60,100,0.15); border: 1px solid rgba(220,60,100,0.3);
  border-radius: 12px; padding: 9px 16px; color: #ffb0c8; font-size: 13px;
  margin-bottom: 18px; min-height: 38px;
  display: flex; align-items: center; justify-content: center;
}

/* Button arena — moving button stays right, static stays left */
.btn-arena { position: relative; width: 100%; height: 120px; }
.static-btn-wrap {
  position: absolute; left: 50%; top: 50%;
  transform: translate(-150%, -50%);
}
.moving-btn-wrap {
  position: absolute;
  transition: left 0.5s cubic-bezier(0.34,1.56,0.64,1),
              top  0.5s cubic-bezier(0.34,1.56,0.64,1);
  transform: translate(-50%, -50%);
}

/* Memory section */
.memory-wrap {
  max-width: 480px; width: 100%;
  animation: cardIn 0.6s cubic-bezier(0.34,1.56,0.64,1) both;
}
.mem-header { text-align: center; margin-bottom: 28px; }
.mem-header-label {
  font-size: 11px; letter-spacing: 3px; text-transform: uppercase;
  color: rgba(255,180,200,0.45); margin-bottom: 8px;
}
.mem-header-title {
  font-family: 'Playfair Display', serif;
  font-size: 28px; color: #fff; line-height: 1.2;
}
.mem-header-title em { color: #e0436f; font-style: italic; }

/* Float animations */
@keyframes floatCard  { 0%,100%{transform:translateY(0px) rotate(-0.3deg);}33%{transform:translateY(-6px) rotate(0.2deg);}66%{transform:translateY(-3px) rotate(-0.15deg);} }
@keyframes floatCard2 { 0%,100%{transform:translateY(0px) rotate(0.25deg);}40%{transform:translateY(-8px) rotate(-0.2deg);}70%{transform:translateY(-4px) rotate(0.15deg);} }
@keyframes floatCard3 { 0%,100%{transform:translateY(-2px) rotate(-0.2deg);}50%{transform:translateY(-7px) rotate(0.3deg);} }
@keyframes glowPulse  { 0%,100%{box-shadow:0 8px 32px rgba(220,60,100,0.10),0 2px 8px rgba(0,0,0,0.3);}50%{box-shadow:0 16px 48px rgba(220,60,100,0.22),0 4px 16px rgba(0,0,0,0.35);} }
@keyframes slideInRight { from{opacity:0;transform:translateX(40px) scale(0.96);}to{opacity:1;transform:translateX(0) scale(1);} }
@keyframes slideInLeft  { from{opacity:0;transform:translateX(-40px) scale(0.96);}to{opacity:1;transform:translateX(0) scale(1);} }

.mem-card {
  border-radius: 20px; overflow: hidden;
  border: 1px solid rgba(255,180,200,0.15);
}
.mem-card.float-0 { animation: floatCard  5s   ease-in-out infinite, glowPulse 5s   ease-in-out infinite; }
.mem-card.float-1 { animation: floatCard2 6.5s ease-in-out infinite, glowPulse 6.5s ease-in-out infinite; }
.mem-card.float-2 { animation: floatCard3 5.8s ease-in-out infinite, glowPulse 5.8s ease-in-out infinite; }
.mem-card.slide-right { animation: slideInRight 0.45s cubic-bezier(0.34,1.56,0.64,1) both, floatCard  5s ease-in-out 0.5s infinite, glowPulse 5s ease-in-out 0.5s infinite; }
.mem-card.slide-left  { animation: slideInLeft  0.45s cubic-bezier(0.34,1.56,0.64,1) both, floatCard2 6s ease-in-out 0.5s infinite, glowPulse 6s ease-in-out 0.5s infinite; }

/* Image */
.mem-img-wrap {
  width: 100%; height: 260px; overflow: hidden;
  background: linear-gradient(135deg, #2d0f1a, #1a0510);
  position: relative;
}
@keyframes imgBreathe { 0%,100%{transform:scale(1);}50%{transform:scale(1.03);} }
.mem-img-wrap img {
  width: 100%; height: 100%; object-fit: cover; object-position: center;
  display: block; animation: imgBreathe 7s ease-in-out infinite;
}
.mem-img-overlay {
  position: absolute; inset: 0;
  background: linear-gradient(to bottom, transparent 45%, rgba(12,4,8,0.75) 100%);
}
.mem-img-wrap::after {
  content: ''; position: absolute; top: 0; left: -60%; width: 60%; height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255,200,215,0.07), transparent);
  animation: slideShimmer 4s ease-in-out infinite;
}
@keyframes slideShimmer { 0%{left:-60%;}60%,100%{left:140%;} }

/* Card body */
.mem-body {
  background: rgba(255,255,255,0.05);
  backdrop-filter: blur(16px);
  padding: 22px 24px 0;
}
@keyframes shimmer { 0%,100%{opacity:0.6;}50%{opacity:1;} }
.mem-number {
  font-size: 11px; letter-spacing: 2px; text-transform: uppercase;
  color: #e0436f; margin-bottom: 6px; font-weight: 500;
  animation: shimmer 3s ease-in-out infinite;
}
.mem-title {
  font-family: 'Playfair Display', serif;
  font-size: 21px; color: #fff; margin-bottom: 12px; line-height: 1.3;
}
@keyframes dividerGrow { 0%,100%{width:36px;opacity:0.7;}50%{width:52px;opacity:1;} }
.mem-divider {
  height: 2px; background: linear-gradient(90deg, #e0436f, transparent);
  border-radius: 2px; margin-bottom: 14px;
  animation: dividerGrow 3s ease-in-out infinite;
}
.mem-text {
  font-size: 13.5px; color: rgba(255,200,215,0.7);
  line-height: 1.8; font-weight: 300; padding-bottom: 20px;
}

/* Nav footer */
.mem-footer {
  display: flex; align-items: center; justify-content: space-between;
  padding: 16px 24px 22px;
  background: rgba(255,255,255,0.03);
  border-top: 1px solid rgba(255,180,200,0.1);
}
.nav-btn {
  background: rgba(255,255,255,0.08); border: 1px solid rgba(255,255,255,0.15);
  color: #fff; padding: 9px 18px; border-radius: 50px; font-size: 13px;
  cursor: pointer; transition: all 0.18s;
  font-family: 'Inter', sans-serif; font-weight: 500; white-space: nowrap;
}
.nav-btn:hover:not(:disabled) { background: rgba(220,60,100,0.25); border-color: rgba(220,60,100,0.5); transform: translateY(-1px); }
.nav-btn:disabled { opacity: 0.2; cursor: default; }

.dots-row { display: flex; gap: 6px; align-items: center; }
.dot {
  width: 6px; height: 6px; border-radius: 50%;
  background: rgba(255,255,255,0.2); transition: all 0.3s; cursor: pointer;
}
.dot.active { background: #e0436f; width: 18px; border-radius: 50px; }

/* Confetti */
@keyframes confFall { 0%{transform:translateY(-20px) rotate(0deg);opacity:1;}100%{transform:translateY(110vh) rotate(720deg);opacity:0;} }
.conf-piece {
  position: fixed; width: 8px; height: 8px; border-radius: 2px;
  animation: confFall 2s ease-in forwards; pointer-events: none; z-index: 999;
}

@media (max-width: 400px) {
  .card { padding: 28px 18px; }
  .card-title { font-size: 22px; }
  .mem-img-wrap { height: 200px; }
  .mem-body { padding: 16px 16px 0; }
  .mem-title { font-size: 18px; }
  .mem-header-title { font-size: 22px; }
  .btn-primary, .btn-outline { padding: 11px 20px; font-size: 14px; }
  .nav-btn { padding: 8px 12px; font-size: 12px; }
}
`;

// Inject CSS once
if (!document.getElementById("love-app-styles")) {
  const style = document.createElement("style");
  style.id = "love-app-styles";
  style.textContent = css;
  document.head.appendChild(style);
}

// Petals component
function Petals() {
  const items = Array.from({ length: 16 }, (_, i) => ({
    id: i,
    emoji: ["🌸", "🌹", "💕", "✨", "🌺"][i % 5],
    left: `${Math.random() * 100}%`,
    delay: `${Math.random() * 8}s`,
    duration: `${6 + Math.random() * 6}s`,
    size: `${12 + Math.random() * 12}px`,
  }));
  return (
    <div className="petals-bg">
      {items.map((p) => (
        <div
          key={p.id}
          className="petal"
          style={{ left: p.left, animationDelay: p.delay, animationDuration: p.duration, fontSize: p.size }}
        >
          {p.emoji}
        </div>
      ))}
    </div>
  );
}

// Confetti burst
function launchConfetti() {
  const colors = ["#e0436f","#ff8fb3","#fff","#ffd6e7","#c0294f","#ffb0cc"];
  for (let i = 0; i < 60; i++) {
    const c = document.createElement("div");
    c.className = "conf-piece";
    c.style.left = Math.random() * 100 + "%";
    c.style.top = "-20px";
    c.style.background = colors[Math.floor(Math.random() * colors.length)];
    c.style.animationDelay = Math.random() * 1.5 + "s";
    c.style.animationDuration = 1.5 + Math.random() + "s";
    c.style.borderRadius = Math.random() > 0.5 ? "50%" : "2px";
    document.body.appendChild(c);
    setTimeout(() => c.remove(), 3500);
  }
}

// ── Pages ──

function Page0({ onNext }) {
  return (
    <div className="card">
      <div className="page-indicator">✦ A message for you ✦</div>
      <span className="big-emoji">💌</span>
      <h1 className="card-title">Hey mere cutuu puchhuuu ❤️</h1>
      <p className="card-sub">Click kro start prr sort out krte hai !!!</p>
      <button className="btn-primary" onClick={onNext}>Start 💕</button>
    </div>
  );
}

function Page1({ onYes, onNo, message, posX, posY }) {
  return (
    <div className="card">
      <div className="page-indicator">✦ Question 1 of 2 ✦</div>
      <h2 className="card-title" style={{ fontSize: "22px" }}>
        Kya aap schme merse divorce krna chahte ho puchhu? 🥺
      </h2>
      <div className="msg-toast">
        {message || <span style={{ opacity: 0.4 }}>Choose wisely...</span>}
      </div>
      <div className="btn-arena">
        <div className="static-btn-wrap">
          <button className="btn-primary" onClick={onNo}>No 😭</button>
        </div>
        <div
          className="moving-btn-wrap"
          style={{ left: `${posX}%`, top: `${posY}%` }}
        >
          <button className="btn-outline" onClick={onYes}>Yes ❤️</button>
        </div>
      </div>
    </div>
  );
}

function Page2({ onYes, onNo, message, posX, posY }) {
  return (
    <div className="card">
      <div className="page-indicator">✦ Question 2 of 2 ✦</div>
      <h2 className="card-title" style={{ fontSize: "22px" }}>
        Do you love me puchhuuu? 😭
      </h2>
      <div className="msg-toast">
        {message || <span style={{ opacity: 0.4 }}>Heart check in progress...</span>}
      </div>
      <div className="btn-arena">
        <div className="static-btn-wrap">
          <button className="btn-primary" onClick={onYes}>Yes ❤️</button>
        </div>
        <div
          className="moving-btn-wrap"
          style={{ left: `${posX}%`, top: `${posY}%` }}
        >
          <button className="btn-outline" onClick={onNo}>No 💔</button>
        </div>
      </div>
    </div>
  );
}

function Page3() {
  return (
    <div className="card">
      <span className="big-emoji">🎉</span>
      <h2 className="card-title">I Knew It! ❤️</h2>
      <p className="card-sub">
        Thanks for being honest, puchhuuu 🥰<br />
        Get ready for something special...
      </p>
      <div style={{ display: "flex", justifyContent: "center", gap: "8px", marginTop: "8px" }}>
        {["💖","✨","💖","✨","💖"].map((e, i) => (
          <span key={i} style={{ fontSize: "20px" }}>{e}</span>
        ))}
      </div>
    </div>
  );
}

function MemoryPage({ index, slideDir, onPrev, onNext, onJump }) {
  const m = memories[index];
  const floatClass = `float-${index % 3}`;
  const slideClass = slideDir > 0 ? "slide-right" : "slide-left";

  return (
    <div className="memory-wrap">
      <div className="mem-header">
        <div className="mem-header-label">✦ Our story ✦</div>
        <h1 className="mem-header-title">
          Moments I <em>cherish</em>
        </h1>
      </div>

      <div key={index} className={`mem-card ${slideClass} ${floatClass}`}>
        <div className="mem-img-wrap">
          <img src={m.image} alt={m.title} onError={(e) => (e.target.style.display = "none")} />
          <div className="mem-img-overlay" />
        </div>

        <div className="mem-body">
          <div className="mem-number">{roman[index]}</div>
          <h2 className="mem-title">{m.title} ❤️</h2>
          <div className="mem-divider" />
          <p className="mem-text">
            {m.text.split("\n").map((line, i) => (
              <span key={i}>{line}<br /></span>
            ))}
          </p>
        </div>

        <div className="mem-footer">
          <button className="nav-btn" onClick={onPrev} disabled={index === 0}>
            ← Previous
          </button>
          <div className="dots-row">
            {memories.map((_, i) => (
              <div
                key={i}
                className={`dot ${i === index ? "active" : ""}`}
                onClick={() => onJump(i)}
              />
            ))}
          </div>
          <button className="nav-btn" onClick={onNext} disabled={index === memories.length - 1}>
            Next →
          </button>
        </div>
      </div>

      <div style={{ textAlign: "center", marginTop: "28px", color: "rgba(255,180,200,0.3)", fontSize: "18px", letterSpacing: "8px" }}>
        ❤ ❤ ❤
      </div>
    </div>
  );
}

// ── Main App ──
export default function App() {
  const [page, setPage] = useState(0);
  const [message, setMessage] = useState("");
  const [posX, setPosX] = useState(72);
  const [posY, setPosY] = useState(50);
  const [memIndex, setMemIndex] = useState(0);
  const [slideDir, setSlideDir] = useState(1);

  // Auto-advance from celebration to memories
  useEffect(() => {
    if (page === 3) {
      launchConfetti();
      const t = setTimeout(() => { setPage(4); setMemIndex(0); }, 4500);
      return () => clearTimeout(t);
    }
  }, [page]);

  const moveButton = () => {
    let newX, newY, attempts = 0;
    do {
      newX = 55 + Math.random() * 35;
      newY = 15 + Math.random() * 70;
      attempts++;
    } while (Math.abs(newX - posX) < 12 && Math.abs(newY - posY) < 12 && attempts < 10);
    setPosX(newX);
    setPosY(newY);
    setMessage(taunts[Math.floor(Math.random() * taunts.length)]);
  };

  const resetBtn = () => { setPosX(72); setPosY(50); setMessage(""); };

  const navMem = (dir) => {
    const next = memIndex + dir;
    if (next >= 0 && next < memories.length) {
      setSlideDir(dir);
      setMemIndex(next);
    }
  };

  const jumpMem = (i) => {
    setSlideDir(i >= memIndex ? 1 : -1);
    setMemIndex(i);
  };

  return (
    <div className="app">
      <Petals />

      {page === 0 && (
        <Page0 onNext={() => { setPage(1); resetBtn(); }} />
      )}

      {page === 1 && (
        <Page1
          message={message}
          posX={posX} posY={posY}
          onNo={() => { setPage(2); resetBtn(); }}
          onYes={moveButton}
        />
      )}

      {page === 2 && (
        <Page2
          message={message}
          posX={posX} posY={posY}
          onYes={() => setPage(3)}
          onNo={moveButton}
        />
      )}

      {page === 3 && <Page3 />}

      {page === 4 && (
        <MemoryPage
          index={memIndex}
          slideDir={slideDir}
          onPrev={() => navMem(-1)}
          onNext={() => navMem(1)}
          onJump={jumpMem}
        />
      )}
    </div>
  );
}
