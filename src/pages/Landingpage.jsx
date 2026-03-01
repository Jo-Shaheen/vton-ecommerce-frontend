import { useState, useEffect } from "react";

/* ─────────────────────────────────────────────
   AINAI – HomePage.jsx
   Landing page for the MENA VTON platform
   Imports design tokens from variables.css
   via globals.css (already imported in main.jsx)
───────────────────────────────────────────── */

// ── Inline style helpers that consume CSS variables ──
const v = (name) => `var(${name})`;

// ── Fake product data ──
const TRENDING = [
  { id: 1, name: "Kaftan Al-Noor", brand: "Dar Zain", price: "AED 420", tag: "VTON Ready", color: "#c9b08a" },
  { id: 2, name: "Embroidered Abaya", brand: "Lulwa Studio", price: "AED 680", tag: "Bestseller", color: "#8B4852" },
  { id: 3, name: "Silk Jalabiya", brand: "Ghaya Collection", price: "AED 390", tag: "New", color: "#A8B5A0" },
  { id: 4, name: "Modern Thobe", brand: "Oud & Silk", price: "AED 510", tag: "VTON Ready", color: "#6d3640" },
];

const BRANDS = ["Dar Zain", "Lulwa Studio", "Ghaya", "Oud & Silk", "Al Waha", "Zomoroda"];

const STEPS = [
  { num: "01", title: "Browse", desc: "Discover modest fashion from top MENA designers." },
  { num: "02", title: "Upload", desc: "Upload your photo — it stays private & auto-deletes in 7 days." },
  { num: "03", title: "Generate", desc: "Our Flux AI renders the garment on your body in seconds." },
  { num: "04", title: "Buy with Confidence", desc: "See the fit before checkout. Fewer returns, more smiles." },
];

// ── Eye Logo SVG ──
function EyeLogo({ size = 40, primaryColor = "#8B4852", accentColor = "#D4AF7A" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 80 80" fill="none">
      <path d="M10 40 C10 40 25 15 40 15 C55 15 70 40 70 40 C70 40 55 65 40 65 C25 65 10 40 10 40Z"
        fill={primaryColor} opacity="0.15" />
      <ellipse cx="40" cy="40" rx="20" ry="20" fill={primaryColor} opacity="0.9" />
      <ellipse cx="40" cy="40" rx="10" ry="10" fill={accentColor} />
      <ellipse cx="44" cy="36" rx="3" ry="3" fill="white" opacity="0.8" />
    </svg>
  );
}

