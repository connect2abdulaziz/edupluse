import { useState, useEffect, useRef, useMemo } from "react";

/* ══════════════════════════════════════════════════════
   DESIGN SYSTEM — Warm editorial, no gradients
   ══════════════════════════════════════════════════════ */
const T = {
  bg: "#F5F3EE", surface: "#FFFFFF", surfaceAlt: "#FAFAF7",
  border: "#E5E2DB", borderFocus: "#2D2A26",
  text: "#1A1714", textMuted: "#7A756D", textLight: "#B0AAA0",
  accent: "#C45D3E", accentBg: "#FDF0EC",
  success: "#2D8A56", successBg: "#EDF7F0",
  warn: "#D4930D", warnBg: "#FEF7E6",
  info: "#3B6FC2", infoBg: "#EDF2FB",
  danger: "#C23B3B", dangerBg: "#FDECEC",
  dark: "#1A1714", darkSurface: "#242220",
  radius: "10px", radiusSm: "6px", radiusLg: "16px",
  shadow: "0 1px 3px rgba(0,0,0,0.06)",
  shadowLg: "0 4px 16px rgba(0,0,0,0.08)",
  shadowXl: "0 12px 40px rgba(0,0,0,0.12)",
  font: "'DM Sans', sans-serif",
  fontDisplay: "'Playfair Display', serif",
  fontMono: "'JetBrains Mono', monospace",
};

/* ── SVG Icon System ─── */
const Icon = ({ d, size = 18, color = T.textMuted, style: s, ...rest }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" style={s} {...rest}><path d={d} /></svg>
);
const icons = {
  home: "M3 9.5L12 3l9 6.5V20a1 1 0 01-1 1H4a1 1 0 01-1-1V9.5z",
  users: "M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4-4v2M9 11a4 4 0 100-8 4 4 0 000 8zM23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75",
  calendar: "M4 4h16a2 2 0 012 2v14a2 2 0 01-2 2H4a2 2 0 01-2-2V6a2 2 0 012-2zM16 2v4M8 2v4M2 10h20",
  file: "M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8zM14 2v6h6",
  check: "M20 6L9 17l-5-5",
  dollar: "M12 1v22M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6",
  book: "M4 19.5A2.5 2.5 0 016.5 17H20M4 19.5V5a2 2 0 012-2h14v14H6.5A2.5 2.5 0 004 19.5z",
  chart: "M18 20V10M12 20V4M6 20v-6",
  bell: "M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9M13.73 21a2 2 0 01-3.46 0",
  search: "M11 19a8 8 0 100-16 8 8 0 000 16zM21 21l-4.35-4.35",
  menu: "M3 12h18M3 6h18M3 18h18",
  x: "M18 6L6 18M6 6l12 12",
  award: "M12 15l-3.5 2 1-3.9L6 10h4L12 6l2 4h4l-3.5 3.1 1 3.9z",
  clock: "M12 22a10 10 0 100-20 10 10 0 000 20zM12 6v6l4 2",
  grid: "M3 3h7v7H3zM14 3h7v7h-7zM14 14h7v7h-7zM3 14h7v7H3z",
  logout: "M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4M16 17l5-5-5-5M21 12H9",
  mail: "M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2zM22 6l-10 7L2 6",
  lock: "M19 11H5a2 2 0 00-2 2v7a2 2 0 002 2h14a2 2 0 002-2v-7a2 2 0 00-2-2zM7 11V7a5 5 0 0110 0v4",
  eye: "M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8zM12 15a3 3 0 100-6 3 3 0 000 6z",
  arrowR: "M5 12h14M12 5l7 7-7 7",
  play: "M5 3l14 9-14 9V3z",
  star: "M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z",
  shield: "M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z",
  zap: "M13 2L3 14h9l-1 8 10-12h-9l1-8z",
  globe: "M12 22a10 10 0 100-20 10 10 0 000 20zM2 12h20M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z",
  phone: "M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z",
  mapPin: "M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0zM12 13a3 3 0 100-6 3 3 0 000 6z",
};
const I = (name, props = {}) => <Icon d={icons[name]} {...props} />;

/* ── Splash Images (Unsplash) ─── */
const IMG = {
  hero: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=1400&q=80",
  students: "https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?w=800&q=80",
  classroom: "https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=800&q=80",
  library: "https://images.unsplash.com/photo-1521587760476-6c12a4b040da?w=800&q=80",
  tech: "https://images.unsplash.com/photo-1509062522246-3755977927d7?w=800&q=80",
  campus: "https://images.unsplash.com/photo-1562774053-701939374585?w=800&q=80",
  lab: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=800&q=80",
  sports: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=800&q=80",
};

/* ══════════════════════════════════════════════════════
   REUSABLE COMPONENTS
   ══════════════════════════════════════════════════════ */
const Card = ({ children, style, onClick, hoverable, ...rest }) => (
  <div onClick={onClick} style={{ background: T.surface, border: `1px solid ${T.border}`, borderRadius: T.radius, padding: 20, boxShadow: T.shadow, cursor: onClick || hoverable ? "pointer" : "default", transition: "box-shadow .2s, transform .15s", ...style }}
    onMouseEnter={e => { if (onClick || hoverable) { e.currentTarget.style.boxShadow = T.shadowLg; e.currentTarget.style.transform = "translateY(-2px)"; } }}
    onMouseLeave={e => { e.currentTarget.style.boxShadow = T.shadow; e.currentTarget.style.transform = "none"; }} {...rest}>{children}</div>
);
const StatCard = ({ label, value, sub, color = T.accent, bg = T.accentBg, icon }) => (
  <Card style={{ display: "flex", gap: 14, alignItems: "center" }}>
    <div style={{ width: 44, height: 44, borderRadius: T.radiusSm, background: bg, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>{I(icon, { color, size: 20 })}</div>
    <div><div style={{ fontSize: 13, color: T.textMuted, marginBottom: 2 }}>{label}</div><div style={{ fontSize: 22, fontWeight: 700, color: T.text, lineHeight: 1.1 }}>{value}</div>{sub && <div style={{ fontSize: 12, color: T.textMuted, marginTop: 2 }}>{sub}</div>}</div>
  </Card>
);
const Table = ({ columns, data }) => (
  <div style={{ overflowX: "auto" }}>
    <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
      <thead><tr>{columns.map(c => <th key={c.key} style={{ textAlign: "left", padding: "10px 12px", borderBottom: `2px solid ${T.border}`, color: T.textMuted, fontWeight: 600, fontSize: 11, textTransform: "uppercase", letterSpacing: ".5px", whiteSpace: "nowrap" }}>{c.label}</th>)}</tr></thead>
      <tbody>{data.map((row, i) => <tr key={i} onMouseEnter={e => e.currentTarget.style.background = T.surfaceAlt} onMouseLeave={e => e.currentTarget.style.background = "transparent"}>{columns.map(c => <td key={c.key} style={{ padding: "10px 12px", borderBottom: `1px solid ${T.border}`, color: T.text }}>{c.render ? c.render(row[c.key], row) : row[c.key]}</td>)}</tr>)}</tbody>
    </table>
  </div>
);
const Badge = ({ children, color = T.accent, bg = T.accentBg }) => (
  <span style={{ display: "inline-block", padding: "3px 10px", borderRadius: 99, fontSize: 11, fontWeight: 600, color, background: bg }}>{children}</span>
);
const Btn = ({ children, variant = "primary", size = "md", style: s, ...rest }) => {
  const base = { border: "none", borderRadius: T.radiusSm, fontSize: size === "lg" ? 15 : 13, fontWeight: 600, cursor: "pointer", fontFamily: T.font, display: "inline-flex", alignItems: "center", gap: 8, transition: "all .15s", padding: size === "lg" ? "14px 32px" : "8px 18px" };
  const vars = {
    primary: { background: T.accent, color: "#fff" },
    secondary: { background: T.surfaceAlt, color: T.text, border: `1px solid ${T.border}` },
    ghost: { background: "transparent", color: T.textMuted },
    dark: { background: T.dark, color: "#fff" },
    outline: { background: "transparent", color: "#fff", border: "2px solid rgba(255,255,255,0.3)" },
    outlineDark: { background: "transparent", color: T.text, border: `2px solid ${T.border}` },
  };
  return <button style={{ ...base, ...vars[variant], ...s }} onMouseDown={e => e.currentTarget.style.opacity = 0.8} onMouseUp={e => e.currentTarget.style.opacity = 1} {...rest}>{children}</button>;
};
const Tabs = ({ tabs, active, onChange }) => (
  <div style={{ display: "flex", gap: 4, background: T.surfaceAlt, borderRadius: T.radiusSm, padding: 3, marginBottom: 16, overflowX: "auto" }}>
    {tabs.map(t => <button key={t.key} onClick={() => onChange(t.key)} style={{ border: "none", borderRadius: T.radiusSm, padding: "7px 16px", fontSize: 13, fontWeight: 600, cursor: "pointer", fontFamily: T.font, transition: "all .15s", background: active === t.key ? T.surface : "transparent", color: active === t.key ? T.text : T.textMuted, boxShadow: active === t.key ? T.shadow : "none", whiteSpace: "nowrap" }}>{t.label}</button>)}
  </div>
);
const Progress = ({ value, color = T.accent }) => (
  <div style={{ height: 6, borderRadius: 3, background: T.border, overflow: "hidden", width: "100%" }}><div style={{ height: "100%", width: `${value}%`, background: color, borderRadius: 3, transition: "width .4s ease" }} /></div>
);
const Avatar = ({ name, size = 32, color = T.accent }) => (
  <div style={{ width: size, height: size, borderRadius: "50%", background: T.accentBg, color, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, fontSize: size * 0.4, flexShrink: 0 }}>{name.split(" ").map(n => n[0]).join("").slice(0, 2)}</div>
);
const SectionHeader = ({ title, action }) => (
  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}><h3 style={{ margin: 0, fontSize: 16, fontWeight: 700, color: T.text }}>{title}</h3>{action}</div>
);
const ScheduleItem = ({ time, title, room, color = T.info }) => (
  <div style={{ display: "flex", gap: 12, alignItems: "flex-start", padding: "10px 0", borderBottom: `1px solid ${T.border}` }}>
    <div style={{ width: 4, height: 36, borderRadius: 2, background: color, flexShrink: 0, marginTop: 2 }} />
    <div style={{ flex: 1 }}><div style={{ fontSize: 13, fontWeight: 600, color: T.text }}>{title}</div><div style={{ fontSize: 12, color: T.textMuted }}>{time} · {room}</div></div>
  </div>
);

/* ── Animated Counter ─── */
const Counter = ({ end, suffix = "" }) => {
  const [val, setVal] = useState(0);
  const ref = useRef(null);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) {
        let start = 0;
        const step = Math.ceil(end / 40);
        const timer = setInterval(() => { start += step; if (start >= end) { setVal(end); clearInterval(timer); } else setVal(start); }, 30);
        obs.disconnect();
      }
    }, { threshold: 0.3 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [end]);
  return <span ref={ref}>{val.toLocaleString()}{suffix}</span>;
};

