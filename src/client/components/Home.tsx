import React ,{ useState, useEffect } from "react";

type Room = {
  name: string;
  desc: string;
  price: string;
  per: string;
  emoji: string;
  guests: string;
  size: string;
};

const NAV_LINKS = ["Home", "Menu", "Rooms", "Book a Table", "Login"];

const MENU_CATEGORIES = [
  {
    category: "Coffee & Tea", icon: "☕",
    items: [
      { name: "Espresso", desc: "Bold & rich, pulled to perfection", price: "₹149", emoji: "☕" },
      { name: "Hazelnut Latte", desc: "Creamy, nutty, dangerously smooth", price: "₹199", emoji: "🥛" },
      { name: "Masala Chai", desc: "Kadak desi chai with fresh spices", price: "₹79", emoji: "🍵" },
      { name: "Matcha Latte", desc: "Ceremonial grade, silky smooth", price: "₹219", emoji: "🍃" },
    ],
  },
  {
    category: "Craft Beer & Drinks", icon: "🍺",
    items: [
      { name: "Belgian Wheat", desc: "Light, citrusy & refreshing on tap", price: "₹349", emoji: "🍺" },
      { name: "India Pale Ale", desc: "Hoppy, bold & unapologetically bitter", price: "₹379", emoji: "🍻" },
      { name: "Stout", desc: "Dark, roasted, with chocolate notes", price: "₹399", emoji: "🖤" },
      { name: "Mango Sour", desc: "Seasonal sour with Alphonso pulp", price: "₹369", emoji: "🥭" },
    ],
  },
  {
    category: "Hookah", icon: "💨",
    items: [
      { name: "Classic Mint", desc: "Cool, crisp & the all-time favourite", price: "₹499", emoji: "🌿" },
      { name: "Blueberry Frost", desc: "Sweet berry with icy exhale", price: "₹549", emoji: "🫐" },
      { name: "Paan Royale", desc: "Desi paan flavour, rich & aromatic", price: "₹549", emoji: "🌱" },
      { name: "Double Apple", desc: "The OG — smooth anise-kissed clouds", price: "₹499", emoji: "🍎" },
    ],
  },
  {
    category: "Momos & Bites", icon: "🥟",
    items: [
      { name: "Steamed Momos", desc: "Classic veg or chicken, spicy chutney", price: "₹179", emoji: "🥟" },
      { name: "Tandoori Momos", desc: "Char-grilled, smoky & irresistible", price: "₹219", emoji: "🔥" },
      { name: "Fried Momos", desc: "Crispy golden pockets of joy", price: "₹199", emoji: "✨" },
      { name: "Momo Platter", desc: "All three styles — the ultimate combo", price: "₹449", emoji: "🍽️" },
    ],
  },
];

const ROOMS = [
  { name: "Cozy Stay", desc: "Compact, clean & perfect for solo travellers. AC, Wi-Fi, attached bath.", price: "₹999", per: "/ night", emoji: "🛏️", guests: "2 Guest", size: "150 sq ft" },
  { name: "Deluxe Double", desc: "Spacious room with queen bed, balcony view & mini-fridge.", price: "₹1,499", per: "/ night", emoji: "🌙", guests: "2 Guests", size: "280 sq ft" },
  { name: "Family Suite", desc: "Two-room suite ideal for families. Lounge area, kitchenette & terrace.", price: "₹1,999", per: "/ night", emoji: "🏠", guests: "4 Guests", size: "450 sq ft" },
  { name: "Party Hall", desc: "Private hall for birthdays, kitty parties & small gatherings. AV setup, catering available.", price: "₹9,999", per: "/ event", emoji: "🎉", guests: "Up to 50", size: "800 sq ft" },
];

