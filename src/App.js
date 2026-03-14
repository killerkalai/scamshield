import { useState, useEffect } from "react";
import { Analytics } from "@vercel/analytics/react";

const API_KEY = process.env.REACT_APP_API_KEY;

const EXAMPLES = [
  { label: "📱 Suspicious SMS", text: "URGENT: Your Bank of America account has been LOCKED due to suspicious activity. Verify now or lose access permanently: http://boa-secure-verify.net/login" },
  { label: "💼 Fake Job Offer", text: "Hello! We found your resume online. We offer $5,000/week work from home. No experience needed. Just send $200 registration fee to start immediately. Reply YES to apply." },
  { label: "🎁 Prize Scam", text: "Congratulations! You have been selected as a winner of our $1,000,000 lottery. To claim your prize, please provide your Social Security Number and pay a $50 processing fee." },
  { label: "✅ Legitimate Message", text: "Hi, this is a reminder from your dentist office that you have an appointment scheduled for tomorrow at 2pm. Reply CONFIRM to confirm or call us at (555) 234-5678 to reschedule." },
];

const VERDICT_CONFIG = {
  DANGER: { color: "#ff3b3b", bg: "rgba(255,59,59,0.08)", border: "rgba(255,59,59,0.3)", icon: "⛔", label: "CONFIRMED SCAM", glow: "0 0 60px rgba(255,59,59,0.25)" },
  WARNING: { color: "#ffb800", bg: "rgba(255,184,0,0.08)", border: "rgba(255,184,0,0.3)", icon: "⚠️", label: "SUSPICIOUS", glow: "0 0 60px rgba(255,184,0,0.25)" },
  SAFE: { color: "#00d97e", bg: "rgba(0,217,126,0.08)", border: "rgba(0,217,126,0.3)", icon: "✅", label: "LOOKS SAFE", glow: "0 0 60px rgba(0,217,126,0.25)" },
};

function Particles() {
  const particles = Array.from({ length: 24 }, (_, i) => ({
    id: i, x: Math.random() * 100, y: Math.random() * 100,
    size: Math.random() * 3 + 1, dur: Math.random() * 12 + 8,
    delay: Math.random() * 8, opacity: Math.random() * 0.4 + 0.1,
  }));
  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 0, pointerEvents: "none" }}>
      {particles.map(p => (
        <div key={p.id} style={{ position: "absolute", left: `${p.x}%`, top: `${p.y}%`, width: `${p.size}px`, height: `${p.size}px`, borderRadius: "50%", background: "#ffb800", opacity: p.opacity, animation: `floatUp ${p.dur}s ${p.delay}s infinite linear` }} />
      ))}
    </div>
  );
}

function Counter({ target, color }) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    let start = 0;
    const step = target / 40;
    const timer = setInterval(() => {
      start += step;
      if (start >= target) { setVal(target); clearInterval(timer); }
      else setVal(Math.floor(start));
    }, 30);
    return () => clearInterval(timer);
  }, [target]);
  return <span style={{ color, fontWeight: 700, fontSize: "22px" }}>{val}</span>;
}

function GlitchText({ text, color }) {
  const [glitch, setGlitch] = useState(false);
  useEffect(() => {
    const id = setInterval(() => { setGlitch(true); setTimeout(() => setGlitch(false), 200); }, 4000);
    return () => clearInterval(id);
  }, []);
  return <span style={{ color, display: "inline-block", textShadow: glitch ? `2px 0 #ff3b3b, -2px 0 #00d97e` : "none", transform: glitch ? "skewX(-2deg)" : "none", transition: "transform 0.1s" }}>{text}</span>;
}

function ScanBar() {
  return (
    <div style={{ width: "100%", height: "3px", background: "rgba(255,184,0,0.1)", borderRadius: "2px", overflow: "hidden", marginBottom: "20px" }}>
      <div style={{ height: "100%", width: "40%", background: "linear-gradient(90deg, transparent, #ffb800, transparent)", animation: "scanMove 1.2s ease-in-out infinite", borderRadius: "2px" }} />
    </div>
  );
}