/* ── Fade-in on scroll ─── */
const FadeIn = ({ children, delay = 0, style: s }) => {
  const ref = useRef(null);
  const [vis, setVis] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVis(true); obs.disconnect(); } }, { threshold: 0.15 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return <div ref={ref} style={{ opacity: vis ? 1 : 0, transform: vis ? "translateY(0)" : "translateY(30px)", transition: `opacity .7s ease ${delay}s, transform .7s ease ${delay}s`, ...s }}>{children}</div>;
};

/* ══════════════════════════════════════════════════════
   DATA
   ══════════════════════════════════════════════════════ */
const students = [
  { id: "S001", name: "Aisha Malik", class: "10-A", gpa: 3.8, attendance: 96, fees: "Paid" },
  { id: "S002", name: "Omar Farooq", class: "10-B", gpa: 3.5, attendance: 89, fees: "Pending" },
  { id: "S003", name: "Fatima Noor", class: "9-A", gpa: 3.9, attendance: 98, fees: "Paid" },
  { id: "S004", name: "Hassan Ali", class: "11-A", gpa: 3.2, attendance: 82, fees: "Overdue" },
  { id: "S005", name: "Zara Ahmed", class: "10-A", gpa: 3.7, attendance: 94, fees: "Paid" },
  { id: "S006", name: "Bilal Khan", class: "9-B", gpa: 3.4, attendance: 91, fees: "Pending" },
  { id: "S007", name: "Maryam Shah", class: "11-B", gpa: 3.6, attendance: 97, fees: "Paid" },
  { id: "S008", name: "Usman Iqbal", class: "10-A", gpa: 2.9, attendance: 78, fees: "Overdue" },
];
const schedule = [
  { time: "08:00 – 08:45", title: "Mathematics", room: "Room 201", teacher: "Ms. Sadia", color: T.info },
  { time: "08:50 – 09:35", title: "Physics", room: "Lab 3", teacher: "Dr. Imran", color: T.accent },
  { time: "09:40 – 10:25", title: "English", room: "Room 105", teacher: "Ms. Hira", color: T.success },
  { time: "10:40 – 11:25", title: "Chemistry", room: "Lab 1", teacher: "Mr. Naveed", color: T.warn },
  { time: "11:30 – 12:15", title: "Computer Science", room: "IT Lab", teacher: "Mr. Tariq", color: T.info },
  { time: "12:50 – 13:35", title: "Islamiat", room: "Room 301", teacher: "Mr. Zafar", color: T.textMuted },
];
const invoices = [
  { id: "INV-2401", student: "Aisha Malik", amount: "Rs 32,000", due: "Apr 15", status: "Paid" },
  { id: "INV-2402", student: "Omar Farooq", amount: "Rs 32,000", due: "Apr 15", status: "Pending" },
  { id: "INV-2403", student: "Hassan Ali", amount: "Rs 35,000", due: "Mar 30", status: "Overdue" },
  { id: "INV-2404", student: "Fatima Noor", amount: "Rs 32,000", due: "Apr 15", status: "Paid" },
  { id: "INV-2405", student: "Zara Ahmed", amount: "Rs 32,000", due: "Apr 15", status: "Paid" },
  { id: "INV-2406", student: "Bilal Khan", amount: "Rs 28,000", due: "Apr 15", status: "Pending" },
];
const exams = [
  { id: "E01", title: "Mid-Term Exam", subject: "Mathematics", date: "Apr 20", type: "Exam", status: "Upcoming" },
  { id: "E02", title: "Physics Lab Practical", subject: "Physics", date: "Apr 18", type: "Lab", status: "Upcoming" },
  { id: "E03", title: "English Quiz 3", subject: "English", date: "Apr 12", type: "Quiz", status: "Completed" },
  { id: "E04", title: "Chemistry Mid-Term", subject: "Chemistry", date: "Apr 22", type: "Exam", status: "Upcoming" },
  { id: "E05", title: "CS Lab Assignment", subject: "Computer Sci", date: "Apr 10", type: "Lab", status: "Graded" },
];
const attendanceData = [
  { date: "Apr 10", present: 245, absent: 12, late: 8, total: 265 },
  { date: "Apr 09", present: 250, absent: 10, late: 5, total: 265 },
  { date: "Apr 08", present: 238, absent: 18, late: 9, total: 265 },
  { date: "Apr 07", present: 252, absent: 8, late: 5, total: 265 },
  { date: "Apr 04", present: 241, absent: 15, late: 9, total: 265 },
];
const notices = [
  { title: "Annual Sports Day", date: "Apr 25", type: "Event" },
  { title: "Parent-Teacher Meeting", date: "Apr 18", type: "Meeting" },
  { title: "Fee Deadline Extended", date: "Apr 20", type: "Notice" },
  { title: "Science Fair Registration", date: "Apr 30", type: "Event" },
];
const statusBadge = s => {
  const map = { Paid: [T.success, T.successBg], Pending: [T.warn, T.warnBg], Overdue: [T.danger, T.dangerBg], Upcoming: [T.info, T.infoBg], Completed: [T.success, T.successBg], Graded: [T.accent, T.accentBg] };
  const [c, bg] = map[s] || [T.textMuted, T.surfaceAlt];
  return <Badge color={c} bg={bg}>{s}</Badge>;
};

/* Demo login credentials */
const USERS = {
  "admin@edupulse.edu": { password: "admin123", role: "admin", name: "Principal Ahmad" },
  "teacher@edupulse.edu": { password: "teacher123", role: "teacher", name: "Dr. Imran Syed" },
  "student@edupulse.edu": { password: "student123", role: "student", name: "Aisha Malik" },
  "parent@edupulse.edu": { password: "parent123", role: "parent", name: "Mrs. Malik" },
};

