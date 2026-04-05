import React, { useState, useEffect, useCallback, memo } from "react";
import {
  FEATURES,
  GALLERY_VIBES,
  MENU_CATEGORIES,
  NAV_LINKS,
  POPULAR_ITEMS,
  ROOMS,
  TESTIMONIALS,
} from "../contants";
import { ContactSection } from "../components/Contact";
import "./Home.css";

interface Room {
  name: string;
  desc: string;
  price: string;
  per: string;
  emoji: string;
  guests: string;
  size: string;
}

interface MenuItem {
  name: string;
  desc: string;
  price: string;
  emoji: string;
}

interface MenuCategory {
  category: string;
  icon: string;
  items: MenuItem[];
}

interface Feature {
  title: string;
  text: string;
  icon: string;
}

interface Testimonial {
  name: string;
  text: string;
  rating: number;
}

interface NavLink {
  label: string;
  action: string;
}

const CafeHomepage: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [roomModal, setRoomModal] = useState<Room | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = useCallback((id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  }, []);

  const handleRoomClick = useCallback((room: Room) => {
    setRoomModal(room);
  }, []);

  const closeModal = useCallback(() => {
    setRoomModal(null);
  }, []);

  return (
    <div className="cafe-homepage">
      <Navbar scrolled={scrolled} scrollTo={scrollTo} />
      <Hero scrollTo={scrollTo} />
      <VibeSection />
      <FeaturesSection />
      <MenuSection />
      <RoomsSection rooms={ROOMS} onRoomClick={handleRoomClick} />
      <RoomModal room={roomModal} onClose={closeModal} />
      <TestimonialsSection />
      <ContactSection />
      <Footer />
    </div>
  );
};

interface NavbarProps {
  scrolled: boolean;
  scrollTo: (id: string) => void;
}

const Navbar: React.FC<NavbarProps> = memo(({ scrolled, scrollTo }) => (
  <nav className={`navbar ${scrolled ? "scrolled" : ""}`}>
    <div className="navbar-brand" onClick={() => scrollTo("Home")}>
      <span>🍺</span>
      <span>Bandhan Cafe</span>
    </div>
    <div className="navbar-links">
      {NAV_LINKS.map((link) => {
        const id = link === "Contact" ? "Contact" : link;
        const isLogin = link === "Login";
        const isBook = link === "Contact";
        return (
          <button
            key={link}
            onClick={() => scrollTo(id)}
            className={`nav-button ${isLogin ? "login" : ""} ${isBook ? "book" : ""}`}
          >
            {link}
          </button>
        );
      })}
    </div>
  </nav>
));

interface HeroProps {
  scrollTo: (id: string) => void;
}

const Hero: React.FC<HeroProps> = memo(({ scrollTo }) => (
  <section id="Home" className="hero">
    <div className="hero-decoration-1" />
    <div className="hero-decoration-2" />
    <div className="hero-emojis">
      <span>☕</span>
      <span>🍺</span>
      <span>💨</span>
      <span>🥟</span>
      <span>🏨</span>
    </div>
    <h1 className="hero-title">
      Sip. Smoke. Eat. Stay.
      <br />
      <span>All Under One Roof.</span>
    </h1>
    <p className="hero-subtitle">
      Specialty coffee by morning, craft beer by evening, premium hookah all
      day, momos that slap — plus cozy rooms to crash and a private hall for
      your next celebration.
    </p>
    <div className="hero-buttons">
      <button onClick={() => scrollTo("Menu")} className="hero-button primary">
        Explore Menu
      </button>
      <button
        onClick={() => scrollTo("Rooms")}
        className="hero-button secondary"
      >
        View Rooms
      </button>
      <button
        onClick={() => scrollTo("Contact")}
        className="hero-button outline"
      >
        Contact Us
      </button>
    </div>
    <div className="hero-stats">
      {[
        ["4.9 ★", "Google Rating"],
        ["10K+", "Happy Guests"],
        ["60+", "Menu Items"],
        ["12AM", "Open Late"],
        ["4", "Room Types"],
      ].map(([value, label]) => (
        <div key={label} className="stat-item">
          <div className="stat-value">{value}</div>
          <div className="stat-label">{label}</div>
        </div>
      ))}
    </div>
  </section>
));

const VibeSection: React.FC = memo(() => (
  <section className="vibe-section">
    {GALLERY_VIBES.map((vibe) => (
      <span key={vibe} className="vibe-tag">
        {vibe}
      </span>
    ))}
  </section>
));

const FeaturesSection: React.FC = memo(() => (
  <section className="features-section">
    <h2 className="section-title">Why Everyone's Talking About Us</h2>
    <p className="section-subtitle">
      Café by day, bar by night, guest lodge for the brave
    </p>
    <div className="features-grid">
      {FEATURES.map((feature) => (
        <div key={feature.title} className="feature-card">
          <div className="feature-icon">{feature.icon}</div>
          <div className="feature-title">{feature.title}</div>
          <div className="feature-text">{feature.text}</div>
        </div>
      ))}
    </div>
  </section>
));