// ── Animated Eye Blink ──
function AnimatedLogo() {
    const [blink, setBlink] = useState(false);
    useEffect(() => {
        const t = setInterval(() => {
            setBlink(true);
            const timeout = setTimeout(() => setBlink(false), 200);
            return () => clearTimeout(timeout);
        }, 3000);
        return () => clearInterval(t);
    }, []);
    return (
        <div style={{ display: "flex", alignItems: "center", gap: "10px", cursor: "pointer" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
                <div style={{ transform: blink ? "scaleY(0.1)" : "scaleY(1)", transition: "transform 0.1s ease" }}>
                    <EyeLogo size={32} />
                </div>
                <div style={{ transform: blink ? "scaleY(0.1)" : "scaleY(1)", transition: "transform 0.1s ease" }}>
                    <EyeLogo size={32} />
                </div>
            </div>
            <span style={{
                fontFamily: v("--font-serif"),
                fontSize: "1.6rem",
                fontWeight: 700,
                letterSpacing: v("--tracking-logo"),
                background: v("--gradient-brand"),
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
            }}>AINAI</span>
        </div>
    );
}

// ── Header ──
function Header() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  return (
    <header style={{
      position: "fixed", top: 0, left: 0, right: 0,
      height: v("--topbar-height"),
      background: scrolled ? "rgba(247,243,237,0.96)" : "transparent",
      backdropFilter: scrolled ? "blur(12px)" : "none",
      borderBottom: scrolled ? v("--border-light") : "none",
      display: "flex", alignItems: "center",
      padding: `0 ${v("--space-8")}`,
      justifyContent: "space-between",
      zIndex: v("--z-sticky"),
      transition: "all var(--transition-base)",
    }}>
      <AnimatedLogo />
      <nav style={{ display: "flex", gap: v("--space-8"), alignItems: "center" }}>
        {["Browse", "Brands", "How It Works"].map(item => (
          <a key={item} href="#" style={{
            fontFamily: v("--font-sans"),
            fontSize: v("--text-sm"),
            fontWeight: v("--weight-semibold"),
            color: v("--charcoal"),
            letterSpacing: v("--tracking-wide"),
            textTransform: "uppercase",
            opacity: 0.75,
            transition: "opacity var(--transition-fast)",
            textDecoration: "none",
          }}
            onMouseEnter={e => e.target.style.opacity = 1}
            onMouseLeave={e => e.target.style.opacity = 0.75}
          >{item}</a>
        ))}
      </nav>
      <div style={{ display: "flex", gap: v("--space-3"), alignItems: "center" }}>
        <button className="btn btn-outline" style={{
          padding: `${v("--space-2")} ${v("--space-5")}`,
          fontSize: v("--text-sm"),
          borderRadius: v("--radius-pill"),
          border: `1.5px solid ${v("--burgundy")}`,
          color: v("--burgundy"),
          background: "transparent",
          cursor: "pointer",
          fontWeight: 600,
          transition: "all var(--transition-fast)",
        }}
          onMouseEnter={e => { e.target.style.background = "var(--burgundy)"; e.target.style.color = "white"; }}
          onMouseLeave={e => { e.target.style.background = "transparent"; e.target.style.color = "var(--burgundy)"; }}
        >Sign In</button>
        <button className="btn btn-gold" style={{
          padding: `${v("--space-2")} ${v("--space-5")}`,
          fontSize: v("--text-sm"),
          borderRadius: v("--radius-pill"),
          background: v("--gold"),
          color: "white",
          border: "none",
          cursor: "pointer",
          fontWeight: 600,
          boxShadow: v("--shadow-gold"),
        }}>Join Free ✦</button>
      </div>
    </header>
  );
}

// ── Hero Section ──
function Hero() {

  return (
    <section style={{
      minHeight: "100vh",
      background: `radial-gradient(ellipse at 20% 50%, rgba(139,72,82,0.08) 0%, transparent 60%),
                   radial-gradient(ellipse at 80% 20%, rgba(212,175,122,0.10) 0%, transparent 50%),
                   var(--ivory)`,
      display: "flex",
      alignItems: "center",
      paddingTop: "80px",
      overflow: "hidden",
      position: "relative",
    }}>

      {/* Background arabesque motif */}
      <div style={{
        position: "absolute", inset: 0, opacity: 0.03,
        backgroundImage: `repeating-linear-gradient(45deg, var(--burgundy) 0, var(--burgundy) 1px, transparent 0, transparent 50%)`,
        backgroundSize: "30px 30px",
        pointerEvents: "none",
      }} />

      <div style={{
        maxWidth: v("--container-max"),
        margin: "0 auto",
        padding: `0 ${v("--space-8")}`,
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: v("--space-16"),
        alignItems: "center",
        width: "100%",
      }}>

        {/* Left – Copy */}
        <div style={{ animation: "fadeIn 0.8s ease forwards" }}>
          <span style={{
            display: "inline-block",
            fontFamily: v("--font-sans"),
            fontSize: v("--text-xs"),
            fontWeight: v("--weight-semibold"),
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            color: v("--gold-dark"),
            background: "rgba(212,175,122,0.12)",
            padding: `${v("--space-1")} ${v("--space-4")}`,
            borderRadius: v("--radius-pill"),
            marginBottom: v("--space-6"),
          }}>Powered by Flux AI · MENA Fashion</span>

          <h1 style={{
            fontFamily: v("--font-serif"),
            fontSize: "clamp(2.8rem, 5vw, 4.5rem)",
            fontWeight: 700,
            lineHeight: 1.1,
            color: v("--charcoal"),
            marginBottom: v("--space-6"),
          }}>
            See Yourself<br />
            <span style={{
              background: v("--gradient-brand"),
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}>Differently.</span>
          </h1>

          <p style={{
            fontFamily: v("--font-sans"),
            fontSize: v("--text-md"),
            color: v("--charcoal-light"),
            lineHeight: v("--leading-relaxed"),
            maxWidth: "440px",
            marginBottom: v("--space-8"),
          }}>
            AINAI (عيناي) brings AI Virtual Try-On to modest fashion.
            Upload your photo, choose a garment, and see the fit — before you buy.
          </p>

          <div style={{ display: "flex", gap: v("--space-4"), flexWrap: "wrap" }}>
            <button style={{
              fontFamily: v("--font-sans"),
              fontSize: v("--text-base"),
              fontWeight: 600,
              padding: `${v("--space-4")} ${v("--space-8")}`,
              borderRadius: v("--radius-pill"),
              background: v("--gold"),
              color: "white",
              border: "none",
              cursor: "pointer",
              boxShadow: v("--shadow-gold"),
              transition: "all var(--transition-base)",
              display: "flex", alignItems: "center", gap: "8px",
            }}
              onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = "0 8px 30px rgba(212,175,122,0.5)"; }}
              onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "var(--shadow-gold)"; }}
            >✨ Try it On Now</button>

            <button style={{
              fontFamily: v("--font-sans"),
              fontSize: v("--text-base"),
              fontWeight: 600,
              padding: `${v("--space-4")} ${v("--space-8")}`,
              borderRadius: v("--radius-pill"),
              background: "transparent",
              color: v("--burgundy"),
              border: `1.5px solid var(--burgundy)`,
              cursor: "pointer",
              transition: "all var(--transition-base)",
            }}
              onMouseEnter={e => { e.currentTarget.style.background = "var(--burgundy)"; e.currentTarget.style.color = "white"; }}
              onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "var(--burgundy)"; }}
            >Browse Collections</button>
          </div>

          {/* Trust signals */}
          <div style={{
            marginTop: v("--space-10"),
            display: "flex", gap: v("--space-6"), alignItems: "center",
          }}>
            {["🔒 Private & Secure", "🚚 Cash on Delivery", "↩️ Easy Returns"].map(t => (
              <span key={t} style={{
                fontFamily: v("--font-sans"),
                fontSize: v("--text-xs"),
                color: v("--charcoal-muted"),
                letterSpacing: v("--tracking-wide"),
              }}>{t}</span>
            ))}
          </div>
        </div>

        {/* Right – Split screen demo */}
        <div style={{ position: "relative", animation: "fadeIn 0.8s 0.2s ease both" }}>
          <div style={{
            borderRadius: v("--radius-xl"),
            overflow: "hidden",
            boxShadow: v("--shadow-lg"),
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            height: "520px",
            position: "relative",
          }}>
            {/* Left panel – hanger */}
            <div style={{
              background: v("--ivory-dark"),
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              padding: v("--space-6"),
              borderRight: "1px solid rgba(255,255,255,0.5)",
            }}>
              <div style={{
                width: "100px", height: "140px",
                background: v("--gradient-brand"),
                borderRadius: "60px 60px 30px 30px",
                opacity: 0.85,
                marginBottom: v("--space-4"),
                boxShadow: v("--shadow-md"),
              }} />
              <span style={{
                fontFamily: v("--font-sans"), fontSize: v("--text-xs"),
                color: v("--charcoal-muted"), letterSpacing: "0.15em", textTransform: "uppercase",
              }}>Product View</span>
            </div>

            {/* Right panel – on person */}
            <div style={{
              background: `linear-gradient(160deg, rgba(139,72,82,0.08), rgba(212,175,122,0.12))`,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              padding: v("--space-6"),
            }}>
              {/* Silhouette */}
              <div style={{ position: "relative", marginBottom: v("--space-4") }}>
                <div style={{
                  width: "60px", height: "60px", borderRadius: "50%",
                  background: v("--ivory-darker"), margin: "0 auto 8px",
                }} />
                <div style={{
                  width: "100px", height: "140px",
                  background: v("--gradient-brand"),
                  borderRadius: "50px 50px 20px 20px",
                  opacity: 0.9,
                  boxShadow: v("--shadow-burgundy"),
                }} />
                {/* AI badge */}
                <div style={{
                  position: "absolute", top: "-8px", right: "-20px",
                  background: v("--gold"),
                  color: "white",
                  fontSize: "10px",
                  fontWeight: 700,
                  padding: "3px 8px",
                  borderRadius: v("--radius-pill"),
                  boxShadow: v("--shadow-gold"),
                  letterSpacing: "0.05em",
                }}>✨ AI</div>
              </div>
              <span style={{
                fontFamily: v("--font-sans"), fontSize: v("--text-xs"),
                color: v("--burgundy"), letterSpacing: "0.15em", textTransform: "uppercase",
                fontWeight: 600,
              }}>On You</span>
            </div>

            {/* Center divider label */}
            <div style={{
              position: "absolute", top: "50%", left: "50%",
              transform: "translate(-50%, -50%)",
              background: "white",
              borderRadius: v("--radius-pill"),
              padding: `${v("--space-1")} ${v("--space-3")}`,
              fontSize: v("--text-xs"),
              fontWeight: 700,
              color: v("--charcoal-muted"),
              boxShadow: v("--shadow-md"),
              whiteSpace: "nowrap",
            }}>VS</div>
          </div>

          {/* Floating VTON card */}
          <div style={{
            position: "absolute",
            bottom: "-20px",
            left: "-20px",
            background: "white",
            borderRadius: v("--radius-lg"),
            padding: v("--space-4"),
            boxShadow: v("--shadow-lg"),
            display: "flex",
            alignItems: "center",
            gap: v("--space-3"),
            minWidth: "200px",
          }}>
            <div style={{
              width: "36px", height: "36px", borderRadius: v("--radius-circle"),
              background: "rgba(212,175,122,0.15)",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: "18px",
            }}>✨</div>
            <div>
              <div style={{ fontFamily: v("--font-sans"), fontSize: v("--text-xs"), fontWeight: 700, color: v("--charcoal") }}>
                VTON Generated
              </div>
              <div style={{ fontFamily: v("--font-sans"), fontSize: v("--text-xs"), color: v("--charcoal-muted") }}>
                23.4s · Flux AI
              </div>
            </div>
            <div style={{
              marginLeft: "auto",
              width: "8px", height: "8px", borderRadius: "50%",
              background: v("--sage-dark"),
              boxShadow: "0 0 0 3px rgba(138,156,128,0.2)",
            }} />
          </div>
        </div>
      </div>
    </section>
  );
}