/* ══════════════════════════════════════════════════════
   LANDING PAGE
   ══════════════════════════════════════════════════════ */
const LandingPage = ({ onNavigate }) => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const fn = () => setScrollY(window.scrollY || 0);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const navBg = scrollY > 60;

  return (
    <div style={{ fontFamily: T.font, color: T.text, background: T.bg }}>
      <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=Playfair+Display:wght@400;600;700;800&family=JetBrains+Mono:wght@400;600&display=swap" rel="stylesheet" />
      <style>{`
        * { margin: 0; padding: 0; box-sizing: border-box; }
        html { scroll-behavior: smooth; }
        @keyframes float { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-12px); } }
        @keyframes pulse { 0%,100% { opacity: 1; } 50% { opacity: .6; } }
        @keyframes slideUp { from { opacity:0; transform:translateY(40px); } to { opacity:1; transform:translateY(0); } }
        @keyframes scaleIn { from { opacity:0; transform:scale(.9); } to { opacity:1; transform:scale(1); } }
        .hover-lift { transition: transform .3s ease, box-shadow .3s ease; }
        .hover-lift:hover { transform: translateY(-6px); box-shadow: ${T.shadowXl}; }
        .img-zoom img { transition: transform .5s ease; }
        .img-zoom:hover img { transform: scale(1.05); }
      `}</style>

      {/* ── NAVBAR ─── */}
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
        padding: "0 40px", height: 70, display: "flex", alignItems: "center", justifyContent: "space-between",
        background: navBg ? "rgba(255,255,255,0.95)" : "transparent",
        backdropFilter: navBg ? "blur(12px)" : "none",
        borderBottom: navBg ? `1px solid ${T.border}` : "none",
        transition: "all .3s ease",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{ width: 36, height: 36, borderRadius: T.radiusSm, background: T.accent, display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontWeight: 800, fontSize: 16 }}>E</div>
          <span style={{ fontSize: 20, fontWeight: 700, color: navBg ? T.text : "#fff", fontFamily: T.fontDisplay, transition: "color .3s" }}>EduPulse</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 32 }}>
          {["Features", "About", "Testimonials", "Contact"].map(item => (
            <a key={item} href={`#${item.toLowerCase()}`} style={{ textDecoration: "none", color: navBg ? T.textMuted : "rgba(255,255,255,0.85)", fontSize: 14, fontWeight: 500, transition: "color .2s" }}
              onMouseEnter={e => e.target.style.color = T.accent}
              onMouseLeave={e => e.target.style.color = navBg ? T.textMuted : "rgba(255,255,255,0.85)"}
            >{item}</a>
          ))}
          <Btn variant={navBg ? "primary" : "outline"} onClick={() => onNavigate("login")} style={{ borderRadius: 99 }}>
            Sign In {I("arrowR", { size: 14, color: "#fff" })}
          </Btn>
        </div>
      </nav>

      {/* ── HERO SECTION ─── */}
      <section style={{ position: "relative", minHeight: "100vh", display: "flex", alignItems: "center", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, zIndex: 0, overflow: "hidden" }}>
          <video
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            aria-hidden
            style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center", filter: "brightness(0.35)" }}
          >
            <source src="/hero.mp4" type="video/mp4" />
          </video>
        </div>
        <div style={{ position: "absolute", inset: 0, zIndex: 1, background: "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.03) 2px, rgba(0,0,0,0.03) 4px)" }} />

        <div style={{ position: "relative", zIndex: 2, padding: "120px 60px 80px", maxWidth: 1300, margin: "0 auto", width: "100%", display: "flex", gap: 60, alignItems: "center" }}>
          <div style={{ flex: 1, animation: "slideUp .8s ease" }}>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "6px 16px", borderRadius: 99, border: "1px solid rgba(255,255,255,0.2)", color: "rgba(255,255,255,0.8)", fontSize: 13, fontWeight: 500, marginBottom: 24 }}>
              {I("zap", { size: 14, color: T.accent })} Trusted by 200+ institutions
            </div>
            <h1 style={{ fontSize: 58, fontWeight: 800, color: "#fff", lineHeight: 1.08, fontFamily: T.fontDisplay, marginBottom: 24 }}>
              The Future of<br />
              <span style={{ color: T.accent }}>School Management</span><br />
              Starts Here
            </h1>
            <p style={{ fontSize: 18, color: "rgba(255,255,255,0.7)", lineHeight: 1.7, maxWidth: 520, marginBottom: 36 }}>
              EduPulse unifies attendance, scheduling, invoicing, exams, and parent communication into one elegant platform — built for administrators, teachers, students, and parents.
            </p>
            <div style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
              <Btn variant="primary" size="lg" onClick={() => onNavigate("login")} style={{ borderRadius: 99 }}>
                Get Started Free {I("arrowR", { size: 16, color: "#fff" })}
              </Btn>
              <Btn variant="outline" size="lg" style={{ borderRadius: 99 }}>
                {I("play", { size: 16, color: "#fff" })} Watch Demo
              </Btn>
            </div>
          </div>

          {/* Hero floating cards */}
          <div style={{ flex: 1, position: "relative", minHeight: 420, animation: "scaleIn .9s ease .2s both", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <div style={{ width: 320, borderRadius: T.radiusLg, overflow: "hidden", boxShadow: "0 20px 60px rgba(0,0,0,0.4)", animation: "float 4s ease-in-out infinite" }}>
              <img src={IMG.classroom} alt="" style={{ width: "100%", height: 200, objectFit: "cover", display: "block" }} />
              <div style={{ background: T.surface, padding: "16px 20px" }}>
                <div style={{ fontSize: 14, fontWeight: 700, marginBottom: 6 }}>Smart Classroom</div>
                <div style={{ fontSize: 12, color: T.textMuted, marginBottom: 8 }}>Real-time attendance & analytics</div>
                <Progress value={92} color={T.success} />
              </div>
            </div>
            <div style={{ position: "absolute", bottom: 20, left: -20, background: T.surface, borderRadius: T.radius, padding: "14px 18px", boxShadow: T.shadowXl, animation: "float 4s ease-in-out infinite 1s" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <div style={{ width: 36, height: 36, borderRadius: "50%", background: T.successBg, display: "flex", alignItems: "center", justifyContent: "center" }}>{I("check", { color: T.success, size: 16 })}</div>
                <div><div style={{ fontSize: 12, fontWeight: 700 }}>Attendance</div><div style={{ fontSize: 20, fontWeight: 800, color: T.success }}>96.4%</div></div>
              </div>
            </div>
            <div style={{ position: "absolute", top: 30, right: -10, background: T.surface, borderRadius: T.radius, padding: "12px 16px", boxShadow: T.shadowXl, animation: "float 4s ease-in-out infinite 2s" }}>
              <div style={{ fontSize: 11, color: T.textMuted, marginBottom: 4 }}>Next Class</div>
              <div style={{ fontSize: 13, fontWeight: 700 }}>Physics Lab</div>
              <div style={{ fontSize: 12, color: T.accent }}>08:50 AM · Lab 3</div>
            </div>
          </div>
        </div>

        <div style={{ position: "absolute", bottom: 30, left: "50%", transform: "translateX(-50%)", zIndex: 2, animation: "pulse 2s ease infinite" }}>
          <div style={{ width: 28, height: 44, borderRadius: 14, border: "2px solid rgba(255,255,255,0.3)", display: "flex", justifyContent: "center", paddingTop: 8 }}>
            <div style={{ width: 4, height: 10, borderRadius: 2, background: "rgba(255,255,255,0.6)" }} />
          </div>
        </div>
      </section>

      {/* ── STATS BAR ─── */}
      <section style={{ background: T.dark, padding: "50px 60px" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 40, textAlign: "center" }}>
          {[{ val: 200, suffix: "+", label: "Schools & Colleges" }, { val: 50000, suffix: "+", label: "Active Students" }, { val: 3500, suffix: "+", label: "Teachers Onboard" }, { val: 99, suffix: "%", label: "Uptime Guarantee" }].map((s, i) => (
            <FadeIn key={i} delay={i * 0.1}><div style={{ fontSize: 42, fontWeight: 800, color: "#fff", fontFamily: T.fontDisplay }}><Counter end={s.val} suffix={s.suffix} /></div><div style={{ fontSize: 14, color: "rgba(255,255,255,0.5)", marginTop: 4 }}>{s.label}</div></FadeIn>
          ))}
        </div>
      </section>

      {/* ── FEATURES ─── */}
      <section id="features" style={{ padding: "100px 60px", maxWidth: 1200, margin: "0 auto" }}>
        <FadeIn><div style={{ textAlign: "center", marginBottom: 64 }}>
          <div style={{ fontSize: 13, fontWeight: 600, color: T.accent, textTransform: "uppercase", letterSpacing: 2, marginBottom: 12 }}>Powerful Features</div>
          <h2 style={{ fontSize: 42, fontWeight: 800, fontFamily: T.fontDisplay, lineHeight: 1.15 }}>Everything Your<br />Institution Needs</h2>
        </div></FadeIn>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 24 }}>
          {[
            { icon: "users", title: "Student Management", desc: "Complete profiles, enrollment tracking, academic records, and parent information in one unified view.", img: IMG.students, color: T.accent },
            { icon: "calendar", title: "Class Scheduling", desc: "Drag-and-drop timetable builder with conflict detection, room allocation, and teacher availability.", img: IMG.classroom, color: T.info },
            { icon: "dollar", title: "Invoice & Billing", desc: "Automated fee generation, payment tracking, overdue alerts, and detailed financial reports.", img: IMG.library, color: T.success },
            { icon: "check", title: "Attendance System", desc: "Real-time digital attendance with daily, weekly, and monthly analytics for every class.", img: IMG.tech, color: T.warn },
            { icon: "file", title: "Exams & Grading", desc: "Schedule exams, quizzes, and labs. Auto-calculate grades and generate progress reports.", img: IMG.lab, color: T.danger },
            { icon: "shield", title: "Parent Portal", desc: "Parents stay informed with live attendance, grades, fee status, and direct teacher messaging.", img: IMG.campus, color: T.info },
          ].map((f, i) => (
            <FadeIn key={i} delay={i * 0.08}>
              <div className="hover-lift img-zoom" style={{ background: T.surface, borderRadius: T.radiusLg, overflow: "hidden", border: `1px solid ${T.border}`, cursor: "pointer" }}>
                <div style={{ height: 180, overflow: "hidden" }}><img src={f.img} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} /></div>
                <div style={{ padding: "24px 24px 28px" }}>
                  <div style={{ width: 40, height: 40, borderRadius: T.radiusSm, background: f.color + "18", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 14 }}>{I(f.icon, { color: f.color, size: 20 })}</div>
                  <h3 style={{ fontSize: 18, fontWeight: 700, marginBottom: 8, fontFamily: T.fontDisplay }}>{f.title}</h3>
                  <p style={{ fontSize: 14, color: T.textMuted, lineHeight: 1.65 }}>{f.desc}</p>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* ── DASHBOARD PREVIEW ─── */}
      <section id="about" style={{ background: T.dark, padding: "100px 60px", overflow: "hidden" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <FadeIn><div style={{ textAlign: "center", marginBottom: 64 }}>
            <div style={{ fontSize: 13, fontWeight: 600, color: T.accent, textTransform: "uppercase", letterSpacing: 2, marginBottom: 12 }}>4 Dedicated Dashboards</div>
            <h2 style={{ fontSize: 42, fontWeight: 800, color: "#fff", fontFamily: T.fontDisplay, lineHeight: 1.15 }}>Built for Every Role</h2>
          </div></FadeIn>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 24 }}>
            {[
              { role: "Admin", desc: "Full control over students, teachers, financials, attendance, and institutional analytics.", icon: "grid", color: T.accent, email: "admin@edupulse.edu" },
              { role: "Teacher", desc: "Class management, attendance marking, exam scheduling, and grade entry — all in one place.", icon: "book", color: T.info, email: "teacher@edupulse.edu" },
              { role: "Student", desc: "Personal dashboard with schedule, upcoming exams, grades, GPA tracker, and fee status.", icon: "award", color: T.success, email: "student@edupulse.edu" },
              { role: "Parent", desc: "Monitor your child's attendance, academic progress, invoices, and school announcements.", icon: "shield", color: T.warn, email: "parent@edupulse.edu" },
            ].map((r, i) => (
              <FadeIn key={i} delay={i * 0.1}>
                <div className="hover-lift" onClick={() => onNavigate("login")} style={{ background: T.darkSurface, border: "1px solid rgba(255,255,255,0.08)", borderRadius: T.radiusLg, padding: 32, cursor: "pointer" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 16 }}>
                    <div style={{ width: 48, height: 48, borderRadius: T.radius, background: r.color + "20", display: "flex", alignItems: "center", justifyContent: "center" }}>{I(r.icon, { color: r.color, size: 22 })}</div>
                    <div><div style={{ fontSize: 20, fontWeight: 700, color: "#fff", fontFamily: T.fontDisplay }}>{r.role} Dashboard</div><div style={{ fontSize: 12, color: "rgba(255,255,255,0.4)", fontFamily: T.fontMono }}>{r.email}</div></div>
                  </div>
                  <p style={{ fontSize: 14, color: "rgba(255,255,255,0.55)", lineHeight: 1.7 }}>{r.desc}</p>
                  <div style={{ marginTop: 16, display: "flex", alignItems: "center", gap: 6, color: r.color, fontSize: 13, fontWeight: 600 }}>Try it now {I("arrowR", { size: 14, color: r.color })}</div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── IMAGE MOSAIC ─── */}
      <section style={{ padding: "100px 60px", maxWidth: 1200, margin: "0 auto" }}>
        <FadeIn><div style={{ textAlign: "center", marginBottom: 48 }}>
          <h2 style={{ fontSize: 42, fontWeight: 800, fontFamily: T.fontDisplay }}>Campus Life</h2>
          <p style={{ fontSize: 16, color: T.textMuted, marginTop: 8 }}>Empowering education through technology</p>
        </div></FadeIn>
        <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr", gridTemplateRows: "220px 220px", gap: 16 }}>
          {[
            { img: IMG.campus, col: "1 / 2", row: "1 / 3", r: `${T.radiusLg} 0 0 ${T.radiusLg}` },
            { img: IMG.lab, r: `0 ${T.radiusLg} 0 0` },
            { img: IMG.sports, r: "0" },
            { img: IMG.tech, r: "0" },
            { img: IMG.library, r: `0 0 ${T.radiusLg} 0` },
          ].map((item, i) => (
            <FadeIn key={i} delay={i * 0.08} style={{ gridColumn: item.col, gridRow: item.row, overflow: "hidden", borderRadius: item.r }}>
              <div className="img-zoom" style={{ height: "100%", overflow: "hidden", borderRadius: item.r }}>
                <img src={item.img} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              </div>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* ── TESTIMONIALS ─── */}
      <section id="testimonials" style={{ background: T.surfaceAlt, padding: "100px 60px" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <FadeIn><div style={{ textAlign: "center", marginBottom: 48 }}>
            <div style={{ fontSize: 13, fontWeight: 600, color: T.accent, textTransform: "uppercase", letterSpacing: 2, marginBottom: 12 }}>Testimonials</div>
            <h2 style={{ fontSize: 42, fontWeight: 800, fontFamily: T.fontDisplay }}>Loved by Educators</h2>
          </div></FadeIn>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 24 }}>
            {[
              { quote: "EduPulse transformed how we manage 1,200 students. Attendance tracking alone saved us 15 hours per week.", name: "Dr. Amina Rashid", role: "Principal, Lahore Grammar" },
              { quote: "As a teacher, the grading and schedule features are incredibly intuitive. I can focus on teaching, not paperwork.", name: "Mr. Farhan Qureshi", role: "Senior Teacher, Beaconhouse" },
              { quote: "Finally, I can see my daughter's attendance and grades in real-time. The parent portal gives me peace of mind.", name: "Mrs. Sarah Hussain", role: "Parent" },
            ].map((t, i) => (
              <FadeIn key={i} delay={i * 0.12}>
                <Card className="hover-lift" style={{ padding: 32, height: "100%" }}>
                  <div style={{ display: "flex", gap: 2, marginBottom: 16 }}>{Array(5).fill(0).map((_, j) => I("star", { key: j, size: 16, color: T.warn }))}</div>
                  <p style={{ fontSize: 15, color: T.text, lineHeight: 1.75, marginBottom: 24, fontStyle: "italic" }}>"{t.quote}"</p>
                  <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                    <Avatar name={t.name} size={40} color={T.accent} />
                    <div><div style={{ fontSize: 14, fontWeight: 700 }}>{t.name}</div><div style={{ fontSize: 12, color: T.textMuted }}>{t.role}</div></div>
                  </div>
                </Card>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ─── */}
      <section style={{ position: "relative", padding: "100px 60px", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, zIndex: 0, backgroundImage: `url(${IMG.hero})`, backgroundSize: "cover", backgroundPosition: "center bottom", filter: "brightness(0.15)" }} />
        <div style={{ position: "absolute", inset: 0, zIndex: 1, background: "rgba(0,0,0,0.55)" }} />
        <div style={{ position: "relative", zIndex: 2, maxWidth: 700, margin: "0 auto", textAlign: "center" }}>
          <FadeIn>
            <h2 style={{ fontSize: 46, fontWeight: 800, color: "#fff", fontFamily: T.fontDisplay, lineHeight: 1.15, marginBottom: 20 }}>Ready to Transform<br />Your Institution?</h2>
            <p style={{ fontSize: 17, color: "rgba(255,255,255,0.82)", marginBottom: 36, lineHeight: 1.7 }}>Join 200+ schools already using EduPulse. Start your free trial today — no credit card required.</p>
            <div style={{ display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap" }}>
              <Btn variant="primary" size="lg" onClick={() => onNavigate("login")} style={{ borderRadius: 99 }}>Start Free Trial {I("arrowR", { size: 16, color: "#fff" })}</Btn>
              <Btn variant="outline" size="lg" style={{ borderRadius: 99 }}>{I("phone", { size: 16, color: "#fff" })} Contact Sales</Btn>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ── FOOTER ─── */}
      <footer id="contact" style={{ background: T.dark, padding: "60px 60px 30px" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr", gap: 40, marginBottom: 50 }}>
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
                <div style={{ width: 36, height: 36, borderRadius: T.radiusSm, background: T.accent, display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontWeight: 800, fontSize: 16 }}>E</div>
                <span style={{ fontSize: 20, fontWeight: 700, color: "#fff", fontFamily: T.fontDisplay }}>EduPulse</span>
              </div>
              <p style={{ fontSize: 14, color: "rgba(255,255,255,0.45)", lineHeight: 1.7, maxWidth: 300 }}>The complete school management platform trusted by institutions across Pakistan and beyond.</p>
            </div>
            {[{ title: "Product", links: ["Features", "Pricing", "Integrations", "Changelog"] }, { title: "Company", links: ["About Us", "Careers", "Blog", "Press Kit"] }, { title: "Support", links: ["Help Center", "Documentation", "API Reference", "Status"] }].map((col, i) => (
              <div key={i}>
                <div style={{ fontSize: 13, fontWeight: 700, color: "#fff", marginBottom: 16, textTransform: "uppercase", letterSpacing: 1 }}>{col.title}</div>
                {col.links.map(l => <div key={l} style={{ fontSize: 14, color: "rgba(255,255,255,0.4)", marginBottom: 10, cursor: "pointer", transition: "color .2s" }} onMouseEnter={e => e.target.style.color = T.accent} onMouseLeave={e => e.target.style.color = "rgba(255,255,255,0.4)"}>{l}</div>)}
              </div>
            ))}
          </div>
          <div style={{ borderTop: "1px solid rgba(255,255,255,0.08)", paddingTop: 24, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div style={{ fontSize: 13, color: "rgba(255,255,255,0.3)" }}>© 2026 EduPulse. All rights reserved.</div>
            <div style={{ display: "flex", gap: 20 }}>{["Privacy", "Terms", "Cookies"].map(l => <span key={l} style={{ fontSize: 13, color: "rgba(255,255,255,0.3)", cursor: "pointer" }}>{l}</span>)}</div>
          </div>
        </div>
      </footer>
    </div>
  );
};

/* ══════════════════════════════════════════════════════
   LOGIN PAGE
   ══════════════════════════════════════════════════════ */
const LoginPage = ({ onLogin, onNavigate }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = () => {
    setError("");
    if (!email || !password) { setError("Please enter both email and password."); return; }
    const user = USERS[email.toLowerCase().trim()];
    if (!user) { setError("No account found with this email address."); return; }
    if (user.password !== password) { setError("Incorrect password. Please try again."); return; }
    setLoading(true);
    setTimeout(() => onLogin(user), 800);
  };

  return (
    <div style={{ fontFamily: T.font, minHeight: "100vh", display: "flex" }}>
      <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=Playfair+Display:wght@400;600;700;800&family=JetBrains+Mono:wght@400;600&display=swap" rel="stylesheet" />
      <style>{`@keyframes slideUp { from { opacity:0; transform:translateY(30px); } to { opacity:1; transform:translateY(0); } }`}</style>

      {/* Left — Image */}
      <div style={{ flex: 1, position: "relative", overflow: "hidden", display: "flex", alignItems: "flex-end" }}>
        <div style={{ position: "absolute", inset: 0, backgroundImage: `url(${IMG.campus})`, backgroundSize: "cover", backgroundPosition: "center", filter: "brightness(0.3)" }} />
        <div style={{ position: "relative", zIndex: 1, padding: 50, maxWidth: 500 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 24, cursor: "pointer" }} onClick={() => onNavigate("landing")}>
            <div style={{ width: 36, height: 36, borderRadius: T.radiusSm, background: T.accent, display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontWeight: 800, fontSize: 16 }}>E</div>
            <span style={{ fontSize: 20, fontWeight: 700, color: "#fff", fontFamily: T.fontDisplay }}>EduPulse</span>
          </div>
          <h2 style={{ fontSize: 34, fontWeight: 800, color: "#fff", fontFamily: T.fontDisplay, lineHeight: 1.2, marginBottom: 12 }}>Welcome back to<br />your learning hub</h2>
          <p style={{ fontSize: 15, color: "rgba(255,255,255,0.55)", lineHeight: 1.7 }}>Manage your entire institution from one powerful dashboard. Sign in to continue.</p>
        </div>
      </div>

      {/* Right — Login Form */}
      <div style={{ width: 520, background: T.surface, display: "flex", alignItems: "center", justifyContent: "center", padding: 50 }}>
        <div style={{ width: "100%", maxWidth: 380, animation: "slideUp .6s ease" }}>
          <h2 style={{ fontSize: 28, fontWeight: 800, fontFamily: T.fontDisplay, marginBottom: 6 }}>Sign In</h2>
          <p style={{ fontSize: 14, color: T.textMuted, marginBottom: 32 }}>Enter your credentials to access your dashboard</p>

          {error && (
            <div style={{ background: T.dangerBg, border: `1px solid ${T.danger}30`, borderRadius: T.radiusSm, padding: "10px 14px", marginBottom: 20, display: "flex", alignItems: "center", gap: 8, fontSize: 13, color: T.danger }}>
              {I("x", { size: 14, color: T.danger })} {error}
            </div>
          )}

          <div style={{ marginBottom: 20 }}>
            <label style={{ display: "block", fontSize: 13, fontWeight: 600, color: T.text, marginBottom: 6 }}>Email Address</label>
            <div style={{ display: "flex", alignItems: "center", border: `1.5px solid ${T.border}`, borderRadius: T.radiusSm, padding: "0 14px", background: T.surfaceAlt }}>
              {I("mail", { size: 16, color: T.textLight })}
              <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="name@edupulse.edu" onKeyDown={e => e.key === "Enter" && handleSubmit()}
                style={{ flex: 1, border: "none", outline: "none", padding: "12px 10px", fontSize: 14, fontFamily: T.font, background: "transparent", color: T.text }} />
            </div>
          </div>

          <div style={{ marginBottom: 10 }}>
            <label style={{ display: "block", fontSize: 13, fontWeight: 600, color: T.text, marginBottom: 6 }}>Password</label>
            <div style={{ display: "flex", alignItems: "center", border: `1.5px solid ${T.border}`, borderRadius: T.radiusSm, padding: "0 14px", background: T.surfaceAlt }}>
              {I("lock", { size: 16, color: T.textLight })}
              <input type={showPw ? "text" : "password"} value={password} onChange={e => setPassword(e.target.value)} placeholder="Enter your password" onKeyDown={e => e.key === "Enter" && handleSubmit()}
                style={{ flex: 1, border: "none", outline: "none", padding: "12px 10px", fontSize: 14, fontFamily: T.font, background: "transparent", color: T.text }} />
              <div style={{ cursor: "pointer", padding: 4 }} onClick={() => setShowPw(!showPw)}>{I("eye", { size: 16, color: T.textLight })}</div>
            </div>
          </div>

          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 28 }}>
            <label style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 13, color: T.textMuted, cursor: "pointer" }}>
              <input type="checkbox" style={{ accentColor: T.accent }} /> Remember me
            </label>
            <span style={{ fontSize: 13, color: T.accent, cursor: "pointer", fontWeight: 600 }}>Forgot password?</span>
          </div>

          <button onClick={handleSubmit} disabled={loading} style={{
            width: "100%", padding: "14px", border: "none", borderRadius: T.radiusSm, background: T.accent, color: "#fff",
            fontSize: 15, fontWeight: 700, cursor: loading ? "wait" : "pointer", fontFamily: T.font, transition: "opacity .15s", opacity: loading ? 0.7 : 1,
          }}>{loading ? "Signing in..." : "Sign In"}</button>

          {/* Demo Credentials */}
          <div style={{ marginTop: 32, padding: 20, background: T.surfaceAlt, borderRadius: T.radius, border: `1px dashed ${T.border}` }}>
            <div style={{ fontSize: 12, fontWeight: 700, color: T.textMuted, textTransform: "uppercase", letterSpacing: 1, marginBottom: 12 }}>Demo Credentials — Click to autofill</div>
            {Object.entries(USERS).map(([em, u]) => (
              <div key={em} onClick={() => { setEmail(em); setPassword(u.password); setError(""); }}
                style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "8px 10px", borderRadius: T.radiusSm, cursor: "pointer", transition: "background .15s", marginBottom: 4 }}
                onMouseEnter={e => e.currentTarget.style.background = T.surface} onMouseLeave={e => e.currentTarget.style.background = "transparent"}>
                <div><div style={{ fontSize: 13, fontWeight: 600 }}>{u.role.charAt(0).toUpperCase() + u.role.slice(1)}</div><div style={{ fontSize: 12, color: T.textMuted, fontFamily: T.fontMono }}>{em}</div></div>
                <div style={{ fontSize: 11, color: T.textLight, fontFamily: T.fontMono }}>{u.password}</div>
              </div>
            ))}
          </div>

          <div style={{ textAlign: "center", marginTop: 20 }}>
            <span style={{ fontSize: 13, color: T.textMuted, cursor: "pointer" }} onClick={() => onNavigate("landing")}>← Back to website</span>
          </div>
        </div>
      </div>
    </div>
  );
};

/* ══════════════════════════════════════════════════════
   DASHBOARD PAGES (4 roles)
   ══════════════════════════════════════════════════════ */
const AdminDashboard = () => {
  const [tab, setTab] = useState("overview");
  return (<div>
    <Tabs tabs={[{ key: "overview", label: "Overview" }, { key: "students", label: "Students" }, { key: "invoices", label: "Invoices" }, { key: "attendance", label: "Attendance" }, { key: "exams", label: "Exams" }]} active={tab} onChange={setTab} />
    {tab === "overview" && (<>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px,1fr))", gap: 14, marginBottom: 20 }}>
        <StatCard label="Total Students" value="265" sub="+12 this term" icon="users" color={T.accent} bg={T.accentBg} />
        <StatCard label="Teachers" value="18" sub="3 departments" icon="book" color={T.info} bg={T.infoBg} />
        <StatCard label="Revenue (Apr)" value="Rs 8.4M" sub="Rs 2.1M pending" icon="dollar" color={T.success} bg={T.successBg} />
        <StatCard label="Attendance Today" value="92.4%" sub="245 / 265" icon="check" color={T.warn} bg={T.warnBg} />
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
        <Card><SectionHeader title="Attendance Trend (5 days)" />
          <div style={{ display: "flex", alignItems: "flex-end", gap: 10, height: 120, paddingTop: 10 }}>
            {attendanceData.map((d, i) => (<div key={i} style={{ flex: 1, textAlign: "center" }}><div style={{ background: T.accent, borderRadius: 4, height: `${(d.present / d.total) * 100}%`, minHeight: 20, transition: "height .3s" }} /><div style={{ fontSize: 10, color: T.textMuted, marginTop: 6 }}>{d.date.split(" ")[1]}</div></div>))}
          </div>
        </Card>
        <Card><SectionHeader title="Notices & Events" />
          {notices.map((n, i) => (<div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "8px 0", borderBottom: i < notices.length - 1 ? `1px solid ${T.border}` : "none" }}><div><div style={{ fontSize: 13, fontWeight: 600 }}>{n.title}</div><div style={{ fontSize: 12, color: T.textMuted }}>{n.date}</div></div><Badge color={T.info} bg={T.infoBg}>{n.type}</Badge></div>))}
        </Card>
      </div>
      <Card style={{ marginTop: 16 }}><SectionHeader title="Recent Students" action={<Btn variant="secondary" style={{ fontSize: 12 }}>Add Student</Btn>} />
        <Table columns={[
          { key: "name", label: "Student", render: v => <div style={{ display: "flex", alignItems: "center", gap: 8 }}><Avatar name={v} size={28} />{v}</div> },
          { key: "class", label: "Class" },
          { key: "gpa", label: "GPA", render: v => <span style={{ fontFamily: T.fontMono, fontWeight: 600 }}>{v}</span> },
          { key: "attendance", label: "Attendance", render: v => <div style={{ display: "flex", alignItems: "center", gap: 8, minWidth: 120 }}><Progress value={v} color={v > 90 ? T.success : v > 80 ? T.warn : T.danger} /><span style={{ fontSize: 12, fontFamily: T.fontMono }}>{v}%</span></div> },
          { key: "fees", label: "Fees", render: v => statusBadge(v) },
        ]} data={students.slice(0, 5)} />
      </Card>
    </>)}
    {tab === "students" && <Card><SectionHeader title="All Students" action={<Btn variant="primary">+ Add Student</Btn>} /><Table columns={[
      { key: "id", label: "ID", render: v => <span style={{ fontFamily: T.fontMono, fontSize: 12 }}>{v}</span> },
      { key: "name", label: "Student", render: v => <div style={{ display: "flex", alignItems: "center", gap: 8 }}><Avatar name={v} size={28} />{v}</div> },
      { key: "class", label: "Class" },
      { key: "gpa", label: "GPA", render: v => <span style={{ fontFamily: T.fontMono, fontWeight: 600 }}>{v}</span> },
      { key: "attendance", label: "Attendance", render: v => <div style={{ display: "flex", alignItems: "center", gap: 8, minWidth: 120 }}><Progress value={v} color={v > 90 ? T.success : v > 80 ? T.warn : T.danger} /><span style={{ fontSize: 12, fontFamily: T.fontMono }}>{v}%</span></div> },
      { key: "fees", label: "Fees", render: v => statusBadge(v) },
    ]} data={students} /></Card>}
    {tab === "invoices" && <InvoiceSection />}
    {tab === "attendance" && <AttendanceSection />}
    {tab === "exams" && <ExamSection />}
  </div>);
};

const TeacherDashboard = () => {
  const [tab, setTab] = useState("overview");
  return (<div>
    <Tabs tabs={[{ key: "overview", label: "My Classes" }, { key: "schedule", label: "Schedule" }, { key: "attendance", label: "Mark Attendance" }, { key: "exams", label: "Exams & Grading" }]} active={tab} onChange={setTab} />
    {tab === "overview" && (<>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px,1fr))", gap: 14, marginBottom: 20 }}>
        <StatCard label="My Classes" value="4" sub="120 students" icon="grid" color={T.info} bg={T.infoBg} />
        <StatCard label="Today's Periods" value="5" sub="2 remaining" icon="clock" color={T.accent} bg={T.accentBg} />
        <StatCard label="Avg Attendance" value="91%" sub="This week" icon="check" color={T.success} bg={T.successBg} />
        <StatCard label="Pending Grades" value="23" sub="Due Apr 15" icon="file" color={T.warn} bg={T.warnBg} />
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
        <Card><SectionHeader title="Today's Schedule" />{schedule.slice(0, 4).map((s, i) => <ScheduleItem key={i} {...s} />)}</Card>
        <Card><SectionHeader title="My Students — Class 10-A" /><Table columns={[
          { key: "name", label: "Student", render: v => <div style={{ display: "flex", alignItems: "center", gap: 8 }}><Avatar name={v} size={26} />{v}</div> },
          { key: "gpa", label: "GPA", render: v => <span style={{ fontFamily: T.fontMono }}>{v}</span> },
          { key: "attendance", label: "Att%", render: v => <span style={{ fontFamily: T.fontMono, color: v > 90 ? T.success : v > 80 ? T.warn : T.danger }}>{v}%</span> },
        ]} data={students.filter(s => s.class === "10-A")} /></Card>
      </div>
    </>)}
    {tab === "schedule" && <ScheduleSection />}
    {tab === "attendance" && <MarkAttendance />}
    {tab === "exams" && <ExamSection />}
  </div>);
};

