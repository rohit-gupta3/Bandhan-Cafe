import React, { useState, memo } from "react";
import { MENU_CATEGORIES } from "../contants";
import "./Menu.css";

interface MenuItem {
  name: string;
  desc: string;
  halfPrice?: string;
  fullPrice: string;
  emoji: string;
}

interface MenuCategory {
  category: string;
  icon: string;
  items: MenuItem[];
}

interface MenuSectionProps {
  menuTab: number;
  setMenuTab: (tab: number) => void;
}

const MenuSection: React.FC<MenuSectionProps> = memo(
  ({ menuTab, setMenuTab }) => (
    <section id="Menu" className="menu-section">
      <div className="menu-container">
        <div className="section-header">
          <h2 className="section-title">Our Complete Menu</h2>
          <p className="section-subtitle">
            Authentic Nepali and Indian cuisine
          </p>
        </div>

        <div className="menu-tabs">
          {MENU_CATEGORIES.map((category, index) => (
            <button
              key={category.category}
              onClick={() => setMenuTab(index)}
              className={`menu-tab ${menuTab === index ? "active" : ""}`}
            >
              <span className="tab-icon">{category.icon}</span>
              <span className="tab-text">{category.category}</span>
            </button>
          ))}
        </div>

        <div className="menu-grid">
          {MENU_CATEGORIES[menuTab]?.items.map((item, index) => (
            <div key={index} className="menu-item">
              <div className="menu-item-emoji">{item.emoji}</div>
              <div className="menu-item-header">
                <h3 className="menu-item-name">{item.name}</h3>
                <div className="menu-item-prices">
                  {item.halfPrice && (
                    <span className="price-half">Half: {item.halfPrice}</span>
                  )}
                  <span
                    className={`price-full ${!item.halfPrice ? "price-only" : ""}`}
                  >
                    {item.halfPrice ? "Full: " : ""}
                    {item.fullPrice}
                  </span>
                </div>
              </div>
              <p className="menu-item-desc">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  ),
);

const Menu: React.FC = () => {
  const [menuTab, setMenuTab] = useState(0);

  return (
    <div className="menu-page">
      <div className="menu-hero">
        <h1>Our Menu</h1>
        <p>Authentic Nepali & Indian Cuisine</p>
      </div>
      <MenuSection menuTab={menuTab} setMenuTab={setMenuTab} />
    </div>
  );
};

export default Menu;