// ── Brands Scroll ──
function BrandsScroll() {
  return (
    <section style={{
      padding: `${v("--space-12")} 0`,
      background: v("--white"),
      borderTop: v("--border-light"),
      borderBottom: v("--border-light"),
      overflow: "hidden",
    }}>
      <p style={{
        textAlign: "center",
        fontFamily: v("--font-sans"),
        fontSize: v("--text-xs"),
        letterSpacing: "0.2em",
        textTransform: "uppercase",
        color: v("--charcoal-muted"),
        marginBottom: v("--space-6"),
      }}>Trusted by MENA's finest boutiques</p>
      <div style={{ display: "flex", gap: v("--space-12"), justifyContent: "center", flexWrap: "wrap" }}>
        {BRANDS.map(b => (
          <span key={b} style={{
            fontFamily: v("--font-serif"),
            fontSize: v("--text-lg"),
            fontWeight: 400,
            color: v("--charcoal-muted"),
            fontStyle: "italic",
            transition: "color var(--transition-base)",
            cursor: "pointer",
          }}
            onMouseEnter={e => e.target.style.color = "var(--burgundy)"}
            onMouseLeave={e => e.target.style.color = "var(--charcoal-muted)"}
          >{b}</span>
        ))}
      </div>
    </section>
  );
}