const FEATURES = [
  { icon: "🍺", title: "Craft on Tap", text: "Rotating craft beers brewed locally — always something new to try." },
  { icon: "💨", title: "Premium Hookah", text: "Imported flavours, clean setups, and clouds that hit different." },
  { icon: "🥟", title: "Killer Momos", text: "Steamed, fried, or tandoori — our momos have a cult following." },
  { icon: "🏨", title: "Stay the Night", text: "Comfy rooms above the bar — crash without the commute." },
  { icon: "🎉", title: "Event Hall", text: "Private hall for parties & gatherings with full catering support." },
  { icon: "🎵", title: "Live Nights", text: "DJs on Fridays, acoustic weekends, good vibes always." },
];

const TESTIMONIALS = [
  { name: "Priya S.", text: "Best hookah in South Delhi, hands down. And the momos? Unreal.", rating: 5 },
  { name: "Arjun M.", text: "Booked a room for the weekend, partied downstairs, zero commute stress. Genius.", rating: 5 },
  { name: "Sara K.", text: "Hosted my birthday in their hall — catering, music, everything was perfect.", rating: 5 },
  { name: "Rohan D.", text: "Coffee mornings, beer nights, and the Deluxe Double is super comfy. 10/10.", rating: 5 },
];

const GALLERY_VIBES = ["🍺 Craft Beer", "💨 Hookah Lounge", "🥟 Momo Bar", "☕ Coffee Corner", "🏨 Guest Rooms", "🎉 Party Hall", "🎵 Live Music", "🌙 Late Nights"];

