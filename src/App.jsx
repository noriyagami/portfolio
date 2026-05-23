import { useState, useEffect } from "react";
import pfp from './assets/pfp.jpg';

const getStyle = (dark) => `
  @import url('https://fonts.googleapis.com/css2?family=VT323&family=Share+Tech+Mono&display=swap');

  * { box-sizing: border-box; margin: 0; padding: 0; }

  body {
    background: ${dark ? "#1a1a2e" : "#008080"};
    background-image: repeating-linear-gradient(
      45deg, transparent, transparent 2px,
      rgba(${dark ? "255,255,255" : "0,0,0"},0.03) 2px,
      rgba(${dark ? "255,255,255" : "0,0,0"},0.03) 4px
    );
    min-height: 100vh;
    font-family: 'Share Tech Mono', 'Courier New', monospace;
    font-size: 13px;
    color: ${dark ? "#e0e0e0" : "#000"};
    overflow-x: hidden;
    transition: background 0.3s ease;
  }

  .win98-btn {
    background: ${dark ? "#2a2a3e" : "#c0c0c0"};
    border-top: 2px solid ${dark ? "#555577" : "#fff"};
    border-left: 2px solid ${dark ? "#555577" : "#fff"};
    border-right: 2px solid ${dark ? "#111122" : "#404040"};
    border-bottom: 2px solid ${dark ? "#111122" : "#404040"};
    padding: 2px 8px;
    font-family: 'Share Tech Mono', monospace;
    font-size: 11px;
    cursor: pointer;
    color: ${dark ? "#e0e0e0" : "#000"};
  }
  .win98-btn:active {
    border-top: 2px solid ${dark ? "#111122" : "#404040"};
    border-left: 2px solid ${dark ? "#111122" : "#404040"};
    border-right: 2px solid ${dark ? "#555577" : "#fff"};
    border-bottom: 2px solid ${dark ? "#555577" : "#fff"};
  }
  .win98-btn:hover { background: ${dark ? "#3a3a5e" : "#d4d0c8"}; }

  .win98-window {
    background: ${dark ? "#2a2a3e" : "#c0c0c0"};
    border-top: 2px solid ${dark ? "#555577" : "#fff"};
    border-left: 2px solid ${dark ? "#555577" : "#fff"};
    border-right: 2px solid ${dark ? "#111122" : "#404040"};
    border-bottom: 2px solid ${dark ? "#111122" : "#404040"};
    transition: background 0.3s ease;
  }

  .titlebar {
    background: ${dark ? "linear-gradient(to right, #1a0050, #4a0080)" : "linear-gradient(to right, #000080, #1084d0)"};
    color: white;
    padding: 3px 6px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-family: 'Share Tech Mono', monospace;
    font-size: 12px;
    font-weight: bold;
    user-select: none;
  }

  .titlebar-btns { display: flex; gap: 2px; }

  .titlebar-btn {
    width: 16px; height: 14px;
    background: ${dark ? "#2a2a3e" : "#c0c0c0"};
    border-top: 1px solid ${dark ? "#555577" : "#fff"};
    border-left: 1px solid ${dark ? "#555577" : "#fff"};
    border-right: 1px solid ${dark ? "#111122" : "#404040"};
    border-bottom: 1px solid ${dark ? "#111122" : "#404040"};
    font-size: 10px;
    display: flex; align-items: center; justify-content: center;
    cursor: pointer;
    color: ${dark ? "#e0e0e0" : "#000"};
    font-family: 'Share Tech Mono', monospace;
  }

  .menubar {
    display: flex;
    background: ${dark ? "#2a2a3e" : "#c0c0c0"};
    padding: 2px 4px;
    border-bottom: 1px solid ${dark ? "#111122" : "#808080"};
  }

  .menu-item {
    padding: 2px 8px; font-size: 12px; cursor: pointer;
    color: ${dark ? "#e0e0e0" : "#000"};
    font-family: 'Share Tech Mono', monospace;
  }
  .menu-item:hover { background: ${dark ? "#4a0080" : "#000080"}; color: #fff; }

  .notepad-content {
    background: ${dark ? "#12121e" : "#fff"};
    border-top: 2px solid ${dark ? "#111122" : "#808080"};
    border-left: 2px solid ${dark ? "#111122" : "#808080"};
    border-right: 1px solid ${dark ? "#555577" : "#fff"};
    border-bottom: 1px solid ${dark ? "#555577" : "#fff"};
    padding: 16px; overflow-y: auto;
    font-family: 'Share Tech Mono', 'Courier New', monospace;
    font-size: 13px; line-height: 1.6;
    color: ${dark ? "#d0d0f0" : "#000"};
    transition: background 0.3s ease, color 0.3s ease;
  }

  .statusbar {
    background: ${dark ? "#2a2a3e" : "#c0c0c0"};
    border-top: 1px solid ${dark ? "#111122" : "#808080"};
    padding: 2px 8px; font-size: 11px;
    display: flex; gap: 8px;
    color: ${dark ? "#a0a0c0" : "#000"};
    font-family: 'Share Tech Mono', monospace;
  }

  .statusbar-item {
    border-top: 2px solid ${dark ? "#111122" : "#808080"};
    border-left: 2px solid ${dark ? "#111122" : "#808080"};
    border-right: 1px solid ${dark ? "#555577" : "#fff"};
    border-bottom: 1px solid ${dark ? "#555577" : "#fff"};
    padding: 1px 8px;
  }

  .scrollbar-h {
    height: 16px;
    background: ${dark ? "#2a2a3e" : "#c0c0c0"};
    border-top: 1px solid ${dark ? "#111122" : "#808080"};
    display: flex; align-items: center; justify-content: space-between;
    padding: 0 2px;
  }

  .file-explorer-bar {
    background: ${dark ? "#2a2a3e" : "#c0c0c0"};
    border-bottom: 2px solid ${dark ? "#111122" : "#808080"};
    display: flex; align-items: center; gap: 4px;
    padding: 4px 8px; font-size: 12px;
    letter-spacing: 1px; text-transform: uppercase;
    font-family: 'Share Tech Mono', monospace;
  }

  .file-explorer-btn {
    padding: 2px 12px;
    border-top: 2px solid ${dark ? "#555577" : "#fff"};
    border-left: 2px solid ${dark ? "#555577" : "#fff"};
    border-right: 2px solid ${dark ? "#111122" : "#404040"};
    border-bottom: 2px solid ${dark ? "#111122" : "#404040"};
    background: ${dark ? "#2a2a3e" : "#c0c0c0"};
    font-family: 'Share Tech Mono', monospace;
    font-size: 11px; cursor: pointer;
    color: ${dark ? "#e0e0e0" : "#000"};
    text-transform: uppercase; letter-spacing: 1px;
  }
  .file-explorer-btn.active {
    border-top: 2px solid ${dark ? "#111122" : "#404040"};
    border-left: 2px solid ${dark ? "#111122" : "#404040"};
    border-right: 2px solid ${dark ? "#555577" : "#fff"};
    border-bottom: 2px solid ${dark ? "#555577" : "#fff"};
    background: ${dark ? "#12121e" : "#d4d0c8"};
  }
  .file-explorer-btn:hover:not(.active) { background: ${dark ? "#3a3a5e" : "#d4d0c8"}; }

  .section-label {
    font-family: 'Share Tech Mono', monospace;
    font-size: 13px; text-decoration: underline;
    margin-bottom: 4px; margin-top: 16px;
    color: ${dark ? "#b0b0e0" : "#000"};
  }

  .bunny-svg {
    border: 2px solid ${dark ? "#6600cc" : "#000080"};
    background: ${dark ? "#12121e" : "#fff"};
    padding: 8px;
  }

  a { color: ${dark ? "#9988ff" : "#000080"}; text-decoration: underline; }
  a:hover { color: ${dark ? "#bbaaff" : "#0000ff"}; }

  .blink { animation: blink 1s step-end infinite; }
  @keyframes blink { 50% { opacity: 0; } }

  .taskbar {
    position: fixed; bottom: 0; left: 0; right: 0;
    height: 28px;
    background: ${dark ? "#2a2a3e" : "#c0c0c0"};
    border-top: 2px solid ${dark ? "#555577" : "#fff"};
    display: flex; align-items: center;
    padding: 0 4px; gap: 4px; z-index: 100;
    transition: background 0.3s ease;
  }

  .start-btn {
    background: ${dark ? "#2a2a3e" : "#c0c0c0"};
    border-top: 2px solid ${dark ? "#555577" : "#fff"};
    border-left: 2px solid ${dark ? "#555577" : "#fff"};
    border-right: 2px solid ${dark ? "#111122" : "#404040"};
    border-bottom: 2px solid ${dark ? "#111122" : "#404040"};
    padding: 2px 10px;
    font-family: 'Share Tech Mono', monospace;
    font-size: 12px; font-weight: bold; cursor: pointer;
    color: ${dark ? "#e0e0e0" : "#000"};
  }

  .taskbar-window {
    background: ${dark ? "#2a2a3e" : "#c0c0c0"};
    border-top: 2px solid ${dark ? "#111122" : "#808080"};
    border-left: 2px solid ${dark ? "#111122" : "#808080"};
    border-right: 1px solid ${dark ? "#555577" : "#fff"};
    border-bottom: 1px solid ${dark ? "#555577" : "#fff"};
    padding: 2px 12px;
    font-family: 'Share Tech Mono', monospace;
    font-size: 11px; cursor: pointer;
    color: ${dark ? "#e0e0e0" : "#000"};
    min-width: 120px;
  }

  .taskbar-clock {
    margin-left: auto;
    border-top: 2px solid ${dark ? "#111122" : "#808080"};
    border-left: 2px solid ${dark ? "#111122" : "#808080"};
    border-right: 1px solid ${dark ? "#555577" : "#fff"};
    border-bottom: 1px solid ${dark ? "#555577" : "#fff"};
    padding: 2px 8px;
    font-family: 'Share Tech Mono', monospace;
    font-size: 11px;
    color: ${dark ? "#e0e0e0" : "#000"};
  }

  @keyframes fadeIn {
    from { opacity: 0; transform: scale(0.97); }
    to { opacity: 1; transform: scale(1); }
  }
  .fade-in { animation: fadeIn 0.15s ease; }
`;