// ── Trending Products Grid ──
function TrendingGrid() {
  const [hovered, setHovered] = useState(null);

  return (
    <section style={{
      padding: `${v("--space-20")} ${v("--space-8")}`,
      maxWidth: v("--container-max"),
      margin: "0 auto",
    }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: v("--space-10") }}>
        <div>
          <p style={{
            fontFamily: v("--font-sans"), fontSize: v("--text-xs"),
            letterSpacing: "0.2em", textTransform: "uppercase",
            color: v("--gold-dark"), marginBottom: v("--space-2"),
          }}>Curated for you</p>
          <h2 style={{
            fontFamily: v("--font-serif"), fontSize: v("--text-3xl"),
            color: v("--charcoal"), fontWeight: 700,
          }}>Trending in MENA</h2>
        </div>
        <a href="#" style={{
          fontFamily: v("--font-sans"), fontSize: v("--text-sm"),
          color: v("--burgundy"), fontWeight: 600,
          borderBottom: `1px solid var(--burgundy)`,
          paddingBottom: "2px",
          textDecoration: "none",
        }}>View all →</a>
      </div>

      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(4, 1fr)",
        gap: v("--space-6"),
      }}>
        {TRENDING.map(p => (
          <div key={p.id}
            onMouseEnter={() => setHovered(p.id)}
            onMouseLeave={() => setHovered(null)}
            style={{
              background: v("--white"),
              borderRadius: v("--radius-lg"),
              overflow: "hidden",
              boxShadow: hovered === p.id ? v("--shadow-lg") : v("--shadow-sm"),
              transform: hovered === p.id ? "translateY(-6px)" : "none",
              transition: "all var(--transition-base)",
              cursor: "pointer",
            }}>
            {/* Product image placeholder */}
            <div style={{
              height: "220px",
              background: `linear-gradient(135deg, ${p.color}22, ${p.color}44)`,
              display: "flex", alignItems: "center", justifyContent: "center",
              position: "relative",
            }}>
              <div style={{
                width: "70px", height: "100px",
                background: p.color,
                borderRadius: "35px 35px 15px 15px",
                opacity: 0.8,
              }} />
              {/* Badge */}
              <span style={{
                position: "absolute", top: v("--space-3"), left: v("--space-3"),
                background: p.tag === "VTON Ready" ? v("--gold") : p.tag === "Bestseller" ? v("--burgundy") : v("--sage-dark"),
                color: "white",
                fontSize: "10px", fontWeight: 700,
                padding: "3px 10px", borderRadius: v("--radius-pill"),
                letterSpacing: "0.05em",
              }}>{p.tag}</span>
              {/* VTON hover button */}
              {hovered === p.id && (
                <button style={{
                  position: "absolute", bottom: v("--space-3"), left: "50%",
                  transform: "translateX(-50%)",
                  background: v("--gold"),
                  color: "white",
                  border: "none",
                  borderRadius: v("--radius-pill"),
                  padding: `${v("--space-2")} ${v("--space-4")}`,
                  fontSize: v("--text-xs"),
                  fontWeight: 700,
                  cursor: "pointer",
                  whiteSpace: "nowrap",
                  boxShadow: v("--shadow-gold"),
                  animation: "fadeIn 0.2s ease",
                }}>✨ Generative Try-On</button>
              )}
            </div>
            <div style={{ padding: v("--space-4") }}>
              <p style={{
                fontFamily: v("--font-sans"), fontSize: v("--text-xs"),
                color: v("--charcoal-muted"), marginBottom: "4px",
                letterSpacing: v("--tracking-wide"),
              }}>{p.brand}</p>
              <h3 style={{
                fontFamily: v("--font-serif"), fontSize: v("--text-base"),
                color: v("--charcoal"), fontWeight: 700, marginBottom: v("--space-2"),
              }}>{p.name}</h3>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span style={{
                  fontFamily: v("--font-sans"), fontSize: v("--text-md"),
                  color: v("--burgundy"), fontWeight: 700,
                }}>{p.price}</span>
                <button style={{
                  background: "rgba(139,72,82,0.08)",
                  border: "none", borderRadius: v("--radius-circle"),
                  width: "32px", height: "32px", cursor: "pointer",
                  fontSize: "14px",
                  transition: "background var(--transition-fast)",
                }}
                  onMouseEnter={e => e.target.style.background = "rgba(139,72,82,0.18)"}
                  onMouseLeave={e => e.target.style.background = "rgba(139,72,82,0.08)"}
                >♡</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

// ── VTON Studio Preview ──
function VtonPreview() {
  const [stage, setStage] = useState("idle"); // idle | uploaded | generating | done
  const [progress, setProgress] = useState(0);

  const handleUpload = () => {
    setStage("uploaded");
  };
  const handleGenerate = () => {
    setStage("generating");
    setProgress(0);
    const t = setInterval(() => {
      setProgress(p => {
        if (p >= 100) { clearInterval(t); setStage("done"); return 100; }
        return p + 4;
      });
    }, 80);
  };
  const handleReset = () => { setStage("idle"); setProgress(0); };

  return (
    <section style={{
      padding: `${v("--space-20")} ${v("--space-8")}`,
      background: v("--charcoal"),
      position: "relative",
      overflow: "hidden",
    }}>
      {/* Background pattern */}
      <div style={{
        position: "absolute", inset: 0, opacity: 0.04,
        backgroundImage: "radial-gradient(var(--gold) 1px, transparent 1px)",
        backgroundSize: "28px 28px",
      }} />

      <div style={{
        maxWidth: v("--container-max"),
        margin: "0 auto",
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: v("--space-16"),
        alignItems: "center",
        position: "relative",
      }}>

        {/* Left – copy */}
        <div>
          <p style={{
            fontFamily: v("--font-sans"), fontSize: v("--text-xs"),
            letterSpacing: "0.2em", textTransform: "uppercase",
            color: v("--gold"), marginBottom: v("--space-4"),
          }}>✨ The Magic Feature</p>
          <h2 style={{
            fontFamily: v("--font-serif"),
            fontSize: "clamp(2rem, 3.5vw, 3.2rem)",
            fontWeight: 700,
            color: v("--ivory"),
            lineHeight: 1.15,
            marginBottom: v("--space-6"),
          }}>
            Virtual Try-On<br />
            <span style={{ color: v("--gold") }}>Studio</span>
          </h2>
          <p style={{
            fontFamily: v("--font-sans"), fontSize: v("--text-md"),
            color: "rgba(247,243,237,0.65)",
            lineHeight: v("--leading-relaxed"),
            marginBottom: v("--space-8"),
          }}>
            Upload your photo once. Try unlimited garments.
            Our Flux-based model renders realistic fit previews
            in under 30 seconds — tailored to the MENA body and modest wear.
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: v("--space-4") }}>
            {["Photo auto-deletes after 7 days", "Works with Abayas, Kaftans & Thobes", "Verified Fit reviews from real buyers"].map(f => (
              <div key={f} style={{ display: "flex", gap: v("--space-3"), alignItems: "center" }}>
                <span style={{
                  width: "20px", height: "20px", borderRadius: "50%",
                  background: "rgba(212,175,122,0.2)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: "11px", color: v("--gold"), flexShrink: 0,
                }}>✓</span>
                <span style={{
                  fontFamily: v("--font-sans"), fontSize: v("--text-sm"),
                  color: "rgba(247,243,237,0.7)",
                }}>{f}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Right – Interactive VTON Studio mock */}
        <div style={{
          background: v("--ivory"),
          borderRadius: v("--radius-xl"),
          padding: v("--space-8"),
          boxShadow: "0 24px 60px rgba(0,0,0,0.4)",
        }}>
          {/* Modal header */}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: v("--space-6") }}>
            <div>
              <h3 style={{ fontFamily: v("--font-serif"), fontSize: v("--text-xl"), color: v("--charcoal") }}>
                Virtual Studio
              </h3>
              <p style={{ fontFamily: v("--font-sans"), fontSize: v("--text-xs"), color: v("--charcoal-muted") }}>
                See this item on you.
              </p>
            </div>
            <button onClick={handleReset} style={{
              width: "32px", height: "32px", borderRadius: "50%",
              background: v("--ivory-dark"), border: "none", cursor: "pointer",
              fontSize: "14px", color: v("--charcoal-muted"),
              display: "flex", alignItems: "center", justifyContent: "center",
            }}>✕</button>
          </div>

          {/* Upload zone */}
          {stage === "idle" && (
            <div onClick={handleUpload}
              style={{
                border: v("--border-dashed"),
                borderRadius: v("--radius-lg"),
                padding: v("--space-10"),
                textAlign: "center",
                background: v("--ivory"),
                cursor: "pointer",
                marginBottom: v("--space-6"),
                transition: "all var(--transition-base)",
              }}
              onMouseEnter={e => { e.currentTarget.style.background = "var(--ivory-dark)"; e.currentTarget.style.borderColor = "var(--sage-dark)"; }}
              onMouseLeave={e => { e.currentTarget.style.background = "var(--ivory)"; e.currentTarget.style.borderColor = "var(--sage)"; }}
            >
              <div style={{ fontSize: "32px", marginBottom: v("--space-3") }}>📷</div>
              <p style={{ fontFamily: v("--font-sans"), fontSize: v("--text-sm"), color: v("--charcoal"), fontWeight: 600 }}>
                Drop your photo here or click to browse
              </p>
              <p style={{ fontFamily: v("--font-sans"), fontSize: v("--text-xs"), color: v("--charcoal-muted"), marginTop: "4px" }}>
                JPG, PNG up to 10MB
              </p>
            </div>
          )}

          {/* Uploaded preview */}
          {(stage === "uploaded" || stage === "generating") && (
            <div style={{
              borderRadius: v("--radius-lg"),
              overflow: "hidden",
              marginBottom: v("--space-6"),
              position: "relative",
            }}>
              <div style={{
                height: "140px",
                background: "linear-gradient(135deg, rgba(139,72,82,0.15), rgba(212,175,122,0.2))",
                display: "flex", alignItems: "center", justifyContent: "center",
              }}>
                <div style={{ textAlign: "center" }}>
                  <div style={{ fontSize: "32px", marginBottom: "8px" }}>🧕</div>
                  <span style={{ fontFamily: v("--font-sans"), fontSize: v("--text-xs"), color: v("--charcoal-muted") }}>
                    photo_preview.jpg
                  </span>
                </div>
              </div>
              {stage === "generating" && (
                <div style={{
                  position: "absolute", inset: 0,
                  background: "rgba(247,243,237,0.85)",
                  display: "flex", flexDirection: "column",
                  alignItems: "center", justifyContent: "center",
                  gap: v("--space-3"),
                }}>
                  <div style={{ fontSize: "24px", animation: "pulse 1s infinite" }}>✨</div>
                  <p style={{ fontFamily: v("--font-sans"), fontSize: v("--text-sm"), fontWeight: 600, color: v("--charcoal") }}>
                    Generating… {progress}%
                  </p>
                  <div style={{
                    width: "180px", height: "4px",
                    background: v("--ivory-dark"), borderRadius: "2px", overflow: "hidden",
                  }}>
                    <div style={{
                      height: "100%", width: `${progress}%`,
                      background: v("--gradient-brand"),
                      transition: "width 0.1s linear",
                      borderRadius: "2px",
                    }} />
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Result */}
          {stage === "done" && (
            <div style={{ marginBottom: v("--space-6"), animation: "fadeIn 0.4s ease" }}>
              <div style={{
                height: "180px", borderRadius: v("--radius-lg"),
                background: "linear-gradient(160deg, rgba(139,72,82,0.12), rgba(212,175,122,0.18))",
                display: "flex", alignItems: "center", justifyContent: "center",
                marginBottom: v("--space-4"),
                position: "relative", overflow: "hidden",
              }}>
                <div style={{ textAlign: "center" }}>
                  <div style={{ fontSize: "40px", marginBottom: "8px" }}>🧕</div>
                  <div style={{
                    width: "60px", height: "80px",
                    background: v("--gradient-brand"),
                    borderRadius: "30px 30px 10px 10px",
                    margin: "0 auto", opacity: 0.85,
                  }} />
                </div>
                <span style={{
                  position: "absolute", top: v("--space-3"), right: v("--space-3"),
                  background: v("--gold"), color: "white",
                  fontSize: "10px", fontWeight: 700,
                  padding: "3px 8px", borderRadius: v("--radius-pill"),
                }}>✨ AI Result</span>
              </div>
              <div style={{ display: "flex", gap: v("--space-3") }}>
                <button style={{
                  flex: 1, padding: v("--space-3"),
                  background: v("--burgundy"), color: "white", border: "none",
                  borderRadius: v("--radius-md"), fontWeight: 600,
                  fontSize: v("--text-sm"), cursor: "pointer",
                  fontFamily: v("--font-sans"),
                }}>Add to Cart</button>
                <button style={{
                  padding: v("--space-3"),
                  background: "transparent",
                  border: `1px solid var(--ivory-dark)`,
                  borderRadius: v("--radius-md"), cursor: "pointer",
                  fontSize: v("--text-sm"),
                }}>⬇</button>
              </div>
            </div>
          )}

          {/* Generate button */}
          <button
            onClick={stage === "idle" ? handleUpload : stage === "uploaded" ? handleGenerate : handleReset}
            disabled={stage === "generating"}
            style={{
              width: "100%",
              padding: v("--space-4"),
              borderRadius: v("--radius-pill"),
              background: stage === "generating" ? v("--ivory-dark") : v("--gold"),
              color: stage === "generating" ? v("--charcoal-muted") : "white",
              border: "none",
              fontFamily: v("--font-sans"),
              fontSize: v("--text-base"),
              fontWeight: 700,
              cursor: stage === "generating" ? "not-allowed" : "pointer",
              opacity: stage === "generating" ? v("--opacity-disabled") : 1,
              boxShadow: stage === "generating" ? "none" : v("--shadow-gold"),
              transition: "all var(--transition-base)",
              letterSpacing: v("--tracking-wide"),
            }}>
            {stage === "idle" ? "✨ Upload Photo to Begin"
              : stage === "uploaded" ? "✨ Generate Try-On"
              : stage === "generating" ? "Generating…"
              : "Try Another Photo"}
          </button>
        </div>
      </div>
    </section>
  );
}

// ── How It Works ──
function HowItWorks() {
  return (
    <section style={{
      padding: `${v("--space-20")} ${v("--space-8")}`,
      background: v("--ivory"),
      maxWidth: v("--container-max"),
      margin: "0 auto",
    }}>
      <div style={{ textAlign: "center", marginBottom: v("--space-12") }}>
        <p style={{
          fontFamily: v("--font-sans"), fontSize: v("--text-xs"),
          letterSpacing: "0.2em", textTransform: "uppercase",
          color: v("--gold-dark"), marginBottom: v("--space-3"),
        }}>Simple Process</p>
        <h2 style={{
          fontFamily: v("--font-serif"), fontSize: v("--text-3xl"),
          color: v("--charcoal"), fontWeight: 700,
        }}>How AINAI Works</h2>
      </div>

      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(4, 1fr)",
        gap: v("--space-6"),
        position: "relative",
      }}>
        {/* Connector line */}
        <div style={{
          position: "absolute",
          top: "28px", left: "12%", right: "12%",
          height: "1px",
          background: `linear-gradient(to right, var(--burgundy), var(--gold))`,
          opacity: 0.2,
          zIndex: 0,
        }} />

        {STEPS.map((s, i) => (
          <div key={s.num} style={{
            textAlign: "center",
            position: "relative", zIndex: 1,
            animation: `fadeIn 0.6s ${i * 0.1}s ease both`,
          }}>
            <div style={{
              width: "56px", height: "56px",
              borderRadius: "50%",
              background: i % 2 === 0 ? v("--burgundy") : v("--gold"),
              display: "flex", alignItems: "center", justifyContent: "center",
              margin: "0 auto",
              marginBottom: v("--space-5"),
              boxShadow: i % 2 === 0 ? v("--shadow-burgundy") : v("--shadow-gold"),
            }}>
              <span style={{
                fontFamily: v("--font-serif"),
                fontSize: v("--text-sm"),
                fontWeight: 700, color: "white",
                letterSpacing: "0.05em",
              }}>{s.num}</span>
            </div>
            <h3 style={{
              fontFamily: v("--font-serif"),
              fontSize: v("--text-lg"),
              fontWeight: 700,
              color: v("--charcoal"),
              marginBottom: v("--space-2"),
            }}>{s.title}</h3>
            <p style={{
              fontFamily: v("--font-sans"),
              fontSize: v("--text-sm"),
              color: v("--charcoal-muted"),
              lineHeight: v("--leading-relaxed"),
            }}>{s.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

// ── Color System Showcase ──
function DesignSystemShowcase() {
  const colors = [
    { name: "Deep Burgundy", hex: "#8B4852", role: "Primary · Buttons · Active States", var: "--burgundy" },
    { name: "Soft Gold", hex: "#D4AF7A", role: "Secondary · VTON CTAs · Premium", var: "--gold" },
    { name: "Muted Sage", hex: "#A8B5A0", role: "Accent · Upload Zone · Success", var: "--sage" },
    { name: "Warm Ivory", hex: "#F7F3ED", role: "Background · Reduces Eye Strain", var: "--ivory" },
    { name: "Charcoal Brown", hex: "#3A302B", role: "Body Text · Dark Sections", var: "--charcoal" },
  ];

  return (
    <section style={{
      padding: `${v("--space-20")} ${v("--space-8")}`,
      background: v("--white"),
    }}>
      <div style={{ maxWidth: v("--container-max"), margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: v("--space-12") }}>
          <p style={{
            fontFamily: v("--font-sans"), fontSize: v("--text-xs"),
            letterSpacing: "0.2em", textTransform: "uppercase",
            color: v("--charcoal-muted"), marginBottom: v("--space-3"),
          }}>Design Language</p>
          <h2 style={{
            fontFamily: v("--font-serif"), fontSize: v("--text-3xl"),
            color: v("--charcoal"), fontWeight: 700,
          }}>Brand System · Modern Arabesque</h2>
        </div>

        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(5, 1fr)",
          gap: v("--space-4"),
          marginBottom: v("--space-12"),
        }}>
          {colors.map(c => (
            <div key={c.name} className="card" style={{
              padding: 0, overflow: "hidden", borderRadius: v("--radius-lg"),
              boxShadow: v("--shadow-md"),
            }}>
              <div style={{ height: "100px", background: c.hex }} />
              <div style={{ padding: v("--space-4") }}>
                <p style={{ fontFamily: v("--font-sans"), fontSize: v("--text-sm"), fontWeight: 700, color: v("--charcoal"), marginBottom: "4px" }}>{c.name}</p>
                <p style={{ fontFamily: v("--font-mono"), fontSize: v("--text-xs"), color: v("--charcoal-muted"), marginBottom: "4px" }}>{c.hex}</p>
                <p style={{ fontFamily: v("--font-sans"), fontSize: "11px", color: v("--charcoal-muted"), lineHeight: 1.4 }}>{c.role}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Typography showcase */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: v("--space-8"),
        }}>
          <div style={{
            background: v("--ivory"),
            borderRadius: v("--radius-lg"),
            padding: v("--space-8"),
          }}>
            <p style={{
              fontFamily: v("--font-sans"), fontSize: v("--text-xs"),
              letterSpacing: "0.2em", textTransform: "uppercase",
              color: v("--charcoal-muted"), marginBottom: v("--space-4"),
            }}>Heading — Playfair Display</p>
            <h1 style={{
              fontFamily: v("--font-serif"), fontSize: v("--text-4xl"),
              color: v("--charcoal"), fontWeight: 700, marginBottom: v("--space-2"),
              lineHeight: 1.1,
            }}>See Yourself Differently.</h1>
            <h2 style={{ fontFamily: v("--font-serif"), fontSize: v("--text-2xl"), color: v("--burgundy"), fontStyle: "italic" }}>
              "Virtual Try-On for MENA Fashion"
            </h2>
          </div>
          <div style={{
            background: v("--charcoal"),
            borderRadius: v("--radius-lg"),
            padding: v("--space-8"),
          }}>
            <p style={{
              fontFamily: v("--font-sans"), fontSize: v("--text-xs"),
              letterSpacing: "0.2em", textTransform: "uppercase",
              color: "rgba(247,243,237,0.5)", marginBottom: v("--space-4"),
            }}>Body — Lato</p>
            <p style={{
              fontFamily: v("--font-sans"), fontSize: v("--text-md"),
              color: "rgba(247,243,237,0.85)",
              lineHeight: v("--leading-relaxed"),
              marginBottom: v("--space-4"),
            }}>
              Bridging the gap between online shopping and reality.
              Upload your photo to see any garment on your actual body shape.
            </p>
            <div style={{ display: "flex", gap: v("--space-3"), flexWrap: "wrap" }}>
              <span className="badge badge-ready">VTON Ready</span>
              <span className="badge badge-gold">Bestseller</span>
              <span className="badge badge-processing">Processing</span>
              <span className="badge badge-failed">Failed</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ── CTA Banner ──
function CTABanner() {
  return (
    <section style={{
      padding: `${v("--space-16")} ${v("--space-8")}`,
      background: v("--gradient-brand"),
      textAlign: "center",
      position: "relative",
      overflow: "hidden",
    }}>
      <div style={{
        position: "absolute", inset: 0, opacity: 0.05,
        backgroundImage: "radial-gradient(white 1px, transparent 1px)",
        backgroundSize: "20px 20px",
      }} />
      <div style={{ position: "relative" }}>
        <h2 style={{
          fontFamily: v("--font-serif"),
          fontSize: "clamp(2rem, 4vw, 3rem)",
          fontWeight: 700,
          color: "white",
          marginBottom: v("--space-4"),
        }}>Start Seeing Yourself Differently</h2>
        <p style={{
          fontFamily: v("--font-sans"),
          fontSize: v("--text-md"),
          color: "rgba(255,255,255,0.8)",
          marginBottom: v("--space-8"),
        }}>Join thousands of MENA shoppers who buy with confidence.</p>
        <button style={{
          fontFamily: v("--font-sans"),
          fontSize: v("--text-base"),
          fontWeight: 700,
          padding: `${v("--space-4")} ${v("--space-12")}`,
          borderRadius: v("--radius-pill"),
          background: "white",
          color: v("--burgundy"),
          border: "none",
          cursor: "pointer",
          boxShadow: "0 8px 30px rgba(0,0,0,0.2)",
          transition: "all var(--transition-base)",
          letterSpacing: v("--tracking-wide"),
        }}
          onMouseEnter={e => { e.target.style.transform = "translateY(-3px)"; e.target.style.boxShadow = "0 12px 40px rgba(0,0,0,0.25)"; }}
          onMouseLeave={e => { e.target.style.transform = "none"; e.target.style.boxShadow = "0 8px 30px rgba(0,0,0,0.2)"; }}
        >✨ Try AINAI Free</button>
      </div>
    </section>
  );
}

// ── Footer ──
function Footer() {
  return (
    <footer style={{
      background: v("--charcoal"),
      padding: `${v("--space-12")} ${v("--space-8")} ${v("--space-8")}`,
    }}>
      <div style={{ maxWidth: v("--container-max"), margin: "0 auto" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: v("--space-10") }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: v("--space-4") }}>
              <EyeLogo size={28} primaryColor="#D4AF7A" accentColor="#F7F3ED" />
              <span style={{
                fontFamily: v("--font-serif"), fontSize: v("--text-xl"), fontWeight: 700,
                color: v("--ivory"), letterSpacing: v("--tracking-logo"),
              }}>AINAI</span>
              <span style={{ fontFamily: v("--font-sans"), fontSize: v("--text-sm"), color: "rgba(247,243,237,0.4)" }}>عَيناي</span>
            </div>
            <p style={{
              fontFamily: v("--font-sans"), fontSize: v("--text-sm"),
              color: "rgba(247,243,237,0.5)",
              maxWidth: "260px",
              lineHeight: v("--leading-relaxed"),
              fontStyle: "italic",
            }}>"See Yourself Differently."</p>
          </div>
          <div style={{ display: "flex", gap: v("--space-16") }}>
            {[
              { title: "Platform", links: ["Browse", "How It Works", "Brands", "VTON Studio"] },
              { title: "Company", links: ["About", "Blog", "Careers", "Press"] },
              { title: "Support", links: ["Help Center", "Privacy", "Terms", "Contact"] },
            ].map(col => (
              <div key={col.title}>
                <p style={{
                  fontFamily: v("--font-sans"), fontSize: v("--text-xs"),
                  letterSpacing: "0.15em", textTransform: "uppercase",
                  color: v("--gold"), fontWeight: 600, marginBottom: v("--space-4"),
                }}>{col.title}</p>
                {col.links.map(l => (
                  <a key={l} href="#" style={{
                    display: "block",
                    fontFamily: v("--font-sans"), fontSize: v("--text-sm"),
                    color: "rgba(247,243,237,0.5)",
                    marginBottom: v("--space-2"),
                    textDecoration: "none",
                    transition: "color var(--transition-fast)",
                  }}
                    onMouseEnter={e => e.target.style.color = "var(--ivory)"}
                    onMouseLeave={e => e.target.style.color = "rgba(247,243,237,0.5)"}
                  >{l}</a>
                ))}
              </div>
            ))}
          </div>
        </div>
        <div style={{
          borderTop: "1px solid rgba(255,255,255,0.08)",
          paddingTop: v("--space-6"),
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}>
          <p style={{ fontFamily: v("--font-sans"), fontSize: v("--text-xs"), color: "rgba(247,243,237,0.3)" }}>
            © 2025 AINAI. All rights reserved.
          </p>
          <div style={{ display: "flex", gap: v("--space-6") }}>
            {["🔒 Secure Payments", "🚚 Cash on Delivery", "↩️ Easy Returns"].map(t => (
              <span key={t} style={{
                fontFamily: v("--font-sans"), fontSize: v("--text-xs"),
                color: "rgba(247,243,237,0.35)",
              }}>{t}</span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

// ── Main Page Export ──
export default function HomePage() {
  return (
    <div style={{ background: v("--ivory"), minHeight: "100vh" }}>
      <Header />
      <main>
        <Hero />
        <BrandsScroll />
        <TrendingGrid />
        <VtonPreview />
        <HowItWorks />
        <DesignSystemShowcase />
        <CTABanner />
      </main>
      <Footer />
    </div>
  );
}