function RadarPulse({ color }) {
  return (
    <div style={{ position: "relative", width: "60px", height: "60px", margin: "0 auto 20px" }}>
      {[0, 1, 2].map(i => (
        <div key={i} style={{ position: "absolute", inset: 0, border: `2px solid ${color}`, borderRadius: "50%", opacity: 0, animation: `radarPulse 2s ${i * 0.6}s infinite ease-out` }} />
      ))}
      <div style={{ position: "absolute", inset: "18px", background: color, borderRadius: "50%", boxShadow: `0 0 20px ${color}`, animation: "pulseGlow 1.5s infinite alternate" }} />
    </div>
  );
}

// ── NAVBAR ──
function Navbar({ page, setPage }) {
  const links = ["Home", "About", "Privacy", "Contact"];
  return (
    <nav style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 100, background: "rgba(7,11,16,0.9)", backdropFilter: "blur(12px)", borderBottom: "1px solid rgba(255,184,0,0.1)", padding: "0 24px", display: "flex", alignItems: "center", justifyContent: "space-between", height: "56px" }}>
      <span onClick={() => setPage("Home")} style={{ color: "#ffb800", fontWeight: "800", fontSize: "16px", cursor: "pointer", fontFamily: "'IBM Plex Mono',monospace", letterSpacing: "-0.03em" }}>SCAM<span style={{ color: "#f0f4f8" }}>SHIELD</span></span>
      <div style={{ display: "flex", gap: "8px" }}>
        {links.map(l => (
          <button key={l} onClick={() => setPage(l)}
            style={{ background: page === l ? "rgba(255,184,0,0.1)" : "none", border: page === l ? "1px solid rgba(255,184,0,0.3)" : "1px solid transparent", color: page === l ? "#ffb800" : "rgba(200,212,224,0.5)", padding: "6px 12px", borderRadius: "4px", fontSize: "11px", cursor: "pointer", fontFamily: "inherit", transition: "all 0.2s", textTransform: "uppercase", letterSpacing: "0.08em" }}
            onMouseEnter={e => { if (page !== l) { e.currentTarget.style.color = "#ffb800"; e.currentTarget.style.borderColor = "rgba(255,184,0,0.2)"; } }}
            onMouseLeave={e => { if (page !== l) { e.currentTarget.style.color = "rgba(200,212,224,0.5)"; e.currentTarget.style.borderColor = "transparent"; } }}
          >{l}</button>
        ))}
      </div>
    </nav>
  );
}

// ── ABOUT PAGE ──
function AboutPage() {
  return (
    <div style={{ maxWidth: "680px", margin: "0 auto", padding: "100px 24px 80px", animation: "fadeSlideUp 0.5s both" }}>
      <div style={{ textAlign: "center", marginBottom: "48px" }}>
        <div style={{ fontSize: "48px", marginBottom: "16px" }}>🛡️</div>
        <h1 style={{ fontSize: "36px", fontWeight: "800", color: "#f0f4f8", marginBottom: "12px" }}>About ScamShield</h1>
        <p style={{ color: "rgba(200,212,224,0.5)", fontSize: "14px" }}>Protecting people from online scams using AI</p>
      </div>
      {[
        { title: "Our Mission", text: "ScamShield was built to protect everyday people from online scams and fraud. Every day, millions of people receive suspicious messages and don't know if they're real or fake. We use advanced AI to instantly analyze any message and tell you if it's a scam." },
        { title: "How It Works", text: "Simply paste any suspicious text message, email, WhatsApp message, or any other communication into our scanner. Our AI analyzes the message for common scam patterns, suspicious links, urgency tactics, and other red flags — then gives you a clear verdict in seconds." },
        { title: "100% Free & Private", text: "ScamShield is completely free to use. We never store your messages. Everything is analyzed in real-time and discarded immediately. Your privacy is our top priority." },
        { title: "Who Built This?", text: "ScamShield was built by an independent developer passionate about cybersecurity and protecting people from online fraud, especially targeting elderly people and those unfamiliar with digital scams." },
      ].map(({ title, text }) => (
        <div key={title} style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: "12px", padding: "24px", marginBottom: "16px" }}>
          <h2 style={{ color: "#ffb800", fontSize: "16px", marginBottom: "10px", fontFamily: "'IBM Plex Mono',monospace" }}>{title}</h2>
          <p style={{ color: "rgba(200,212,224,0.7)", fontSize: "14px", lineHeight: "1.8", margin: 0, fontFamily: "sans-serif" }}>{text}</p>
        </div>
      ))}
    </div>
  );
}