const StudentDashboard = () => {
  const me = students[0];
  const [tab, setTab] = useState("overview");
  return (<div>
    <Tabs tabs={[{ key: "overview", label: "Overview" }, { key: "schedule", label: "Schedule" }, { key: "exams", label: "Exams & Results" }, { key: "invoices", label: "Fee Status" }]} active={tab} onChange={setTab} />
    {tab === "overview" && (<>
      <Card style={{ display: "flex", gap: 20, alignItems: "center", marginBottom: 16, flexWrap: "wrap" }}>
        <Avatar name={me.name} size={56} /><div><div style={{ fontSize: 20, fontWeight: 700 }}>{me.name}</div><div style={{ fontSize: 13, color: T.textMuted }}>Class {me.class} · Roll #{me.id} · GPA {me.gpa}</div></div>
        <div style={{ marginLeft: "auto", textAlign: "right" }}><div style={{ fontSize: 28, fontWeight: 700, color: T.success }}>{me.attendance}%</div><div style={{ fontSize: 12, color: T.textMuted }}>Attendance</div></div>
      </Card>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px,1fr))", gap: 14, marginBottom: 20 }}>
        <StatCard label="GPA" value={me.gpa} sub="Semester average" icon="award" color={T.accent} bg={T.accentBg} />
        <StatCard label="Upcoming Exams" value="3" sub="Next: Apr 18" icon="file" color={T.info} bg={T.infoBg} />
        <StatCard label="Fee Status" value={me.fees} icon="dollar" color={T.success} bg={T.successBg} />
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
        <Card><SectionHeader title="Today's Classes" />{schedule.slice(0, 5).map((s, i) => <ScheduleItem key={i} {...s} />)}</Card>
        <Card><SectionHeader title="Upcoming Exams" />{exams.filter(e => e.status === "Upcoming").map((e, i) => (<div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px 0", borderBottom: `1px solid ${T.border}` }}><div><div style={{ fontSize: 13, fontWeight: 600 }}>{e.title}</div><div style={{ fontSize: 12, color: T.textMuted }}>{e.subject} · {e.date}</div></div><Badge color={T.info} bg={T.infoBg}>{e.type}</Badge></div>))}</Card>
      </div>
    </>)}
    {tab === "schedule" && <ScheduleSection />}
    {tab === "exams" && <ExamSection />}
    {tab === "invoices" && <InvoiceSection />}
  </div>);
};

const ParentDashboard = () => {
  const child = students[0];
  const [tab, setTab] = useState("overview");
  return (<div>
    <Tabs tabs={[{ key: "overview", label: "Child Overview" }, { key: "attendance", label: "Attendance" }, { key: "exams", label: "Results" }, { key: "invoices", label: "Invoices" }]} active={tab} onChange={setTab} />
    {tab === "overview" && (<>
      <Card style={{ display: "flex", gap: 20, alignItems: "center", marginBottom: 16, flexWrap: "wrap" }}>
        <Avatar name={child.name} size={56} /><div><div style={{ fontSize: 20, fontWeight: 700 }}>{child.name}</div><div style={{ fontSize: 13, color: T.textMuted }}>Class {child.class} · GPA {child.gpa}</div></div><Badge color={T.success} bg={T.successBg}>{child.fees}</Badge>
      </Card>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px,1fr))", gap: 14, marginBottom: 20 }}>
        <StatCard label="Attendance" value={`${child.attendance}%`} sub="This semester" icon="check" color={T.success} bg={T.successBg} />
        <StatCard label="GPA" value={child.gpa} sub="Semester avg" icon="award" color={T.accent} bg={T.accentBg} />
        <StatCard label="Next Fee Due" value="Rs 32,000" sub="Apr 15, 2026" icon="dollar" color={T.warn} bg={T.warnBg} />
        <StatCard label="Upcoming Exams" value="3" sub="Starting Apr 18" icon="file" color={T.info} bg={T.infoBg} />
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
        <Card><SectionHeader title="Weekly Attendance" />{["Mon", "Tue", "Wed", "Thu", "Fri"].map((d, i) => (<div key={d} style={{ display: "flex", alignItems: "center", gap: 12, padding: "8px 0", borderBottom: i < 4 ? `1px solid ${T.border}` : "none" }}><div style={{ width: 40, fontSize: 13, fontWeight: 600 }}>{d}</div><div style={{ width: 10, height: 10, borderRadius: "50%", background: i === 2 ? T.warn : T.success }} /><div style={{ fontSize: 13, color: T.textMuted }}>{i === 2 ? "Late (10 min)" : "Present"}</div></div>))}</Card>
        <Card><SectionHeader title="Notices" />{notices.map((n, i) => (<div key={i} style={{ padding: "8px 0", borderBottom: i < notices.length - 1 ? `1px solid ${T.border}` : "none" }}><div style={{ fontSize: 13, fontWeight: 600 }}>{n.title}</div><div style={{ fontSize: 12, color: T.textMuted }}>{n.date} · {n.type}</div></div>))}</Card>
      </div>
    </>)}
    {tab === "attendance" && <AttendanceSection />}
    {tab === "exams" && <ExamSection />}
    {tab === "invoices" && <InvoiceSection />}
  </div>);
};