const pages = ["WORKS", "DIGITAL"];

const sections = {
  WORKS: {
    title: "WORKS",
    items: [
      { name: "UNBLOCK ME", link: "https://noriyagami.github.io/unblock/", date: "2025" }
    ]
  },
  DIGITAL: {
    title: "Digital Work",
    items: [
      { name: "MI AMOR", link: "https://imgur.com/a/SHN1m2b", date: "2024" },

    ]
  },
};

function Clock({ dark }) {
  const [time, setTime] = useState(() =>
    new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  );
  useEffect(() => {
    const t = setInterval(() =>
      setTime(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })), 10000
    );
    return () => clearInterval(t);
  }, []);
  return <div className="taskbar-clock">{time}</div>;
}

export default function Portfolio() {
  const [activeTab, setActiveTab] = useState("ABOUT");
  const [activeSection, setActiveSection] = useState("WORKS");
  const [dark, setDark] = useState(false);

  const isAbout = activeTab === "ABOUT" || activeTab === "HOME";
  const gray = dark ? "#2a2a3e" : "#c0c0c0";
  const text = dark ? "#d0d0f0" : "#000";
  const border808 = dark ? "#111122" : "#808080";

  return (
    <>
      <style>{getStyle(dark)}</style>

      <div style={{ padding: "16px 16px 40px", maxWidth: "1100px", margin: "0 auto" }}>
        <div className="win98-window fade-in">

          {/* TITLE BAR */}
          <div className="titlebar">
            <span>📁 FILE EXPLORER — PROJECTS</span>
            <div className="titlebar-btns">
              <div className="titlebar-btn">_</div>
              <div className="titlebar-btn">□</div>
              <div className="titlebar-btn" style={{ fontWeight: "bold" }}>✕</div>
            </div>
          </div>

          {/* NAV BAR with pill toggle */}
          <div className="file-explorer-bar">
            <button
              className={`file-explorer-btn ${isAbout ? "active" : ""}`}
              onClick={() => setActiveTab("HOME")}
            >HOME</button>
            {pages.map(p => (
              <button
                key={p}
                className={`file-explorer-btn ${activeTab === p ? "active" : ""}`}
                onClick={() => { setActiveTab(p); setActiveSection(p); }}
              >{p}</button>
            ))}

            {/* 🌙 DARK / LIGHT PILL TOGGLE */}
            <div style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: "6px" }}>
              <span style={{ fontSize: "13px", fontFamily: "Share Tech Mono", color: dark ? "#e0e0e0" : "#000" }}>
                {dark ? "☀" : "☾"}
              </span>
              <div
                onClick={() => setDark(d => !d)}
                title={dark ? "Switch to Light Mode" : "Switch to Dark Mode"}
                style={{
                  width: "48px", height: "20px",
                  background: dark ? "#6600cc" : "#808080",
                  borderRadius: "10px",
                  cursor: "pointer",
                  position: "relative",
                  border: "2px solid #404040",
                  transition: "background 0.2s ease",
                  flexShrink: 0,
                }}
              >
                <div style={{
                  position: "absolute",
                  top: "2px",
                  left: dark ? "26px" : "2px",
                  width: "12px", height: "12px",
                  background: "#fff",
                  borderRadius: "50%",
                  transition: "left 0.2s ease",
                }} />
              </div>
            </div>
          </div>

          {/* MAIN LAYOUT */}
          <div style={{ display: "flex", minHeight: "600px" }}>

            {/* MAIN CONTENT AREA */}
            <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
              <div style={{ margin: "8px", flex: 1 }}>
                <div className="win98-window" style={{ height: "100%" }}>
                  <div className="titlebar">
                    <span>📝 NOTEPAD.EXE — {isAbout ? "about_me.txt" : `${activeTab.toLowerCase()}.txt`}</span>
                    <div className="titlebar-btns">
                      <div className="titlebar-btn">_</div>
                      <div className="titlebar-btn">□</div>
                      <div className="titlebar-btn">✕</div>
                    </div>
                  </div>
                  <div className="menubar">
                    {["FILE", "OPTIONS", "WINDOW", "HELP"].map(m => (
                      <span key={m} className="menu-item">{m}</span>
                    ))}
                  </div>

                  <div className="notepad-content" style={{ minHeight: "460px" }}>
                    {isAbout && <AboutContent dark={dark} />}
                    {!isAbout && (
                      <ProjectsContent section={activeTab} data={sections[activeTab]} dark={dark} />
                    )}
                  </div>

                  <div className="scrollbar-h">
                    <button className="win98-btn" style={{ width: 16, height: 14, padding: 0, fontSize: 10 }}>◀</button>
                    <button className="win98-btn" style={{ width: 16, height: 14, padding: 0, fontSize: 10 }}>▶</button>
                  </div>
                </div>
              </div>

              <div className="statusbar">
                <div className="statusbar-item">C:\portfolio\{isAbout ? "about_me.txt" : `${activeTab.toLowerCase()}.txt`}</div>
                <div className="statusbar-item" style={{ marginLeft: "auto" }}>{isAbout ? "2 of 30" : "1 of 30"}</div>
              </div>
            </div>

            {/* RIGHT CONTACT PANEL */}
            <div style={{ width: "180px", background: gray, borderLeft: `2px solid ${border808}`, padding: "12px 10px", transition: "background 0.3s ease" }}>
              <div style={{ fontFamily: "Share Tech Mono", fontSize: "13px", fontWeight: "bold", marginBottom: "8px", textDecoration: "underline", color: text }}>
                CONTACT INFO
              </div>
              <div style={{ fontFamily: "Share Tech Mono", fontSize: "11px", lineHeight: "1.9", color: text }}>
                <div>website:</div>
                <a href="" style={{ fontSize: 10 }}></a>
                <br /><br />
                <div>email:</div>
                <span style={{ fontSize: 10 }}>christianabrantes13@<br />gmail.com</span>
                <br /><br />
                <div>ig: chaaaan_0.0</div>
                <br />
                <div>socials:</div>
                <a href="https://github.com/noriyagami" style={{ fontSize: 10 }}>github/<br />noriyagami</a>
                <br /><br />
                <div>phone #<br />09213266647</div>
              </div>
              <div style={{ marginTop: "24px", borderTop: `1px solid ${border808}`, paddingTop: "10px" }}>
                <div style={{ fontFamily: "Share Tech Mono", fontSize: "10px", color: dark ? "#7070a0" : "#555", lineHeight: 1.6 }}>
                  <div className="blink">█</div>
                  <div>file 1</div>
                </div>
              </div>
            </div>
          </div>

          {/* BOTTOM ROW */}
          {isAbout && (
            <div style={{ background: gray, borderTop: `2px solid ${border808}`, padding: "10px 16px", fontFamily: "Share Tech Mono", fontSize: "12px", lineHeight: "2", color: text, transition: "background 0.3s ease" }}>
              <div style={{ display: "flex", gap: "48px", flexWrap: "wrap" }}>
                <div style={{ marginLeft: "auto", fontStyle: "italic", fontSize: "36px", fontFamily: "VT323", color: dark ? "#9988ff" : "#333", alignSelf: "flex-end" }}>
                  CHAN
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* TASKBAR */}
      <div className="taskbar">
        <button className="start-btn">▶ Start</button>
        <div className="taskbar-window">📁 FILE EXPLORER–PROJECTS</div>
        <div className="taskbar-window">📝 NOTEPAD.EXE</div>
        <Clock dark={dark} />
      </div>
    </>
  );
}

