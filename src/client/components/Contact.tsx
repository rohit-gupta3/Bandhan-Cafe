import React, { memo } from "react";
import "./Contact.css";
import Rishi from "../../assets/rishi.jpg";
import Naitik from "../../assets/naitik.jpg";

interface OwnerInfo {
  name: string;
  title: string;
  image: any;
  phone: string;
  email: string;
  description: string;
}

const OWNERS_INFO: OwnerInfo[] = [
  {
    name: "Rishi Gupta",
    title: "Founder & Owner",
    image: Rishi,
    phone: "+977-9749469976",
    email: "bandhanmarriagehouse@gmail.com",
    description: "Passionate about creating memorable experiences, Rishi brings over 5 years of hospitality expertise to Bandhan Cafe. From crafting the perfect espresso to hosting unforgettable celebrations, he's dedicated to making every visit special."
  },
  {
    name: "Naitik Gupta",
    title: "Co-Founder & Operations Manager",
    image: Naitik,
    phone: "+977-9817579825",
    email: "naitik@bandhancafe.com",
    description: "With a keen eye for detail and a love for culinary arts, Naitik ensures every dish and drink meets the highest standards. His innovative approach to menu design and customer service keeps Bandhan Cafe at the forefront of the local dining scene."
  }
];

const ContactSection: React.FC = memo(() => {
  const handleCall = (phone: string) => {
    window.location.href = `tel:${phone}`;
  };

  const handleEmail = (email: string) => {
    window.location.href = `mailto:${email}`;
  };

  const handleWhatsApp = (phone: string) => {
    const message = encodeURIComponent("Hi! I'd like to inquire about booking at Bandhan Cafe.");
    window.open(`https://wa.me/${phone.replace(/[^0-9]/g, "")}?text=${message}`, '_blank');
  };

  return (
    <section id="Contact" className="contact-section">
      <div className="contact-container">
        <h2 className="section-title">Get In Touch</h2>
        <p className="section-subtitle">Ready to experience Bandhan Cafe? Contact our founders directly</p>

        <div className="contact-content">
          {OWNERS_INFO.map((owner, index) => (
            <div key={owner.name} className="owner-card">
              <div className="owner-image-container">
                <img
                  src={owner.image}
                  alt={owner.name}
                  className="owner-image"
                  onError={(e) => {
                    // Fallback to a placeholder if image fails to load
                    const target = e.target as HTMLImageElement;
                    target.src = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDIwMCAyMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIyMDAiIGhlaWdodD0iMjAwIiBmaWxsPSIjMWEwZjFmIi8+CjxjaXJjbGUgY3g9IjEwMCIgY3k9IjgwIiByPSI0MCIgZmlsbD0iI2M4YTQ0ZSIvPgo8cGF0aCBkPSJNMzAgMTUwIHEwIDMwIDMwIDMwIGgzMCBxMzAgMCAzMC0zMHYtMzBxMC0zMC0zMC0zMGgtMzBxLTMwIDAtMzAgMzB2MzB6IiBmaWxsPSIjZjVlZmU2Ii8+Cjwvc3ZnPg==";
                  }}
                />
                <div className="owner-badge">{index === 0 ? '👑 Founder' : '🌟 Co-Founder'}</div>
              </div>

              <div className="owner-info">
                <h3 className="owner-name">{owner.name}</h3>
                <p className="owner-title">{owner.title}</p>
                <p className="owner-description">{owner.description}</p>
              </div>

              <div className="owner-contact-methods">
                <div className="contact-item">
                  <div className="contact-icon">📞</div>
                  <div className="contact-details">
                    <div className="contact-label">Phone</div>
                    <div className="contact-value">{owner.phone}</div>
                  </div>
                  <button onClick={() => handleCall(owner.phone)} className="contact-button call">
                    Call
                  </button>
                </div>

                <div className="contact-item">
                  <div className="contact-icon">💬</div>
                  <div className="contact-details">
                    <div className="contact-label">WhatsApp</div>
                    <div className="contact-value">Quick inquiries</div>
                  </div>
                  <button onClick={() => handleWhatsApp(owner.phone)} className="contact-button whatsapp">
                    WhatsApp
                  </button>
                </div>

                <div className="contact-item">
                  <div className="contact-icon">✉️</div>
                  <div className="contact-details">
                    <div className="contact-label">Email</div>
                    <div className="contact-value">{owner.email}</div>
                  </div>
                  <button onClick={() => handleEmail(owner.email)} className="contact-button email">
                    Email
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="contact-note">
          <div className="note-icon">💡</div>
          <div className="note-content">
            <h4>Quick Response Guarantee</h4>
            <p>Our founders personally respond to all inquiries within 2 hours during business hours. For urgent bookings, WhatsApp is the fastest way to reach us!</p>
          </div>
        </div>
      </div>
    </section>
  );
});

export { ContactSection };