/* ── Shared Sections ─── */
const ScheduleSection = () => (<Card><SectionHeader title="Class Schedule — Monday" action={<div style={{ display: "flex", gap: 6 }}>{["Mon", "Tue", "Wed", "Thu", "Fri"].map(d => <Btn key={d} variant={d === "Mon" ? "primary" : "secondary"} style={{ padding: "5px 12px", fontSize: 12 }}>{d}</Btn>)}</div>} />{schedule.map((s, i) => <ScheduleItem key={i} {...s} />)}</Card>);
const InvoiceSection = () => (<Card><SectionHeader title="Invoices" action={<Btn variant="primary">+ New Invoice</Btn>} /><Table columns={[
  { key: "id", label: "Invoice", render: v => <span style={{ fontFamily: T.fontMono, fontSize: 12 }}>{v}</span> },
  { key: "student", label: "Student" }, { key: "amount", label: "Amount", render: v => <span style={{ fontWeight: 600 }}>{v}</span> },
  { key: "due", label: "Due Date" }, { key: "status", label: "Status", render: v => statusBadge(v) },
]} data={invoices} /></Card>);
const AttendanceSection = () => (<div>
  <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px,1fr))", gap: 14, marginBottom: 16 }}>
    <StatCard label="Present Today" value="245" sub="92.4%" icon="check" color={T.success} bg={T.successBg} />
    <StatCard label="Absent" value="12" sub="4.5%" icon="x" color={T.danger} bg={T.dangerBg} />
    <StatCard label="Late" value="8" sub="3.0%" icon="clock" color={T.warn} bg={T.warnBg} />
  </div>
  <Card><SectionHeader title="Daily Attendance Log" /><Table columns={[
    { key: "date", label: "Date" },
    { key: "present", label: "Present", render: v => <span style={{ color: T.success, fontWeight: 600 }}>{v}</span> },
    { key: "absent", label: "Absent", render: v => <span style={{ color: T.danger, fontWeight: 600 }}>{v}</span> },
    { key: "late", label: "Late", render: v => <span style={{ color: T.warn, fontWeight: 600 }}>{v}</span> },
    { key: "total", label: "Rate", render: (_, r) => <div style={{ display: "flex", alignItems: "center", gap: 8 }}><Progress value={(r.present / r.total) * 100} color={T.success} /><span style={{ fontSize: 12, fontFamily: T.fontMono }}>{((r.present / r.total) * 100).toFixed(1)}%</span></div> },
  ]} data={attendanceData} /></Card>