const MenuSection: React.FC = memo(() => {
  const scrollTo = useCallback((sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  }, []);

  return (
    <section id="Menu" className="menu-section">
      <div className="menu-container">
        <div className="section-header">
          <h2 className="section-title">Popular Dishes</h2>
          <p className="section-subtitle">Customer favorites from our menu</p>
        </div>

        <div className="menu-grid">
          {POPULAR_ITEMS.map((item, index) => (
            <div key={index} className="menu-item">
              <div className="menu-item-emoji">{item.emoji}</div>
              <div className="menu-item-header">
                <span className="menu-item-name">{item.name}</span>
                <span className="menu-item-price">{item.price}</span>
              </div>
              <div className="menu-item-desc">{item.desc}</div>
              <div className="menu-item-category">{item.category}</div>
            </div>
          ))}
        </div>

        <div className="menu-explore-container">
          <button
            onClick={() => (window.location.href = "/menu")}
            className="explore-menu-button"
          >
            Explore All Menu
            <span className="button-arrow">→</span>
          </button>
        </div>
      </div>
    </section>
  );
});

interface RoomsSectionProps {
  rooms: Room[];
  onRoomClick: (room: Room) => void;
}

const RoomsSection: React.FC<RoomsSectionProps> = memo(
  ({ rooms, onRoomClick }) => (
    <section id="Rooms" className="rooms-section">
      <h2 className="section-title">Stay With Us</h2>
      <p className="section-subtitle">
        Cozy rooms upstairs & a private hall for your celebrations
      </p>
      <div className="rooms-grid">
        {rooms.map((room) => (
          <div
            key={room.name}
            className="room-card"
            onClick={() => onRoomClick(room)}
          >
            <div className="room-card-header">
              <div className="room-emoji">{room.emoji}</div>
            </div>
            <div style={{ padding: "18px 22px 22px" }}>
              <div className="room-name">{room.name}</div>
              <div className="room-desc">{room.desc}</div>
              <div className="room-tags">
                {[room.guests, room.size].map((tag) => (
                  <span key={tag} className="room-tag">
                    {tag}
                  </span>
                ))}
              </div>
              <div className="room-price">
                <span className="room-price-value">{room.price}</span>
                <span className="room-price-unit">{room.per}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  ),
);

interface RoomModalProps {
  room: Room | null;
  onClose: () => void;
}

const RoomModal: React.FC<RoomModalProps> = memo(({ room, onClose }) => {
  if (!room) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div className="modal-emoji">{room.emoji}</div>
          <div className="modal-title">{room.name}</div>
          <div className="modal-price">
            {room.price} <span className="modal-price-unit">{room.per}</span>
          </div>
        </div>
        <div className="modal-body">
          <p className="modal-description">{room.desc}</p>
          <div className="modal-tags">
            {[room.guests, room.size].map((tag) => (
              <span key={tag} className="modal-tag">
                {tag}
              </span>
            ))}
          </div>
          <form className="modal-form">
            <input
              type="text"
              placeholder="Your Name"
              className="modal-input"
            />
            <input
              type="text"
              placeholder="Phone or Email"
              className="modal-input"
            />
            <div className="modal-input-row">
              <input
                type="date"
                placeholder="Check-in"
                className="modal-input"
              />
              <input
                type="date"
                placeholder="Check-out"
                className="modal-input"
              />
            </div>
            <button type="submit" className="modal-button">
              Book {room.name}
            </button>
          </form>
          <button onClick={onClose} className="modal-close">
            Close
          </button>
        </div>
      </div>
    </div>
  );
});

const TestimonialsSection: React.FC = memo(() => (
  <section className="testimonials-section">
    <div className="testimonials-container">
      <h2 className="section-title">What Our Guests Say</h2>
      <p className="section-subtitle">
        Real talk from regulars & overnight guests
      </p>
      <div className="testimonials-grid">
        {TESTIMONIALS.map((testimonial) => (
          <div key={testimonial.name} className="testimonial-card">
            <div className="testimonial-rating">
              {"★".repeat(testimonial.rating)}
            </div>
            <p className="testimonial-text">"{testimonial.text}"</p>
            <div className="testimonial-author">{testimonial.name}</div>
          </div>
        ))}
      </div>
    </div>
  </section>
));

const Footer: React.FC = memo(() => (
  <footer className="footer">
    <div className="footer-brand">
      🍺 <span>Bandhan Cafe</span>
    </div>
    <div className="footer-description">
      Café • Beer Bar • Hookah Lounge • Guest Lodge
    </div>
    <div>Taulihawa, Kapilvastu, Lumbini, Nepal</div>
    <div>Open Daily — 9:00 AM to 12:00 AM</div>
    <div className="footer-links">
      {["Instagram", "Tiktok", "Google Maps"].map((social) => (
        <span key={social} className="footer-link">
          {social}
        </span>
      ))}
    </div>
    <div className="footer-copyright">
      ©️ 2026 Bandhan Cafe. All rights reserved.
    </div>
  </footer>
));

export { CafeHomepage };