function AboutContent({ dark }) {
  const text = dark ? "#d0d0f0" : "#000";
  const muted = dark ? "#9090c0" : "#555";

  return (
    <div style={{ color: text }}>
      <div style={{ fontSize: "42px", fontFamily: "VT323", lineHeight: 1, marginBottom: "20px", color: dark ? "#cc88ff" : "#000" }}>about me</div>

      <div style={{ display: "flex", gap: "24px", flexWrap: "wrap" }}>
        <div style={{ display: "flex", gap: "20px", flex: 1, minWidth: "280px" }}>
          <div className="bunny-svg" style={{ flexShrink: 0 }}>
            <img
              src={pfp}
              alt="profile"
              style={{ width: "150px", height: "170px", objectFit: "cover", display: "block" }}
            />
          </div>
          <div style={{ lineHeight: 1.7 }}>
            <div><strong>NAME:</strong> Christian/Chan</div>
            <div><strong>AGE:</strong> 20</div>
            <div><strong>LOCATION:</strong> PH</div>
            <div><strong>OCCUPATION:</strong> UI/UX Designer &amp; editor</div>
            <br />
            <div style={{ fontSize: "12px", lineHeight: 1.7, color: muted }}>
              Motivated and diligent second-year BSIT student with hands-on experience
              in troubleshooting basic network issues, organizing data, and collaborating
              on group projects. Demonstrates strong problem-solving abilities and a practical
              approach to technical challenges. Eager to apply academic knowledge to real-world
              environments and continually grow through new learning opportunities. Committed to
              leveraging technology to create meaningful, positive impacts within the community.
            </div>
          </div>
        </div>
      </div>

      <div style={{ display: "flex", gap: "40px", marginTop: "20px", flexWrap: "wrap" }}>
        <div style={{ flex: 1, minWidth: "200px" }}>
          <div className="section-label">SKILLS:</div>
          <div>software&gt;</div>
          <div style={{ paddingLeft: "24px" }}>Figma (photoshop, illustrator,</div>
          <div style={{ paddingLeft: "24px" }}>Canva, premiere, after effects)</div>
          <div>coding langauges&gt;</div>
          <div style={{ paddingLeft: "24px" }}>HTML, CSS, ReactJS, Javascript</div>
        </div>
        <div style={{ flex: 1, minWidth: "200px" }}>
          <div className="section-label">EDUCATION:</div>
          <div>BA in Information Technology</div>
          <div style={{ textAlign: "right", fontSize: "12px", color: muted }}>2023-2027</div>
          <div style={{ textAlign: "right", fontSize: "12px", color: muted }}>Quezon City University</div>
        </div>
      </div>
    </div>
  );
}