</div>);
const MarkAttendance = () => {
  const [marks, setMarks] = useState({});
  return (<Card><SectionHeader title="Mark Attendance — Class 10-A — Apr 10" action={<Btn variant="primary">Submit</Btn>} /><Table columns={[
    { key: "name", label: "Student", render: v => <div style={{ display: "flex", alignItems: "center", gap: 8 }}><Avatar name={v} size={26} />{v}</div> },
    { key: "id", label: "Status", render: v => (<div style={{ display: "flex", gap: 6 }}>{["P", "A", "L"].map(s => (<button key={s} onClick={() => setMarks(p => ({ ...p, [v]: s }))} style={{ width: 32, height: 32, borderRadius: "50%", border: `2px solid ${marks[v] === s ? (s === "P" ? T.success : s === "A" ? T.danger : T.warn) : T.border}`, background: marks[v] === s ? (s === "P" ? T.successBg : s === "A" ? T.dangerBg : T.warnBg) : "transparent", color: marks[v] === s ? (s === "P" ? T.success : s === "A" ? T.danger : T.warn) : T.textMuted, fontWeight: 700, fontSize: 12, cursor: "pointer", fontFamily: T.font }}>{s}</button>))}</div>) },
  ]} data={students.filter(s => s.class === "10-A")} /></Card>);
};
const ExamSection = () => (<Card><SectionHeader title="Exams, Quizzes & Labs" action={<Btn variant="primary">+ Schedule Exam</Btn>} /><Table columns={[
  { key: "id", label: "ID", render: v => <span style={{ fontFamily: T.fontMono, fontSize: 12 }}>{v}</span> },
  { key: "title", label: "Title", render: v => <span style={{ fontWeight: 600 }}>{v}</span> },
  { key: "subject", label: "Subject" }, { key: "date", label: "Date" },
  { key: "type", label: "Type", render: v => <Badge color={v === "Exam" ? T.accent : v === "Quiz" ? T.info : T.success} bg={v === "Exam" ? T.accentBg : v === "Quiz" ? T.infoBg : T.successBg}>{v}</Badge> },
  { key: "status", label: "Status", render: v => statusBadge(v) },
]} data={exams} /></Card>);