// ── PRIVACY PAGE ──
function PrivacyPage() {
  const sections = [
    { title: "1. Information We Collect", text: "ScamShield does not collect, store, or share any personal information. Messages you submit for analysis are processed in real-time and are never saved to any database or server." },
    { title: "2. How We Use Information", text: "The text you submit is sent to an AI API for analysis only. No message content is stored, logged, or used for any other purpose. We do not sell, trade, or share your data with third parties." },
    { title: "3. Cookies", text: "ScamShield uses minimal cookies only for basic website functionality and anonymous analytics to understand how many visitors use our site. No personal data is collected through cookies." },
    { title: "4. Third Party Services", text: "We use Groq AI API to analyze messages. Vercel is used for hosting and anonymous analytics. These services have their own privacy policies. No personal data is shared with these services." },
    { title: "5. Children's Privacy", text: "ScamShield does not knowingly collect data from children under 13. Our service is intended for general audiences." },
    { title: "6. Changes to Privacy Policy", text: "We may update this Privacy Policy from time to time. Any changes will be posted on this page. Continued use of ScamShield constitutes acceptance of the updated policy." },
    { title: "7. Contact Us", text: "If you have any questions about this Privacy Policy, please contact us through our Contact page." },
  ];
  return (
    <div style={{ maxWidth: "680px", margin: "0 auto", padding: "100px 24px 80px", animation: "fadeSlideUp 0.5s both" }}>
      <div style={{ textAlign: "center", marginBottom: "48px" }}>
        <div style={{ fontSize: "48px", marginBottom: "16px" }}>🔒</div>
        <h1 style={{ fontSize: "36px", fontWeight: "800", color: "#f0f4f8", marginBottom: "12px" }}>Privacy Policy</h1>
        <p style={{ color: "rgba(200,212,224,0.5)", fontSize: "13px" }}>Last updated: March 2026</p>
      </div>
      <div style={{ background: "rgba(255,184,0,0.06)", border: "1px solid rgba(255,184,0,0.2)", borderRadius: "10px", padding: "16px 20px", marginBottom: "24px" }}>
        <p style={{ color: "#ffb800", fontSize: "13px", margin: 0, fontFamily: "sans-serif" }}>🛡️ <strong>Short version:</strong> We don't collect, store, or sell your data. Ever.</p>
      </div>
      {sections.map(({ title, text }) => (
        <div key={title} style={{ borderBottom: "1px solid rgba(255,255,255,0.05)", padding: "20px 0" }}>
          <h2 style={{ color: "#f0f4f8", fontSize: "15px", marginBottom: "10px", fontFamily: "'IBM Plex Mono',monospace" }}>{title}</h2>
          <p style={{ color: "rgba(200,212,224,0.65)", fontSize: "14px", lineHeight: "1.8", margin: 0, fontFamily: "sans-serif" }}>{text}</p>
        </div>
      ))}
    </div>
  );
}

// ── CONTACT PAGE ──
const EMAILJS_SERVICE = "service_3zbuqcn";
const EMAILJS_TEMPLATE = "template_tq2nc1i";
const EMAILJS_PUBLIC = "ZwwUdYtvEea3pO--H";