function ProjectsContent({ section, data, dark }) {
  const [selected, setSelected] = useState(null);
  const text = dark ? "#d0d0f0" : "#000";
  const muted = dark ? "#9090c0" : "#555";
  const rowEven = dark ? "#1a1a2e" : "#fff";
  const rowOdd  = dark ? "#12121e" : "#f4f4f4";

  return (
    <div style={{ color: text }}>
      <div style={{ fontSize: "36px", fontFamily: "VT323", lineHeight: 1, marginBottom: "16px", color: dark ? "#cc88ff" : "#000" }}>
        {data.title}
      </div>

      <div style={{ marginBottom: "12px", fontSize: "12px", color: muted }}>
        C:\portfolio\{section.toLowerCase()}\ — {data.items.length} items
      </div>

      <table style={{ width: "100%", borderCollapse: "collapse", fontFamily: "Share Tech Mono", fontSize: "13px" }}>
        <thead>
          <tr style={{ background: dark ? "#4a0080" : "#000080", color: "#fff" }}>
            <th style={{ padding: "4px 8px", textAlign: "left", fontWeight: "normal" }}>Name</th>
            <th style={{ padding: "4px 8px", textAlign: "right", fontWeight: "normal" }}>Date</th>
          </tr>
        </thead>
        <tbody>
          {data.items.map((item, i) => (
            <tr
              key={i}
              style={{
                background: selected === i ? (dark ? "#4a0080" : "#000080") : i % 2 === 0 ? rowEven : rowOdd,
                color: selected === i ? "#fff" : text,
                cursor: "pointer",
              }}
              onClick={() => setSelected(selected === i ? null : i)}
            >
              <td style={{ padding: "5px 8px" }}>📄 {item.name}</td>
              <td style={{ padding: "5px 8px", textAlign: "right" }}>{item.date}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {selected !== null && (
        <div className="win98-window fade-in" style={{ marginTop: "16px" }}>
          <div className="titlebar">
            <span>📄 {data.items[selected].name}</span>
            <div className="titlebar-btns">
              <div className="titlebar-btn" onClick={() => setSelected(null)}>✕</div>
            </div>
          </div>
          <div style={{ padding: "12px 16px", background: dark ? "#12121e" : "#fff", fontFamily: "Share Tech Mono", fontSize: "12px", lineHeight: 1.8, color: text }}>
            <div><strong>File:</strong>{" "}
            {data.items[selected].link ? (
            <a href={data.items[selected].link} target="_blank" rel="noreferrer">
            {data.items[selected].link}
            </a>
            ) : "no link available"}
           </div>
            <div><strong>Year:</strong> {data.items[selected].date}</div>
            <div><strong>Category:</strong> {section}</div>
            <div style={{ marginTop: "8px", color: muted }}>[Click another file to view, or press ✕ to close]</div>
          </div>
        </div>
      )}

      <div style={{ marginTop: "24px", fontSize: "11px", color: muted, fontFamily: "Share Tech Mono" }}>
        {data.items.length} object(s) • Click a row to select
      </div>
    </div>
  );
}