/* ══════════════════════════════════════════════════════
   DASHBOARD LAYOUT (Sidebar + Topbar)
   ══════════════════════════════════════════════════════ */
const roleLabels = { admin: "Administrator", teacher: "Teacher", student: "Student", parent: "Parent" };
const roleColors = { admin: T.accent, teacher: T.info, student: T.success, parent: T.warn };
const sidebarItems = {
  admin: [{ key: "dashboard", icon: "home", label: "Dashboard" }, { key: "students", icon: "users", label: "Students" }, { key: "schedule", icon: "calendar", label: "Schedule" }, { key: "invoices", icon: "dollar", label: "Invoices" }, { key: "attendance", icon: "check", label: "Attendance" }, { key: "exams", icon: "file", label: "Exams" }],
  teacher: [{ key: "dashboard", icon: "home", label: "My Classes" }, { key: "schedule", icon: "calendar", label: "Schedule" }, { key: "attendance", icon: "check", label: "Attendance" }, { key: "exams", icon: "file", label: "Grading" }],
  student: [{ key: "dashboard", icon: "home", label: "Dashboard" }, { key: "schedule", icon: "calendar", label: "Schedule" }, { key: "exams", icon: "file", label: "Exams" }, { key: "invoices", icon: "dollar", label: "Fees" }],
  parent: [{ key: "dashboard", icon: "home", label: "Overview" }, { key: "attendance", icon: "check", label: "Attendance" }, { key: "exams", icon: "file", label: "Results" }, { key: "invoices", icon: "dollar", label: "Invoices" }],
};