function ContactPage() {
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });

  function handleSubmit() {
    if (!form.name || !form.email || !form.message) { setError("Please fill in all fields!"); return; }
    const subject = encodeURIComponent(form.subject || "Message from ScamShield");
    const body = encodeURIComponent(`Name: ${form.name}\nEmail: ${form.email}\n\nMessage:\n${form.message}`);
    window.location.href = `mailto:nobodyai.contact@gmail.com?subject=${subject}&body=${body}`;
    setSent(true);
  }

  return (
    <div style={{ maxWidth: "500px", margin: "0 auto", padding: "100px 24px 80px", animation: "fadeSlideUp 0.5s both" }}>
      <div style={{ textAlign: "center", marginBottom: "40px" }}>
        <div style={{ fontSize: "48px", marginBottom: "16px" }}>📬</div>
        <h1 style={{ fontSize: "36px", fontWeight: "800", color: "#f0f4f8", marginBottom: "12px" }}>Contact Us</h1>
        <p style={{ color: "rgba(200,212,224,0.5)", fontSize: "14px" }}>Have a question or found a bug? Let us know!</p>
      </div>
      {sent ? (
        <div style={{ textAlign: "center", background: "rgba(0,217,126,0.08)", border: "1px solid rgba(0,217,126,0.3)", borderRadius: "12px", padding: "40px" }}>
          <div style={{ fontSize: "48px", marginBottom: "16px" }}>✅</div>
          <p style={{ color: "#00d97e", fontSize: "16px", fontWeight: "700" }}>Message Sent!</p>
          <p style={{ color: "rgba(200,212,224,0.5)", fontSize: "14px" }}>We'll get back to you soon.</p>
        </div>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          {[["Your Name", "text", "John Doe", "name"], ["Your Email", "email", "john@example.com", "email"], ["Subject", "text", "I found a bug...", "subject"]].map(([label, type, placeholder, key]) => (
            <div key={key}>
              <label style={{ fontSize: "11px", color: "rgba(200,212,224,0.4)", textTransform: "uppercase", letterSpacing: "0.1em", display: "block", marginBottom: "8px" }}>{label}</label>
              <input type={type} placeholder={placeholder} value={form[key]}
                onChange={e => setForm({ ...form, [key]: e.target.value })}
                style={{ width: "100%", background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.09)", borderRadius: "8px", padding: "14px 16px", color: "#f0f4f8", fontSize: "14px", fontFamily: "inherit", outline: "none", boxSizing: "border-box", transition: "all 0.2s" }}
                onFocus={e => e.target.style.borderColor = "rgba(255,184,0,0.5)"}
                onBlur={e => e.target.style.borderColor = "rgba(255,255,255,0.09)"}
              />
            </div>
          ))}
          <div>
            <label style={{ fontSize: "11px", color: "rgba(200,212,224,0.4)", textTransform: "uppercase", letterSpacing: "0.1em", display: "block", marginBottom: "8px" }}>Message</label>
            <textarea placeholder="Your message here..." rows={5} value={form.message}
              onChange={e => setForm({ ...form, message: e.target.value })}
              style={{ width: "100%", background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.09)", borderRadius: "8px", padding: "14px 16px", color: "#f0f4f8", fontSize: "14px", fontFamily: "inherit", outline: "none", resize: "none", boxSizing: "border-box", transition: "all 0.2s" }}
              onFocus={e => e.target.style.borderColor = "rgba(255,184,0,0.5)"}
              onBlur={e => e.target.style.borderColor = "rgba(255,255,255,0.09)"}
            />
          </div>
          {error && <div style={{ color: "#ff6b6b", fontSize: "13px", padding: "12px", background: "rgba(255,59,59,0.08)", borderRadius: "8px", border: "1px solid rgba(255,59,59,0.2)" }}>⚠ {error}</div>}
          <button onClick={handleSubmit} disabled={sending}
            style={{ width: "100%", padding: "16px", background: sending ? "rgba(255,184,0,0.2)" : "linear-gradient(135deg,#ffb800,#ffd000)", border: "none", borderRadius: "8px", color: sending ? "rgba(255,184,0,0.5)" : "#080c12", fontSize: "13px", fontWeight: "800", letterSpacing: "0.1em", textTransform: "uppercase", cursor: sending ? "not-allowed" : "pointer", fontFamily: "inherit", transition: "all 0.3s" }}
            onMouseEnter={e => { if (!sending) { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = "0 8px 30px rgba(255,184,0,0.3)"; } }}
            onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "none"; }}
          >{sending ? "Sending..." : "Send Message 📨"}</button>
        </div>
      )}
      <div style={{ textAlign: "center", marginTop: "32px", padding: "20px", background: "rgba(255,255,255,0.02)", borderRadius: "10px", border: "1px solid rgba(255,255,255,0.06)" }}>
        <p style={{ color: "rgba(200,212,224,0.4)", fontSize: "13px", margin: 0, fontFamily: "sans-serif" }}>You can also reach us at<br /><span style={{ color: "#ffb800" }}>nobodyai.contact@gmail.com</span></p>
      </div>
    </div>
  );
}