export default function CafeHomepage() {
  const [scrolled, setScrolled] = useState(false);
  const [menuTab, setMenuTab] = useState(0);
  const [bookTab, setBookTab] = useState("table");
  const [roomModal, setRoomModal] = useState<Room | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  const cardBase = {
    background: "rgba(255,255,255,.03)", borderRadius: 16, border: "1px solid rgba(255,255,255,.06)", transition: "all .25s", cursor: "default",
  };
  const cardHoverIn = (e: React.MouseEvent<HTMLDivElement>) => { e.currentTarget.style.borderColor = "rgba(200,164,78,.25)"; e.currentTarget.style.transform = "translateY(-4px)"; };
  const cardHoverOut = (e: React.MouseEvent<HTMLDivElement>) => { e.currentTarget.style.borderColor = "rgba(255,255,255,.06)"; e.currentTarget.style.transform = "translateY(0)"; };

  const inputStyle = {
    padding: "14px 18px", borderRadius: 12, border: "1px solid rgba(255,255,255,.08)",
    background: "rgba(255,255,255,.04)", color: "#f5efe6", fontSize: 15,
    outline: "none", width: "100%", boxSizing: "border-box" as "border-box",
  };

  return (
    <div style={{ fontFamily: "'Segoe UI', system-ui, -apple-system, sans-serif", color: "#e8e0d4", background: "#121010", minHeight: "100vh", overflowX: "hidden" }}>

      {/* ── NAV ── */}
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
        display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: scrolled ? "10px 28px" : "16px 28px",
        background: scrolled ? "rgba(18,16,16,.92)" : "transparent",
        backdropFilter: scrolled ? "blur(14px)" : "none",
        borderBottom: scrolled ? "1px solid rgba(255,255,255,.06)" : "none",
        transition: "all .35s ease", flexWrap: "wrap", gap: 8,
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8, cursor: "pointer" }} onClick={() => scrollTo("Home")}>
          <span style={{ fontSize: 24 }}>🍺</span>
          <span style={{ fontWeight: 700, fontSize: 19, letterSpacing: "-0.5px", color: "#f5efe6" }}>Bandhan Cafe</span>
        </div>
        <div style={{ display: "flex", gap: 4, alignItems: "center", flexWrap: "wrap" }}>
          {NAV_LINKS.map((l) => {
            const id = l === "Book a Table" ? "Book" : l;
            const isLogin = l === "Login";
            const isBook = l === "Book a Table";
            return (
              <button key={l} onClick={() => scrollTo(id)} style={{
                border: isBook ? "none" : isLogin ? "1.5px solid rgba(245,239,230,.35)" : "none",
                background: isBook ? "linear-gradient(135deg,#c8a44e,#a6832e)" : "transparent",
                color: isBook ? "#121010" : "#c4b49e",
                padding: isBook || isLogin ? "8px 18px" : "8px 12px",
                borderRadius: 999, fontWeight: isBook ? 700 : 500, fontSize: 13,
                cursor: "pointer", transition: "all .2s",
              }}>{l}</button>
            );
          })}
        </div>
      </nav>

      {/* ── HERO ── */}
      <section id="Home" style={{
        minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
        textAlign: "center", padding: "120px 24px 80px",
        background: "radial-gradient(ellipse at top, #1e1a16 0%, #121010 70%)", position: "relative", overflow: "hidden",
      }}>
        <div style={{ position: "absolute", top: "10%", left: "15%", width: 300, height: 300, borderRadius: "50%", background: "radial-gradient(circle,rgba(200,164,78,.08),transparent 70%)", filter: "blur(60px)" }} />
        <div style={{ position: "absolute", bottom: "15%", right: "10%", width: 250, height: 250, borderRadius: "50%", background: "radial-gradient(circle,rgba(200,164,78,.06),transparent 70%)", filter: "blur(50px)" }} />

        <div style={{ display: "flex", gap: 14, fontSize: 34, marginBottom: 20 }}>
          <span>☕</span><span>🍺</span><span>💨</span><span>🥟</span><span>🏨</span>
        </div>
        <h1 style={{ fontSize: "clamp(32px,5.5vw,58px)", fontWeight: 800, lineHeight: 1.1, color: "#f5efe6", marginBottom: 14, letterSpacing: "-1.5px", maxWidth: 680 }}>
          Sip. Smoke. Eat. Stay.<br />
          <span style={{ background: "linear-gradient(135deg,#c8a44e,#e8c86e)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>All Under One Roof.</span>
        </h1>
        <p style={{ fontSize: 16, color: "#8a7a6c", maxWidth: 520, lineHeight: 1.7, marginBottom: 36 }}>
          Specialty coffee by morning, craft beer by evening, premium hookah all day, momos that slap — plus cozy rooms to crash and a private hall for your next celebration.
        </p>
        <div style={{ display: "flex", gap: 12, flexWrap: "wrap", justifyContent: "center" }}>
          <button onClick={() => scrollTo("Menu")} style={{
            background: "linear-gradient(135deg,#c8a44e,#a6832e)", color: "#121010", border: "none", padding: "14px 32px",
            borderRadius: 999, fontSize: 15, fontWeight: 700, cursor: "pointer", boxShadow: "0 4px 24px rgba(200,164,78,.3)",
          }}>Explore Menu</button>
          <button onClick={() => scrollTo("Rooms")} style={{
            background: "transparent", color: "#c8a44e", border: "2px solid rgba(200,164,78,.35)",
            padding: "14px 32px", borderRadius: 999, fontSize: 15, fontWeight: 600, cursor: "pointer",
          }}>View Rooms</button>
          <button onClick={() => scrollTo("Book")} style={{
            background: "transparent", color: "#c4b49e", border: "1.5px solid rgba(255,255,255,.15)",
            padding: "14px 32px", borderRadius: 999, fontSize: 15, fontWeight: 600, cursor: "pointer",
          }}>Book Now</button>
        </div>

        <div style={{ display: "flex", gap: 40, marginTop: 60, flexWrap: "wrap", justifyContent: "center" }}>
          {[["4.9 ★", "Google Rating"], ["10K+", "Happy Guests"], ["60+", "Menu Items"], ["12AM", "Open Late"], ["4", "Room Types"]].map(([v, l]) => (
            <div key={l} style={{ textAlign: "center" }}>
              <div style={{ fontSize: 24, fontWeight: 800, color: "#c8a44e" }}>{v}</div>
              <div style={{ fontSize: 11, color: "#6b5b4e", marginTop: 4, textTransform: "uppercase", letterSpacing: 1 }}>{l}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── VIBE TAGS ── */}
      <section style={{ padding: "28px 24px", background: "#161313", display: "flex", justifyContent: "center", flexWrap: "wrap", gap: 10 }}>
        {GALLERY_VIBES.map((v) => (
          <span key={v} style={{ padding: "9px 18px", borderRadius: 999, fontSize: 12, fontWeight: 600, border: "1px solid rgba(200,164,78,.18)", color: "#c4b49e", background: "rgba(200,164,78,.04)" }}>{v}</span>
        ))}
      </section>

      {/* ── FEATURES ── */}
      <section style={{ padding: "80px 24px", maxWidth: 1000, margin: "0 auto" }}>
        <h2 style={{ textAlign: "center", fontSize: 30, fontWeight: 700, color: "#f5efe6", marginBottom: 6 }}>Why Everyone's Talking About Us</h2>
        <p style={{ textAlign: "center", color: "#6b5b4e", marginBottom: 48, fontSize: 15 }}>Café by day, bar by night, guest lodge for the brave</p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))", gap: 18 }}>
          {FEATURES.map((f) => (
            <div key={f.title} style={{ ...cardBase, padding: 24 }} onMouseEnter={cardHoverIn} onMouseLeave={cardHoverOut}>
              <div style={{ fontSize: 28, marginBottom: 10 }}>{f.icon}</div>
              <div style={{ fontWeight: 700, fontSize: 14, color: "#f5efe6", marginBottom: 5 }}>{f.title}</div>
              <div style={{ fontSize: 13, color: "#8a7a6c", lineHeight: 1.5 }}>{f.text}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── MENU ── */}
      <section id="Menu" style={{ padding: "80px 24px", background: "#161313" }}>
        <div style={{ maxWidth: 1000, margin: "0 auto" }}>
          <h2 style={{ textAlign: "center", fontSize: 30, fontWeight: 700, color: "#f5efe6", marginBottom: 6 }}>Our Menu</h2>
          <p style={{ textAlign: "center", color: "#6b5b4e", marginBottom: 32, fontSize: 15 }}>Something for every mood</p>
          <div style={{ display: "flex", justifyContent: "center", gap: 8, marginBottom: 36, flexWrap: "wrap" }}>
            {MENU_CATEGORIES.map((cat, i) => (
              <button key={cat.category} onClick={() => setMenuTab(i)} style={{
                padding: "10px 20px", borderRadius: 999, fontSize: 13, fontWeight: 600, cursor: "pointer",
                border: menuTab === i ? "none" : "1px solid rgba(255,255,255,.1)",
                background: menuTab === i ? "linear-gradient(135deg,#c8a44e,#a6832e)" : "transparent",
                color: menuTab === i ? "#121010" : "#8a7a6c", transition: "all .2s",
              }}>{cat.icon} {cat.category}</button>
            ))}
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(210px, 1fr))", gap: 16 }}>
            {MENU_CATEGORIES[menuTab].items.map((item) => (
              <div key={item.name} style={{ ...cardBase, padding: 22, display: "flex", flexDirection: "column", gap: 8 }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = "rgba(200,164,78,.25)"; e.currentTarget.style.transform = "scale(1.02)"; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,.06)"; e.currentTarget.style.transform = "scale(1)"; }}>
                <div style={{ fontSize: 34 }}>{item.emoji}</div>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span style={{ fontWeight: 700, fontSize: 15, color: "#f5efe6" }}>{item.name}</span>
                  <span style={{ fontWeight: 700, fontSize: 13, color: "#c8a44e", background: "rgba(200,164,78,.1)", padding: "4px 11px", borderRadius: 99 }}>{item.price}</span>
                </div>
                <div style={{ fontSize: 13, color: "#8a7a6c", lineHeight: 1.5 }}>{item.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── ROOMS & HALL ── */}
      <section id="Rooms" style={{ padding: "80px 24px", maxWidth: 1000, margin: "0 auto" }}>
        <h2 style={{ textAlign: "center", fontSize: 30, fontWeight: 700, color: "#f5efe6", marginBottom: 6 }}>Stay With Us</h2>
        <p style={{ textAlign: "center", color: "#6b5b4e", marginBottom: 48, fontSize: 15 }}>Cozy rooms upstairs & a private hall for your celebrations</p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(230px, 1fr))", gap: 18 }}>
          {ROOMS.map((r) => (
            <div key={r.name} style={{
              ...cardBase, padding: 0, overflow: "hidden", cursor: "pointer",
            }}
              onMouseEnter={cardHoverIn} onMouseLeave={cardHoverOut}
              onClick={() => setRoomModal(r)}
            >
              <div style={{ background: "linear-gradient(135deg, rgba(200,164,78,.12), rgba(200,164,78,.04))", padding: "28px 24px 18px", textAlign: "center" }}>
                <div style={{ fontSize: 44 }}>{r.emoji}</div>
              </div>
              <div style={{ padding: "18px 22px 22px" }}>
                <div style={{ fontWeight: 700, fontSize: 16, color: "#f5efe6", marginBottom: 4 }}>{r.name}</div>
                <div style={{ fontSize: 13, color: "#8a7a6c", lineHeight: 1.5, marginBottom: 14 }}>{r.desc}</div>
                <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginBottom: 14 }}>
                  {[r.guests, r.size].map(tag => (
                    <span key={tag} style={{ fontSize: 11, padding: "4px 10px", borderRadius: 99, background: "rgba(200,164,78,.08)", color: "#c8a44e", fontWeight: 600 }}>{tag}</span>
                  ))}
                </div>
                <div style={{ display: "flex", alignItems: "baseline", gap: 4 }}>
                  <span style={{ fontSize: 22, fontWeight: 800, color: "#c8a44e" }}>{r.price}</span>
                  <span style={{ fontSize: 13, color: "#6b5b4e" }}>{r.per}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── ROOM MODAL ── */}
      {roomModal && (
        <div style={{
          position: "fixed", inset: 0, background: "rgba(0,0,0,.7)", backdropFilter: "blur(8px)",
          zIndex: 200, display: "flex", alignItems: "center", justifyContent: "center", padding: 24,
        }} onClick={() => setRoomModal(null)}>
          <div style={{
            background: "#1a1714", borderRadius: 20, maxWidth: 420, width: "100%",
            border: "1px solid rgba(200,164,78,.15)", overflow: "hidden",
          }} onClick={e => e.stopPropagation()}>
            <div style={{ background: "linear-gradient(135deg,rgba(200,164,78,.15),rgba(200,164,78,.05))", padding: "36px 24px", textAlign: "center" }}>
              <div style={{ fontSize: 56 }}>{roomModal.emoji}</div>
              <div style={{ fontSize: 22, fontWeight: 800, color: "#f5efe6", marginTop: 10 }}>{roomModal.name}</div>
              <div style={{ color: "#c8a44e", fontWeight: 700, fontSize: 18, marginTop: 4 }}>{roomModal.price} <span style={{ fontWeight: 400, fontSize: 14, color: "#8a7a6c" }}>{roomModal.per}</span></div>
            </div>
            <div style={{ padding: "24px 24px 28px" }}>
              <p style={{ fontSize: 14, color: "#c4b49e", lineHeight: 1.6, marginBottom: 18 }}>{roomModal.desc}</p>
              <div style={{ display: "flex", gap: 10, marginBottom: 24 }}>
                {[roomModal.guests, roomModal.size].map(t => (
                  <span key={t} style={{ fontSize: 12, padding: "5px 12px", borderRadius: 99, background: "rgba(200,164,78,.1)", color: "#c8a44e", fontWeight: 600 }}>{t}</span>
                ))}
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                <input type="text" placeholder="Your Name" style={inputStyle} />
                <input type="text" placeholder="Phone or Email" style={inputStyle} />
                <div style={{ display: "flex", gap: 10 }}>
                  <input type="date" placeholder="Check-in" style={{ ...inputStyle, flex: 1 }} />
                  <input type="date" placeholder="Check-out" style={{ ...inputStyle, flex: 1 }} />
                </div>
                <button style={{
                  background: "linear-gradient(135deg,#c8a44e,#a6832e)", color: "#121010", border: "none",
                  padding: "14px", borderRadius: 999, fontSize: 15, fontWeight: 700, cursor: "pointer",
                  boxShadow: "0 4px 20px rgba(200,164,78,.25)", marginTop: 4,
                }}>Book {roomModal.name}</button>
              </div>
              <button onClick={() => setRoomModal(null)} style={{
                background: "none", border: "none", color: "#6b5b4e", fontSize: 13,
                cursor: "pointer", marginTop: 14, width: "100%", textAlign: "center",
              }}>Close</button>
            </div>
          </div>
        </div>
      )}

      {/* ── TESTIMONIALS ── */}
      <section style={{ padding: "80px 24px", background: "#161313" }}>
        <div style={{ maxWidth: 1000, margin: "0 auto" }}>
          <h2 style={{ textAlign: "center", fontSize: 30, fontWeight: 700, color: "#f5efe6", marginBottom: 6 }}>What Our Guests Say</h2>
          <p style={{ textAlign: "center", color: "#6b5b4e", marginBottom: 48, fontSize: 15 }}>Real talk from regulars & overnight guests</p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(230px, 1fr))", gap: 16 }}>
            {TESTIMONIALS.map((t) => (
              <div key={t.name} style={{ ...cardBase, padding: 26 }}>
                <div style={{ fontSize: 15, marginBottom: 10, color: "#c8a44e" }}>{"★".repeat(t.rating)}</div>
                <p style={{ fontSize: 14, color: "#c4b49e", lineHeight: 1.65, marginBottom: 14, fontStyle: "italic" }}>"{t.text}"</p>
                <div style={{ fontSize: 13, fontWeight: 700, color: "#f5efe6" }}>{t.name}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── BOOK (Table / Room / Hall) ── */}
      <section id="Book" style={{ padding: "80px 24px", background: "linear-gradient(170deg,#1e1816,#2a2018)" }}>
        <div style={{ maxWidth: 540, margin: "0 auto", textAlign: "center" }}>
          <h2 style={{ fontSize: 30, fontWeight: 700, color: "#f5efe6", marginBottom: 6 }}>Book With Us</h2>
          <p style={{ color: "#6b5b4e", marginBottom: 28, fontSize: 15 }}>A table for tonight, a room for the weekend, or a hall for the party</p>

          {/* Tabs */}
          <div style={{ display: "flex", justifyContent: "center", gap: 8, marginBottom: 32 }}>
            {[
              { id: "table", label: "🍽️ Table" },
              { id: "room", label: "🏨 Room" },
              { id: "hall", label: "🎉 Hall" },
            ].map(t => (
              <button key={t.id} onClick={() => setBookTab(t.id)} style={{
                padding: "10px 22px", borderRadius: 999, fontSize: 14, fontWeight: 600, cursor: "pointer",
                background: bookTab === t.id ? "linear-gradient(135deg,#c8a44e,#a6832e)" : "transparent",
                color: bookTab === t.id ? "#121010" : "#8a7a6c",
                border: bookTab === t.id ? "none" : "1px solid rgba(255,255,255,.1)",
                transition: "all .2s",
              }}>{t.label}</button>
            ))}
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            <input type="text" placeholder="Your Name" style={inputStyle} />
            <input type="text" placeholder="Phone or Email" style={inputStyle} />

            {bookTab === "table" && (
              <>
                <input type="date" style={inputStyle} />
                <select style={{ ...inputStyle, color: "#8a7a6c", appearance: "none" }}>
                  <option value="">Number of Guests</option>
                  {[1,2,3,4,5,6,7,8].map(n => <option key={n}>{n} {n === 1 ? "Guest" : "Guests"}</option>)}
                </select>
                <select style={{ ...inputStyle, color: "#8a7a6c", appearance: "none" }}>
                  <option value="">Preferred Zone</option>
                  <option>☕ Café Zone</option>
                  <option>🍺 Beer Bar</option>
                  <option>💨 Hookah Lounge</option>
                  <option>🌙 Outdoor Terrace</option>
                </select>
              </>
            )}

            {bookTab === "room" && (
              <>
                <div style={{ display: "flex", gap: 10 }}>
                  <input type="date" placeholder="Check-in" style={{ ...inputStyle, flex: 1 }} />
                  <input type="date" placeholder="Check-out" style={{ ...inputStyle, flex: 1 }} />
                </div>
                <select style={{ ...inputStyle, color: "#8a7a6c", appearance: "none" }}>
                  <option value="">Room Type</option>
                  <option>🛏️ Cozy Stay — ₹999/night</option>
                  <option>🌙 Deluxe Double — ₹1,499/night</option>
                  <option>🏠 Family Suite — ₹1,999/night</option>
                </select>
                <select style={{ ...inputStyle, color: "#8a7a6c", appearance: "none" }}>
                  <option value="">Number of Guests</option>
                  {[1,2,3,4].map(n => <option key={n}>{n} {n === 1 ? "Guest" : "Guests"}</option>)}
                </select>
              </>
            )}

            {bookTab === "hall" && (
              <>
                <input type="date" style={inputStyle} />
                <select style={{ ...inputStyle, color: "#8a7a6c", appearance: "none" }}>
                  <option value="">Expected Guests</option>
                  {["10-20", "20-30", "30-40", "40-50"].map(r => <option key={r}>{r} People</option>)}
                </select>
                <select style={{ ...inputStyle, color: "#8a7a6c", appearance: "none" }}>
                  <option value="">Event Type</option>
                  <option>🎂 Birthday Party</option>
                  <option>🎉 Get-together</option>
                  <option>💼 Corporate Meetup</option>
                  <option>🎶 Private Celebration</option>
                </select>
                <select style={{ ...inputStyle, color: "#8a7a6c", appearance: "none" }}>
                  <option value="">Catering Needed?</option>
                  <option>Yes — Full Catering</option>
                  <option>Just Snacks & Drinks</option>
                  <option>No — Own Arrangements</option>
                </select>
              </>
            )}

            <button style={{
              background: "linear-gradient(135deg,#c8a44e,#a6832e)", color: "#121010", border: "none",
              padding: "14px 32px", borderRadius: 999, fontSize: 16, fontWeight: 700,
              cursor: "pointer", marginTop: 8, boxShadow: "0 4px 20px rgba(200,164,78,.25)",
            }}>
              {bookTab === "table" ? "Reserve Table" : bookTab === "room" ? "Book Room" : "Book Hall"}
            </button>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer style={{
        padding: "48px 24px", background: "#0e0d0c", color: "#6b5b4e",
        textAlign: "center", fontSize: 14, lineHeight: 1.8,
      }}>
        <div style={{ fontSize: 22, marginBottom: 6 }}>🍺 <span style={{ fontWeight: 700, color: "#f5efe6" }}>Bandhan Cafe</span></div>
        <div style={{ color: "#8a7a6c", fontSize: 13 }}>Café • Beer Bar • Hookah Lounge • Guest Lodge</div>
        <div>Taulihawa, Kapilvastu, Lumbini, Nepal</div>
        <div>Open Daily — 9:00 AM to 12:00 AM</div>
        <div style={{ marginTop: 16, display: "flex", gap: 20, justifyContent: "center", fontSize: 13 }}>
          {["Instagram", "Tiktok", "Google Maps",].map(s => (
            <span key={s} style={{ cursor: "pointer", color: "#c8a44e", borderBottom: "1px solid transparent", transition: "border .2s" }}
              onMouseEnter={e => e.currentTarget.style.borderBottom = "1px solid #c8a44e"}
              onMouseLeave={e => e.currentTarget.style.borderBottom = "1px solid transparent"}
            >{s}</span>
          ))}
        </div>
        <div style={{ marginTop: 24, fontSize: 12, color: "#4a3f35" }}>©️ 2026 Bandhan Cafe. All rights reserved.</div>
      </footer>
    </div>
  );
}