const DashboardLayout = ({ user, onLogout }) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [page, setPage] = useState("dashboard");
  const DashComp = { admin: AdminDashboard, teacher: TeacherDashboard, student: StudentDashboard, parent: ParentDashboard }[user.role];

  return (
    <div style={{ fontFamily: T.font, background: T.bg, minHeight: "100vh", display: "flex", color: T.text }}>
      <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=Playfair+Display:wght@400;600;700;800&family=JetBrains+Mono:wght@400;600&display=swap" rel="stylesheet" />

      <aside style={{ width: sidebarOpen ? 240 : 0, overflow: "hidden", background: T.surface, borderRight: `1px solid ${T.border}`, display: "flex", flexDirection: "column", transition: "width .2s ease", flexShrink: 0 }}>
        <div style={{ padding: "20px 18px 12px", borderBottom: `1px solid ${T.border}` }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{ width: 34, height: 34, borderRadius: T.radiusSm, background: T.accent, display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontWeight: 800, fontSize: 15 }}>E</div>
            <div><div style={{ fontSize: 15, fontWeight: 700, whiteSpace: "nowrap" }}>EduPulse</div><div style={{ fontSize: 11, color: T.textMuted, whiteSpace: "nowrap" }}>School Management</div></div>
          </div>
        </div>
        <nav style={{ flex: 1, padding: "8px 8px", overflowY: "auto" }}>
          {(sidebarItems[user.role] || []).map(item => (
            <button key={item.key} onClick={() => setPage(item.key)} style={{
              display: "flex", alignItems: "center", gap: 10, width: "100%", padding: "9px 12px", border: "none", borderRadius: T.radiusSm, cursor: "pointer", fontFamily: T.font,
              background: page === item.key ? T.surfaceAlt : "transparent", color: page === item.key ? T.text : T.textMuted, fontWeight: page === item.key ? 600 : 400, fontSize: 13, textAlign: "left", transition: "all .12s",
            }}>{I(item.icon, { size: 16, color: page === item.key ? T.accent : T.textMuted })}{item.label}</button>
          ))}
        </nav>
        <div style={{ padding: "12px 14px", borderTop: `1px solid ${T.border}` }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
            <Avatar name={user.name} size={30} color={roleColors[user.role]} />
            <div style={{ overflow: "hidden" }}><div style={{ fontSize: 13, fontWeight: 600, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{user.name}</div><div style={{ fontSize: 11, color: T.textMuted }}>{roleLabels[user.role]}</div></div>
          </div>
          <button onClick={onLogout} style={{ display: "flex", alignItems: "center", gap: 8, width: "100%", padding: "8px 10px", border: `1px solid ${T.border}`, borderRadius: T.radiusSm, background: "transparent", cursor: "pointer", fontFamily: T.font, fontSize: 12, color: T.textMuted, fontWeight: 500 }}>
            {I("logout", { size: 14, color: T.textMuted })} Sign Out
          </button>
        </div>
      </aside>

      <div style={{ flex: 1, display: "flex", flexDirection: "column", minWidth: 0 }}>
        <header style={{ height: 56, background: T.surface, borderBottom: `1px solid ${T.border}`, display: "flex", alignItems: "center", padding: "0 20px", gap: 12, flexShrink: 0 }}>
          <button onClick={() => setSidebarOpen(!sidebarOpen)} style={{ border: "none", background: "none", cursor: "pointer", padding: 4 }}>{I(sidebarOpen ? "x" : "menu", { size: 20, color: T.text })}</button>
          <span style={{ fontSize: 15, fontWeight: 700, color: T.text, flex: 1 }}>{roleLabels[user.role]} Dashboard</span>
          <div style={{ display: "flex", alignItems: "center", gap: 4, background: T.surfaceAlt, borderRadius: 99, padding: "6px 14px" }}>
            {I("search", { size: 14 })}<input placeholder="Search..." style={{ border: "none", background: "transparent", outline: "none", fontFamily: T.font, fontSize: 13, width: 140, color: T.text }} />
          </div>
          <div style={{ position: "relative", cursor: "pointer" }}>{I("bell", { size: 18, color: T.text })}<div style={{ position: "absolute", top: -2, right: -2, width: 8, height: 8, borderRadius: "50%", background: T.danger, border: `2px solid ${T.surface}` }} /></div>
        </header>
        <main style={{ flex: 1, padding: 20, overflowY: "auto" }}><DashComp /></main>
      </div>
    </div>
  );
};

/* ══════════════════════════════════════════════════════
   APP ROOT — Router
   ══════════════════════════════════════════════════════ */
export default function App() {
  const [view, setView] = useState("landing");
  const [user, setUser] = useState(null);

  const handleLogin = (u) => { setUser(u); setView("dashboard"); };
  const handleLogout = () => { setUser(null); setView("landing"); };

  if (view === "landing") return <LandingPage onNavigate={setView} />;
  if (view === "login") return <LoginPage onLogin={handleLogin} onNavigate={setView} />;
  if (view === "dashboard" && user) return <DashboardLayout user={user} onLogout={handleLogout} />;
  return <LandingPage onNavigate={setView} />;
}