// ── MAIN HOME PAGE ──
function HomePage() {
  const [input, setText] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [scanStage, setScanStage] = useState(0);

  const stages = ["Initializing scanner", "Parsing message content", "Running AI analysis", "Cross-checking patterns", "Generating report"];

  useEffect(() => {
    if (!loading) { setScanStage(0); return; }
    let i = 0;
    const id = setInterval(() => { i = (i + 1) % stages.length; setScanStage(i); }, 900);
    return () => clearInterval(id);
  }, [loading]);

  async function analyze() {
    if (!input.trim()) return;
    setLoading(true); setResult(null); setError("");
    const systemPrompt = `You are ScamShield, an expert scam and fraud detection AI. Analyze messages for scam indicators with precision.
Respond ONLY in this exact JSON format (no markdown, no extra text):
{"verdict":"DANGER"|"WARNING"|"SAFE","scamType":"string","riskScore":0-100,"summary":"1-2 sentences","redFlags":["flag1","flag2"],"whatToDo":["action1","action2"]}`;
    try {
      const res = await fetch("https://api.groq.com/openai/v1/chat/completions", {
        method: "POST",
        headers: { "Content-Type": "application/json", "Authorization": `Bearer ${API_KEY}` },
        body: JSON.stringify({
          model: "llama-3.3-70b-versatile", max_tokens: 1000,
          messages: [{ role: "system", content: systemPrompt }, { role: "user", content: `Analyze this message:\n\n"${input}"` }],
        }),
      });
      const data = await res.json();
      const text = data.choices?.[0]?.message?.content || "";
      const parsed = JSON.parse(text.replace(/```json|```/g, "").trim());
      setResult(parsed);
    } catch { setError("Analysis failed. Please try again."); }
    finally { setLoading(false); }
  }

  const cfg = result ? VERDICT_CONFIG[result.verdict] || VERDICT_CONFIG.WARNING : null;

  return (
    <div style={{ maxWidth: "680px", margin: "0 auto", padding: "100px 24px 80px" }}>
      <div style={{ textAlign: "center", marginBottom: "48px" }}>
        <div style={{ display: "inline-flex", alignItems: "center", gap: "8px", background: "rgba(255,184,0,0.08)", border: "1px solid rgba(255,184,0,0.2)", color: "#ffb800", padding: "6px 18px", borderRadius: "4px", fontSize: "10px", letterSpacing: "0.15em", marginBottom: "28px", textTransform: "uppercase", animation: "borderGlow 3s infinite" }}>
          <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#ffb800", boxShadow: "0 0 8px #ffb800", display: "inline-block", animation: "blink 1.5s infinite" }} />
          ACTIVE PROTECTION · ONLINE
        </div>
        <h1 style={{ fontSize: "clamp(52px,9vw,80px)", fontWeight: "800", lineHeight: "1", letterSpacing: "-0.05em", marginBottom: "14px", fontFamily: "'IBM Plex Mono',monospace", color: "#f0f4f8", animation: "titlePulse 4s infinite", cursor: "default" }}>
          SCAM<GlitchText text="SHIELD" color="#ffb800" />
        </h1>
        <p style={{ fontSize: "14px", color: "rgba(200,212,224,0.45)", lineHeight: "1.7", maxWidth: "400px", margin: "0 auto", fontFamily: "sans-serif", fontWeight: "300" }}>
          Paste any suspicious text, email, or message.<br />AI detects scams in seconds — free, private, instant.
        </p>
        <div style={{ display: "flex", justifyContent: "center", gap: "40px", marginTop: "28px", paddingTop: "24px", borderTop: "1px solid rgba(255,255,255,0.05)" }}>
          {[["$1T+", "Lost to scams/year"], ["3.2B", "Scam msgs daily"], ["Free", "Always"]].map(([val, label], i) => (
            <div key={label} style={{ textAlign: "center", animation: `countIn 0.6s ${0.3 + i * 0.15}s both` }}>
              <div style={{ fontSize: "18px", fontWeight: "700", background: "linear-gradient(90deg,#ffb800,#ffd000,#ffb800)", backgroundSize: "200% auto", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", animation: "shimmer 3s linear infinite" }}>{val}</div>
              <div style={{ fontSize: "10px", color: "rgba(200,212,224,0.3)", textTransform: "uppercase", letterSpacing: "0.08em" }}>{label}</div>
            </div>
          ))}
        </div>
      </div>

      <div style={{ marginBottom: "16px" }}>
        <div style={{ fontSize: "10px", color: "rgba(200,212,224,0.3)", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "10px" }}>Try an example →</div>
        <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
          {EXAMPLES.map((ex, i) => (
            <button key={ex.label} onClick={() => { setText(ex.text); setResult(null); }}
              style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.09)", color: "rgba(200,212,224,0.65)", padding: "7px 13px", borderRadius: "4px", fontSize: "11px", cursor: "pointer", fontFamily: "inherit", transition: "all 0.25s", animation: `fadeSlideUp 0.5s ${0.1 * i}s both` }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = "rgba(255,184,0,0.5)"; e.currentTarget.style.color = "#ffb800"; e.currentTarget.style.background = "rgba(255,184,0,0.07)"; e.currentTarget.style.transform = "translateY(-2px)"; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.09)"; e.currentTarget.style.color = "rgba(200,212,224,0.65)"; e.currentTarget.style.background = "rgba(255,255,255,0.03)"; e.currentTarget.style.transform = "translateY(0)"; }}
            >{ex.label}</button>
          ))}
        </div>
      </div>

      <div style={{ position: "relative", marginBottom: "14px" }}>
        <textarea value={input} onChange={e => { setText(e.target.value); setResult(null); }}
          placeholder="Paste suspicious message here..." rows={6}
          style={{ width: "100%", background: "rgba(255,255,255,0.025)", border: "1px solid rgba(255,255,255,0.09)", borderRadius: "10px", padding: "20px", color: "#f0f4f8", fontSize: "14px", lineHeight: "1.75", fontFamily: "inherit", resize: "none", outline: "none", transition: "all 0.3s", boxSizing: "border-box" }}
          onFocus={e => { e.target.style.borderColor = "rgba(255,184,0,0.5)"; e.target.style.boxShadow = "0 0 0 3px rgba(255,184,0,0.07)"; }}
          onBlur={e => { e.target.style.borderColor = "rgba(255,255,255,0.09)"; e.target.style.boxShadow = "none"; }}
        />
        {input && <button onClick={() => { setText(""); setResult(null); }} style={{ position: "absolute", top: "12px", right: "12px", background: "none", border: "none", color: "rgba(200,212,224,0.25)", cursor: "pointer", fontSize: "18px", lineHeight: 1, padding: "4px", transition: "color 0.2s" }} onMouseEnter={e => e.currentTarget.style.color = "#ff3b3b"} onMouseLeave={e => e.currentTarget.style.color = "rgba(200,212,224,0.25)"}>✕</button>}
        {input && <div style={{ position: "absolute", bottom: "12px", right: "16px", fontSize: "10px", color: "rgba(200,212,224,0.2)" }}>{input.length} chars</div>}
      </div>

      <button onClick={analyze} disabled={loading || !input.trim()}
        style={{ width: "100%", padding: "17px", background: loading ? "rgba(255,184,0,0.12)" : (!input.trim() ? "rgba(255,184,0,0.08)" : "linear-gradient(135deg,#ffb800,#ffd000)"), border: "1px solid", borderColor: !input.trim() ? "rgba(255,184,0,0.15)" : "rgba(255,184,0,0.6)", borderRadius: "8px", color: loading || !input.trim() ? "rgba(255,184,0,0.4)" : "#080c12", fontSize: "13px", fontWeight: "800", letterSpacing: "0.12em", textTransform: "uppercase", cursor: loading || !input.trim() ? "not-allowed" : "pointer", fontFamily: "inherit", transition: "all 0.3s", boxShadow: input.trim() && !loading ? "0 0 30px rgba(255,184,0,0.2)" : "none" }}
        onMouseEnter={e => { if (!loading && input.trim()) { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = "0 8px 40px rgba(255,184,0,0.35)"; } }}
        onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = input.trim() && !loading ? "0 0 30px rgba(255,184,0,0.2)" : "none"; }}
      >
        {loading ? (
          <span style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "12px" }}>
            <span style={{ width: "14px", height: "14px", border: "2px solid rgba(255,184,0,0.3)", borderTopColor: "#ffb800", borderRadius: "50%", display: "inline-block", animation: "spin 0.8s linear infinite" }} />
            {stages[scanStage]}...
          </span>
        ) : "⚡ SCAN FOR SCAM"}
      </button>

      {loading && <div style={{ marginTop: "16px" }}><ScanBar /></div>}
      {error && <div style={{ marginTop: "16px", padding: "14px", background: "rgba(255,59,59,0.08)", border: "1px solid rgba(255,59,59,0.2)", borderRadius: "8px", color: "#ff6b6b", fontSize: "13px" }}>⚠ {error}</div>}

      {result && cfg && (
        <div style={{ marginTop: "28px", border: `1px solid ${cfg.border}`, borderRadius: "14px", background: cfg.bg, boxShadow: cfg.glow, overflow: "hidden", animation: "fadeSlideUp 0.6s cubic-bezier(0.16,1,0.3,1)" }}>
          <div style={{ padding: "32px 28px 24px", borderBottom: `1px solid ${cfg.border}`, textAlign: "center" }}>
            <RadarPulse color={cfg.color} />
            <div style={{ fontSize: "11px", color: cfg.color, letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: "6px" }}>{cfg.icon} {cfg.label}</div>
            <div style={{ fontSize: "22px", fontWeight: "700", color: "#f0f4f8", fontFamily: "sans-serif", marginBottom: "20px" }}>{result.scamType}</div>
            <div style={{ maxWidth: "300px", margin: "0 auto" }}>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: "11px", color: "rgba(200,212,224,0.4)", marginBottom: "8px" }}>
                <span>RISK SCORE</span><Counter target={result.riskScore} color={cfg.color} />
              </div>
              <div style={{ height: "8px", background: "rgba(255,255,255,0.06)", borderRadius: "4px", overflow: "hidden" }}>
                <div style={{ height: "100%", borderRadius: "4px", width: `${result.riskScore}%`, background: result.riskScore > 70 ? "linear-gradient(90deg,#ff8c00,#ff3b3b)" : result.riskScore > 40 ? "linear-gradient(90deg,#ffd000,#ffb800)" : "linear-gradient(90deg,#00b368,#00d97e)", boxShadow: `0 0 12px ${cfg.color}`, transition: "width 1.2s cubic-bezier(0.16,1,0.3,1)" }} />
              </div>
            </div>
          </div>
          <div style={{ padding: "22px 28px", borderBottom: `1px solid ${cfg.border}` }}>
            <p style={{ fontSize: "14px", color: "rgba(240,244,248,0.85)", lineHeight: "1.8", fontFamily: "sans-serif", margin: 0 }}>{result.summary}</p>
          </div>
          <div style={{ padding: "22px 28px", borderBottom: `1px solid ${cfg.border}` }}>
            <div style={{ fontSize: "10px", color: "rgba(200,212,224,0.35)", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "14px" }}>{result.verdict === "SAFE" ? "✓ Positive Signals" : "⚑ Red Flags Detected"}</div>
            <div style={{ display: "flex", flexDirection: "column", gap: "9px" }}>
              {result.redFlags.map((flag, i) => (
                <div key={i} style={{ display: "flex", gap: "10px", alignItems: "flex-start", animation: `flagIn 0.4s ${i * 0.1}s both` }}>
                  <span style={{ color: cfg.color, fontSize: "13px", marginTop: "1px", flexShrink: 0 }}>{result.verdict === "SAFE" ? "✓" : "→"}</span>
                  <span style={{ fontSize: "13px", color: "rgba(240,244,248,0.75)", lineHeight: "1.55", fontFamily: "sans-serif" }}>{flag}</span>
                </div>
              ))}
            </div>
          </div>
          <div style={{ padding: "22px 28px" }}>
            <div style={{ fontSize: "10px", color: "rgba(200,212,224,0.35)", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "14px" }}>◈ What You Should Do</div>
            <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
              {result.whatToDo.map((action, i) => (
                <div key={i} style={{ display: "flex", gap: "14px", alignItems: "flex-start", background: "rgba(255,255,255,0.025)", padding: "14px 16px", borderRadius: "8px", border: "1px solid rgba(255,255,255,0.06)", transition: "all 0.2s" }}
                  onMouseEnter={e => { e.currentTarget.style.background = "rgba(255,255,255,0.05)"; e.currentTarget.style.borderColor = cfg.border; }}
                  onMouseLeave={e => { e.currentTarget.style.background = "rgba(255,255,255,0.025)"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.06)"; }}
                >
                  <span style={{ width: "24px", height: "24px", borderRadius: "50%", background: cfg.color, color: "#080c12", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "11px", fontWeight: "800", flexShrink: 0 }}>{i + 1}</span>
                  <span style={{ fontSize: "13px", color: "rgba(240,244,248,0.8)", lineHeight: "1.6", fontFamily: "sans-serif", paddingTop: "3px" }}>{action}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      <div style={{ textAlign: "center", marginTop: "56px", fontSize: "11px", color: "rgba(200,212,224,0.18)", lineHeight: "2" }}>
        <div>ScamShield AI · Powered by Groq AI · 100% Free</div>
        <div>Your messages are never stored · Built to protect everyone</div>
      </div>
    </div>
  );
}

// ── ROOT APP ──
export default function App() {
  const [page, setPage] = useState("Home");
  const [animateIn, setAnimateIn] = useState(false);
  useEffect(() => { setTimeout(() => setAnimateIn(true), 100); }, []);

  return (
    <div style={{ minHeight: "100vh", background: "#070b10", fontFamily: "'IBM Plex Mono','Courier New',monospace", color: "#c8d4e0", overflowX: "hidden", opacity: animateIn ? 1 : 0, transition: "opacity 0.6s" }}>
      <style>{`
        @keyframes floatUp { 0%{transform:translateY(0) scale(1);opacity:0} 10%{opacity:1} 90%{opacity:0.5} 100%{transform:translateY(-100vh) scale(0.5);opacity:0} }
        @keyframes scanMove { 0%{transform:translateX(-200%)} 100%{transform:translateX(350%)} }
        @keyframes radarPulse { 0%{transform:scale(0.5);opacity:0.8} 100%{transform:scale(2.5);opacity:0} }
        @keyframes pulseGlow { from{box-shadow:0 0 10px currentColor} to{box-shadow:0 0 30px currentColor,0 0 60px currentColor} }
        @keyframes fadeSlideUp { from{opacity:0;transform:translateY(24px)} to{opacity:1;transform:translateY(0)} }
        @keyframes shimmer { 0%{background-position:-200% center} 100%{background-position:200% center} }
        @keyframes borderGlow { 0%,100%{box-shadow:0 0 10px rgba(255,184,0,0.1)} 50%{box-shadow:0 0 30px rgba(255,184,0,0.4)} }
        @keyframes spin { to{transform:rotate(360deg)} }
        @keyframes blink { 0%,100%{opacity:1} 50%{opacity:0.3} }
        @keyframes flagIn { from{opacity:0;transform:translateX(-12px)} to{opacity:1;transform:translateX(0)} }
        @keyframes countIn { from{opacity:0;transform:scale(0.7)} to{opacity:1;transform:scale(1)} }
        @keyframes gridScroll { from{background-position:0 0} to{background-position:0 40px} }
        @keyframes titlePulse { 0%,100%{text-shadow:0 0 30px rgba(255,184,0,0.3)} 50%{text-shadow:0 0 60px rgba(255,184,0,0.6)} }
      `}</style>

      <Particles />
      <div style={{ position: "fixed", inset: 0, zIndex: 0, pointerEvents: "none", backgroundImage: "linear-gradient(rgba(255,184,0,0.04) 1px,transparent 1px),linear-gradient(90deg,rgba(255,184,0,0.04) 1px,transparent 1px)", backgroundSize: "40px 40px", animation: "gridScroll 8s linear infinite" }} />
      <div style={{ position: "fixed", top: "-300px", left: "50%", transform: "translateX(-50%)", width: "900px", height: "600px", background: "radial-gradient(ellipse at center, rgba(255,184,0,0.07) 0%, rgba(255,184,0,0.02) 40%, transparent 70%)", pointerEvents: "none", zIndex: 0 }} />

      <Navbar page={page} setPage={setPage} />

      <div style={{ position: "relative", zIndex: 1 }}>
        {page === "Home" && <HomePage />}
        {page === "About" && <AboutPage />}
        {page === "Privacy" && <PrivacyPage />}
        {page === "Contact" && <ContactPage />}
      </div>

      <Analytics />
    </div>
  );
}
